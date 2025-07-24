// Edit Profile Modal Functionality
function showEditProfileModal() {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        backdrop-filter: blur(5px);
        animation: fadeIn 0.3s ease;
    `;

    // Create modal content container
    const modalContent = document.createElement('div');
    modalContent.className = 'edit-profile-modal';
    modalContent.style.cssText = `
        background: white;
        border-radius: 15px;
        width: 90%;
        max-width: 500px;
        max-height: 90vh;
        overflow-y: auto;
        font-family: 'Poppins', sans-serif;
        color: #333;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        animation: slideUp 0.3s ease;
    `;

    // Create form HTML
    modalContent.innerHTML = `
        <div style="padding: 30px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px;">
                <h2 style="margin: 0; color: #667eea; font-size: 1.6rem;">
                    <i class="fas fa-user-edit" style="margin-right: 10px;"></i>
                    Edit Profile
                </h2>
                <button type="button" id="closeEditProfile" style="
                    background: none;
                    border: none;
                    font-size: 24px;
                    color: #999;
                    cursor: pointer;
                    padding: 5px;
                    border-radius: 50%;
                    width: 35px;
                    height: 35px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                " onmouseover="this.style.background='#f0f0f0'; this.style.color='#333';" 
                   onmouseout="this.style.background='none'; this.style.color='#999';">
                    ×
                </button>
            </div>

            <form id="editProfileForm" style="display: flex; flex-direction: column; gap: 20px;">
                <!-- Profile Picture Section -->
                <div style="text-align: center; margin-bottom: 20px;">
                    <div id="profile-picture-container" style="
                        width: 80px;
                        height: 80px;
                        border-radius: 50%;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 32px;
                        font-weight: bold;
                        margin: 0 auto 15px;
                        cursor: pointer;
                        transition: transform 0.3s ease;
                        position: relative;
                        overflow: hidden;
                    " onclick="document.getElementById('profilePictureInput').click();">
                        <span id="profile-initial">${getFirstLetter()}</span>
                        <div style="
                            position: absolute;
                            bottom: 0;
                            left: 0;
                            right: 0;
                            background: rgba(0,0,0,0.7);
                            color: white;
                            padding: 5px;
                            font-size: 10px;
                            opacity: 0;
                            transition: opacity 0.3s ease;
                        " class="upload-overlay">
                            Change
                        </div>
                    </div>
                    <input type="file" id="profilePictureInput" accept="image/*" style="display: none;">
                    <p style="margin: 0; color: #666; font-size: 0.9rem;">Click to change profile picture</p>
                </div>

                <!-- Full Name -->
                <div class="form-group">
                    <label for="fullName" style="
                        display: block;
                        margin-bottom: 8px;
                        font-weight: 600;
                        color: #333;
                        font-size: 0.95rem;
                    ">
                        <i class="fas fa-user" style="margin-right: 8px; color: #667eea;"></i>
                        Full Name *
                    </label>
                    <input type="text" id="fullName" name="fullName" required 
                           placeholder="Enter your full name" 
                           style="
                               width: 100%;
                               padding: 12px 15px;
                               border: 2px solid #e1e5e9;
                               border-radius: 8px;
                               font-size: 1rem;
                               font-family: 'Poppins', sans-serif;
                               box-sizing: border-box;
                               transition: all 0.3s ease;
                           "
                           onfocus="this.style.borderColor='#667eea'; this.style.boxShadow='0 0 0 3px rgba(102, 126, 234, 0.1)';"
                           onblur="this.style.borderColor='#e1e5e9'; this.style.boxShadow='none';" />
                </div>

                <!-- Email -->
                <div class="form-group">
                    <label for="email" style="
                        display: block;
                        margin-bottom: 8px;
                        font-weight: 600;
                        color: #333;
                        font-size: 0.95rem;
                    ">
                        <i class="fas fa-envelope" style="margin-right: 8px; color: #667eea;"></i>
                        Email Address
                    </label>
                    <input type="email" id="email" name="email" 
                           placeholder="your.email@example.com" 
                           disabled
                           style="
                               width: 100%;
                               padding: 12px 15px;
                               border: 2px solid #e1e5e9;
                               border-radius: 8px;
                               font-size: 1rem;
                               font-family: 'Poppins', sans-serif;
                               box-sizing: border-box;
                               background: #f8f9fa;
                               color: #666;
                           " />
                    <small style="color: #999; font-size: 0.85rem; margin-top: 5px; display: block;">
                        Email cannot be changed. Contact support if needed.
                    </small>
                </div>

                <!-- Phone Number -->
                <div class="form-group">
                    <label for="phone" style="
                        display: block;
                        margin-bottom: 8px;
                        font-weight: 600;
                        color: #333;
                        font-size: 0.95rem;
                    ">
                        <i class="fas fa-phone" style="margin-right: 8px; color: #667eea;"></i>
                        Phone Number
                    </label>
                    <input type="tel" id="phone" name="phone" 
                           placeholder="(555) 123-4567" 
                           style="
                               width: 100%;
                               padding: 12px 15px;
                               border: 2px solid #e1e5e9;
                               border-radius: 8px;
                               font-size: 1rem;
                               font-family: 'Poppins', sans-serif;
                               box-sizing: border-box;
                               transition: all 0.3s ease;
                           "
                           onfocus="this.style.borderColor='#667eea'; this.style.boxShadow='0 0 0 3px rgba(102, 126, 234, 0.1)';"
                           onblur="this.style.borderColor='#e1e5e9'; this.style.boxShadow='none';" />
                </div>

                <!-- Date of Birth -->
                <div class="form-group">
                    <label for="dateOfBirth" style="
                        display: block;
                        margin-bottom: 8px;
                        font-weight: 600;
                        color: #333;
                        font-size: 0.95rem;
                    ">
                        <i class="fas fa-calendar" style="margin-right: 8px; color: #667eea;"></i>
                        Date of Birth
                    </label>
                    <input type="date" id="dateOfBirth" name="dateOfBirth" 
                           style="
                               width: 100%;
                               padding: 12px 15px;
                               border: 2px solid #e1e5e9;
                               border-radius: 8px;
                               font-size: 1rem;
                               font-family: 'Poppins', sans-serif;
                               box-sizing: border-box;
                               transition: all 0.3s ease;
                           "
                           onfocus="this.style.borderColor='#667eea'; this.style.boxShadow='0 0 0 3px rgba(102, 126, 234, 0.1)';"
                           onblur="this.style.borderColor='#e1e5e9'; this.style.boxShadow='none';" />
                </div>

                <!-- Address -->
                <div class="form-group">
                    <label for="address" style="
                        display: block;
                        margin-bottom: 8px;
                        font-weight: 600;
                        color: #333;
                        font-size: 0.95rem;
                    ">
                        <i class="fas fa-map-marker-alt" style="margin-right: 8px; color: #667eea;"></i>
                        Address
                    </label>
                    <textarea id="address" name="address" 
                              placeholder="Enter your full address" 
                              rows="3"
                              style="
                                  width: 100%;
                                  padding: 12px 15px;
                                  border: 2px solid #e1e5e9;
                                  border-radius: 8px;
                                  font-size: 1rem;
                                  font-family: 'Poppins', sans-serif;
                                  box-sizing: border-box;
                                  transition: all 0.3s ease;
                                  resize: vertical;
                                  min-height: 80px;
                              "
                              onfocus="this.style.borderColor='#667eea'; this.style.boxShadow='0 0 0 3px rgba(102, 126, 234, 0.1)';"
                              onblur="this.style.borderColor='#e1e5e9'; this.style.boxShadow='none';"></textarea>
                </div>

                <!-- Notification Preferences -->
                <div class="form-group">
                    <label for="notificationPreferences" style="
                        display: block;
                        margin-bottom: 8px;
                        font-weight: 600;
                        color: #333;
                        font-size: 0.95rem;
                    ">
                        <i class="fas fa-bell" style="margin-right: 8px; color: #667eea;"></i>
                        Notification Preferences
                    </label>
                    <select id="notificationPreferences" name="notificationPreferences" 
                            style="
                                width: 100%;
                                padding: 12px 15px;
                                border: 2px solid #e1e5e9;
                                border-radius: 8px;
                                font-size: 1rem;
                                font-family: 'Poppins', sans-serif;
                                box-sizing: border-box;
                                background: white;
                                transition: all 0.3s ease;
                            "
                            onfocus="this.style.borderColor='#667eea'; this.style.boxShadow='0 0 0 3px rgba(102, 126, 234, 0.1)';"
                            onblur="this.style.borderColor='#e1e5e9'; this.style.boxShadow='none';">
                        <option value="all">All Notifications</option>
                        <option value="important">Important Only</option>
                        <option value="weekly">Weekly Summary</option>
                        <option value="monthly">Monthly Updates</option>
                        <option value="none">No Notifications</option>
                    </select>
                </div>

                <!-- Privacy Settings -->
                <div class="form-group">
                    <label style="
                        display: block;
                        margin-bottom: 12px;
                        font-weight: 600;
                        color: #333;
                        font-size: 0.95rem;
                    ">
                        <i class="fas fa-shield-alt" style="margin-right: 8px; color: #667eea;"></i>
                        Privacy Settings
                    </label>
                    <div style="display: flex; flex-direction: column; gap: 10px;">
                        <label style="display: flex; align-items: center; font-weight: normal; cursor: pointer;">
                            <input type="checkbox" id="emailMarketing" name="emailMarketing" 
                                   style="margin-right: 10px; transform: scale(1.2);">
                            <span>Receive marketing emails</span>
                        </label>
                        <label style="display: flex; align-items: center; font-weight: normal; cursor: pointer;">
                            <input type="checkbox" id="dataSharing" name="dataSharing" 
                                   style="margin-right: 10px; transform: scale(1.2);">
                            <span>Share data with trusted partners</span>
                        </label>
                        <label style="display: flex; align-items: center; font-weight: normal; cursor: pointer;">
                            <input type="checkbox" id="profileVisibility" name="profileVisibility" checked
                                   style="margin-right: 10px; transform: scale(1.2);">
                            <span>Make profile visible to lenders</span>
                        </label>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div style="display: flex; gap: 15px; margin-top: 30px; justify-content: flex-end;">
                    <button type="button" id="cancelEditProfile" style="
                        padding: 12px 25px;
                        background: #f8f9fa;
                        color: #666;
                        border: 2px solid #e1e5e9;
                        border-radius: 8px;
                        cursor: pointer;
                        font-size: 1rem;
                        font-family: 'Poppins', sans-serif;
                        font-weight: 600;
                        transition: all 0.3s ease;
                        min-width: 120px;
                    " onmouseover="this.style.background='#e9ecef'; this.style.borderColor='#adb5bd';"
                       onmouseout="this.style.background='#f8f9fa'; this.style.borderColor='#e1e5e9';">
                        Cancel
                    </button>
                    <button type="submit" id="saveProfileBtn" style="
                        padding: 12px 25px;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        border: none;
                        border-radius: 8px;
                        cursor: pointer;
                        font-size: 1rem;
                        font-family: 'Poppins', sans-serif;
                        font-weight: 600;
                        transition: all 0.3s ease;
                        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
                        min-width: 120px;
                    " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(102, 126, 234, 0.6)';"
                       onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(102, 126, 234, 0.4)';">
                        <i class="fas fa-save" style="margin-right: 8px;"></i>
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    `;

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideUp {
            from { transform: translateY(50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        .edit-profile-modal:hover #profile-picture-container .upload-overlay {
            opacity: 1;
        }
        
        .edit-profile-modal input:invalid {
            border-color: #dc3545 !important;
        }
        
        .edit-profile-modal input:valid {
            border-color: #28a745 !important;
        }
    `;
    document.head.appendChild(style);

    // Append modal to body
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Load current user data
    loadUserData();

    // Event listeners
    setupEventListeners(modal);

    // Focus on first input
    setTimeout(() => {
        document.getElementById('fullName').focus();
    }, 300);
}

