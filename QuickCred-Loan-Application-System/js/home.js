// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";

// Your web app's Firebase configuration
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication
const auth = getAuth();

// Enhanced Home Page Functionality

// Listen for changes in the user's authentication state
onAuthStateChanged(auth, (user) => {
  if (user) {
    // If the user is signed in, get their full name and initials
    const fullName = user.displayName || "User"; // Get the full name, fallback to "User" if not available
    const firstLetter = fullName.charAt(0).toUpperCase(); // Get the first letter for the avatar
    const email = user.email || "user@example.com";

    // Display the user's full name in the nav
    const userNameElements = document.querySelectorAll('#user-name');
    userNameElements.forEach(element => {
      element.textContent = fullName;
    });
    
    const welcomeUser = document.getElementById('welcome-user');
    if (welcomeUser) welcomeUser.textContent = fullName;

    // Set the avatar as the initial letter
    const userAvatarElements = document.querySelectorAll('#user-avatar');
    userAvatarElements.forEach(element => {
      element.textContent = firstLetter;
    });
    
    // Update profile dropdown elements
    const userAvatarLarge = document.getElementById('user-avatar-large');
    if (userAvatarLarge) userAvatarLarge.textContent = firstLetter;
    
    const userDisplayName = document.getElementById('user-display-name');
    if (userDisplayName) userDisplayName.textContent = fullName;
    
    const userEmailElement = document.getElementById('user-email');
    if (userEmailElement) userEmailElement.textContent = email;
    
    const welcomeMsg = document.querySelector('.welcome-message');
    if (welcomeMsg) welcomeMsg.textContent = `Welcome back, ${fullName}!`;
  } else {
    // If the user is not signed in, you can show default information or handle it
    const userNameElements = document.querySelectorAll('#user-name');
    userNameElements.forEach(element => {
      element.textContent = "Guest";
    });
    
    const userAvatarElements = document.querySelectorAll('#user-avatar');
    userAvatarElements.forEach(element => {
      element.textContent = "G";
    });
    
    const welcomeUser = document.getElementById('welcome-user');
    if (welcomeUser) welcomeUser.textContent = "Guest";
    const welcomeMsg = document.querySelector('.welcome-message');
    if (welcomeMsg) welcomeMsg.textContent = "Welcome back, Guest!";
  }
});

