import { authMiddleware } from "../middleware/auth";
import { formatInTimeZone } from "date-fns-tz";

export default (router, { services, database, logger }) => {
  const { ItemsService } = services;
  const autValidation = authMiddleware(database);
  router.get("/", autValidation, async (req, res) => {
    try {
      const user = req.user;
      const userSessionService = new ItemsService("user_session_test", {
        schema: req.schema,
      });

      // Fetch user test sessions
      const userSessions = await userSessionService.readByQuery({
        filter: {
          user: user, // Filter by current user
          deleted_at: { _null: true }, // Ensure deleted_at is null
        },
        fields: [
          "id",
          "session.id",
          "session.name",
          "session.start_time",
          "session.end_time",
        ], // Fields to return
      });

      // Map response to the desired format
      const formattedSessions = userSessions.map((session) => ({
        "session-id": session.id,
        "session-name": session.session.name,
        "session-start-time": session.session.start_time,
        "session-end-time": session.session.end_time,
      }));

      res.json({ status: "success", data: formattedSessions });
    } catch (error) {
      logger.error(error);
      res.json({
        status: "error",
        message: "Terjadi Kesalahan, silahkan coba lagi",
      });
    }
  });

  router.post("/start", autValidation, async (req, res) => {
    try {
      const { user_session_id, pin } = req.body;
      const user = req.user;
      // Service for user_session_test
      const userSessionService = new ItemsService("user_session_test", {
        schema: req.schema,
      });

      // Fetch the session test by ID and make sure it belongs to the user
      const userSession = await userSessionService.readByQuery({
        filter: {
          id: user_session_id,
          user: user, // Ensure it belongs to the current user
          deleted_at: { _null: true }, // Ensure session is not deleted
        },
        fields: [
          "id",
          "start_attempt_at",
          "end_attempt_at",
          "session.start_time",
          "session.end_time",
          "session.PIN",
          "problems",
        ], // Retrieve necessary fields
      });

      // Check if the session test exists and is valid
      if (userSession.length === 0) {
        return res.status(404).json({
          status: "error",
          message: "Sesi ujian tidak ditemukan",
        });
      }

      const session = userSession[0]; // There should be only one result

      if (session.end_attempt_at !== null) {
        return res.status(403).json({
          status: "error",
          message:
            "Ujian anda sudah diakhiri. Harap hubungin Admin untuk melanjutkan",
        });
      }

      if (session.session.PIN !== pin) {
        return res.status(403).json({
          status: "error",
          message: "PIN salah",
        });
      }

      // Update start_attempt_at and updated_at

      const parseAsWib = (dateStr) => {
        if (!dateStr) return new Date();
        // Jika tidak ada 'Z' atau '+07:00', tambahkan '+07:00' di ujungnya
        const hasTimezone = dateStr.includes("Z") || dateStr.includes("+");
        const safeDateStr = hasTimezone ? dateStr : `${dateStr}+07:00`;
        return new Date(safeDateStr);
      };

      const timezone = "Asia/Jakarta";
      const now = new Date();

      const sessionStartTime = parseAsWib(session.session.start_time);
      const sessionEndTime = parseAsWib(session.session.end_time);

      // Format the dates in Asia/Jakarta timezone
      const nowFormatted = formatInTimeZone(
        now,
        timezone,
        "yyyy-MM-dd HH:mm:ssXXX"
      );
      const sessionStartTimeFormatted = formatInTimeZone(
        sessionStartTime,
        timezone,
        "yyyy-MM-dd HH:mm:ssXXX"
      );
      const sessionEndTimeFormatted = formatInTimeZone(
        sessionEndTime,
        timezone,
        "yyyy-MM-dd HH:mm:ssXXX"
      );

      if (nowFormatted < sessionStartTimeFormatted) {
        return res.status(403).json({
          status: "error",
          message: `Jam saat ini (${nowFormatted}). Sesi ujian belum dimulai, sesi akan dibuka pada ${sessionStartTimeFormatted}`,
        });
      }
      if (nowFormatted > sessionEndTimeFormatted) {
        return res.status(403).json({
          status: "error",
          message: `Jam saat ini (${nowFormatted}). Sesi ujian telah berakhir pada ${sessionEndTimeFormatted}`,
        });
      }

      if (session.start_attempt_at !== null) {
        return res.json({
          status: "success",
          data: {
            session_test_id: session.id,
            now_time: nowFormatted,
            start_attempt_at: session.start_attempt_at,
            start_time: sessionStartTimeFormatted,
            end_time: sessionEndTimeFormatted,
            problems: session.problems,
          },
        });
      }

      await userSessionService.updateOne(session.id, {
        start_attempt_at: now,
        updated_at: now,
      });

      // Return the list of problems along with session details
      res.json({
        status: "success",
        data: {
          session_test_id: session.id,
          now_time: nowFormatted,
          start_attempt_at: now,
          problems: session.problems,
          start_time: sessionStartTimeFormatted,
          end_time: sessionEndTimeFormatted,
        },
      });
    } catch (error) {
      logger.error(error);
      res.status(500).json({
        status: "error",
        message: "Terjadi Kesalahan, silahkan coba lagi",
      });
    }
  });

  router.post("/finish", autValidation, async (req, res) => {
    const { user_session_id } = req.body; // Assumes user_session_id is provided in the request body

    const user = req.user;
    try {
      const userTestService = new ItemsService("user_test", {
        schema: req.schema,
      });

      const userSessionService = new ItemsService("user_session_test", {
        schema: req.schema,
      });

      const couponsService = new ItemsService("coupon", {
        schema: req.schema,
      });

      const coupon = await couponsService.readByQuery({
        filter: { user_id: user },
        limit: 1,
      });

      const couponData = coupon[0];

      // Fetch all answers for the user session
      const userAnswers = await userTestService.readByQuery({
        filter: { user_session_id: user_session_id },
        fields: ["score_category", "score", "correct_score"],
      });

      //fetch user_session_test
      const userSession = await userSessionService.readByQuery({
        filter: { id: user_session_id },
        fields: ["score_alias"],
      });

      if (!userSession.length) {
        return res.status(404).json({
          status: "error",
          message: "Sesi ujian tidak ditemukan",
        });
      }

      // Peserta yang belum menjawab apa pun tetap harus bisa mengakhiri ujian
      // supaya `end_attempt_at` terisi. Skornya dihitung apa adanya, yaitu 0.

      // Calculate score summary
      let correctAnswers = 0;
      let incorrectAnswers = 0;
      let unanswered = 0;
      let totalScore = 0;
      let maxScore = 0;

      userAnswers.forEach((answer) => {
        if (answer.score_category === 1) correctAnswers += 1;
        else if (answer.score_category === -1) incorrectAnswers += 1;
        else unanswered += 1;
        totalScore += parseFloat(answer.score) || 0;
        maxScore += parseFloat(answer.correct_score) || 0;
      });

      totalScore = parseFloat(totalScore.toFixed(6));
      maxScore = parseFloat(maxScore.toFixed(6));

      // Update `end_attempt_at` in `user_session_test`
      const endAttemptAt = new Date();
      await userSessionService.updateOne(user_session_id, {
        end_attempt_at: endAttemptAt,
        score: totalScore,
        max_score: maxScore,
        score_summary: JSON.stringify({
          correct_answers: correctAnswers,
          wrong_answers: incorrectAnswers,
          not_answers: unanswered,
        }),
      });

      // Prepare the response
      const scoreAlias = userSession[0]?.score_alias;

      const response = {
        status: "success",
        data: {
          // `score_alias` dipakai kalau memang diisi; `undefined` (kolom tidak
          // ikut terbaca) diperlakukan sama dengan null, bukan dianggap ada.
          totalScore:
            scoreAlias !== null && scoreAlias !== undefined
              ? scoreAlias
              : totalScore,
          maxScore,
          fullname: couponData?.nama_peserta ?? null,
          code: couponData?.code ?? null,
        },
      };

      res.json(response);
    } catch (err) {
      logger.error(err);
      res.status(500).json({
        status: "error",
        message: "Terjadi Kesalahan, silahkan coba lagi",
      });
    }
  });

  router.post("/feedback", autValidation, async (req, res) => {
    const { user_session_id, feedback } = req.body; // Assumes user_session_id is provided in the request body
    try {
      const userSessionService = new ItemsService("user_session_test", {
        schema: req.schema,
      });

      await userSessionService.updateOne(user_session_id, {
        updated_at: new Date(),
        feedback: feedback,
      });

      res.json({ status: "success" });
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: "Terjadi Kesalahan, silahkan coba lagi",
      });
    }
  });
};
