import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";

export const authService = {
  async login(email, password) {
    try {
      // Validate input
      if (!email || !password) {
        console.error("Login validation failed:", { email: !!email, password: !!password });
        throw {
          success: false,
          error: "Email and password are required",
        };
      }

      // Trim and validate email
      const trimmedEmail = email.trim().toLowerCase();
      if (!trimmedEmail) {
        console.error("Email is empty after trimming");
        throw {
          success: false,
          error: "Email is required",
        };
      }

      console.log("Login attempt for email:", trimmedEmail);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        trimmedEmail,
        password,
      );

      console.log("Login successful for user:", userCredential.user.uid);

      return {
        user: userCredential.user,
        success: true,
      };
    } catch (error) {
      console.error("Login error details:", {
        code: error.code,
        message: error.message,
        email: email ? "provided" : "missing",
        password: password ? "provided" : "missing"
      });
      
      // If it's already a formatted error, throw it as is
      if (error.success === false) {
        throw error;
      }
      
      // Otherwise, format the error
      throw {
        success: false,
        error: this.getErrorMessage(error.code),
      };
    }
  },

  async register({ email, password, name, role }) {
    try {
      // Debug logging
      console.log("Registration attempt with data:", { email, name, role, passwordLength: password?.length });
      
      // Validate required fields
      if (!email || !password || !name || !role) {
        console.error("Missing required fields:", { email: !!email, password: !!password, name: !!name, role: !!role });
        throw {
          success: false,
          error: "All fields are required (email, password, name, role)",
        };
      }

      // Validate name is not empty or just whitespace
      if (!name.trim()) {
        console.error("Name is empty or whitespace:", name);
        throw {
          success: false,
          error: "Name cannot be empty",
        };
      }

      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      console.log("User created successfully:", userCredential.user.uid);

      // Update user profile with display name
      await updateProfile(userCredential.user, {
        displayName: name.trim(),
      });

      console.log("Profile updated successfully");

      // Store additional user data in Firestore
      const userData = {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        role: role,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      console.log("Storing user data in Firestore:", userData);

      await setDoc(doc(db, "users", userCredential.user.uid), userData);

      console.log("User data stored successfully");

      return {
        user: userCredential.user,
        success: true,
      };
    } catch (error) {
      console.error("Registration error:", error);
      
      // If it's already a formatted error, throw it as is
      if (error.success === false) {
        throw error;
      }
      
      // Otherwise, format the error
      throw {
        success: false,
        error: this.getErrorMessage(error.code),
      };
    }
  },

  async logout() {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      console.error("Logout error:", error);
      throw {
        success: false,
        error: this.getErrorMessage(error.code),
      };
    }
  },

  async resetPassword(email) {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (error) {
      console.error("Password reset error:", error);
      throw {
        success: false,
        error: this.getErrorMessage(error.code),
      };
    }
  },

  getCurrentUser() {
    return auth.currentUser;
  },

  // Helper method to get user-friendly error messages
  getErrorMessage(errorCode) {
    switch (errorCode) {
      case "auth/user-not-found":
        return "No user found with this email address";
      case "auth/wrong-password":
        return "Invalid password";
      case "auth/invalid-credential":
        return "Invalid email or password. Please check your credentials and try again.";
      case "auth/email-already-in-use":
        return "Email address is already registered";
      case "auth/weak-password":
        return "Password should be at least 6 characters";
      case "auth/invalid-email":
        return "Invalid email address";
      case "auth/too-many-requests":
        return "Too many failed attempts. Please try again later.";
      case "auth/user-disabled":
        return "This account has been disabled. Please contact support.";
      case "auth/operation-not-allowed":
        return "Email/password sign-in is not enabled. Please contact support.";
      case "auth/network-request-failed":
        return "Network error. Please check your internet connection and try again.";
      default:
        console.warn("Unhandled Firebase error code:", errorCode);
        return "An error occurred. Please try again";
    }
  },
};
