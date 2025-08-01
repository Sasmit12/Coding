// Methods for LoanStatusTracker class

// Extend the LoanStatusTracker prototype with these methods
LoanStatusTracker.prototype.async = function(fn) {
    return new Promise((resolve) => setTimeout(() => resolve(fn()), 1000));
};

LoanStatusTracker.prototype.fetchApplications = async function() {
    // Simulate API call to fetch applications
    return await this.async(() => [
        {
            id: 'LA-2025-001',
            loanType: 'Personal',
            loanAmount: 25000,
            loanPurpose: 'Debt consolidation',
            status: 'active',
            applicationDate: new Date(2025, 5, 15),
            interestRate: 8.5,
            termLength: '3 years',
            monthlyPayment: 786.81,
            hasUpdate: false,
            documentsRequired: false,
            actionRequired: false,
            timeline: [
                {
                    date: new Date(2025, 5, 15),
                    title: 'Application Submitted',
                    description: 'Your loan application was successfully submitted.'
                },
                {
                    date: new Date(2025, 5, 16),
                    title: 'Application Approved',
                    description: 'Your loan has been approved with an interest rate of 8.5%.'
                },
                {
                    date: new Date(2025, 5, 18),
                    title: 'Loan Funded',
                    description: 'Your loan has been funded and the amount has been disbursed.'
                },
                {
                    date: new Date(2025, 5, 18),
                    title: 'Loan Activated',
                    description: 'Your loan is now active. First payment is due on July 18, 2025.'
                }
            ]
        },
        {
            id: 'LA-2025-002',
            loanType: 'Business',
            loanAmount: 100000,
            loanPurpose: 'Expansion capital',
            status: 'document_verification',
            applicationDate: new Date(2025, 6, 20),
            hasUpdate: true,
            documentsRequired: true,
            actionRequired: true,
            actionType: 'upload_documents',
            actionText: 'Upload Documents',
            documents: [
                {
                    id: 'DOC-001',
                    name: 'Business Registration',
                    type: 'identification',
                    status: 'verified'
                },
                {
                    id: 'DOC-002',
                    name: 'Business Plan',
                    type: 'document',
                    status: 'pending'
                },
                {
                    id: 'DOC-003',
                    name: 'Financial Statements',
                    type: 'finance',
                    status: 'rejected'
                }
            ],
            timeline: [
                {
                    date: new Date(2025, 6, 20),
                    title: 'Application Submitted',
                    description: 'Your business loan application was successfully submitted.'
                },
                {
                    date: new Date(2025, 6, 21),
                    title: 'Documents Requested',
                    description: 'Additional documents are required to process your application.'
                },
                {
                    date: new Date(2025, 6, 23),
                    title: 'Document Review',
                    description: 'Your submitted documents are being reviewed. One document requires resubmission.'
                }
            ]
        },
        {
            id: 'LA-2025-003',
            loanType: 'Auto',
            loanAmount: 35000,
            loanPurpose: 'Vehicle purchase',
            status: 'denied',
            applicationDate: new Date(2025, 6, 10),
            hasUpdate: false,
            documentsRequired: false,
            actionRequired: false,
            timeline: [
                {
                    date: new Date(2025, 6, 10),
                    title: 'Application Submitted',
                    description: 'Your auto loan application was successfully submitted.'
                },
                {
                    date: new Date(2025, 6, 12),
                    title: 'Credit Check Completed',
                    description: 'Your credit history has been reviewed.'
                },
                {
                    date: new Date(2025, 6, 14),
                    title: 'Application Denied',
                    description: 'We regret to inform you that your loan application was denied due to insufficient credit history. You may reapply after 30 days.'
                }
            ]
        }
    ]);
};

LoanStatusTracker.prototype.loadApplications = async function() {
    try {
        const applications = await this.fetchApplications();
        this.applications = applications;
        this.renderApplications('all');
    } catch (error) {
        console.error('Error loading applications:', error);
        this.showErrorMessage('Failed to load loan applications');
    }
};

