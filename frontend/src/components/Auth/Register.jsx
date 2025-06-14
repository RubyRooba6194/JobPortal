// import { useState } from "react";
// import axios from "../../api/axios";
// import { useNavigate } from "react-router-dom";
// import * as Yup from "yup";

// const schema = Yup.object().shape({
//   name: Yup.string()
//     .min(2, "Name must be at least 2 characters")
//     .required("Name is required"),
//   email: Yup.string()
//     .email("Invalid email format")
//     .required("Email is required"),
//   password: Yup.string()
//     .min(8, "Password must be at least 8 characters")
//     .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
//     .matches(/[a-z]/, "Password must contain at least one lowercase letter")
//     .matches(/[0-9]/, "Password must contain at least one number")
//     .matches(
//       /[!@#$%^&*(),.?":{}|<>]/,
//       "Password must contain at least one special character"
//     )
//     .required("Password is required"),
// });

// export default function Register() {
//   const [form, setForm] = useState({ name: "", email: "", password: "" });
//   const [errors, setErrors] = useState({});
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });

//     // Clear field-specific error when user starts typing
//     if (errors[name]) {
//       setErrors({ ...errors, [name]: "" });
//     }

//     // Clear general error
//     if (error) {
//       setError("");
//     }
//   };

//   const validateField = async (fieldName, value) => {
//     try {
//       await schema.validateAt(fieldName, { [fieldName]: value });
//       setErrors({ ...errors, [fieldName]: "" });
//     } catch (err) {
//       setErrors({ ...errors, [fieldName]: err.message });
//     }
//   };

//   const handleBlur = (e) => {
//     const { name, value } = e.target;
//     validateField(name, value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setErrors({});
//     setLoading(true);

//     try {
//       // Validate entire form
//       await schema.validate(form, { abortEarly: false });

//       // Make API call (removed /api prefix since it's in baseURL)
//       const response = await axios.post("/api/auth/register", form);

//       console.log("Registration successful:", response.data);

//       // Navigate to login page
//       navigate("/login", {
//         state: { message: "Registration successful! Please login." },
//       });
//     } catch (err) {
//       console.error("Registration error:", err);

//       if (err.name === "ValidationError") {
//         // Handle Yup validation errors
//         const validationErrors = {};
//         err.inner.forEach((error) => {
//           validationErrors[error.path] = error.message;
//         });
//         setErrors(validationErrors);
//       } else if (err.response?.data?.message) {
//         // Handle backend error messages
//         setError(err.response.data.message);
//       } else if (err.response?.status === 404) {
//         setError(
//           "Registration endpoint not found. Please check server configuration."
//         );
//       } else if (err.response?.status === 409) {
//         setError("Email already exists. Please use a different email.");
//       } else if (err.response?.status >= 500) {
//         setError("Server error. Please try again later.");
//       } else if (err.code === "NETWORK_ERROR" || !err.response) {
//         setError("Network error. Please check your connection.");
//       } else {
//         setError("Registration failed. Please try again.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             Create your account
//           </h2>
//           <p className="mt-2 text-center text-sm text-gray-600">
//             Or{" "}
//             <button
//               type="button"
//               onClick={() => navigate("/login")}
//               className="font-medium text-indigo-600 hover:text-indigo-500 underline"
//             >
//               sign in to your existing account
//             </button>
//           </p>
//         </div>

//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div className="space-y-4">
//             {/* Name Field */}
//             <div>
//               <label htmlFor="name" className="sr-only">
//                 Full Name
//               </label>
//               <input
//                 id="name"
//                 name="name"
//                 type="text"
//                 autoComplete="name"
//                 required
//                 className={`relative block w-full px-3 py-2 border ${
//                   errors.name
//                     ? "border-red-300 placeholder-red-400 focus:ring-red-500 focus:border-red-500"
//                     : "border-gray-300 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500"
//                 } rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm`}
//                 placeholder="Full Name"
//                 value={form.name}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 disabled={loading}
//               />
//               {errors.name && (
//                 <p className="mt-1 text-sm text-red-600">{errors.name}</p>
//               )}
//             </div>

//             {/* Email Field */}
//             <div>
//               <label htmlFor="email" className="sr-only">
//                 Email address
//               </label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 autoComplete="email"
//                 required
//                 className={`relative block w-full px-3 py-2 border ${
//                   errors.email
//                     ? "border-red-300 placeholder-red-400 focus:ring-red-500 focus:border-red-500"
//                     : "border-gray-300 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500"
//                 } rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm`}
//                 placeholder="Email address"
//                 value={form.email}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 disabled={loading}
//               />
//               {errors.email && (
//                 <p className="mt-1 text-sm text-red-600">{errors.email}</p>
//               )}
//             </div>

//             {/* Password Field */}
//             <div>
//               <label htmlFor="password" className="sr-only">
//                 Password
//               </label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 autoComplete="new-password"
//                 required
//                 className={`relative block w-full px-3 py-2 border ${
//                   errors.password
//                     ? "border-red-300 placeholder-red-400 focus:ring-red-500 focus:border-red-500"
//                     : "border-gray-300 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500"
//                 } rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm`}
//                 placeholder="Password"
//                 value={form.password}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 disabled={loading}
//               />
//               {errors.password && (
//                 <p className="mt-1 text-sm text-red-600">{errors.password}</p>
//               )}

