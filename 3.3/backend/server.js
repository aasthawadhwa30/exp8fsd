const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// 🔹 Import routes
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");

const app = express();

// 🔹 Middlewares
app.use(express.json());
app.use(cors());

// 🔹 MongoDB Connection
mongoose.connect("mongodb://localhost:27017/rbacDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// 🔹 Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

// 🔹 Test route
app.get("/", (req, res) => {
  res.send("API Running");
});

// 🔹 Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});