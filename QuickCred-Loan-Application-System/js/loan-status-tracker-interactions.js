// Interaction handlers for LoanStatusTracker class

LoanStatusTracker.prototype.setupEventListeners = function() {
    // Tab filtering
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('status-tab')) {
            const filter = e.target.dataset.status;
            this.renderApplications(filter);
        }

        // View application details
        if (e.target.classList.contains('view-application-btn') || 
            e.target.closest('.view-application-btn')) {
            const button = e.target.classList.contains('view-application-btn') ? 
                e.target : e.target.closest('.view-application-btn');
            const applicationId = button.dataset.applicationId;
            this.viewApplicationDetails(applicationId);
        }

        // Action required buttons
        if (e.target.classList.contains('action-required-btn') || 
            e.target.closest('.action-required-btn')) {
            const button = e.target.classList.contains('action-required-btn') ? 
                e.target : e.target.closest('.action-required-btn');
            const applicationId = button.dataset.applicationId;
            const action = button.dataset.action;
            this.handleApplicationAction(applicationId, action);
        }

        // Document re-upload
        if (e.target.classList.contains('reupload-btn') || 
            e.target.closest('.reupload-btn')) {
            const button = e.target.classList.contains('reupload-btn') ? 
                e.target : e.target.closest('.reupload-btn');
            const documentId = button.dataset.documentId;
            this.handleDocumentReupload(documentId);
        }

        // View repayment schedule
        if (e.target.classList.contains('view-repayment-btn') || 
            e.target.closest('.view-repayment-btn')) {
            const button = e.target.classList.contains('view-repayment-btn') ? 
                e.target : e.target.closest('.view-repayment-btn');
            const applicationId = button.dataset.applicationId;
            this.viewRepaymentSchedule(applicationId);
        }
    });
};

LoanStatusTracker.prototype.viewApplicationDetails = function(applicationId) {
    const application = this.applications.find(app => app.id === applicationId);
    if (!application) return;

    // Mark updates as seen
    if (application.hasUpdate) {
        application.hasUpdate = false;
        this.renderApplications(document.querySelector('.status-tab.active').dataset.status);
    }

    // Show application details modal
    const modalContent = this.generateApplicationDetailsModal(application);
    this.showModal('Application Details', modalContent);
};

