const jwt = require("jsonwebtoken");

const SECRET = "secretkey";

// 🔹 Verify Token
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) return res.status(403).json("No token");

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json("Invalid token");
  }
};

// 🔹 Admin check
const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json("Access Denied");
  }
  next();
};

module.exports = { verifyToken, isAdmin };