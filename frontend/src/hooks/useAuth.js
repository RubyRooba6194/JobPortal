import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Could add /api/auth/profile if you implement it
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) setUser(savedUser);
  }, []);

  const login = (user) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return { user, login, logout };
}
