import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";
import { devConfig } from "./development.js";

const firebaseConfig = {
  apiKey: "AIzaSyDYVmuBiND28hYN5gUZubYbUhhpnmNo6do",
  authDomain: "harvestlink-f56c9.firebaseapp.com",
  projectId: "harvestlink-f56c9",
  storageBucket: "harvestlink-f56c9.appspot.com",
  messagingSenderId: "823930094370",
  appId: "1:823930094370:web:425b2c35a32f89f5095b7b",
  measurementId: "G-9MFGTP5YME",
};

// Initialize Firebase with error handling
let app;
let auth;
let db;
let storage;
let analytics;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
  
  // Initialize analytics only if enabled in config and supported
  if (devConfig.firebase.enableAnalytics) {
    isSupported().then(yes => {
      if (yes) {
        try {
          analytics = getAnalytics(app);
          console.log("Firebase Analytics initialized successfully");
        } catch (analyticsError) {
          console.warn("Firebase Analytics initialization failed (likely blocked by ad blocker):", analyticsError);
          analytics = null;
        }
      } else {
        console.log("Firebase Analytics not supported in this environment");
        analytics = null;
      }
    }).catch(error => {
      console.warn("Firebase Analytics support check failed:", error);
      analytics = null;
    });
  } else {
    console.log("Firebase Analytics disabled in development mode");
    analytics = null;
  }
} catch (error) {
  console.error("Firebase initialization error:", error);
  // Provide fallback objects to prevent app crashes
  app = null;
  auth = null;
  db = null;
  storage = null;
  analytics = null;
}

export { auth, db, storage, analytics };
export default app;
