// /controllers/authController.js
import jwt from "jsonwebtoken";
import { User } from "../models/index.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const signToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// ✅ SIGNUP
export const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password)
      return res.status(400).json({ error: "All fields are required" });

    const existing = await User.findOne({ where: { email } });
    if (existing)
      return res.status(400).json({ error: "Email already exists" });

    const user = await User.create({ firstName, lastName, email, password });

    const token = signToken(user.id, user.role);

    return res.json({
      message: "Signup successful",
      token,
      user: {
        id: user.id,
        firstName,
        lastName,
        email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

// ✅ LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user)
      return res.status(400).json({ error: "Invalid email or password" });

    const valid = await user.validatePassword(password);
    if (!valid)
      return res.status(400).json({ error: "Invalid email or password" });

    const token = signToken(user.id, user.role);

    return res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ FORGOT PASSWORD (simple)
export const forgotPassword = async (req, res) => {
  return res.json({
    message:
      "In real production, an email would be sent. For this capstone, just implement UI.",
  });
};

// ✅ RESET PASSWORD (simple)
export const resetPassword = async (req, res) => {
  return res.json({
    message:
      "Reset password endpoint stub. Implement UI only for capstone requirements.",
  });
};
