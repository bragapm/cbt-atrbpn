import { authMiddleware } from "../middleware/auth";

import crypto from "crypto";

export default (router, { services, database }) => {
  const { ItemsService, AuthenticationService } = services;
  const autValidation = authMiddleware(database);

  router.get("/:user_session_id", autValidation, async (req, res) => {
    const userTestID = req.params.user_session_id;
    const problemID = req.query.problem_id;

    try {
      const questionsService = new ItemsService("questions_bank", {
        schema: req.schema,
      });

      const kategoriService = new ItemsService("kategori_soal", {
        schema: req.schema,
      });

      const optionsService = new ItemsService("question_options", {
        schema: req.schema,
      });

      const userTestService = new ItemsService("user_test", {
        schema: req.schema,
      });

      const problem = await questionsService.readOne(problemID);

      if (!problem) {
        throw new Error("Problems not found");
      }

      const kategori = await kategoriService.readOne(problem.kategori_id);

      // Fetch answer choices (options) for the problem
      let answerChoices = await optionsService.readByQuery({
        filter: { question_id: problemID },
        fields: ["option_text", "id", "order"],
      });

      // Sort options in JavaScript based on the `order` field
      answerChoices = answerChoices.sort((a, b) => a.order - b.order);

      // Check if options should be randomized
      if (problem.random_options) {
        const seed = crypto
          .createHash("sha256")
          .update(userTestID + problemID)
          .digest("hex");
        const random = (s) => {
          let x = parseInt(s.slice(0, 8), 16);
          return () => (x = (x * 9301 + 49297) % 233280) / 233280;
        };

        const seededRandom = random(seed);
        answerChoices = answerChoices.sort(() => seededRandom() - 0.5);
      }

      const submittedAnswers = await userTestService.readByQuery({
        filter: { user_session_id: userTestID, deleted_at: { _null: true } },
        fields: ["problem", "answer"],
      });

      const response = {
        problem_id: problem.id,
        category_name: kategori ? kategori.nama_kategori : null,
        question: problem.question,
        answerChoices: answerChoices.map((option) => ({
          text: option.option_text,
          id: option.id,
        })),
        submittedAnswers: submittedAnswers.map((answer) => ({
          problem: answer.problem,
          answer: answer.answer,
        })),
      };

      res.json({
        status: "success",
        data: response,
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: err?.message,
      });
    }
  });

  router.post(
    "/:user_session_id/submit-answer",
    autValidation,
    async (req, res) => {
      const userSessionId = req.params.user_session_id;
      const { problem_id, answer_id } = req.body;

      if (!problem_id || !answer_id || !userSessionId) {
        return res.status(400).json({
          status: "error",
          message:
            "Invalid payload: Missing problem_id, answer_id, or user_session_id.",
        });
      }

      try {
        const userTestService = new ItemsService("user_test", {
          schema: req.schema,
        });
        const optionsService = new ItemsService("question_options", {
          schema: req.schema,
        });
        const categoryService = new ItemsService("kategori_soal", {
          schema: req.schema,
        });
        const questionsService = new ItemsService("questions_bank", {
          schema: req.schema,
        });

        // Check if the answer already exists for the given session and problem
        const existingAnswer = await userTestService.readByQuery({
          filter: { user_session_id: userSessionId, problem: problem_id },
          limit: 1,
        });

        // Retrieve problem details to get the category ID
        const problem = await questionsService.readOne(problem_id);
        if (!problem) throw new Error("Problem not found");

        // Retrieve category to get weights for correct, incorrect, and unanswered
        const category = await categoryService.readOne(problem.kategori_id);
        if (!category) throw new Error("Category not found");

        // Check if the selected answer is correct
        const answerOption =
          answer_id !== "0" ? await optionsService.readOne(answer_id) : null;
        const isCorrect = answerOption ? answerOption.is_correct : false;

        // Calculate score
        const { score_category, score } = calculateScore(
          answer_id,
          isCorrect,
          category
        );

        // Update or create the answer record
        const now = new Date();
        const correct_score= category.bobot_benar;
        if (!existingAnswer.length) {
          // Create new answer record
          await userTestService.createOne({
            user_session_id: userSessionId,
            problem: problem_id,
            answer: answer_id,
            score_category,
            score,
            correct_score,
            created_at: now,
            updated_at: now,
          });

          return res.json({
            status: "success",
          });
        }
        const answerRecordId = existingAnswer[0].id;

        if (answer_id === "0") {
          // Delete record if no answer is provided
          await userTestService.deleteOne(answerRecordId);
          return res.json({
            status: "success",
          });
        }

        await userTestService.updateOne(answerRecordId, {
          user_session_id: userSessionId,
          problem: problem_id,
          answer: answer_id === "0" ? null : answer_id,
          score_category,
          score,
          updated_at: now,
        });

        res.json({
          status: "success",
        });
      } catch (err) {
        res.status(500).json({
          status: "error",
          message: err.message,
        });
      }
    }
  );
};

// Helper function for score calculation
const calculateScore = (answerId, isCorrect, category) => {
  if (answerId === "0")
    return { score_category: 0, score: category.tidak_menjawab };
  return isCorrect
    ? { score_category: 1, score: category.bobot_benar }
    : { score_category: -1, score: category.bobot_salah };
};
