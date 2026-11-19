import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import TeamGallery from './components/TeamGallery';
import SkillsMatrix from './components/SkillsMatrix';
import Education from './components/Education';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import Toast from './components/Toast';
import ResumeModal from './components/ResumeModal';
import CommandPalette from './components/CommandPalette';
import {
  playSuccessSound,
  playClickSound,
  playHoverSound,
  toggleSound,
  isSoundEnabled
} from './utils/soundEffects';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(() => isSoundEnabled());
  const [requestedFolder, setRequestedFolder] = useState(null);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });

  const scrollBarRef = useRef(null);
  const cursorGlowRef = useRef(null);
  const toastTimerRef = useRef(null);

  // Scroll reading progress indicator (direct DOM update, zero re-renders)
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0 && scrollBarRef.current) {
        const ratio = Math.min(1, Math.max(0, window.scrollY / totalScroll));
        scrollBarRef.current.style.transform = `scaleX(${ratio})`;
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Zero-rerender mouse spotlight + .spotlight-card radial tracking
  useEffect(() => {
    let animationFrame;
    let lastX = -1000;
    let lastY = -1000;
    let lastTarget = null;

    const handleMouseMove = (e) => {
      lastX = e.clientX;
      lastY = e.clientY;
      lastTarget = e.target;

      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(() => {
        if (cursorGlowRef.current) {
          cursorGlowRef.current.style.left = `${lastX}px`;
          cursorGlowRef.current.style.top = `${lastY}px`;
        }
        const card = lastTarget?.closest?.('.spotlight-card');
        if (card) {
          const rect = card.getBoundingClientRect();
          card.style.setProperty('--mouse-x', `${lastX - rect.left}px`);
          card.style.setProperty('--mouse-y', `${lastY - rect.top}px`);
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  // Global Ctrl+K / Cmd+K shortcut for Command Palette
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (!loading) {
          playClickSound();
          setCommandPaletteOpen((prev) => !prev);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [loading]);

  // Staggered Scroll Reveal System
  useEffect(() => {
    if (loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            // Auto-stagger children of grid / flex-wrap containers for a cascading entrance
            const style = window.getComputedStyle(el);
            const isGrid = style.display === 'grid' || style.display === 'inline-grid';
            const isWrapRow = style.display === 'flex' && style.flexWrap === 'wrap' && el.children.length > 2;
            if ((isGrid || isWrapRow) && el.children.length > 1) {
              Array.from(el.children).forEach((child, i) => {
                child.style.setProperty('--stagger-i', String(Math.min(i, 12)));
              });
              el.classList.add('stagger-children');
            }
            el.classList.add('revealed');
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
    );

    const observeElements = () => {
      const elements = document.querySelectorAll('.reveal-on-scroll:not(.revealed)');
      elements.forEach((el) => observer.observe(el));
    };

    observeElements();

    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [loading]);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  const showToast = useCallback((message, type = 'success') => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    setToast({ visible: true, message, type });
    toastTimerRef.current = setTimeout(() => {
      setToast({ visible: false, message: '', type: 'success' });
    }, 3800);
  }, []);

  const handleToggleSound = useCallback(() => {
    const newState = toggleSound();
    setSoundActive(newState);
  }, []);

  const handleOpenResume = useCallback((e) => {
    if (e) e.preventDefault();
    setResumeModalOpen(true);
  }, []);

  const handleNavigateSection = useCallback((sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleInspectSystem = useCallback((projectId) => {
    setRequestedFolder({ id: projectId, nonce: Date.now() });
  }, []);

  const handleDownloadCv = useCallback(async (e) => {
    if (e) e.preventDefault();

    // Trigger celebration sound & confetti!
    playSuccessSound();

    try {
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#A3B18A', '#C9A15A', '#D4AF6A', '#FFFFFF'],
      });
    } catch {
      // Confetti error fallback
    }

    let downloaded = false;

    // Method 1: Embedded Base64 if available on window
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
        const a = document.createElement('a');
        a.href = url;
        a.download = 'CV_Habibi_Rizqullah.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 2000);
        downloaded = true;
      } catch (err) {
        console.warn('Base64 blob download failed, falling back...', err);
      }
    }

    // Method 2: Fetch /CV.pdf as octet-stream blob
    if (!downloaded) {
      try {
        const res = await fetch('/CV.pdf');
        if (res.ok) {
          const fileBlob = await res.blob();
          const forcedBlob = new Blob([fileBlob], { type: 'application/octet-stream' });
          const url = URL.createObjectURL(forcedBlob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'CV_Habibi_Rizqullah.pdf';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          setTimeout(() => URL.revokeObjectURL(url), 2000);
          downloaded = true;
        }
      } catch (err) {
        console.warn('Fetch download failed...', err);
      }
    }

    // Method 3: Fallback hidden iframe (never leaves the page)
    if (!downloaded) {
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = '/CV.pdf';
      document.body.appendChild(iframe);
      setTimeout(() => iframe.remove(), 2500);
    }

    showToast('✓ Official CV downloaded successfully!', 'success');
  }, [showToast]);

  return (
    <div className="portfolio-app">
      {/* Skip to Main Content for Keyboard / Screen-Reader Accessibility */}
      <a href="#main-content" className="skip-to-content mono">
        Skip to main content
      </a>

      {/* Scroll Reading Progress Bar at the very top */}
      <div
        ref={scrollBarRef}
        className="scroll-progress-bar"
        style={{ transform: 'scaleX(0)' }}
        aria-hidden="true"
      />

      {/* Interactive Cyber Mouse Cursor Spotlight */}
      <div
        ref={cursorGlowRef}
        className="cyber-cursor-glow"
        style={{ left: '-1000px', top: '-1000px' }}
        aria-hidden="true"
      />

      {/* Preloader on initial load */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* Reference Atmosphere: Dot Matrix Grid & Angular Corner Light Beams */}
      <div className="bg-dot-matrix" aria-hidden="true" />
      <div className="light-beam-wrapper" aria-hidden="true">
        <div className="light-beam-left" />
        <div className="light-beam-left-sub" />
        <div className="light-beam-right" />
        <div className="light-beam-right-sub" />
      </div>
      <div className="cyber-ambient-glow glow-1" aria-hidden="true" />
      <div className="cyber-ambient-glow glow-2" aria-hidden="true" />

      {/* Signature Obsidian Systems Telemetry Left Dock Capsule */}
      <aside className="sig-telemetry-dock-pill" aria-label="Availability Status">
        <a
          href="#contact"
          className="sig-telemetry-pill-link mono"
          onClick={(e) => {
            e.preventDefault();
            playClickSound();
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onMouseEnter={playHoverSound}
          title="Direct Systems Dispatch // Available for Hire"
        >
          <span className="sig-pill-beacon">
            <span className="sig-pill-beacon-ping" />
            <span className="sig-pill-beacon-dot" />
          </span>
          <span className="sig-pill-text">SYS.AVAILABLE // OPEN FOR HIRE</span>
        </a>
      </aside>

      {/* HUD Navigation */}
      <Navbar
        onDownloadCv={handleOpenResume}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        soundActive={soundActive}
        onToggleSound={handleToggleSound}
      />

      {/* Main Content Sections */}
      <main id="main-content" className="main-content-flow">
        <Hero onDownloadCv={handleOpenResume} onInspectSystem={handleInspectSystem} />
        <Projects requestedFolder={requestedFolder} />
        <Certificates />
        <TeamGallery />
        <SkillsMatrix />
        <Education />
        <ContactSection showToastMessage={showToast} />
      </main>

      {/* Footer */}
      <Footer onOpenCommandPalette={() => setCommandPaletteOpen(true)} />

      {/* Floating Notification Toast */}
      <Toast
        toast={toast}
        onClose={() => {
          if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
          setToast({ visible: false, message: '', type: 'success' });
        }}
      />

      {/* Executive Curriculum Vitae / Resume Overview Modal */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
        onDownloadCv={handleDownloadCv}
      />

      {/* Ctrl+K / Cmd+K Command Palette */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onOpenResume={handleOpenResume}
        onDownloadCv={handleDownloadCv}
        onNavigateSection={handleNavigateSection}
        onOpenProjectFolder={handleInspectSystem}
        onToggleSound={handleToggleSound}
        soundActive={soundActive}
        showToastMessage={showToast}
      />
    </div>
  );
}