LoanStatusTracker.prototype.renderApplications = function(filter = 'all') {
    const applicationList = document.querySelector('.application-list');
    if (!applicationList) return;

    // Update active tab
    const tabs = document.querySelectorAll('.status-tab');
    tabs.forEach(tab => {
        tab.classList.toggle('active', tab.dataset.status === filter);
    });

    // Filter applications
    let filteredApplications = [...this.applications];
    if (filter !== 'all') {
        if (filter === 'pending') {
            filteredApplications = this.applications.filter(app => 
                !['approved', 'active', 'denied'].includes(app.status)
            );
        } else {
            filteredApplications = this.applications.filter(app => app.status === filter);
        }
    }

    // Show empty state if no applications
    if (filteredApplications.length === 0) {
        applicationList.innerHTML = `
            <div class="empty-applications">
                <i class="fas fa-file-search"></i>
                <p>No loan applications found for this filter.</p>
                <a href="../html/loan-application.html" class="btn btn-primary btn-sm">
                    <i class="fas fa-plus"></i> Apply for a Loan
                </a>
            </div>
        `;
        return;
    }

    // Generate HTML for applications
    applicationList.innerHTML = filteredApplications.map(app => {
        const statusIndex = this.getStatusIndex(app.status);
        const progressWidth = this.calculateProgressWidth(statusIndex);
        
        return `
            <div class="application-card" data-application-id="${app.id}">
                <div class="application-header">
                    <div>
                        <h4 class="application-title">${app.loanType} Loan</h4>
                        <div class="application-id">#${app.id}</div>
                    </div>
                    <div class="status-badge badge-${app.status}">
                        ${this.getStatusName(app.status)}
                        ${app.hasUpdate ? '<span class="notification-dot"></span>' : ''}
                    </div>
                </div>
                
                <div class="application-meta">
                    <div class="application-date">Applied on ${this.formatDate(app.applicationDate)}</div>
                    <div class="application-amount">${this.formatCurrency(app.loanAmount)}</div>
                </div>
                
                <div class="status-progress">
                    <div class="progress-stages">
                        <div class="progress-line"></div>
                        <div class="progress-filled" style="width: ${progressWidth}%"></div>
                        
                        ${this.renderStatusStages(app.status)}
                    </div>
                </div>
                
                ${app.documentsRequired ? this.renderDocumentSection(app.documents) : ''}
                
                <div class="application-footer">
                    <div class="application-status status-${app.status}">
                        <i class="fas fa-${this.getStatusIcon(app.status)} status-icon"></i>
                        ${this.getStatusDescription(app.status)}
                    </div>
                    <div class="application-actions">
                        ${app.actionRequired ? `
                            <button class="btn btn-primary btn-sm action-required-btn" data-action="${app.actionType}" data-application-id="${app.id}">
                                ${app.actionText}
                            </button>
                        ` : ''}
                        <button class="btn btn-outline btn-sm view-application-btn" data-application-id="${app.id}">
                            View Details
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
};

LoanStatusTracker.prototype.renderStatusStages = function(currentStatus) {
    // For denied applications, show only relevant stages
    const stages = currentStatus === 'denied' 
        ? this.statusStages.filter(stage => 
            stage.key === 'submitted' || 
            stage.key === currentStatus || 
            this.getStatusIndex(stage.key) < this.getStatusIndex(currentStatus)
        )
        : this.statusStages.filter(stage => stage.key !== 'denied');
    
    return stages.map(stage => {
        const isCompleted = this.isStageCompleted(currentStatus, stage.key);
        const isActive = currentStatus === stage.key;
        const isDenied = currentStatus === 'denied' && stage.key === 'denied';
        
        let className = 'stage';
        if (isCompleted) className += ' completed';
        if (isActive) className += ' active';
        if (isDenied) className += ' denied';
        
        return `
            <div class="${className}" data-stage="${stage.key}">
                <div class="stage-tooltip">${stage.description}</div>
                <div class="stage-icon">
                    ${isCompleted && !isActive ? '<i class="fas fa-check"></i>' : `<i class="fas fa-${stage.icon}"></i>`}
                </div>
                <div class="stage-label">${stage.name}</div>
            </div>
        `;
    }).join('');
};

LoanStatusTracker.prototype.renderDocumentSection = function(documents) {
    if (!documents || documents.length === 0) return '';

    const documentItems = documents.map(doc => `
        <div class="document-item">
            <div class="document-name">
                <i class="fas fa-${this.getDocumentIcon(doc.type)}"></i>
                ${doc.name}
            </div>
            <div class="document-status ${doc.status}">
                ${this.capitalizeFirst(doc.status)}
                ${doc.status === 'rejected' ? 
                    `<button class="btn btn-text btn-sm reupload-btn" data-document-id="${doc.id}">
                        <i class="fas fa-upload"></i> Re-upload
                    </button>` : 
                    ''
                }
            </div>
        </div>
    `).join('');

    return `
        <div class="application-documents">
            <h5 class="document-section-title">Required Documents</h5>
            <div class="document-list">
                ${documentItems}
            </div>
        </div>
    `;
};

// Helper methods
LoanStatusTracker.prototype.getStatusIndex = function(status) {
    const index = this.statusStages.findIndex(stage => stage.key === status);
    return index !== -1 ? index : 0;
};

LoanStatusTracker.prototype.calculateProgressWidth = function(statusIndex) {
    if (statusIndex === 0) return 0;
    const maxStages = this.statusStages.filter(stage => stage.key !== 'denied').length - 1;
    return (statusIndex / maxStages) * 100;
};

LoanStatusTracker.prototype.isStageCompleted = function(currentStatus, stageKey) {
    const currentIndex = this.getStatusIndex(currentStatus);
    const stageIndex = this.getStatusIndex(stageKey);
    return stageIndex < currentIndex || (stageIndex === currentIndex && currentStatus === 'denied' && stageKey === 'denied');
};

LoanStatusTracker.prototype.getStatusName = function(status) {
    const stage = this.statusStages.find(s => s.key === status);
    return stage ? stage.name : 'Unknown';
};

LoanStatusTracker.prototype.getStatusIcon = function(status) {
    const stage = this.statusStages.find(s => s.key === status);
    return stage ? stage.icon : 'question-circle';
};

LoanStatusTracker.prototype.getStatusDescription = function(status) {
    switch(status) {
        case 'submitted': return 'Application received';
        case 'document_verification': return 'Verifying documents';
        case 'credit_check': return 'Checking credit history';
        case 'underwriting': return 'Evaluating application';
        case 'approved': return 'Loan approved';
        case 'funding': return 'Processing disbursement';
        case 'active': return 'Loan is active';
        case 'denied': return 'Application declined';
        default: return 'Unknown status';
    }
};

LoanStatusTracker.prototype.getDetailedStatusDescription = function(status) {
    switch(status) {
        case 'submitted': 
            return 'Your application has been received and is in queue for processing. We\'ll update you once review begins.';
        case 'document_verification': 
            return 'We\'re currently verifying the documents you submitted. If additional information is needed, we\'ll notify you promptly.';
        case 'credit_check': 
            return 'Your credit history is being analyzed to determine loan eligibility and terms. This typically takes 1-2 business days.';
        case 'underwriting': 
            return 'Our underwriting team is evaluating your application details to determine final loan terms. This is the final step before approval.';
        case 'approved': 
            return 'Congratulations! Your loan has been approved. Please review the offered terms and accept to proceed to funding.';
        case 'funding': 
            return 'Your loan is being processed for disbursal. The funds should appear in your account within 1-2 business days.';
        case 'active': 
            return 'Your loan is active. Make payments according to your repayment schedule to maintain good standing.';
        case 'denied': 
            return 'We regret to inform you that your application was not approved at this time. You can view the specific reasons in your application details.';
        default: 
            return 'Status information not available.';
    }
};

LoanStatusTracker.prototype.getDocumentIcon = function(type) {
    switch(type) {
        case 'identification': return 'id-card';
        case 'finance': return 'file-invoice-dollar';
        case 'employment': return 'briefcase';
        case 'property': return 'home';
        case 'vehicle': return 'car';
        default: return 'file-alt';
    }
};

LoanStatusTracker.prototype.capitalizeFirst = function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

LoanStatusTracker.prototype.formatDate = function(date) {
    if (!date) return 'Unknown';
    return new Date(date).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
};

LoanStatusTracker.prototype.formatCurrency = function(amount) {
    return new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    }).format(amount);
};

LoanStatusTracker.prototype.showErrorMessage = function(message) {
    console.error(message);
    // Add an error toast notification here if needed
};