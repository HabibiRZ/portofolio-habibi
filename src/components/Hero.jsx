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
import { playHoverSound, playClickSound, playSuccessSound, playSwitchSound } from '../utils/soundEffects';

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

const flagshipSystems = [
  {
    id: "sipabs",
    sectionId: "work",
    tag: "FINANCIAL ARCHIVES",
    name: "SIPABS — Bank Archival Engine",
    org: "PT. Bank Sumut",
    accent: "#F59E0B",
    status: "PRODUCTION ACTIVE",
    metric: "100% Audit Compliance",
    metricLabel: "ZERO DATA LOSS SLA",
    stack: ["PHP 8.x", "MySQL", "Financial Security", "Regression QA"],
    description: "Production archival and administrative records engine managing digitized customer credit files and regulatory audit trails across regional banking operations.",
    highlight: "Patched 14 SQL query bottlenecks & established zero-defect regression test suites."
  },
  {
    id: "sertakan",
    sectionId: "work",
    tag: "GOVERNMENT ANALYTICS",
    name: "SERTAKAN — Executive Monitoring",
    org: "BPJS Ketenagakerjaan",
    accent: "#06B6D4",
    status: "INSTITUTIONAL DECREE",
    metric: "33 Sub-Districts",
    metricLabel: "MEDAN-WIDE PARTICIPATION",
    stack: ["Web Systems", "PostgreSQL", "Analytics Dashboard", "REST API"],
    description: "Centralized analytics platform tracking social security compliance and ASN contribution metrics under formal government decree.",
    highlight: "Consolidated multi-department participation data into automated executive drill-downs."
  },
  {
    id: "ai-attendance",
    sectionId: "work",
    tag: "COMPUTER VISION & AI",
    name: "Neural Vision Attendance Engine",
    org: "Universitas Sumatera Utara",
    accent: "#10B981",
    status: "99.2% ACCURACY",
    metric: "120ms Latency",
    metricLabel: "EDGE FACIAL INFERENCE",
    stack: ["Python 3.11", "OpenCV", "MediaPipe", "Geofencing"],
    description: "Deep learning facial vector matching and spatial coordinate geofencing system with real-time anti-spoofing heuristic verification.",
    highlight: "Eliminates attendance proxy fraud through dual facial landmark triangulation."
  }
];

