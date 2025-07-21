// TeNeT TechLab OPSEC Community - Enhanced Interactive Functionality - FIXED
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔐 TeNeT TechLab OPSEC Community - Initializing cyberpunk interface...');
    
    // Enhanced Mobile Menu Toggle - FIXED
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    if (mobileMenuToggle && navLinks) {
        // Initialize mobile menu state
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('active');
        
        mobileMenuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            const newState = !isExpanded;
            
            // Update attributes
            this.setAttribute('aria-expanded', newState);
            this.classList.toggle('active', newState);
            navLinks.classList.toggle('active', newState);
            
            // Enhanced visual feedback
            this.style.transform = newState ? 'scale(0.95)' : 'scale(1)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
            
            // Prevent body scroll when menu is open
            if (newState) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
            
            console.log(`Mobile menu ${newState ? 'opened' : 'closed'}`);
        });

        // Enhanced close functionality
        function closeMobileMenu() {
            mobileMenuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            body.style.overflow = '';
        }

        // Close menu when clicking on navigation links
        const navLinksItems = document.querySelectorAll('.nav-links a');
        navLinksItems.forEach(link => {
            link.addEventListener('click', (e) => {
                // Allow the navigation to happen first
                setTimeout(() => {
                    closeMobileMenu();
                }, 100);
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            const isClickInsideNav = mobileMenuToggle.contains(e.target) || navLinks.contains(e.target);
            if (!isClickInsideNav && navLinks.classList.contains('active')) {
                closeMobileMenu();
            }
        });

        // Enhanced keyboard support
        mobileMenuToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
            if (e.key === 'Escape') {
                closeMobileMenu();
            }
        });

        // Close menu on window resize to desktop size
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    }

    // Enhanced Platform Tabs for 2FA Section - FIXED
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    if (tabButtons.length > 0 && tabPanels.length > 0) {
        // Initialize first tab as active
        const firstTab = tabButtons[0];
        const firstPanel = document.getElementById(firstTab.dataset.platform + '-panel');
        
        if (firstTab && firstPanel) {
            firstTab.classList.add('active');
            firstTab.setAttribute('aria-selected', 'true');
            firstPanel.classList.add('active');
        }

        tabButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const platform = this.dataset.platform;
                
                if (!platform) {
                    console.warn('No platform data found for tab button');
                    return;
                }
                
                // Enhanced visual feedback
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 100);
                
                // Remove active state from all tabs
                tabButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.setAttribute('aria-selected', 'false');
                });
                
                tabPanels.forEach(panel => {
                    panel.classList.remove('active');
                    panel.style.opacity = '0';
                    panel.style.transform = 'translateY(10px)';
                });

                // Add active state to clicked tab
                this.classList.add('active');
                this.setAttribute('aria-selected', 'true');
                
                // Show corresponding panel with animation
                const targetPanel = document.getElementById(`${platform}-panel`);
                if (targetPanel) {
                    setTimeout(() => {
                        targetPanel.classList.add('active');
                        targetPanel.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                        targetPanel.style.opacity = '1';
                        targetPanel.style.transform = 'translateY(0)';
                    }, 150);
                    
                    console.log(`Switched to ${platform} platform`);
                } else {
                    console.warn(`Target panel for ${platform} not found`);
                }
            });

            // Enhanced keyboard navigation
            button.addEventListener('keydown', function(e) {
                const currentIndex = Array.from(tabButtons).indexOf(this);
                let targetIndex;

                switch(e.key) {
                    case 'ArrowLeft':
                        e.preventDefault();
                        targetIndex = currentIndex > 0 ? currentIndex - 1 : tabButtons.length - 1;
                        tabButtons[targetIndex].focus();
                        tabButtons[targetIndex].click();
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        targetIndex = currentIndex < tabButtons.length - 1 ? currentIndex + 1 : 0;
                        tabButtons[targetIndex].focus();
                        tabButtons[targetIndex].click();
                        break;
                    case 'Enter':
                    case ' ':
                        e.preventDefault();
                        this.click();
                        break;
                }
            });

            // Add enhanced hover effects
            button.addEventListener('mouseenter', function() {
                if (!this.classList.contains('active')) {
                    this.style.boxShadow = '0 0 20px rgba(6, 182, 212, 0.3)';
                    this.style.transform = 'translateY(-2px)';
                }
            });

            button.addEventListener('mouseleave', function() {
                if (!this.classList.contains('active')) {
                    this.style.boxShadow = '';
                    this.style.transform = 'translateY(0)';
                }
            });
        });
    }

    // Enhanced Accordion Functionality - FIXED
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    if (accordionItems.length > 0) {
        accordionItems.forEach((item, index) => {
            const header = item.querySelector('.accordion-header');
            const content = item.querySelector('.accordion-content');
            
            if (header && content) {
                // Set initial state properly
                header.setAttribute('aria-expanded', 'false');
                content.classList.remove('active');
                content.style.maxHeight = '0px';
                content.style.opacity = '0';
                content.style.paddingTop = '0px';
                content.style.paddingBottom = '0px';
                
                // Add staggered entrance animation
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 100);
                
                header.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const isExpanded = this.getAttribute('aria-expanded') === 'true';
                    
                    // Enhanced visual feedback
                    this.style.transform = 'scale(0.98)';
                    setTimeout(() => {
                        this.style.transform = 'scale(1)';
                    }, 100);
                    
                    // Close all other accordions
                    accordionItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            const otherHeader = otherItem.querySelector('.accordion-header');
                            const otherContent = otherItem.querySelector('.accordion-content');
                            
                            if (otherHeader && otherContent) {
                                otherHeader.setAttribute('aria-expanded', 'false');
                                otherContent.classList.remove('active');
                                otherContent.style.maxHeight = '0px';
                                otherContent.style.opacity = '0';
                                otherContent.style.paddingTop = '0px';
                                otherContent.style.paddingBottom = '0px';
                            }
                        }
                    });
                    
                    // Toggle current accordion
                    if (isExpanded) {
                        // Close
                        this.setAttribute('aria-expanded', 'false');
                        content.classList.remove('active');
                        content.style.maxHeight = '0px';
                        content.style.opacity = '0';
                        content.style.paddingTop = '0px';
                        content.style.paddingBottom = '0px';
                        console.log('Closed accordion:', header.querySelector('h3').textContent);
                    } else {
                        // Open
                        this.setAttribute('aria-expanded', 'true');
                        content.classList.add('active');
                        
                        // Calculate proper height
                        const tempMaxHeight = content.style.maxHeight;
                        const tempOpacity = content.style.opacity;
                        const tempPadding = content.style.padding;
                        
                        content.style.maxHeight = 'none';
                        content.style.opacity = '1';
                        content.style.paddingTop = '0px';
                        content.style.paddingBottom = '1.25rem';
                        
                        const height = content.scrollHeight;
                        
                        content.style.maxHeight = tempMaxHeight;
                        content.style.opacity = tempOpacity;
                        content.style.padding = tempPadding;
                        
                        // Trigger animation
                        requestAnimationFrame(() => {
                            content.style.maxHeight = (height + 20) + 'px';
                            content.style.opacity = '1';
                            content.style.paddingTop = '0px';
                            content.style.paddingBottom = '1.25rem';
                        });
                        
                        // Add cyber glow effect
                        item.style.boxShadow = '0 0 30px rgba(6, 182, 212, 0.2)';
                        setTimeout(() => {
                            item.style.boxShadow = '';
                        }, 1000);
                        
                        console.log('Opened accordion:', header.querySelector('h3').textContent);
                    }
                });

                // Enhanced keyboard support
                header.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.click();
                    }
                    if (e.key === 'Escape') {
                        this.setAttribute('aria-expanded', 'false');
                        content.classList.remove('active');
                        content.style.maxHeight = '0px';
                        content.style.opacity = '0';
                    }
                });

                // Enhanced hover effects
                header.addEventListener('mouseenter', function() {
                    this.style.backgroundColor = 'rgba(8, 145, 178, 0.1)';
                    this.style.transform = 'translateX(5px)';
                });

                header.addEventListener('mouseleave', function() {
                    this.style.backgroundColor = '';
                    this.style.transform = 'translateX(0)';
                });
            }
        });
        
        console.log(`✅ Initialized ${accordionItems.length} accordion items`);
    }

    // Enhanced Copy to Clipboard Functionality - FIXED
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    if (copyButtons.length > 0) {
        copyButtons.forEach(button => {
            button.addEventListener('click', async function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const textToCopy = this.dataset.copy;
                
                if (!textToCopy) {
                    console.warn('⚠️ No copy data found for button');
                    showCopyFeedback(this, 'No data to copy', 'error');
                    return;
                }
                
                // Enhanced button press animation
                this.style.transform = 'scale(0.95) rotateZ(-1deg)';
                setTimeout(() => {
                    this.style.transform = 'scale(1) rotateZ(0deg)';
                }, 150);
                
                try {
                    // Try modern clipboard API first
                    if (navigator.clipboard && window.isSecureContext) {
                        await navigator.clipboard.writeText(textToCopy);
                        showCopyFeedback(this, '✓ Copied!', 'success');
                        console.log('✅ Text copied to clipboard successfully');
                    } else {
                        // Enhanced fallback
                        const textArea = document.createElement('textarea');
                        textArea.value = textToCopy;
                        textArea.style.cssText = `
                            position: fixed;
                            left: -999999px;
                            top: -999999px;
                            opacity: 0;
                            pointer-events: none;
                            z-index: -1;
                        `;
                        document.body.appendChild(textArea);
                        textArea.focus();
                        textArea.select();
                        
                        const successful = document.execCommand('copy');
                        showCopyFeedback(this, successful ? '✓ Copied!' : '✗ Copy failed', successful ? 'success' : 'error');
                        
                        document.body.removeChild(textArea);
                        
                        if (successful) {
                            console.log('✅ Text copied using fallback method');
                        } else {
                            console.error('❌ Copy operation failed');
                        }
                    }
                } catch (err) {
                    console.error('❌ Copy failed:', err);
                    showCopyFeedback(this, '✗ Copy failed', 'error');
                }
            });

            // Enhanced hover effects
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 6px 20px rgba(16, 185, 129, 0.4)';
            });

            button.addEventListener('mouseleave', function() {
                if (!this.disabled) {
                    this.style.transform = 'translateY(0)';
                    this.style.boxShadow = '';
                }
            });
        });
        
        console.log(`✅ Initialized ${copyButtons.length} copy buttons`);
    }

    // Enhanced copy feedback function
    function showCopyFeedback(button, message, type = 'success') {
        const originalText = button.textContent;
        const originalStyles = {
            background: button.style.background,
            color: button.style.color,
            transform: button.style.transform,
            boxShadow: button.style.boxShadow
        };
        
        button.textContent = message;
        button.disabled = true;
        
        if (type === 'success') {
            button.style.background = 'linear-gradient(135deg, #10b981, #14b8a6)';
            button.style.color = 'white';
            button.style.boxShadow = '0 0 25px rgba(16, 185, 129, 0.6)';
        } else {
            button.style.background = 'linear-gradient(135deg, #dc2626, #ef4444)';
            button.style.color = 'white';
            button.style.boxShadow = '0 0 25px rgba(220, 38, 38, 0.6)';
        }
        
        // Enhanced animation
        button.style.transform = 'scale(0.95) rotateZ(1deg)';
        setTimeout(() => {
            button.style.transform = 'scale(1.05) rotateZ(-0.5deg)';
        }, 100);
        setTimeout(() => {
            button.style.transform = 'scale(1) rotateZ(0deg)';
        }, 200);
        
        // Add particle effect for success
        if (type === 'success') {
            createParticleEffect(button);
        }
        
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            Object.assign(button.style, originalStyles);
        }, 2500);
    }

    // Particle effect for successful actions
    function createParticleEffect(element) {
        const rect = element.getBoundingClientRect();
        const particles = 6;
        
        for (let i = 0; i < particles; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: linear-gradient(45deg, #10b981, #14b8a6);
                border-radius: 50%;
                pointer-events: none;
                z-index: 10000;
                left: ${rect.left + rect.width / 2}px;
                top: ${rect.top + rect.height / 2}px;
                box-shadow: 0 0 10px rgba(16, 185, 129, 0.8);
            `;
            
            document.body.appendChild(particle);
            
            const angle = (i * 60) * Math.PI / 180;
            const velocity = 30 + Math.random() * 20;
            const life = 1000;
            
            particle.animate([
                {
                    transform: 'translate(0, 0) scale(1)',
                    opacity: 1
                },
                {
                    transform: `translate(${Math.cos(angle) * velocity}px, ${Math.sin(angle) * velocity}px) scale(0)`,
                    opacity: 0
                }
            ], {
                duration: life,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
            }).onfinish = () => {
                document.body.removeChild(particle);
            };
        }
    }

    // Enhanced Smooth Scroll Navigation - FIXED
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    if (smoothScrollLinks.length > 0) {
        smoothScrollLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Skip empty or invalid hrefs
                if (!href || href === '#' || href.length <= 1) {
                    return;
                }
                
                e.preventDefault();
                e.stopPropagation();
                
                // Enhanced link press animation
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 100);
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const header = document.querySelector('.header');
                    const headerHeight = header ? header.offsetHeight : 80;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    // Smooth scroll with custom easing
                    smoothScrollTo(Math.max(0, targetPosition), 1000);
                    
                    // Add cyber glow to target section
                    targetElement.style.transition = 'box-shadow 0.5s ease';
                    targetElement.style.boxShadow = '0 0 30px rgba(6, 182, 212, 0.3)';
                    setTimeout(() => {
                        targetElement.style.boxShadow = '';
                    }, 2000);
                    
                    // Update active nav link
                    setTimeout(() => {
                        updateActiveNavLink();
                    }, 1100);
                    
                    console.log(`Navigated to section: ${targetId}`);
                } else {
                    console.warn(`⚠️ Target element with id "${targetId}" not found`);
                }
            });

            // Enhanced hover effects
            link.addEventListener('mouseenter', function() {
                this.style.textShadow = '0 0 10px rgba(6, 182, 212, 0.8)';
            });

            link.addEventListener('mouseleave', function() {
                this.style.textShadow = '';
            });
        });
        
        console.log(`✅ Initialized ${smoothScrollLinks.length} navigation links`);
    }

    // Custom smooth scroll function with cyberpunk easing
    function smoothScrollTo(targetPosition, duration) {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = cyberEase(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        // Custom cyberpunk easing function
        function cyberEase(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t * t + b;
            t -= 2;
            return c / 2 * (t * t * t + 2) + b;
        }

        requestAnimationFrame(animation);
    }

    // Enhanced Active Navigation Highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        if (sections.length === 0) return;
        
        let currentSection = '';
        const scrollPosition = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.id;
            }
        });

        // Enhanced logic for hero section
        if (scrollPosition < 300 && sections.length > 0) {
            currentSection = sections[0].id;
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${currentSection}`) {
                link.classList.add('active');
                // Add subtle cyber glow to active link
                link.style.textShadow = '0 0 10px rgba(6, 182, 212, 0.6)';
                setTimeout(() => {
                    if (!link.matches(':hover')) {
                        link.style.textShadow = '';
                    }
                }, 1000);
            }
        });
    }

    // Enhanced scroll effects with performance optimization
    let ticking = false;
    let lastScrollY = window.scrollY;
    
    function scrollHandler() {
        const currentScrollY = window.scrollY;
        
        if (!ticking) {
            requestAnimationFrame(() => {
                updateActiveNavLink();
                handleHeaderEffects(currentScrollY);
                handleScrollAnimations(currentScrollY);
                ticking = false;
            });
            ticking = true;
        }
        
        lastScrollY = currentScrollY;
    }

    // Enhanced header effects
    function handleHeaderEffects(scrollY) {
        const header = document.querySelector('.header');
        if (header) {
            if (scrollY > 100) {
                header.style.background = 'linear-gradient(135deg, rgba(10, 14, 39, 0.98) 0%, rgba(30, 58, 138, 0.95) 50%, rgba(15, 23, 42, 0.98) 100%)';
                header.style.boxShadow = '0 4px 40px rgba(30, 58, 138, 0.6)';
                header.style.backdropFilter = 'blur(25px)';
            } else {
                header.style.background = 'linear-gradient(135deg, rgba(10, 14, 39, 0.95) 0%, rgba(30, 58, 138, 0.85) 50%, rgba(15, 23, 42, 0.95) 100%)';
                header.style.boxShadow = '0 4px 32px rgba(30, 58, 138, 0.4)';
                header.style.backdropFilter = 'blur(20px)';
            }
        }
    }

    // Scroll-triggered animations
    function handleScrollAnimations(scrollY) {
        const animatedElements = document.querySelectorAll('.stat-item, .tool-card, .contact-card, .emergency-card');
        
        animatedElements.forEach((element, index) => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight - 150 && rect.bottom > 150;
            
            if (isVisible && !element.classList.contains('scroll-animated')) {
                element.classList.add('scroll-animated');
                element.style.opacity = '0';
                element.style.transform = 'translateY(50px) scale(0.9)';
                
                setTimeout(() => {
                    element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0) scale(1)';
                    
                    // Add entrance glow effect
                    element.style.boxShadow = '0 0 30px rgba(6, 182, 212, 0.3)';
                    setTimeout(() => {
                        element.style.boxShadow = '';
                    }, 800);
                }, index * 100);
            }
        });
    }

    // Attach scroll listener
    window.addEventListener('scroll', scrollHandler, { passive: true });

    // Initialize active nav link
    setTimeout(() => {
        updateActiveNavLink();
    }, 100);

    // Enhanced button and card effects
    function initializeEnhancedEffects() {
        // Enhanced button effects
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                // Ripple effect
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    pointer-events: none;
                    z-index: 1;
                `;
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                ripple.animate([
                    { transform: 'scale(0)', opacity: 1 },
                    { transform: 'scale(2)', opacity: 0 }
                ], {
                    duration: 600,
                    easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
                }).onfinish = () => {
                    ripple.remove();
                };
            });
        });

        // Enhanced card effects
        const cards = document.querySelectorAll('.tool-card, .contact-card, .emergency-card, .stat-item');
        cards.forEach((card, index) => {
            card.addEventListener('mouseenter', function() {
                this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                this.style.transform = 'translateY(-12px) scale(1.02)';
                this.style.zIndex = '10';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.zIndex = '';
            });
        });
    }

    // Enhanced accessibility
    function enhanceAccessibility() {
        // Create skip link
        const skipLink = document.createElement('a');
        skipLink.href = '#hero';
        skipLink.textContent = 'Skip to main content';
        skipLink.style.cssText = `
            position: absolute;
            top: -60px;
            left: 20px;
            background: linear-gradient(135deg, #10b981, #14b8a6);
            color: white;
            padding: 16px 20px;
            text-decoration: none;
            z-index: 10000;
            border-radius: 8px;
            font-weight: 600;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 0 30px rgba(16, 185, 129, 0.5);
        `;
        
        skipLink.addEventListener('focus', function() {
            this.style.top = '20px';
        });
        
        skipLink.addEventListener('blur', function() {
            this.style.top = '-60px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);

        // Enhanced focus management
        const focusableElements = document.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        focusableElements.forEach(element => {
            element.addEventListener('focus', function() {
                this.style.outline = '2px solid rgba(6, 182, 212, 0.8)';
                this.style.outlineOffset = '2px';
                this.style.boxShadow = '0 0 20px rgba(6, 182, 212, 0.4)';
            });

            element.addEventListener('blur', function() {
                this.style.outline = '';
                this.style.outlineOffset = '';
                if (!this.matches(':hover')) {
                    this.style.boxShadow = '';
                }
            });
        });
    }

    // Error handling and validation
    function validateCriticalElements() {
        const criticalSelectors = ['.header', '.hero', '#emergency', '#authenticator', '#tools', '#advanced', '#contact'];
        const missingElements = [];
        
        criticalSelectors.forEach(selector => {
            if (!document.querySelector(selector)) {
                missingElements.push(selector);
            }
        });
        
        if (missingElements.length > 0) {
            console.warn('⚠️ Missing critical elements:', missingElements);
            return false;
        }
        
        console.log('✅ All critical elements found');
        return true;
    }

    // Performance monitoring
    function monitorPerformance() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
                    console.log(`🚀 Page load time: ${loadTime}ms`);
                    
                    if (loadTime > 3000) {
                        console.warn('⚠️ Slow page load detected');
                    } else {
                        console.log('✅ Page load performance is good!');
                    }
                }, 100);
            });
        }
    }

    // Initialize everything
    try {
        const isValid = validateCriticalElements();
        
        if (isValid) {
            // Initialize with delays for smooth loading
            setTimeout(() => {
                initializeEnhancedEffects();
                enhanceAccessibility();
                monitorPerformance();
            }, 200);
            
            setTimeout(() => {
                handleScrollAnimations(window.scrollY);
            }, 400);
            
            console.log('🔐 TeNeT TechLab OPSEC Community - Fully Initialized');
            console.log('📊 Component Status:');
            console.log(`   🎯 Accordion items: ${accordionItems.length}`);
            console.log(`   🔄 Tab buttons: ${tabButtons.length}`);
            console.log(`   📋 Copy buttons: ${copyButtons.length}`);
            console.log(`   🔗 Navigation links: ${smoothScrollLinks.length}`);
            console.log(`   📱 Mobile menu: ${mobileMenuToggle ? 'Available' : 'Missing'}`);
            console.log('🚀 All cyberpunk features are operational!');
        } else {
            console.error('❌ Critical elements missing, some features may not work');
        }
    } catch (error) {
        console.error('❌ Initialization error:', error);
    }
});