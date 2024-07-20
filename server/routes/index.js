const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/register");
const Login = require("../model/login");
const ForgotPassword = require("../model/forgotPassword");
const sendMail = require("../services/email.service");

const router = express.Router();

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password, socketId } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Assign or update socketId
    if (!user.socketId || user.socketId !== socketId) {
      user.socketId = socketId;
      await user.save();
    }

    // Generate access token
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );

    // Generate refresh token
    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_TOKEN_SECRET
    );

    // Log the login
    const loginRecord = new Login({ email: user.email });
    await loginRecord.save();

    // Send the tokens along with the response
    res
      .status(200)
      .json({ message: "Login successful", accessToken, refreshToken });
  } catch (error) {
    console.error("Error logging in:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
});

// Forgot password route
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a verification code
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const forgotPasswordEntry = new ForgotPassword({
      email,
      verificationCode,
    });
    await forgotPasswordEntry.save();

    // Send email with verification code
    await sendMail(email, verificationCode);

    res.status(200).json({ message: "Verification code sent successfully" });
  } catch (error) {
    console.error("Error sending verification code:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Register route
router.post("/register", async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    // Check if the user already
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000);

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
      verificationCode,
    });
    await newUser.save();

    // Send verification email
    await sendMail(email, verificationCode);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Verify route
router.post("/verify-code", async (req, res) => {
  try {
    const { email, verificationCode } = req.body;

    const forgotPasswordEntry = await ForgotPassword.findOne({
      email,
      verificationCode,
    });
    if (!forgotPasswordEntry) {
      return res.status(400).json({ message: "Invalid verification code" });
    }

    res.status(200).json({ message: "Verification code is valid" });
  } catch (error) {
    console.error("Error verifying code:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
