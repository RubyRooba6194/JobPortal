const express = require("express");
const router = express.Router();
const { register, login, logout } = require("../controllers/authController");

router.post("/register", async (req, res) => {
  try {
    // ... registration logic
  } catch (err) {
    console.error("Registration error:", err); // <-- THIS LINE logs the real error
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/login", login);
router.get("/logout", logout);

module.exports = router;
