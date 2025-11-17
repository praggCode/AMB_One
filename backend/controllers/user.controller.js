const User = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken"); // Import jsonwebtoken

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { name, email, password, phone } = req.body;
    const hashedPass = await User.hashedPassword(password);
    const userExists = await userService.findUserByEmailOrPhone({
      email,
      phone,
    });
    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }
    const user = await userService.createUser({
      name,
      email,
      password: hashedPass,
      phone,
    });
    const token = User.generateAuthToken(user);
    res.status(201).json({ user, token });
  } catch (err) {
    console.error("Register error:", err.message, err.stack);
    const status = err.status || 500;
    if (status === 400) {
      return res.status(400).json({ error: "User already exists" });
    }
    return res
      .status(500)
      .json({ error: err.message || "Internal server error" });
  }
};

module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    const user = await userService.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const isMatch = await userService.comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = User.generateAuthToken(user);
    res.cookie("token", token);

    res.status(200).json({ user, token });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.getUserProfile = async (req, res, next) => {
  res.status(200).json(req.user);
};

module.exports.logoutUser = async (req, res, next) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "Logged out successfully" });
};
