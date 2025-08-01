// Loan Status Tracker Component for QuickCred
// Provides real-time status tracking for loan applications

class LoanStatusTracker {
    constructor() {
        this.applications = [];
        this.currentUser = null;
        this.statusStages = [
            { key: 'submitted', name: 'Submitted', icon: 'paper-plane', description: 'Application has been received' },
            { key: 'document_verification', name: 'Document Verification', icon: 'file-check', description: 'Verifying your submitted documents' },
            { key: 'credit_check', name: 'Credit Check', icon: 'credit-card', description: 'Analyzing your credit history' },
            { key: 'underwriting', name: 'Underwriting', icon: 'magnifying-glass-dollar', description: 'Evaluating loan risk and terms' },
            { key: 'approved', name: 'Approved', icon: 'check-circle', description: 'Your loan has been approved' },
            { key: 'funding', name: 'Funding', icon: 'money-bill-transfer', description: 'Processing your loan disbursal' },
            { key: 'active', name: 'Active', icon: 'circle-check', description: 'Your loan is active' },
            { key: 'denied', name: 'Denied', icon: 'xmark-circle', description: 'Your application was declined' }
        ];
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
        this.createStatusTrackerElements();
        this.loadApplications();
        this.setupEventListeners();
    }

    createStatusTrackerElements() {
        const dashboardGrid = document.querySelector('.dashboard-grid');
        if (!dashboardGrid) return;
        
        // Create the status tracker section
        const statusTrackerSection = document.createElement('div');
        statusTrackerSection.className = 'dashboard-section';
        statusTrackerSection.id = 'loanStatusTracker';
        statusTrackerSection.innerHTML = `
            <div class="section-header">
                <h2 class="section-title">Loan Application Status</h2>
                <a href="#" class="view-all-link">View All</a>
            </div>
            
            <div class="status-tracker-container">
                <div class="status-tracker-tabs">
                    <button class="status-tab active" data-status="all">All Applications</button>
                    <button class="status-tab" data-status="pending">Pending</button>
                    <button class="status-tab" data-status="approved">Approved</button>
                    <button class="status-tab" data-status="denied">Denied</button>
                </div>
                
                <div class="application-list">
                    <!-- Applications will be loaded here -->
                    <div class="loading-indicator">
                        <i class="fas fa-spinner fa-spin"></i>
                        <span>Loading applications...</span>
                    </div>
                </div>
            </div>
        `;
        
        // Insert after the first section
        const firstSection = dashboardGrid.querySelector('.dashboard-section');
        if (firstSection) {
            dashboardGrid.insertBefore(statusTrackerSection, firstSection.nextSibling);
        } else {
            dashboardGrid.appendChild(statusTrackerSection);
        }

        // Add necessary CSS for status tracker
        this.addStatusTrackerStyles();
    }

