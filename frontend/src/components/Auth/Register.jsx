import { useState } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain an uppercase letter")
    .matches(/[0-9]/, "Password must contain a number")
    .required("Password is required"),
});

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await schema.validate(form);
      // If your axios instance uses a baseURL of "/api", then this can be just "/auth/register"
      await axios.post("/api/auth/register", form, {
        withCredentials: true, // if backend needs cookie for login
      });
      setLoading(false);
      navigate("/login");
    } catch (err) {
      setLoading(false);
      // Show Yup validation errors or backend error messages
      if (err.name === "ValidationError") {
        setError(err.message);
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Registration failed");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow"
    >
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        className="input"
        required
        autoComplete="name"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="input"
        required
        autoComplete="email"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="input"
        required
        autoComplete="new-password"
      />
      {error && <p className="text-red-500">{error}</p>}
      <button
        className="btn-primary mt-4 w-full"
        disabled={loading}
        type="submit"
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
}
