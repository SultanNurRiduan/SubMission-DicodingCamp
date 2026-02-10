// ===== CSS VARIABLES =====
const cssVars = getComputedStyle(document.documentElement);

const COLORS = {
    bgPrimary: cssVars.getPropertyValue('--bg-primary').trim(),
    bgCard: cssVars.getPropertyValue('--bg-card').trim(),
    textPrimary: cssVars.getPropertyValue('--text-primary').trim(),
    textSecondary: cssVars.getPropertyValue('--text-secondary').trim(),
    accent: cssVars.getPropertyValue('--accent-primary').trim(),
    accentHover: cssVars.getPropertyValue('--accent-hover').trim(),
};


// ===== Navbar Scroll Effect - Transparent to Blur =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Hamburger Menu Toggle =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking nav links
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// ===== Smooth Scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Scroll to Top Button =====
const createScrollToTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.setAttribute('id', 'scrollToTop');
    button.setAttribute('aria-label', 'Scroll to top');
    button.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 55px;
    height: 55px;
    background: ${COLORS.accent};
    color: ${COLORS.textPrimary};
    border-radius: 50%;
    font-size: 20px;
    cursor: pointer;
    display: none;
    z-index: 999;
    box-shadow: 0 6px 20px rgba(229, 9, 20, 0.4);
    transition: all 0.3s ease;
`;


    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.15) rotate(-15deg)';
        button.style.boxShadow = '0 6px 20px rgba(229, 9, 20, 0.4)';
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1) rotate(0deg)';
        button.style.boxShadow = '0 4px 15px rgba(212, 55, 55, 0.5)';
    });

    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    document.body.appendChild(button);
    return button;
};

const scrollToTopBtn = createScrollToTopButton();

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 400) {
        scrollToTopBtn.style.display = 'flex';
        scrollToTopBtn.style.alignItems = 'center';
        scrollToTopBtn.style.justifyContent = 'center';
        setTimeout(() => {
            scrollToTopBtn.style.opacity = '1';
        }, 10);
    } else {
        scrollToTopBtn.style.opacity = '0';
        setTimeout(() => {
            scrollToTopBtn.style.display = 'none';
        }, 300);
    }
});

// ===== Intersection Observer for Scroll Animations =====
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
const animateElements = document.querySelectorAll('.god-card, .culture-card, .lore-item, .feature-item');
animateElements.forEach(el => {
    fadeInObserver.observe(el);
});

// ===== Active Nav Link on Scroll =====
const sections = document.querySelectorAll('section, aside, article, header');
const navLinksList = document.querySelectorAll('.nav-menu a[href^="#"]');

function setActiveNav() {
    let scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinksList.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', debounce(setActiveNav, 100));
window.addEventListener('load', setActiveNav);

// ===== Parallax Effect for Hero =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');

    if (hero && scrolled <= hero.offsetHeight) {
        hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    }
});

// ===== Dynamic Year in Footer =====
const updateFooterYear = () => {
    const yearElements = document.querySelectorAll('.footer-bottom p');
    const currentYear = new Date().getFullYear();

    yearElements.forEach(el => {
        const text = el.innerHTML;
        el.innerHTML = text.replace(/©\s*\d{4}/, `© ${currentYear}`);
    });
};

updateFooterYear();

// ===== Debounce Function =====
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

// ===== Loading Animation =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in-out';
        document.body.style.opacity = '1';
    }, 100);
});

// ===== Image Error Handling =====
const images = document.querySelectorAll('img');
images.forEach(img => {
    img.addEventListener('error', function () {
        this.style.background = 'linear-gradient(135deg, #f6121d 0%, #e50914 100%)';
        this.style.display = 'flex';
        this.style.alignItems = 'center';
        this.style.justifyContent = 'center';
        this.style.minHeight = '300px';
        this.alt = 'Viking Icon';
        // Create icon element
        const icon = document.createElement('i');
        icon.className = 'fas fa-shield-alt';
        icon.style.cssText = 'color: #0f0c09; font-size: 3rem;';
        this.parentElement.style.position = 'relative';
        this.style.opacity = '0';

        const iconWrapper = document.createElement('div');
        iconWrapper.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 4rem;
            color: #0f0c09;
        `;
        iconWrapper.innerHTML = '<i class="fas fa-shield-alt"></i>';
        this.parentElement.appendChild(iconWrapper);
    });
});

// ===== Easter Egg: Viking Battle Cry =====
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join(',') === konamiPattern.join(',')) {
        showVikingBattleCry();
    }
});

function showVikingBattleCry() {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(15, 12, 9, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.5s ease;
    `;

    overlay.innerHTML = `
        <div style="text-align: center; color: #d43737;">
            <h1 style="font-size: 5rem; margin-bottom: 1rem; text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.9);">
                <i class="fas fa-beer"></i> SKÅL! <i class="fas fa-beer"></i>
            </h1>
            <p style="font-size: 2rem; font-style: italic;">Till Valhalla!</p>
            <p style="font-size: 1.2rem; margin-top: 2rem; color: #d4c5b0;">
                <i class="fas fa-shield-alt"></i> Easter egg found! <i class="fas fa-shield-alt"></i>
            </p>
        </div>
    `;

    document.body.appendChild(overlay);

    setTimeout(() => {
        overlay.style.animation = 'fadeOut 0.5s ease';
        setTimeout(() => {
            document.body.removeChild(overlay);
        }, 500);
    }, 3000);
}


const ragnarQuotes = [
    { text: "Jangan buang waktu meratapi apa yang tidak kamu miliki. Bersyukurlah untuk apa yang kamu punya dan gunakan itu dengan sepenuh hati.", author: "- Ragnar Lothbrok" },
    { text: "Kekuatan bukanlah tentang seberapa keras kamu bisa memukul, tetapi tentang seberapa banyak pukulan yang bisa kamu terima dan tetap melangkah maju.", author: "- Ragnar Lothbrok" },
    { text: "Untuk menjadi Raja, kamu harus membunuh Raja.", author: "- Ragnar Lothbrok" },
    { text: "Setiap orang akan mati. Hanya sedikit yang benar-benar hidup.", author: "- Ragnar Lothbrok" }
];

let currentQuoteIndex = 0;

const quoteP = document.querySelector('.ragnar-quotes blockquote p');
const quoteCite = document.querySelector('.ragnar-quotes blockquote cite');

function rotateQuotes() {
    if (!quoteP || !quoteCite) return;

    setInterval(() => {
        // Fade out
        quoteP.style.opacity = '0';
        quoteCite.style.opacity = '0';

        setTimeout(() => {
            // Update quote
            currentQuoteIndex = (currentQuoteIndex + 1) % ragnarQuotes.length;
            quoteP.textContent = ragnarQuotes[currentQuoteIndex].text;
            quoteCite.textContent = ragnarQuotes[currentQuoteIndex].author;

            // Fade in
            quoteP.style.opacity = '1';
            quoteCite.style.opacity = '1';
        }, 500); // Waktu fade out
    }, 5000); // Ganti quote setiap 10 detik
}

// Mulai rotasi saat halaman load
window.addEventListener('DOMContentLoaded', rotateQuotes);


console.log('✅ Viking Saga JavaScript loaded successfully! Till Valhalla! ⚔️');