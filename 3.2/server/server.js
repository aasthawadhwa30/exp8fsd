const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const SECRET = "mysecretkey";

app.post("/api/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  console.log("DATA:", username, password); // 👈 important

  if (username === "aastha" && password === "123456") {
    const token = jwt.sign({ username }, SECRET, { expiresIn: "1h" });
    return res.json({ token });
  }

  return res.status(401).json({ error: "Invalid credentials" });
});

function verifyToken(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ error: "Missing token" });
  }

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: "Invalid token" });

    req.user = decoded;
    next();
  });
}

app.get("/api/protected", verifyToken, (req, res) => {
  res.json({ message: "Welcome aastha" });
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});