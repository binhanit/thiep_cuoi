// Main JavaScript - Core Functionality

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // Optionally unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with animate-on-scroll class
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(element => observer.observe(element));
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Skip if href is just "#"
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();

                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Add scroll progress indicator
function addScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(to right, #df9fa0, #9a7949);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Add "back to top" button
function addBackToTop() {
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 100px;
        left: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--accent-gold);
        color: white;
        border: none;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        font-size: 1.2rem;
    `;
    document.body.appendChild(backToTop);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });

    // Scroll to top on click
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Hover effect
    backToTop.addEventListener('mouseenter', () => {
        backToTop.style.background = 'var(--accent-pink)';
        backToTop.style.transform = 'translateY(-5px)';
    });

    backToTop.addEventListener('mouseleave', () => {
        backToTop.style.background = 'var(--accent-gold)';
        backToTop.style.transform = 'translateY(0)';
    });
}

// Add parallax effect to hero section
function addParallaxEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        hero.style.backgroundPositionY = -(scrolled * parallaxSpeed) + 'px';
    });
}

// Add loading screen
function addLoadingScreen() {
    const loader = document.createElement('div');
    loader.className = 'loading-screen';
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--primary-cream);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 99999;
        transition: opacity 0.5s ease, visibility 0.5s ease;
    `;
    loader.innerHTML = `
        <div style="text-align: center;">
            <i class="fas fa-heart" style="
                font-size: 4rem;
                color: var(--accent-pink);
                animation: heartbeat 1.5s infinite;
            "></i>
            <p style="
                margin-top: 1rem;
                font-family: var(--font-heading);
                font-size: 1.5rem;
                color: var(--accent-gold);
            ">Đang tải...</p>
        </div>
    `;
    document.body.appendChild(loader);

    // Hide loader when page is loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
            setTimeout(() => loader.remove(), 500);
        }, 500);
    });
}

// Add lazy loading for background images
function lazyLoadBackgrounds() {
    const lazyBackgrounds = document.querySelectorAll('[data-bg]');

    if ('IntersectionObserver' in window) {
        const bgObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    element.style.backgroundImage = `url('${element.dataset.bg}')`;
                    element.removeAttribute('data-bg');
                    bgObserver.unobserve(element);
                }
            });
        });

        lazyBackgrounds.forEach(bg => bgObserver.observe(bg));
    } else {
        // Fallback for older browsers
        lazyBackgrounds.forEach(bg => {
            bg.style.backgroundImage = `url('${bg.dataset.bg}')`;
        });
    }
}

// Add cursor effect (optional - can be heavy on performance)
function addCursorEffect() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        width: 20px;
        height: 20px;
        border: 2px solid var(--accent-gold);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.2s ease;
        display: none;
    `;
    document.body.appendChild(cursor);

    // Only show on desktop
    if (window.innerWidth > 768) {
        cursor.style.display = 'block';

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
        });

        // Scale up on clickable elements
        document.querySelectorAll('a, button, .gallery-item').forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
                cursor.style.borderColor = 'var(--accent-pink)';
            });
            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.borderColor = 'var(--accent-gold)';
            });
        });
    }
}

// Handle responsive images
function handleResponsiveImages() {
    const images = document.querySelectorAll('img[data-src-mobile][data-src-desktop]');

    function loadResponsiveImage(img) {
        const isMobile = window.innerWidth <= 768;
        const src = isMobile ? img.dataset.srcMobile : img.dataset.srcDesktop;
        if (img.src !== src) {
            img.src = src;
        }
    }

    images.forEach(loadResponsiveImage);

    // Reload on resize (debounced)
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            images.forEach(loadResponsiveImage);
        }, 250);
    });
}

// Add copy wedding info functionality
function addCopyWeddingInfo() {
    const venueAddress = document.querySelector('.venue-address');
    if (venueAddress) {
        venueAddress.style.cursor = 'pointer';
        venueAddress.title = 'Click để sao chép địa chỉ';

        venueAddress.addEventListener('click', () => {
            const text = venueAddress.textContent.trim();
            navigator.clipboard.writeText(text).then(() => {
                showToast('Đã sao chép địa chỉ!');
            }).catch(() => {
                showToast('Không thể sao chép. Vui lòng thử lại.');
            });
        });
    }
}

// Set Google Maps embed from venue address text
function setVenueMapEmbed() {
    const iframe = document.querySelector('.venue-map iframe');
    if (!iframe) {
        return;
    }

    const embedUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3925.025849858692!2d106.00475759999999!3d10.339816299999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310a9b145d5e68ab%3A0x74034030ff94f9e2!2zSOG6rXUgUGhhbg!5e0!3m2!1sen!2s!4v1763479419766!5m2!1sen!2s';

    iframe.setAttribute('src', embedUrl);
    iframe.setAttribute('width', '600');
    iframe.setAttribute('height', '450');
    iframe.setAttribute('style', 'border:0;');
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('loading', 'lazy');
    iframe.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
}

// Show toast notification
function showToast(message, duration = 3000) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(26, 26, 26, 0.9);
        color: white;
        padding: 1rem 2rem;
        border-radius: 50px;
        z-index: 10000;
        animation: slideInUp 0.3s ease;
        font-size: 0.9rem;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// Initialize analytics (if you're using Google Analytics)
function initAnalytics() {
    // Track section views
    const sections = document.querySelectorAll('section[id]');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && typeof gtag !== 'undefined') {
                gtag('event', 'section_view', {
                    'event_category': 'engagement',
                    'event_label': entry.target.id
                });
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => sectionObserver.observe(section));
}

// Add console message (Easter egg)
function addConsoleMessage() {
    const styles = [
        'color: #9a7949',
        'font-size: 20px',
        'font-weight: bold',
        'font-family: "Playfair Display", serif'
    ].join(';');
}

// Performance optimization - Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize all features
function init() {
    // Add loading screen
    // addLoadingScreen(); // Uncomment if you want loading screen

    // Core features
    initScrollAnimations();
    initSmoothScrolling();
    addScrollProgress();
    addBackToTop();

    // Visual effects
    addParallaxEffect();
    lazyLoadBackgrounds();

    // Utility features
    handleResponsiveImages();
    addCopyWeddingInfo();

    // Initialize venue map embed (after translations populate address)
    setTimeout(setVenueMapEmbed, 200);

    // Optional features (uncomment if needed)
    // addCursorEffect(); // May impact performance
    // initAnalytics(); // If you're using Google Analytics

    // Easter egg
    addConsoleMessage();
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('Page hidden');
    } else {
        console.log('Page visible');
    }
});

// Copy bank info to clipboard
function copyBankInfo(accountNumber) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(accountNumber).then(() => {
            showToast('✓ Đã sao chép số tài khoản: ' + accountNumber);
        }).catch(() => {
            fallbackCopyToClipboard(accountNumber);
        });
    } else {
        fallbackCopyToClipboard(accountNumber);
    }
}

// Fallback copy method for older browsers
function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.select();
    try {
        document.execCommand('copy');
        showToast('✓ Đã sao chép số tài khoản: ' + text);
    } catch (err) {
        showToast('❌ Không thể sao chép. Vui lòng thử lại.');
    }
    document.body.removeChild(textArea);
}

// Make function globally available
window.copyBankInfo = copyBankInfo;

// Export for use in other scripts if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showToast,
        debounce,
        copyBankInfo
    };
}
