// Create a user schema that represents the structure of a user document in MongoDB
// models/User.js

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verified: { type: Boolean, default: false },
  otp: { type: Number },
  lastLogin: { type: Date }, // Default to current time
});

const User = mongoose.model("User", userSchema);

module.exports = User;
