// RSVP Form with Google Sheets Integration

/*
 * SETUP INSTRUCTIONS:
 *
 * 1. Create a Google Sheet with the following columns:
 *    Timestamp | Name | Attendance | Guest Count | Is Vegetarian | Want Matchmaking | Gender | Social Link | Message
 *
 * 2. Go to Extensions > Apps Script
 *
 * 3. Delete any existing code and paste this:
 *
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      new Date(),
      data.name,
      data.attendance,
      data.guestCount,
      data.isVegetarian,
      data.wantMatchmaking,
      data.gender,
      data.socialLink,
      data.message
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success', message: 'Cảm ơn bạn đã xác nhận!' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
 *
 * 4. Click Deploy > New Deployment
 * 5. Select "Web app" as type
 * 6. Set "Execute as" to "Me"
 * 7. Set "Who has access" to "Anyone"
 * 8. Click Deploy and copy the Web App URL
 * 9. Paste the URL in GOOGLE_SCRIPT_URL below
 */

// IMPORTANT: Replace this with your Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwR4jEGFdS7mdV2UN8WPnaXpgvh5CpR0Z7rcfUT0q8ACAH6RQCMvlVn-qGcnXO6dAjqpA/exec';

// Form elements
let form, submitBtn, formStatus, wantMatchmakingCheckbox, matchmakingFields;

// Initialize RSVP form
function initRSVP() {
    form = document.getElementById('rsvpForm');
    submitBtn = document.getElementById('submitBtn');
    formStatus = document.getElementById('formStatus');
    wantMatchmakingCheckbox = document.getElementById('wantMatchmaking');
    matchmakingFields = document.getElementById('matchmakingFields');

    if (form) {
        form.addEventListener('submit', handleSubmit);
    }

    // Add matchmaking toggle functionality
    if (wantMatchmakingCheckbox && matchmakingFields) {
        wantMatchmakingCheckbox.addEventListener('change', toggleMatchmakingFields);
    }

    // Add input validation
    addInputValidation();

    // Prefill name from query/session if provided
    prefillGuestNameFromContext();
}

// Toggle matchmaking fields visibility
function toggleMatchmakingFields() {
    if (wantMatchmakingCheckbox.checked) {
        matchmakingFields.style.display = 'block';
        // Make fields required when visible
        document.getElementById('gender').setAttribute('required', 'required');
    } else {
        matchmakingFields.style.display = 'none';
        // Remove required attribute when hidden
        document.getElementById('gender').removeAttribute('required');
        // Clear values
        document.getElementById('gender').value = '';
        document.getElementById('socialLink').value = '';
    }
}

// Handle form submission
async function handleSubmit(e) {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
        return;
    }

    // Get form data
    const formData = {
        name: document.getElementById('guestName').value.trim(),
        attendance: document.getElementById('attendance').value,
        guestCount: document.getElementById('guestCount').value || '1',
        isVegetarian: document.getElementById('isVegetarian').checked ? 'Có' : 'Không',
        wantMatchmaking: document.getElementById('wantMatchmaking').checked ? 'Có' : 'Không',
        gender: document.getElementById('wantMatchmaking').checked ? document.getElementById('gender').value : '',
        socialLink: document.getElementById('wantMatchmaking').checked ? document.getElementById('socialLink').value.trim() : '',
        message: document.getElementById('message').value.trim()
    };

    // Show loading state
    setLoadingState(true);

    try {
        // Check if Google Script URL is configured
        if (GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_SCRIPT_URL_HERE') {
            // Fallback: Show success message without actually sending
            console.warn('Google Script URL not configured. Form data:', formData);
            showStatus('success', 'Cảm ơn bạn đã xác nhận tham dự! (Demo mode - dữ liệu chưa được lưu)');
            form.reset();
            setLoadingState(false);
            return;
        }

        // Send data to Google Sheets
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // Required for Google Apps Script
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        // Note: With no-cors mode, we can't read the response
        // If the request completes without error, assume success
        showStatus('success', 'Cảm ơn bạn đã xác nhận tham dự! Chúng tôi rất mong được gặp bạn.');
        form.reset();

        // Optional: Track with analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'rsvp_submit', {
                'event_category': 'engagement',
                'event_label': formData.attendance
            });
        }

    } catch (error) {
        console.error('Error submitting form:', error);
        showStatus('error', 'Có lỗi xảy ra. Vui lòng thử lại hoặc liên hệ trực tiếp với chúng tôi.');
    } finally {
        setLoadingState(false);
    }
}

