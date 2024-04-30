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
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Log the login
    const loginRecord = new Login({
      email: user.email,
      password: user.password,
    });
    await loginRecord.save();

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Error logging in:", error.message);
    res.status(500).json({ message: "Server Error" });
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

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with hashed password
    const newUser = new User({ userName, email, password: hashedPassword });

    // Save the user details and verification code to the database
    newUser.verificationCode = verificationCode;
    await newUser.save();

    // Send verification email
    await sendMail(email, verificationCode);

    // Respond with success message
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
});

// Forgot password route
router.post("/forgot-password", async (req, res) => {
  try {
    const { email, enterCode } = req.body;

    // Generate a random 6-digit verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000);

    // Save the email and verification code to the database
    const forgotPasswordEntry = new ForgotPassword({
      email,
      verificationCode: verificationCode.toString(),
    });
    await forgotPasswordEntry.save();

    await sendMail(email, verificationCode);
    if (!forgotPasswordEntry || forgotPasswordEntry.enterCode !== enterCode) {
      return res.status(400).json({ message: "Invalid verification code" });
    }
    res.status(200).json({ message: "Verification code sent successfully." });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
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