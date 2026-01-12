/* ============================================
   Language Toggle Functionality
   ============================================ */

// Language state: 'en' for English, 'es' for Spanish
let currentLanguage = localStorage.getItem('language') || 'en';

/**
 * Initialize language on page load
 */
function initLanguage() {
    // Set initial language
    updateLanguage(currentLanguage);
    
    // Update active language indicator
    updateLanguageIndicator(currentLanguage);
}

/**
 * Switch to a specific language
 */
function switchLanguage(lang) {
    if (lang === currentLanguage) return;
    
    currentLanguage = lang;
    localStorage.setItem('language', currentLanguage);
    updateLanguage(currentLanguage);
    updateLanguageIndicator(currentLanguage);
}

/**
 * Update the active language indicator
 */
function updateLanguageIndicator(lang) {
    const langEn = document.getElementById('lang-en');
    const langEs = document.getElementById('lang-es');
    
    if (langEn && langEs) {
        if (lang === 'en') {
            langEn.classList.add('active');
            langEs.classList.remove('active');
        } else {
            langEs.classList.add('active');
            langEn.classList.remove('active');
        }
    }
}

/**
 * Update all text content based on selected language
 */
function updateLanguage(lang) {
    // Get all elements with data-en and data-es attributes
    const elements = document.querySelectorAll('[data-en][data-es]');
    
    elements.forEach(element => {
        const text = lang === 'en' ? element.getAttribute('data-en') : element.getAttribute('data-es');
        
        // Handle different element types
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.value = text;
        } else {
            element.textContent = text;
        }
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // Update expand button text if it exists
    updateExpandButtonText();
}

/* ============================================
   Smooth Scrolling
   ============================================ */

/**
 * Initialize smooth scrolling for navigation links
 */
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip empty hash or just #
            if (href === '#' || href === '') {
                e.preventDefault();
                return;
            }
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Calculate offset for fixed navbar
                const navbar = document.getElementById('navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
}

/* ============================================
   Mobile Menu Toggle
   ============================================ */

/**
 * Toggle mobile navigation menu
 */
function toggleMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    const hamburger = document.getElementById('hamburger');
    
    if (navMenu && hamburger) {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    }
}

/**
 * Close mobile menu
 */
function closeMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    const hamburger = document.getElementById('hamburger');
    
    if (navMenu && hamburger) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
}

/* ============================================
   Scroll Animations
   ============================================ */

/**
 * Check if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Check if element is partially visible
 */
function isPartiallyVisible(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    return (
        rect.top < windowHeight * 0.8 &&
        rect.bottom > 0
    );
}

/**
 * Initialize scroll animations
 */
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    // Function to check and animate elements
    function checkAnimations() {
        fadeElements.forEach(element => {
            if (isPartiallyVisible(element) && !element.classList.contains('visible')) {
                element.classList.add('visible');
            }
        });
    }
    
    // Check on scroll
    window.addEventListener('scroll', checkAnimations);
    
    // Check on load
    checkAnimations();
    
    // Use Intersection Observer for better performance (optional enhancement)
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        fadeElements.forEach(element => {
            observer.observe(element);
        });
    }
}

/* ============================================
   Navbar Scroll Effect
   ============================================ */

/**
 * Add scroll effect to navbar
 */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
}

/* ============================================
   Active Navigation Link Highlighting
   ============================================ */

/**
 * Highlight active navigation link based on scroll position
 */
function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const navbarHeight = document.getElementById('navbar')?.offsetHeight || 0;
            
            if (window.scrollY >= (sectionTop - navbarHeight - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Initial call
}

/* ============================================
   Experience Expand/Collapse Handler
   ============================================ */

/**
 * Update expand button text based on current state and language
 */
function updateExpandButtonText() {
    const btnExpand = document.getElementById('btn-expand-experience');
    const timelineHidden = document.getElementById('timeline-hidden');
    
    if (btnExpand && timelineHidden) {
        const isExpanded = timelineHidden.classList.contains('expanded');
        const lang = currentLanguage;
        
        if (isExpanded) {
            btnExpand.textContent = lang === 'en' ? 'Show Less' : 'Ver Menos';
        } else {
            btnExpand.textContent = lang === 'en' ? 'See More Experience' : 'Ver Más Experiencia';
        }
    }
}

/**
 * Initialize experience expand/collapse functionality
 */
function initExperienceExpand() {
    const btnExpand = document.getElementById('btn-expand-experience');
    const timelineHidden = document.getElementById('timeline-hidden');
    
    if (btnExpand && timelineHidden) {
        // Set initial button text
        updateExpandButtonText();
        
        btnExpand.addEventListener('click', function() {
            const isExpanded = timelineHidden.classList.contains('expanded');
            
            if (isExpanded) {
                timelineHidden.classList.remove('expanded');
            } else {
                timelineHidden.classList.add('expanded');
                
                // Trigger scroll animations for newly visible items
                setTimeout(() => {
                    const hiddenItems = timelineHidden.querySelectorAll('.fade-in');
                    hiddenItems.forEach(item => {
                        if (isPartiallyVisible(item)) {
                            item.classList.add('visible');
                        }
                    });
                }, 100);
            }
            
            // Update button text
            updateExpandButtonText();
        });
    }
}

/* ============================================
   Email Link Handler
   ============================================ */

/**
 * Initialize email link with proper mailto handler
 */
function initEmailLink() {
    const emailLink = document.getElementById('email-link');
    
    if (emailLink) {
        // Email can be customized here
        const email = 'danielgcardona@gmail.com';
        emailLink.setAttribute('href', `mailto:${email}`);
    }
}

/* ============================================
   Event Listeners Setup
   ============================================ */

/**
 * Initialize all functionality when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize language
    initLanguage();
    
    // Language switcher - handle clicks on individual language options
    const langEn = document.getElementById('lang-en');
    const langEs = document.getElementById('lang-es');
    
    if (langEn) {
        langEn.addEventListener('click', () => switchLanguage('en'));
    }
    
    if (langEs) {
        langEs.addEventListener('click', () => switchLanguage('es'));
    }
    
    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        const navMenu = document.getElementById('nav-menu');
        const hamburger = document.getElementById('hamburger');
        
        if (navMenu && hamburger && 
            !navMenu.contains(e.target) && 
            !hamburger.contains(e.target) &&
            navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Initialize smooth scrolling
    initSmoothScroll();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize navbar scroll effect
    initNavbarScroll();
    
    // Initialize active nav link highlighting
    initActiveNavLink();
    
    // Initialize email link
    initEmailLink();
    
    // Initialize experience expand/collapse
    initExperienceExpand();
    
    // Handle window resize for mobile menu
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });
});

/* ============================================
   Utility Functions
   ============================================ */

/**
 * Debounce function for performance optimization
 */
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

// Apply debounce to scroll handlers for better performance
const debouncedScrollHandler = debounce(() => {
    // Any scroll-based functions that need debouncing
}, 10);
