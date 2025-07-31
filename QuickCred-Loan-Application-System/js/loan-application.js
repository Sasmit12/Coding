// Multi-Step Loan Application Form Handler
class LoanApplicationForm {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 5;
        this.formData = {};
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupLoanAmountSlider();
        this.setupFormValidation();
        this.updateProgressIndicator();
    }

    setupEventListeners() {
        // Navigation buttons
        document.getElementById('nextBtn').addEventListener('click', () => this.nextStep());
        document.getElementById('backBtn').addEventListener('click', () => this.previousStep());
        document.getElementById('submitBtn').addEventListener('click', (e) => this.submitForm(e));

        // Loan type selection
        document.querySelectorAll('.loan-type-card').forEach(card => {
            card.addEventListener('click', () => this.selectLoanType(card));
        });

        // Form submission
        document.getElementById('loanApplicationForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitForm(e);
        });

        // Real-time validation
        this.setupRealTimeValidation();
    }

    setupLoanAmountSlider() {
        const slider = document.getElementById('loanAmountSlider');
        const display = document.getElementById('loanAmountDisplay');
        const hiddenInput = document.getElementById('loanAmount');

        slider.addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            display.textContent = this.formatCurrency(value);
            hiddenInput.value = value;
        });
    }

    setupRealTimeValidation() {
        // Email validation
        const emailInput = document.getElementById('email');
        emailInput.addEventListener('blur', () => this.validateEmail());
        emailInput.addEventListener('input', () => this.clearError('email'));

        // Phone validation
        const phoneInput = document.getElementById('phone');
        phoneInput.addEventListener('blur', () => this.validatePhone());
        phoneInput.addEventListener('input', () => this.clearError('phone'));

        // SSN formatting and validation
        const ssnInput = document.getElementById('ssn');
        ssnInput.addEventListener('input', (e) => this.formatSSN(e));
        ssnInput.addEventListener('blur', () => this.validateSSN());

        // Required field validation
        const requiredFields = document.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            field.addEventListener('blur', () => this.validateRequired(field));
            field.addEventListener('input', () => this.clearError(field.id));
        });
    }

    setupFormValidation() {
        // Add validation rules for each step
        this.validationRules = {
            1: () => this.validateStep1(),
            2: () => this.validateStep2(),
            3: () => this.validateStep3(),
            4: () => this.validateStep4(),
            5: () => this.validateStep5()
        };
    }

    selectLoanType(card) {
        // Remove previous selection
        document.querySelectorAll('.loan-type-card').forEach(c => c.classList.remove('selected'));
        
        // Add selection to clicked card
        card.classList.add('selected');
        
        // Update hidden input
        const loanType = card.getAttribute('data-loan-type');
        document.getElementById('selectedLoanType').value = loanType;
        
        // Update slider ranges based on loan type
        this.updateSliderRanges(loanType);
        
        // Enable next button
        this.updateNavigationButtons();
    }

    updateSliderRanges(loanType) {
        const slider = document.getElementById('loanAmountSlider');
        const ranges = {
            personal: { min: 1000, max: 100000, default: 25000 },
            business: { min: 5000, max: 1000000, default: 50000 },
            auto: { min: 5000, max: 200000, default: 30000 },
            home: { min: 50000, max: 2000000, default: 250000 }
        };

        const range = ranges[loanType] || ranges.personal;
        slider.min = range.min;
        slider.max = range.max;
        slider.value = range.default;

        // Update display
        document.getElementById('loanAmountDisplay').textContent = this.formatCurrency(range.default);
        document.getElementById('loanAmount').value = range.default;

        // Update range labels
        const rangeLabels = document.querySelector('.amount-range');
        rangeLabels.children[0].textContent = this.formatCurrency(range.min);
        rangeLabels.children[1].textContent = this.formatCurrency(range.max);
    }

    nextStep() {
        if (this.validateCurrentStep()) {
            this.saveCurrentStepData();
            
            if (this.currentStep < this.totalSteps) {
                this.currentStep++;
                this.showStep(this.currentStep);
                this.updateProgressIndicator();
                this.updateNavigationButtons();
                
                // Populate review step if we're on step 5
                if (this.currentStep === 5) {
                    this.populateReviewStep();
                }
            }
        }
    }

    previousStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.showStep(this.currentStep);
            this.updateProgressIndicator();
            this.updateNavigationButtons();
        }
    }

    showStep(stepNumber) {
        // Hide all steps
        document.querySelectorAll('.form-step').forEach(step => {
            step.classList.remove('active');
        });

        // Show current step
        const currentStepElement = document.querySelector(`[data-step="${stepNumber}"]`);
        if (currentStepElement) {
            currentStepElement.classList.add('active');
        }

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    updateProgressIndicator() {
        const steps = document.querySelectorAll('.step');
        const progressLine = document.getElementById('progressLine');

        steps.forEach((step, index) => {
            const stepNumber = index + 1;
            step.classList.remove('active', 'completed');

            if (stepNumber < this.currentStep) {
                step.classList.add('completed');
                step.querySelector('.step-circle').innerHTML = '<i class="fas fa-check"></i>';
            } else if (stepNumber === this.currentStep) {
                step.classList.add('active');
                step.querySelector('.step-circle').textContent = stepNumber;
            } else {
                step.querySelector('.step-circle').textContent = stepNumber;
            }
        });

        // Update progress line
        const progressPercentage = ((this.currentStep - 1) / (this.totalSteps - 1)) * 100;
        progressLine.style.width = `${progressPercentage}%`;
    }

    updateNavigationButtons() {
        const backBtn = document.getElementById('backBtn');
        const nextBtn = document.getElementById('nextBtn');
        const submitBtn = document.getElementById('submitBtn');

        // Show/hide back button
        backBtn.style.display = this.currentStep > 1 ? 'block' : 'none';

        // Show/hide next/submit buttons
        if (this.currentStep === this.totalSteps) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'block';
        } else {
            nextBtn.style.display = 'block';
            submitBtn.style.display = 'none';
        }

        // Enable/disable next button based on validation
        const isValid = this.validateCurrentStep(false); // Don't show errors, just check validity
        nextBtn.disabled = !isValid;
    }

    validateCurrentStep(showErrors = true) {
        const validator = this.validationRules[this.currentStep];
        return validator ? validator(showErrors) : true;
    }

    validateStep1(showErrors = true) {
        const loanType = document.getElementById('selectedLoanType').value;
        const loanAmount = document.getElementById('loanAmount').value;

        if (!loanType) {
            if (showErrors) this.showError('Please select a loan type');
            return false;
        }

        if (!loanAmount || loanAmount < 1000) {
            if (showErrors) this.showError('Please select a valid loan amount');
            return false;
        }

        return true;
    }

    validateStep2(showErrors = true) {
        const requiredFields = [
            'firstName', 'lastName', 'email', 'phone', 
            'dateOfBirth', 'ssn', 'address', 'city', 'state', 'zipCode'
        ];

        let isValid = true;

        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (!this.validateRequired(field, showErrors)) {
                isValid = false;
            }
        });

        // Additional validations
        if (showErrors) {
            if (!this.validateEmail()) isValid = false;
            if (!this.validatePhone()) isValid = false;
            if (!this.validateSSN()) isValid = false;
            if (!this.validateAge()) isValid = false;
        }

        return isValid;
    }

    validateStep3(showErrors = true) {
        const requiredFields = ['annualIncome', 'monthlyExpenses', 'bankAccount'];
        let isValid = true;

        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (!this.validateRequired(field, showErrors)) {
                isValid = false;
            }
        });

        // Validate income vs expenses
        const income = parseInt(document.getElementById('annualIncome').value) || 0;
        const expenses = parseInt(document.getElementById('monthlyExpenses').value) || 0;
        
        if (showErrors && expenses * 12 >= income) {
            this.showFieldError('monthlyExpenses', 'Monthly expenses seem too high compared to annual income');
            isValid = false;
        }

        return isValid;
    }

    validateStep4(showErrors = true) {
        const requiredFields = ['employmentStatus', 'loanPurpose'];
        let isValid = true;

        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (!this.validateRequired(field, showErrors)) {
                isValid = false;
            }
        });

        return isValid;
    }

    validateStep5(showErrors = true) {
        const agreeTerms = document.getElementById('agreeTerms').checked;
        const authorizeCredit = document.getElementById('authorizeCredit').checked;

        let isValid = true;

        if (!agreeTerms) {
            if (showErrors) this.showFieldError('agreeTerms', 'You must agree to the terms and conditions');
            isValid = false;
        }

        if (!authorizeCredit) {
            if (showErrors) this.showFieldError('authorizeCredit', 'You must authorize the credit check');
            isValid = false;
        }

        return isValid;
    }

    validateRequired(field, showErrors = true) {
        const value = field.value.trim();
        if (!value) {
            if (showErrors) {
                this.showFieldError(field.id, 'This field is required');
            }
            return false;
        }
        this.clearError(field.id);
        return true;
    }

    validateEmail() {
        const email = document.getElementById('email').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            this.showFieldError('email', 'Email is required');
            return false;
        }

        if (!emailRegex.test(email)) {
            this.showFieldError('email', 'Please enter a valid email address');
            return false;
        }

        this.clearError('email');
        return true;
    }

    validatePhone() {
        const phone = document.getElementById('phone').value.trim();
        const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

        if (!phone) {
            this.showFieldError('phone', 'Phone number is required');
            return false;
        }

        if (!phoneRegex.test(phone)) {
            this.showFieldError('phone', 'Please enter a valid phone number');
            return false;
        }

        this.clearError('phone');
        return true;
    }

    validateSSN() {
        const ssn = document.getElementById('ssn').value.trim();
        const ssnRegex = /^\d{3}-\d{2}-\d{4}$/;

        if (!ssn) {
            this.showFieldError('ssn', 'SSN is required');
            return false;
        }

        if (!ssnRegex.test(ssn)) {
            this.showFieldError('ssn', 'Please enter a valid SSN (XXX-XX-XXXX)');
            return false;
        }

        this.clearError('ssn');
        return true;
    }

    validateAge() {
        const dob = new Date(document.getElementById('dateOfBirth').value);
        const today = new Date();
        const age = today.getFullYear() - dob.getFullYear();

        if (age < 18) {
            this.showFieldError('dateOfBirth', 'You must be at least 18 years old');
            return false;
        }

        if (age > 100) {
            this.showFieldError('dateOfBirth', 'Please enter a valid date of birth');
            return false;
        }

        this.clearError('dateOfBirth');
        return true;
    }

    formatSSN(event) {
        let value = event.target.value.replace(/\D/g, '');
        if (value.length >= 6) {
            value = value.substring(0, 3) + '-' + value.substring(3, 5) + '-' + value.substring(5, 9);
        } else if (value.length >= 4) {
            value = value.substring(0, 3) + '-' + value.substring(3);
        }
        event.target.value = value;
    }

    saveCurrentStepData() {
        const currentStepElement = document.querySelector(`[data-step="${this.currentStep}"]`);
        const inputs = currentStepElement.querySelectorAll('input, select, textarea');

        inputs.forEach(input => {
            if (input.type === 'checkbox') {
                this.formData[input.name] = input.checked;
            } else {
                this.formData[input.name] = input.value;
            }
        });
    }

    populateReviewStep() {
        const reviewContent = document.getElementById('reviewContent');
        const loanTypeNames = {
            personal: 'Personal Loan',
            business: 'Business Loan',
            auto: 'Auto Loan',
            home: 'Home Loan'
        };

        reviewContent.innerHTML = `
            <div class="review-section">
                <h3>Loan Information</h3>
                <div class="review-grid">
                    <div class="review-item">
                        <span class="review-label">Loan Type:</span>
                        <span class="review-value">${loanTypeNames[this.formData.loanType] || 'Not selected'}</span>
                    </div>
                    <div class="review-item">
                        <span class="review-label">Loan Amount:</span>
                        <span class="review-value">${this.formatCurrency(this.formData.loanAmount)}</span>
                    </div>
                    <div class="review-item">
                        <span class="review-label">Purpose:</span>
                        <span class="review-value">${this.formData.loanPurpose || 'Not specified'}</span>
                    </div>
                </div>
            </div>

            <div class="review-section">
                <h3>Personal Information</h3>
                <div class="review-grid">
                    <div class="review-item">
                        <span class="review-label">Name:</span>
                        <span class="review-value">${this.formData.firstName} ${this.formData.lastName}</span>
                    </div>
                    <div class="review-item">
                        <span class="review-label">Email:</span>
                        <span class="review-value">${this.formData.email}</span>
                    </div>
                    <div class="review-item">
                        <span class="review-label">Phone:</span>
                        <span class="review-value">${this.formData.phone}</span>
                    </div>
                    <div class="review-item">
                        <span class="review-label">Address:</span>
                        <span class="review-value">${this.formData.address}, ${this.formData.city}, ${this.formData.state} ${this.formData.zipCode}</span>
                    </div>
                </div>
            </div>

            <div class="review-section">
                <h3>Financial Information</h3>
                <div class="review-grid">
                    <div class="review-item">
                        <span class="review-label">Annual Income:</span>
                        <span class="review-value">${this.formatCurrency(this.formData.annualIncome)}</span>
                    </div>
                    <div class="review-item">
                        <span class="review-label">Monthly Expenses:</span>
                        <span class="review-value">${this.formatCurrency(this.formData.monthlyExpenses)}</span>
                    </div>
                    <div class="review-item">
                        <span class="review-label">Employment:</span>
                        <span class="review-value">${this.formData.employmentStatus}</span>
                    </div>
                </div>
            </div>

            <style>
                .review-section {
                    margin-bottom: var(--space-6);
                    padding: var(--space-4);
                    border: 1px solid var(--gray-200);
                    border-radius: var(--rounded-lg);
                }
                .review-section h3 {
                    margin: 0 0 var(--space-4);
                    color: var(--primary-600);
                    font-size: var(--text-lg);
                }
                .review-grid {
                    display: grid;
                    gap: var(--space-3);
                }
                .review-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: var(--space-2) 0;
                    border-bottom: 1px solid var(--gray-100);
                }
                .review-item:last-child {
                    border-bottom: none;
                }
                .review-label {
                    font-weight: 600;
                    color: var(--gray-700);
                }
                .review-value {
                    color: var(--gray-900);
                    text-align: right;
                    max-width: 60%;
                    word-break: break-word;
                }
            </style>
        `;
    }

    async submitForm(event) {
        event.preventDefault();
        
        if (!this.validateCurrentStep()) {
            return;
        }

        this.saveCurrentStepData();

        // Show loading state
        const submitBtn = document.getElementById('submitBtn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
        submitBtn.disabled = true;

        try {
            // Simulate API submission
            await this.submitToAPI(this.formData);
            
            // Show success step
            this.showSuccessStep();
            
        } catch (error) {
            console.error('Submission error:', error);
            this.showError('Failed to submit application. Please try again.');
            
            // Restore button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    async submitToAPI(formData) {
        // Simulate API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate success (90% of the time)
                if (Math.random() > 0.1) {
                    resolve({
                        success: true,
                        applicationId: 'QL-' + new Date().getFullYear() + '-' + Math.random().toString(36).substr(2, 6).toUpperCase()
                    });
                } else {
                    reject(new Error('Submission failed'));
                }
            }, 2000);
        });
    }

    showSuccessStep() {
        // Hide form navigation
        document.getElementById('formNavigation').style.display = 'none';
        
        // Hide progress indicator
        document.querySelector('.progress-container').style.display = 'none';
        
        // Show success step
        document.getElementById('successStep').classList.add('active');
        
        // Generate application ID
        const applicationId = 'QL-' + new Date().getFullYear() + '-' + Math.random().toString(36).substr(2, 6).toUpperCase();
        document.getElementById('applicationId').textContent = applicationId;
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    showError(message) {
        // Remove existing error messages
        const existingError = document.querySelector('.global-error');
        if (existingError) {
            existingError.remove();
        }

        // Create error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'global-error';
        errorDiv.style.cssText = `
            background: var(--error-50);
            border: 1px solid var(--error-200);
            color: var(--error-700);
            padding: var(--space-4);
            border-radius: var(--rounded-lg);
            margin-bottom: var(--space-4);
            display: flex;
            align-items: center;
            gap: var(--space-2);
        `;
        errorDiv.innerHTML = `
            <i class="fas fa-exclamation-triangle"></i>
            <span>${message}</span>
        `;

        // Insert at top of current step
        const currentStep = document.querySelector('.form-step.active');
        currentStep.insertBefore(errorDiv, currentStep.firstChild);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 5000);
    }

    showFieldError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(fieldId + 'Error');
        
        if (field) {
            field.classList.add('error');
        }
        
        if (errorElement) {
            errorElement.textContent = message;
        }
    }

    clearError(fieldId) {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(fieldId + 'Error');
        
        if (field) {
            field.classList.remove('error');
        }
        
        if (errorElement) {
            errorElement.textContent = '';
        }
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }
}

// Initialize the form when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LoanApplicationForm();
});