// Multi-step Form Navigation
class LoanApplicationForm {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 4;
        this.formData = {};
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateProgressIndicator();
        this.generateCalendar();
        this.initializeLoanCalculator();
    }

    bindEvents() {
        // Progress indicator clicks
        const progressItems = document.querySelectorAll('.progress-item');
        progressItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                if (index + 1 <= this.currentStep) {
                    this.goToStep(index + 1);
                }
            });
        });
        
        // Load saved data if exists
        this.loadSavedData();
    }

    loadSavedData() {
        const savedData = localStorage.getItem('loanApplicationData');
        if (savedData) {
            this.formData = JSON.parse(savedData);
            this.populateForm();
        }
    }

    populateForm() {
        Object.keys(this.formData).forEach(key => {
            const input = document.querySelector(`[name="${key}"]`);
            if (input) {
                input.value = this.formData[key];
            }
        });
    }

    validateForm(step) {
        const currentFormStep = document.getElementById(`step${step}`);
        if (!currentFormStep) return true;
        
        const inputs = currentFormStep.querySelectorAll('input[required], select[required]');
        for (let input of inputs) {
            if (!input.value.trim()) {
                const label = input.previousElementSibling?.textContent || input.name;
                alert(`Please fill in: ${label}`);
                input.focus();
                return false;
            }
            
            // Email validation
            if (input.type === 'email' && input.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value)) {
                    alert('Please enter a valid email address');
                    input.focus();
                    return false;
                }
            }
            
            // Phone validation
            if (input.type === 'tel' && input.value) {
                const phoneRegex = /^[\d\s\-\(\)\+]+$/;
                if (!phoneRegex.test(input.value)) {
                    alert('Please enter a valid phone number');
                    input.focus();
                    return false;
                }
            }
        }
        return true;
    }

    saveFormData(step) {
        const currentFormStep = document.getElementById(`step${step}`);
        if (!currentFormStep) return;
        
        const inputs = currentFormStep.querySelectorAll('input, select');
        inputs.forEach(input => {
            if (input.name) {
                this.formData[input.name] = input.value;
            }
        });
        localStorage.setItem('loanApplicationData', JSON.stringify(this.formData));
    }

    goToStep(step) {
        this.currentStep = step;
        this.updateProgressIndicator();
        this.updateProgressBar();
    }

    nextStep() {
        if (this.currentStep < this.totalSteps && this.validateForm(this.currentStep)) {
            this.saveFormData(this.currentStep);
            this.currentStep++;
            this.updateProgressIndicator();
            this.updateProgressBar();
            this.updateFormVisibility();
        }
    }

    previousStep() {
        if (this.currentStep > 1) {
            this.saveFormData(this.currentStep);
            this.currentStep--;
            this.updateProgressIndicator();
            this.updateProgressBar();
            this.updateFormVisibility();
        }
    }

    updateFormVisibility() {
        const allSteps = document.querySelectorAll('.form-step');
        allSteps.forEach((step, index) => {
            step.classList.toggle('active', index + 1 === this.currentStep);
        });
        
        // Update button visibility
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const submitBtn = document.getElementById('submitBtn');
        
        if (prevBtn) prevBtn.style.display = this.currentStep === 1 ? 'none' : 'inline-block';
        if (nextBtn) nextBtn.style.display = this.currentStep === this.totalSteps ? 'none' : 'inline-block';
        if (submitBtn) submitBtn.style.display = this.currentStep === this.totalSteps ? 'inline-block' : 'none';
    }

    submitApplication() {
        if (this.validateForm(this.currentStep)) {
            this.saveFormData(this.currentStep);
            
            // Show loading state
            const submitBtn = document.getElementById('submitBtn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Submitting...';
            submitBtn.disabled = true;
            
            // Simulate submission
            setTimeout(() => {
                alert('Application submitted successfully! You will receive a confirmation email shortly.');
                localStorage.removeItem('loanApplicationData');
                this.formData = {};
                this.goToStep(1);
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Reset form
                document.querySelectorAll('input, select').forEach(input => {
                    input.value = '';
                });
            }, 2000);
        }
    }

    updateProgressIndicator() {
        const progressItems = document.querySelectorAll('.progress-item');
        progressItems.forEach((item, index) => {
            item.classList.remove('completed', 'current');
            if (index + 1 < this.currentStep) {
                item.classList.add('completed');
            } else if (index + 1 === this.currentStep) {
                item.classList.add('current');
            }
        });
    }

    updateProgressBar() {
        const progressBar = document.querySelector('.progress-bar .filled');
        const percentage = (this.currentStep / this.totalSteps) * 100;
        if (progressBar) {
            progressBar.style.width = percentage + '%';
        }
        
        const progressText = document.querySelector('.progress-bar p');
        if (progressText) {
            progressText.textContent = `${Math.round(percentage)}% Complete`;
        }
    }

    generateCalendar() {
        const calendar = document.querySelector('.calendar');
        if (!calendar) return;

        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();

        // Clear calendar
        calendar.innerHTML = '';

        // Create calendar header
        const header = document.createElement('div');
        header.className = 'calendar-header';
        header.innerHTML = `
            <h4>${new Date(currentYear, currentMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h4>
        `;
        calendar.appendChild(header);

        // Create calendar grid
        const grid = document.createElement('div');
        grid.className = 'calendar-grid';
        grid.style.cssText = `
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 5px;
            margin-top: 15px;
        `;

        // Add day labels
        const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        dayLabels.forEach(day => {
            const dayLabel = document.createElement('div');
            dayLabel.textContent = day;
            dayLabel.style.cssText = `
                text-align: center;
                font-weight: 600;
                padding: 10px;
                color: #667eea;
            `;
            grid.appendChild(dayLabel);
        });

        // Get first day of month and number of days
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        // Add empty cells for days before month starts
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            grid.appendChild(emptyDay);
        }

        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.textContent = day;
            dayElement.style.cssText = `
                text-align: center;
                padding: 10px;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.3s ease;
                background: rgba(255, 255, 255, 0.5);
            `;

            // Highlight current day
            if (day === today.getDate()) {
                dayElement.style.background = '#667eea';
                dayElement.style.color = 'white';
                dayElement.style.fontWeight = 'bold';
            }

            // Add payment indicators (sample data)
            if ([8, 15, 22].includes(day)) {
                dayElement.style.background = '#4CAF50';
                dayElement.style.color = 'white';
                dayElement.title = 'Payment Due';
            }

            dayElement.addEventListener('hover', function() {
                if (!this.style.background.includes('#667eea') && !this.style.background.includes('#4CAF50')) {
                    this.style.background = 'rgba(102, 126, 234, 0.2)';
                }
            });

            grid.appendChild(dayElement);
        }

        calendar.appendChild(grid);
    }

    initializeLoanCalculator() {
        const loanAmountSlider = document.getElementById('calcLoanAmount');
        const interestRateSlider = document.getElementById('calcInterestRate');
        const loanTermSlider = document.getElementById('calcLoanTerm');
        
        if (!loanAmountSlider || !interestRateSlider || !loanTermSlider) {
            console.log('Loan calculator elements not found');
            return;
        }

        // Update display values as user moves sliders
        loanAmountSlider.addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            document.getElementById('loanAmountDisplay').textContent = `$${value.toLocaleString()}`;
            this.calculateLoan();
        });

        interestRateSlider.addEventListener('input', (e) => {
            const value = parseFloat(e.target.value);
            document.getElementById('interestRateDisplay').textContent = `${value}%`;
            this.calculateLoan();
        });

        loanTermSlider.addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            const years = value === 1 ? 'year' : 'years';
            document.getElementById('loanTermDisplay').textContent = `${value} ${years}`;
            this.calculateLoan();
        });

        // Initial calculation
        this.calculateLoan();
        
        // Initialize document upload functionality
        this.initializeDocumentUpload();
        
        // Initialize calendar navigation
        this.initializeCalendarNavigation();
    }

    calculateLoan() {
        const principal = parseFloat(document.getElementById('calcLoanAmount').value);
        const annualRate = parseFloat(document.getElementById('calcInterestRate').value);
        const years = parseFloat(document.getElementById('calcLoanTerm').value);
        
        const monthlyRate = annualRate / 12 / 100;
        const numPayments = years * 12;
        
        let monthlyPayment = 0;
        if (monthlyRate > 0) {
            monthlyPayment = principal * 
                (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                (Math.pow(1 + monthlyRate, numPayments) - 1);
        } else {
            monthlyPayment = principal / numPayments;
        }
        
        const totalAmount = monthlyPayment * numPayments;
        const totalInterest = totalAmount - principal;
        
        // Update display
        document.getElementById('monthlyPayment').textContent = `$${monthlyPayment.toFixed(2)}`;
        document.getElementById('totalAmount').textContent = `$${totalAmount.toFixed(2)}`;
        document.getElementById('totalInterest').textContent = `$${totalInterest.toFixed(2)}`;
    }

    initializeDocumentUpload() {
        const uploadAreas = document.querySelectorAll('.upload-area');
        uploadAreas.forEach(uploadArea => {
            const input = uploadArea.querySelector('input[type="file"]');
            if (input) {
                // File input change event
                input.addEventListener('change', (e) => this.handleFileSelect(e.target));
                
                // Drag and drop events
                uploadArea.addEventListener('dragover', (e) => {
                    e.preventDefault();
                    uploadArea.classList.add('drag-over');
                });
                
                uploadArea.addEventListener('dragleave', (e) => {
                    e.preventDefault();
                    uploadArea.classList.remove('drag-over');
                });
                
                uploadArea.addEventListener('drop', (e) => {
                    e.preventDefault();
                    uploadArea.classList.remove('drag-over');
                    const files = e.dataTransfer.files;
                    input.files = files;
                    this.handleFileSelect(input);
                });
                
                // Click to browse
                uploadArea.addEventListener('click', () => {
                    input.click();
                });
            }
        });
    }

    handleFileSelect(input) {
        const files = Array.from(input.files);
        const fileListId = `${input.id}List`;
        const fileListContainer = document.getElementById(fileListId);
        
        if (fileListContainer && files.length > 0) {
            fileListContainer.innerHTML = '';
            
            files.forEach((file, index) => {
                const fileItem = document.createElement('div');
                fileItem.className = 'file-item';
                fileItem.innerHTML = `
                    <div class="file-info">
                        <i class="fas fa-file-alt"></i>
                        <span class="file-name">${file.name}</span>
                        <span class="file-size">(${this.formatFileSize(file.size)})</span>
                    </div>
                    <div class="file-status">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 0%"></div>
                        </div>
                        <span class="status-text">Uploading...</span>
                    </div>
                `;
                
                fileListContainer.appendChild(fileItem);
                
                // Simulate upload progress
                this.simulateUploadProgress(fileItem, index * 500);
            });
        }
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    simulateUploadProgress(fileItem, delay) {
        setTimeout(() => {
            const progressFill = fileItem.querySelector('.progress-fill');
            const statusText = fileItem.querySelector('.status-text');
            let progress = 0;
            
            const interval = setInterval(() => {
                progress += Math.random() * 30;
                if (progress >= 100) {
                    progress = 100;
                    progressFill.style.width = '100%';
                    statusText.textContent = 'Uploaded ✓';
                    statusText.style.color = '#4CAF50';
                    clearInterval(interval);
                } else {
                    progressFill.style.width = `${progress}%`;
                }
            }, 200);
        }, delay);
    }

    initializeCalendarNavigation() {
        const prevMonthBtn = document.getElementById('prevMonth');
        const nextMonthBtn = document.getElementById('nextMonth');
        
        if (prevMonthBtn && nextMonthBtn) {
            let currentDate = new Date();
            
            prevMonthBtn.addEventListener('click', () => {
                currentDate.setMonth(currentDate.getMonth() - 1);
                this.generateEnhancedCalendar(currentDate);
            });
            
            nextMonthBtn.addEventListener('click', () => {
                currentDate.setMonth(currentDate.getMonth() + 1);
                this.generateEnhancedCalendar(currentDate);
            });
        }
    }

    generateEnhancedCalendar(date = new Date()) {
        const calendarGrid = document.getElementById('calendarGrid');
        const currentMonthElement = document.getElementById('currentMonth');
        
        if (!calendarGrid || !currentMonthElement) return;
        
        const month = date.getMonth();
        const year = date.getFullYear();
        const today = new Date();
        
        // Update month display
        currentMonthElement.textContent = date.toLocaleDateString('en-US', { 
            month: 'long', 
            year: 'numeric' 
        });
        
        // Clear calendar
        calendarGrid.innerHTML = '';
        
        // Add day headers
        const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        dayHeaders.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'calendar-day-header';
            dayHeader.textContent = day;
            calendarGrid.appendChild(dayHeader);
        });
        
        // Get first day of month and number of days
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        // Add empty cells for days before month starts
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            calendarGrid.appendChild(emptyDay);
        }
        
        // Sample payment data
        const paymentDates = [5, 15, 25]; // Days with payments due
        const paidDates = [5]; // Days with payments made
        const overdueDates = []; // Overdue payments
        
        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = day;
            
            // Highlight today
            if (year === today.getFullYear() && 
                month === today.getMonth() && 
                day === today.getDate()) {
                dayElement.classList.add('today');
            }
            
            // Add payment indicators
            if (paymentDates.includes(day)) {
                if (paidDates.includes(day)) {
                    dayElement.classList.add('paid');
                    dayElement.title = 'Payment Made';
                } else if (new Date(year, month, day) < today) {
                    dayElement.classList.add('overdue');
                    dayElement.title = 'Payment Overdue';
                } else {
                    dayElement.classList.add('due');
                    dayElement.title = 'Payment Due';
                }
            }
            
            dayElement.addEventListener('click', () => {
                this.showPaymentDetails(year, month, day);
            });
            
            calendarGrid.appendChild(dayElement);
        }
    }

    showPaymentDetails(year, month, day) {
        const date = new Date(year, month, day);
        const dateString = date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        // This could open a modal or show details in a sidebar
        alert(`Payment details for ${dateString}\n\nAmount: $1,250.00\nStatus: Due\nLoan: Personal Loan #12345`);
    }
}

