// Enhanced TeNeT TechLab Cross-Platform Security Website
class CrossPlatformSecurityApp {
    constructor() {
        this.searchData = this.initializeSearchData();
        this.currentPlatform = 'android';
        this.initializeEventListeners();
        this.initializeAnimations();
        this.initializeInteractiveElements();
        this.initializeAccessibility();
        this.initializeCyberEffects();
        console.log('TeNeT TechLab Cross-Platform Security App initialized');
    }

    initializeSearchData() {
        return [
            {
                title: "Emergency Account Recovery",
                content: "Google account recovery g.co/recover, Apple ID recovery iforgot.apple.com",
                section: "emergency-recovery",
                keywords: ["emergency", "recovery", "hack", "hacked", "g.co/recover", "iforgot.apple.com", "recuperar", "emergencia", "apple id", "google account"]
            },
            {
                title: "Two-Factor Authentication Setup",
                content: "Google Authenticator, Apple built-in 2FA, security codes, backup codes",
                section: "authenticator-setup", 
                keywords: ["2fa", "two factor", "authenticator", "google", "apple", "security codes", "backup codes", "dos llaves", "autenticación"]
            },
            {
                title: "Password Manager - Android",
                content: "Google Password Manager configuration, Settings → Google → Autofill → Passwords",
                section: "security-tools",
                keywords: ["password", "manager", "google", "autofill", "android", "contraseñas", "caja fuerte", "chrome"]
            },
            {
                title: "Password Manager - iPhone",
                content: "iCloud Keychain setup, Settings → Passwords, Safari password manager",
                section: "security-tools",
                keywords: ["password", "manager", "icloud", "keychain", "iphone", "ios", "safari", "contraseñas", "apple"]
            },
            {
                title: "App Permissions - Android",
                content: "Android permission management, controlling app access to camera, microphone, location",
                section: "security-tools",
                keywords: ["permissions", "apps", "camera", "microphone", "location", "permisos", "android", "google"]
            },
            {
                title: "App Permissions - iPhone",
                content: "iOS permission management, Privacy & Security settings, app access control",
                section: "security-tools",
                keywords: ["permissions", "apps", "camera", "microphone", "location", "permisos", "ios", "iphone", "privacy", "security"]
            },
            {
                title: "Family Communication Messages",
                content: "Sample messages for explaining account breaches to family members",
                section: "emergency-recovery",
                keywords: ["family", "messages", "communication", "relationship", "familia", "mensajes", "whatsapp", "social media"]
            },
            {
                title: "Hardware Security Keys",
                content: "Physical keys for ultimate 2FA protection, YubiKey, Google Titan",
                section: "advanced-features",
                keywords: ["hardware", "security", "keys", "yubikey", "titan", "physical", "2fa", "advanced"]
            },
            {
                title: "Custom ROM Security",
                content: "GrapheneOS, LineageOS, /e/OS privacy-focused Android operating systems",
                section: "advanced-features",
                keywords: ["custom", "rom", "grapheneos", "lineageos", "privacy", "android", "advanced", "root"]
            }
        ];
    }

