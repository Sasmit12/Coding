// Multi-step loan application form script

document.addEventListener('DOMContentLoaded', function() {
    initializeForm();
    setupEventListeners();
});

// Form state
const formState = {
    currentStep: 1,
    totalSteps: 5,
    formData: {
        // Personal information
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        ssn: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        
        // Employment information
        employmentStatus: '',
        employerName: '',
        jobTitle: '',
        monthlyIncome: '',
        employmentLength: '',
        
        // Loan details
        loanType: '',
        loanAmount: '',
        loanPurpose: '',
        loanTerm: '',
        
        // Financial information
        bankName: '',
        accountType: '',
        accountNumber: '',
        routingNumber: '',
        
        // Additional information
        creditScore: '',
        hasCoSigner: '',
        hasCoBorrower: '',
        existingLoans: '',
    },
    validation: {
        step1: false,
        step2: false,
        step3: false,
        step4: false,
        step5: false
    }
};

// Initialize form state
function initializeForm() {
    // Hide all steps except the first one
    document.querySelectorAll('.form-step').forEach((step, index) => {
        if (index + 1 !== formState.currentStep) {
            step.style.display = 'none';
        }
    });
    
    // Update progress bar
    updateProgressBar();
    
    // Load saved data from localStorage if available
    const savedData = localStorage.getItem('loanApplicationData');
    if (savedData) {
        try {
            const parsedData = JSON.parse(savedData);
            formState.formData = { ...formState.formData, ...parsedData };
            
            // Pre-fill form fields with saved data
            populateFormFields();
        } catch (error) {
            console.error('Error parsing saved form data:', error);
        }
    }
}

// Populate form fields with saved data
function populateFormFields() {
    // Loop through all form fields and set their values from formState
    document.querySelectorAll('input, select, textarea').forEach(field => {
        const fieldName = field.getAttribute('name');
        if (fieldName && formState.formData[fieldName] !== undefined) {
            field.value = formState.formData[fieldName];
        }
    });
}

// Set up event listeners
function setupEventListeners() {
    // Next step buttons
    document.querySelectorAll('.next-step').forEach(button => {
        button.addEventListener('click', nextStep);
    });
    
    // Previous step buttons
    document.querySelectorAll('.prev-step').forEach(button => {
        button.addEventListener('click', previousStep);
    });
    
    // Save draft button
    const saveDraftButton = document.querySelector('.save-draft-btn');
    if (saveDraftButton) {
        saveDraftButton.addEventListener('click', saveDraft);
    }
    
    // Form submission
    const submitButton = document.querySelector('.submit-application-btn');
    if (submitButton) {
        submitButton.addEventListener('click', submitApplication);
    }
    
    // Input field changes for real-time validation
    document.querySelectorAll('input, select, textarea').forEach(field => {
        field.addEventListener('change', () => {
            const fieldName = field.getAttribute('name');
            if (fieldName) {
                formState.formData[fieldName] = field.value;
                validateCurrentStep();
            }
        });
    });
}

// Go to next step
function nextStep() {
    if (validateCurrentStep()) {
        // Hide current step
        document.querySelector(`.form-step[data-step="${formState.currentStep}"]`).style.display = 'none';
        
        // Update step count
        formState.currentStep++;
        
        // Show next step
        document.querySelector(`.form-step[data-step="${formState.currentStep}"]`).style.display = 'block';
        
        // Update progress bar
        updateProgressBar();
        
        // Save form data
        saveFormData();
        
        // Scroll to top of form
        document.querySelector('.loan-application-form').scrollIntoView({ behavior: 'smooth' });
    } else {
        showValidationErrors();
    }
}

// Go to previous step
function previousStep() {
    // Hide current step
    document.querySelector(`.form-step[data-step="${formState.currentStep}"]`).style.display = 'none';
    
    // Update step count
    formState.currentStep--;
    
    // Show previous step
    document.querySelector(`.form-step[data-step="${formState.currentStep}"]`).style.display = 'block';
    
    // Update progress bar
    updateProgressBar();
    
    // Scroll to top of form
    document.querySelector('.loan-application-form').scrollIntoView({ behavior: 'smooth' });
}