function getFirstLetter() {
    const userDisplayName = document.getElementById('user-display-name');
    const userName = document.getElementById('user-name');
    
    if (userDisplayName && userDisplayName.textContent.trim()) {
        return userDisplayName.textContent.charAt(0).toUpperCase();
    } else if (userName && userName.textContent.trim()) {
        return userName.textContent.charAt(0).toUpperCase();
    }
    return 'U';
}

function loadUserData() {
    // Get user data from existing DOM elements or localStorage
    const userDisplayName = document.getElementById('user-display-name');
    const userEmail = document.getElementById('user-email');
    
    // Populate form fields
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const dobInput = document.getElementById('dateOfBirth');
    const addressInput = document.getElementById('address');
    const notificationInput = document.getElementById('notificationPreferences');
    
    // Load saved data or use defaults
    const savedData = JSON.parse(localStorage.getItem('userProfileData') || '{}');
    
    if (fullNameInput) {
        fullNameInput.value = savedData.fullName || userDisplayName?.textContent || '';
    }
    
    if (emailInput) {
        emailInput.value = savedData.email || userEmail?.textContent || '';
    }
    
    if (phoneInput) {
        phoneInput.value = savedData.phone || '';
    }
    
    if (dobInput) {
        dobInput.value = savedData.dateOfBirth || '';
    }
    
    if (addressInput) {
        addressInput.value = savedData.address || '';
    }
    
    if (notificationInput) {
        notificationInput.value = savedData.notificationPreferences || 'all';
    }
    
    // Load checkbox states
    const emailMarketingCheckbox = document.getElementById('emailMarketing');
    const dataSharingCheckbox = document.getElementById('dataSharing');
    const profileVisibilityCheckbox = document.getElementById('profileVisibility');
    
    if (emailMarketingCheckbox) {
        emailMarketingCheckbox.checked = savedData.emailMarketing || false;
    }
    
    if (dataSharingCheckbox) {
        dataSharingCheckbox.checked = savedData.dataSharing || false;
    }
    
    if (profileVisibilityCheckbox) {
        profileVisibilityCheckbox.checked = savedData.profileVisibility !== false; // Default to true
    }
}

