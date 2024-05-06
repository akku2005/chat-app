const express = require("express");
const router = express.Router();
const RegisterUser = require("../model/register.js");

router.get("/users", async (req, res) => {
  try {
    const users = await RegisterUser.find({}, "userName email");
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
