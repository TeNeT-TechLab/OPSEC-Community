// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav__link');
const platformTabs = document.querySelectorAll('.platform-tab');
const platformPanels = document.querySelectorAll('.platform-panel');
const expandBtns = document.querySelectorAll('.expand-btn');
const copyBtns = document.querySelectorAll('.copy-btn');
const messageTabs = document.querySelectorAll('.tab-btn');
const messageBoxes = document.querySelectorAll('.message-box');
const accordionHeaders = document.querySelectorAll('.accordion-header');
const circuitCanvas = document.getElementById('circuit-canvas');

// Family messages data
const familyMessages = {
    english: "Hi everyone - my account was hacked. If you got strange messages from me, please ignore them. I'm getting my account back and will let you know when it's safe again. This happens to millions of people - it's not my fault and we'll fix it together.",
    spanish: "Hola a todos - hackearon mi cuenta. Si recibieron mensajes extraños de mí, por favor ignórenlos. Estoy recuperando mi cuenta y les avisaré cuando esté segura otra vez. Esto le pasa a millones de personas - no es mi culpa y lo arreglaremos juntos."
};

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initPlatformTabs();
    initExpandButtons();
    initCopyButtons();
    initMessageTabs();
    initAccordion();
    initCircuitAnimation();
    initSmoothScrolling();
    showSuccessMessage();
});

// Navigation functionality
function initNavigation() {
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Close mobile menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Header scroll effect
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(5, 5, 5, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(0, 255, 136, 0.1)';
            } else {
                header.style.background = 'rgba(5, 5, 5, 0.95)';
                header.style.boxShadow = 'none';
            }
        });
    }
}

// Platform tabs functionality
function initPlatformTabs() {
    platformTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const platform = this.getAttribute('data-platform');
            
            // Remove active class from all tabs and panels
            platformTabs.forEach(t => t.classList.remove('active'));
            platformPanels.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding panel
            this.classList.add('active');
            const targetPanel = document.getElementById(`${platform}-2fa`);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }

            // Add visual feedback
            addButtonFeedback(this);
        });
    });
}

// Expand/collapse functionality
function initExpandButtons() {
    expandBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const target = document.getElementById(targetId);
            
            if (target) {
                const isExpanded = target.classList.contains('expanded');
                
                if (isExpanded) {
                    target.classList.remove('expanded');
                    this.textContent = 'View Details';
                } else {
                    target.classList.add('expanded');
                    this.textContent = 'Hide Details';
                }

                // Add visual feedback
                addButtonFeedback(this);
            }
        });
    });
}

// Copy message functionality
function initCopyButtons() {
    copyBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const messageType = this.getAttribute('data-copy');
            const message = familyMessages[messageType];
            
            if (message) {
                // Try to use the Clipboard API first
                if (navigator.clipboard && window.isSecureContext) {
                    navigator.clipboard.writeText(message).then(() => {
                        showCopySuccess(this, messageType);
                    }).catch(() => {
                        // Fallback to older method
                        copyToClipboardFallback(message, this, messageType);
                    });
                } else {
                    // Fallback for older browsers or non-HTTPS
                    copyToClipboardFallback(message, this, messageType);
                }
            }
        });
    });
}

// Fallback copy method
function copyToClipboardFallback(text, button, messageType) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopySuccess(button, messageType);
    } catch (err) {
        console.error('Failed to copy text: ', err);
        showCopyError(button);
    }
    
    document.body.removeChild(textArea);
}

// Show copy success message
function showCopySuccess(button, messageType) {
    const originalText = button.innerHTML;
    const successText = messageType === 'spanish' ? '✓ ¡Copiado!' : '✓ Copied!';
    
    button.innerHTML = successText;
    button.style.background = 'linear-gradient(135deg, #00ff88, #00d4ff)';
    button.style.color = '#0a0a0a';
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.style.background = '';
        button.style.color = '';
    }, 2000);

    // Add visual feedback
    addButtonFeedback(button);
}

// Show copy error message
function showCopyError(button) {
    const originalText = button.innerHTML;
    button.innerHTML = '✗ Error';
    button.style.background = '#ff0040';
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.style.background = '';
    }, 2000);
}

// Message language tabs
function initMessageTabs() {
    messageTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetLang = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and message boxes
            messageTabs.forEach(t => t.classList.remove('active'));
            messageBoxes.forEach(box => box.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding message box
            this.classList.add('active');
            const targetBox = document.getElementById(`${targetLang}-message`);
            if (targetBox) {
                targetBox.classList.add('active');
            }

            // Add visual feedback
            addButtonFeedback(this);
        });
    });
}

