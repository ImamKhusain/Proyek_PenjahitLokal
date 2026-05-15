const adminMiddleware = (req, res, next) => {
  try {

    // cek apakah user login
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    // cek role admin
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied. Admin only",
      });
    }

    next();

  } catch (error) {

    res.status(500).json({
      message: "Middleware error",
      error: error.message,
    });

  }
};

module.exports = adminMiddleware;