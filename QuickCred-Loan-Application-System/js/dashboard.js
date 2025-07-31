// Dashboard functionality for QuickCred modern design
// Handles dashboard interactions, notifications, and user management

class DashboardManager {
    constructor() {
        this.currentUser = null;
        this.notifications = [];
        this.loans = [];
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.setupEventListeners();
            this.loadUserData();
            this.loadDashboardData();
            this.setupNotifications();
            this.setupMobileMenu();
        });
    }

    setupEventListeners() {
        // Profile dropdown toggle
        const profileToggle = document.querySelector('.profile-toggle');
        const profileDropdown = document.querySelector('.profile-dropdown');
        
        if (profileToggle && profileDropdown) {
            profileToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                profileDropdown.classList.toggle('active');
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', () => {
                profileDropdown.classList.remove('active');
            });
        }

        // Notifications dropdown toggle
        const notificationToggle = document.querySelector('.notification-toggle');
        const notificationDropdown = document.querySelector('.notification-dropdown');
        
        if (notificationToggle && notificationDropdown) {
            notificationToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                notificationDropdown.classList.toggle('active');
                this.markNotificationsAsRead();
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', () => {
                notificationDropdown.classList.remove('active');
            });
        }

        // Quick action buttons
        this.setupQuickActions();

        // Loan management buttons
        this.setupLoanActions();

        // Search functionality
        this.setupSearch();

        // Logout functionality
        const logoutBtn = document.querySelector('.logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.handleLogout());
        }
    }

    setupQuickActions() {
        const quickActionBtns = document.querySelectorAll('.quick-action-btn');
        quickActionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = btn.getAttribute('data-action');
                this.handleQuickAction(action);
            });
        });
    }

    setupLoanActions() {
        // View loan details
        const viewLoanBtns = document.querySelectorAll('.view-loan-btn');
        viewLoanBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const loanId = btn.getAttribute('data-loan-id');
                this.viewLoanDetails(loanId);
            });
        });

        // Make payment buttons
        const paymentBtns = document.querySelectorAll('.make-payment-btn');
        paymentBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const loanId = btn.getAttribute('data-loan-id');
                this.makePayment(loanId);
            });
        });
    }

    setupSearch() {
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
        }
    }

    setupNotifications() {
        // Load notifications
        this.loadNotifications();
        
        // Setup notification actions
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('notification-action')) {
                const notificationId = e.target.getAttribute('data-notification-id');
                const action = e.target.getAttribute('data-action');
                this.handleNotificationAction(notificationId, action);
            }
        });
    }

    setupMobileMenu() {
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const sidebar = document.querySelector('.sidebar');
        
        if (mobileMenuToggle && sidebar) {
            mobileMenuToggle.addEventListener('click', () => {
                sidebar.classList.toggle('active');
            });
        }
    }

    async loadUserData() {
        try {
            // Simulate API call to get user data
            const userData = await this.fetchUserData();
            this.currentUser = userData;
            this.updateUserInterface(userData);
        } catch (error) {
            console.error('Error loading user data:', error);
            this.showError('Failed to load user data');
        }
    }

    async loadDashboardData() {
        try {
            // Load dashboard statistics
            const stats = await this.fetchDashboardStats();
            this.updateDashboardStats(stats);

            // Load recent loans
            const loans = await this.fetchUserLoans();
            this.loans = loans;
            this.updateLoansDisplay(loans);

            // Load recent activity
            const activity = await this.fetchRecentActivity();
            this.updateActivityFeed(activity);
        } catch (error) {
            console.error('Error loading dashboard data:', error);
            this.showError('Failed to load dashboard data');
        }
    }

    async loadNotifications() {
        try {
            const notifications = await this.fetchNotifications();
            this.notifications = notifications;
            this.updateNotificationDisplay(notifications);
        } catch (error) {
            console.error('Error loading notifications:', error);
        }
    }

    updateUserInterface(userData) {
        // Update user name
        const userNameElements = document.querySelectorAll('.user-name');
        userNameElements.forEach(el => {
            el.textContent = userData.name || 'User';
        });

        // Update user email
        const userEmailElements = document.querySelectorAll('.user-email');
        userEmailElements.forEach(el => {
            el.textContent = userData.email || '';
        });

        // Update profile picture
        const profilePicElements = document.querySelectorAll('.profile-pic');
        profilePicElements.forEach(el => {
            if (userData.profilePicture) {
                el.src = userData.profilePicture;
            }
        });

        // Update welcome message
        const welcomeMessage = document.querySelector('.welcome-message');
        if (welcomeMessage) {
            const hour = new Date().getHours();
            let greeting = 'Good morning';
            if (hour >= 12 && hour < 17) greeting = 'Good afternoon';
            else if (hour >= 17) greeting = 'Good evening';
            
            welcomeMessage.textContent = `${greeting}, ${userData.firstName || 'User'}!`;
        }
    }

    updateDashboardStats(stats) {
        // Update total loans
        const totalLoansEl = document.querySelector('.stat-total-loans .stat-value');
        if (totalLoansEl) {
            totalLoansEl.textContent = stats.totalLoans || '0';
        }

        // Update active loans
        const activeLoansEl = document.querySelector('.stat-active-loans .stat-value');
        if (activeLoansEl) {
            activeLoansEl.textContent = stats.activeLoans || '0';
        }

        // Update total amount
        const totalAmountEl = document.querySelector('.stat-total-amount .stat-value');
        if (totalAmountEl) {
            totalAmountEl.textContent = this.formatCurrency(stats.totalAmount || 0);
        }

        // Update credit score
        const creditScoreEl = document.querySelector('.stat-credit-score .stat-value');
        if (creditScoreEl) {
            creditScoreEl.textContent = stats.creditScore || 'N/A';
        }
    }

    updateLoansDisplay(loans) {
        const loansContainer = document.querySelector('.loans-list');
        if (!loansContainer) return;

        if (loans.length === 0) {
            loansContainer.innerHTML = '<div class="no-loans">No active loans found.</div>';
            return;
        }

        loansContainer.innerHTML = loans.map(loan => `
            <div class="loan-card" data-loan-id="${loan.id}">
                <div class="loan-header">
                    <h3 class="loan-title">${loan.type} Loan</h3>
                    <span class="loan-status loan-status--${loan.status.toLowerCase()}">${loan.status}</span>
                </div>
                <div class="loan-details">
                    <div class="loan-amount">
                        <span class="label">Amount:</span>
                        <span class="value">${this.formatCurrency(loan.amount)}</span>
                    </div>
                    <div class="loan-progress">
                        <span class="label">Progress:</span>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${loan.progress}%"></div>
                        </div>
                        <span class="progress-text">${loan.progress}%</span>
                    </div>
                    <div class="loan-next-payment">
                        <span class="label">Next Payment:</span>
                        <span class="value">${loan.nextPayment}</span>
                    </div>
                </div>
                <div class="loan-actions">
                    <button class="btn btn-outline view-loan-btn" data-loan-id="${loan.id}">
                        View Details
                    </button>
                    <button class="btn btn-primary make-payment-btn" data-loan-id="${loan.id}">
                        Make Payment
                    </button>
                </div>
            </div>
        `).join('');
    }

    updateActivityFeed(activities) {
        const activityContainer = document.querySelector('.activity-list');
        if (!activityContainer) return;

        if (activities.length === 0) {
            activityContainer.innerHTML = '<div class="no-activity">No recent activity.</div>';
            return;
        }

        activityContainer.innerHTML = activities.map(activity => `
            <div class="activity-item">
                <div class="activity-icon">
                    <i class="fas fa-${activity.icon}"></i>
                </div>
                <div class="activity-content">
                    <div class="activity-title">${activity.title}</div>
                    <div class="activity-description">${activity.description}</div>
                    <div class="activity-time">${this.formatTime(activity.timestamp)}</div>
                </div>
            </div>
        `).join('');
    }

    updateNotificationDisplay(notifications) {
        const notificationContainer = document.querySelector('.notification-list');
        const notificationBadge = document.querySelector('.notification-badge');
        
        if (!notificationContainer) return;

        // Update badge count
        const unreadCount = notifications.filter(n => !n.read).length;
        if (notificationBadge) {
            if (unreadCount > 0) {
                notificationBadge.textContent = unreadCount > 99 ? '99+' : unreadCount;
                notificationBadge.style.display = 'block';
            } else {
                notificationBadge.style.display = 'none';
            }
        }

        // Update notification list
        if (notifications.length === 0) {
            notificationContainer.innerHTML = '<div class="no-notifications">No notifications</div>';
            return;
        }

        notificationContainer.innerHTML = notifications.map(notification => `
            <div class="notification-item ${notification.read ? '' : 'unread'}" data-notification-id="${notification.id}">
                <div class="notification-icon">
                    <i class="fas fa-${notification.icon}"></i>
                </div>
                <div class="notification-content">
                    <div class="notification-title">${notification.title}</div>
                    <div class="notification-message">${notification.message}</div>
                    <div class="notification-time">${this.formatTime(notification.timestamp)}</div>
                </div>
                ${notification.actionable ? `
                    <div class="notification-actions">
                        <button class="notification-action" data-notification-id="${notification.id}" data-action="accept">
                            Accept
                        </button>
                        <button class="notification-action" data-notification-id="${notification.id}" data-action="dismiss">
                            Dismiss
                        </button>
                    </div>
                ` : ''}
            </div>
        `).join('');
    }

    handleQuickAction(action) {
        switch (action) {
            case 'apply-loan':
                this.showLoanApplicationModal();
                break;
            case 'make-payment':
                this.showPaymentModal();
                break;
            case 'view-profile':
                this.showProfileModal();
                break;
            case 'contact-support':
                this.showSupportModal();
                break;
            default:
                console.log('Unknown action:', action);
        }
    }

    handleSearch(query) {
        if (!query.trim()) {
            this.updateLoansDisplay(this.loans);
            return;
        }

        const filteredLoans = this.loans.filter(loan => 
            loan.type.toLowerCase().includes(query.toLowerCase()) ||
            loan.status.toLowerCase().includes(query.toLowerCase())
        );

        this.updateLoansDisplay(filteredLoans);
    }

    markNotificationsAsRead() {
        this.notifications.forEach(notification => {
            notification.read = true;
        });
        this.updateNotificationDisplay(this.notifications);
    }

    handleNotificationAction(notificationId, action) {
        const notification = this.notifications.find(n => n.id === notificationId);
        if (!notification) return;

        // Handle the action
        console.log(`Notification ${notificationId} action: ${action}`);
        
        // Remove notification
        this.notifications = this.notifications.filter(n => n.id !== notificationId);
        this.updateNotificationDisplay(this.notifications);
    }

    async handleLogout() {
        if (confirm('Are you sure you want to logout?')) {
            try {
                // Clear user data
                this.currentUser = null;
                localStorage.removeItem('userToken');
                
                // Redirect to login
                window.location.href = '../html/login-new.html';
            } catch (error) {
                console.error('Logout error:', error);
                this.showError('Failed to logout');
            }
        }
    }

    // Modal methods
    showLoanApplicationModal() {
        this.showModal('Apply for New Loan', `
            <form id="loanApplicationForm">
                <div class="form-group">
                    <label for="loanType">Loan Type</label>
                    <select id="loanType" required>
                        <option value="">Select loan type</option>
                        <option value="personal">Personal Loan</option>
                        <option value="business">Business Loan</option>
                        <option value="auto">Auto Loan</option>
                        <option value="home">Home Loan</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="loanAmount">Loan Amount</label>
                    <input type="number" id="loanAmount" min="1000" max="1000000" required>
                </div>
                <div class="form-group">
                    <label for="loanPurpose">Purpose</label>
                    <textarea id="loanPurpose" rows="3" required></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Submit Application</button>
            </form>
        `);
    }

    showPaymentModal() {
        this.showModal('Make Payment', `
            <form id="paymentForm">
                <div class="form-group">
                    <label for="paymentLoan">Select Loan</label>
                    <select id="paymentLoan" required>
                        <option value="">Select loan</option>
                        ${this.loans.map(loan => `
                            <option value="${loan.id}">${loan.type} Loan - ${this.formatCurrency(loan.amount)}</option>
                        `).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label for="paymentAmount">Payment Amount</label>
                    <input type="number" id="paymentAmount" min="1" required>
                </div>
                <div class="form-group">
                    <label for="paymentMethod">Payment Method</label>
                    <select id="paymentMethod" required>
                        <option value="">Select payment method</option>
                        <option value="bank">Bank Transfer</option>
                        <option value="card">Credit/Debit Card</option>
                        <option value="upi">UPI</option>
                    </select>
                </div>
                <button type="submit" class="btn btn-primary">Make Payment</button>
            </form>
        `);
    }

    showModal(title, content) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
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

        document.body.appendChild(modal);

        // Close modal handlers
        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.remove();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    // API simulation methods (replace with actual API calls)
    async fetchUserData() {
        await new Promise(resolve => setTimeout(resolve, 500));
        return {
            id: '1',
            firstName: 'John',
            lastName: 'Doe',
            name: 'John Doe',
            email: 'john.doe@example.com',
            profilePicture: null
        };
    }

    async fetchDashboardStats() {
        await new Promise(resolve => setTimeout(resolve, 500));
        return {
            totalLoans: 3,
            activeLoans: 2,
            totalAmount: 150000,
            creditScore: 750
        };
    }

    async fetchUserLoans() {
        await new Promise(resolve => setTimeout(resolve, 500));
        return [
            {
                id: '1',
                type: 'Personal',
                amount: 50000,
                status: 'Active',
                progress: 65,
                nextPayment: '2024-02-15'
            },
            {
                id: '2',
                type: 'Auto',
                amount: 100000,
                status: 'Active',
                progress: 30,
                nextPayment: '2024-02-20'
            }
        ];
    }

    async fetchRecentActivity() {
        await new Promise(resolve => setTimeout(resolve, 500));
        return [
            {
                id: '1',
                title: 'Payment Received',
                description: 'Payment of ₹5,000 received for Personal Loan',
                icon: 'check-circle',
                timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
            },
            {
                id: '2',
                title: 'Loan Application Approved',
                description: 'Your Auto Loan application has been approved',
                icon: 'thumbs-up',
                timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000)
            }
        ];
    }

    async fetchNotifications() {
        await new Promise(resolve => setTimeout(resolve, 500));
        return [
            {
                id: '1',
                title: 'Payment Due',
                message: 'Your Personal Loan payment is due in 3 days',
                icon: 'exclamation-triangle',
                timestamp: new Date(Date.now() - 30 * 60 * 1000),
                read: false,
                actionable: true
            },
            {
                id: '2',
                title: 'Application Update',
                message: 'Your loan application is under review',
                icon: 'info-circle',
                timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
                read: true,
                actionable: false
            }
        ];
    }

    // Utility methods
    formatCurrency(amount) {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(amount);
    }

    formatTime(timestamp) {
        const now = new Date();
        const time = new Date(timestamp);
        const diffMs = now - time;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        
        return time.toLocaleDateString();
    }

    showError(message) {
        console.error(message);
        // You can implement a toast notification here
    }

    showSuccess(message) {
        console.log(message);
        // You can implement a toast notification here
    }
}

// Initialize dashboard manager
const dashboardManager = new DashboardManager();

// Export for use in other modules if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DashboardManager;
}
