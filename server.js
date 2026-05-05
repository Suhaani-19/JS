const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Port
const PORT = process.env.PORT || 5000;

// Routes
app.get("/", (req, res) => {
  res.send("🚀 Server is running successfully!");
});

// Example API route
app.get("/api/example", (req, res) => {
  res.json({
    message: "Hello from backend 👋",
    success: true,
  });
});

// POST example
app.post("/api/data", (req, res) => {
  const data = req.body;

  res.json({
    message: "Data received successfully",
    receivedData: data,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});