// Language Switcher with i18n Support

// Translation data
const translations = {
    vi: {
        language: {
            vietnamese: "Tiếng Việt",
            english: "English"
        },
        guestName: "Quý Khách",
        names: {
            groom: "Công Hậu",
            bride: "Ngọc Thi",
            coupleNames: "Công Hậu & Ngọc Thi"
        },
        hero: {
            wedding: "Đám Cưới",
            date: "30 Tháng 11, 2025"
        },
        countdown: {
            title: "Đếm Ngược Đến Ngày Trọng Đại",
            days: "Ngày",
            hours: "Giờ",
            minutes: "Phút",
            seconds: "Giây"
        },
        couple: {
            title: "Cô Dâu & Chú Rể",
            groom: "Chú Rể",
            bride: "Cô Dâu",
            groomFather: "Con ông: Phan Văn Ri",
            groomMother: "Và bà: Phan Bạch Mai",
            brideFather: "Con ông: Nguyễn Văn Thiện",
            brideMother: "Và bà: Lưu Thị Mười"
        },
        timeline: {
            title: "Chuyện Tình Của Chúng Mình",
            firstMeet: {
                date: "Tháng",
                title: "Lần đầu gặp",
                description: "Gặp nhau trong"
            },
            firstDate: {
                date: "Tháng",
                title: "Chính thức hẹn hò",
                description: "Vài tuần sau, buổi hẹn đầu tiên diễn ra. Từ “đi chơi cho vui” dần thành “đi đâu cũng có nhau”."
            },
            proposal: {
                date: "Tháng",
                title: "Lời cầu hôn",
                description: ""
            },
            wedding: {
                date: "Tháng 11/2025",
                title: "Lễ cưới",
                description: "Sau bao lần chọn ngày, chọn váy, chọn nhẫn…, cuối cùng cũng đến ngày tụi mình chính thức về chung một nhà. Không cần hoàn hảo, chỉ cần là tụi mình."
            }
        },
        gallery: {
            title: "Album Ảnh Cưới"
        },
        venue: {
            title: "Địa Điểm Tổ Chức",
            restaurant: "",
            venueName: "TƯ GIA NHÀ TRAI",
            address: "Ấp Hòa Quý, Xã Hòa Khánh, Huyện Cái Bè, Tỉnh Tiền Giang",
            time: "13:00 - 30/11/2025",
            viewMap: "Xem Bản Đồ"
        },
        rsvp: {
            title: "Xác Nhận Tham Dự",
            subtitle: "Vui lòng cho chúng tôi biết bạn có thể tham dự không",
            nameLabel: "Họ và Tên",
            namePlaceholder: "Nhập họ và tên của bạn",
            attendanceLabel: "Xác nhận Tham Dự",
            attendanceSelect: "Chọn...",
            attendanceYes: "Sẽ tham dự",
            attendanceNo: "Không thể tham dự",
            attendanceMaybe: "Chưa chắc chắn",
            guestCountLabel: "Số Người Tham Dự",
            vegetarianLabel: "Tôi ăn chay",
            matchmakingLabel: "Tôi muốn tham gia \"Tìm người thương\"",
            genderLabel: "Tôi muốn tìm...",
            genderSelect: "Chọn giới tính",
            genderMale: "Nam",
            genderFemale: "Nữ",
            genderOther: "Khác",
            socialLinkLabel: "Link Mạng Xã Hội (Facebook, Instagram, Zalo...)",
            socialLinkPlaceholder: "https://facebook.com/yourprofile",
            socialLinkHint: "Chia sẻ link để chúng tôi có thể kết nối bạn với những người phù hợp",
            messageLabel: "Lời Nhắn",
            messagePlaceholder: "Gửi lời chúc đến cô dâu chú rể...",
            submitButton: "Gửi Xác Nhận"
        },
        gift: {
            title: "Hộp Mừng Cưới",
            subtitle: "Thay vì hoa và quà tặng, chúng tôi sẽ rất vui nếu nhận được lời chúc phúc từ quý khách",
            groom: "Chú Rể",
            bride: "Cô Dâu",
            bank: "Ngân hàng:",
            bankNameGroom: "VPBank",
            accountGroom: "186735439",
            accountHolderGroom: "PHAN CONG HAU",
            bankNameBride: "Vietcombank",
            accountBride: "1036060991",
            accountHolderBride: "PHAN CONG HAU",
            copyButton: "Sao chép STK",
            qrLabel: "Quét mã QR để chuyển khoản",
            note: "Sự hiện diện của quý khách là món quà ý nghĩa nhất với chúng tôi!"
        },
        footer: {
            thankYou: "Thank You",
            subtitle: "Cảm ơn bạn đã ghé thăm!"
        },
        invitation: {
            loading: "Đang tải thiệp mời...",
            respectfullyInvite: "Trân trọng kính mời",
            respectfullyInvite2: "Trân trọng kính mời Quý Khách đến dự hôn lễ của",
            toOurWedding: "đến hôn lễ của",
            clickHint: "Nhấp vào phong thư để mở thiệp mời",
            letterDate: "30.11.2025",
            cardTitle: "THIỆP MỜI ĐÁM CƯỚI",
            infoTitle: "THÔNG TIN ĐÁM CƯỚI",
            weddingDate: "Chủ Nhật, 30 Tháng 11, 2025",
            weddingTime: "13:00 Giờ",
            quote: '"Hạnh phúc không phải là điểm đến, mà là hành trình \n Và chúng tôi đã tìm thấy bạn đồng hành"',
            groomFamily: "Gia Đình Chú Rể",
            groomFather: "Ông: Phan Văn Ri",
            groomMother: "Bà: Phan Bạch Mai",
            groomSon: "Con trai: Phan Công Hậu",
            brideFamily: "Gia Đình Cô Dâu",
            brideFather: "Ông: Nguyễn Văn Thiện",
            brideMother: "Bà: Lưu Thị Mười",
            brideDaughter: "Con gái: Nguyễn Ngọc Thi",
            venueTitle: "Địa Điểm Tổ Chức",
            presenceMessage: "Cảm ơn sự hiện diện của bạn trong ngày trọng đại của chúng tôi. Sự có mặt của bạn là món quà ý nghĩa nhất.",
            confirmAttendance: "Xác Nhận Tham Dự",
            weddingInfo: "Thông Tin Đám Cưới"
        }
    },
    en: {
        language: {
            vietnamese: "Tiếng Việt",
            english: "English"
        },
        guestName: "Our Dear Guest(s)",
        names: {
            groom: "CONG HAU",
            bride: "NGOC THI",
            coupleNames: "CONG HAU & NGOC THI"
        },
        hero: {
            wedding: "Wedding",
            date: "November 30, 2025"
        },
        countdown: {
            title: "Countdown to Our Special Day",
            days: "Days",
            hours: "Hours",
            minutes: "Minutes",
            seconds: "Seconds"
        },
        couple: {
            title: "Bride & Groom",
            groom: "Groom",
            bride: "Bride",
            groomFather: "Son of: Mr. Phan Van Ri",
            groomMother: "And: Mrs. Phan Bach Mai",
            brideFather: "Daughter of: Mr. Nguyen Van Thien",
            brideMother: "And: Mrs. Luu Thi Muoi"
        },
        timeline: {
            title: "Our Love Story",
            firstMeet: {
                date: "October 2019",
                title: "First Meeting",
                description: "We met at a friends’ get-together. No one guessed a few polite hellos would begin such a long, lovely story."
            },
            firstDate: {
                date: "November 2019",
                title: "Officially Dating",
                description: "A few weeks later came our first date. What started as “just for fun” soon became “wherever we go, we go together.”"
            },
            proposal: {
                date: "August 2025",
                title: "The Proposal",
                description: "In Ninh Bình—amid golden rice fields, limestone peaks, and a carefree breeze—he knelt and offered the ring. No big speech, just the feeling: “It’s time.”"
            },
            wedding: {
                date: "November 2025",
                title: "The Wedding",
                description: "After countless choices—dates, dress, rings—at last we make it official and share one home. Not perfect, simply us."
            }
        },
        gallery: {
            title: "Wedding Gallery"
        },
        venue: {
            title: "Venue",
            restaurant: "",
            venueName: "TƯ GIA NHÀ TRAI",
            address: "Ấp Hòa Quý, Xã Hòa Khánh, Huyện Cái Bè, Tỉnh Tiền Giang",
            viewMap: "View Map"
        },
        rsvp: {
            title: "RSVP",
            subtitle: "Please let us know if you can make it",
            nameLabel: "Full Name",
            namePlaceholder: "Enter your full name",
            attendanceLabel: "Attendance Status",
            attendanceSelect: "Select...",
            attendanceYes: "Will attend",
            attendanceNo: "Can't attend",
            attendanceMaybe: "Not sure yet",
            guestCountLabel: "Number of Guests",
            vegetarianLabel: "I'm vegetarian",
            matchmakingLabel: "I want to join \"Find Your Love\"",
            genderLabel: "I want to find...",
            genderSelect: "Select gender",
            genderMale: "Male",
            genderFemale: "Female",
            genderOther: "Other",
            socialLinkLabel: "Social Media Link (Facebook, Instagram, Zalo...)",
            socialLinkPlaceholder: "https://facebook.com/yourprofile",
            socialLinkHint: "Share your link so we can connect you with suitable people",
            messageLabel: "Message",
            messagePlaceholder: "Send your wishes to the bride and groom...",
            submitButton: "Submit RSVP"
        },
        gift: {
            title: "Wedding Gift",
            subtitle: "Instead of flowers and gifts, we would be delighted to receive your best wishes",
            groom: "Groom",
            bride: "Bride",
            bank: "Bank:",
            bankNameGroom: "VPBank",
            accountGroom: "186735439",
            accountHolderGroom: "PHAN CONG HAU",
            bankNameBride: "Vietcombank",
            accountBride: "1036060991",
<<<<<<< HEAD
            accountHolderBride: "PHAN CONG HAU",
=======
            accountHolderBride: "NGUYEN NGOC THI",
>>>>>>> 820429b2d1d81e12ee6dcfbee101bf3819faf731
            copyButton: "Copy Account",
            qrLabel: "Scan QR code to transfer",
            note: "Your presence is the most meaningful gift to us!"
        },
        footer: {
            thankYou: "Thank You",
            subtitle: "Thanks for visiting!"
        },
        invitation: {
            loading: "Loading invitation...",
            respectfullyInvite: "We cordially invite",
            respectfullyInvite2: "We cordially invite our Dear Guest(s) to our wedding",
            toOurWedding: "to the wedding of",
            clickHint: "Click the envelope to open invitation",
            letterDate: "11.30.2025",
            cardTitle: "WEDDING INVITATION",
            infoTitle: "WEDDING INFORMATION",
            weddingDate: "Sunday, November 30, 2025",
            weddingTime: "01:00 PM",
            quote: '"Happiness is not a destination but a journey \n and on that journey, we’ve found our companion"',
            groomFamily: "Groom's Family",
            groomFather: "Father: Mr. Phan Van Ri",
            groomMother: "Mother: Mrs. Phan Bach Mai",
            groomSon: "Son: Nguyen Cong Hau",
            brideFamily: "Bride's Family",
            brideFather: "Father: Mr. Nguyen Van Thien",
            brideMother: "Mother: Mrs. Luu Thi Muoi",
            brideDaughter: "Daughter: Nguyen Ngoc Thi",
            venueTitle: "Venue",
            presenceMessage: "Thank you for being part of our wedding day. Your presence is the most meaningful gift",
            confirmAttendance: "Confirm Attendance",
            weddingInfo: "Wedding Information"
        }
    }
};

