const { initializeApp } = require("firebase/app");
const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  deleteUser
} = require("firebase/auth");

const firebaseConfig = {
  apiKey: "AIzaSyCHvVwrnahF2Dczu8B4ckRjpfukGVNNGGU",
  authDomain: "payorbit-5a1d8.firebaseapp.com",
  projectId: "payorbit-5a1d8",
  storageBucket: "payorbit-5a1d8.appspot.com",
  messagingSenderId: "117415843648",
  appId: "1:117415843648:web:ff9bba2dc8138bc21b0ca5",
  measurementId: "G-YHS9EEJZSX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

async function runCheck() {
  const testEmail = "testuser_" + Date.now() + "@example.com";
  const testPassword = "supersecret123";

  try {
    // 1. Signup
    await createUserWithEmailAndPassword(auth, testEmail, testPassword);
    console.log("Signup successful:", testEmail);

    // 2. Logout after signup
    await signOut(auth);

    // 3. Login
    await signInWithEmailAndPassword(auth, testEmail, testPassword);
    console.log("Login successful:", testEmail);

    // 4. Logout
    await signOut(auth);
    console.log("Logout successful.");

    // 5. Cleanup - delete test user if possible
    if (auth.currentUser) {
      await deleteUser(auth.currentUser);
      console.log("Test user deleted.");
    } else {
      console.log("Could not delete test user (not logged in).");
    }

    console.log("Project check PASSED.");
  } catch (err) {
    console.error("Project check FAILED:", err.message);
  }
}

runCheck();