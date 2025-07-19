// Presentation App JavaScript
class PresentationApp {
    constructor() {
        this.currentSlideIndex = 0;
        this.totalSlides = 7;
        this.timerStartTime = null;
        this.timerInterval = null;
        this.isTimerRunning = false;
        this.speakerNotesVisible = false;
        
        this.initializeElements();
        this.bindEvents();
        this.updateSlideDisplay();
        this.updateNavigation();
        
        // Focus management for accessibility
        this.focusMainContent();
    }
    
    initializeElements() {
        // Navigation elements
        this.prevButton = document.getElementById('prevSlide');
        this.nextButton = document.getElementById('nextSlide');
        this.currentSlideSpan = document.getElementById('currentSlide');
        this.totalSlidesSpan = document.getElementById('totalSlides');
        
        // Timer elements
        this.timerDisplay = document.getElementById('timer');
        this.toggleTimerButton = document.getElementById('toggleTimer');
        
        // Speaker notes toggle
        this.toggleNotesButton = document.getElementById('toggleNotes');
        
        // Slide elements
        this.slides = document.querySelectorAll('.slide');
        this.speakerNotes = document.querySelectorAll('.speaker-notes');
        
        // Set total slides
        if (this.totalSlidesSpan) {
            this.totalSlidesSpan.textContent = this.totalSlides;
        }
        
        // Debug logging
        console.log('Elements initialized:', {
            prevButton: !!this.prevButton,
            nextButton: !!this.nextButton,
            toggleNotesButton: !!this.toggleNotesButton,
            slides: this.slides.length,
            speakerNotes: this.speakerNotes.length
        });
    }
    