// Current language (default: Vietnamese)
let currentLang = localStorage.getItem('weddingLang') || 'vi';

// Initialize language switcher
function initLanguage() {
    // Set initial language
    setLanguage(currentLang);

    // Toggle dropdown
    const langToggle = document.getElementById('langToggle');
    const languageSwitcher = document.getElementById('languageSwitcher');
    const langDropdown = document.getElementById('langDropdown');

    if (langToggle) {
        langToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            languageSwitcher.classList.toggle('active');
        });
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (languageSwitcher && !languageSwitcher.contains(e.target)) {
            languageSwitcher.classList.remove('active');
        }
    });

    // Language option click handlers
    const langOptions = document.querySelectorAll('.lang-option');
    langOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            const lang = option.getAttribute('data-lang');
            if (lang && lang !== currentLang) {
                setLanguage(lang);
                languageSwitcher.classList.remove('active');
            }
        });
    });
}

// Set language
function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('weddingLang', lang);

    // Update current language display
    const currentLangFlag = document.getElementById('currentLangFlag');
    const currentLangText = document.getElementById('currentLangText');

    if (currentLangFlag && currentLangText) {
        if (lang === 'vi') {
            currentLangFlag.textContent = '🇻🇳';
            currentLangText.textContent = 'VI';
        } else {
            currentLangFlag.textContent = 'En';
            currentLangText.textContent = 'EN';
        }
    }

    // Update active state in dropdown
    const langOptions = document.querySelectorAll('.lang-option');
    langOptions.forEach(option => {
        if (option.getAttribute('data-lang') === lang) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });

    // Update all translated elements
    updateContent();

    // Update HTML lang attribute
    document.documentElement.lang = lang === 'vi' ? 'vi' : 'en';
}

