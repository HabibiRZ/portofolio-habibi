import React from 'react';
import { ArrowUp, Terminal, Shield } from 'lucide-react';
import { playHoverSound, playClickSound } from '../utils/soundEffects';

export default function Footer() {
  const scrollToTop = () => {
    playClickSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-main">
      <div className="wrap">
        <div className="footer-row">
          <div className="footer-left">
            <div className="footer-brand mono">
              <span className="dot-emerald" />
              <span>HABIBI RIZQULLAH // FULL-STACK</span>
            </div>
            <div className="footer-sub mono">
              ENGINEERED IN MEDAN, INDONESIA • REACT + VITE + WEB AUDIO API
            </div>
          </div>

          <div className="footer-right">
            <button
              type="button"
              className="btn-back-to-top mono"
              onClick={scrollToTop}
              onMouseEnter={playHoverSound}
              title="Back to Top"
            >
              <span>BACK TO TOP</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>

        <div className="footer-bottom-bar mono">
          <span>&copy; {new Date().getFullYear()} Habibi Rizqullah. All rights reserved.</span>
          <span className="footer-status-pill">
            <span className="pulse-circle" />
            <span>READY</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
