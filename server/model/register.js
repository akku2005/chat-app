const mongoose = require("mongoose");

const RegisterUserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const RegisterUser = mongoose.model("RegisterUser", RegisterUserSchema);

module.exports = RegisterUser;
