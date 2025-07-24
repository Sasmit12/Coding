// Enhanced Forgot Password with Modular Config and Better UX
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getConfig } from "./config/firebase-config.js";
import { notifications } from "./utils/notifications.js";

// Initialize Firebase with modular config
const app = initializeApp(getConfig());
const auth = getAuth(app);

// Form validation utilities
class FormValidator {
    static validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    static showError(fieldId, message) {
        const errorElement = document.getElementById(`${fieldId}-error`);
        const inputElement = document.getElementById(fieldId);
        
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('visible');
            errorElement.setAttribute('aria-live', 'polite');
        }
        
        if (inputElement) {
            inputElement.setAttribute('aria-invalid', 'true');
            inputElement.focus();
        }
    }

    static clearError(fieldId) {
        const errorElement = document.getElementById(`${fieldId}-error`);
        const inputElement = document.getElementById(fieldId);
        
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.classList.remove('visible');
        }
        
        if (inputElement) {
            inputElement.removeAttribute('aria-invalid');
        }
    }
}

// UI utilities
class UIUtils {
    static showLoading() {
        const overlay = document.getElementById('loading-overlay');
        const button = document.querySelector('.reset-button');
        
        if (overlay) {
            overlay.classList.add('visible');
            overlay.setAttribute('aria-hidden', 'false');
        }
        
        if (button) {
            button.classList.add('loading');
            button.disabled = true;
        }
    }

    static hideLoading() {
        const overlay = document.getElementById('loading-overlay');
        const button = document.querySelector('.reset-button');
        
        if (overlay) {
            overlay.classList.remove('visible');
            overlay.setAttribute('aria-hidden', 'true');
        }
        
        if (button) {
            button.classList.remove('loading');
            button.disabled = false;
        }
    }
}

// Enhanced reset password function
async function resetPassword(email) {
    try {
        UIUtils.showLoading();
        
        await sendPasswordResetEmail(auth, email);
        
        notifications.success(
            `Password reset email sent to ${email}. Please check your inbox and spam folder.`,
            8000
        );
        
        // Clear the form
        document.getElementById('email').value = '';
        
        // Show success state in UI
        const form = document.querySelector('.reset-form');
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <div style="text-align: center; padding: 20px; background: rgba(76, 175, 80, 0.1); border-radius: 12px; border-left: 4px solid #4CAF50; margin-top: 20px;">
                <h3 style="color: #4CAF50; margin: 0 0 10px 0;">Email Sent Successfully!</h3>
                <p style="margin: 0; color: #333;">We've sent password reset instructions to your email address.</p>
            </div>
        `;
        
        if (form && !document.querySelector('.success-message')) {
            form.appendChild(successMessage);
        }
        
    } catch (error) {
        console.error('Password reset error:', error);
        
        let errorMessage = 'Failed to send reset email. Please try again.';
        
        // Handle specific Firebase errors
        switch (error.code) {
            case 'auth/user-not-found':
                errorMessage = 'No account found with this email address.';
                break;
            case 'auth/invalid-email':
                errorMessage = 'Please enter a valid email address.';
                break;
            case 'auth/too-many-requests':
                errorMessage = 'Too many reset attempts. Please wait before trying again.';
                break;
            case 'auth/network-request-failed':
                errorMessage = 'Network error. Please check your connection and try again.';
                break;
        }
        
        notifications.error(errorMessage, 6000);
        
    } finally {
        UIUtils.hideLoading();
    }
}

// Form submission handler
function handleFormSubmit(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    
    // Clear any previous errors
    FormValidator.clearError('email');
    
    // Validate email
    if (!email) {
        FormValidator.showError('email', 'Please enter your email address.');
        notifications.warning('Please enter your email address.');
        return;
    }
    
    if (!FormValidator.validateEmail(email)) {
        FormValidator.showError('email', 'Please enter a valid email address.');
        notifications.warning('Please enter a valid email address.');
        return;
    }
    
    // Proceed with reset
    resetPassword(email);
}

// Real-time validation
function setupRealTimeValidation() {
    const emailInput = document.getElementById('email');
    
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const email = this.value.trim();
            
            if (email && !FormValidator.validateEmail(email)) {
                FormValidator.showError('email', 'Please enter a valid email address.');
            } else {
                FormValidator.clearError('email');
            }
        });
        
        emailInput.addEventListener('input', function() {
            // Clear errors as user types
            if (this.value.trim()) {
                FormValidator.clearError('email');
            }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.reset-form');
    
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
    
    setupRealTimeValidation();
    
    // Focus on email input for better UX
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.focus();
    }
    
    console.log('Enhanced Forgot Password page loaded! 🔒');
});

// Export for potential external use
window.resetPassword = () => {
    const email = document.getElementById('email').value.trim();
    if (email) {
        resetPassword(email);
    }
};
