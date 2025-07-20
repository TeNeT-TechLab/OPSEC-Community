// TeNeT TechLab OPSEC Community Hub - Interactive JavaScript
// All functionality working with proper event handling - FIXED VERSION

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initParticles();
    initMobileMenu();
    initPlatformTabs();
    initPlatformSelector();
    initMessageTabs();
    initCopyButtons();
    initFeatureToggles();
    initSmoothScrolling();
    initScrollEffects();
    
    console.log('TeNeT TechLab OPSEC Hub initialized successfully');
});

// Particle System
function initParticles() {
    const particles = document.getElementById('particles');
    if (!particles) return;
    
    // Create animated circuit patterns
    function createCircuitPattern() {
        const circuit = document.createElement('div');
        circuit.className = 'circuit-line';
        circuit.style.cssText = `
            position: absolute;
            width: ${Math.random() * 200 + 100}px;
            height: 2px;
            background: linear-gradient(90deg, transparent, #00ff88, transparent);
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.5 + 0.2};
            animation: circuitFlow ${Math.random() * 10 + 5}s linear infinite;
            transform: rotate(${Math.random() * 360}deg);
        `;
        
        particles.appendChild(circuit);
        
        setTimeout(() => {
            if (circuit.parentNode) {
                circuit.parentNode.removeChild(circuit);
            }
        }, 15000);
    }
    
    // Create circuit patterns periodically
    setInterval(createCircuitPattern, 2000);
    
    // Add CSS for circuit animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes circuitFlow {
            0% { transform: translateX(-100px) rotate(var(--rotation, 0deg)); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateX(100px) rotate(var(--rotation, 0deg)); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// Mobile Menu Navigation - FIXED
function initMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (!mobileToggle || !navMenu) return;
    
    mobileToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        navMenu.classList.toggle('active');
        mobileToggle.classList.toggle('active');
        
        // Animate hamburger lines
        const lines = mobileToggle.querySelectorAll('.hamburger-line');
        if (mobileToggle.classList.contains('active')) {
            lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            lines[1].style.opacity = '0';
            lines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        } else {
            lines[0].style.transform = 'none';
            lines[1].style.opacity = '1';
            lines[2].style.transform = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close mobile menu when clicking nav links
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            // Reset hamburger lines
            const lines = mobileToggle.querySelectorAll('.hamburger-line');
            lines[0].style.transform = 'none';
            lines[1].style.opacity = '1';
            lines[2].style.transform = 'none';
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            // Reset hamburger lines
            const lines = mobileToggle.querySelectorAll('.hamburger-line');
            lines[0].style.transform = 'none';
            lines[1].style.opacity = '1';
            lines[2].style.transform = 'none';
        }
    });
}

// Platform Tabs (Recovery and Auth sections)
function initPlatformTabs() {
    // Handle all platform tab containers
    const tabContainers = document.querySelectorAll('.platform-tabs');
    
    tabContainers.forEach(container => {
        const tabBtns = container.querySelectorAll('.tab-btn');
        const section = container.closest('.section');
        const contents = section.querySelectorAll('.platform-content');
        
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const platform = this.getAttribute('data-platform');
                
                // Remove active class from all tabs in this container
                tabBtns.forEach(tab => tab.classList.remove('active'));
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Hide all content in this section
                contents.forEach(content => {
                    content.classList.remove('active');
                });
                
                // Show content for selected platform
                const targetContent = section.querySelector(`.platform-content[data-platform="${platform}"]`);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
                
                // Add visual feedback
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            });
        });
    });
}

