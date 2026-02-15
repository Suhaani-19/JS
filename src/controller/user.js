const { createUser } = require("../services/user.js");

async function handleUserCollection(req, res) {
  try {
    const userData = req.body;

    const user = await createUser(userData);

    res.status(201).json({
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
}

module.exports = { handleUserCollection };
