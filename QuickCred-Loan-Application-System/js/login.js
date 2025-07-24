import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  OAuthProvider,
  signInWithRedirect,
  getRedirectResult,
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { notifications } from './utils/notifications.js';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWrweJMXxZcMTdbL5jfqoe5mb2YYFsuYY",
  authDomain: "quickcred-56139.firebaseapp.com",
  databaseURL: "https://quickcred-56139-default-rtdb.firebaseio.com",
  projectId: "quickcred-56139",
  storageBucket: "quickcred-56139.firebasestorage.app",
  messagingSenderId: "853955541453",
  appId: "1:853955541453:web:b2201a66aa1995349dec84",
  measurementId: "G-BLCFHC7WCT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Enhanced login function with validation and notifications
window.login = function () {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  
  // Clear previous error states
  clearInputErrors();
  
  // Validation
  if (!validateInputs(email, password)) {
    return;
  }
  
  // Show loading state
  const loginBtn = document.querySelector('button[onclick="login()"]');
  showLoadingState(loginBtn, 'Signing in...');
  
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Logged in as:", user.email);
      
      notifications.success(
        'Login Successful!', 
        `Welcome back, ${user.displayName || user.email}!`
      );
      
      // Save user preference if "Remember Me" is checked
      if (document.getElementById('remember').checked) {
        localStorage.setItem('lastLoginEmail', email);
      }
      
      setTimeout(() => {
        window.location.href = "../html/home.html";
      }, 1000);
    })
    .catch((error) => {
      console.error("Login error:", error.code, error.message);
      handleLoginError(error);
    })
    .finally(() => {
      hideLoadingState(loginBtn, 'Sign in');
    });
};

// Input validation function
function validateInputs(email, password) {
  let isValid = true;
  
  if (!email) {
    showInputError('email', 'Email address is required');
    isValid = false;
  } else if (!isValidEmail(email)) {
    showInputError('email', 'Please enter a valid email address');
    isValid = false;
  }
  
  if (!password) {
    showInputError('password', 'Password is required');
    isValid = false;
  } else if (password.length < 6) {
    showInputError('password', 'Password must be at least 6 characters');
    isValid = false;
  }
  
  return isValid;
}

// Email validation helper
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Show input error
function showInputError(inputId, message) {
  const input = document.getElementById(inputId);
  input.classList.add('error');
  input.setAttribute('aria-invalid', 'true');
  
  // Create or update error message
  let errorElement = document.getElementById(`${inputId}-error`);
  if (!errorElement) {
    errorElement = document.createElement('div');
    errorElement.id = `${inputId}-error`;
    errorElement.className = 'input-error';
    errorElement.setAttribute('role', 'alert');
    input.parentNode.insertBefore(errorElement, input.nextSibling);
  }
  errorElement.textContent = message;
}

// Clear input errors
function clearInputErrors() {
  const inputs = document.querySelectorAll('input');
  inputs.forEach(input => {
    input.classList.remove('error');
    input.removeAttribute('aria-invalid');
  });
  
  const errorElements = document.querySelectorAll('.input-error');
  errorElements.forEach(element => element.remove());
}

// Handle login errors with user-friendly messages
function handleLoginError(error) {
  let title = 'Login Failed';
  let message = '';
  
  switch (error.code) {
    case 'auth/user-not-found':
      message = 'No account found with this email address. Please check your email or sign up for a new account.';
      showInputError('email', 'No account found with this email');
      break;
    case 'auth/wrong-password':
      message = 'Incorrect password. Please try again or use the "Forgot Password" link.';
      showInputError('password', 'Incorrect password');
      break;
    case 'auth/invalid-email':
      message = 'Invalid email address format.';
      showInputError('email', 'Invalid email format');
      break;
    case 'auth/user-disabled':
      message = 'This account has been disabled. Please contact support for assistance.';
      break;
    case 'auth/too-many-requests':
      message = 'Too many failed login attempts. Please wait a moment before trying again.';
      break;
    case 'auth/network-request-failed':
      message = 'Network error. Please check your internet connection and try again.';
      break;
    default:
      message = 'An unexpected error occurred. Please try again later.';
  }
  
  notifications.error(title, message);
}

// Loading state management
function showLoadingState(button, text) {
  button.disabled = true;
  button.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${text}`;
  button.classList.add('loading');
}

function hideLoadingState(button, text) {
  button.disabled = false;
  button.innerHTML = text;
  button.classList.remove('loading');
}


// Google sign-in function
window.signInWithGoogle = function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log("Google sign-in successful:", user.email);
      // Redirect to home page after successful Google sign-in
      window.location.href = "../html/home.html";
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.error("Google sign-in error:", errorMessage);
      alert(`Google sign-in error: ${errorMessage}`);
    });
}

// Apple sign-in function (redirect method)
window.signInWithApple = function signInWithApple() {
  const provider = new OAuthProvider('apple.com');
  signInWithRedirect(auth, provider);
}

// Handle redirect after Apple sign-in
getRedirectResult(auth)
  .then((result) => {
    if (result) {
      const user = result.user;
      console.log("Apple sign-in successful:", user.email);
      window.location.href = "../html/home.html";
    }
  })
  .catch((error) => {
    const errorMessage = error.message;
    console.error("Apple sign-in error:", errorMessage);
    alert(`Apple sign-in error: ${errorMessage}`);
  });

// Facebook sign-in function
function signInWithFacebook() {
  var provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then(function(result) {
      var user = result.user;
      window.location.href = "../html/home.html";
    })
    .catch(function(error) {
      alert("Facebook sign-in error: " + error.message);
    });
}

window.signInWithFacebook = signInWithFacebook;

// Remember me functionality (localStorage)
const rememberCheckbox = document.getElementById('remember');
rememberCheckbox.addEventListener('change', function () {
  if (this.checked) {
    localStorage.setItem('rememberMe', 'true');
  } else {
    localStorage.removeItem('rememberMe');
  }
});

// Check "Remember Me" checkbox state on page load
document.addEventListener('DOMContentLoaded', function () {
  const rememberMe = localStorage.getItem('rememberMe');
  if (rememberMe) {
    document.getElementById('remember').checked = true;
  }
});
