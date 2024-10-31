import { authMiddleware } from "../middleware/auth";

export default (router, { services }) => {
  const { ItemsService } = services;
  router.get("/", authMiddleware, async (req, res) => {
    try {
      const user = req.user;
      const userSessionService = new ItemsService("user_session_test", {
        schema: req.schema,
      });

      const currentTime = new Date(); // Get the current time

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
          "session.id",
          "session.name",
          "session.start_time",
          "session.end_time",
        ], // Fields to return
      });

      // Map response to the desired format
      const formattedSessions = userSessions.map((session) => ({
        "session-id": session.session.id,
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
          "end_time",
          "session.start_attempt_at",
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
      const now = new Date();

      // Parse the session start_time and end_time
      const sessionStartTime = new Date(session.session.start_time);
      const sessionEndTime = new Date(session.session.end_time);

      // Check if the current time is within the start and end time of the session
      if (now < sessionStartTime || now > sessionEndTime) {
        return res.status(400).json({
          status: "error",
          message:
            "Session cannot be started outside of the allowed time range.",
        });
      }

      if (session.start_attempt_at !== null) {
        res.json({
          status: "success",
          data: {
            session_test_id: session.id,
            start_attempt_at: session.start_attempt_at,
            problems: JSON.parse(session.problems),
          },
        });

        return;
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
          problems: JSON.parse(session.problems),
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
    const { user_session_id } = req.body; // Assumes user_session_id is provided in the request body

    try {
      const userTestService = new ItemsService("user_test", {
        schema: req.schema,
      });
      const userSessionService = new ItemsService("user_session_test", {
        schema: req.schema,
      });

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
      });

      // Prepare the response
      const response = {
        status: "success",
        data: {
          totalScore,
        },
      };

      res.json(response);
    } catch (err) {
      res.status(500).json({ status: "error", message: err.message });
    }
  });
};