// Global Platform Selector (Tools section)
function initPlatformSelector() {
    const platformBtns = document.querySelectorAll('.platform-btn');
    const toolPlatforms = document.querySelectorAll('.tool-platform');
    
    platformBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const platform = this.getAttribute('data-platform');
            
            // Remove active class from all platform buttons
            platformBtns.forEach(button => button.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Hide all tool platform content
            toolPlatforms.forEach(content => {
                content.classList.remove('active');
            });
            
            // Show content for selected platform
            const targetPlatforms = document.querySelectorAll(`.tool-platform[data-platform="${platform}"]`);
            targetPlatforms.forEach(platform => {
                platform.classList.add('active');
            });
            
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Trigger tool card animations
            const toolCards = document.querySelectorAll('.tool-card');
            toolCards.forEach((card, index) => {
                card.style.animation = 'none';
                setTimeout(() => {
                    card.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s both`;
                }, 50);
            });
        });
    });
}

// Message Language Tabs
function initMessageTabs() {
    const msgTabs = document.querySelectorAll('.msg-tab');
    const messageContents = document.querySelectorAll('.message-content');
    
    msgTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            
            // Remove active class from all tabs
            msgTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Hide all message content
            messageContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // Show content for selected language
            const targetContent = document.querySelector(`.message-content[data-lang="${lang}"]`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
            
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Copy to Clipboard Functionality
function initCopyButtons() {
    const copyBtns = document.querySelectorAll('.copy-btn');
    
    copyBtns.forEach(btn => {
        btn.addEventListener('click', async function() {
            const targetId = this.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);
            
            if (!targetElement) return;
            
            try {
                let textToCopy = '';
                
                if (targetElement.tagName.toLowerCase() === 'input') {
                    textToCopy = targetElement.value;
                } else if (targetElement.tagName.toLowerCase() === 'textarea') {
                    textToCopy = targetElement.value;
                } else {
                    textToCopy = targetElement.textContent || targetElement.innerText;
                }
                
                // Use modern clipboard API
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    await navigator.clipboard.writeText(textToCopy);
                } else {
                    // Fallback method
                    targetElement.select();
                    targetElement.setSelectionRange(0, 99999); // For mobile devices
                    document.execCommand('copy');
                }
                
                // Visual feedback
                const originalText = this.textContent;
                this.textContent = 'Copied!';
                this.style.background = 'linear-gradient(135deg, #00cc77, #00aa66)';
                this.style.transform = 'scale(0.95)';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.background = 'linear-gradient(135deg, #00ff88, #00cc77)';
                    this.style.transform = 'scale(1)';
                }, 1500);
                
                // Show success notification
                showNotification('Copied to clipboard!', 'success');
                
            } catch (err) {
                console.error('Failed to copy text: ', err);
                showNotification('Failed to copy. Please try again.', 'error');
            }
        });
    });
}

// Feature Toggle (Expand/Collapse) - COMPLETELY FIXED
function initFeatureToggles() {
    const featureToggles = document.querySelectorAll('.feature-toggle');
    
    featureToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const targetId = this.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            const toggleIcon = this.querySelector('.toggle-icon');
            
            if (!targetContent) {
                console.error('Target content not found:', targetId);
                return;
            }
            
            // Toggle active state
            const isActive = this.classList.contains('active');
            
            if (isActive) {
                // Collapse
                this.classList.remove('active');
                targetContent.classList.remove('active');
                toggleIcon.textContent = '+';
                toggleIcon.style.transform = 'rotate(0deg)';
                
                // Animate collapse
                targetContent.style.maxHeight = '0px';
                targetContent.style.opacity = '0';
                targetContent.style.paddingTop = '0px';
                targetContent.style.paddingBottom = '0px';
                
            } else {
                // Expand
                this.classList.add('active');
                targetContent.classList.add('active');
                toggleIcon.textContent = '−'; // Using minus symbol instead of X
                toggleIcon.style.transform = 'rotate(0deg)';
                
                // Set initial state for animation
                targetContent.style.display = 'block';
                targetContent.style.opacity = '0';
                targetContent.style.maxHeight = '0px';
                targetContent.style.paddingTop = '0px';
                targetContent.style.paddingBottom = '0px';
                
                // Force reflow
                targetContent.offsetHeight;
                
                // Animate expand
                targetContent.style.maxHeight = targetContent.scrollHeight + 50 + 'px';
                targetContent.style.opacity = '1';
                targetContent.style.paddingTop = '1.5rem';
                targetContent.style.paddingBottom = '1.5rem';
            }
            
            // Add visual feedback to toggle button
            this.style.transform = 'scale(0.98)';
            this.style.background = 'rgba(0, 255, 136, 0.1)';
            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                this.style.background = 'transparent';
            }, 200);
        });
    });
    
    // Initialize all feature contents as collapsed with proper transitions
    const featureContents = document.querySelectorAll('.feature-content');
    featureContents.forEach(content => {
        content.style.display = 'block';
        content.style.maxHeight = '0px';
        content.style.overflow = 'hidden';
        content.style.opacity = '0';
        content.style.transition = 'all 0.3s ease-out';
        content.style.paddingTop = '0px';
        content.style.paddingBottom = '0px';
        content.classList.remove('active'); // Ensure all start collapsed
    });
    
    // Reset all toggle icons to + state
    const toggleIcons = document.querySelectorAll('.toggle-icon');
    toggleIcons.forEach(icon => {
        icon.textContent = '+';
        icon.style.transform = 'rotate(0deg)';
    });
    
    // Remove active class from all toggles
    featureToggles.forEach(toggle => {
        toggle.classList.remove('active');
    });
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 100; // Account for fixed header
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Add visual feedback to the link
                this.style.color = '#00ff88';
                setTimeout(() => {
                    this.style.color = '';
                }, 1000);
            }
        });
    });
}

// Scroll Effects and Animations
function initScrollEffects() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);
    
    // Observe sections for scroll animations
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        observer.observe(section);
    });
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero');
        const speed = 0.5;
        
        if (parallax) {
            parallax.style.transform = `translateY(${scrolled * speed}px)`;
        }
        
        // Update header background opacity based on scroll
        const header = document.querySelector('.header');
        if (header) {
            const opacity = Math.min(scrolled / 100, 0.95);
            header.style.background = `rgba(10, 10, 10, ${opacity})`;
        }
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove any existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#00ff88' : type === 'error' ? '#ff4444' : '#4444ff'};
        color: ${type === 'success' ? '#0a0a0a' : '#ffffff'};
        padding: 1rem 1.5rem;
        border-radius: 8px;
        font-weight: 600;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    // Add slide-in animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    if (!document.querySelector('style[data-notifications]')) {
        style.setAttribute('data-notifications', '');
        document.head.appendChild(style);
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
    
    // Allow manual dismissal by clicking
    notification.addEventListener('click', function() {
        this.style.animation = 'slideOutRight 0.3s ease-out forwards';
        setTimeout(() => {
            if (this.parentNode) {
                this.parentNode.removeChild(this);
            }
        }, 300);
    });
}

// Keyboard Navigation Support
document.addEventListener('keydown', function(e) {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('navMenu');
        const mobileToggle = document.getElementById('mobileToggle');
        
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            // Reset hamburger lines
            const lines = mobileToggle.querySelectorAll('.hamburger-line');
            lines[0].style.transform = 'none';
            lines[1].style.opacity = '1';
            lines[2].style.transform = 'none';
        }
    }
    
    // Enter key activates focused buttons
    if (e.key === 'Enter') {
        const focused = document.activeElement;
        if (focused && (focused.classList.contains('tab-btn') || 
                       focused.classList.contains('platform-btn') || 
                       focused.classList.contains('msg-tab') ||
                       focused.classList.contains('feature-toggle'))) {
            focused.click();
        }
    }
});

// Performance Optimization
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

// Debounced scroll handler for better performance
const debouncedScrollHandler = debounce(function() {
    const scrolled = window.pageYOffset;
    const header = document.querySelector('.header');
    
    if (header) {
        const opacity = Math.min(scrolled / 100, 0.95);
        header.style.background = `rgba(10, 10, 10, ${opacity})`;
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Error Handling for Failed Operations
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // You could show a user-friendly error message here if needed
});

// Initialize success message
console.log('🚀 TeNeT TechLab OPSEC Hub fully loaded and interactive!');
console.log('✅ All features initialized and FIXED:');
console.log('   - Mobile navigation (FIXED)');
console.log('   - Platform switching');
console.log('   - Copy functionality');
console.log('   - Feature toggles (FIXED)');
console.log('   - Smooth scrolling');
console.log('   - Particle effects');
console.log('   - Scroll animations');

// Export functions for potential external use
window.TeNeTTechLab = {
    showNotification,
    initPlatformTabs,
    initCopyButtons,
    initFeatureToggles
};
