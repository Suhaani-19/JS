const express = require("express");
const router = express.Router();

const { handleUserCollection } = require("../controller/user.js");

// Create user
router.post("/create", handleUserCollection);

// Get all users
router.get("/", (req, res) => {
  res.send("Get all users");
});

// Update user
router.put("/update/:id", (req, res) => {
  res.send(`Update user with id ${req.params.id}`);
});

// Delete user
router.delete("/delete/:id", (req, res) => {
  res.send(`Delete user with id ${req.params.id}`);
});

module.exports = router;