// Animated Dashboard Cards
class DashboardAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.animateCards();
        this.addHoverEffects();
        this.animateCounters();
    }

    animateCards() {
        const cards = document.querySelectorAll('.card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }

    addHoverEffects() {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    animateCounters() {
        const counters = document.querySelectorAll('.card-info h2');
        counters.forEach(counter => {
            const target = counter.textContent;
            if (target.includes('$')) {
                this.animateMoneyCounter(counter, target);
            } else if (!isNaN(target)) {
                this.animateNumberCounter(counter, parseInt(target));
            }
        });
    }

    animateNumberCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 20);
    }

    animateMoneyCounter(element, target) {
        const numericValue = parseInt(target.replace(/[^0-9]/g, ''));
        let current = 0;
        const increment = numericValue / 100;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= numericValue) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                const formatted = '$' + Math.floor(current).toLocaleString();
                element.textContent = formatted;
            }
        }, 20);
    }
}

// Status Tracking Animations
class StatusTracker {
    constructor() {
        this.init();
    }

    init() {
        this.animateProgressSteps();
    }

    animateProgressSteps() {
        const progressItems = document.querySelectorAll('.progress-item');
        progressItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
                
                if (item.classList.contains('current')) {
                    this.addPulseEffect(item);
                }
            }, index * 300);
        });
    }

    addPulseEffect(element) {
        setInterval(() => {
            element.style.transform = 'scale(1.05)';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 500);
        }, 2000);
    }
}

