const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {

    const authHeader = req.headers.authorization;

    // cek token ada atau tidak
    if (!authHeader) {
      return res.status(401).json({
        message: "Access denied. No token provided",
      });
    }

    // ambil token
    const token = authHeader.split(" ")[1];

    // verifikasi token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // simpan data user ke request
    req.user = decoded;

    next();

  } catch (error) {

    res.status(401).json({
      message: "Invalid token",
      error: error.message,
    });

  }
};

module.exports = authMiddleware;