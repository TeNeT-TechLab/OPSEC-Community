// TeNeT TechLab - Building Digital Safety Together
// Fixed JavaScript functionality addressing all navigation and interaction issues

(function () {
  "use strict";

  // Global namespace
  const TeNeT = {};
  window.TeNeT = TeNeT;

  /*-----------------------------
    Utility Functions
  -----------------------------*/
  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];

  function debounce(func, delay = 100) {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  }

  function throttle(func, delay = 16) {
    let lastCall = 0;
    return (...args) => {
      const now = Date.now();
      if (now - lastCall >= delay) {
        lastCall = now;
        func.apply(this, args);
      }
    };
  }

  /*-----------------------------
    Header Height & Scroll Management
  -----------------------------*/
  function updateHeaderHeight() {
    const header = $('.header');
    if (header) {
      const headerHeight = header.offsetHeight;
      document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
      
      // Update scroll margin for all sections
      const sections = $$('.section, #hero, #emergency, #setup, #tools, #community, #contact');
      sections.forEach(section => {
        section.style.scrollMarginTop = `${headerHeight + 32}px`;
      });
    }
  }

  function smoothScrollTo(elementId) {
    const targetEl = document.getElementById(elementId);
    if (targetEl) {
      const header = $('.header');
      const headerHeight = header ? header.offsetHeight : 70;
      const targetPosition = targetEl.offsetTop - headerHeight - 20;
      
      window.scrollTo({
        top: Math.max(0, targetPosition),
        behavior: 'smooth'
      });
      return true;
    }
    return false;
  }

  /*-----------------------------
    Navigation System
  -----------------------------*/
  function initNavigation() {
    const navToggle = $("[data-nav-toggle]");
    const navMenu = $("[data-nav-menu]");
    const navLinks = $$("[data-nav-link]");

    if (!navToggle || !navMenu) return;

    // Set up header height
    updateHeaderHeight();
    window.addEventListener('resize', debounce(updateHeaderHeight, 100));

    // Toggle mobile navigation
    function toggleNav() {
      const isOpen = navMenu.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen);
      document.body.classList.toggle("nav-open", isOpen);
      
      // Animate hamburger
      const hamburgers = $$('.hamburger', navToggle);
      hamburgers.forEach((burger, index) => {
        if (isOpen) {
          if (index === 0) burger.style.transform = 'rotate(45deg) translate(6px, 6px)';
          if (index === 1) burger.style.opacity = '0';
          if (index === 2) burger.style.transform = 'rotate(-45deg) translate(6px, -6px)';
        } else {
          burger.style.transform = '';
          burger.style.opacity = '';
        }
      });
    }

    navToggle.addEventListener("click", (e) => {
      e.preventDefault();
      toggleNav();
    });

    // Handle all navigation links
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        
        const href = link.getAttribute("href");
        if (href && href.startsWith("#")) {
          const targetId = href.slice(1);
          
          // Close mobile nav if open
          if (navMenu.classList.contains("open")) {
            toggleNav();
          }
          
          // Scroll to target
          setTimeout(() => {
            smoothScrollTo(targetId);
          }, navMenu.classList.contains("open") ? 300 : 0);
        }
      });
    });

    // Handle all scroll-to buttons
    const scrollButtons = $$('[data-scroll-to]');
    scrollButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = button.getAttribute('data-scroll-to');
        if (targetId) {
          smoothScrollTo(targetId);
        }
      });
    });

    // Close nav when clicking outside
    document.addEventListener("click", (e) => {
      if (
        navMenu.classList.contains("open") &&
        !navMenu.contains(e.target) &&
        !navToggle.contains(e.target)
      ) {
        toggleNav();
      }
    });

    // Handle escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navMenu.classList.contains("open")) {
        toggleNav();
      }
    });
  }

  /*-----------------------------
    Platform Tabs (2FA Setup) - FIXED
  -----------------------------*/
  function initTabs() {
    const tabButtons = $$(".tab-button");
    const tabPanels = $$(".tab-panel");

    if (tabButtons.length === 0) return;

    function switchTab(targetTab) {
      // Clear all active states first
      tabButtons.forEach((btn) => {
        btn.classList.remove("active");
        btn.setAttribute("aria-selected", "false");
      });

      tabPanels.forEach((panel) => {
        panel.classList.remove("active");
        panel.style.display = 'none';
      });

      // Set active states for target tab
      tabButtons.forEach((btn) => {
        if (btn.dataset.tab === targetTab) {
          btn.classList.add("active");
          btn.setAttribute("aria-selected", "true");
        }
      });

      tabPanels.forEach((panel) => {
        if (panel.id === `${targetTab}-panel`) {
          panel.classList.add("active");
          panel.style.display = 'block';
        }
      });
    }

    // Add click handlers
    tabButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        const tab = button.dataset.tab;
        if (tab) {
          switchTab(tab);
        }
      });

      // Keyboard navigation
      button.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          button.click();
        }
      });
    });

    // Initialize with Android tab active by default
    switchTab('android');
  }

  /*-----------------------------
    Copy to Clipboard - FIXED
  -----------------------------*/
  function initCopyFunctionality() {
    const copyButtons = $$(".btn-copy");
    const copyNotification = $("#copy-notification");

    if (!copyNotification) return;

    async function copyToClipboard(text) {
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text);
          showNotification('Copied to clipboard! ✅');
        } else {
          // Fallback for older browsers
          const textArea = document.createElement('textarea');
          textArea.value = text;
          textArea.style.cssText = `
            position: fixed;
            left: -9999px;
            top: -9999px;
            opacity: 0;
            pointer-events: none;
          `;
          
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          
          try {
            const successful = document.execCommand('copy');
            if (successful) {
              showNotification('Copied to clipboard! ✅');
            } else {
              throw new Error('Copy command failed');
            }
          } catch (err) {
            console.error('Fallback copy failed:', err);
            showNotification('Copy failed - please select and copy manually');
          }
          
          document.body.removeChild(textArea);
        }
      } catch (err) {
        console.error('Copy operation failed:', err);
        showNotification('Copy failed - please try again');
      }
    }

    function showNotification(message) {
      copyNotification.textContent = message;
      copyNotification.classList.add("show");
      
      setTimeout(() => {
        copyNotification.classList.remove("show");
      }, 3000);
    }

    // Add event listeners to copy buttons
    copyButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const textToCopy = button.getAttribute('data-copy-text');
        if (textToCopy) {
          copyToClipboard(textToCopy);
        }
      });

      // Keyboard support
      button.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          button.click();
        }
      });

      // Make focusable
      if (!button.hasAttribute('tabindex')) {
        button.setAttribute('tabindex', '0');
      }
      button.setAttribute('role', 'button');
      button.setAttribute('aria-label', 'Copy message to clipboard');
    });
  }

  /*-----------------------------
    External Links - FIXED
  -----------------------------*/
  function initExternalLinks() {
    const externalLinks = $$('a[href^="http"], a[href^="https://"], a[target="_blank"]');
    
    externalLinks.forEach(link => {
      // Ensure external links open in new tabs
      if (!link.hasAttribute('target')) {
        link.setAttribute('target', '_blank');
      }
      if (!link.hasAttribute('rel')) {
        link.setAttribute('rel', 'noopener noreferrer');
      }

      // Add click handler for visual feedback
      link.addEventListener('click', function(e) {
        // Don't prevent default - let the browser handle the external link
        const originalText = this.textContent;
        this.style.opacity = '0.7';
        
        // Reset after a short delay
        setTimeout(() => {
          this.style.opacity = '';
        }, 1000);
      });
    });
  }

  /*-----------------------------
    Enhanced Button Interactions
  -----------------------------*/
  function initButtonEnhancements() {
    const buttons = $$('.btn');
    
    buttons.forEach(btn => {
      btn.addEventListener('click', function(e) {
        // Add ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = (e.clientX || 0) - rect.left - size / 2;
        const y = (e.clientY || 0) - rect.top - size / 2;
        
        ripple.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          left: ${x}px;
          top: ${y}px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 0.6s ease-out;
          pointer-events: none;
          z-index: 1;
        `;
        
        if (this.style.position !== 'absolute') {
          this.style.position = 'relative';
        }
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
          if (ripple.parentNode) {
            ripple.remove();
          }
        }, 600);
      });
    });

    // Add ripple animation CSS
    if (!$('#ripple-styles')) {
      const style = document.createElement('style');
      style.id = 'ripple-styles';
      style.textContent = `
        @keyframes ripple {
          to {
            transform: scale(2);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }

  /*-----------------------------
    Background Canvas Animation
  -----------------------------*/
  function initBackgroundAnimation() {
    const canvas = $("#background-canvas");
    if (!canvas || !canvas.getContext) return;

    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    let width, height;
    let animationId;
    let particles = [];

    // Skip on mobile for performance
    if (window.innerWidth < 768 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      canvas.style.display = 'none';
      return;
    }

    function resizeCanvas() {
      width = window.innerWidth;
      height = Math.max(window.innerHeight, document.body.scrollHeight);
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      
      ctx.scale(dpr, dpr);
      initParticles();
    }

    function initParticles() {
      particles.length = 0;
      const maxParticles = Math.min(60, Math.floor(width / 25));
      
      for (let i = 0; i < maxParticles; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.4,
          speedY: (Math.random() - 0.5) * 0.4,
          opacity: Math.random() * 0.4 + 0.1,
          color: Math.random() > 0.5 ? '#00ff88' : '#32b8c6',
          pulse: Math.random() * Math.PI * 2
        });
      }
    }

    function updateParticles() {
      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Bounce off edges
        if (particle.x <= 0 || particle.x >= width) {
          particle.speedX *= -0.9;
          particle.x = Math.max(0, Math.min(width, particle.x));
        }
        if (particle.y <= 0 || particle.y >= height) {
          particle.speedY *= -0.9;
          particle.y = Math.max(0, Math.min(height, particle.y));
        }

        // Pulse effect
        particle.pulse += 0.01;
        particle.opacity = 0.1 + Math.sin(particle.pulse) * 0.2;
      });
    }

    function drawParticles() {
      ctx.clearRect(0, 0, width, height);
      
      particles.forEach((particle) => {
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        ctx.shadowColor = particle.color;
        ctx.shadowBlur = 5;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
    }

    function animate() {
      if (document.hidden) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      updateParticles();
      drawParticles();
      animationId = requestAnimationFrame(animate);
    }

    // Initialize
    resizeCanvas();
    animate();

    // Handle resize
    window.addEventListener("resize", debounce(resizeCanvas, 200));

    // Cleanup
    window.addEventListener("beforeunload", () => {
      if (animationId) cancelAnimationFrame(animationId);
    });
  }

  /*-----------------------------
    Accessibility Features
  -----------------------------*/
  function initAccessibility() {
    // Skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#hero';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
      position: absolute;
      left: -9999px;
      z-index: 10000;
      padding: 1rem;
      background: var(--cyber-primary);
      color: var(--cyber-bg);
      text-decoration: none;
      font-weight: 600;
      border-radius: 4px;
    `;
    
    skipLink.addEventListener('focus', () => {
      skipLink.style.left = '1rem';
      skipLink.style.top = '1rem';
    });
    
    skipLink.addEventListener('blur', () => {
      skipLink.style.left = '-9999px';
    });
    
    skipLink.addEventListener('click', (e) => {
      e.preventDefault();
      smoothScrollTo('hero');
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Emergency hotkey (Alt + E)
    document.addEventListener('keydown', (e) => {
      if (e.altKey && e.key.toLowerCase() === 'e') {
        e.preventDefault();
        smoothScrollTo('emergency');
        
        // Focus the emergency button
        setTimeout(() => {
          const emergencyBtn = $('.emergency-btn');
          if (emergencyBtn) {
            emergencyBtn.focus();
          }
        }, 500);
      }
    });
  }

  /*-----------------------------
    Error Handling
  -----------------------------*/
  function initErrorHandling() {
    window.addEventListener('error', (e) => {
      console.error('JavaScript error:', e.error);
    });

    window.addEventListener('unhandledrejection', (e) => {
      console.error('Unhandled promise rejection:', e.reason);
      e.preventDefault();
    });
  }

  /*-----------------------------
    Initialize Everything
  -----------------------------*/
  function init() {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", init);
      return;
    }

    try {
      console.log('Initializing TeNeT TechLab application...');
      
      // Core functionality
      initErrorHandling();
      initNavigation();
      initTabs();
      initCopyFunctionality();
      initExternalLinks();
      initButtonEnhancements();
      initAccessibility();
      
      // Visual enhancements
      setTimeout(initBackgroundAnimation, 100);
      
      // Mark as initialized
      document.body.classList.add('tenet-initialized');
      
      console.log('TeNeT TechLab application initialized successfully');
    } catch (error) {
      console.error('Initialization error:', error);
    }
  }

  /*-----------------------------
    Reduced Motion Support
  -----------------------------*/
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const style = document.createElement('style');
    style.textContent = `
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
    `;
    document.head.appendChild(style);
  }

  // Export to global namespace
  TeNeT.init = init;
  TeNeT.version = "3.1.0";
  TeNeT.utils = { $, $$, debounce, throttle, smoothScrollTo };

  // Auto-initialize
  init();

})();