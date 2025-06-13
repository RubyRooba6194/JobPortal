import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get("/auth/profile");
      if (response.data && response.data.user) {
        setUser(response.data.user);
        console.log("User authenticated:", response.data.user);
      } else {
        console.log("No user in response");
        setUser(null);
      }
    } catch (error) {
      console.log("User not authenticated", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      await axios.get("/auth/logout");
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
      setUser(null);
    }
  };

  return { user, login, logout, loading, checkAuthStatus };
}
