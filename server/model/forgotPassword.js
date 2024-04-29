const mongoose = require("mongoose");

// Define the schema for resetting passwords
const ForgotPasswordSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  verificationCode: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a model for the schema
const ForgotPassword = mongoose.model("ForgotPassword", ForgotPasswordSchema);

module.exports = ForgotPassword;
