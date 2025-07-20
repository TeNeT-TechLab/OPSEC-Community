// TeNeT TechLab OPSEC Community - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initMobileNav();
    initPlatformTabs();
    initMessageTabs();
    initCopyButtons();
    initAccordion();
    initSmoothScroll();
    initScrollEffects();
    initExternalLinks();
});

// Mobile Navigation Toggle
function initMobileNav() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on links
        const navLinks = navMenu.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Platform Tabs for 2FA Setup (Android/iOS)
function initPlatformTabs() {
    const platformBtns = document.querySelectorAll('.platform-btn');
    
    platformBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const platform = this.dataset.platform;
            
            // Remove active class from all buttons
            platformBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Hide all platform contents
            const allContents = document.querySelectorAll('.platform-content');
            allContents.forEach(content => {
                content.classList.add('hidden');
            });
            
            // Show corresponding content
            const targetContent = document.getElementById(`${platform}-content`);
            if (targetContent) {
                targetContent.classList.remove('hidden');
            }
        });
    });
}

// Message Language Tabs (English/Spanish)
function initMessageTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            
            // Remove active class from all buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Hide all tab contents
            const allTabContents = document.querySelectorAll('.tab-content');
            allTabContents.forEach(content => {
                content.classList.add('hidden');
            });
            
            // Show corresponding tab content
            const targetTab = document.getElementById(tabId);
            if (targetTab) {
                targetTab.classList.remove('hidden');
            }
        });
    });
}

// Copy to Clipboard Functionality
function initCopyButtons() {
    const messages = {
        english: "IMPORTANT: Someone may be using my compromised account to scam you. DO NOT send money, gift cards, or personal information to anyone claiming to be me until we speak in person or over the phone. Stay safe! - [Your Name]",
        spanish: "IMPORTANTE: Alguien puede estar usando mi cuenta comprometida para estafarlos. NO envíen dinero, tarjetas de regalo, o información personal a nadie que diga ser yo hasta que hablemos en persona o por teléfono. ¡Manténganse seguros! - [Tu Nombre]"
    };
    
    const copyBtns = document.querySelectorAll('.copy-btn');
    
    copyBtns.forEach(btn => {
        btn.addEventListener('click', async function(e) {
            e.preventDefault();
            const messageType = this.dataset.message;
            const textToCopy = messages[messageType];
            
            try {
                // Modern clipboard API (preferred method)
                if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(textToCopy);
                    showCopyFeedback(this, 'Copied!');
                } else {
                    // Fallback method
                    const textarea = document.createElement('textarea');
                    textarea.value = textToCopy;
                    textarea.style.position = 'fixed';
                    textarea.style.left = '-999999px';
                    textarea.style.top = '-999999px';
                    document.body.appendChild(textarea);
                    
                    textarea.focus();
                    textarea.select();
                    
                    const successful = document.execCommand('copy');
                    document.body.removeChild(textarea);
                    
                    if (successful) {
                        showCopyFeedback(this, 'Copied!');
                    } else {
                        showCopyFeedback(this, 'Copy failed');
                    }
                }
            } catch (error) {
                console.error('Copy failed:', error);
                showCopyFeedback(this, 'Copy failed');
            }
        });
    });
}

// Show copy feedback with improved styling
function showCopyFeedback(button, message) {
    const originalText = button.textContent;
    const originalBackground = button.style.backgroundColor;
    const originalColor = button.style.color;
    
    // Update button appearance
    button.textContent = message;
    button.style.backgroundColor = '#00ff88';
    button.style.color = '#000814';
    button.disabled = true;
    
    // Reset after 2 seconds
    setTimeout(() => {
        button.textContent = originalText;
        button.style.backgroundColor = originalBackground;
        button.style.color = originalColor;
        button.disabled = false;
    }, 2000);
}

// Fixed Accordion Functionality for Advanced Security
function initAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function(e) {
            e.preventDefault();
            
            const accordionItem = this.parentElement;
            const accordionContent = accordionItem.querySelector('.accordion-content');
            const accordionIcon = this.querySelector('.accordion-icon');
            const isCurrentlyActive = accordionItem.classList.contains('active');
            
            // Close all accordion items first
            document.querySelectorAll('.accordion-item').forEach(item => {
                const content = item.querySelector('.accordion-content');
                const icon = item.querySelector('.accordion-icon');
                
                item.classList.remove('active');
                if (content) {
                    content.style.maxHeight = '0';
                }
                if (icon) {
                    icon.style.transform = 'rotate(0deg)';
                }
            });
            
            // If this item wasn't active, open it
            if (!isCurrentlyActive && accordionContent) {
                accordionItem.classList.add('active');
                accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
                if (accordionIcon) {
                    accordionIcon.style.transform = 'rotate(45deg)';
                }
            }
        });
    });
}

// Smooth Scroll Navigation
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav__link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize external links handling
function initExternalLinks() {
    const externalLinks = document.querySelectorAll('a[href^="http"], a[href^="https"]');
    
    externalLinks.forEach(link => {
        // Ensure external links open in new tab
        if (!link.hasAttribute('target')) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
}

// Scroll Effects and Animations
function initScrollEffects() {
    // Header background opacity on scroll
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        // Update header opacity
        if (scrolled > 50) {
            header.style.background = 'rgba(0, 8, 20, 0.98)';
        } else {
            header.style.background = 'rgba(0, 8, 20, 0.95)';
        }
    });
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.stat-card, .service-card, .tool-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key to close mobile menu
    if (e.key === 'Escape') {
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        
        if (navToggle && navMenu) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
    
    // Enter/Space for accordion headers
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('accordion-header')) {
        e.preventDefault();
        e.target.click();
    }
});

// Enhanced accessibility
function enhanceAccessibility() {
    // Add ARIA labels where needed
    const buttons = document.querySelectorAll('button:not([aria-label])');
    buttons.forEach(btn => {
        if (btn.classList.contains('nav__toggle')) {
            btn.setAttribute('aria-label', 'Toggle navigation menu');
        }
        if (btn.classList.contains('copy-btn')) {
            btn.setAttribute('aria-label', 'Copy message to clipboard');
        }
        if (btn.classList.contains('accordion-header')) {
            btn.setAttribute('aria-expanded', 'false');
            btn.setAttribute('role', 'button');
        }
    });
    
    // Update accordion ARIA states
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const isExpanded = this.parentElement.classList.contains('active');
            this.setAttribute('aria-expanded', isExpanded.toString());
        });
    });
}

// Initialize accessibility enhancements
enhanceAccessibility();

// Console branding message
console.log(`
%c🔒 TeNeT TechLab OPSEC Community 🔒
%cBuilding Digital Safety Together
%c
For security questions: TeNeT.TechLabs@Gmail.com
Portfolio: https://archangel13gtl.github.io/
GitHub: https://github.com/TeNeT-TechLabs
`, 
'color: #00ff88; font-size: 16px; font-weight: bold;',
'color: #8ecae6; font-size: 14px;',
'color: #ffffff; font-size: 12px;'
);