//               {/* Password Requirements */}
//               <div className="mt-2 text-xs text-gray-500">
//                 <p>Password must contain:</p>
//                 <ul className="list-disc list-inside mt-1 space-y-1">
//                   <li>At least 8 characters</li>
//                   <li>One uppercase letter</li>
//                   <li>One lowercase letter</li>
//                   <li>One number</li>
//                   <li>One special character</li>
//                 </ul>
//               </div>
//             </div>
//           </div>

//           {/* General Error Message */}
//           {error && (
//             <div className="rounded-md bg-red-50 p-4">
//               <div className="text-sm text-red-700">{error}</div>
//             </div>
//           )}

//           {/* Submit Button */}
//           <div>
//             <button
//               type="submit"
//               disabled={loading || Object.values(errors).some((error) => error)}
//               className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
//                 loading || Object.values(errors).some((error) => error)
//                   ? "bg-gray-400 cursor-not-allowed"
//                   : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//               } transition duration-150 ease-in-out`}
//             >
//               {loading ? (
//                 <>
//                   <svg
//                     className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     ></circle>
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                     ></path>
//                   </svg>
//                   Creating Account...
//                 </>
//               ) : (
//                 "Create Account"
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const schema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    )
    .required("Password is required"),
});

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
    if (error) setError("");
  };

  const validateField = async (fieldName, value) => {
    try {
      await schema.validateAt(fieldName, { [fieldName]: value });
      setErrors({ ...errors, [fieldName]: "" });
    } catch (err) {
      setErrors({ ...errors, [fieldName]: err.message });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setErrors({});
    setLoading(true);

    try {
      await schema.validate(form, { abortEarly: false });
      const response = await axios.post("/api/auth/register", form);
      navigate("/login", {
        state: { message: "Registration successful! Please login." },
      });
    } catch (err) {
      if (err.name === "ValidationError") {
        const validationErrors = {};
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.response?.status === 404) {
        setError(
          "Registration endpoint not found. Please check server configuration."
        );
      } else if (err.response?.status === 409) {
        setError("Email already exists. Please use a different email.");
      } else if (err.response?.status >= 500) {
        setError("Server error. Please try again later.");
      } else if (err.code === "NETWORK_ERROR" || !err.response) {
        setError("Network error. Please check your connection.");
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-100 via-purple-100 to-pink-100">
      <div className="max-w-xl w-full bg-white/90 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-indigo-100">
        <div className="flex flex-col items-center mb-6">
          {/* Add your logo here if you have one */}
          <span className="inline-block bg-gradient-to-r from-indigo-500 to-pink-500 p-3 rounded-full shadow-lg mb-2">
            <svg
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 01-8 0M12 15v6m0-6c-3.866 0-7-3.134-7-7a7 7 0 1114 0c0 3.866-3.134 7-7 7z"
              />
            </svg>
          </span>
          <h2 className="text-3xl font-extrabold text-indigo-700 drop-shadow text-center">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-500">
            Or{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="font-semibold text-indigo-600 hover:text-indigo-800 underline transition"
            >
              sign in to your existing account
            </button>
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className={`block w-full px-4 py-3 border ${
                errors.name
                  ? "border-red-300 placeholder-red-400 focus:ring-red-400 focus:border-red-400"
                  : "border-gray-300 placeholder-gray-400 focus:ring-indigo-400 focus:border-indigo-400"
              } rounded-lg focus:outline-none focus:ring-2 transition sm:text-sm shadow`}
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={loading}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className={`block w-full px-4 py-3 border ${
                errors.email
                  ? "border-red-300 placeholder-red-400 focus:ring-red-400 focus:border-red-400"
                  : "border-gray-300 placeholder-gray-400 focus:ring-indigo-400 focus:border-indigo-400"
              } rounded-lg focus:outline-none focus:ring-2 transition sm:text-sm shadow`}
              placeholder="Email address"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={loading}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              className={`block w-full px-4 py-3 border ${
                errors.password
                  ? "border-red-300 placeholder-red-400 focus:ring-red-400 focus:border-red-400"
                  : "border-gray-300 placeholder-gray-400 focus:ring-indigo-400 focus:border-indigo-400"
              } rounded-lg focus:outline-none focus:ring-2 transition sm:text-sm shadow`}
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={loading}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
            <div className="mt-2 text-xs text-gray-500">
              <p className="font-semibold mb-1">Password must contain:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>At least 8 characters</li>
                <li>One uppercase letter</li>
                <li>One lowercase letter</li>
                <li>One number</li>
                <li>One special character</li>
              </ul>
            </div>
          </div>

          {/* General Error Message */}
          {error && (
            <div className="rounded-md bg-red-50 p-3">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading || Object.values(errors).some((error) => error)}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-base font-semibold rounded-lg text-white shadow-lg transition duration-150 ease-in-out ${
                loading || Object.values(errors).some((error) => error)
                  ? "bg-indigo-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600"
              }`}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}