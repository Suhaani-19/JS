const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ===============================
// Middleware
// ===============================
app.use(cors());
app.use(express.json());

// ===============================
// Config
// ===============================
const PORT = process.env.PORT || 5000;

// ===============================
// Routes
// ===============================

// Health Check Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 Server is running successfully!",
  });
});

// Example GET API
app.get("/api/example", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Hello from backend 👋",
    data: {
      version: "1.0.0",
      author: "Suhaani",
    },
  });
});

// Example POST API
app.post("/api/data", (req, res) => {
  try {
    const data = req.body;

    // Validation
    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No data provided",
      });
    }

    res.status(201).json({
      success: true,
      message: "✅ Data received successfully",
      receivedData: data,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

// ===============================
// 404 Route Handler
// ===============================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "❌ Route not found",
  });
});
// ===============================
// Global Error Handler
// ===============================
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    success: false,
    message: "Something went wrong!",
  });
});

app.listen(PORT, () => {
  console.log(`
=================================
🚀 Server running successfully
🌐 URL: http://localhost:${PORT}
📦 Environment: ${process.env.NODE_ENV || "development"}
=================================
  `);
});