function setupEventListeners(modal) {
    // Close button handlers
    const closeBtn = document.getElementById('closeEditProfile');
    const cancelBtn = document.getElementById('cancelEditProfile');
    
    closeBtn.addEventListener('click', () => closeModal(modal));
    cancelBtn.addEventListener('click', () => closeModal(modal));
    
    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
    
    // Close on Escape key
    const escapeHandler = (e) => {
        if (e.key === 'Escape') {
            closeModal(modal);
        }
    };
    document.addEventListener('keydown', escapeHandler);
    
    // Store escape handler for cleanup
    modal._escapeHandler = escapeHandler;
    
    // Profile picture upload handler
    const profilePictureInput = document.getElementById('profilePictureInput');
    profilePictureInput.addEventListener('change', handleProfilePictureUpload);
    
    // Form submission handler
    const form = document.getElementById('editProfileForm');
    form.addEventListener('submit', handleFormSubmission);
    
    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', formatPhoneNumber);
    
    // Real-time validation
    const requiredInputs = form.querySelectorAll('input[required]');
    requiredInputs.forEach(input => {
        input.addEventListener('blur', validateInput);
        input.addEventListener('input', clearValidationError);
    });
}

function closeModal(modal) {
    // Remove escape key listener
    if (modal._escapeHandler) {
        document.removeEventListener('keydown', modal._escapeHandler);
    }
    
    // Animate out
    modal.style.animation = 'fadeOut 0.3s ease';
    
    setTimeout(() => {
        modal.remove();
    }, 300);
}

function handleProfilePictureUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
        alert('Please select an image file.');
        return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB.');
        return;
    }
    
    // Create file reader
    const reader = new FileReader();
    reader.onload = (e) => {
        const profileContainer = document.getElementById('profile-picture-container');
        profileContainer.style.backgroundImage = `url(${e.target.result})`;
        profileContainer.style.backgroundSize = 'cover';
        profileContainer.style.backgroundPosition = 'center';
        profileContainer.querySelector('#profile-initial').style.display = 'none';
        
        // Save to localStorage for persistence
        localStorage.setItem('userProfilePicture', e.target.result);
    };
    
    reader.readAsDataURL(file);
}

function formatPhoneNumber(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length >= 6) {
        value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
    } else if (value.length >= 3) {
        value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
    }
    
    e.target.value = value;
}

function validateInput(e) {
    const input = e.target;
    const value = input.value.trim();
    
    // Remove existing error styling
    input.style.borderColor = '#e1e5e9';
    
    let isValid = true;
    let errorMessage = '';
    
    if (input.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required.';
    } else if (input.type === 'email' && value && !isValidEmail(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address.';
    } else if (input.type === 'tel' && value && !isValidPhone(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid phone number.';
    }
    
    if (!isValid) {
        input.style.borderColor = '#dc3545';
        showFieldError(input, errorMessage);
    } else {
        input.style.borderColor = '#28a745';
        clearFieldError(input);
    }
    
    return isValid;
}

function clearValidationError(e) {
    const input = e.target;
    input.style.borderColor = '#e1e5e9';
    clearFieldError(input);
}

function showFieldError(input, message) {
    // Remove existing error message
    clearFieldError(input);
    
    const errorElement = document.createElement('small');
    errorElement.className = 'field-error';
    errorElement.style.cssText = `
        color: #dc3545;
        font-size: 0.85rem;
        margin-top: 5px;
        display: block;
    `;
    errorElement.textContent = message;
    
    input.parentNode.appendChild(errorElement);
}

function clearFieldError(input) {
    const existingError = input.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^\(\d{3}\)\s\d{3}-\d{4}$/;
    return phoneRegex.test(phone);
}

function handleFormSubmission(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('saveProfileBtn');
    const originalText = submitBtn.innerHTML;
    
    // Validate all required fields
    const form = e.target;
    const requiredInputs = form.querySelectorAll('input[required]');
    let isFormValid = true;
    
    requiredInputs.forEach(input => {
        if (!validateInput({ target: input })) {
            isFormValid = false;
        }
    });
    
    if (!isFormValid) {
        // Scroll to first error
        const firstError = form.querySelector('input[style*="border-color: rgb(220, 53, 69)"]');
        if (firstError) {
            firstError.focus();
        }
        return;
    }
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin" style="margin-right: 8px;"></i>Saving...';
    submitBtn.disabled = true;
    
    // Collect form data
    const formData = new FormData(form);
    const profileData = {
        fullName: formData.get('fullName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        dateOfBirth: formData.get('dateOfBirth'),
        address: formData.get('address'),
        notificationPreferences: formData.get('notificationPreferences'),
        emailMarketing: formData.has('emailMarketing'),
        dataSharing: formData.has('dataSharing'),
        profileVisibility: formData.has('profileVisibility'),
        lastUpdated: new Date().toISOString()
    };
    
    // Simulate API call
    setTimeout(() => {
        try {
            // Save to localStorage
            localStorage.setItem('userProfileData', JSON.stringify(profileData));
            
            // Update UI elements
            updateUIElements(profileData);
            
            // Show success message
            showSuccessMessage();
            
            // Close modal
            const modal = document.querySelector('.modal-overlay');
            closeModal(modal);
            
        } catch (error) {
            console.error('Error saving profile:', error);
            alert('Error updating profile. Please try again.');
        } finally {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }, 1500);
}

function updateUIElements(profileData) {
    // Update display name elements
    const userDisplayName = document.getElementById('user-display-name');
    const userNameElements = document.querySelectorAll('#user-name');
    const welcomeUser = document.getElementById('welcome-user');
    const welcomeMsg = document.querySelector('.welcome-message');
    
    if (userDisplayName) {
        userDisplayName.textContent = profileData.fullName;
    }
    
    userNameElements.forEach(element => {
        element.textContent = profileData.fullName;
    });
    
    if (welcomeUser) {
        welcomeUser.textContent = profileData.fullName;
    }
    
    if (welcomeMsg) {
        welcomeMsg.textContent = `Welcome back, ${profileData.fullName}!`;
    }
    
    // Update avatar initials
    const firstLetter = profileData.fullName.charAt(0).toUpperCase();
    const userAvatarElements = document.querySelectorAll('#user-avatar');
    const userAvatarLarge = document.getElementById('user-avatar-large');
    
    userAvatarElements.forEach(element => {
        element.textContent = firstLetter;
    });
    
    if (userAvatarLarge) {
        userAvatarLarge.textContent = firstLetter;
    }
    
    // Update profile picture if saved
    const savedProfilePicture = localStorage.getItem('userProfilePicture');
    if (savedProfilePicture && userAvatarLarge) {
        userAvatarLarge.style.backgroundImage = `url(${savedProfilePicture})`;
        userAvatarLarge.style.backgroundSize = 'cover';
        userAvatarLarge.style.backgroundPosition = 'center';
        userAvatarLarge.textContent = '';
    }
}

function showSuccessMessage() {
    // Create success notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(40, 167, 69, 0.4);
        z-index: 10001;
        font-family: 'Poppins', sans-serif;
        font-weight: 600;
        animation: slideInRight 0.3s ease;
    `;
    
    notification.innerHTML = `
        <i class="fas fa-check-circle" style="margin-right: 10px;"></i>
        Profile updated successfully!
    `;
    
    // Add slide-in animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
            style.remove();
        }, 300);
    }, 3000);
}

// Export function for use in other files
if (typeof window !== 'undefined') {
    window.showEditProfileModal = showEditProfileModal;
}

// For ES6 modules
export { showEditProfileModal };
