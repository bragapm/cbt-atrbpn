import { authMiddleware } from "../middleware/auth";

export default (router, { services }) => {
  const { ItemsService, AuthenticationService } = services;

  router.get("/:user_session_id", authMiddleware, async (req, res) => {
    const userTestID = req.params.user_session_id;
    const problemID = req.query.problem_id;

    try {
      const questionsService = new ItemsService("questions_bank", {
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

      // Fetch answer choices (options) for the problem
      let answerChoices = await optionsService.readByQuery({
        filter: { question_id: problemID },
        fields: ["option_text", "id", "order"],
      });

      // Sort options in JavaScript based on the `order` field
      answerChoices = answerChoices.sort((a, b) => a.order - b.order);

      // Check if options should be randomized
      if (problem.random_options) {
        answerChoices = answerChoices.sort(() => Math.random() - 0.5); // Randomize order
      }

      const submittedAnswers = await userTestService.readByQuery({
        filter: { user_session_id: userTestID, deleted_at: { _null: true } },
        fields: ["problem", "answer"],
      });

      const response = {
        problem_id: problem.id,
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
    authMiddleware,
    async (req, res) => {
      const userSessionId = req.params.user_session_id;
      const { problem_id, answer_id } = req.body;
      const user = req.user;

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
        });

        // Retrieve problem details to get the category ID
        const problem = await questionsService.readOne(problem_id);
        if (!problem) throw new Error("Problem not found");

        // Retrieve category to get weights for correct, incorrect, and unanswered
        const category = await categoryService.readOne(problem.kategori_id);
        if (!category) throw new Error("Category not found");

        // Check if the selected answer is correct
        let answerOption;
        let isCorrect;
        if (answer_id !== "0") {
          answerOption = await optionsService.readOne(answer_id);
          isCorrect = answerOption ? answerOption.is_correct : false;
        }

        // Set score_summary and score based on the answer's correctness
        let score_category;
        let score;

        if (answer_id === "0") {
          score_category = 0;
          score = category.tidak_menjawab;
        } else if (isCorrect) {
          score_category = 1;
          score = category.bobot_benar;
        } else {
          score_category = -1;
          score = category.bobot_salah;
        }

        // Update or create the answer record in the user_test table
        const now = new Date();
        let result;

        if (!existingAnswer.length) {
          result = await userTestService.createOne({
            user: user,
            user_session_id: userSessionId,
            problem: problem_id,
            answer: answer_id,
            score_category,
            score,
            created_at: now,
            updated_at: now,
          });

          res.json({
            status: "success",
            data: result,
          });

          return;
        }
        const answerRecordId = existingAnswer[0].id;
        result = await userTestService.updateOne(answerRecordId, {
          answer: answer_id === "0" ? null : answer_id,
          score_category,
          score,
          updated_at: now,
          deleted_at: answer_id === "0" ? now : null,
        });
        res.json({
          status: "success",
          data: result,
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
