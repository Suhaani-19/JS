const express = require("express");
const cors = require("cors");
require("dotenv").config();
// imports
const app = express();
const logger = require("./middleware/logger");

app.use(logger);

const PORT = process.env.PORT || 5000;


app.use(cors());

app.use(
  express.json({
    limit: "10mb",
  })
);

// Request Logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});


app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 Server is running successfully!",
    timestamp: new Date().toISOString(),
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
    console.error("POST /api/data Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});


app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// ===============================
// Global Error Handler
// ===============================
app.use((err, req, res, next) => {
  console.error("Global Error:", err);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Something went wrong!",
  });
});

app.listen(PORT, () => {
  console.log(`
=================================
🚀 Server Running Successfully
🌐 URL: http://localhost:${PORT}
📦 Environment: ${process.env.NODE_ENV || "development"}
=================================
`);
});