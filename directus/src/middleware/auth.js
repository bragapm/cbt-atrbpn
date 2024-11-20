export const authMiddleware = (database) => {
  return async (req, res, next) => {
    try {
      // Ambil token dan device dari header
      const authHeader = req.headers.authorization;
      const device = req.headers["device"];

      console.log({ device });

      // Validasi keberadaan token dan device
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
          status: "error",
          message: "Missing or invalid authorization token",
        });
      }

      if (!device) {
        return res.status(400).json({
          status: "error",
          message: "Device information is required",
        });
      }

      // Ambil user ID dari middleware accountability Directus
      const userId = req.accountability?.user;

      if (!userId) {
        return res.status(403).json({
          status: "error",
          message: "User is not authorized",
        });
      }

      // Validasi Device ID dengan database menggunakan Knex instance
      const userRecord = await database("coupon")
        .select("device")
        .where({ user_id: userId })
        .first();

      if (!userRecord) {
        return res.status(404).json({
          status: "error",
          message: "User not found",
        });
      }

      if (userRecord.device && userRecord.device !== device) {
        return res.status(403).json({
          status: "error",
          message: "Invalid device. Login from another device is not allowed.",
        });
      }

      // Jika device ID cocok atau user baru (device ID kosong), lanjutkan
      req.user = userId;
      next();
    } catch (error) {
      console.error("Authentication error:", error.message);
      res.status(500).json({
        status: "error",
        message: "Internal server error during authentication",
      });
    }
  };
};
