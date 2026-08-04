import { authMiddleware } from "../middleware/auth";

import crypto from "crypto";

export default (router, { services, database, logger }) => {
  const { ItemsService, AuthenticationService } = services;
  const autValidation = authMiddleware(database);

  router.get("/:user_session_id", autValidation, async (req, res) => {
    const userTestID = req.params.user_session_id;
    const problemID = req.query.problem_id;

    try {
      //CEK ONLY 1 VALID TOKEN
      const userId = req.user;
      const userToken = req.token;
      const couponService = new ItemsService("coupon", {
        schema: req.schema,
      });
      const couponRows = await couponService.readByQuery({
        filter: { user_id: userId },
        fields: ["access_token_active"],
      });
      if (couponRows.length < 1) {
        return res.status(403).json({
          status: "error",
          message: "Device tidak valid. Login dari device tidak diperbolehkan.",
        });
      }
      const coupon = couponRows[0];
      const activeToken = coupon.access_token_active;

      // logger.info(activeToken);
      // logger.info(userToken);

      if (activeToken != userToken) {
        return res.status(403).json({
          status: "error",
          message: "Device tidak valid. Login dari device tidak diperbolehkan.",
        });
      }
      //CEK ONLY 1 VALID TOKEN

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
        throw new Error("Soal tidak ditemukan");
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

      // `limit: -1` wajib: tanpa itu Directus memakai limit default 100, jadi
      // peserta dengan lebih dari 100 jawaban kehilangan jawaban ke-101 dst.
      const submittedAnswers = await userTestService.readByQuery({
        filter: { user_session_id: userTestID, deleted_at: { _null: true } },
        fields: ["problem", "answer"],
        limit: -1,
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
      logger.info(err);
      res.status(500).json({
        status: "error",
        message: "Terjadi Kesalahan, silahkan coba lagi",
      });
    }
  });

  router.post(
    "/:user_session_id/submit-answer",
    autValidation,
    async (req, res) => {
      const userSessionId = req.params.user_session_id;
      const { problem_id, answer_id } = req.body;
      const user = req.user;

      if (!problem_id || !answer_id || !userSessionId) {
        return res.status(400).json({
          status: "error",
          message: "Terjadi Kesalahan, silahkan coba lagi",
        });
      }

      try {
        const optionsService = new ItemsService("question_options", {
          schema: req.schema,
        });
        const categoryService = new ItemsService("kategori_soal", {
          schema: req.schema,
        });
        const questionsService = new ItemsService("questions_bank", {
          schema: req.schema,
        });

        // Retrieve problem details to get the category ID
        const problem = await questionsService.readOne(problem_id);
        if (!problem) throw new Error("Soal tidak ditemukan");

        // Retrieve category to get weights for correct, incorrect, and unanswered
        const category = await categoryService.readOne(problem.kategori_id);
        if (!category) throw new Error("Kategori tidak ditemukan");

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
        const correct_score = category.bobot_benar;

        // Cek-lalu-simpan harus berjalan sebagai satu blok yang tidak boleh
        // disela request lain untuk soal yang sama. Tanpa ini, dua submit yang
        // datang berbarengan (mis. double click) sama-sama membaca "belum ada"
        // lalu sama-sama insert, sehingga jawabannya tercatat dobel.
        await database.transaction(async (trx) => {
          // Advisory lock dikunci per (sesi, soal) supaya peserta lain tidak
          // ikut antre, dan otomatis dilepas begitu transaksi selesai.
          await trx.raw(
            "SELECT pg_advisory_xact_lock(hashtext(?), hashtext(?))",
            [String(userSessionId), String(problem_id)]
          );

          // `knex: trx` wajib, kalau tidak query-nya keluar dari transaksi dan
          // lock di atas jadi tidak ada gunanya.
          const userTestService = new ItemsService("user_test", {
            schema: req.schema,
            knex: trx,
          });

          // Check if the answer already exists for the given session and problem
          const existingAnswer = await userTestService.readByQuery({
            filter: { user_session_id: userSessionId, problem: problem_id },
            limit: 1,
          });

          if (!existingAnswer.length) {
            // Create new answer record
            await userTestService.createOne({
              user_session_id: userSessionId,
              problem: problem_id,
              answer: answer_id,
              score_category,
              user: user,
              score,
              correct_score,
              created_at: now,
              updated_at: now,
            });

            return;
          }

          const answerRecordId = existingAnswer[0].id;

          if (answer_id === "0") {
            // Delete record if no answer is provided
            await userTestService.deleteOne(answerRecordId);
            return;
          }

          await userTestService.updateOne(answerRecordId, {
            user_session_id: userSessionId,
            problem: problem_id,
            answer: answer_id === "0" ? null : answer_id,
            score_category,
            user: user,
            score,
            updated_at: now,
          });
        });

        res.json({
          status: "success",
        });
      } catch (err) {
        logger.error(err);
        res.status(500).json({
          status: "error",
          message: "Terjadi Kesalahan, silahkan coba lagi",
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
