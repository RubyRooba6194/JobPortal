const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    console.log("Register: start");
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      console.log("Register: missing fields");
      return res.status(400).json({ message: "All fields required" });
    }
    const userExists = await User.findOne({ email });
    console.log("Register: checked userExists", userExists);
    if (userExists) {
      console.log("Register: email already registered");
      return res.status(409).json({ message: "Email already registered" });
    }
    const hash = await bcrypt.hash(password, 12);
    console.log("Register: hashed password");
    const user = await User.create({ name, email, password: hash });
    console.log("Register: user created", user.email);
    res.status(201).json({ message: "Registered successfully" });
  } catch (err) {
    console.error("Register: error", err);
    res.status(500).json({ message: "Registration error" });
  }
};
// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 86400000,
    });
    res.json({
      message: "Login successful",
      user: { name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login error" });
  }
};

// Logout
exports.logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
};
