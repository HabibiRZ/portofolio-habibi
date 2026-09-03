/**
 * Portfolio Interactive Scripts
 * Habibi Rizqullah — Junior Full-Stack Developer
 * Modern Dark Theme with Smooth Animations & Auto-Download System
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initCounterAnimation();
  initWorkAccordion();
  initScrollSpy();
  initCvDownload();
});

/**
 * 1. Scroll Reveal Animation System
 * Smoothly reveals elements as they enter the viewport using IntersectionObserver.
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('[data-reveal]');
  if (revealElements.length === 0) return;

  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Immediate reveal for users who prefer reduced motion or browsers without IntersectionObserver
  if (reduceMotion || typeof IntersectionObserver === 'undefined') {
    revealElements.forEach(el => el.classList.add('revealed'));
    return;
  }

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target); // Reveal once
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });
}

/**
 * 2. Number Counter Animation for Status Panel
 * Uses IntersectionObserver to start animation when the panel enters viewport.
 */
function initCounterAnimation() {
  const statusPanel = document.querySelector('.status-panel');
  const statValues = document.querySelectorAll('.stat-value[data-target]');

  if (!statusPanel || statValues.length === 0) return;

  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion || typeof IntersectionObserver === 'undefined') {
    statValues.forEach(el => {
      el.textContent = el.getAttribute('data-target');
    });
    return;
  }

  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !animated) {
      animated = true;
      const duration = 850; // ms
      const startTime = performance.now();

      const targets = Array.from(statValues).map(el => ({
        element: el,
        target: parseInt(el.getAttribute('data-target'), 10) || 0
      }));

      const step = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(1, elapsed / duration);
        const easeOut = 1 - Math.pow(1 - progress, 3);

        targets.forEach(({ element, target }) => {
          element.textContent = Math.round(target * easeOut);
        });

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          targets.forEach(({ element, target }) => {
            element.textContent = target;
          });
        }
      };

      requestAnimationFrame(step);
      observer.disconnect();
    }
  }, { threshold: 0.25 });

  observer.observe(statusPanel);
}

/**
 * 3. Interactive Work Ledger Entries (Accordion)
 * Accessible click & keyboard (Enter/Space) handling to toggle details.
 */
function initWorkAccordion() {
  const entries = document.querySelectorAll('.entry');

  entries.forEach((entry) => {
    const metaText = entry.querySelector('.entry-meta-text');

    const toggleEntry = () => {
      const isOpen = entry.classList.toggle('open');
      entry.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      if (metaText) {
        metaText.textContent = isOpen ? 'hide detail' : 'show detail';
      }
    };

    entry.addEventListener('click', toggleEntry);

    entry.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleEntry();
      }
    });
  });
}

/**
 * 4. Active Nav Link Scrollspy
 * Highlights the current active navigation item as the user scrolls.
 */
function initScrollSpy() {
  const sections = document.querySelectorAll('header.hero, section[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  if (sections.length === 0 || navLinks.length === 0) return;

  const onScroll = () => {
    const scrollPosition = window.scrollY + 140;

    let currentSectionId = '';

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const targetId = href.substring(1);
        if (targetId === currentSectionId) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/**
 * 5. Automatic CV Download Handler
 * Forces the browser to download the file directly (triggering file download)
 * without navigating away to the PDF viewer.
 */
function initCvDownload() {
  const cvButtons = document.querySelectorAll('a[download*="CV"]');

  const executeDownload = async (e) => {
    e.preventDefault();

    let downloadTriggered = false;

    // Method 1: Embedded Base64 blob (MIME: application/octet-stream)
    // Works 100% reliably in local file:/// environment, never opens PDF viewer
    if (window.CV_BASE64) {
      try {
        const binStr = atob(window.CV_BASE64);
        const len = binStr.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binStr.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);
        const tempLink = document.createElement('a');
        tempLink.href = url;
        tempLink.download = 'CV_Habibi_Rizqullah.pdf';
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
        setTimeout(() => URL.revokeObjectURL(url), 2000);
        downloadTriggered = true;
      } catch (err) {
        console.warn('Base64 download error:', err);
      }
    }

    // Method 2: Fetch as binary blob (Works when hosted via HTTP/HTTPS)
    if (!downloadTriggered) {
      try {
        const res = await fetch('CV.pdf');
        if (res.ok) {
          const fileBlob = await res.blob();
          const forcedBlob = new Blob([fileBlob], { type: 'application/octet-stream' });
          const url = URL.createObjectURL(forcedBlob);
          const tempLink = document.createElement('a');
          tempLink.href = url;
          tempLink.download = 'CV_Habibi_Rizqullah.pdf';
          document.body.appendChild(tempLink);
          tempLink.click();
          document.body.removeChild(tempLink);
          setTimeout(() => URL.revokeObjectURL(url), 2000);
          downloadTriggered = true;
        }
      } catch (err) {
        console.warn('Fetch download error:', err);
      }
    }

    // Method 3: Fallback using hidden iframe
    if (!downloadTriggered) {
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = 'CV.pdf';
      document.body.appendChild(iframe);
      setTimeout(() => iframe.remove(), 2500);
    }

    // Show toast confirmation
    showToast('✓ CV downloaded successfully!');
  };

  cvButtons.forEach(btn => {
    btn.addEventListener('click', executeDownload);
  });
}

/**
 * Toast Notification Helper
 */
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');
  if (!toast) return;

  if (toastMsg && message) {
    toastMsg.textContent = message;
  }

  toast.classList.add('show');
  toast.setAttribute('aria-hidden', 'false');

  clearTimeout(window.toastTimeout);
  window.toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
    toast.setAttribute('aria-hidden', 'true');
  }, 3500);
}