    bindEvents() {
        // Navigation events with error handling
        if (this.prevButton) {
            this.prevButton.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Previous button clicked');
                this.previousSlide();
            });
        }
        
        if (this.nextButton) {
            this.nextButton.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Next button clicked');
                this.nextSlide();
            });
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeydown(e));
        
        // Timer events
        if (this.toggleTimerButton) {
            this.toggleTimerButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleTimer();
            });
        }
        
        // Speaker notes events
        if (this.toggleNotesButton) {
            this.toggleNotesButton.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Toggle notes button clicked');
                this.toggleSpeakerNotes();
            });
        }
        
        // Touch/swipe events for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        document.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        });
        
        // Video link tracking
        this.bindVideoLinks();
        
        // Interactive element enhancements
        this.enhanceInteractiveElements();
    }
    
    handleKeydown(e) {
        switch(e.key) {
            case 'ArrowLeft':
            case 'ArrowUp':
                e.preventDefault();
                this.previousSlide();
                break;
            case 'ArrowRight':
            case 'ArrowDown':
            case ' ':
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
                if (e.ctrlKey || e.metaKey) return; // Allow normal find
                e.preventDefault();
                this.requestFullscreen();
                break;
            case 'Escape':
                if (document.fullscreenElement) {
                    document.exitFullscreen();
                }
                break;
            case 't':
            case 'T':
                e.preventDefault();
                this.toggleTimer();
                break;
            case 'n':
            case 'N':
                e.preventDefault();
                this.toggleSpeakerNotes();
                break;
        }
    }
    
    handleSwipe(startX, endX) {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) < swipeThreshold) return;
        
        if (diff > 0) {
            // Swipe left - next slide
            this.nextSlide();
        } else {
            // Swipe right - previous slide
            this.previousSlide();
        }
    }
    
    previousSlide() {
        console.log('Previous slide called, current index:', this.currentSlideIndex);
        if (this.currentSlideIndex > 0) {
            this.currentSlideIndex--;
            this.updateSlideDisplay();
            this.updateNavigation();
            this.focusMainContent();
            this.announceSlideChange();
            console.log('Moved to slide:', this.currentSlideIndex + 1);
        }
    }
    
    nextSlide() {
        console.log('Next slide called, current index:', this.currentSlideIndex);
        if (this.currentSlideIndex < this.totalSlides - 1) {
            this.currentSlideIndex++;
            this.updateSlideDisplay();
            this.updateNavigation();
            this.focusMainContent();
            this.announceSlideChange();
            console.log('Moved to slide:', this.currentSlideIndex + 1);
        }
    }
    
    goToSlide(index) {
        if (index >= 0 && index < this.totalSlides) {
            this.currentSlideIndex = index;
            this.updateSlideDisplay();
            this.updateNavigation();
            this.focusMainContent();
            this.announceSlideChange();
        }
    }
    
    updateSlideDisplay() {
        this.slides.forEach((slide, index) => {
            if (index === this.currentSlideIndex) {
                slide.classList.add('active');
                slide.setAttribute('aria-hidden', 'false');
            } else {
                slide.classList.remove('active');
                slide.setAttribute('aria-hidden', 'true');
            }
        });
        
        if (this.currentSlideSpan) {
            this.currentSlideSpan.textContent = this.currentSlideIndex + 1;
        }
        
        // Update browser title with current slide
        const currentSlide = this.slides[this.currentSlideIndex];
        const slideTitle = currentSlide?.querySelector('.slide-title');
        if (slideTitle) {
            document.title = `Slide ${this.currentSlideIndex + 1}: ${slideTitle.textContent} - Android Security Training`;
        }
    }
    
    updateNavigation() {
        if (this.prevButton) {
            this.prevButton.disabled = this.currentSlideIndex === 0;
        }
        
        if (this.nextButton) {
            this.nextButton.disabled = this.currentSlideIndex === this.totalSlides - 1;
            
            // Update button text for last slide
            if (this.currentSlideIndex === this.totalSlides - 1) {
                this.nextButton.textContent = 'End / Fin';
            } else {
                this.nextButton.textContent = 'Next / Siguiente →';
            }
        }
    }
    
    focusMainContent() {
        const currentSlide = this.slides[this.currentSlideIndex];
        const slideTitle = currentSlide?.querySelector('.slide-title');
        if (slideTitle) {
            slideTitle.focus();
        }
    }
    
    announceSlideChange() {
        // Create announcement for screen readers
        const announcement = `Slide ${this.currentSlideIndex + 1} of ${this.totalSlides}`;
        this.announceToScreenReader(announcement);
    }
    
    announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            if (document.body.contains(announcement)) {
                document.body.removeChild(announcement);
            }
        }, 1000);
    }
    
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
        
        if (this.toggleTimerButton) {
            this.toggleTimerButton.textContent = 'Stop Timer';
            this.toggleTimerButton.classList.remove('btn--outline');
            this.toggleTimerButton.classList.add('btn--primary');
        }
        
        this.timerInterval = setInterval(() => {
            this.updateTimerDisplay();
        }, 1000);
        
        this.announceToScreenReader('Timer started');
    }
    
    stopTimer() {
        this.isTimerRunning = false;
        
        if (this.toggleTimerButton) {
            this.toggleTimerButton.textContent = 'Start Timer';
            this.toggleTimerButton.classList.remove('btn--primary');
            this.toggleTimerButton.classList.add('btn--outline');
        }
        
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
        
        this.announceToScreenReader('Timer stopped');
    }
    
    updateTimerDisplay() {
        if (!this.isTimerRunning || !this.timerStartTime || !this.timerDisplay) return;
        
        const elapsedTime = Date.now() - this.timerStartTime;
        const minutes = Math.floor(elapsedTime / 60000);
        const seconds = Math.floor((elapsedTime % 60000) / 1000);
        
        const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        this.timerDisplay.textContent = formattedTime;
        
        // Warn when approaching 10-minute mark
        if (minutes === 9 && seconds === 30) {
            this.announceToScreenReader('30 seconds remaining in presentation time');
            this.timerDisplay.style.color = 'var(--color-warning)';
        } else if (minutes >= 10) {
            this.timerDisplay.style.color = 'var(--color-error)';
            if (minutes === 10 && seconds === 0) {
                this.announceToScreenReader('Presentation time complete. Transition to hands-on activities.');
            }
        }
    }
    
    toggleSpeakerNotes() {
        console.log('Toggling speaker notes, current state:', this.speakerNotesVisible);
        this.speakerNotesVisible = !this.speakerNotesVisible;
        
        let notesFound = false;
        this.speakerNotes.forEach(notes => {
            notesFound = true;
            if (this.speakerNotesVisible) {
                notes.classList.add('visible');
                notes.style.display = 'block';
            } else {
                notes.classList.remove('visible');
                notes.style.display = 'none';
            }
        });
        
        if (this.toggleNotesButton) {
            this.toggleNotesButton.textContent = this.speakerNotesVisible ? 'Hide Notes' : 'Show Notes';
        }
        
        const announcement = this.speakerNotesVisible ? 'Speaker notes shown' : 'Speaker notes hidden';
        this.announceToScreenReader(announcement);
        
        console.log('Speaker notes toggled:', this.speakerNotesVisible, 'Notes found:', notesFound);
    }
    
    requestFullscreen() {
        const element = document.documentElement;
        
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    }
    
    bindVideoLinks() {
        const videoLinks = document.querySelectorAll('a[href*="youtube.com"]');
        
        videoLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Track video interactions
                console.log('Video link clicked:', link.href);
                
                // Pause timer when video is opened
                if (this.isTimerRunning) {
                    this.stopTimer();
                    this.announceToScreenReader('Timer paused for video');
                }
            });
        });
    }
    
    enhanceInteractiveElements() {
        const interactiveElements = document.querySelectorAll('.interactive-element');
        
        interactiveElements.forEach(element => {
            // Add click handler for better interaction
            element.addEventListener('click', () => {
                element.style.backgroundColor = 'var(--color-bg-2)';
                element.style.borderColor = 'var(--color-warning)';
                
                // Reset after animation
                setTimeout(() => {
                    element.style.backgroundColor = '';
                    element.style.borderColor = '';
                }, 2000);
                
                // Announce interaction
                const prompt = element.querySelector('.interaction-prompt');
                if (prompt) {
                    this.announceToScreenReader('Interactive element activated: ' + prompt.textContent);
                }
            });
            
            // Add keyboard support
            element.setAttribute('tabindex', '0');
            element.setAttribute('role', 'button');
            
            element.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    element.click();
                }
            });
        });
    }
    
    // Utility method to get current slide data
    getCurrentSlideData() {
        const slideData = [
            { id: 1, timing: "2 minutes", hasVideo: true, hasInteractive: true },
            { id: 2, timing: "2 minutes", hasVideo: false, hasInteractive: true },
            { id: 3, timing: "3 minutes + 5 minutes hands-on", hasVideo: true, hasInteractive: true },
            { id: 4, timing: "3 minutes + demo", hasVideo: true, hasInteractive: true },
            { id: 5, timing: "2 minutes", hasVideo: false, hasInteractive: true },
            { id: 6, timing: "1 minute", hasVideo: false, hasInteractive: true },
            { id: 7, timing: "Use only if needed", hasVideo: false, hasInteractive: false }
        ];
        
        return slideData[this.currentSlideIndex] || null;
    }
    
    // Method to show helpful keyboard shortcuts
    showKeyboardShortcuts() {
        const shortcuts = `
Keyboard Shortcuts / Atajos de Teclado:
• Arrow Keys / Flechas: Navigate slides / Navegar diapositivas
• Space / Espacio: Next slide / Siguiente diapositiva
• Home: Go to first slide / Ir a primera diapositiva
• End: Go to last slide / Ir a última diapositiva
• F: Toggle fullscreen / Pantalla completa
• T: Toggle timer / Alternar cronómetro
• N: Toggle speaker notes / Alternar notas
• Esc: Exit fullscreen / Salir pantalla completa
        `;
        
        alert(shortcuts);
    }
    
    // Method to export presentation data for analysis
    exportPresentationData() {
        const data = {
            totalSlides: this.totalSlides,
            currentSlide: this.currentSlideIndex + 1,
            timerRunning: this.isTimerRunning,
            speakerNotesVisible: this.speakerNotesVisible,
            timestamp: new Date().toISOString(),
            currentSlideData: this.getCurrentSlideData()
        };
        
        console.log('Presentation Data:', data);
        return data;
    }
}

