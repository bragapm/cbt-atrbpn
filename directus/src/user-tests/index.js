export default (router, { services, exceptions }) => {
  const { ItemsService } = services;
  const { UnauthorizedException } = exceptions;

  router.get("/", async (req, res) => {
    try {
      // Check for Bearer Token Authorization
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new UnauthorizedException(
          "Missing or invalid authorization token."
        );
      }
      const user = req.accountability.user; // Assuming accountability middleware handles token

      if (!user) {
        throw new UnauthorizedException("User is not authorized.");
      }

      // Fetch user test sessions where end_time > current time and end_attempt_at is null
      const userSessionService = new ItemsService("user_session_test", {
        schema: req.schema,
      });

      const currentTime = new Date(); // Get the current time

      const userSessions = await userSessionService.readByQuery({
        filter: {
          user: user, // Filter by current user
          deleted_at: { _null: true }, // Ensure deleted_at is null
          "session.end_time": { _gt: currentTime }, // end_time must be greater than the current time
          end_attempt_at: { _null: true }, // end_attempt_at must be null
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
};