// Update progress bar
function updateProgressBar() {
    const progressPercent = ((formState.currentStep - 1) / (formState.totalSteps - 1)) * 100;
    const progressBar = document.querySelector('.progress-bar-fill');
    if (progressBar) {
        progressBar.style.width = `${progressPercent}%`;
    }
    
    // Update step indicators
    document.querySelectorAll('.step-indicator').forEach((step, index) => {
        if (index + 1 < formState.currentStep) {
            step.classList.add('completed');
            step.classList.remove('current', 'upcoming');
        } else if (index + 1 === formState.currentStep) {
            step.classList.add('current');
            step.classList.remove('completed', 'upcoming');
        } else {
            step.classList.add('upcoming');
            step.classList.remove('completed', 'current');
        }
    });
    
    // Update step title
    const stepTitle = document.querySelector('.form-step-title');
    if (stepTitle) {
        const stepTitles = [
            'Personal Information',
            'Employment Information',
            'Loan Details',
            'Financial Information',
            'Review & Submit'
        ];
        stepTitle.textContent = stepTitles[formState.currentStep - 1] || '';
    }
    
    // Update step description
    const stepDesc = document.querySelector('.form-step-description');
    if (stepDesc) {
        const stepDescriptions = [
            'Provide your personal details.',
            'Tell us about your employment.',
            'Specify the loan details you need.',
            'Share your financial information.',
            'Review your application and submit.'
        ];
        stepDesc.textContent = stepDescriptions[formState.currentStep - 1] || '';
    }
}

// Validate current step
function validateCurrentStep() {
    const stepFields = document.querySelectorAll(`.form-step[data-step="${formState.currentStep}"] [required]`);
    let isValid = true;
    
    stepFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('invalid');
        } else {
            field.classList.remove('invalid');
        }
    });
    
    // Custom validations based on field type
    stepFields.forEach(field => {
        if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                isValid = false;
                field.classList.add('invalid');
            }
        }
        
        if (field.name === 'phone' && field.value) {
            const phoneRegex = /^\d{10}$/;
            if (!phoneRegex.test(field.value.replace(/\D/g, ''))) {
                isValid = false;
                field.classList.add('invalid');
            }
        }
        
        if (field.name === 'ssn' && field.value) {
            const ssnRegex = /^\d{9}$/;
            if (!ssnRegex.test(field.value.replace(/\D/g, ''))) {
                isValid = false;
                field.classList.add('invalid');
            }
        }
        
        if (field.name === 'zipCode' && field.value) {
            const zipRegex = /^\d{5}(-\d{4})?$/;
            if (!zipRegex.test(field.value)) {
                isValid = false;
                field.classList.add('invalid');
            }
        }
    });
    
    // Update validation state
    formState.validation[`step${formState.currentStep}`] = isValid;
    
    // Enable/disable next button
    const nextButton = document.querySelector(`.form-step[data-step="${formState.currentStep}"] .next-step`);
    if (nextButton) {
        nextButton.disabled = !isValid;
    }
    
    return isValid;
}

// Show validation errors
function showValidationErrors() {
    const invalidFields = document.querySelectorAll(`.form-step[data-step="${formState.currentStep}"] .invalid`);
    if (invalidFields.length > 0) {
        invalidFields[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
        invalidFields[0].focus();
    }
    
    // Show error message
    const errorMessage = document.querySelector('.validation-error-message');
    if (errorMessage) {
        errorMessage.style.display = 'block';
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 5000);
    }
}

// Save form data to localStorage
function saveFormData() {
    localStorage.setItem('loanApplicationData', JSON.stringify(formState.formData));
}

