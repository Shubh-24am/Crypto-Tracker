import express from "express";
import User from "../models/users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// Register
router.post("/v1/createuser", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        status: false,
        message: "Name, email, and password are required",
      });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        status: false,
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
    });
    await user.save();

    res.setHeader("Content-Type", "application/json");
    res.status(201).json({ status: true, message: { name, email } });
  } catch (err) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).json({ status: false, message: err.message });
  }
});

// Login
router.post("/v1/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.setHeader("Content-Type", "application/json");
      return res.status(400).json({ status: false, message: "Email and password are required" });
    }

    if (!process.env.JWT_SECRET) {
      res.setHeader("Content-Type", "application/json");
      return res.status(500).json({ status: false, message: "JWT secret is not configured" });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      res.setHeader("Content-Type", "application/json");
      return res.status(404).json({ status: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.setHeader("Content-Type", "application/json");
      return res.status(400).json({ status: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.setHeader("Content-Type", "application/json");
    res.json({ status: true, message: { name: user.name, email: user.email, token } });
  } catch (err) {
    res.setHeader("Content-Type", "application/json");
    res.status(500).json({ status: false, message: err.message });
  }
});

export default router;