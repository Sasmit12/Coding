const firebaseConfig = {
  apiKey: "AIzaSyCHvVwrnahF2Dczu8B4ckRjpfukGVNNGGU",
  authDomain: "payorbit-5a1d8.firebaseapp.com",
  projectId: "payorbit-5a1d8",
  storageBucket: "payorbit-5a1d8.appspot.com",
  messagingSenderId: "117415843648",
  appId: "1:117415843648:web:ff9bba2dc8138bc21b0ca5",
  measurementId: "G-YHS9EEJZSX"
};

// Initialize Firebase using the global object from the CDN
firebase.initializeApp(firebaseConfig);
if (firebase.analytics) {
  firebase.analytics();
}