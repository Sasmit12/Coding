// Core functional methods for RepaymentCalendar class

RepaymentCalendar.prototype.fetchLoans = async function() {
    // Simulate API call to fetch loans with repayment schedules
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                {
                    id: 'LA-2025-001',
                    type: 'Personal',
                    amount: 25000,
                    status: 'active',
                    interestRate: 8.5,
                    termLength: '36 months',
                    startDate: new Date(2025, 5, 25),
                    endDate: new Date(2028, 5, 25),
                    monthlyPayment: 786.81,
                    paymentsMade: 1,
                    totalPayments: 36,
                    remainingBalance: 24213.19,
                    totalInterest: 3315.16,
                    nextPaymentDate: new Date(2025, 6, 25),
                    repaymentSchedule: this.generateRepaymentSchedule(25000, 8.5, 36, new Date(2025, 5, 25))
                },
                {
                    id: 'LA-2025-002',
                    type: 'Auto',
                    amount: 35000,
                    status: 'active',
                    interestRate: 5.9,
                    termLength: '60 months',
                    startDate: new Date(2025, 4, 10),
                    endDate: new Date(2030, 4, 10),
                    monthlyPayment: 676.25,
                    paymentsMade: 3,
                    totalPayments: 60,
                    remainingBalance: 33294.75,
                    totalInterest: 5575.00,
                    nextPaymentDate: new Date(2025, 7, 10),
                    repaymentSchedule: this.generateRepaymentSchedule(35000, 5.9, 60, new Date(2025, 4, 10))
                }
            ]);
        }, 1000);
    });
};

RepaymentCalendar.prototype.generateRepaymentSchedule = function(loanAmount, interestRate, termMonths, startDate) {
    const monthlyRate = interestRate / 100 / 12;
    const monthlyPayment = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, termMonths) / (Math.pow(1 + monthlyRate, termMonths) - 1);
    const schedule = [];
    
    let balance = loanAmount;
    let today = new Date();
    
    for (let i = 1; i <= termMonths; i++) {
        const dueDate = new Date(startDate);
        dueDate.setMonth(dueDate.getMonth() + i);
        
        const interest = balance * monthlyRate;
        const principal = monthlyPayment - interest;
        const newBalance = balance - principal;
        
        // Determine if payment is already paid (past payments)
        const isPaid = dueDate < today && i <= 3; // Simulate first 3 payments as paid
        
        schedule.push({
            paymentNumber: i,
            dueDate: dueDate,
            amount: monthlyPayment,
            principal: principal,
            interest: interest,
            remainingBalance: newBalance > 0 ? newBalance : 0,
            paid: isPaid,
            paymentDate: isPaid ? new Date(dueDate.getTime() - Math.random() * 5 * 24 * 60 * 60 * 1000) : null // Random payment date within 5 days before due date
        });
        
        balance = newBalance;
    }
    
    return schedule;
};

