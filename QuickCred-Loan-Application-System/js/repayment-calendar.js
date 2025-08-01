// Interactive Repayment Calendar Component for QuickCred
// Provides a visual calendar for tracking loan repayments

class RepaymentCalendar {
    constructor() {
        this.currentMonth = new Date().getMonth();
        this.currentYear = new Date().getFullYear();
        this.loans = [];
        this.activeRepayments = [];
        this.init();
    }

    init() {
        // Initialize when document is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        this.createCalendarElement();
        this.loadLoans();
        this.setupEventListeners();
    }

    createCalendarElement() {
        const dashboardGrid = document.querySelector('.dashboard-grid');
        if (!dashboardGrid) return;
        
        // Create the calendar section
        const calendarSection = document.createElement('div');
        calendarSection.className = 'dashboard-section';
        calendarSection.id = 'repaymentCalendar';
        calendarSection.innerHTML = `
            <div class="section-header">
                <h2 class="section-title">Repayment Calendar</h2>
                <div class="calendar-controls">
                    <button class="btn btn-icon calendar-prev-btn" title="Previous Month">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <div class="calendar-month-display">July 2025</div>
                    <button class="btn btn-icon calendar-next-btn" title="Next Month">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>
            
            <div class="calendar-container">
                <div class="calendar-loading">
                    <i class="fas fa-spinner fa-spin"></i>
                    <span>Loading calendar...</span>
                </div>
            </div>
        `;
        
        // Insert after existing sections
        dashboardGrid.appendChild(calendarSection);

        // Add necessary CSS for calendar
        this.addCalendarStyles();
    }

    // The styles are added in a separate function in repayment-calendar-styles.js

    // API and data loading methods
    async loadLoans() {
        try {
            const loans = await this.fetchLoans();
            this.loans = loans;
            this.renderCalendar();
        } catch (error) {
            console.error('Error loading loans:', error);
            this.showCalendarError('Failed to load loan data');
        }
    }

    // Helper method to show error
    showCalendarError(message) {
        const calendarContainer = document.querySelector('.calendar-container');
        if (calendarContainer) {
            calendarContainer.innerHTML = `
                <div class="calendar-error">
                    <i class="fas fa-exclamation-circle"></i>
                    <p>${message}</p>
                    <button class="btn btn-outline btn-sm retry-load-btn">
                        <i class="fas fa-sync"></i> Retry
                    </button>
                </div>
            `;

            // Add retry handler
            const retryBtn = calendarContainer.querySelector('.retry-load-btn');
            if (retryBtn) {
                retryBtn.addEventListener('click', () => this.loadLoans());
            }
        }
    }

    // Make this component globally accessible
    static showRepaymentSchedule(loan) {
        const calendar = window.repaymentCalendar || new RepaymentCalendar();
        calendar.displayLoanRepaymentSchedule(loan);
    }
}

// Initialize and make globally available
window.repaymentCalendar = new RepaymentCalendar();
window.RepaymentCalendar = RepaymentCalendar;