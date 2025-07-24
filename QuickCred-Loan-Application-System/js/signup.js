// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { notifications } from './utils/notifications.js';

// Config
const firebaseConfig = {
  apiKey: "AIzaSyDWrweJMXxZcMTdbL5jfqoe5mb2YYFsuYY",
  authDomain: "quickcred-56139.firebaseapp.com",
  databaseURL: "https://quickcred-56139-default-rtdb.firebaseio.com",
  projectId: "quickcred-56139",
  storageBucket: "quickcred-56139.appspot.com",
  messagingSenderId: "853955541453",
  appId: "1:853955541453:web:b2201a66aa1995349dec84",
  measurementId: "G-BLCFHC7WCT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Form Handling
const signupForm = document.getElementById("signup-form");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const fullName = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;
  const termsAccepted = document.getElementById("terms").checked;

  // Clear previous errors
  clearFormErrors();

  // Comprehensive validation
  if (!validateSignupForm(fullName, email, password, confirmPassword, termsAccepted)) {
    return;
  }

  // Show loading state
  const submitBtn = document.querySelector('.create-account-btn');
  showLoadingState(submitBtn, 'Creating Account...');

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update user profile with full name
    await updateProfile(user, { displayName: fullName });
    
    notifications.success(
      'Account Created Successfully!', 
      `Welcome to QuickCred, ${fullName}! Please sign in to continue.`
    );
    
    signupForm.reset();
    
    setTimeout(() => {
      window.location.href = "../html/login.html";
    }, 2000);
    
  } catch (error) {
    console.error("Signup error:", error.code, error.message);
    handleSignupError(error);
  } finally {
    hideLoadingState(submitBtn, 'Create Account');
  }
});

// Enhanced form validation
function validateSignupForm(fullName, email, password, confirmPassword, termsAccepted) {
  let isValid = true;

  // Full name validation
  if (!fullName) {
    showFieldError('fullName', 'Full name is required');
    isValid = false;
  } else if (fullName.length < 2) {
    showFieldError('fullName', 'Full name must be at least 2 characters');
    isValid = false;
  } else if (!/^[a-zA-Z\s]+$/.test(fullName)) {
    showFieldError('fullName', 'Full name can only contain letters and spaces');
    isValid = false;
  }

  // Email validation
  if (!email) {
    showFieldError('email', 'Email address is required');
    isValid = false;
  } else if (!isValidEmail(email)) {
    showFieldError('email', 'Please enter a valid email address');
    isValid = false;
  }

  // Password validation
  if (!password) {
    showFieldError('password', 'Password is required');
    isValid = false;
  } else {
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      showFieldError('password', passwordValidation.message);
      isValid = false;
    }
  }

  // Confirm password validation
  if (!confirmPassword) {
    showFieldError('confirmPassword', 'Please confirm your password');
    isValid = false;
  } else if (password !== confirmPassword) {
    showFieldError('confirmPassword', 'Passwords do not match');
    isValid = false;
  }

  // Terms validation
  if (!termsAccepted) {
    showFieldError('terms', 'You must agree to the Terms of Service and Privacy Policy');
    isValid = false;
  }

  return isValid;
}