// Global functions for HTML onclick attributes
window.changeStep = function(direction) {
    const loanForm = window.loanFormInstance;
    if (loanForm) {
        if (direction === 1) {
            loanForm.nextStep();
        } else if (direction === -1) {
            loanForm.previousStep();
        }
    }
};

window.submitApplication = function() {
    const loanForm = window.loanFormInstance;
    if (loanForm) {
        loanForm.submitApplication();
    }
};

// Functions to handle different link actions
function handleNavigation(section) {
    switch(section) {
        case 'dashboard':
            document.querySelector('.dashboard-section').scrollIntoView({ behavior: 'smooth' });
            break;
        case 'applications':
            document.querySelector('.status-tracking-section').scrollIntoView({ behavior: 'smooth' });
            break;
        case 'payments':
            document.querySelector('.calendar-section').scrollIntoView({ behavior: 'smooth' });
            break;
        case 'compare':
            document.querySelector('.loan-comparison-section').scrollIntoView({ behavior: 'smooth' });
            break;
        case 'calculator':
            document.querySelector('.loan-comparison-section').scrollIntoView({ behavior: 'smooth' });
            break;
        case 'apply':
            document.getElementById('loanApplicationContainer').scrollIntoView({ behavior: 'smooth' });
            break;
        case 'status':
            document.querySelector('.status-tracking-section').scrollIntoView({ behavior: 'smooth' });
            break;
        default:
            console.log(`Navigation to ${section} not implemented yet`);
    }
}