    addStatusTrackerStyles() {
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            /* Status Tracker Styles */
            .status-tracker-container {
                background: white;
                border-radius: var(--rounded-lg);
                box-shadow: var(--shadow-sm);
                overflow: hidden;
            }
            
            .status-tracker-tabs {
                display: flex;
                border-bottom: 1px solid var(--gray-200);
                background: var(--gray-50);
            }
            
            .status-tab {
                padding: var(--space-3) var(--space-4);
                border: none;
                background: transparent;
                font-weight: 600;
                color: var(--gray-600);
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .status-tab:hover {
                color: var(--primary-600);
                background: var(--gray-100);
            }
            
            .status-tab.active {
                color: var(--primary-700);
                border-bottom: 2px solid var(--primary-600);
                background: white;
            }
            
            .application-list {
                padding: var(--space-4);
            }
            
            .application-card {
                border: 1px solid var(--gray-200);
                border-radius: var(--rounded-lg);
                padding: var(--space-4);
                margin-bottom: var(--space-3);
                transition: all 0.2s;
            }
            
            .application-card:hover {
                box-shadow: var(--shadow-md);
                transform: translateY(-2px);
            }
            
            .application-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: var(--space-3);
            }
            
            .application-title {
                font-weight: 700;
                color: var(--gray-900);
                font-size: 1.125rem;
                margin: 0;
            }
            
            .application-id {
                color: var(--gray-500);
                font-size: 0.875rem;
            }

            .application-meta {
                display: flex;
                justify-content: space-between;
                margin-bottom: var(--space-4);
                font-size: 0.875rem;
            }
            
            .application-date {
                color: var(--gray-500);
            }
            
            .application-amount {
                font-weight: 600;
                color: var(--gray-800);
            }
            
            .status-progress {
                margin: var(--space-3) 0;
            }
            
            .progress-stages {
                display: flex;
                position: relative;
                margin-bottom: var(--space-4);
            }
            
            .progress-line {
                position: absolute;
                top: 15px;
                left: 0;
                height: 2px;
                background: var(--gray-200);
                width: 100%;
                z-index: 1;
            }
            
            .progress-filled {
                position: absolute;
                top: 15px;
                left: 0;
                height: 2px;
                background: var(--primary-600);
                z-index: 2;
                transition: width 0.5s ease;
            }
            
            .stage {
                display: flex;
                flex-direction: column;
                align-items: center;
                flex: 1;
                position: relative;
                z-index: 3;
            }
            
            .stage-icon {
                width: 32px;
                height: 32px;
                border-radius: 50%;
                background: white;
                border: 2px solid var(--gray-300);
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: var(--space-2);
                transition: all 0.3s;
            }
            
            .stage-label {
                font-size: 0.75rem;
                text-align: center;
                color: var(--gray-500);
                max-width: 80px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            
            .stage.completed .stage-icon {
                background: var(--success-600);
                border-color: var(--success-600);
                color: white;
            }
            
            .stage.active .stage-icon {
                background: var(--primary-50);
                border-color: var(--primary-600);
                color: var(--primary-700);
                transform: scale(1.1);
                box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15);
            }
            
            .stage.completed .stage-label {
                color: var(--success-700);
                font-weight: 600;
            }
            
            .stage.active .stage-label {
                color: var(--primary-700);
                font-weight: 600;
            }

            .stage.denied .stage-icon {
                background: var(--error-600);
                border-color: var(--error-600);
                color: white;
            }

            .stage.denied .stage-label {
                color: var(--error-700);
                font-weight: 600;
            }

            .stage-tooltip {
                position: absolute;
                bottom: 100%;
                left: 50%;
                transform: translateX(-50%);
                background: var(--gray-900);
                color: white;
                padding: var(--space-2) var(--space-3);
                border-radius: var(--rounded-md);
                font-size: 0.75rem;
                opacity: 0;
                visibility: hidden;
                transition: all 0.2s;
                width: 150px;
                text-align: center;
                margin-bottom: var(--space-2);
                pointer-events: none;
                z-index: 10;
            }
            
            .stage-tooltip::after {
                content: '';
                position: absolute;
                top: 100%;
                left: 50%;
                margin-left: -5px;
                border-width: 5px;
                border-style: solid;
                border-color: var(--gray-900) transparent transparent transparent;
            }
            
            .stage:hover .stage-tooltip {
                opacity: 1;
                visibility: visible;
            }

            .application-footer {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: var(--space-3);
                padding-top: var(--space-3);
                border-top: 1px solid var(--gray-100);
            }
            
            .application-status {
                display: flex;
                align-items: center;
                font-weight: 600;
                font-size: 0.875rem;
            }
            
            .status-icon {
                margin-right: var(--space-2);
            }
            
            .status-submitted { color: var(--gray-600); }
            .status-document_verification { color: var(--info-600); }
            .status-credit_check { color: var(--warning-600); }
            .status-underwriting { color: var(--info-700); }
            .status-approved { color: var(--success-600); }
            .status-funding { color: var(--primary-600); }
            .status-active { color: var(--success-700); }
            .status-denied { color: var(--error-700); }

            .application-actions {
                display: flex;
                gap: var(--space-2);
            }

            .notification-dot {
                display: inline-block;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: var(--primary-600);
                margin-left: var(--space-1);
                animation: pulse 2s infinite;
            }

            @keyframes pulse {
                0% { transform: scale(0.95); opacity: 1; }
                50% { transform: scale(1.1); opacity: 0.7; }
                100% { transform: scale(0.95); opacity: 1; }
            }

            .loading-indicator {
                display: flex;
                align-items: center;
                justify-content: center;
                padding: var(--space-8);
                color: var(--gray-500);
                gap: var(--space-2);
            }

            .status-badge {
                display: inline-flex;
                align-items: center;
                padding: var(--space-1) var(--space-2);
                border-radius: var(--rounded-full);
                font-size: 0.75rem;
                font-weight: 600;
            }

            .badge-submitted { background: var(--gray-100); color: var(--gray-700); }
            .badge-document_verification { background: var(--info-50); color: var(--info-700); }
            .badge-credit_check { background: var(--warning-50); color: var(--warning-700); }
            .badge-underwriting { background: var(--info-100); color: var(--info-800); }
            .badge-approved { background: var(--success-50); color: var(--success-700); }
            .badge-funding { background: var(--primary-50); color: var(--primary-700); }
            .badge-active { background: var(--success-100); color: var(--success-800); }
            .badge-denied { background: var(--error-50); color: var(--error-700); }

            .empty-applications {
                padding: var(--space-8);
                text-align: center;
                color: var(--gray-500);
            }

            .empty-applications i {
                font-size: 2.5rem;
                color: var(--gray-300);
                margin-bottom: var(--space-4);
            }

            .empty-applications p {
                margin-bottom: var(--space-4);
            }
        `;
        document.head.appendChild(styleElement);
    }
}