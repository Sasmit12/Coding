// Authentication functionality for QuickCred modern design
// Handles login, signup, and password reset functionality

// Firebase configuration (if using Firebase)
// Import Firebase modules if needed
// import { initializeApp } from 'firebase/app';
// import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

class AuthManager {
    constructor() {
        this.init();
    }

    init() {
        // Initialize form handlers when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            this.setupLoginForm();
            this.setupSignupForm();
            this.setupForgotPasswordForm();
            this.setupPasswordToggle();
            this.setupFormValidation();
        });
    }

    // Login form handler
    setupLoginForm() {
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin(e);
            });
        }
    }

    // Signup form handler
    setupSignupForm() {
        const signupForm = document.getElementById('signupForm');
        if (signupForm) {
            signupForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSignup(e);
            });
        }
    }

    // Forgot password form handler
    setupForgotPasswordForm() {
        const forgotForm = document.getElementById('forgotPasswordForm');
        if (forgotForm) {
            forgotForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleForgotPassword(e);
            });
        }
    }

    // Password visibility toggle
    setupPasswordToggle() {
        const toggleButtons = document.querySelectorAll('.password-toggle');
        toggleButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const input = button.previousElementSibling;
                const icon = button.querySelector('i');
                
                if (input.type === 'password') {
                    input.type = 'text';
                    icon.classList.remove('fa-eye');
                    icon.classList.add('fa-eye-slash');
                } else {
                    input.type = 'password';
                    icon.classList.remove('fa-eye-slash');
                    icon.classList.add('fa-eye');
                }
            });
        });
    }

    // Form validation setup
    setupFormValidation() {
        // Real-time validation for email fields
        const emailInputs = document.querySelectorAll('input[type="email"]');
        emailInputs.forEach(input => {
            input.addEventListener('blur', () => this.validateEmail(input));
            input.addEventListener('input', () => this.clearError(input));
        });

        // Real-time validation for password fields
        const passwordInputs = document.querySelectorAll('input[type="password"]');
        passwordInputs.forEach(input => {
            input.addEventListener('blur', () => this.validatePassword(input));
            input.addEventListener('input', () => this.clearError(input));
        });

        // Password confirmation validation
        const confirmPasswordInput = document.getElementById('confirmPassword');
        if (confirmPasswordInput) {
            confirmPasswordInput.addEventListener('blur', () => this.validatePasswordConfirmation());
        }
    }

    // Handle login submission
    async handleLogin(e) {
        const form = e.target;
        const email = form.querySelector('#email').value;
        const password = form.querySelector('#password').value;
        const submitButton = form.querySelector('button[type="submit"]');

        // Show loading state
        this.setLoadingState(submitButton, true);

        try {
            // Validate inputs
            if (!this.validateLoginForm(email, password)) {
                this.setLoadingState(submitButton, false);
                return;
            }

            // Simulate API call or use Firebase auth
            const result = await this.authenticateUser(email, password);
            
            if (result.success) {
                this.showSuccess('Login successful! Redirecting...');
                // Redirect to dashboard
                setTimeout(() => {
                    window.location.href = 'home-new.html';
                }, 1500);
            } else {
                this.showError(result.message || 'Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Login error:', error);
            this.showError('An error occurred. Please try again.');
        } finally {
            this.setLoadingState(submitButton, false);
        }
    }

    // Handle signup submission
    async handleSignup(e) {
        const form = e.target;
        const formData = new FormData(form);
        const submitButton = form.querySelector('button[type="submit"]');

        // Show loading state
        this.setLoadingState(submitButton, true);

        try {
            // Validate form
            if (!this.validateSignupForm(formData)) {
                this.setLoadingState(submitButton, false);
                return;
            }

            // Simulate API call or use Firebase auth
            const result = await this.createUser(formData);
            
            if (result.success) {
                this.showSuccess('Account created successfully! Please check your email for verification.');
                // Redirect to login
                setTimeout(() => {
                    window.location.href = 'login-new.html';
                }, 2000);
            } else {
                this.showError(result.message || 'Signup failed. Please try again.');
            }
        } catch (error) {
            console.error('Signup error:', error);
            this.showError('An error occurred. Please try again.');
        } finally {
            this.setLoadingState(submitButton, false);
        }
    }

    // Handle forgot password submission
    async handleForgotPassword(e) {
        const form = e.target;
        const email = form.querySelector('#email').value;
        const submitButton = form.querySelector('button[type="submit"]');

        // Show loading state
        this.setLoadingState(submitButton, true);

        try {
            if (!this.validateEmail(form.querySelector('#email'))) {
                this.setLoadingState(submitButton, false);
                return;
            }

            // Simulate API call
            const result = await this.sendPasswordReset(email);
            
            if (result.success) {
                this.showSuccess('Password reset email sent! Check your inbox.');
            } else {
                this.showError(result.message || 'Failed to send reset email.');
            }
        } catch (error) {
            console.error('Password reset error:', error);
            this.showError('An error occurred. Please try again.');
        } finally {
            this.setLoadingState(submitButton, false);
        }
    }

    // Validation methods
    validateEmail(input) {
        const email = input.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            this.showFieldError(input, 'Email is required');
            return false;
        }
        
        if (!emailRegex.test(email)) {
            this.showFieldError(input, 'Please enter a valid email address');
            return false;
        }
        
        this.clearError(input);
        return true;
    }

    validatePassword(input) {
        const password = input.value;
        const minLength = 8;
        
        if (!password) {
            this.showFieldError(input, 'Password is required');
            return false;
        }
        
        if (password.length < minLength) {
            this.showFieldError(input, `Password must be at least ${minLength} characters`);
            return false;
        }
        
        this.clearError(input);
        return true;
    }

    validatePasswordConfirmation() {
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirmPassword');
        
        if (!password || !confirmPassword) return true;
        
        if (password.value !== confirmPassword.value) {
            this.showFieldError(confirmPassword, 'Passwords do not match');
            return false;
        }
        
        this.clearError(confirmPassword);
        return true;
    }

    validateLoginForm(email, password) {
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        
        let isValid = true;
        
        if (!this.validateEmail(emailInput)) isValid = false;
        if (!this.validatePassword(passwordInput)) isValid = false;
        
        return isValid;
    }

    validateSignupForm(formData) {
        const firstName = formData.get('firstName');
        const lastName = formData.get('lastName');
        const email = formData.get('email');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');
        const terms = formData.get('terms');
        
        let isValid = true;
        
        // Validate required fields
        if (!firstName?.trim()) {
            this.showFieldError(document.getElementById('firstName'), 'First name is required');
            isValid = false;
        }
        
        if (!lastName?.trim()) {
            this.showFieldError(document.getElementById('lastName'), 'Last name is required');
            isValid = false;
        }
        
        if (!this.validateEmail(document.getElementById('email'))) isValid = false;
        if (!this.validatePassword(document.getElementById('password'))) isValid = false;
        if (!this.validatePasswordConfirmation()) isValid = false;
        
        if (!terms) {
            this.showError('Please accept the terms and conditions');
            isValid = false;
        }
        
        return isValid;
    }

    // API simulation methods (replace with actual API calls)
    async authenticateUser(email, password) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock authentication - replace with actual Firebase or API call
        if (email === 'demo@quickcred.com' && password === 'password123') {
            return { success: true, user: { email, name: 'Demo User' } };
        }
        
        return { success: false, message: 'Invalid email or password' };
    }

    async createUser(formData) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock user creation - replace with actual Firebase or API call
        return { success: true, message: 'User created successfully' };
    }

    async sendPasswordReset(email) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock password reset - replace with actual Firebase or API call
        return { success: true, message: 'Reset email sent' };
    }

    // UI helper methods
    setLoadingState(button, isLoading) {
        if (isLoading) {
            button.disabled = true;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        } else {
            button.disabled = false;
            const originalText = button.getAttribute('data-original-text') || 'Submit';
            button.innerHTML = originalText;
        }
    }

    showError(message) {
        this.showMessage(message, 'error');
    }

    showSuccess(message) {
        this.showMessage(message, 'success');
    }

    showMessage(message, type) {
        // Remove existing messages
        const existingMessage = document.querySelector('.auth-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = `auth-message auth-message--${type}`;
        messageEl.innerHTML = `
            <i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'check-circle'}"></i>
            <span>${message}</span>
        `;

        // Insert message
        const form = document.querySelector('form');
        if (form) {
            form.insertBefore(messageEl, form.firstChild);
        }

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.remove();
            }
        }, 5000);
    }

    showFieldError(input, message) {
        this.clearError(input);
        
        const errorEl = document.createElement('div');
        errorEl.className = 'field-error';
        errorEl.textContent = message;
        
        input.classList.add('error');
        input.parentNode.appendChild(errorEl);
    }

    clearError(input) {
        input.classList.remove('error');
        const errorEl = input.parentNode.querySelector('.field-error');
        if (errorEl) {
            errorEl.remove();
        }
    }
}

// Initialize authentication manager
const authManager = new AuthManager();

// Export for use in other modules if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AuthManager;
}
