require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const rateLimit = require("express-rate-limit");

const logger = require("./utils/logger");
const connectDB = require("./config/db");

const app = express();

// Connect to DB
connectDB();

// Middleware
app.use(logger);
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

// ✅ SIMPLE CORS SETUP FOR DEV
app.use(cors({
  origin: "http://localhost:5173", // allow your frontend
  credentials: true, // allow cookies
}));

// ✅ SIMPLE RATE LIMITING
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 1000, // dev-friendly
});
app.use(limiter);

// Serve static resumes
app.use(
  "/uploads/resumes",
  express.static(path.join(__dirname, "uploads/resumes"))
);

// Health check
app.get("/ping", (req, res) => res.json({ msg: "pong" }));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/job", require("./routes/job"));

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Not Found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  if (res.headersSent) return next(err);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
