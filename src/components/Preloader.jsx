import React, { useState, useEffect } from 'react';
import { playSwitchSound, playSuccessSound } from '../utils/soundEffects';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [isCurtainUp, setIsCurtainUp] = useState(false);

  const statusPhases = [
    'BOOTSTRAP_CORE // INITIALIZING RUNTIME',
    'MOUNTING_SYSTEMS // VERIFYING ARCHITECTURE',
    'CONNECTING_TELEMETRY // BANKING & AUDIT PROTOCOLS',
    'COMPILING_COMPONENTS // INTERFACE READY',
    'HABIBI RIZQULLAH // SYSTEMS ONLINE'
  ];

  useEffect(() => {
    const startTime = Date.now();
    const duration = 1800; // 1.8s smooth duration

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min(100, Math.floor((elapsed / duration) * 100));

      setProgress(rawProgress);

      if (rawProgress < 25) setPhaseIndex(0);
      else if (rawProgress < 50) setPhaseIndex(1);
      else if (rawProgress < 75) setPhaseIndex(2);
      else if (rawProgress < 98) setPhaseIndex(3);
      else setPhaseIndex(4);

      if (elapsed >= duration) {
        clearInterval(interval);
        setProgress(100);
        setPhaseIndex(4);
        playSuccessSound();

        // Smooth curtain unveil
        setTimeout(() => {
          setIsCurtainUp(true);
          setTimeout(() => {
            onComplete();
          }, 850);
        }, 350);
      }
    }, 24);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`luxury-preloader-curtain ${isCurtainUp ? 'curtain-slide-up' : ''}`}
      aria-hidden={isCurtainUp}
    >
      {/* Background Dot Matrix Texture */}
      <div className="preloader-bg-matrix" />

      <div className="preloader-core-container">
        {/* Orbital Emblem with Geometric HR Monogram */}
        <div className="preloader-orbital-emblem">
          <div className="orbital-ring-outer" />
          <div className="orbital-ring-inner" />
          
          <div className="preloader-monogram-center">
            <svg width="44" height="44" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M26 22V78M44 22V78M26 50H44M56 22H72C80 22 84 27 84 36C84 45 78 48 70 49L85 78H70L57 51V78H56V22Z"
                stroke="url(#hrGradient)"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <defs>
                <linearGradient id="hrGradient" x1="20" y1="20" x2="90" y2="80" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#ffffff" />
                  <stop offset="0.5" stopColor="#38bdf8" />
                  <stop offset="1" stopColor="#facc15" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Large Minimalist Precision Counter */}
        <div className="preloader-counter-wrap">
          <span className="preloader-counter-num mono text-shiny">
            {String(progress).padStart(3, '0')}
          </span>
          <span className="preloader-counter-percent mono">%</span>
        </div>

        {/* Laser Precision Progress Bar */}
        <div className="preloader-laser-track">
          <div className="preloader-laser-fill" style={{ width: `${progress}%` }}>
            <div className="preloader-laser-spark" />
          </div>
        </div>

        {/* Telemetry Status Feed */}
        <div className="preloader-telemetry-feed mono">
          <span className="preloader-pulse-dot" />
          <span className="preloader-feed-text">{statusPhases[phaseIndex]}</span>
        </div>

        {/* Bottom Edition Pill */}
        <div className="preloader-bottom-label mono">
          MEDAN, ID • HABIBI RIZQULLAH // 2026 EDITION
        </div>
      </div>
    </div>
  );
}
