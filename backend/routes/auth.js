const express = require("express");
const router = express.Router();
const { register, login, logout } = require("../controllers/authController");

// Use the imported register function from controller
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

module.exports = router;