// Save application draft
function saveDraft() {
    // Update form data with current values
    document.querySelectorAll('input, select, textarea').forEach(field => {
        const fieldName = field.getAttribute('name');
        if (fieldName) {
            formState.formData[fieldName] = field.value;
        }
    });
    
    // Save to localStorage
    saveFormData();
    
    // Show confirmation message
    const confirmationMessage = document.createElement('div');
    confirmationMessage.className = 'draft-saved-message';
    confirmationMessage.innerHTML = `
        <div class="message-content">
            <i class="fas fa-check-circle"></i>
            <span>Your application draft has been saved. You can resume later.</span>
        </div>
    `;
    document.body.appendChild(confirmationMessage);
    
    // Add styles for the message
    const messageStyle = document.createElement('style');
    messageStyle.textContent = `
        .draft-saved-message {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: var(--success-500);
            color: white;
            padding: 15px 20px;
            border-radius: var(--rounded-md);
            box-shadow: var(--shadow-md);
            z-index: 1000;
            animation: fadeInOut 4s forwards;
        }
        
        .message-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .message-content i {
            font-size: 1.5rem;
        }
        
        @keyframes fadeInOut {
            0% { opacity: 0; transform: translateY(20px); }
            10% { opacity: 1; transform: translateY(0); }
            90% { opacity: 1; transform: translateY(0); }
            100% { opacity: 0; transform: translateY(20px); }
        }
    `;
    document.head.appendChild(messageStyle);
    
    // Remove message after animation
    setTimeout(() => {
        confirmationMessage.remove();
        messageStyle.remove();
    }, 4000);
}

// Submit the application
function submitApplication() {
    if (validateAllSteps()) {
        // Show loading indicator
        const loadingOverlay = document.createElement('div');
        loadingOverlay.className = 'loading-overlay';
        loadingOverlay.innerHTML = `
            <div class="loading-spinner"></div>
            <div class="loading-message">Submitting your application...</div>
        `;
        document.body.appendChild(loadingOverlay);
        
        // Add styles for the loading overlay
        const loadingStyle = document.createElement('style');
        loadingStyle.textContent = `
            .loading-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.7);
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                z-index: 9999;
            }
            
            .loading-spinner {
                border: 5px solid rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                border-top: 5px solid white;
                width: 50px;
                height: 50px;
                animation: spin 1s linear infinite;
                margin-bottom: 20px;
            }
            
            .loading-message {
                color: white;
                font-size: 1.2rem;
                font-weight: 500;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(loadingStyle);
        
        // Simulate API call to submit the application
        setTimeout(() => {
            // Remove loading indicator
            loadingOverlay.remove();
            loadingStyle.remove();
            
            // Clear saved form data
            localStorage.removeItem('loanApplicationData');
            
            // Redirect to confirmation page
            window.location.href = 'application-confirmation.html';
        }, 2000);
    }
}

// Validate all steps
function validateAllSteps() {
    // Store current step
    const currentStepBackup = formState.currentStep;
    let allValid = true;
    
    // Validate each step
    for (let step = 1; step <= formState.totalSteps; step++) {
        formState.currentStep = step;
        if (!validateCurrentStep()) {
            allValid = false;
        }
    }
    
    // Restore current step
    formState.currentStep = currentStepBackup;
    
    if (!allValid) {
        // Find the first invalid step
        let firstInvalidStep = 1;
        while (formState.validation[`step${firstInvalidStep}`] && firstInvalidStep <= formState.totalSteps) {
            firstInvalidStep++;
        }
        
        // Go to the first invalid step
        if (firstInvalidStep <= formState.totalSteps) {
            // Hide current step
            document.querySelector(`.form-step[data-step="${formState.currentStep}"]`).style.display = 'none';
            
            // Update step count
            formState.currentStep = firstInvalidStep;
            
            // Show next step
            document.querySelector(`.form-step[data-step="${formState.currentStep}"]`).style.display = 'block';
            
            // Update progress bar
            updateProgressBar();
            
            showValidationErrors();
        }
    }
    
    return allValid;
}