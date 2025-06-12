import { useState } from "react";
import axios from "../api/axios";
import * as Yup from "yup";

const schema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  phone: Yup.string()
    .matches(/^[0-9]{10,15}$/)
    .required(),
  address: Yup.string().required(),
  education: Yup.string().required(),
  experience: Yup.string().required(),
  skills: Yup.string().required(),
  certifications: Yup.string(),
  linkedin: Yup.string().url().nullable(),
  github: Yup.string().url().nullable(),
  portfolio: Yup.string().url().nullable(),
  dob: Yup.string().required(),
  gender: Yup.string().required(),
  languages: Yup.string().required(),
  achievements: Yup.string(),
  references: Yup.string(),
  coverLetter: Yup.string(),
});

export default function JobForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    education: "",
    experience: "",
    skills: "",
    certifications: "",
    linkedin: "",
    github: "",
    portfolio: "",
    dob: "",
    gender: "",
    languages: "",
    achievements: "",
    references: "",
    coverLetter: "",
  });
  const [resume, setResume] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleResume = (e) => setResume(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await schema.validate(form);
      if (!resume) return setError("Resume required");
      const formData = new FormData();
      Object.keys(form).forEach((key) => formData.append(key, form[key]));
      formData.append("resume", resume);
      await axios.post("/job/apply", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccess("Application submitted!");
      setForm({
        name: "",
        email: "",
        phone: "",
        address: "",
        education: "",
        experience: "",
        skills: "",
        certifications: "",
        linkedin: "",
        github: "",
        portfolio: "",
        dob: "",
        gender: "",
        languages: "",
        achievements: "",
        references: "",
        coverLetter: "",
      });
      setResume(null);
    } catch (err) {
      setError(err.message || "Submission failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-8 bg-white rounded shadow"
    >
      <h2 className="text-2xl font-bold mb-6">Job Application</h2>
      <div className="grid grid-cols-2 gap-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="input"
          required
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="input"
          required
        />
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="input"
          required
        />
        <input
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Address"
          className="input"
          required
        />
        <input
          name="education"
          value={form.education}
          onChange={handleChange}
          placeholder="Education"
          className="input"
          required
        />
        <input
          name="experience"
          value={form.experience}
          onChange={handleChange}
          placeholder="Experience"
          className="input"
          required
        />
        <input
          name="skills"
          value={form.skills}
          onChange={handleChange}
          placeholder="Skills (comma separated)"
          className="input"
          required
        />
        <input
          name="certifications"
          value={form.certifications}
          onChange={handleChange}
          placeholder="Certifications"
          className="input"
        />
        <input
          name="linkedin"
          value={form.linkedin}
          onChange={handleChange}
          placeholder="LinkedIn Profile URL"
          className="input"
        />
        <input
          name="github"
          value={form.github}
          onChange={handleChange}
          placeholder="GitHub Profile URL"
          className="input"
        />
        <input
          name="portfolio"
          value={form.portfolio}
          onChange={handleChange}
          placeholder="Portfolio URL"
          className="input"
        />
        <input
          name="dob"
          value={form.dob}
          onChange={handleChange}
          placeholder="Date of Birth"
          type="date"
          className="input"
          required
        />
        <input
          name="gender"
          value={form.gender}
          onChange={handleChange}
          placeholder="Gender"
          className="input"
          required
        />
        <input
          name="languages"
          value={form.languages}
          onChange={handleChange}
          placeholder="Languages Known"
          className="input"
          required
        />
      </div>
      <textarea
        name="achievements"
        value={form.achievements}
        onChange={handleChange}
        placeholder="Achievements"
        className="input"
      />
      <textarea
        name="references"
        value={form.references}
        onChange={handleChange}
        placeholder="References"
        className="input"
      />
      <textarea
        name="coverLetter"
        value={form.coverLetter}
        onChange={handleChange}
        placeholder="Cover Letter"
        className="input"
      />
      <div>
        <label className="block mb-2">
          Upload Resume (PDF/DOC/DOCX, max 2MB):
        </label>
        <input
          type="file"
          name="resume"
          accept=".pdf,.doc,.docx"
          onChange={handleResume}
          className="mb-4"
          required
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-600">{success}</p>}
      <button className="btn-primary mt-4">Submit Application</button>
    </form>
  );
}