// Update content based on current language
function updateContent() {
    const elements = document.querySelectorAll('[data-i18n]');

    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = getNestedTranslation(translations[currentLang], key);

        if (translation) {
            element.textContent = translation;
        }
    });

    // Update placeholders
    const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
    placeholderElements.forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        const translation = getNestedTranslation(translations[currentLang], key);

        if (translation) {
            element.placeholder = translation;
        }
    });

    // Update form select options
    updateFormSelects();
}

// Update form select options
function updateFormSelects() {
    const attendance = document.getElementById('attendance');
    if (attendance) {
        const selectedValue = attendance.value;
        const trans = translations[currentLang].rsvp;

        attendance.innerHTML = `
            <option value="">${trans.attendanceSelect}</option>
            <option value="Sẽ tham dự">${trans.attendanceYes}</option>
            <option value="Không thể tham dự">${trans.attendanceNo}</option>
            <option value="Chưa chắc chắn">${trans.attendanceMaybe}</option>
        `;

        if (selectedValue) {
            attendance.value = selectedValue;
        }
    }

    const gender = document.getElementById('gender');
    if (gender) {
        const selectedValue = gender.value;
        const trans = translations[currentLang].rsvp;

        gender.innerHTML = `
            <option value="">${trans.genderSelect}</option>
            <option value="Nam">${trans.genderMale}</option>
            <option value="Nữ">${trans.genderFemale}</option>
            <option value="Khác">${trans.genderOther}</option>
        `;

        if (selectedValue) {
            gender.value = selectedValue;
        }
    }
}

// Helper function to get nested translation
function getNestedTranslation(obj, path) {
    return path.split('.').reduce((current, key) => current?.[key], obj);
}

// Get current language (for use in other scripts)
function getCurrentLanguage() {
    return currentLang;
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLanguage);
} else {
    initLanguage();
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        setLanguage,
        getCurrentLanguage,
        translations
    };
}