export default function Hero({ onDownloadCv }) {
  const [counts, setCounts] = useState(telemetryStats.map(() => 0));
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeSystemTab, setActiveSystemTab] = useState(0);
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
      {/* ── Habibi's Signature Systems Command Deck ── */}
      <section className="hero-signature-section" id="hero">
        <div className="wrap">
          {/* Top Telemetry Coordinates */}
          <div className="hero-sig-telemetry-bar reveal-on-scroll">
            <div className="sig-telemetry-status mono">
              <span className="pulse-ping-dot" />
              <span className="text-white font-bold">HABIBI RIZQULLAH</span>
              <span className="telemetry-sep">//</span>
              <span className="text-sky">SYSTEMS &amp; FULL-STACK ARCHITECT</span>
            </div>
            <div className="sig-telemetry-meta mono">
              <span className="inline-flex items-center gap-1">
                <MapPin size={13} className="text-amber" />
                <span>MEDAN, ID • WIB (UTC+7)</span>
              </span>
              <span className="telemetry-sep">•</span>
              <span className="text-emerald font-semibold">USU ALUMNI (GPA 3.80 HONORS)</span>
            </div>
          </div>

          {/* Signature Monumental Headline */}
          <div className="hero-sig-headline-block reveal-on-scroll delay-1">
            <h1 className="hero-sig-headline">
              ENGINEERING HIGH-RELIABILITY <br />
              <span className="text-gradient-cyan">SYSTEMS</span> &amp;{' '}
              <span className="text-shiny">WEB ARCHITECTURE.</span>
            </h1>

            <p className="hero-sig-manifesto">
              I architect fault-tolerant web platforms, regional banking archives, and computer vision pipelines for organizations where data reliability is critical. Specialized in high-uptime relational databases, regression QA, and scalable full-stack applications.
            </p>
          </div>

          {/* Action Command Bar & Social Channels */}
          <div className="hero-sig-action-bar reveal-on-scroll delay-2">
            <div className="hero-sig-buttons">
              <button
                type="button"
                className="btn-sig-primary mono"
                onClick={() => handleScrollToSection('work')}
                onMouseEnter={playHoverSound}
              >
                <span>EXPLORE FLAGSHIP SYSTEMS</span>
                <ArrowRight size={15} />
              </button>

              <button
                type="button"
                className="btn-sig-secondary mono"
                onClick={onDownloadCv}
                onMouseEnter={playHoverSound}
              >
                <FileText size={15} />
                <span>OVERVIEW CV (PDF)</span>
              </button>
            </div>

            {/* Integrated Social Station - Logos Only */}
            <div className="hero-sig-social-dock">
              <a
                href="https://github.com/HabibiRZ"
                target="_blank"
                rel="noopener noreferrer"
                className="sig-social-link"
                title="GitHub Profile (HabibiRZ)"
                aria-label="GitHub Profile"
                onMouseEnter={playHoverSound}
                onClick={playClickSound}
              >
                <GithubIcon size={19} />
              </a>
              <a
                href="https://www.linkedin.com/in/habibi-rizqullah-2b121329a/"
                target="_blank"
                rel="noopener noreferrer"
                className="sig-social-link"
                title="LinkedIn Profile (Habibi Rizqullah)"
                aria-label="LinkedIn Profile"
                onMouseEnter={playHoverSound}
                onClick={playClickSound}
              >
                <LinkedinIcon size={19} />
              </a>
              <a
                href="https://www.instagram.com/habibirz005/"
                target="_blank"
                rel="noopener noreferrer"
                className="sig-social-link"
                title="Instagram Profile (@habibirz005)"
                aria-label="Instagram Profile"
                onMouseEnter={playHoverSound}
                onClick={playClickSound}
              >
                <InstagramIcon size={19} />
              </a>
            </div>
          </div>

          {/* Signature Interactive Live Systems Console HUD */}
          <div className="hero-systems-console-hud reveal-on-scroll delay-3">
            <div className="console-hud-header">
              <div className="console-hud-title mono">
                <Terminal size={14} className="text-sky" />
                <span>ACTIVE PRODUCTION ENGINES // REALTIME TELEMETRY</span>
              </div>

              <div className="console-hud-tabs mono">
                {flagshipSystems.map((sys, idx) => (
                  <button
                    key={sys.id}
                    type="button"
                    className={`console-tab-btn ${activeSystemTab === idx ? 'active' : ''}`}
                    onClick={() => {
                      try {
                        playClickSound();
                      } catch (err) {
                        /* ignore audio error */
                      }
                      setActiveSystemTab(idx);
                    }}
                    onMouseEnter={playHoverSound}
                    style={{ '--tab-accent': sys.accent }}
                  >
                    <span className="console-tab-dot" style={{ background: sys.accent }} />
                    <span>{`0${idx + 1} // ${sys.org}`}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Console Active System Body */}
            <div className="console-hud-body" style={{ '--current-accent': flagshipSystems[activeSystemTab].accent }}>
              <div className="console-hud-left">
                <div className="console-tag-row mono">
                  <span className="console-category-pill" style={{ color: flagshipSystems[activeSystemTab].accent }}>
                    {flagshipSystems[activeSystemTab].tag}
                  </span>
                  <span className="console-status-pill mono">
                    <span className="console-pulse-mini" style={{ background: flagshipSystems[activeSystemTab].accent }} />
                    <span>{flagshipSystems[activeSystemTab].status}</span>
                  </span>
                </div>

                <h3 className="console-system-name">{flagshipSystems[activeSystemTab].name}</h3>
                <p className="console-system-desc">{flagshipSystems[activeSystemTab].description}</p>

                <div className="console-system-stack mono">
                  {flagshipSystems[activeSystemTab].stack.map((stk) => (
                    <span key={stk} className="console-stack-chip">{stk}</span>
                  ))}
                </div>
              </div>

              <div className="console-hud-right">
                <div className="console-metric-card">
                  <div className="console-metric-header">
                    <div className="console-metric-val mono" style={{ color: flagshipSystems[activeSystemTab].accent }}>
                      {flagshipSystems[activeSystemTab].metric}
                    </div>
                    <span className="console-verified-badge mono">TELEMETRY VERIFIED</span>
                  </div>
                  <div className="console-metric-lbl mono">
                    {flagshipSystems[activeSystemTab].metricLabel}
                  </div>
                </div>

                <div className="console-metric-highlight">
                  <span className="console-highlight-dot" style={{ background: flagshipSystems[activeSystemTab].accent }} />
                  <p className="console-highlight-quote">
                    "{flagshipSystems[activeSystemTab].highlight}"
                  </p>
                </div>

                <button
                  type="button"
                  className="console-btn-deep-dive mono"
                  onClick={() => handleScrollToSection('work')}
                  onMouseEnter={playHoverSound}
                >
                  <span>INSPECT ARCHITECTURE BLUEPRINT</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Layer 01: Identity & Core Narrative ── */}
      <section className="section-block" id="about">
        <div className="wrap">
          <div className="reveal-on-scroll">
            <div className="system-layer-badge mono">
              <span className="layer-bracket">[</span>
              <span className="layer-num text-emerald">LAYER 01</span>
              <span className="layer-sep">//</span>
              <span className="layer-name">ARCHITECTURAL IDENTITY &amp; CORE FOCUS</span>
              <span className="layer-bracket">]</span>
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