LoanStatusTracker.prototype.generateApplicationDetailsModal = function(application) {
    const statusIndex = this.getStatusIndex(application.status);
    const progressWidth = this.calculateProgressWidth(statusIndex);

    return `
        <div class="application-detail-modal">
            <div class="application-detail-header">
                <div class="detail-heading">
                    <h3>${application.loanType} Loan Application</h3>
                    <div class="detail-id">#${application.id}</div>
                </div>
                <div class="detail-meta">
                    <div class="detail-amount">
                        <span class="label">Amount:</span>
                        <span class="value">${this.formatCurrency(application.loanAmount)}</span>
                    </div>
                    <div class="detail-date">
                        <span class="label">Applied on:</span>
                        <span class="value">${this.formatDate(application.applicationDate)}</span>
                    </div>
                </div>
            </div>
            
            <div class="detail-status">
                <h4>Application Status</h4>
                <div class="status-badge badge-${application.status}">
                    ${this.getStatusName(application.status)}
                </div>
                
                <div class="status-progress">
                    <div class="progress-stages">
                        <div class="progress-line"></div>
                        <div class="progress-filled" style="width: ${progressWidth}%"></div>
                        ${this.renderStatusStages(application.status)}
                    </div>
                </div>
                
                <div class="status-description">
                    <i class="fas fa-${this.getStatusIcon(application.status)} status-icon"></i>
                    <p>${this.getDetailedStatusDescription(application.status)}</p>
                </div>
            </div>
            
            ${application.documentsRequired ? `
            <div class="detail-documents">
                <h4>Required Documents</h4>
                <div class="document-list">
                    ${application.documents.map(doc => `
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
                    `).join('')}
                </div>
            </div>
            ` : ''}
            
            <div class="detail-info">
                <h4>Application Details</h4>
                <div class="info-grid">
                    <div class="info-group">
                        <span class="info-label">Loan Type</span>
                        <span class="info-value">${application.loanType}</span>
                    </div>
                    <div class="info-group">
                        <span class="info-label">Loan Purpose</span>
                        <span class="info-value">${application.loanPurpose || 'Not specified'}</span>
                    </div>
                    <div class="info-group">
                        <span class="info-label">Interest Rate</span>
                        <span class="info-value">${application.interestRate ? application.interestRate + '%' : 'Pending'}</span>
                    </div>
                    <div class="info-group">
                        <span class="info-label">Term Length</span>
                        <span class="info-value">${application.termLength || 'Pending'}</span>
                    </div>
                    <div class="info-group">
                        <span class="info-label">Monthly Payment</span>
                        <span class="info-value">${application.monthlyPayment ? this.formatCurrency(application.monthlyPayment) : 'Pending'}</span>
                    </div>
                    <div class="info-group">
                        <span class="info-label">Application Status</span>
                        <span class="info-value status-${application.status}">${this.getStatusName(application.status)}</span>
                    </div>
                </div>
            </div>
            
            ${application.timeline && application.timeline.length > 0 ? `
            <div class="detail-timeline">
                <h4>Application Timeline</h4>
                <div class="timeline">
                    ${application.timeline.map((event, index) => `
                        <div class="timeline-item">
                            <div class="timeline-marker ${index === 0 ? 'active' : ''}"></div>
                            <div class="timeline-content">
                                <div class="timeline-date">${this.formatDate(event.date)}</div>
                                <div class="timeline-title">${event.title}</div>
                                <div class="timeline-description">${event.description}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            ` : ''}
            
            ${application.status === 'approved' || application.status === 'funding' || application.status === 'active' ? `
            <div class="detail-actions">
                <button class="btn btn-primary view-repayment-btn" data-application-id="${application.id}">
                    <i class="fas fa-calendar-alt"></i> View Repayment Schedule
                </button>
            </div>
            ` : ''}
            
            <style>
                .application-detail-modal {
                    padding: var(--space-2);
                }
                .application-detail-header {
                    margin-bottom: var(--space-4);
                }
                .detail-heading {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: var(--space-2);
                }
                .detail-heading h3 {
                    margin: 0;
                    color: var(--gray-900);
                    font-size: 1.25rem;
                }
                .detail-id {
                    color: var(--gray-500);
                    font-size: 0.875rem;
                }
                .detail-meta {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: var(--space-2);
                }
                .detail-amount, .detail-date {
                    font-size: 0.875rem;
                }
                .detail-amount .value {
                    font-weight: 700;
                    color: var(--gray-900);
                }
                .detail-status {
                    background: var(--gray-50);
                    border-radius: var(--rounded-lg);
                    padding: var(--space-4);
                    margin-bottom: var(--space-4);
                }
                .detail-status h4 {
                    margin-top: 0;
                    margin-bottom: var(--space-3);
                    color: var(--gray-800);
                }
                .status-description {
                    display: flex;
                    align-items: flex-start;
                    margin-top: var(--space-3);
                    font-size: 0.875rem;
                    color: var(--gray-700);
                }
                .status-description .status-icon {
                    color: var(--primary-600);
                    margin-right: var(--space-2);
                    font-size: 1rem;
                    margin-top: 3px;
                }
                .detail-documents {
                    margin-bottom: var(--space-4);
                }
                .detail-documents h4 {
                    margin-top: 0;
                    margin-bottom: var(--space-3);
                    color: var(--gray-800);
                }
                .document-list {
                    background: white;
                    border-radius: var(--rounded-lg);
                    border: 1px solid var(--gray-200);
                    overflow: hidden;
                }
                .document-item {
                    padding: var(--space-3);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid var(--gray-100);
                }
                .document-item:last-child {
                    border-bottom: none;
                }
                .detail-info {
                    margin-bottom: var(--space-4);
                }
                .detail-info h4 {
                    margin-top: 0;
                    margin-bottom: var(--space-3);
                    color: var(--gray-800);
                }
                .info-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: var(--space-3);
                }
                .info-group {
                    display: flex;
                    flex-direction: column;
                }
                .info-label {
                    font-size: 0.75rem;
                    color: var(--gray-500);
                    margin-bottom: var(--space-1);
                }
                .info-value {
                    font-weight: 600;
                    color: var(--gray-800);
                }
                .detail-timeline {
                    margin-bottom: var(--space-4);
                }
                .detail-timeline h4 {
                    margin-top: 0;
                    margin-bottom: var(--space-3);
                    color: var(--gray-800);
                }
                .timeline {
                    position: relative;
                    padding-left: var(--space-6);
                }
                .timeline:before {
                    content: '';
                    position: absolute;
                    left: 9px;
                    top: 0;
                    bottom: 0;
                    width: 2px;
                    background: var(--gray-200);
                }
                .timeline-item {
                    position: relative;
                    margin-bottom: var(--space-4);
                }
                .timeline-marker {
                    position: absolute;
                    left: -16px;
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: var(--gray-300);
                    border: 2px solid var(--gray-100);
                }
                .timeline-marker.active {
                    background: var(--primary-600);
                    border-color: var(--primary-100);
                }
                .timeline-date {
                    font-size: 0.75rem;
                    color: var(--gray-500);
                    margin-bottom: var(--space-1);
                }
                .timeline-title {
                    font-weight: 600;
                    color: var(--gray-800);
                    margin-bottom: var(--space-1);
                }
                .timeline-description {
                    font-size: 0.875rem;
                    color: var(--gray-600);
                }
                .detail-actions {
                    margin-top: var(--space-4);
                    display: flex;
                    justify-content: flex-end;
                }
            </style>
        </div>
    `;
};

LoanStatusTracker.prototype.handleApplicationAction = function(applicationId, action) {
    const application = this.applications.find(app => app.id === applicationId);
    if (!application) return;

    switch (action) {
        case 'upload_documents':
            this.showDocumentUploadModal(application);
            break;
        case 'accept_terms':
            this.showAcceptTermsModal(application);
            break;
        case 'make_payment':
            this.showMakePaymentModal(application);
            break;
        default:
            console.error('Unknown action:', action);
    }
};

LoanStatusTracker.prototype.handleDocumentReupload = function(documentId) {
    // Show document upload modal
    this.showUploadModal('Re-upload Document', 'Please select the updated document to upload.');
};

LoanStatusTracker.prototype.showDocumentUploadModal = function(application) {
    // Prepare documents that need to be uploaded
    const pendingDocuments = application.documents
        .filter(doc => doc.status === 'pending' || doc.status === 'rejected')
        .map(doc => `
            <div class="upload-document-item">
                <div class="document-name">
                    <i class="fas fa-${this.getDocumentIcon(doc.type)}"></i>
                    ${doc.name}
                </div>
                <div class="document-status ${doc.status}">
                    ${this.capitalizeFirst(doc.status)}
                </div>
                <div class="document-upload">
                    <input type="file" id="doc-${doc.id}" class="document-file-input">
                    <label for="doc-${doc.id}" class="btn btn-outline btn-sm">
                        <i class="fas fa-upload"></i> Select File
                    </label>
                </div>
            </div>
        `).join('');

    const content = `
        <div class="upload-documents-modal">
            <p class="upload-instructions">
                Please upload the following required documents to proceed with your application.
                Accepted formats: PDF, JPG, PNG (Max size: 5MB per file)
            </p>
            
            <div class="document-upload-list">
                ${pendingDocuments}
            </div>
            
            <div class="upload-actions">
                <button class="btn btn-primary upload-documents-btn" data-application-id="${application.id}">
                    Upload Documents
                </button>
            </div>
            
            <style>
                .upload-documents-modal {
                    padding: var(--space-2);
                }
                .upload-instructions {
                    margin-bottom: var(--space-4);
                    font-size: 0.875rem;
                    color: var(--gray-600);
                }
                .document-upload-list {
                    margin-bottom: var(--space-4);
                }
                .upload-document-item {
                    display: flex;
                    align-items: center;
                    padding: var(--space-3);
                    border: 1px solid var(--gray-200);
                    border-radius: var(--rounded-lg);
                    margin-bottom: var(--space-3);
                }
                .document-name {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    gap: var(--space-2);
                    font-weight: 500;
                }
                .document-status {
                    margin-right: var(--space-3);
                    font-size: 0.75rem;
                    font-weight: 600;
                }
                .document-file-input {
                    display: none;
                }
                .upload-actions {
                    display: flex;
                    justify-content: flex-end;
                    margin-top: var(--space-4);
                }
            </style>
        </div>
    `;

    this.showModal('Upload Required Documents', content);
};

LoanStatusTracker.prototype.showUploadModal = function(title, message) {
    const content = `
        <div class="upload-modal">
            <p>${message}</p>
            <div class="upload-form">
                <input type="file" id="documentUpload" class="file-input" />
                <label for="documentUpload" class="btn btn-outline">
                    <i class="fas fa-file-upload"></i> Choose File
                </label>
                <span class="selected-file">No file selected</span>
            </div>
            <button class="btn btn-primary upload-btn">Upload Document</button>
            
            <style>
                .upload-modal {
                    padding: var(--space-4);
                    text-align: center;
                }
                .upload-form {
                    margin: var(--space-4) 0;
                    display: flex;
                    align-items: center;
                    gap: var(--space-3);
                }
                .file-input {
                    display: none;
                }
                .selected-file {
                    color: var(--gray-600);
                    font-size: 0.875rem;
                }
            </style>
        </div>
    `;

    this.showModal(title, content);

    // Add file selection listener
    document.getElementById('documentUpload').addEventListener('change', function(e) {
        const fileName = e.target.files[0] ? e.target.files[0].name : 'No file selected';
        document.querySelector('.selected-file').textContent = fileName;
    });
};

LoanStatusTracker.prototype.viewRepaymentSchedule = function(applicationId) {
    const application = this.applications.find(app => app.id === applicationId);
    if (!application) return;

    // Delegate to the repayment calendar component
    if (window.RepaymentCalendar) {
        window.RepaymentCalendar.showRepaymentSchedule(application);
    } else {
        console.error('RepaymentCalendar component not found');
        this.showErrorMessage('Failed to load repayment schedule. Please try again later.');
    }
};

LoanStatusTracker.prototype.showModal = function(title, content) {
    // Create modal container if it doesn't exist
    let modalContainer = document.getElementById('statusTrackerModal');
    if (!modalContainer) {
        modalContainer = document.createElement('div');
        modalContainer.id = 'statusTrackerModal';
        modalContainer.className = 'modal-container';
        document.body.appendChild(modalContainer);
        
        // Add modal styles
        const modalStyle = document.createElement('style');
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
                max-width: 700px;
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