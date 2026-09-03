import React, { useState, useEffect } from 'react';
import { playSwitchSound } from '../utils/soundEffects';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING PROTOCOL...');
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setStatusText('SYSTEM ONLINE');
          playSwitchSound();
          setTimeout(() => {
            setIsFading(true);
            setTimeout(() => {
              onComplete();
            }, 600);
          }, 300);
          return 100;
        }

        const increment = Math.floor(Math.random() * 8) + 3;
        const next = Math.min(100, prev + increment);

        if (next > 30 && next < 70) {
          setStatusText('CONFIGURING ARCHITECTURE MATRIX...');
        } else if (next >= 70 && next < 95) {
          setStatusText('SYNCING ENTERPRISE TELEMETRY...');
        }

        return next;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className={`preloader-overlay ${isFading ? 'preloader-fade-out' : ''}`} aria-hidden={isFading}>
      <div className="preloader-content">
        <div className="preloader-logo-ring">
          <div className="preloader-avatar-wrapper">
            <img src="/HABIBI RIZQULLAH.JPG" alt="Habibi Rizqullah" className="preloader-avatar" />
          </div>
          <div className="preloader-spinner-ring" />
        </div>

        <div className="preloader-info">
          <div className="preloader-brand mono">HABIBI RIZQULLAH</div>
          <div className="preloader-sub mono">PORTFOLIO // 2026</div>

          <div className="preloader-bar-track">
            <div className="preloader-bar-fill" style={{ width: `${progress}%` }} />
          </div>

          <div className="preloader-meta mono">
            <span className="preloader-status">{statusText}</span>
            <span className="preloader-percent">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
