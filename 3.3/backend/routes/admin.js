const express = require("express");
const router = express.Router();

const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

// 🔐 Admin-only route
router.get("/dashboard", verifyToken, isAdmin, (req, res) => {
  res.json("Welcome Admin Dashboard");
});

module.exports = router;