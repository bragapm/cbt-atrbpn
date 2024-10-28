export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new Error("Missing or invalid authorization token.");
    }
    const user = req.accountability.user; // Assuming accountability middleware handles token

    if (!user) {
      throw new Error("User is not authorized.");
    }

    req.user = user;
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Authentication error:", error); // Log the exact error
    res.status(500).json({ status: "error", message: "Authentication failed" });
  }
};
