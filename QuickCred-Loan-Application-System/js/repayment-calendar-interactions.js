// Interaction handlers for RepaymentCalendar class

RepaymentCalendar.prototype.setupEventListeners = function() {
    // Month navigation
    document.addEventListener('click', (e) => {
        if (e.target.closest('.calendar-prev-btn')) {
            this.previousMonth();
        }
        
        if (e.target.closest('.calendar-next-btn')) {
            this.nextMonth();
        }
        
        // Calendar day click
        if (e.target.closest('.calendar-day')) {
            const dayElement = e.target.closest('.calendar-day');
            const dateString = dayElement.dataset.date;
            if (dateString) {
                const date = new Date(dateString);
                const payments = this.getPaymentsForDay(date);
                if (payments.length > 0) {
                    this.showDayPaymentsDetail(date, payments);
                }
            }
        }

        // Show all payments button
        if (e.target.closest('.show-all-payments-btn')) {
            this.showAllPayments();
        }
        
        // Make payment button
        if (e.target.closest('.make-payment-btn')) {
            const btn = e.target.closest('.make-payment-btn');
            const loanId = btn.dataset.loanId;
            const paymentNumber = btn.dataset.paymentNumber;
            this.showMakePaymentModal(loanId, paymentNumber);
        }
        
        // View receipt button
        if (e.target.closest('.view-receipt-btn')) {
            const btn = e.target.closest('.view-receipt-btn');
            const loanId = btn.dataset.loanId;
            const paymentNumber = btn.dataset.paymentNumber;
            this.showPaymentReceipt(loanId, paymentNumber);
        }
    });
};

RepaymentCalendar.prototype.previousMonth = function() {
    this.currentMonth--;
    if (this.currentMonth < 0) {
        this.currentMonth = 11;
        this.currentYear--;
    }
    this.renderCalendar();
};

RepaymentCalendar.prototype.nextMonth = function() {
    this.currentMonth++;
    if (this.currentMonth > 11) {
        this.currentMonth = 0;
        this.currentYear++;
    }
    this.renderCalendar();
};

RepaymentCalendar.prototype.showDayPaymentsDetail = function(date, payments) {
    const content = `
        <div class="day-payments-detail">
            <h4>Payments for ${this.formatDate(date)}</h4>
            <table class="payment-detail-table">
                <thead>
                    <tr>
                        <th>Loan Type</th>
                        <th>Payment #</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${payments.map(payment => `
                        <tr>
                            <td>${payment.loanType} Loan</td>
                            <td>${payment.paymentNumber}</td>
                            <td>${this.formatCurrency(payment.amount)}</td>
                            <td><span class="payment-status status-${payment.status}">${this.capitalizeFirst(payment.status)}</span></td>
                            <td>
                                ${payment.status === 'paid' ? 
                                    `<button class="btn btn-text btn-sm view-receipt-btn" data-loan-id="${payment.loanId}" data-payment-number="${payment.paymentNumber}">
                                        <i class="fas fa-receipt"></i> View Receipt
                                    </button>` : 
                                    `<button class="btn btn-primary btn-sm make-payment-btn" data-loan-id="${payment.loanId}" data-payment-number="${payment.paymentNumber}">
                                        <i class="fas fa-credit-card"></i> Make Payment
                                    </button>`
                                }
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;

    this.showModal(`Payments for ${this.formatDate(date)}`, content);
};

RepaymentCalendar.prototype.showModal = function(title, content, size = 'medium') {
    // Create modal container if it doesn't exist
    let modalContainer = document.getElementById('statusTrackerModal');
    if (!modalContainer) {
        modalContainer = document.createElement('div');
        modalContainer.id = 'statusTrackerModal';
        modalContainer.className = 'modal-container';
        document.body.appendChild(modalContainer);
        
        // Add modal styles if not already added
        if (!document.getElementById('modalStyles')) {
            const modalStyle = document.createElement('style');
            modalStyle.id = 'modalStyles';
            modalStyle.textContent = `
                .modal-container {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.3s ease;
                }
                
                .modal-container.active {
                    opacity: 1;
                    visibility: visible;
                }
                
                .modal-content {
                    background: white;
                    border-radius: var(--rounded-lg);
                    box-shadow: var(--shadow-xl);
                    width: 90%;
                    max-width: ${size === 'large' ? '900px' : '600px'};
                    max-height: 90vh;
                    overflow-y: auto;
                    transform: translateY(20px);
                    transition: transform 0.3s ease;
                }
                
                .modal-container.active .modal-content {
                    transform: translateY(0);
                }
                
                .modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: var(--space-4) var(--space-6);
                    border-bottom: 1px solid var(--gray-200);
                }
                
                .modal-header h3 {
                    margin: 0;
                    font-size: 1.25rem;
                    color: var(--gray-900);
                }
                
                .modal-close {
                    background: transparent;
                    border: none;
                    font-size: 1.5rem;
                    color: var(--gray-500);
                    cursor: pointer;
                    padding: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 2rem;
                    height: 2rem;
                    border-radius: var(--rounded-full);
                    transition: all 0.2s;
                }
                
                .modal-close:hover {
                    background: var(--gray-100);
                    color: var(--gray-700);
                }
                
                .modal-body {
                    padding: var(--space-6);
                }
            `;
            document.head.appendChild(modalStyle);
        }
    }

    // Set modal content
    modalContainer.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
        </div>
    `;

    // Show modal with animation
    setTimeout(() => {
        modalContainer.classList.add('active');
    }, 10);

    // Add close handlers
    modalContainer.querySelector('.modal-close').addEventListener('click', () => {
        modalContainer.classList.remove('active');
        setTimeout(() => {
            modalContainer.remove();
        }, 300);
    });

    modalContainer.addEventListener('click', (e) => {
        if (e.target === modalContainer) {
            modalContainer.classList.remove('active');
            setTimeout(() => {
                modalContainer.remove();
            }, 300);
        }
    });
};