RepaymentCalendar.prototype.renderCalendar = function() {
    const calendarContainer = document.querySelector('.calendar-container');
    if (!calendarContainer) return;

    // Update month display
    const monthDisplay = document.querySelector('.calendar-month-display');
    if (monthDisplay) {
        monthDisplay.textContent = this.getMonthYearString();
    }

    // Calculate calendar days
    const calendarDays = this.generateCalendarDays();
    
    // Prepare loan payments for this month
    this.prepareMonthlyPayments();

    // Check if there are any payments for this month/year
    const hasPayments = this.activeRepayments.length > 0;

    if (!hasPayments) {
        calendarContainer.innerHTML = `
            <div class="calendar-empty">
                <i class="fas fa-calendar-times"></i>
                <p>No payments scheduled for ${this.getMonthYearString()}.</p>
                <button class="btn btn-outline btn-sm show-all-payments-btn">
                    <i class="fas fa-list"></i> View All Payments
                </button>
            </div>
        `;
        return;
    }

    // Create calendar HTML
    const calendarHTML = `
        <div class="calendar-header">
            <div class="calendar-weekday">Sun</div>
            <div class="calendar-weekday">Mon</div>
            <div class="calendar-weekday">Tue</div>
            <div class="calendar-weekday">Wed</div>
            <div class="calendar-weekday">Thu</div>
            <div class="calendar-weekday">Fri</div>
            <div class="calendar-weekday">Sat</div>
        </div>
        <div class="calendar-grid">
            ${calendarDays.map(day => {
                // Get payments for this day
                const dayPayments = this.getPaymentsForDay(day.date);
                const isToday = this.isToday(day.date);
                
                return `
                    <div class="calendar-day ${day.outsideMonth ? 'outside-month' : ''} ${isToday ? 'today' : ''}" 
                         data-date="${this.formatDateISO(day.date)}">
                        <div class="day-number">${day.date.getDate()}</div>
                        <div class="day-content">
                            ${dayPayments.map(payment => `
                                <div class="payment-indicator payment-${payment.status}">
                                    <i class="fas fa-${this.getPaymentIcon(payment.status)}"></i>
                                    ${this.formatCurrencyCompact(payment.amount)}
                                </div>
                            `).join('')}
                        </div>
                        ${dayPayments.length > 0 ? `
                            <div class="payment-details">
                                <div class="payment-details-title">Payments for ${this.formatDate(day.date)}</div>
                                <div class="payment-details-list">
                                    ${dayPayments.map(payment => `
                                        <div class="payment-details-item">
                                            <div>
                                                <div class="payment-loan-type">${payment.loanType} Loan</div>
                                                <div class="payment-amount">${this.formatCurrency(payment.amount)}</div>
                                            </div>
                                            <div class="payment-status status-${payment.status}">
                                                ${this.capitalizeFirst(payment.status)}
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        ` : ''}
                    </div>
                `;
            }).join('')}
        </div>
        <div class="calendar-legend">
            <div class="legend-item">
                <div class="legend-color color-paid"></div>
                <span>Paid</span>
            </div>
            <div class="legend-item">
                <div class="legend-color color-due"></div>
                <span>Due Today</span>
            </div>
            <div class="legend-item">
                <div class="legend-color color-upcoming"></div>
                <span>Upcoming</span>
            </div>
            <div class="legend-item">
                <div class="legend-color color-overdue"></div>
                <span>Overdue</span>
            </div>
        </div>
    `;

    calendarContainer.innerHTML = calendarHTML;
};

RepaymentCalendar.prototype.generateCalendarDays = function() {
    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    const firstDayOfWeek = firstDay.getDay(); // 0 = Sunday
    const lastDayOfWeek = lastDay.getDay();
    
    // Calendar days including days from previous and next months to fill the grid
    const calendarDays = [];
    
    // Add days from previous month
    const prevMonth = new Date(this.currentYear, this.currentMonth, 0);
    const daysInPrevMonth = prevMonth.getDate();
    
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
        calendarDays.push({
            date: new Date(this.currentYear, this.currentMonth - 1, daysInPrevMonth - i),
            outsideMonth: true
        });
    }
    
    // Add days from current month
    for (let i = 1; i <= daysInMonth; i++) {
        calendarDays.push({
            date: new Date(this.currentYear, this.currentMonth, i),
            outsideMonth: false
        });
    }
    
    // Add days from next month
    const daysToAdd = 6 - lastDayOfWeek;
    for (let i = 1; i <= daysToAdd; i++) {
        calendarDays.push({
            date: new Date(this.currentYear, this.currentMonth + 1, i),
            outsideMonth: true
        });
    }
    
    return calendarDays;
};

RepaymentCalendar.prototype.prepareMonthlyPayments = function() {
    this.activeRepayments = [];
    const today = new Date();
    
    this.loans.forEach(loan => {
        if (loan.repaymentSchedule) {
            loan.repaymentSchedule.forEach(payment => {
                const paymentDate = new Date(payment.dueDate);
                
                // Only include payments for the current month being displayed
                if (paymentDate.getMonth() === this.currentMonth && 
                    paymentDate.getFullYear() === this.currentYear) {
                    
                    // Determine payment status
                    let status = 'upcoming';
                    if (payment.paid) {
                        status = 'paid';
                    } else if (this.isSameDay(paymentDate, today)) {
                        status = 'due';
                    } else if (paymentDate < today) {
                        status = 'overdue';
                    }
                    
                    this.activeRepayments.push({
                        loanId: loan.id,
                        loanType: loan.type,
                        date: paymentDate,
                        amount: payment.amount,
                        status: status,
                        paymentNumber: payment.paymentNumber,
                        remainingBalance: payment.remainingBalance
                    });
                }
            });
        }
    });
};

RepaymentCalendar.prototype.getPaymentsForDay = function(date) {
    return this.activeRepayments.filter(payment => 
        this.isSameDay(payment.date, date)
    );
};

// Helper methods
RepaymentCalendar.prototype.isSameDay = function(date1, date2) {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
};

RepaymentCalendar.prototype.isToday = function(date) {
    const today = new Date();
    return this.isSameDay(date, today);
};

RepaymentCalendar.prototype.getMonthYearString = function() {
    const date = new Date(this.currentYear, this.currentMonth, 1);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};

RepaymentCalendar.prototype.formatDate = function(date) {
    return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
    });
};

RepaymentCalendar.prototype.formatDateISO = function(date) {
    return date.toISOString().split('T')[0];
};

RepaymentCalendar.prototype.formatCurrency = function(amount) {
    return new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2 
    }).format(amount);
};

RepaymentCalendar.prototype.formatCurrencyCompact = function(amount) {
    return new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: 'USD',
        notation: 'compact',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
};

RepaymentCalendar.prototype.getPaymentIcon = function(status) {
    switch(status) {
        case 'paid': return 'check-circle';
        case 'due': return 'calendar-day';
        case 'upcoming': return 'clock';
        case 'overdue': return 'exclamation-circle';
        default: return 'circle';
    }
};

RepaymentCalendar.prototype.capitalizeFirst = function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
};