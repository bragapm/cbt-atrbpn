export default (router, { services }) => {
  const { ItemsService } = services;
  router.get("/", async (req, res) => {
    try {
      // Check for Bearer Token Authorization
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new Error("Missing or invalid authorization token.");
      }
      const user = req.accountability.user; // Assuming accountability middleware handles token

      if (!user) {
        throw new Error("User is not authorized.");
      }

      // Service for user_session_test
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

  router.post("/start", async (req, res) => {
    try {
      const { id } = req.body;

      // Check for Bearer Token Authorization
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new Error("Missing or invalid authorization token.");
      }
      const user = req.accountability.user; // Assuming accountability middleware handles token

      if (!user) {
        throw new Error("User is not authorized.");
      }

      // Service for user_session_test
      const userSessionService = new ItemsService("user_session_test", {
        schema: req.schema,
      });

      // Fetch the session test by ID and make sure it belongs to the user
      const userSession = await userSessionService.readByQuery({
        filter: {
          id: id,
          user: user, // Ensure it belongs to the current user
          deleted_at: { _null: true }, // Ensure session is not deleted
        },
        fields: ["id", "start_attempt_at", "problems"], // Retrieve necessary fields
      });

      // Check if the session test exists and is valid
      if (userSession.length === 0) {
        return res.status(404).json({
          status: "error",
          message: "Session test not found or unauthorized access.",
        });
      }

      const session = userSession[0]; // There should be only one result

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
};
