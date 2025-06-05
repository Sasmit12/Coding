import { useState, useEffect } from "react";

// This is a custom authentication hook with mock logic.
// Remove or adapt mock logic to integrate with real auth (e.g., Firebase).

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading a user from storage or an API on mount
    const mockUser = {
      id: "admin-user-1",
      username: "admin",
      role: "admin",
    };
    setUser(mockUser);
    setIsLoading(false);
  }, []);

  // Remove 'password' if not used, or use '_' as a placeholder for unused parameter
  const login = async (username /*, password */) => {
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