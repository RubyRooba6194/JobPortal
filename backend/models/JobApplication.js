const mongoose = require("mongoose");

const JobApplicationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: String,
    email: String,
    phone: String,
    address: String,
    education: String,
    experience: String,
    skills: [String],
    certifications: [String],
    linkedin: String,
    github: String,
    portfolio: String,
    dob: String,
    gender: String,
    languages: [String],
    achievements: String,
    references: String,
    coverLetter: String,
    resume: String, // File path
  },
  { timestamps: true }
);

module.exports = mongoose.model("JobApplication", JobApplicationSchema);
