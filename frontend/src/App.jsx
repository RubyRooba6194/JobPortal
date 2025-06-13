import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Logout from "./components/Auth/Logout";
import JobForm from "./components/JobForm";
import ApplicationsList from "./components/ApplicationsList";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import useAuth from "./hooks/useAuth";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow flex items-center p-4 justify-between">
        <span className="font-bold text-xl text-blue-700">Job Portal</span>
        <div>
          {user ? (
            <>
              <a href="/dashboard" className="mr-4 text-blue-600">
                Dashboard
              </a>
              <Logout />
            </>
          ) : (
            <>
              <a href="/login" className="mr-4 text-blue-600">
                Login
              </a>
              <a href="/register" className="text-blue-600">
                Register
              </a>
            </>
          )}
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/dashboard" /> : <Register />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" /> : <Login />}
        />
        {/* <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/login" />}
        /> */}

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/apply"
          element={user ? <JobForm /> : <Navigate to="/login" />}
        />
        <Route
          path="/applications"
          element={user ? <ApplicationsList /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<div className="p-8">404 Not Found</div>} />
      </Routes>
    </div>
  );
}
