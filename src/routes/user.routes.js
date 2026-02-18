const express = require("express");
const router = express.Router();

const { handleUserCollection } = require("../controller/user.js");


router.post("/create", handleUserCollection);

router.get("/", (req, res) => {
  res.send("Get all users");
});

router.put("/update/:id", (req, res) => {
  res.send(`Update user with id ${req.params.id}`);
});

router.delete("/delete/:id", (req, res) => {
  res.send(`Delete user with id ${req.params.id}`);
});

module.exports = router;
