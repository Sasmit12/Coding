// src/hooks/useAuth.js
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// This hook simply re-exports your context hook for consistency
export default function useAuth() {
  return useContext(AuthContext);
}import { useState, useEffect } from "react";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const mockUser = {
      id: "admin-user-1",
      username: "admin",
      role: "admin",
    };
    setUser(mockUser);
    setIsLoading(false);
  }, []);

  const login = async (username, password) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const mockUser = {
      id: "admin-user-1",
      username,
      role: username === "admin" ? "admin" : "mentor",
      mentorId: username !== "admin" ? "mentor-123" : undefined,
    };
    setUser(mockUser);
    setIsLoading(false);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  return {
    user,
    isLoading,
    login,
    logout,
    isAdmin: user?.role === "admin",
    isMentor: user?.role === "mentor",
  };
};