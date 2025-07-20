
// TeNeT TechLabs Android Security Presentation
// Interactive JavaScript functionality
// Updated with navigation fixes

class AndroidSecurityPresentation {
    constructor() {
        this.currentSlideIndex = 0;
        this.totalSlides = 7;
        this.slides = [];
        this.timer = null;
        this.timerStartTime = null;
        this.isTimerRunning = false;

        this.init();
    }

    init() {
        this.setupElements();
        this.setupEventListeners();
        this.setupKeyboardNavigation();
        this.showSlide(0);
        this.updateSlideCounter();
    }

    setupElements() {
        // Get all slides
        this.slides = document.querySelectorAll('.slide');

        // Navigation elements
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.slideCounter = document.getElementById('slideCounter');
        this.timerDisplay = document.getElementById('timer');
        this.toggleNotesBtn = document.getElementById('toggleNotes');

        // Verify elements exist
        if (!this.slides.length) {
            console.error('No slides found');
            return;
        }

        console.log(`Initialized presentation with ${this.slides.length} slides`);
    }

    setupEventListeners() {
        // Navigation buttons
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.previousSlide());
        }

        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }

        // Timer toggle
        if (this.timerDisplay) {
            this.timerDisplay.addEventListener('click', () => this.toggleTimer());
        }

        // Notes toggle (if present)
        if (this.toggleNotesBtn) {
            this.toggleNotesBtn.addEventListener('click', () => this.toggleSpeakerNotes());
        }

        // Touch/swipe events for mobile
        this.setupTouchEvents();
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowLeft':
                case 'ArrowUp':
                    e.preventDefault();
                    this.previousSlide();
                    break;

                case 'ArrowRight':
                case 'ArrowDown':
                case ' ': // Space bar
                    e.preventDefault();
                    this.nextSlide();
                    break;

                case 'Home':
                    e.preventDefault();
                    this.goToSlide(0);
                    break;

                case 'End':
                    e.preventDefault();
                    this.goToSlide(this.totalSlides - 1);
                    break;

                case 'f':
                case 'F':
                    e.preventDefault();
                    this.toggleFullscreen();
                    break;

                case 't':
                case 'T':
                    e.preventDefault();
                    this.toggleTimer();
                    break;

                case 'Escape':
                    if (document.fullscreenElement) {
                        document.exitFullscreen();
                    }
                    break;
            }
        });
    }

    setupTouchEvents() {
        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;

        const presentationMain = document.querySelector('.presentation-main');
        if (!presentationMain) return;

        presentationMain.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: true });

        presentationMain.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            this.handleSwipe(startX, startY, endX, endY);
        }, { passive: true });
    }

    handleSwipe(startX, startY, endX, endY) {
        const deltaX = endX - startX;
        const deltaY = endY - startY;
        const minSwipeDistance = 50;

        // Check if horizontal swipe is significant
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
            if (deltaX > 0) {
                // Swipe right - previous slide
                this.previousSlide();
            } else {
                // Swipe left - next slide  
                this.nextSlide();
            }
        }
    }

    showSlide(index) {
        // Validate index
        if (index < 0 || index >= this.totalSlides) {
            console.warn(`Invalid slide index: ${index}`);
            return;
        }

        // Hide all slides
        this.slides.forEach(slide => {
            slide.classList.remove('active');
        });

        // Show target slide
        if (this.slides[index]) {
            this.slides[index].classList.add('active');
            this.currentSlideIndex = index;
            this.updateSlideCounter();
            this.updateNavigationButtons();

            // Announce slide change for accessibility
            this.announceSlideChange(index);
        }
    }

    nextSlide() {
        const nextIndex = (this.currentSlideIndex + 1) % this.totalSlides;
        this.showSlide(nextIndex);
    }

    previousSlide() {
        const prevIndex = this.currentSlideIndex === 0 ? this.totalSlides - 1 : this.currentSlideIndex - 1;
        this.showSlide(prevIndex);
    }

    goToSlide(index) {
        this.showSlide(index);
    }

    updateSlideCounter() {
        if (this.slideCounter) {
            this.slideCounter.textContent = `${this.currentSlideIndex + 1} / ${this.totalSlides}`;
        }
    }

    updateNavigationButtons() {
        // Enable/disable navigation buttons based on current position
        if (this.prevBtn) {
            this.prevBtn.disabled = false; // Always allow cycling
        }

        if (this.nextBtn) {
            this.nextBtn.disabled = false; // Always allow cycling
        }
    }

    // Timer functionality
    toggleTimer() {
        if (this.isTimerRunning) {
            this.stopTimer();
        } else {
            this.startTimer();
        }
    }

    startTimer() {
        this.timerStartTime = Date.now();
        this.isTimerRunning = true;

        this.timer = setInterval(() => {
            this.updateTimerDisplay();
        }, 1000);

        console.log('Timer started');
    }

    stopTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        this.isTimerRunning = false;
        console.log('Timer stopped');
    }

    resetTimer() {
        this.stopTimer();
        this.timerStartTime = null;
        if (this.timerDisplay) {
            this.timerDisplay.textContent = '00:00';
        }
    }

    updateTimerDisplay() {
        if (!this.timerStartTime || !this.timerDisplay) return;

        const elapsed = Math.floor((Date.now() - this.timerStartTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;

        const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        this.timerDisplay.textContent = formattedTime;
    }

    // Fullscreen functionality
    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.warn('Fullscreen request failed:', err);
            });
        } else {
            document.exitFullscreen();
        }
    }

    // Speaker notes toggle (if implemented)
    toggleSpeakerNotes() {
        const notes = document.querySelectorAll('.speaker-notes');
        const isVisible = notes.length > 0 && notes[0].style.display !== 'none';

        notes.forEach(note => {
            note.style.display = isVisible ? 'none' : 'block';
        });

        if (this.toggleNotesBtn) {
            this.toggleNotesBtn.textContent = isVisible ? 'Show Notes' : 'Hide Notes';
        }
    }

    // Accessibility
    announceSlideChange(index) {
        const slideTitle = this.slides[index]?.querySelector('.slide-title')?.textContent || `Slide ${index + 1}`;

        // Create or update ARIA live region for screen readers
        let announcement = document.getElementById('slide-announcement');
        if (!announcement) {
            announcement = document.createElement('div');
            announcement.id = 'slide-announcement';
            announcement.setAttribute('aria-live', 'polite');
            announcement.setAttribute('aria-atomic', 'true');
            announcement.style.position = 'absolute';
            announcement.style.left = '-10000px';
            announcement.style.width = '1px';
            announcement.style.height = '1px';
            announcement.style.overflow = 'hidden';
            document.body.appendChild(announcement);
        }

        announcement.textContent = `Now showing: ${slideTitle}`;
    }

    // Utility methods
    getCurrentSlide() {
        return this.currentSlideIndex;
    }

    getTotalSlides() {
        return this.totalSlides;
    }

    // Progress tracking
    getProgress() {
        return Math.round((this.currentSlideIndex / (this.totalSlides - 1)) * 100);
    }

    // Auto-advance (for presentations)
    startAutoAdvance(intervalMs = 30000) {
        this.autoAdvanceTimer = setInterval(() => {
            this.nextSlide();
        }, intervalMs);
    }

    stopAutoAdvance() {
        if (this.autoAdvanceTimer) {
            clearInterval(this.autoAdvanceTimer);
            this.autoAdvanceTimer = null;
        }
    }
}

