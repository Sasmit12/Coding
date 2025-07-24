// Firebase Configuration Module
// This centralizes Firebase config and can be easily modified for different environments

const firebaseConfig = {
  apiKey: "AIzaSyDWrweJMXxZcMTdbL5jfqoe5mb2YYFsuYY",
  authDomain: "quickcred-56139.firebaseapp.com",
  databaseURL: "https://quickcred-56139-default-rtdb.firebaseio.com",
  projectId: "quickcred-56139",
  storageBucket: "quickcred-56139.firebasestorage.app",
  messagingSenderId: "853955541453",
  appId: "1:853955541453:web:b2201a66aa1995349dec84",
  measurementId: "G-BLCFHC7WCT"
};

// Environment-based configuration (can be extended)
const getConfig = () => {
  // In production, these could come from environment variables
  // For now, returning the development config
  return firebaseConfig;
};

export { getConfig };
