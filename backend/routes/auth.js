// const express = require("express");
// const router = express.Router();
// const { register, login, logout } = require("../controllers/authController");
// const authController = require("../controllers/authController");
// const authMiddleware = require("../middlewares/auth"); // If you have JWT auth middleware


// // Use the imported register function from controller
// router.post("/register", register);
// router.post("/login", login);
// router.get("/logout", logout);
// // Add this profile route:
// router.get("/profile", authMiddleware, authController.profile);


// module.exports = router;


const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/auth");

// Register route
router.post("/register", authController.register);

// Login route
router.post("/login", authController.login);

// Logout route
router.get("/logout", authController.logout);

// Profile route (protected)
router.get("/profile", authMiddleware, authController.profile);

module.exports = router;