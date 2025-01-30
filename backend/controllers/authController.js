const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");

// Register User
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({ name, email, password });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.status(201).json({ token });
  } catch (err) {
    res
      .status(400)
      .json({ message: "User registration failed", error: err.message });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.status(200).json({ token });
  } catch (err) {
    res.status(400).json({ message: "Login failed", error: err.message });
  }
};

// Forgot Password
// Forgot Password
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a reset token
    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });

    // Save the reset token and expiry in the user document
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    // Send email with reset link
    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;
    const message = `You are receiving this email because you (or someone else) has requested to reset your password. Please click the link below to reset your password:\n\n${resetUrl}`;

    await sendEmail({
      to: user.email,
      subject: "Password Reset Request",
      text: message,
    });

    res.status(200).json({ message: "Email sent successfully" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Email could not be sent", error: err.message });
  }
};

module.exports = { registerUser, loginUser, forgotPassword };