// Additional utility functions
class PresentationUtils {
    static formatTime(milliseconds) {
        const minutes = Math.floor(milliseconds / 60000);
        const seconds = Math.floor((milliseconds % 60000) / 1000);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    static generateQRCode(text) {
        // Placeholder for QR code generation
        // In a real implementation, you might use a QR code library
        console.log('QR Code would be generated for:', text);
        return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text)}`;
    }
    
    static announceInSpanish(englishText) {
        const translations = {
            'Timer started': 'Cronómetro iniciado',
            'Timer stopped': 'Cronómetro detenido',
            'Speaker notes shown': 'Notas del presentador mostradas',
            'Speaker notes hidden': 'Notas del presentador ocultadas',
            'Presentation time complete': 'Tiempo de presentación completado',
            'Interactive element activated': 'Elemento interactivo activado'
        };
        
        return translations[englishText] || englishText;
    }
    
    static checkBrowserSupport() {
        const features = {
            fullscreen: !!(document.fullscreenEnabled || 
                           document.mozFullScreenEnabled || 
                           document.webkitFullscreenEnabled || 
                           document.msFullscreenEnabled),
            localStorage: typeof(Storage) !== "undefined",
            touchEvents: 'ontouchstart' in window,
            mediaQueries: window.matchMedia && window.matchMedia('(max-width: 768px)').matches
        };
        
        console.log('Browser Feature Support:', features);
        return features;
    }
}

// Initialize the presentation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - Initializing presentation');
    
    // Check browser support
    const browserSupport = PresentationUtils.checkBrowserSupport();
    
    // Initialize presentation with a small delay to ensure all elements are ready
    setTimeout(() => {
        const presentation = new PresentationApp();
        
        // Make presentation globally available for debugging
        window.presentation = presentation;
        window.presentationUtils = PresentationUtils;
        
        // Add help button functionality
        const helpButton = document.createElement('button');
        helpButton.textContent = '?';
        helpButton.className = 'btn btn--outline';
        helpButton.style.position = 'fixed';
        helpButton.style.top = '10px';
        helpButton.style.right = '10px';
        helpButton.style.zIndex = '1000';
        helpButton.style.width = '40px';
        helpButton.style.height = '40px';
        helpButton.style.borderRadius = '50%';
        helpButton.setAttribute('aria-label', 'Show keyboard shortcuts');
        helpButton.addEventListener('click', () => presentation.showKeyboardShortcuts());
        
        document.body.appendChild(helpButton);
        
        // Log initialization success
        console.log('Android Security Presentation initialized successfully');
        console.log('Press "?" for keyboard shortcuts');
        
        // Auto-focus the first slide title for screen readers
        setTimeout(() => {
            const firstSlideTitle = document.querySelector('.slide.active .slide-title');
            if (firstSlideTitle) {
                firstSlideTitle.setAttribute('tabindex', '-1');
                firstSlideTitle.focus();
            }
        }, 100);
    }, 100);
});