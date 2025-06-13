const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register function
exports.register = async (req, res) => {
  try {
    console.log("Register: Request received", req.body);

    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      console.log("Register: Missing required fields");
      return res.status(400).json({
        message: "All fields are required",
        missingFields: {
          name: !name,
          email: !email,
          password: !password,
        },
      });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log("Register: Invalid email format");
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Password strength validation
    if (password.length < 8) {
      console.log("Register: Password too short");
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }

    // Check if user already exists
    console.log("Register: Checking if user exists with email:", email);
    const userExists = await User.findOne({ email });

    if (userExists) {
      console.log("Register: User already exists");
      return res.status(409).json({ message: "Email already registered" });
    }

    // Hash password
    console.log("Register: Hashing password");
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    console.log("Register: Creating new user");
    const newUser = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
    });

    console.log("Register: User created successfully with ID:", newUser._id);

    // Return success response (don't send password)
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Register: Database or server error:", error);

    // Handle specific MongoDB errors
    if (error.code === 11000) {
      return res.status(409).json({ message: "Email already registered" });
    }

    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return res.status(400).json({
        message: "Validation failed",
        errors: validationErrors,
      });
    }

    res
      .status(500)
      .json({ message: "Internal server error during registration" });
  }
};

// Login function
exports.login = async (req, res) => {
  try {
    console.log("Login: Request received for email:", req.body.email);

    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      console.log("Login: Missing email or password");
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      console.log("Login: User not found");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("Login: Invalid password");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        name: user.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Set HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    console.log("Login: Successful for user:", user.email);

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login: Server error:", error);
    res.status(500).json({ message: "Internal server error during login" });
  }
};

// Logout function
exports.logout = (req, res) => {
  try {
    console.log("Logout: Request received");

    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    console.log("Logout: Cookie cleared successfully");
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout: Error:", error);
    res.status(500).json({ message: "Error during logout" });
  }
};
