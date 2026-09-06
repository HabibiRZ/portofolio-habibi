import React from 'react';
import { ArrowUp, Terminal, Shield, Globe, Cpu } from 'lucide-react';
import { playHoverSound, playClickSound } from '../utils/soundEffects';

export default function Footer() {
  const scrollToTop = () => {
    playClickSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-main" style={{ borderTop: '1px solid rgba(255,255,255,0.08)', background: '#07070b', padding: '48px 0 36px' }}>
      <div className="wrap">
        <div className="footer-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
          <div className="footer-left">
            <div className="footer-brand mono" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem', fontWeight: '800', letterSpacing: '0.1em' }}>
              <span className="dot-sky" />
              <span style={{ color: '#ffffff' }}>HABIBI RIZQULLAH</span>
              <span style={{ color: 'var(--color-text-dim)' }}>//</span>
              <span style={{ color: 'var(--color-sky)' }}>SOFTWARE &amp; SYSTEMS ENGINEER</span>
            </div>
            <div className="footer-sub mono" style={{ fontSize: '0.76rem', color: 'var(--color-text-dim)', letterSpacing: '0.08em', marginTop: '6px' }}>
              MEDAN, ID • REACT + VITE + WEB AUDIO API • TAILORED OBSIDIAN ARCHITECTURE
            </div>
          </div>

          <div className="footer-right" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div className="footer-social-links mono" style={{ display: 'flex', gap: '18px', fontSize: '0.8rem' }}>
              <a href="https://github.com/HabibiRZ" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-text-muted)' }} onMouseEnter={playHoverSound}>
                GITHUB
              </a>
              <a href="https://www.linkedin.com/in/habibi-rizqullah-2b121329a/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-text-muted)' }} onMouseEnter={playHoverSound}>
                LINKEDIN
              </a>
              <a href="https://www.instagram.com/habibirz005/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-text-muted)' }} onMouseEnter={playHoverSound}>
                INSTAGRAM
              </a>
            </div>

            <button
              type="button"
              className="btn-back-to-top mono"
              onClick={scrollToTop}
              onMouseEnter={playHoverSound}
              title="Back to Top"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#ffffff',
                padding: '8px 16px',
                borderRadius: '9999px',
                cursor: 'pointer',
                fontSize: '0.75rem',
                letterSpacing: '0.12em',
                transition: 'all 0.2s ease'
              }}
            >
              <span>BACK TO TOP</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>

        <div className="footer-bottom-bar mono" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginTop: '36px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.04)', fontSize: '0.74rem', color: 'var(--color-text-dim)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span>&copy; {new Date().getFullYear()} Habibi Rizqullah. All rights reserved.</span>
            <span>•</span>
            <span style={{ color: 'var(--color-sky)' }}>VERSION 2026 © EDITION</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <span className="dot-green" />
              <span>STATUS: ONLINE</span>
            </span>
            <span>•</span>
            <span>LATENCY: 14MS</span>
            <span>•</span>
            <span>SYSTEM: DARWIN_X64_STABLE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
