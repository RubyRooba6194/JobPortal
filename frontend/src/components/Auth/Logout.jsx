import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";

export default function Logout() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await axios.get("/auth/logout");
    logout();
    navigate("/login");
  };

  return (
    <button
      title="Logout"
      onClick={handleLogout}
      className="inline-flex items-center text-red-600 hover:text-red-800"
    >
      <ArrowLeftOnRectangleIcon className="h-6 w-6 mr-1" />
      Logout
    </button>
  );
}
