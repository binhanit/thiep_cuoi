// Photo Gallery with Lightbox

// Gallery images from assets folder (images 1-20)
const galleryImages = [
    {
        url: 'assets/1.jpg',
        alt: 'Wedding Photo 1'
    },
    {
        url: 'assets/2.jpg',
        alt: 'Wedding Photo 2'
    },
    {
        url: 'assets/3.jpg',
        alt: 'Wedding Photo 3'
    },
    {
        url: 'assets/4.jpg',
        alt: 'Wedding Photo 4'
    },
    {
        url: 'assets/5.jpg',
        alt: 'Wedding Photo 5'
    },
    {
        url: 'assets/6.jpg',
        alt: 'Wedding Photo 6'
    },
    {
        url: 'assets/7.jpg',
        alt: 'Wedding Photo 7'
    },
    {
        url: 'assets/8.jpg',
        alt: 'Wedding Photo 8'
    },
    {
        url: 'assets/9.jpg',
        alt: 'Wedding Photo 9'
    },
    {
        url: 'assets/10.jpg',
        alt: 'Wedding Photo 10'
    },
    {
        url: 'assets/11.jpg',
        alt: 'Wedding Photo 11'
    },
    {
        url: 'assets/12.jpg',
        alt: 'Wedding Photo 12'
    },
    {
        url: 'assets/13.jpg',
        alt: 'Wedding Photo 13'
    },
    {
        url: 'assets/14.jpg',
        alt: 'Wedding Photo 14'
    },
    // {
    //     url: 'assets/15.jpg',
    //     alt: 'Wedding Photo 15'
    // },
    // {
    //     url: 'assets/16.jpg',
    //     alt: 'Wedding Photo 16'
    // },
    // {
    //     url: 'assets/17.jpg',
    //     alt: 'Wedding Photo 17'
    // },
    // {
    //     url: 'assets/18.jpg',
    //     alt: 'Wedding Photo 18'
    // },
    // {
    //     url: 'assets/19.jpg',
    //     alt: 'Wedding Photo 19'
    // },
    // {
    //     url: 'assets/20.jpg',
    //     alt: 'Wedding Photo 20'
    // }
];

let currentImageIndex = 0;

// Initialize gallery
function initGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;

    // Clear existing content
    galleryGrid.innerHTML = '';

    // Create gallery items
    galleryImages.forEach((image, index) => {
        const galleryItem = createGalleryItem(image, index);
        galleryGrid.appendChild(galleryItem);
    });

    // Initialize lightbox
    initLightbox();
}

// Create gallery item element
function createGalleryItem(image, index) {
    const item = document.createElement('div');
    item.className = 'gallery-item animate-on-scroll';
    item.setAttribute('data-index', index);

    const img = document.createElement('img');
    img.src = image.url;
    img.alt = image.alt;
    img.loading = 'lazy';

    const overlay = document.createElement('div');
    overlay.className = 'gallery-overlay';
    overlay.innerHTML = '<i class="fas fa-search-plus"></i>';

    item.appendChild(img);
    item.appendChild(overlay);

    // Add click event to open lightbox
    item.addEventListener('click', () => openLightbox(index));

    return item;
}

// Initialize lightbox functionality
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    if (!lightbox || !lightboxImg) return;

    // Close lightbox
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Previous image
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            showPreviousImage();
        });
    }

    // Next image
    if (lightboxNext) {
        lightboxNext.addEventListener('click', (e) => {
            e.stopPropagation();
            showNextImage();
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
}

// Open lightbox with specific image
function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');

    if (lightbox && lightboxImg) {
        lightboxImg.src = galleryImages[currentImageIndex].url;
        lightboxImg.alt = galleryImages[currentImageIndex].alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

// Close lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// Show previous image
function showPreviousImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightboxImage();
}

// Show next image
function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    updateLightboxImage();
}

// Update lightbox image
function updateLightboxImage() {
    const lightboxImg = document.getElementById('lightboxImg');
    if (lightboxImg) {
        // Add fade effect
        lightboxImg.style.opacity = '0';
        setTimeout(() => {
            lightboxImg.src = galleryImages[currentImageIndex].url;
            lightboxImg.alt = galleryImages[currentImageIndex].alt;
            lightboxImg.style.opacity = '1';
        }, 150);
    }
}

// Keyboard navigation
function handleKeyboardNavigation(e) {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox || !lightbox.classList.contains('active')) return;

    switch(e.key) {
        case 'Escape':
            closeLightbox();
            break;
        case 'ArrowLeft':
            showPreviousImage();
            break;
        case 'ArrowRight':
            showNextImage();
            break;
    }
}

// Lazy loading for images
function setupLazyLoading() {
    const images = document.querySelectorAll('.gallery-item img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

// Add smooth transition to lightbox image
function addLightboxTransition() {
    const lightboxImg = document.getElementById('lightboxImg');
    if (lightboxImg) {
        lightboxImg.style.transition = 'opacity 0.3s ease';
    }
}

// Add touch swipe support for mobile
function addTouchSupport() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    let touchStartX = 0;
    let touchEndX = 0;

    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    lightbox.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next image
                showNextImage();
            } else {
                // Swipe right - previous image
                showPreviousImage();
            }
        }
    }
}

// Initialize everything when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        initGallery();
        addLightboxTransition();
        addTouchSupport();
        setupLazyLoading();
    });
}

// Initialize only the trigger on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        setupGalleryTrigger();
    });
} else {
    setupGalleryTrigger();
}

// Export for use in other scripts if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        galleryImages,
        openLightbox,
        closeLightbox
    };
}