function handleSocialMedia(platform) {
    const socialUrls = {
        facebook: 'https://facebook.com/quickcred',
        twitter: 'https://twitter.com/quickcred',
        linkedin: 'https://linkedin.com/company/quickcred'
    };
    
    if (socialUrls[platform]) {
        window.open(socialUrls[platform], '_blank');
    } else {
        alert(`${platform.charAt(0).toUpperCase() + platform.slice(1)} page coming soon!`);
    }
}

function handleFooterLinks(linkType) {
    switch(linkType) {
        case 'privacy':
            showModal('Privacy Policy', 'Our privacy policy ensures your data is protected and secure. We never share your personal information without your consent.');
            break;
        case 'terms':
            showModal('Terms of Service', 'By using QuickCred services, you agree to our terms and conditions. Please read them carefully.');
            break;
        case 'support':
            showModal('Customer Support', 'Need help? Contact us at:\n\n📞 1-800-QUICKCRED\n✉️ support@quickcred.com\n\nOur support team is available 24/7.');
            break;
        case 'help':
            showModal('Help Center', 'Visit our help center for:\n\n• Application guides\n• FAQs\n• Loan information\n• Account management');
            break;
    }
}

function showModal(title, content) {
    // Create a simple modal
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
        border-radius: 10px;
        max-width: 500px;
        width: 90%;
        max-height: 80%;
        overflow-y: auto;
    `;
    
    modalContent.innerHTML = `
        <h2 style="margin-top: 0; color: #667eea;">${title}</h2>
        <p style="white-space: pre-line; line-height: 1.6;">${content}</p>
        <button onclick="this.closest('.modal').remove()" style="
            background: #667eea;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 20px;
        ">Close</button>
    `;
    
    modal.appendChild(modalContent);
    modal.className = 'modal';
    document.body.appendChild(modal);
    
    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

function handleNotificationClick() {
    const notifications = [
        { title: 'Loan Application Update', message: 'Your personal loan application is under review.', time: '2 hours ago' },
        { title: 'Payment Reminder', message: 'Your next payment of $1,250 is due on January 25th.', time: '1 day ago' },
        { title: 'New Loan Offers', message: 'Check out new competitive rates available for you.', time: '2 days ago' }
    ];
    
    let notificationHtml = '<h3 style="margin-top: 0; color: #667eea;">Notifications</h3>';
    notifications.forEach(notif => {
        notificationHtml += `
            <div style="border-bottom: 1px solid #eee; padding: 15px 0;">
                <h4 style="margin: 0 0 5px 0; color: #333;">${notif.title}</h4>
                <p style="margin: 0 0 5px 0; color: #666;">${notif.message}</p>
                <small style="color: #999;">${notif.time}</small>
            </div>
        `;
    });
    
    showModal('Notifications', notificationHtml);
}

// Profile dropdown functionality
function initializeProfileDropdown() {
    const profileButton = document.getElementById('profile-button');
    const profileDropdown = document.querySelector('.profile-dropdown');
    const profileMenu = document.getElementById('profile-menu');
    
    if (profileButton && profileDropdown) {
        // Toggle dropdown on button click
        profileButton.addEventListener('click', function(e) {
            e.stopPropagation();
            profileDropdown.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!profileDropdown.contains(e.target)) {
                profileDropdown.classList.remove('active');
            }
        });
        
        // Close dropdown when pressing Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                profileDropdown.classList.remove('active');
            }
        });
    }
}

// Handle profile menu actions
window.handleProfileAction = function(action) {
    const profileDropdown = document.querySelector('.profile-dropdown');
    
    // Close dropdown
    if (profileDropdown) {
        profileDropdown.classList.remove('active');
    }
    
    switch(action) {
        case 'view-profile':
            showModal('Profile Information', 
                `Name: ${document.getElementById('user-display-name')?.textContent || 'User'}\n` +
                `Email: ${document.getElementById('user-email')?.textContent || 'user@example.com'}\n` +
                `Member Since: January 2024\n` +
                `Account Status: Active\n` +
                `Verification: Verified\n\n` +
                `Credit Score: 745 (Excellent)\n` +
                `Active Loans: 2\n` +
                `Total Borrowed: $85,000`
            );
            break;
            
        case 'edit-profile':
            showEditProfileModal();
            break;
            
        case 'account-settings':
            showModal('Account Settings', 
                `Account Settings\n\n` +
                `• Change Password\n` +
                `• Two-Factor Authentication\n` +
                `• Privacy Settings\n` +
                `• Notification Preferences\n` +
                `• Account Verification\n` +
                `• Data Export\n\n` +
                `Settings panel coming soon!`
            );
            break;
            
        case 'security':
            showModal('Security Settings', 
                `Security & Privacy\n\n` +
                `Current Security Status: ✅ Strong\n\n` +
                `Enabled Features:\n` +
                `• Password Protection\n` +
                `• Email Verification\n` +
                `• Login Alerts\n` +
                `• Secure Connections (SSL)\n\n` +
                `Recommended:\n` +
                `• Enable Two-Factor Authentication\n` +
                `• Regular Password Updates`
            );
            break;
            
        case 'help':
            showModal('Help & Support', 
                `How can we help you?\n\n` +
                `📞 Phone Support: 1-800-QUICKCRED\n` +
                `✉️ Email: support@quickcred.com\n` +
                `💬 Live Chat: Available 24/7\n\n` +
                `Popular Topics:\n` +
                `• How to apply for a loan\n` +
                `• Understanding your credit score\n` +
                `• Payment schedules\n` +
                `• Account management\n` +
                `• Troubleshooting\n\n` +
                `Response Time: Usually within 2 hours`
            );
            break;
            
        case 'logout':
            if (confirm('Are you sure you want to sign out?')) {
                // Import signOut from Firebase if available
                if (typeof auth !== 'undefined') {
                    import('https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js')
                        .then(({ signOut }) => {
                            return signOut(auth);
                        })
                        .then(() => {
                            // Clear any stored data
                            localStorage.removeItem('loanApplicationData');
                            localStorage.removeItem('rememberMe');
                            
                            // Show logout notification
                            showModal('Signed Out', 'You have been successfully signed out. Redirecting to login page...');
                            
                            // Redirect to login page
                            setTimeout(() => {
                                window.location.href = '../html/login.html';
                            }, 2000);
                        })
                        .catch((error) => {
                            console.error('Sign out error:', error);
                            showModal('Error', 'There was an error signing out. Please try again.');
                        });
                } else {
                    // Fallback if auth is not available
                    localStorage.removeItem('loanApplicationData');
                    localStorage.removeItem('rememberMe');
                    showModal('Signed Out', 'You have been signed out. Redirecting to login page...');
                    setTimeout(() => {
                        window.location.href = '../html/login.html';
                    }, 2000);
                }
            }
            break;
            
        default:
            showModal('Feature Coming Soon', `The ${action} feature is currently under development. Check back soon!`);
    }
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize form functionality
    const loanForm = new LoanApplicationForm();
    window.loanFormInstance = loanForm; // Store reference for global functions
    
    // Initialize animations
    const dashboardAnimations = new DashboardAnimations();
    const statusTracker = new StatusTracker();
    
    // Initialize profile dropdown
    initializeProfileDropdown();
    
    // Set current date
    const currentDateElement = document.getElementById('current-date');
    if (currentDateElement) {
        const today = new Date();
        currentDateElement.textContent = today.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
    
    // Add click handlers for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const text = this.textContent.toLowerCase();
            handleNavigation(text);
        });
    });
    
    // Add click handler for logo
    const logoLinks = document.querySelectorAll('a[href="#"]:has(img)');
    logoLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector('.dashboard-section').scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Add click handler for notification button
    const notificationBtn = document.querySelector('.notification-button');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', handleNotificationClick);
    }
    
    // Add click handlers for footer links
    const footerLinks = document.querySelectorAll('footer a[href="#"]');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const text = this.textContent.toLowerCase().replace(/\s+/g, '');
            
            if (text.includes('loan') && text.includes('calculator')) {
                handleNavigation('calculator');
            } else if (text.includes('apply')) {
                handleNavigation('apply');
            } else if (text.includes('status')) {
                handleNavigation('status');
            } else if (text.includes('privacy')) {
                handleFooterLinks('privacy');
            } else if (text.includes('terms')) {
                handleFooterLinks('terms');
            } else if (text.includes('support')) {
                handleFooterLinks('support');
            } else if (text.includes('help')) {
                handleFooterLinks('help');
            } else {
                handleFooterLinks(text);
            }
        });
    });
    
    // Add click handlers for social media links
    const socialLinks = document.querySelectorAll('.social-media-links a');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-facebook-f')) {
                handleSocialMedia('facebook');
            } else if (icon.classList.contains('fa-twitter')) {
                handleSocialMedia('twitter');
            } else if (icon.classList.contains('fa-linkedin-in')) {
                handleSocialMedia('linkedin');
            }
        });
    });
    
    // Add click handlers for interactive elements
    const applyButton = document.querySelector('.apply-button');
    if (applyButton) {
        applyButton.addEventListener('click', function() {
            // Simulate application flow
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = 'Apply Now';
                this.disabled = false;
                alert('Application started! Complete your loan application below.');
                // Scroll to the loan application form
                const formContainer = document.getElementById('loanApplicationContainer');
                if (formContainer) {
                    formContainer.scrollIntoView({ behavior: 'smooth' });
                }
            }, 2000);
        });
    }
    
    // Add click handlers for loan offer apply buttons
    const applyOfferButtons = document.querySelectorAll('.apply-offer-btn');
    applyOfferButtons.forEach(button => {
        button.addEventListener('click', function() {
            const offerCard = this.closest('.offer-card');
            const lenderName = offerCard.querySelector('h4').textContent;
            const interestRate = offerCard.querySelector('.detail-item .value').textContent;
            
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            this.disabled = true;
            
            setTimeout(() => {
                alert(`Application started for ${lenderName} loan at ${interestRate}!\n\nYou will be redirected to complete the application.`);
                this.innerHTML = 'Apply Now';
                this.disabled = false;
                
                // Scroll to loan application form
                const formContainer = document.getElementById('loanApplicationContainer');
                if (formContainer) {
                    formContainer.scrollIntoView({ behavior: 'smooth' });
                }
            }, 1500);
        });
    });
    
    // Add click handlers for dashboard cards (make them interactive)
    const dashboardCards = document.querySelectorAll('.dashboard-cards .card');
    dashboardCards.forEach((card, index) => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function() {
            const cardText = this.querySelector('p').textContent;
            if (cardText.includes('Applications')) {
                handleNavigation('applications');
            } else if (cardText.includes('Payment')) {
                handleNavigation('payments');
            } else if (cardText.includes('Credit Score')) {
                showModal('Credit Score Details', `Your current credit score is 745 (Excellent)\n\nFactors affecting your score:\n• Payment history: 95%\n• Credit utilization: 12%\n• Credit age: 8 years\n• Credit mix: Good\n\nTips to improve:\n• Keep utilization below 10%\n• Make payments on time\n• Avoid closing old accounts`);
            } else {
                showModal('Account Details', `Total amount borrowed: $85,000\n\nActive loans:\n• Personal Loan: $45,000 (4.5% APR)\n• Auto Loan: $40,000 (3.2% APR)\n\nTotal monthly payments: $1,250`);
            }
        });
    });
    
    // Enhanced calendar initialization if elements exist
    if (document.getElementById('calendarGrid')) {
        loanForm.generateEnhancedCalendar();
    }
    
    console.log('QuickCred Home Page Enhanced! 🏠💳');
});

// Export for use in other modules
window.LoanApplicationForm = LoanApplicationForm;
window.DashboardAnimations = DashboardAnimations;
window.StatusTracker = StatusTracker;
