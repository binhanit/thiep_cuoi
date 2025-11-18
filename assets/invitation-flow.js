// Invitation Flow Controller

// Elements
const loadingScreen = document.getElementById('loadingScreen');
const invitationCover = document.getElementById('invitationCover');
const invitationOpened = document.getElementById('invitationOpened');
const envelope = document.getElementById('envelope');
const envelopeContainer = document.getElementById('envelopeContainer');
const confirmBtn = document.getElementById('confirmBtn');
const weddingInfoBtn = document.getElementById('weddingInfoBtn');

// Query param helpers
function getQueryParam(name) {
    const params = new URLSearchParams(window.location.search);
    const value = params.get(name);
    return value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
}

function getFullNameFromContext() {
    const fromQuery = getQueryParam('fullName');
    if (fromQuery) return fromQuery;
    try {
        const fromStorage = sessionStorage.getItem('fullName');
        if (fromStorage) return fromStorage;
    } catch (e) {
        // Ignore storage errors
    }
    
    // Return null if no custom value, so we can use the default translation
    return null;
}

function persistFullName(fullName) {
    try {
        if (fullName) sessionStorage.setItem('fullName', fullName);
    } catch (e) {
        // Ignore storage errors
    }
}

// Initialize
function init() {
    // Handle fullName from query params on index.html
    // This should run first before other initialization
    handleFullNameFromQueryParams();

    // Simulate loading
    setTimeout(() => {
        hideLoading();
    }, 2000);

    // Event listeners
    if (envelope) {
        envelope.addEventListener('click', openInvitation);
    }

    if (confirmBtn) {
        confirmBtn.addEventListener('click', () => {
            showMainContent();
            // Scroll to RSVP section after a short delay
            setTimeout(() => {
                const rsvpSection = document.getElementById('rsvp');
                if (rsvpSection) {
                    rsvpSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 300);
        });
    }

    if (weddingInfoBtn) {
        weddingInfoBtn.addEventListener('click', () => {
            showMainContent();
            // Scroll to top of main content
            setTimeout(() => {
                const mainContent = document.getElementById('mainContent');
                if (mainContent) {
                    mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 300);
        });
    }

    // Handle fullName personalization in the cover letter
    const fullName = getFullNameFromContext();
    const guestLine = document.querySelector('.guest-name');
    
    if (guestLine) {
        if (fullName) {
            // Custom fullName provided - replace content and remove i18n attribute
            persistFullName(fullName);
            guestLine.removeAttribute('data-i18n');
            guestLine.textContent = fullName;
        } else {
            // No custom fullName - use translation system
            // The element already has data-i18n="guestName" in HTML
            // The translation system will handle it automatically
        }
    }
}

// Handle fullName from query params
function handleFullNameFromQueryParams() {
    try {
        const fullNameFromQuery = getQueryParam('fullName');
        
        if (fullNameFromQuery) {
            // fullName exists in query params - save to session storage
            sessionStorage.setItem('fullName', fullNameFromQuery);
            sessionStorage.setItem('fullNameFromQuery', 'true');
        } else {
            // No fullName in query params - clear session storage
            sessionStorage.removeItem('fullName');
            sessionStorage.removeItem('fullNameFromQuery');
        }
    } catch (e) {
        // Ignore storage errors
        console.error('Error handling fullName from query params:', e);
    }
}

// Hide loading screen
function hideLoading() {
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            showCover();
        }, 500);
    }
}

// Show invitation cover
function showCover() {
    if (invitationCover) {
        invitationCover.classList.add('active');
    }
}

// Show main content (all sections)
function showMainContent() {
    const mainContent = document.getElementById('mainContent');
    if (mainContent) {
        mainContent.style.display = 'block';
        invitationOpened.style.display = 'none';
    }
}

// Open invitation (reveal two sides)
function openInvitation() {
    if (invitationCover && invitationOpened && envelope) {
        // Prevent multiple clicks
        envelope.style.pointerEvents = 'none';

        // Stop the bouncing animation
        if (envelopeContainer) {
            envelopeContainer.style.animation = 'none';
        }

        // Add clicked class to trigger envelope opening animation
        envelope.classList.add('clicked');

        // Start fading out the cover
        setTimeout(() => {
            invitationCover.classList.add('opening');
        }, 800);

        // Show the opened invitation with card reveal animation
        setTimeout(() => {
            invitationCover.style.display = 'none';
            invitationOpened.classList.add('active');

            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 2000);
    }
}

// Check if coming back from main website
function checkNavigation() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('skip') === 'true') {
        // Skip directly to opened invitation
        if (loadingScreen) loadingScreen.style.display = 'none';
        if (invitationCover) invitationCover.style.display = 'none';
        if (invitationOpened) {
            invitationOpened.style.display = 'block';
            invitationOpened.classList.add('active');
        }
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        init();
        checkNavigation();
    });
} else {
    init();
    checkNavigation();
}

// Add keyboard support
document.addEventListener('keydown', (e) => {
    // Press Enter or Space on cover to open
    if ((e.key === 'Enter' || e.key === ' ') && invitationCover && invitationCover.classList.contains('active')) {
        if (invitationOpened && !invitationOpened.classList.contains('active') && envelope) {
            e.preventDefault();
            openInvitation();
        }
    }
});

// Add touch support for mobile: first tap preview, second tap open
if (envelope) {
    let touchPreviewShown = false;
    let previewTimeoutId = null;

    const clearPreview = () => {
        envelope.classList.remove('touch-preview');
        touchPreviewShown = false;
        if (previewTimeoutId) {
            clearTimeout(previewTimeoutId);
            previewTimeoutId = null;
        }
    };

    // Use touchend to avoid ghost click double-trigger
    envelope.addEventListener('touchend', function(e) {
        if (invitationOpened && !invitationOpened.classList.contains('active')) {
            e.preventDefault();

            // If envelope already opening/opened, ignore
            if (envelope.classList.contains('clicked')) return;

            if (!touchPreviewShown) {
                envelope.classList.add('touch-preview');
                touchPreviewShown = true;
                previewTimeoutId = setTimeout(clearPreview, 10000);
            } else {
                clearPreview();
                openInvitation();
            }
        }
    }, { passive: false });

    // Tapping outside cancels preview
    document.addEventListener('touchstart', function(e) {
        if (!envelope.contains(e.target)) {
            clearPreview();
        }
    }, { passive: true });
}