// Validate form inputs
function validateForm() {
    const name = document.getElementById('guestName').value.trim();
    const attendance = document.getElementById('attendance').value;

    if (!name) {
        showStatus('error', 'Vui lòng nhập họ và tên của bạn.');
        document.getElementById('guestName').focus();
        return false;
    }

    if (!attendance) {
        showStatus('error', 'Vui lòng chọn tình trạng tham dự.');
        document.getElementById('attendance').focus();
        return false;
    }

    // Validate matchmaking fields if checkbox is checked
    const wantMatchmaking = document.getElementById('wantMatchmaking').checked;
    if (wantMatchmaking) {
        const gender = document.getElementById('gender').value;
        if (!gender) {
            showStatus('error', 'Vui lòng chọn giới tính để tham gia "Tìm người yêu".');
            document.getElementById('gender').focus();
            return false;
        }

        const socialLink = document.getElementById('socialLink').value.trim();
        if (socialLink && !isValidURL(socialLink)) {
            showStatus('error', 'Link mạng xã hội không hợp lệ.');
            document.getElementById('socialLink').focus();
            return false;
        }
    }

    return true;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// URL validation
function isValidURL(url) {
    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
}

// Show status message
function showStatus(type, message) {
    if (!formStatus) return;

    formStatus.className = `form-status ${type}`;
    formStatus.textContent = message;
    formStatus.style.display = 'block';

    // Auto-hide after 5 seconds for success messages
    if (type === 'success') {
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 5000);
    }
}

// Set loading state
function setLoadingState(isLoading) {
    if (!submitBtn) return;

    if (isLoading) {
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang gửi...';
    } else {
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Gửi Xác Nhận';
    }
}

// Add real-time input validation
function addInputValidation() {
    const socialLinkInput = document.getElementById('socialLink');

    if (socialLinkInput) {
        socialLinkInput.addEventListener('blur', function() {
            const value = this.value.trim();
            if (value && !isValidURL(value)) {
                this.style.borderColor = '#dc3545';
                showStatus('error', 'Link mạng xã hội không hợp lệ. Vui lòng bắt đầu với http:// hoặc https://');
            } else {
                this.style.borderColor = '';
                if (formStatus && formStatus.classList.contains('error')) {
                    formStatus.style.display = 'none';
                }
            }
        });
    }

    // Clear error on input
    const allInputs = form.querySelectorAll('input, select, textarea');
    allInputs.forEach(input => {
        input.addEventListener('input', function() {
            if (formStatus && formStatus.classList.contains('error')) {
                formStatus.style.display = 'none';
            }
            this.style.borderColor = '';
        });
    });
}

// Auto-save form data to localStorage (optional)
function saveFormData() {
    const formData = {
        name: document.getElementById('guestName')?.value || '',
    };
    localStorage.setItem('weddingRSVPData', JSON.stringify(formData));
}

// Restore form data from localStorage (optional)
function restoreFormData() {
    const savedData = localStorage.getItem('weddingRSVPData');
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            if (document.getElementById('guestName')) {
                document.getElementById('guestName').value = data.name || '';
            }
        } catch (e) {
            console.error('Error restoring form data:', e);
        }
    }
}

// Clear saved form data after successful submission
function clearSavedFormData() {
    localStorage.removeItem('weddingRSVPData');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        initRSVP();
        // Uncomment if you want to restore saved form data
        // restoreFormData();
    });
} else {
    initRSVP();
    // Uncomment if you want to restore saved form data
    // restoreFormData();
}

// Export for use in other scripts if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        handleSubmit,
        validateForm
    };
}

// Helpers: query/session fullName
function getQueryParam(name) {
    const params = new URLSearchParams(window.location.search);
    const value = params.get(name);
    return value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
}

function getFullNameFromContext() {
    // First check query params
    const fromQuery = getQueryParam('fullName');
    if (fromQuery) {
        // Save to session storage if from query params
        try {
            sessionStorage.setItem('fullName', fromQuery);
            sessionStorage.setItem('fullNameFromQuery', 'true');
        } catch (e) {
            // Ignore storage errors
        }
        return fromQuery;
    }
    
    // Then check session storage (which may have been set from index.html)
    try {
        const fromStorage = sessionStorage.getItem('fullName');
        if (fromStorage) return fromStorage;
    } catch (e) {
        // Ignore storage errors
    }
    
    // Return null if no custom value, so form can remain empty or use default
    return null;
}

function prefillGuestNameFromContext() {
    const input = document.getElementById('guestName');
    if (!input) return;
    if (input.value && input.value.trim().length > 0) return;

    const fullName = getFullNameFromContext();
    if (fullName) {
        input.value = fullName;
    }
}
