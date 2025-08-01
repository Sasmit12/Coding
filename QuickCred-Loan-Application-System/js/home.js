// Home Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard components
    initializeDashboard();

    // Set up event listeners
    setupEventListeners();
});

// Main dashboard initialization
function initializeDashboard() {
    updateUserGreeting();
    loadUserAccountInfo();
    
    // Initialize the loan status tracker component
    if (typeof LoanStatusTracker === 'function') {
        window.loanStatusTracker = new LoanStatusTracker();
    }
    
    // The repayment calendar component self-initializes
}

// Update greeting based on time of day
function updateUserGreeting() {
    const greetingElement = document.querySelector('.greeting-text');
    if (!greetingElement) return;
    
    const userName = "John"; // This would come from user profile
    const hour = new Date().getHours();
    let greeting = "Good morning";
    
    if (hour >= 12 && hour < 17) {
        greeting = "Good afternoon";
    } else if (hour >= 17) {
        greeting = "Good evening";
    }
    
    greetingElement.textContent = `${greeting}, ${userName}!`;
}

// Load user account information
function loadUserAccountInfo() {
    // This would be replaced with an API call in production
    const userAccountInfo = {
        name: "John Smith",
        email: "john.smith@example.com",
        phone: "+1 (555) 123-4567",
        address: "123 Main St, Anytown, USA",
        joinDate: new Date(2025, 0, 15) // January 15, 2025
    };
    
    // Update account info in the sidebar
    const accountName = document.querySelector('.account-name');
    if (accountName) {
        accountName.textContent = userAccountInfo.name;
    }
    
    const accountEmail = document.querySelector('.account-email');
    if (accountEmail) {
        accountEmail.textContent = userAccountInfo.email;
    }
}

// Set up event listeners
function setupEventListeners() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (mobileMenuToggle && sidebar) {
        mobileMenuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (sidebar && sidebar.classList.contains('active') && !sidebar.contains(e.target) && e.target !== mobileMenuToggle) {
            sidebar.classList.remove('active');
        }
    });
    
    // Apply for loan button
    const applyButton = document.querySelector('.apply-loan-btn');
    if (applyButton) {
        applyButton.addEventListener('click', () => {
            window.location.href = 'loan-application.html';
        });
    }
    
    // Notifications toggle
    const notificationsToggle = document.querySelector('.notifications-toggle');
    const notificationsDropdown = document.querySelector('.notifications-dropdown');
    
    if (notificationsToggle && notificationsDropdown) {
        notificationsToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            notificationsDropdown.classList.toggle('show');
            
            // Mark notifications as read when opened
            const unreadBadge = document.querySelector('.unread-badge');
            if (unreadBadge && notificationsDropdown.classList.contains('show')) {
                unreadBadge.style.display = 'none';
            }
        });
        
        // Close notifications dropdown when clicking outside
        document.addEventListener('click', () => {
            if (notificationsDropdown.classList.contains('show')) {
                notificationsDropdown.classList.remove('show');
            }
        });
        
        notificationsDropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
    
    // User dropdown toggle
    const userDropdownToggle = document.querySelector('.user-dropdown-toggle');
    const userDropdown = document.querySelector('.user-dropdown');
    
    if (userDropdownToggle && userDropdown) {
        userDropdownToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            userDropdown.classList.toggle('show');
        });
        
        // Close user dropdown when clicking outside
        document.addEventListener('click', () => {
            if (userDropdown.classList.contains('show')) {
                userDropdown.classList.remove('show');
            }
        });
        
        userDropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
}