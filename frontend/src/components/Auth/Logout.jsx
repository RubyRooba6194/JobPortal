import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";

export default function Logout() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await axios.get("/api/auth/logout");
      logout();
      alert("Logout successfully");
      navigate("/login");
    } catch (err) {
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <button
      type="button"
      title="Logout"
      onClick={handleLogout}
      className="inline-flex items-center text-red-600 hover:text-red-800"
    >
      <ArrowLeftOnRectangleIcon className="h-6 w-6 mr-1" />
      Logout
    </button>
  );
}