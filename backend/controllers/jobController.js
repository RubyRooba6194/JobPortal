const JobApplication = require("../models/JobApplication");
const { sanitizeBody } = require("../utils/sanitizer");

exports.apply = async (req, res) => {
  try {
    const sanitized = sanitizeBody(req.body);

    // Validate required fields server-side!
    if (!sanitized.name || !sanitized.email || !sanitized.phone)
      return res.status(400).json({ message: "Missing required fields" });

    const jobApp = new JobApplication({
      ...sanitized,
      user: req.user.id,
      resume: req.file ? req.file.filename : "",
    });
    await jobApp.save();
    res.status(201).json({ message: "Application submitted" });
  } catch (err) {
    res.status(500).json({ message: "Application error" });
  }
};

exports.myApplications = async (req, res) => {
  try {
    const apps = await JobApplication.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(apps);
  } catch {
    res.status(500).json({ message: "Error fetching applications" });
  }
};
