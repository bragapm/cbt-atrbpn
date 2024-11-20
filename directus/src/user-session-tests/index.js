import { authMiddleware } from "../middleware/auth";
import { formatInTimeZone } from "date-fns-tz";

export default (router, { services }) => {
  const { ItemsService } = services;
  router.get("/", authMiddleware, async (req, res) => {
    try {
      const user = req.user;
      const userSessionService = new ItemsService("user_session_test", {
        schema: req.schema,
      });

      const currentTime = new Date(new Date().getTime() - 7 * 60 * 60 * 1000); // Get the current time

      // Fetch user test sessions where session.end_time > current time and end_attempt_at is null
      const userSessions = await userSessionService.readByQuery({
        filter: {
          user: user, // Filter by current user
          deleted_at: { _null: true }, // Ensure deleted_at is null
          end_attempt_at: { _null: true }, // end_attempt_at must be null
          session: {
            end_time: { _gt: currentTime },
          }, // Relational filter on session.end_time
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
      console.log(error);
      res.json({ status: "error", error: error?.message });
    }
  });

  router.post("/start", authMiddleware, async (req, res) => {
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
          message: "Session test not found or unauthorized access.",
        });
      }

      const session = userSession[0]; // There should be only one result

      if (session.session.PIN !== pin) {
        return res.status(403).json({
          status: "error",
          message: "Incorrect Pin",
        });
      }

      // Update start_attempt_at and updated_at

      const timezone = "Asia/Jakarta";
      const now = new Date();

      const sessionStartTime = new Date(
        new Date(session.session.start_time).getTime() - 7 * 60 * 60 * 1000
      );
      const sessionEndTime = new Date(
        new Date(session.session.end_time).getTime() - 7 * 60 * 60 * 1000
      );

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

      if (now < sessionStartTime || now > sessionEndTime) {
        return res.status(500).json({
          status: "error",
          message:
            "Session cannot be started outside of the allowed time range.",
        });
      }

      if (session.start_attempt_at !== null) {
        return res.json({
          status: "success",
          data: {
            session_test_id: session.id,
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
          start_attempt_at: now,
          problems: session.problems,
          start_time: sessionStartTimeFormatted,
          end_time: sessionEndTimeFormatted,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: new Error(error).message,
      });
    }
  });

  router.post("/finish", authMiddleware, async (req, res) => {
    const { user_session_id, feedback } = req.body; // Assumes user_session_id is provided in the request body

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
        fields: ["score_category", "score"],
      });

      if (!userAnswers.length) {
        return res.status(404).json({
          status: "error",
          message: "No answers found for this session",
        });
      }

      // Calculate score summary
      let correctAnswers = 0;
      let incorrectAnswers = 0;
      let unanswered = 0;
      let totalScore = 0;

      userAnswers.forEach((answer) => {
        if (answer.score_category === 1) correctAnswers += 1;
        else if (answer.score_category === -1) incorrectAnswers += 1;
        else unanswered += 1;

        totalScore += answer.score;
      });

      // Update `end_attempt_at` in `user_session_test`
      const endAttemptAt = new Date();
      await userSessionService.updateOne(user_session_id, {
        end_attempt_at: endAttemptAt,
        score: totalScore,
        score_summary: JSON.stringify({
          correct_answers: correctAnswers,
          wrong_answers: incorrectAnswers,
          not_answers: unanswered,
        }),
        feedback: feedback,
      });

      // Prepare the response
      const response = {
        status: "success",
        data: {
          totalScore,
          fullname: couponData.nama_peserta,
          code: couponData.code,
        },
      };

      res.json(response);
    } catch (err) {
      res.status(500).json({ status: "error", message: err.message });
    }
  });
};