// Password strength validation
function validatePassword(password) {
  if (password.length < 8) {
    return { isValid: false, message: 'Password must be at least 8 characters long' };
  }
  
  if (!/(?=.*[a-z])/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one lowercase letter' };
  }
  
  if (!/(?=.*[A-Z])/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one uppercase letter' };
  }
  
  if (!/(?=.*\d)/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one number' };
  }
  
  if (!/(?=.*[!@#$%^&*])/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one special character (!@#$%^&*)' };
  }
  
  return { isValid: true, message: 'Strong password' };
}

// Email validation helper
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Show field-specific errors
function showFieldError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const formGroup = field.closest('.form-group');
  
  // Add error class
  field.classList.add('error');
  field.setAttribute('aria-invalid', 'true');
  
  // Create or update error message
  let errorElement = formGroup.querySelector('.field-error');
  if (!errorElement) {
    errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.setAttribute('role', 'alert');
    formGroup.appendChild(errorElement);
  }
  errorElement.textContent = message;
}

// Clear all form errors
function clearFormErrors() {
  const fields = document.querySelectorAll('input, select');
  fields.forEach(field => {
    field.classList.remove('error');
    field.removeAttribute('aria-invalid');
  });
  
  const errorElements = document.querySelectorAll('.field-error');
  errorElements.forEach(element => element.remove());
}

// Handle signup errors
function handleSignupError(error) {
  let title = 'Signup Failed';
  let message = '';
  
  switch (error.code) {
    case 'auth/email-already-in-use':
      message = 'An account with this email address already exists. Please use a different email or try signing in.';
      showFieldError('email', 'Email already in use');
      break;
    case 'auth/invalid-email':
      message = 'Invalid email address format.';
      showFieldError('email', 'Invalid email format');
      break;
    case 'auth/operation-not-allowed':
      message = 'Email/password accounts are not enabled. Please contact support.';
      break;
    case 'auth/weak-password':
      message = 'Password is too weak. Please choose a stronger password.';
      showFieldError('password', 'Password is too weak');
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

// Toggle password visibility
window.togglePassword = function (id) {
  const input = document.getElementById(id);
  input.type = input.type === "password" ? "text" : "password";
};

// Functions to handle footer links
function handleFooterLinks(linkType) {
    switch(linkType) {
        case 'help':
            showModal('Help Center', 'QuickCred Help Center\n\nNeed assistance? We\'re here to help!\n\n• Account setup guides\n• Frequently asked questions\n• Video tutorials\n• Live chat support\n\nContact us:\n📞 1-800-QUICKCRED\n✉️ help@quickcred.com');
            break;
        case 'support':
            showModal('Customer Support', 'Get Support 24/7\n\nOur dedicated support team is available:\n\n🕐 24/7 Phone Support: 1-800-QUICKCRED\n💬 Live Chat: Available on website\n✉️ Email: support@quickcred.com\n📱 Mobile App: Download from app stores\n\nAverage response time: Less than 2 minutes');
            break;
        case 'terms':
            showModal('Terms of Service', 'QuickCred Terms of Service\n\nBy creating an account, you agree to:\n\n• Provide accurate information\n• Use services responsibly\n• Comply with applicable laws\n• Maintain account security\n\nAccount Requirements:\n• Must be 18+ years old\n• Valid government-issued ID\n• Verifiable income source\n\nFor complete terms, visit our website.');
            break;
        case 'privacy':
            showModal('Privacy Policy', 'Your Privacy Matters\n\nWe protect your personal information with:\n\n🔒 256-bit SSL encryption\n🛡️ Multi-factor authentication\n🏦 Bank-level security\n📊 Secure data centers\n\nWe collect only necessary information for:\n• Account verification\n• Loan processing\n• Customer support\n\nWe never sell your data to third parties.');
            break;
    }
}

function showModal(title, content) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        padding: 30px;
        border-radius: 15px;
        max-width: 500px;
        width: 90%;
        max-height: 80%;
        overflow-y: auto;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    `;
    
    modalContent.innerHTML = `
        <h2 style="margin-top: 0; color: #667eea;">${title}</h2>
        <p style="white-space: pre-line; line-height: 1.6; color: #333;">${content}</p>
        <button onclick="this.closest('.modal').remove()" style="
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            cursor: pointer;
            margin-top: 20px;
            font-weight: 500;
        ">Close</button>
    `;
    
    modal.appendChild(modalContent);
    modal.className = 'modal';
    document.body.appendChild(modal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Add functionality for footer links
document.addEventListener('DOMContentLoaded', function() {
    const footerLinks = document.querySelectorAll('.footer a[href="#"]');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const text = this.textContent.toLowerCase().replace(/\s+/g, '');
            if (text.includes('help')) {
                handleFooterLinks('help');
            } else if (text.includes('support')) {
                handleFooterLinks('support');
            } else if (text.includes('terms')) {
                handleFooterLinks('terms');
            } else if (text.includes('privacy')) {
                handleFooterLinks('privacy');
            }
        });
    });
    
    // Handle social login buttons (placeholder functionality)
    const socialButtons = document.querySelectorAll('.social-login button');
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.textContent.toLowerCase().trim();
            alert(`${platform} signup coming soon! For now, please use the regular signup form.`);
        });
    });
});
