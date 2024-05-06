// routes/auth.js
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const Login = require("../model/login");
const User = require("../model/register");
const ForgotPassword = require("../model/forgotPassword");
const sendMail = require("../services/email.service");

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password, socketId } = req.body; // Extract email, password, and socketId from the request body

    // Find the user by email
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check if the user has a socketId assigned
    if (!user.socketId) {
      // If socketId is not assigned, assign it and save it to MongoDB
      user.socketId = socketId;
      await user.save();
    } else if (user.socketId !== socketId) {
      // If the user's socketId is different from the current socketId, update it
      user.socketId = socketId;
      await user.save();
    }

    // Log the login
    const loginRecord = new Login({
      email: user.email,
    });
    await loginRecord.save();

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Error logging in:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const verificationCode = Math.floor(100000 + Math.random() * 900000);

    const forgotPasswordEntry = new ForgotPassword({
      email,
      verificationCode: verificationCode.toString(),
    });
    await forgotPasswordEntry.save();

    // Send verification email
    await sendMail(email, verificationCode);

    res.status(200).json({ message: "Verification code sent successfully." });
  } catch (error) {
    console.error("Error sending verification code:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Register route
router.post("/register", async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Generate a verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000);

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ userName, email, password: hashedPassword });

    newUser.verificationCode = verificationCode;
    await newUser.save();

    await sendMail(email, verificationCode);

    // Respond with success message
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Verify code route
router.post("/verify-code", async (req, res) => {
  try {
    const { email } = req.body;
    res.status(200).json({ message: "Verification code is valid" });
  } catch (error) {
    console.error("Error verifying code:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
