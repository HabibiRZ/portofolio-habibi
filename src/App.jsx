import React, { useState, useEffect } from 'react';
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
import { playSuccessSound, playClickSound, playHoverSound } from './utils/soundEffects';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  // Scroll reading progress indicator
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth mouse-follow spotlight
  useEffect(() => {
    let animationFrame;
    const handleMouseMove = (e) => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(() => {
        setMousePos({ x: e.clientX, y: e.clientY });
      });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  // Staggered Scroll Reveal System
  useEffect(() => {
    if (loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
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

  const showToast = (message, type = 'success') => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast({ visible: false, message: '', type: 'success' });
    }, 3800);
  };

  const handleOpenResume = (e) => {
    if (e) e.preventDefault();
    setResumeModalOpen(true);
  };

  const handleDownloadCv = async (e) => {
    if (e) e.preventDefault();

    // Trigger celebration sound & confetti!
    playSuccessSound();

    try {
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#10B981', '#06B6D4', '#F59E0B', '#FFFFFF'],
      });
    } catch (err) {
      // Confetti error fallback
    }

    // Attempt direct blob download with application/octet-stream so browser downloads immediately
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
  };

  return (
    <div className="portfolio-app">
      {/* Scroll Reading Progress Bar at the very top */}
      <div
        className="scroll-progress-bar"
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
        aria-hidden="true"
      />

      {/* Interactive Cyber Mouse Cursor Spotlight */}
      <div
        className="cyber-cursor-glow"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
        }}
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
      <Navbar onDownloadCv={handleOpenResume} />

      {/* Main Content Sections */}
      <main className="main-content-flow">
        <Hero onDownloadCv={handleOpenResume} />
        <Projects />
        <Certificates />
        <TeamGallery />
        <SkillsMatrix />
        <Education />
        <ContactSection showToastMessage={showToast} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Notification Toast */}
      <Toast toast={toast} onClose={() => setToast({ visible: false, message: '', type: 'success' })} />

      {/* Executive Curriculum Vitae / Resume Overview Modal */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
        onDownloadCv={handleDownloadCv}
      />
    </div>
  );
}
