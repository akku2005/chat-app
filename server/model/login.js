const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Login = mongoose.model("Login", UserSchema); // Change the model name to Login

// Export the Login model
module.exports = Login;
