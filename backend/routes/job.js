const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const upload = require("../middlewares/upload");
const { apply, myApplications } = require("../controllers/jobController");

router.post("/apply", auth, upload.single("resume"), apply);
router.get("/mine", auth, myApplications);

module.exports = router;