// Accordion functionality
function initAccordion() {
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const target = document.getElementById(targetId);
            const accordionItem = this.closest('.accordion-item');
            
            if (target && accordionItem) {
                const isExpanded = target.classList.contains('expanded');
                
                // Close all other accordion items
                accordionHeaders.forEach(otherHeader => {
                    if (otherHeader !== this) {
                        const otherId = otherHeader.getAttribute('data-target');
                        const otherTarget = document.getElementById(otherId);
                        const otherItem = otherHeader.closest('.accordion-item');
                        
                        if (otherTarget && otherItem) {
                            otherTarget.classList.remove('expanded');
                            otherItem.classList.remove('active');
                        }
                    }
                });
                
                // Toggle current item
                if (isExpanded) {
                    target.classList.remove('expanded');
                    accordionItem.classList.remove('active');
                } else {
                    target.classList.add('expanded');
                    accordionItem.classList.add('active');
                }

                // Add visual feedback
                addButtonFeedback(this);
            }
        });
    });
}

// Circuit board animation
function initCircuitAnimation() {
    if (!circuitCanvas) return;

    const ctx = circuitCanvas.getContext('2d');
    let animationId;

    function resizeCanvas() {
        circuitCanvas.width = window.innerWidth;
        circuitCanvas.height = window.innerHeight;
    }

    function drawCircuit() {
        ctx.clearRect(0, 0, circuitCanvas.width, circuitCanvas.height);
        
        const time = Date.now() * 0.001;
        const gridSize = 50;
        
        ctx.strokeStyle = 'rgba(0, 255, 136, 0.1)';
        ctx.lineWidth = 1;
        
        // Draw grid
        for (let x = 0; x < circuitCanvas.width; x += gridSize) {
            for (let y = 0; y < circuitCanvas.height; y += gridSize) {
                // Horizontal lines
                if (Math.random() > 0.7) {
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.lineTo(x + gridSize, y);
                    ctx.stroke();
                }
                
                // Vertical lines
                if (Math.random() > 0.7) {
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.lineTo(x, y + gridSize);
                    ctx.stroke();
                }
                
                // Circuit nodes
                if (Math.random() > 0.9) {
                    ctx.fillStyle = `rgba(0, 255, 136, ${0.3 + Math.sin(time * 2 + x + y) * 0.2})`;
                    ctx.beginPath();
                    ctx.arc(x, y, 2, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        }
        
        animationId = requestAnimationFrame(drawCircuit);
    }

    resizeCanvas();
    drawCircuit();

    window.addEventListener('resize', resizeCanvas);

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
    });
}

// Smooth scrolling for navigation
function initSmoothScrolling() {
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = document.getElementById('header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Also handle any other internal links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Visual feedback for button interactions
function addButtonFeedback(button) {
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = '';
    }, 150);
}

// Show success message on page load
function showSuccessMessage() {
    // Add a subtle success indicator that the page loaded correctly
    setTimeout(() => {
        const logo = document.querySelector('.logo-text');
        if (logo) {
            logo.style.animation = 'glow 0.5s ease-in-out';
            setTimeout(() => {
                logo.style.animation = '';
            }, 500);
        }
    }, 500);
}

// Search functionality (if search input exists)
function initSearch() {
    const searchInput = document.querySelector('input[type="search"]');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            const sections = document.querySelectorAll('.section');
            
            sections.forEach(section => {
                const content = section.textContent.toLowerCase();
                if (content.includes(query) || query === '') {
                    section.style.display = '';
                } else {
                    section.style.display = 'none';
                }
            });
        });
    }
}

// Handle form submissions (if any forms exist)
function initForms() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Processing...';
                submitBtn.disabled = true;
                
                // Simulate processing
                setTimeout(() => {
                    submitBtn.textContent = '✓ Success!';
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                        form.reset();
                    }, 2000);
                }, 1000);
            }
        });
    });
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    initSearch();
    initForms();
});

// Handle keyboard navigation
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    // Enter key activates buttons and links
    if (e.key === 'Enter') {
        const focusedElement = document.activeElement;
        if (focusedElement.classList.contains('accordion-header') ||
            focusedElement.classList.contains('expand-btn') ||
            focusedElement.classList.contains('platform-tab') ||
            focusedElement.classList.contains('tab-btn')) {
            focusedElement.click();
        }
    }
});

// Performance optimization: Intersection Observer for animations
function initIntersectionObserver() {
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

    // Observe cards and sections for fade-in effect
    const elementsToObserve = document.querySelectorAll('.card, .tool-card, .contact-card, .step-card, .emergency-card');
    elementsToObserve.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize intersection observer when page is loaded
window.addEventListener('load', initIntersectionObserver);

// Error handling for missing elements
function safeAddEventListener(element, event, handler) {
    if (element) {
        element.addEventListener(event, handler);
    }
}

// Console message for developers
console.log(`
🔰 TeNeT TechLab Security Hub
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Building Digital Safety Together
For Our Communities

Version: 1.0
Status: ✅ All systems operational
Security Level: 🔒 Maximum

Contact: TeNeT.TechLabs@Gmail.com
GitHub: https://GitHub.com/TeNeT-TechLabs
━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);

// Export functions for testing (if in a module environment)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initNavigation,
        initPlatformTabs,
        initExpandButtons,
        initCopyButtons,
        initMessageTabs,
        initAccordion,
        initCircuitAnimation,
        initSmoothScrolling
    };
}