// Initialize presentation when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('TeNeT TechLabs Android Security Presentation Loading...');

    // Create presentation instance
    window.presentation = new AndroidSecurityPresentation();

    // Add some styling for better mobile experience
    const style = document.createElement('style');
    style.textContent = `
        /* Prevent text selection on navigation */
        .presentation-nav, .nav-btn {
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }

        /* Better touch targets */
        .nav-btn {
            min-height: 44px;
            min-width: 44px;
        }

        /* Accessibility improvements */
        .slide:focus {
            outline: 2px solid var(--primary-tenet, #00ff88);
            outline-offset: 4px;
        }

        /* Loading animation */
        .slide {
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
        }

        .slide.active {
            opacity: 1;
        }

        /* High contrast mode support */
        @media (prefers-contrast: high) {
            .nav-btn {
                border: 2px solid currentColor;
            }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
            .slide {
                transition: none;
            }

            * {
                animation-duration: 0.01s !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01s !important;
            }
        }
    `;
    document.head.appendChild(style);

    console.log('TeNeT TechLabs Presentation Ready! 🚀');

    // Add some fun console messages for developers
    console.log(`
    ╔══════════════════════════════════════════════════════════════════╗
    ║                     TeNeT TechLabs                               ║
    ║               Android Security Presentation                      ║
    ║                                                                  ║
    ║  👋 Hey there, curious developer!                               ║
    ║  🛡️  This presentation helps families stay safe online          ║
    ║  💚 Built with love by Gabriel Tenorio                          ║
    ║  🌐 GitHub: GitHub.com/TeNeT-TechLabs                           ║
    ║                                                                  ║
    ║  Keyboard shortcuts:                                             ║
    ║  • Arrow keys or Space: Navigate slides                         ║
    ║  • F: Toggle fullscreen                                         ║
    ║  • T: Toggle timer                                               ║
    ║  • Home/End: First/last slide                                    ║
    ║                                                                  ║
    ║  Touch gestures:                                                 ║
    ║  • Swipe left/right: Navigate slides                            ║
    ║                                                                  ║
    ╚══════════════════════════════════════════════════════════════════╝
    `);
});

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
    if (window.presentation) {
        if (document.hidden && window.presentation.isTimerRunning) {
            console.log('Page hidden, timer continues running');
        }
    }
});

// Handle window resize
window.addEventListener('resize', function() {
    // Could add responsive adjustments here
    console.log('Window resized, presentation adapting...');
});

// Export for module systems (optional)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AndroidSecurityPresentation;
}
