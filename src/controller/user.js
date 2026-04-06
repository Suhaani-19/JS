const { createUser } = require("../services/user.js");

async function handleUserCollection(req, res) {
  try {
    const { name, email, password } = req.body;

    // ✅ Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const user = await createUser({ name, email, password });

    return res.status(201).json({
      message: "User created successfully",
      data: user,
    });

  } catch (error) {
    console.error("Create User Error:", error);

    // 🔥 Duplicate email error (Mongo)
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

module.exports = { handleUserCollection };