// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

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
export const auth = getAuth(app);
export const db = getFirestore(app);