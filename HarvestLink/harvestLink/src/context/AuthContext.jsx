import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { authService } from "../services/authService";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if Firebase auth is available
    if (!auth) {
      console.warn("Firebase Auth is not available");
      setLoading(false);
      return;
    }

    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          // Get additional user data from Firestore
          if (db) {
            const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
            const userData = userDoc.data();

            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName,
              ...userData,
            });
          } else {
            // Fallback if Firestore is not available
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName,
            });
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Auth state change error:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      if (!auth) {
        throw new Error("Firebase Auth is not available. Please check your configuration.");
      }
      const result = await authService.login(email, password);
      
      // Redirect based on user role
      if (result.user?.role === 'farmer') {
        navigate("/farmer/dashboard");
      } else if (result.user?.role === 'consumer') {
        navigate("/consumer/dashboard");
      } else {
        navigate("/dashboard");
      }
      
      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      
      // Handle both error objects and Error instances
      const errorMessage = error.error || error.message || "Login failed. Please check your credentials.";
      return { 
        success: false, 
        error: errorMessage
      };
    }
  };

  const register = async (userData) => {
    try {
      if (!auth) {
        throw new Error("Firebase Auth is not available. Please check your configuration.");
      }
      const result = await authService.register(userData);
      
      // Redirect based on user role
      if (result.user?.role === 'farmer') {
        navigate("/farmer/dashboard");
      } else if (result.user?.role === 'consumer') {
        navigate("/consumer/dashboard");
      } else {
        navigate("/dashboard");
      }
      
      return { success: true };
    } catch (error) {
      console.error("Register error:", error);
      
      // Handle both error objects and Error instances
      const errorMessage = error.error || error.message || "Registration failed. Please try again.";
      return { 
        success: false, 
        error: errorMessage
      };
    }
  };

  const logout = async () => {
    try {
      if (auth) {
        await authService.logout();
      }
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      // Still clear user state even if logout fails
      setUser(null);
      navigate("/login");
    }
  };

  const resetPassword = async (email) => {
    try {
      if (!auth) {
        throw new Error("Firebase Auth is not available. Please check your configuration.");
      }
      await authService.resetPassword(email);
      return { success: true };
    } catch (error) {
      console.error("Reset password error:", error);
      return { 
        success: false, 
        error: error.message || "Password reset failed. Please try again." 
      };
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    resetPassword,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
