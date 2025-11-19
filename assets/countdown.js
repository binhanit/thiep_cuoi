// Countdown Timer
// Set your wedding date here (YYYY, MM-1, DD, HH, MM, SS)
// Note: Month is 0-indexed (0 = January, 11 = December)
// November 29, 2025 at 11:00 AM
const weddingDate = new Date(2025, 10, 30, 11, 0, 0).getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    // Calculate time units
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update DOM elements
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    if (daysElement) daysElement.textContent = formatNumber(days);
    if (hoursElement) hoursElement.textContent = formatNumber(hours);
    if (minutesElement) minutesElement.textContent = formatNumber(minutes);
    if (secondsElement) secondsElement.textContent = formatNumber(seconds);

    // Check if countdown is finished
    if (distance < 0) {
        clearInterval(countdownInterval);
        if (daysElement) daysElement.textContent = '00';
        if (hoursElement) hoursElement.textContent = '00';
        if (minutesElement) minutesElement.textContent = '00';
        if (secondsElement) secondsElement.textContent = '00';

        // Optional: Show a message when the wedding day arrives
        showWeddingDayMessage();
    }
}

// Format numbers to always show 2 digits
function formatNumber(num) {
    return num < 10 ? '0' + num : num;
}

// Optional: Show celebration message when wedding day arrives
function showWeddingDayMessage() {
    const countdownSection = document.querySelector('.countdown-section');
    if (countdownSection) {
        const message = document.createElement('div');
        message.className = 'wedding-day-message';
        message.style.cssText = `
            text-align: center;
            font-size: 2rem;
            color: var(--accent-gold);
            font-family: var(--font-heading);
            margin-top: 2rem;
            animation: bounceIn 1s ease;
        `;
        message.innerHTML = `
            <i class="fas fa-heart" style="color: var(--accent-pink); font-size: 3rem;"></i>
            <p>Hôm nay là ngày trọng đại của chúng tôi!</p>
            <p style="font-size: 1.5rem; margin-top: 1rem;">🎉 Chúc mừng hạnh phúc! 🎉</p>
        `;

        const countdown = document.getElementById('countdown');
        if (countdown) {
            countdown.style.opacity = '0.3';
            countdown.parentElement.appendChild(message);
        }
    }
}

// Add number animation effect
function animateNumber(element, newValue) {
    const currentValue = parseInt(element.textContent);
    if (currentValue !== newValue && !isNaN(currentValue)) {
        element.style.transform = 'scale(1.1)';
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 200);
    }
}

// Enhanced update with animation
function updateCountdownWithAnimation() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    if (daysElement) {
        animateNumber(daysElement, days);
        daysElement.textContent = formatNumber(days);
    }
    if (hoursElement) {
        animateNumber(hoursElement, hours);
        hoursElement.textContent = formatNumber(hours);
    }
    if (minutesElement) {
        animateNumber(minutesElement, minutes);
        minutesElement.textContent = formatNumber(minutes);
    }
    if (secondsElement) {
        animateNumber(secondsElement, seconds);
        secondsElement.textContent = formatNumber(seconds);
    }

    if (distance < 0) {
        clearInterval(countdownInterval);
        showWeddingDayMessage();
    }
}

// Add transition style to countdown numbers
function initCountdownStyles() {
    const countdownNumbers = document.querySelectorAll('.countdown-number');
    countdownNumbers.forEach(number => {
        number.style.transition = 'transform 0.2s ease';
    });
}

// Initialize countdown
let countdownInterval;

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        initCountdownStyles();
        updateCountdownWithAnimation();
        countdownInterval = setInterval(updateCountdownWithAnimation, 1000);
    });
} else {
    initCountdownStyles();
    updateCountdownWithAnimation();
    countdownInterval = setInterval(updateCountdownWithAnimation, 1000);
}

// Export for use in other scripts if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { updateCountdown, weddingDate };
}
