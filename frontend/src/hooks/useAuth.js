
import { useEffect, useState, useRef } from "react";
import axios from "../api/axios";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const pollingRef = useRef(null);

  // Initial check on mount
  useEffect(() => {
    checkAuthStatus();
    // Cleanup polling on unmount
    return () => clearPolling();
    // eslint-disable-next-line
  }, []);

  // Polling logic: restart polling when user changes
  useEffect(() => {
    if (user) {
      startPolling();
    } else {
      clearPolling();
    }
    // Cleanup on unmount or user change
    return () => clearPolling();
    // eslint-disable-next-line
  }, [user]);

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get("/api/auth/profile");
      if (response.data && response.data.user) {
        setUser(response.data.user);
        console.log("User authenticated:", response.data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Polling functions
  const startPolling = () => {
    if (pollingRef.current) return; // Prevent multiple intervals
    pollingRef.current = setInterval(async () => {
      try {
        const response = await axios.get("/api/auth/profile");
        if (response.data && response.data.user) {
          setUser(response.data.user);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setUser(null); // Session expired, log user out
          clearPolling();
        }
      }
    }, 5000); // Poll every 5 seconds
  };

  const clearPolling = () => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  };

  const login = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      await axios.get("/api/auth/logout");
      setUser(null);
    } catch (error) {
      setUser(null);
    } finally {
      clearPolling();
    }
  };

  return { user, login, logout, loading, checkAuthStatus };
}