    initializeEventListeners() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.scrollToSection(targetId);
            });
        });

        // Platform tab switching - Fixed for proper iOS switching
        document.querySelectorAll('.tab-button').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const buttonText = e.currentTarget.textContent.toLowerCase();
                const platform = buttonText.includes('android') || buttonText.includes('🤖') ? 'android' : 'ios';
                this.switchPlatform(platform, e.currentTarget);
            });
        });

        // Mini tab switching for tools - Fixed
        document.querySelectorAll('.mini-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                const platform = e.currentTarget.textContent.includes('🤖') ? 'android' : 'ios';
                this.switchMiniTab(platform, tab);
            });
        });

        // Guide tab switching - Fixed
        document.querySelectorAll('.guide-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                const platform = e.currentTarget.textContent.toLowerCase().includes('android') ? 'android' : 'ios';
                this.switchGuideTab(platform, tab);
            });
        });

        // Expand/collapse functionality - Fixed to work with onclick attributes
        document.querySelectorAll('.expand-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Extract target from onclick attribute or data-target
                let targetId = button.getAttribute('data-target');
                if (!targetId && button.getAttribute('onclick')) {
                    const onclickMatch = button.getAttribute('onclick').match(/['"]([^'"]+)['"]/);
                    if (onclickMatch) {
                        targetId = onclickMatch[1];
                    }
                }
                
                if (targetId) {
                    this.toggleDetails(targetId, button);
                }
            });
        });

        // Copy message functionality - Fixed
        document.querySelectorAll('.copy-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Extract message type from onclick attribute
                let messageType = 'message';
                if (button.getAttribute('onclick')) {
                    const onclickMatch = button.getAttribute('onclick').match(/['"]([^'"]+)['"].*['"]([^'"]+)['"]/);
                    if (onclickMatch && onclickMatch[2]) {
                        messageType = onclickMatch[2];
                    }
                }
                
                this.copyMessage(button, messageType);
            });
        });

        // Search functionality
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.performSearch(e.target.value);
            });
            
            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.toggleSearch();
                }
            });
        }

        // Mobile menu toggle
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        if (mobileToggle) {
            mobileToggle.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleMobileMenu();
            });
        }

        // FAB search button
        const fab = document.querySelector('.fab');
        if (fab) {
            fab.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleSearch();
            });
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case 'k':
                    case '/':
                        e.preventDefault();
                        this.toggleSearch();
                        break;
                }
            }
            
            if (e.key === 'Escape') {
                const searchOverlay = document.getElementById('searchOverlay');
                if (searchOverlay && !searchOverlay.classList.contains('hidden')) {
                    this.toggleSearch();
                }
            }
        });

        // Intersection Observer for scroll animations
        this.initializeScrollAnimations();
    }

    // Platform switching functionality - Fixed for proper content switching
    switchPlatform(platform, button) {
        console.log(`Switching to platform: ${platform}`);
        
        // Update button states in the same tab group
        const tabGroup = button.parentElement;
        if (tabGroup && tabGroup.classList.contains('platform-tabs')) {
            tabGroup.querySelectorAll('.tab-button').forEach(btn => {
                btn.classList.remove('active');
            });
            button.classList.add('active');
        }

        // Find the section containing these tabs
        const section = button.closest('section');
        if (!section) {
            console.error('Could not find parent section for platform tabs');
            return;
        }

        // Show/hide platform content based on platform
        const platformContents = section.querySelectorAll('.platform-content');
        console.log(`Found ${platformContents.length} platform content elements`);
        
        platformContents.forEach(content => {
            content.classList.remove('active');
            
            // Check if this content matches the selected platform
            const contentId = content.id;
            console.log(`Checking content ID: ${contentId} for platform: ${platform}`);
            
            if ((platform === 'android' && (contentId.includes('android') || contentId.includes('Android'))) ||
                (platform === 'ios' && (contentId.includes('ios') || contentId.includes('iOS')))) {
                content.classList.add('active');
                console.log(`Activated content: ${contentId}`);
            }
        });

        // Update current platform
        this.currentPlatform = platform;
        this.announceToScreenReader(`Switched to ${platform === 'ios' ? 'iPhone' : 'Android'} instructions`);

        // Add cyber effect
        this.addCyberEffect(button);
    }

    switchMiniTab(platform, button) {
        console.log(`Switching mini tab to: ${platform}`);
        
        // Update mini tab states
        const container = button.closest('.tool-card');
        if (container) {
            container.querySelectorAll('.mini-tab').forEach(tab => {
                tab.classList.remove('active');
            });
            button.classList.add('active');

            // Show/hide mini platform content
            container.querySelectorAll('.mini-platform-content').forEach(content => {
                content.classList.remove('active');
                if (content.id.includes(platform)) {
                    content.classList.add('active');
                }
            });
        }

        this.addCyberEffect(button);
    }

    switchGuideTab(platform, button) {
        console.log(`Switching guide tab to: ${platform}`);
        
        // Update guide tab states
        const container = button.closest('.detailed-guide');
        if (container) {
            container.querySelectorAll('.guide-tab').forEach(tab => {
                tab.classList.remove('active');
            });
            button.classList.add('active');

            // Show/hide guide content
            container.querySelectorAll('.guide-content').forEach(content => {
                content.classList.remove('active');
                const contentId = content.id;
                if ((platform === 'android' && contentId.includes('android')) ||
                    (platform === 'ios' && contentId.includes('ios'))) {
                    content.classList.add('active');
                }
            });
        }

        this.addCyberEffect(button);
    }

    toggleMobileMenu() {
        const navMenu = document.querySelector('.nav-menu');
        const toggle = document.querySelector('.mobile-menu-toggle');
        
        if (navMenu && toggle) {
            navMenu.classList.toggle('active');
            
            // Update toggle text
            if (navMenu.classList.contains('active')) {
                toggle.innerHTML = '✕';
                this.announceToScreenReader('Menu opened');
            } else {
                toggle.innerHTML = '☰';
                this.announceToScreenReader('Menu closed');
            }
        }
    }

    toggleDetails(targetId, button) {
        console.log(`Toggling details for: ${targetId}`);
        
        let detailsElement = document.getElementById(targetId);
        
        // If not found by ID, try to find in hidden-details section
        if (!detailsElement) {
            detailsElement = document.querySelector(`.detail-content[id="${targetId}"]`);
        }
        
        // If still not found, try to find the next sibling with details class
        if (!detailsElement) {
            detailsElement = button.parentElement.querySelector('.tool-details, .advanced-details');
        }
        
        if (detailsElement) {
            const isHidden = detailsElement.classList.contains('hidden');
            
            if (isHidden) {
                detailsElement.classList.remove('hidden');
                
                // Update button text intelligently
                const buttonText = button.textContent;
                if (buttonText.includes('Expand')) {
                    button.textContent = buttonText.replace('Expand', 'Collapse');
                } else if (buttonText.includes('Show')) {
                    button.textContent = buttonText.replace('Show', 'Hide');
                } else if (buttonText.includes('Learn More')) {
                    button.textContent = buttonText.replace('Learn More', 'Show Less');
                }
                
                button.setAttribute('aria-expanded', 'true');
                
                // Add cyber effect
                this.addCyberEffect(button);
                
                // Smooth scroll to show the expanded content
                setTimeout(() => {
                    detailsElement.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'nearest' 
                    });
                }, 200);
                
                this.announceToScreenReader('Section expanded');
            } else {
                detailsElement.classList.add('hidden');
                
                // Update button text intelligently
                const buttonText = button.textContent;
                if (buttonText.includes('Collapse')) {
                    button.textContent = buttonText.replace('Collapse', 'Expand');
                } else if (buttonText.includes('Hide')) {
                    button.textContent = buttonText.replace('Hide', 'Show');
                } else if (buttonText.includes('Show Less')) {
                    button.textContent = buttonText.replace('Show Less', 'Learn More');
                }
                
                button.setAttribute('aria-expanded', 'false');
                this.announceToScreenReader('Section collapsed');
            }
        } else {
            console.error(`Could not find details element for: ${targetId}`);
        }
    }

    copyMessage(button, messageType) {
        const messageTemplate = button.closest('.message-template');
        if (!messageTemplate) {
            console.error('Could not find message template');
            return;
        }
        
        const messageTextElement = messageTemplate.querySelector('.message-text');
        if (!messageTextElement) {
            console.error('Could not find message text element');
            return;
        }
        
        const messageText = messageTextElement.textContent.trim();
        
        // Try to copy to clipboard
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(messageText).then(() => {
                this.showCopySuccess(button);
            }).catch(() => {
                this.fallbackCopy(messageText, button);
            });
        } else {
            this.fallbackCopy(messageText, button);
        }
    }

    fallbackCopy(text, button) {
        // Fallback copy method for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                this.showCopySuccess(button);
            } else {
                this.showCopyFailure(button);
            }
        } catch (err) {
            console.log('Copy failed:', err);
            this.showCopyFailure(button);
        } finally {
            textArea.remove();
        }
    }

    showCopySuccess(button) {
        const originalText = button.textContent;
        button.textContent = '✅ Copied!';
        button.style.background = 'rgba(0, 255, 136, 0.3)';
        button.style.borderColor = '#00ff88';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
            button.style.borderColor = '';
        }, 2000);
        
        this.announceToScreenReader('Message copied to clipboard');
    }

    showCopyFailure(button) {
        const originalText = button.textContent;
        button.textContent = '❌ Copy Failed';
        button.style.background = 'rgba(255, 84, 89, 0.3)';
        button.style.borderColor = '#ff5459';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
            button.style.borderColor = '';
        }, 3000);
        
        this.announceToScreenReader('Copy failed - please select and copy manually');
    }

    scrollToSection(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            const headerHeight = document.querySelector('.cyber-header').offsetHeight;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerHeight - 20;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Update URL without triggering page reload
            history.pushState(null, null, `#${sectionId}`);
            
            // Add visual highlight to section
            this.highlightSection(element);
            
            // Announce to screen readers
            this.announceToScreenReader(`Navigated to ${sectionId.replace(/-/g, ' ')} section`);
        }
    }

    highlightSection(element) {
        element.style.boxShadow = '0 0 40px rgba(0, 255, 136, 0.4)';
        element.style.transition = 'box-shadow 0.5s ease-in-out';
        
        setTimeout(() => {
            element.style.boxShadow = '';
        }, 2000);
    }

    // Search functionality
    toggleSearch() {
        const searchOverlay = document.getElementById('searchOverlay');
        const searchInput = document.getElementById('searchInput');
        
        if (searchOverlay) {
            const isHidden = searchOverlay.classList.contains('hidden');
            
            if (isHidden) {
                searchOverlay.classList.remove('hidden');
                if (searchInput) {
                    setTimeout(() => searchInput.focus(), 100);
                }
                this.announceToScreenReader('Search opened');
            } else {
                searchOverlay.classList.add('hidden');
                if (searchInput) {
                    searchInput.value = '';
                    this.clearSearchResults();
                }
                this.announceToScreenReader('Search closed');
            }
        }
    }

    performSearch(query) {
        const searchResults = document.getElementById('searchResults');
        if (!searchResults) return;

        if (query.length < 2) {
            this.clearSearchResults();
            return;
        }

        const results = this.searchData.filter(item => {
            const searchText = `${item.title} ${item.content} ${item.keywords.join(' ')}`.toLowerCase();
            return searchText.includes(query.toLowerCase());
        });

        this.displaySearchResults(results, query);
    }

    displaySearchResults(results, query) {
        const searchResults = document.getElementById('searchResults');
        
        if (results.length === 0) {
            searchResults.innerHTML = `
                <div class="search-result">
                    <h4>No results found</h4>
                    <p>Try searching for: emergency, recovery, 2FA, authenticator, password manager, permissions, or advanced</p>
                </div>
            `;
            return;
        }

        searchResults.innerHTML = results.map(result => `
            <div class="search-result" onclick="window.cyberApp.navigateToResult('${result.section}')">
                <h4>${this.highlightSearchTerms(result.title, query)}</h4>
                <p>${this.highlightSearchTerms(result.content, query)}</p>
            </div>
        `).join('');

        this.announceToScreenReader(`${results.length} search results found`);
    }

    highlightSearchTerms(text, query) {
        const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        return text.replace(regex, '<mark style="background-color: rgba(0, 255, 136, 0.4); color: #00ff88; padding: 2px 4px; border-radius: 3px;">$1</mark>');
    }

    navigateToResult(sectionId) {
        this.toggleSearch();
        setTimeout(() => {
            this.scrollToSection(sectionId);
        }, 300);
    }

    clearSearchResults() {
        const searchResults = document.getElementById('searchResults');
        if (searchResults) {
            searchResults.innerHTML = '';
        }
    }

    // Animation and visual effects
    initializeAnimations() {
        // Stagger loading animations
        this.staggerElementAnimations();
        
        // Initialize particle interactions
        this.initializeParticleInteractions();
        
        // Logo assembly animation on page load
        setTimeout(() => {
            this.triggerLogoAnimation();
        }, 500);
    }

    staggerElementAnimations() {
        // Stagger stat items
        const statItems = document.querySelectorAll('.stat-item');
        statItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
                item.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
            }, 300 + (index * 200));
        });

        // Stagger tool cards
        const toolCards = document.querySelectorAll('.tool-card, .advanced-card');
        toolCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(40px)';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                card.style.transition = 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1)';
            }, 600 + (index * 150));
        });
    }

    triggerLogoAnimation() {
        const logoContainer = document.querySelector('.logo-animation, .logo-animation-large');
        if (logoContainer) {
            logoContainer.style.opacity = '0';
            setTimeout(() => {
                logoContainer.style.opacity = '1';
                logoContainer.style.transition = 'opacity 0.6s ease-in-out';
            }, 100);
        }
    }

    initializeParticleInteractions() {
        const particles = document.querySelectorAll('.particle');
        
        // Add mouse interaction to particles
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            particles.forEach((particle, index) => {
                const delay = index * 100;
                const moveX = (mouseX - 0.5) * 20;
                const moveY = (mouseY - 0.5) * 20;
                
                setTimeout(() => {
                    particle.style.transform = `translate(${moveX}px, ${moveY}px)`;
                }, delay);
            });
        });

        // Reset particles when mouse leaves
        document.addEventListener('mouseleave', () => {
            particles.forEach(particle => {
                particle.style.transform = '';
            });
        });
    }

    initializeScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Add special effects for priority sections
                    if (entry.target.classList.contains('priority-section')) {
                        this.addPrioritySectionEffect(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Observe elements for scroll animations
        const animatableElements = document.querySelectorAll(`
            .step-card, .reassurance-card, .priority-item, 
            .message-template, .setup-option, .advanced-card
        `);
        
        animatableElements.forEach(el => {
            observer.observe(el);
        });

        // Add CSS for scroll animations if not already present
        this.addScrollAnimationStyles();
    }

    addScrollAnimationStyles() {
        if (document.querySelector('#scroll-animations')) return;
        
        const style = document.createElement('style');
        style.id = 'scroll-animations';
        style.textContent = `
            .step-card, .reassurance-card, .priority-item, 
            .message-template, .setup-option, .advanced-card {
                opacity: 0;
                transform: translateY(40px);
                transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
            }
            .step-card.animate-in, .reassurance-card.animate-in, 
            .priority-item.animate-in, .message-template.animate-in, 
            .setup-option.animate-in, .advanced-card.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
    }

    addPrioritySectionEffect(section) {
        const sectionTitle = section.querySelector('.section-title');
        if (sectionTitle) {
            sectionTitle.style.animation = 'titleGlow 2s ease-in-out';
            
            // Add glow keyframes if not already present
            if (!document.querySelector('#title-glow-animation')) {
                const style = document.createElement('style');
                style.id = 'title-glow-animation';
                style.textContent = `
                    @keyframes titleGlow {
                        0%, 100% { text-shadow: 0 0 20px rgba(0, 255, 136, 0.7); }
                        50% { text-shadow: 0 0 40px rgba(0, 255, 136, 1), 0 0 60px rgba(0, 255, 136, 0.8); }
                    }
                `;
                document.head.appendChild(style);
            }
        }
    }

    // Interactive elements and effects
    initializeInteractiveElements() {
        // Enhanced hover effects for cyber elements
        document.querySelectorAll('.cyber-card, .btn--cyber, .tab-button').forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                this.addHoverEffect(e.target);
            });
            
            element.addEventListener('mouseleave', (e) => {
                this.removeHoverEffect(e.target);
            });
        });

        // Click effects for buttons
        document.querySelectorAll('.btn--cyber, .tab-button, .contact-link').forEach(button => {
            button.addEventListener('click', (e) => {
                this.createClickRipple(e, button);
            });
        });

        // Phone mockup interactions
        this.initializePhoneMockups();
        
        // Priority section special effects
        this.initializePriorityEffects();
    }

    initializePhoneMockups() {
        const phoneMockups = document.querySelectorAll('.phone-mockup');
        
        phoneMockups.forEach(phone => {
            phone.addEventListener('click', () => {
                this.animatePhoneScreen(phone);
            });
            
            // Add floating animation
            phone.style.animation = 'phoneFloat 6s ease-in-out infinite';
        });
        
        // Add phone floating animation
        this.addPhoneAnimationStyles();
    }

    animatePhoneScreen(phone) {
        const screen = phone.querySelector('.screen');
        const steps = phone.querySelectorAll('.step-dot');
        
        if (screen && steps.length > 0) {
            // Animate screen flash
            screen.style.background = 'linear-gradient(135deg, #00ff88 0%, #88ffcc 100%)';
            screen.style.transition = 'background 0.3s ease-in-out';
            
            // Animate step dots
            steps.forEach((dot, index) => {
                setTimeout(() => {
                    dot.classList.add('active');
                }, index * 200);
            });
            
            // Reset after animation
            setTimeout(() => {
                screen.style.background = '';
                steps.forEach(dot => {
                    dot.classList.remove('active');
                });
                steps[0].classList.add('active'); // Keep first one active
            }, 2000);
        }
    }

    addPhoneAnimationStyles() {
        if (document.querySelector('#phone-animations')) return;
        
        const style = document.createElement('style');
        style.id = 'phone-animations';
        style.textContent = `
            @keyframes phoneFloat {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
            }
        `;
        document.head.appendChild(style);
    }

    initializePriorityEffects() {
        const prioritySections = document.querySelectorAll('.priority-section');
        
        prioritySections.forEach(section => {
            // Add subtle glow effect
            section.addEventListener('mouseenter', () => {
                section.style.boxShadow = '0 0 50px rgba(0, 255, 136, 0.1)';
                section.style.transition = 'box-shadow 0.5s ease-in-out';
            });
            
            section.addEventListener('mouseleave', () => {
                section.style.boxShadow = '';
            });
        });
    }

    // Cyber effects
    initializeCyberEffects() {
        // Add glitch effect to main titles occasionally
        setInterval(() => {
            this.addRandomGlitchEffect();
        }, 15000); // Every 15 seconds
        
        // Add circuit board pulse effect
        this.initializeCircuitEffect();
    }

    addRandomGlitchEffect() {
        const titles = document.querySelectorAll('.neon-text, .brand-name, .brand-name-large');
        const randomTitle = titles[Math.floor(Math.random() * titles.length)];
        
        if (randomTitle) {
            randomTitle.style.animation = 'glitchEffect 0.3s ease-in-out';
            
            setTimeout(() => {
                randomTitle.style.animation = '';
            }, 300);
        }
        
        // Add glitch effect styles if not present
        this.addGlitchEffectStyles();
    }

    addGlitchEffectStyles() {
        if (document.querySelector('#glitch-effects')) return;
        
        const style = document.createElement('style');
        style.id = 'glitch-effects';
        style.textContent = `
            @keyframes glitchEffect {
                0% { transform: translateX(0); }
                20% { transform: translateX(-2px) skewX(1deg); }
                40% { transform: translateX(2px) skewX(-1deg); }
                60% { transform: translateX(-1px) skewX(0.5deg); }
                80% { transform: translateX(1px) skewX(-0.5deg); }
                100% { transform: translateX(0); }
            }
        `;
        document.head.appendChild(style);
    }

    initializeCircuitEffect() {
        const circuitOverlay = document.querySelector('.circuit-overlay');
        if (circuitOverlay) {
            // Add pulsing effect based on user interaction
            let interactionTimeout;
            
            document.addEventListener('click', () => {
                circuitOverlay.style.opacity = '0.8';
                circuitOverlay.style.backgroundSize = '80px 80px';
                
                clearTimeout(interactionTimeout);
                interactionTimeout = setTimeout(() => {
                    circuitOverlay.style.opacity = '';
                    circuitOverlay.style.backgroundSize = '';
                }, 1000);
            });
        }
    }

    addCyberEffect(element) {
        element.style.boxShadow = '0 0 25px rgba(0, 255, 136, 0.7)';
        element.style.borderColor = '#00ff88';
        element.style.transform = 'scale(1.02)';
        
        setTimeout(() => {
            element.style.boxShadow = '';
            element.style.borderColor = '';
            element.style.transform = '';
        }, 1000);
    }

    addHoverEffect(element) {
        const rect = element.getBoundingClientRect();
        const ripple = document.createElement('div');
        ripple.className = 'hover-ripple';
        ripple.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, transparent, rgba(0, 255, 136, 0.1), transparent);
            pointer-events: none;
            animation: rippleEffect 0.8s ease-out;
            border-radius: inherit;
        `;
        
        element.style.position = 'relative';
        element.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 800);
    }

    removeHoverEffect(element) {
        // Cleanup is handled by setTimeout in addHoverEffect
    }

    createClickRipple(event, button) {
        const rect = button.getBoundingClientRect();
        const ripple = document.createElement('div');
        const size = Math.max(rect.width, rect.height) * 1.5;
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(0, 255, 136, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: clickRipple 0.8s ease-out;
            pointer-events: none;
            z-index: 1;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        // Add ripple animation styles if not present
        this.addRippleEffectStyles();
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 800);
    }

    addRippleEffectStyles() {
        if (document.querySelector('#ripple-effects')) return;
        
        const style = document.createElement('style');
        style.id = 'ripple-effects';
        style.textContent = `
            @keyframes rippleEffect {
                0% { opacity: 0; transform: scale(0.3); }
                50% { opacity: 1; }
                100% { opacity: 0; transform: scale(2); }
            }
            @keyframes clickRipple {
                0% { transform: scale(0); opacity: 0.8; }
                100% { transform: scale(2); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    // Accessibility features
    initializeAccessibility() {
        // Enhanced keyboard navigation
        document.querySelectorAll('.expand-btn, .contact-link, .recovery-link-large, .copy-btn, .tab-button, .mini-tab').forEach(element => {
            element.setAttribute('tabindex', '0');
            
            element.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    element.click();
                }
            });
        });

        // ARIA labels and descriptions
        this.setupAriaLabels();
        
        // Focus management for modals and overlays
        this.setupFocusManagement();
        
        // Screen reader announcements for dynamic content
        this.setupScreenReaderSupport();
    }

    setupAriaLabels() {
        // Tool cards
        document.querySelectorAll('.tool-card').forEach((card, index) => {
            const toolName = card.querySelector('h3')?.textContent || `Security tool ${index + 1}`;
            card.setAttribute('aria-label', `Security tool: ${toolName}`);
            card.setAttribute('role', 'article');
        });

        // Platform tabs
        document.querySelectorAll('.tab-button').forEach(tab => {
            const platform = tab.textContent.toLowerCase().includes('android') || tab.textContent.includes('🤖') ? 'Android' : 'iPhone';
            tab.setAttribute('aria-label', `Switch to ${platform} instructions`);
            tab.setAttribute('role', 'tab');
        });

        // Expandable buttons
        document.querySelectorAll('.expand-btn').forEach(button => {
            button.setAttribute('aria-expanded', 'false');
        });
    }

    setupFocusManagement() {
        const searchOverlay = document.getElementById('searchOverlay');
        if (searchOverlay) {
            searchOverlay.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    this.trapFocus(e, searchOverlay);
                }
            });
        }
    }

    trapFocus(event, container) {
        const focusableElements = container.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];
        
        if (event.shiftKey) {
            if (document.activeElement === firstFocusable) {
                event.preventDefault();
                lastFocusable.focus();
            }
        } else {
            if (document.activeElement === lastFocusable) {
                event.preventDefault();
                firstFocusable.focus();
            }
        }
    }

    setupScreenReaderSupport() {
        // Live region for announcements
        if (!document.getElementById('sr-live-region')) {
            const liveRegion = document.createElement('div');
            liveRegion.id = 'sr-live-region';
            liveRegion.setAttribute('aria-live', 'polite');
            liveRegion.setAttribute('aria-atomic', 'true');
            liveRegion.className = 'sr-only';
            document.body.appendChild(liveRegion);
        }
    }

    announceToScreenReader(message) {
        const liveRegion = document.getElementById('sr-live-region');
        if (liveRegion) {
            liveRegion.textContent = message;
            
            // Clear after announcement
            setTimeout(() => {
                liveRegion.textContent = '';
            }, 1000);
        }
    }

    // Utility methods
    handleResponsiveDesign() {
        // Mobile-specific optimizations
        if (window.innerWidth <= 768) {
            this.optimizeForMobile();
        }
        
        // Handle orientation changes
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.recalculateLayout();
            }, 100);
        });
    }

    optimizeForMobile() {
        // Reduce particle count on mobile
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            if (index > 2) {
                particle.style.display = 'none';
            }
        });
        
        // Adjust animation durations
        document.documentElement.style.setProperty('--duration-fast', '100ms');
        document.documentElement.style.setProperty('--duration-normal', '200ms');
    }

    recalculateLayout() {
        // Force layout recalculation after orientation change
        document.body.style.height = 'auto';
        setTimeout(() => {
            document.body.style.height = '';
        }, 50);
    }

    // Debug and utility methods
    exportUserProgress() {
        // Could implement progress tracking in the future
        return {
            currentPlatform: this.currentPlatform,
            timestamp: new Date().toISOString()
        };
    }

    getSystemInfo() {
        return {
            platform: this.currentPlatform,
            userAgent: navigator.userAgent,
            screenSize: `${window.innerWidth}x${window.innerHeight}`,
            timestamp: new Date().toISOString()
        };
    }
}

// Global functions for HTML event handlers (maintained for backward compatibility)
window.switchPlatform = function(platform, button) {
    if (window.cyberApp) {
        window.cyberApp.switchPlatform(platform, button);
    }
};

window.switchMiniTab = function(targetClass, button) {
    if (window.cyberApp) {
        const platform = targetClass.includes('android') ? 'android' : 'ios';
        window.cyberApp.switchMiniTab(platform, button);
    }
};

window.switchGuideTab = function(targetClass, button) {
    if (window.cyberApp) {
        const platform = targetClass.includes('android') ? 'android' : 'ios';
        window.cyberApp.switchGuideTab(platform, button);
    }
};

window.toggleDetails = function(targetId) {
    if (window.cyberApp && event && event.target) {
        window.cyberApp.toggleDetails(targetId, event.target);
    }
};

window.copyMessage = function(button, messageType) {
    if (window.cyberApp) {
        window.cyberApp.copyMessage(button, messageType);
    }
};

window.scrollToSection = function(sectionId) {
    if (window.cyberApp) {
        window.cyberApp.scrollToSection(sectionId);
    }
};

window.toggleSearch = function() {
    if (window.cyberApp) {
        window.cyberApp.toggleSearch();
    }
};

window.toggleMobileMenu = function() {
    if (window.cyberApp) {
        window.cyberApp.toggleMobileMenu();
    }
};

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add loading transition
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.6s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
        
        // Initialize the main application
        window.cyberApp = new CrossPlatformSecurityApp();
        
        // Add keyboard shortcut help with more prominent search reminder
        const helpInfo = document.createElement('div');
        helpInfo.className = 'keyboard-help';
        helpInfo.innerHTML = `
            <div style="position: fixed; bottom: 12px; left: 12px; background: rgba(0, 255, 136, 0.15); 
                       border: 2px solid rgba(0, 255, 136, 0.4); border-radius: 10px; padding: 12px; 
                       font-size: 11px; color: var(--color-text-secondary); z-index: 1000; max-width: 200px;">
                <div style="color: #00ff88; font-weight: 600; margin-bottom: 6px;">⌨️ Quick Access</div>
                <div>Press <kbd style="background: rgba(0, 255, 136, 0.3); padding: 2px 6px; border-radius: 4px; color: #00ff88; font-weight: bold;">Ctrl+K</kbd> to search</div>
                <div style="margin-top: 4px;">Or click the 🔍 button (bottom right)</div>
            </div>
        `;
        
        document.body.appendChild(helpInfo);
        
        // Auto-hide help after 7 seconds
        setTimeout(() => {
            helpInfo.style.opacity = '0';
            helpInfo.style.transition = 'opacity 1.5s ease-out';
            setTimeout(() => helpInfo.remove(), 1500);
        }, 7000);
        
        console.log('🚀 TeNeT TechLab Cross-Platform Security Website loaded successfully');
        console.log('🔧 Features: Emergency Recovery (PRIORITY), 2FA Setup (PRIORITY), Cross-platform tools');
        console.log('📱 Platforms: Android & iOS support with proper tab switching');
        console.log('🔍 Search: Ctrl+K or FAB button for instant search');
        console.log('🎯 Focus: Emergency recovery and authenticator setup for maximum impact');
        
        // Handle deep links
        if (window.location.hash) {
            const sectionId = window.location.hash.substring(1);
            setTimeout(() => {
                window.cyberApp.scrollToSection(sectionId);
            }, 1500);
        }
        
    }, 300);
});

// Handle browser navigation
window.addEventListener('popstate', () => {
    if (window.location.hash && window.cyberApp) {
        const sectionId = window.location.hash.substring(1);
        window.cyberApp.scrollToSection(sectionId);
    }
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    const particles = document.querySelectorAll('.particle');
    const logoAnimations = document.querySelectorAll('.logo-part, .logo-part-large');
    
    if (document.hidden) {
        particles.forEach(particle => {
            particle.style.animationPlayState = 'paused';
        });
        logoAnimations.forEach(logo => {
            logo.style.animationPlayState = 'paused';
        });
    } else {
        particles.forEach(particle => {
            particle.style.animationPlayState = 'running';
        });
        logoAnimations.forEach(logo => {
            logo.style.animationPlayState = 'running';
        });
    }
});

// Handle window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (window.cyberApp) {
            window.cyberApp.handleResponsiveDesign();
        }
    }, 250);
});

// Performance monitoring
window.addEventListener('load', () => {
    if (performance.now) {
        console.log(`⚡ Page loaded in ${Math.round(performance.now())}ms`);
    }
});

// Export for debugging and external access
window.CrossPlatformSecurityApp = CrossPlatformSecurityApp;