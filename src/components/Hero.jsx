import React, { useState, useEffect, useRef } from 'react';
import {
  Zap,
  Bot,
  ArrowDownRight,
  ArrowRight,
  Download,
  MapPin,
  Mail,
  Phone,
  Copy,
  Check,
  ShieldCheck,
  Award,
  GraduationCap,
  Sparkles,
  Building2,
  Database,
  ChevronDown,
  Terminal,
  FileText
} from 'lucide-react';
import { personalData, telemetryStats } from '../data/portfolioData';
import { playHoverSound, playClickSound, playSuccessSound } from '../utils/soundEffects';

// Custom clean SVG icons for socials to match reference site exactly
function GithubIcon({ size = 26, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ size = 26, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramIcon({ size = 26, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function Hero({ onDownloadCv }) {
  const [counts, setCounts] = useState(telemetryStats.map(() => 0));
  const [copiedEmail, setCopiedEmail] = useState(false);
  const statsRef = useRef(null);
  const animatedRef = useRef(false);

  // Animated telemetry numbers on scroll into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          const duration = 1200;
          const start = performance.now();

          const animate = (now) => {
            const progress = Math.min(1, (now - start) / duration);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCounts(telemetryStats.map((s) => Math.round(s.value * easeOut)));
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCounts(telemetryStats.map((s) => s.value));
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.25 }
    );

    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(personalData.email);
    playSuccessSound();
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleScrollToSection = (id) => {
    playClickSound();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* ── Left Edge Floating Vertical Pill Badge (Syahril Style) ── */}
      <div className="vertical-opportunity-dock">
        <a
          href="#contact"
          className="vertical-opportunity-pill"
          onClick={(e) => {
            e.preventDefault();
            handleScrollToSection('contact');
          }}
          onMouseEnter={playHoverSound}
          title="Click to get in touch"
        >
          <span className="vertical-opportunity-dot" />
          <span>AVAILABLE FOR OPPORTUNITY</span>
        </a>
      </div>

      {/* ── Monumental Brutalist Hero Section ── */}
      <section className="hero-monumental-section" id="hero">
        <div className="wrap">
          {/* Headline 1: Micro Intro + FULL STACK + GitHub */}
          <div className="hero-monumental-top-row reveal-on-scroll">
            <p className="hero-micro-intro mono">
              Hi, I'm Habibi Rizqullah. I build scalable systems powered by high-reliability web architecture.
            </p>

            <div className="hero-monumental-heading-wrap">
              <div className="hero-floating-social-anchor hero-floating-github">
                <a
                  href="https://github.com/HabibiRZ"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  onMouseEnter={playHoverSound}
                >
                  <GithubIcon size={28} />
                </a>
              </div>
              <h1 className="hero-monumental-text text-shiny">
                FULL STACK
              </h1>
            </div>
          </div>

          {/* Headline 2: SOFT + [⚡ Zap] + WARE + LinkedIn & Instagram */}
          <div className="hero-monumental-heading-wrap reveal-on-scroll delay-1">
            <div className="hero-floating-social-anchor hero-floating-linkedin">
              <a
                href="https://www.linkedin.com/in/habibi-rizqullah-2b121329a/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                onMouseEnter={playHoverSound}
              >
                <LinkedinIcon size={28} />
              </a>
            </div>
            <div className="hero-floating-social-anchor hero-floating-instagram">
              <a
                href="https://www.instagram.com/habibirz005/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Profile"
                onMouseEnter={playHoverSound}
              >
                <InstagramIcon size={28} />
              </a>
            </div>

            <h1 className="hero-monumental-text text-shiny">
              <span>SOFT</span>
              <span
                className="hero-icon-slot zap"
                title="High-Voltage Systems"
                onMouseEnter={playHoverSound}
                onClick={() => playClickSound()}
              >
                <Zap size={56} strokeWidth={2.4} />
              </span>
              <span>WARE</span>
            </h1>
          </div>

          {/* Headline 3: EN + [🤖 Bot] + GINEER + Right Micro-Copy */}
          <div className="hero-monumental-sub-row reveal-on-scroll delay-2">
            <h1 className="hero-monumental-text text-shiny">
              <span>EN</span>
              <span
                className="hero-icon-slot bot"
                title="System Intelligence"
                onMouseEnter={playHoverSound}
                onClick={() => playClickSound()}
              >
                <Bot size={56} strokeWidth={2.4} />
              </span>
              <span>GINEER</span>
            </h1>

            <p className="hero-micro-collab mono">
              Open to all forms of collaboration, regardless of location and language.
            </p>
          </div>

          {/* Hero Metadata & Expandable Resume Pill Bar */}
          <div className="hero-metadata-bar reveal-on-scroll delay-3">
            <div className="hero-location-badge mono">
              MEDAN, ID — 2026
            </div>
            <div className="hero-meta-divider" />
            <a
              href={personalData.cvFile}
              className="btn-resume-expand"
              onClick={onDownloadCv}
              onMouseEnter={playHoverSound}
              title="View and Download Resume"
            >
              <span className="btn-resume-text">View Resume</span>
              <div className="btn-resume-icon-box">
                <ArrowDownRight size={22} />
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ── Volume I: Identity & Core Narrative ── */}
      <section className="section-block" id="about">
        <div className="wrap">
          <div className="reveal-on-scroll">
            <div className="volume-badge">
              <span className="dot-emerald" />
              <span>VOLUME I: IDENTITY &amp; CORE FOCUS</span>
            </div>

            <h2 className="volume-heading">
              Proven <span className="font-serif-italic text-sky">stack.</span> <br />
              Measurable <span className="font-serif-italic">results.</span>
            </h2>

            <div className="volume-thesis-box">
              <p className="volume-thesis-text">
                I engineer high-reliability web systems and the <span className="font-serif-italic text-sky">data infrastructure</span> that makes them dependable at scale. From enterprise archival systems at <strong>PT. Bank Sumut</strong> to municipal analytics dashboards at <strong>BPJS Ketenagakerjaan</strong>, my focus is zero-downtime stability and rigorous data integrity.
              </p>

              <div className="volume-signature-row">
                <div>
                  <div className="volume-signature-name">Habibi</div>
                  <div className="volume-signature-title mono">HABIBI RIZQULLAH // SOFTWARE &amp; SYSTEMS ENGINEER</div>
                </div>

                <div className="hero-quick-contacts mono">
                  <button
                    type="button"
                    className="contact-copy-pill"
                    onClick={handleCopyEmail}
                    onMouseEnter={playHoverSound}
                    title="Copy Email"
                  >
                    <Mail size={14} className="text-sky" />
                    <span>{personalData.email}</span>
                    {copiedEmail ? <Check size={13} className="text-emerald" /> : <Copy size={12} className="text-dim" />}
                  </button>

                  <a
                    href={`tel:${personalData.phone.replace(/\s+/g, '')}`}
                    onMouseEnter={playHoverSound}
                    className="contact-link-hover"
                  >
                    <Phone size={14} className="text-cyan" />
                    <span>{personalData.phone}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Upgraded Creative & Professional Executive Dossier & Telemetry Bento Deck */}
          <div className="executive-dossier-grid">
            {/* Bento 1: Executive Engineering Dossier */}
            <div
              className="executive-dossier-card spotlight-card reveal-on-scroll delay-1"
              onMouseEnter={playHoverSound}
            >
              <div>
                <div className="executive-dossier-header">
                  <div className="executive-verified-chip">
                    <ShieldCheck size={14} />
                    <span>VERIFIED ENGINEER // USU HONORS</span>
                  </div>
                  <div className="executive-status-chip">
                    <span className="dot-green" />
                    <span>MEDAN, ID (WIB)</span>
                  </div>
                </div>

                <div className="executive-profile-body">
                  <div className="executive-avatar-portal">
                    <div className="executive-avatar-ring" />
                    <div className="executive-avatar-frame">
                      <img
                        src={personalData.profilePhoto}
                        alt="Habibi Rizqullah"
                        className="executive-avatar-img"
                      />
                      <div className="executive-avatar-vignette" />
                    </div>
                  </div>

                  <div className="executive-info-col">
                    <h3 className="executive-name">Habibi Rizqullah</h3>
                    <div className="executive-role-title">JUNIOR SOFTWARE &amp; SYSTEMS ENGINEER</div>

                    <div className="executive-academic-row">
                      <GraduationCap size={15} className="text-sky" />
                      <span>Universitas Sumatera Utara</span>
                      <span className="executive-academic-honors">
                        <Award size={12} />
                        <span>HONORS GPA 3.80</span>
                      </span>
                    </div>
                  </div>
                </div>

                <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', lineHeight: '1.7', margin: '0 0 18px 0' }}>
                  Specialized in zero-downtime banking archives at <strong>PT. Bank Sumut</strong> and executive operations monitoring at <strong>BPJS Ketenagakerjaan</strong>. Disciplined code quality, MySQL query optimization, and reactive frontends.
                </p>

                <div className="flagship-chips-row" style={{ marginBottom: '22px' }}>
                  <span className="flagship-chip mono" style={{ color: '#38bdf8' }}>PT. Bank Sumut (SIPABS)</span>
                  <span className="flagship-chip mono" style={{ color: '#06b6d4' }}>BPJS Ketenagakerjaan</span>
                  <span className="flagship-chip mono">PHP 8.x / MySQL</span>
                  <span className="flagship-chip mono">React.js / Next.js</span>
                  <span className="flagship-chip mono">Python REST API</span>
                </div>
              </div>

              <div className="flagship-actions-row">
                <button
                  type="button"
                  className="flagship-btn-primary"
                  onClick={onDownloadCv}
                  onMouseEnter={playHoverSound}
                  title="Overview and Inspect Curriculum Vitae"
                >
                  <FileText size={14} />
                  <span>OVERVIEW CV (PDF)</span>
                </button>

                <button
                  type="button"
                  className="flagship-btn-secondary"
                  onClick={handleCopyEmail}
                  onMouseEnter={playHoverSound}
                  title="Copy Email Address"
                >
                  <Mail size={14} className="text-sky" />
                  <span>{copiedEmail ? 'COPIED TO CLIPBOARD' : 'COPY INBOX'}</span>
                </button>
              </div>
            </div>

            {/* Bento 2: Telemetry Performance & Metrics 2x2 Deck */}
            <div
              className="telemetry-deck-card spotlight-card reveal-on-scroll delay-2"
              ref={statsRef}
              onMouseEnter={playHoverSound}
            >
              <div>
                <div className="telemetry-deck-header">
                  <div className="telemetry-title-group">
                    <Terminal size={16} className="text-sky" />
                    <span>PRODUCTION TELEMETRY &amp; METRICS</span>
                  </div>
                  <span className="stats-badge-live mono">
                    <span className="live-mini-dot" />
                    <span>SYSTEM PULSE</span>
                  </span>
                </div>

                {/* 2x2 Grid of Performance Metrics */}
                <div className="telemetry-2x2-grid">
                  {/* Tile 1 */}
                  <div className="telemetry-tile">
                    <div className="telemetry-tile-top">
                      <span className="telemetry-tile-number text-shiny">{counts[0] || 3}+</span>
                      <span className="telemetry-tile-badge">100% SHIPPED</span>
                    </div>
                    <div className="telemetry-tile-label">Production Systems</div>
                    <div className="telemetry-tile-sub">Archival ledgers &amp; executive monitoring dashboards</div>
                    <div className="telemetry-progress-bar">
                      <div className="telemetry-progress-fill" style={{ width: '100%' }} />
                    </div>
                  </div>

                  {/* Tile 2 */}
                  <div className="telemetry-tile">
                    <div className="telemetry-tile-top">
                      <span className="telemetry-tile-number" style={{ color: '#38bdf8' }}>{counts[1] || 2}</span>
                      <span className="telemetry-tile-badge">ENTERPRISE</span>
                    </div>
                    <div className="telemetry-tile-label">Key Institutional Sectors</div>
                    <div className="telemetry-tile-sub">PT. Bank Sumut &amp; BPJS Ketenagakerjaan Medan</div>
                    <div className="telemetry-progress-bar">
                      <div className="telemetry-progress-fill" style={{ width: '85%' }} />
                    </div>
                  </div>

                  {/* Tile 3 */}
                  <div className="telemetry-tile">
                    <div className="telemetry-tile-top">
                      <span className="telemetry-tile-number" style={{ color: '#facc15' }}>3.80</span>
                      <span className="telemetry-tile-badge" style={{ color: '#facc15', borderColor: 'rgba(250,204,21,0.3)', background: 'rgba(250,204,21,0.08)' }}>
                        HONORS
                      </span>
                    </div>
                    <div className="telemetry-tile-label">Academic Honors GPA</div>
                    <div className="telemetry-tile-sub">FASILKOM-TI Universitas Sumatera Utara (/ 4.00)</div>
                    <div className="telemetry-progress-bar">
                      <div className="telemetry-progress-fill" style={{ width: '95%', background: '#facc15' }} />
                    </div>
                  </div>

                  {/* Tile 4 */}
                  <div className="telemetry-tile">
                    <div className="telemetry-tile-top">
                      <span className="telemetry-tile-number" style={{ color: '#10b981' }}>14</span>
                      <span className="telemetry-tile-badge" style={{ color: '#10b981', borderColor: 'rgba(16,185,129,0.3)', background: 'rgba(16,185,129,0.08)' }}>
                        -35% LATENCY
                      </span>
                    </div>
                    <div className="telemetry-tile-label">Query Bottlenecks Patched</div>
                    <div className="telemetry-tile-sub">Database indexing in high-volume banking environment</div>
                    <div className="telemetry-progress-bar">
                      <div className="telemetry-progress-fill" style={{ width: '100%', background: '#10b981' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Console Status Bar */}
              <div className="telemetry-footer-bar">
                <span className="inline-flex items-center gap-2">
                  <span className="dot-green" />
                  <span>SYSTEM STATUS: ONLINE • ALL AUDITS NOMINAL</span>
                </span>
                <span>STACK: PHP • REACT • MYSQL • PYTHON</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
