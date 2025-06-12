require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
// const xss = require("xss-clean"); // REMOVE THIS LINE
const path = require("path");
const rateLimiter = require("./middlewares/rateLimiter");
const logger = require("./utils/logger");
const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(logger);
app.use(rateLimiter);
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
// app.use(xss()); // REMOVE THIS LINE

app.use(
  "/uploads/resumes",
  express.static(path.join(__dirname, "uploads/resumes"))
);

app.get("/ping", (req, res) => res.json({ msg: "pong" }));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/job", require("./routes/job"));

app.use((req, res, next) => {
  res.status(404).json({ message: "Not Found" });
});

app.use((err, req, res, next) => {
  console.error("Server error:", err);
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ message: "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
