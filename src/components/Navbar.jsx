import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, ArrowDownRight, Download, Menu, X, Terminal, Sparkles, FileText } from 'lucide-react';
import { playHoverSound, playClickSound, toggleSound, isSoundEnabled } from '../utils/soundEffects';

export default function Navbar({ onDownloadCv }) {
  const [soundActive, setSoundActive] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    setSoundActive(isSoundEnabled());

    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['hero', 'about', 'work', 'certificates', 'gallery', 'skills', 'education', 'contact'];
      const scrollPos = window.scrollY + 160;

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const newState = toggleSound();
    setSoundActive(newState);
  };

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.removeProperty('overflow');
    }
    return () => {
      document.body.style.removeProperty('overflow');
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { id: 'hero', label: 'Index' },
    { id: 'about', label: 'Identity' },
    { id: 'work', label: 'Systems' },
    { id: 'certificates', label: 'Credentials' },
    { id: 'gallery', label: 'Team' },
    { id: 'skills', label: 'Stack' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id) => {
    playClickSound();
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`navbar-header ${scrolled ? 'scrolled' : ''} ${mobileMenuOpen ? 'menu-open' : ''}`}>
      <div className="navbar-container wrap">
        {/* Brand */}
        <a
          href="#hero"
          className="nav-brand"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('hero');
          }}
          onMouseEnter={playHoverSound}
        >
          <div className="nav-avatar-glow">
            <img src="/HABIBI RIZQULLAH.JPG" alt="Habibi" className="nav-avatar-img" />
          </div>
          <div className="nav-brand-text">
            <span className="nav-brand-name">habibi rizqullah</span>
            <span className="nav-brand-tag mono">SYS.ENG</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="nav-desktop-links" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              className={`nav-link-btn ${activeSection === link.id ? 'active' : ''}`}
              onClick={() => handleNavClick(link.id)}
              onMouseEnter={playHoverSound}
            >
              {link.label}
              {activeSection === link.id && <span className="nav-link-indicator" />}
            </button>
          ))}
        </nav>

        {/* Actions (Sound Toggle & Download CV) */}
        <div className="nav-actions">
          {/* Sound Toggle Button with Equalizer Wave */}
          <button
            type="button"
            className={`sound-toggle-btn ${soundActive ? 'active' : 'muted'}`}
            onClick={handleSoundToggle}
            onMouseEnter={playHoverSound}
            title={soundActive ? 'Sound Effects Active (Click to Mute)' : 'Sound Effects Muted (Click to Enable)'}
            aria-label="Toggle Sound Effects"
          >
            {soundActive ? (
              <>
                <Volume2 size={16} className="sound-icon text-sky" />
                <div className="sound-wave-bars">
                  <span className="bar bar-1" />
                  <span className="bar bar-2" />
                  <span className="bar bar-3" />
                </div>
              </>
            ) : (
              <>
                <VolumeX size={16} className="sound-icon text-muted" />
                <span className="sound-muted-text mono">OFF</span>
              </>
            )}
          </button>

          {/* Quick CV Overview & Download Button */}
          <button
            type="button"
            className="btn-nav-cv"
            onClick={onDownloadCv}
            onMouseEnter={playHoverSound}
            title="Overview Curriculum Vitae (PDF)"
          >
            <FileText size={14} className="btn-cv-icon" />
            <span>CV / RESUME</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            className={`nav-mobile-toggle ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => {
              playClickSound();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown Panel */}
      {mobileMenuOpen && (
        <>
          <div
            className="mobile-dropdown-backdrop"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="mobile-nav-dropdown" role="navigation" aria-label="Mobile Navigation">
            <div className="mobile-nav-links">
              {navLinks.map((link, idx) => (
                <button
                  key={link.id}
                  type="button"
                  className={`mobile-nav-link ${activeSection === link.id ? 'active' : ''}`}
                  onClick={() => handleNavClick(link.id)}
                  style={{ '--link-idx': idx }}
                >
                  <span className="mobile-link-title">{link.label}</span>
                  {activeSection === link.id ? (
                    <span className="mobile-active-chip mono">
                      <span className="pulse-mini-dot" />
                      <span>ACTIVE</span>
                    </span>
                  ) : (
                    <span className="mobile-arrow-indicator mono">→</span>
                  )}
                </button>
              ))}

              <div className="mobile-nav-divider" />

              <button
                type="button"
                className="mobile-nav-cv-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onDownloadCv();
                }}
              >
                <FileText size={16} />
                <span>Overview Resume (PDF)</span>
              </button>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
