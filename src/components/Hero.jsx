import React, { useState, useEffect, useRef } from 'react';
import {
  Download,
  ArrowRight,
  MapPin,
  Mail,
  Phone,
  Terminal,
  ChevronDown,
  ShieldCheck,
  Award,
  GraduationCap,
  Sparkles,
  Building2,
  Database,
  Cpu,
  Layers,
  Copy,
  Check
} from 'lucide-react';
import { personalData, telemetryStats } from '../data/portfolioData';
import { playHoverSound, playClickSound, playSuccessSound } from '../utils/soundEffects';

const roles = [
  "Junior Full-Stack Developer",
  "SIPABS Banking Archival Systems",
  "Analytics & Operations Dashboards",
  "USU Informatics Honors (GPA 3.80)",
  "PHP • React • MySQL • Python",
];

const highlights = [
  {
    icon: Building2,
    org: "PT. Bank Sumut",
    role: "SIPABS Archival & QA",
    color: "#F59E0B"
  },
  {
    icon: Database,
    org: "BPJS Ketenagakerjaan",
    role: "Performance Analytics",
    color: "#06B6D4"
  },
  {
    icon: GraduationCap,
    org: "Universitas Sumatera Utara",
    role: "Honors Diploma (GPA 3.80)",
    color: "#10B981"
  }
];

export default function Hero({ onDownloadCv }) {
  const [counts, setCounts] = useState(telemetryStats.map(() => 0));
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(65);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const statsRef = useRef(null);
  const animatedRef = useRef(false);

  // Typewriter effect
  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timer;

    if (!isDeleting && displayText === currentRole) {
      timer = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      setTypingSpeed(75);
    } else {
      timer = setTimeout(() => {
        const nextText = isDeleting
          ? currentRole.substring(0, displayText.length - 1)
          : currentRole.substring(0, displayText.length + 1);
        setDisplayText(nextText);
        setTypingSpeed(isDeleting ? 30 : 65);
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex, typingSpeed]);

  // Telemetry stats counter animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          const duration = 1000;
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
      { threshold: 0.3 }
    );

    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const handleCardMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleScrollToWork = (e) => {
    e.preventDefault();
    playClickSound();
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(personalData.email);
    playSuccessSound();
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section className="hero-section" id="hero">
      <div className="wrap">
        {/* Top Eyebrow Status Bar */}
        <div className="hero-eyebrow-container reveal-on-scroll">
          <div className="hero-status-pill">
            <span className="radar-dot" aria-hidden="true" />
            <span className="mono">READY FOR JUNIOR FULL-STACK ROLES</span>
          </div>
          <div className="hero-loc mono">
            <MapPin size={13} className="text-emerald" />
            <span>MEDAN, INDONESIA (OPEN TO REMOTE &amp; RELOCATION)</span>
          </div>
        </div>

        {/* Hero Bento Grid */}
        <div className="hero-bento-grid">
          {/* Card 1: Core Bio & Hero Title */}
          <div
            className="bento-card bento-hero-main spotlight-card reveal-on-scroll"
            onMouseMove={handleCardMouseMove}
          >
            <div className="hero-meta-label mono">
              <span className="hero-tag-badge">
                <Sparkles size={13} className="text-emerald" />
                <span>FULL-STACK SYSTEMS ENGINEER</span>
              </span>
            </div>

            <h1 className="hero-title">
              HABIBI <span className="gradient-text-animated">RIZQULLAH</span>
            </h1>

            {/* Interactive Terminal Typewriter Box */}
            <div className="hero-terminal-cli mono">
              <div className="cli-header">
                <div className="cli-dots">
                  <span className="dot red" />
                  <span className="dot yellow" />
                  <span className="dot green" />
                </div>
                <span className="cli-file">specialty_focus.sh</span>
              </div>
              <div className="cli-body">
                <span className="cli-prompt">$</span>
                <span className="cli-cmd">focus:</span>
                <span className="cli-typed-text">{displayText}</span>
                <span className="typewriter-cursor">|</span>
              </div>
            </div>

            <p className="hero-bio-text">
              I architect and maintain dependable web solutions for institutions where data accuracy and operational stability are paramount. Experienced in enterprise archival digitization at <strong>PT. Bank Sumut</strong> and executive performance dashboards at <strong>BPJS Ketenagakerjaan</strong>. Graduated with Honors from <strong>Universitas Sumatera Utara</strong>.
            </p>

            {/* Quick Milestones Strip */}
            <div className="hero-milestones-row">
              {highlights.map((h, i) => {
                const Icon = h.icon;
                return (
                  <div className="milestone-chip" key={i} style={{ '--chip-accent': h.color }}>
                    <div className="chip-icon-box" style={{ backgroundColor: `${h.color}15`, color: h.color }}>
                      <Icon size={14} />
                    </div>
                    <div className="chip-text">
                      <div className="chip-org">{h.org}</div>
                      <div className="chip-role mono">{h.role}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action CTA Buttons */}
            <div className="hero-cta-group">
              <button
                type="button"
                className="btn btn-emerald-glow pulse-hover-btn"
                onClick={onDownloadCv}
                onMouseEnter={playHoverSound}
              >
                <Download size={18} className="btn-icon bounce-on-hover" />
                <span>Download CV (PDF)</span>
              </button>

              <a
                href="#work"
                className="btn btn-glass-secondary"
                onClick={handleScrollToWork}
                onMouseEnter={playHoverSound}
              >
                <span>View Architecture</span>
                <ArrowRight size={17} className="btn-arrow" />
              </a>
            </div>

            {/* Contact Quick Strip */}
            <div className="hero-quick-contacts mono">
              <button
                type="button"
                className="contact-copy-pill"
                onClick={handleCopyEmail}
                onMouseEnter={playHoverSound}
                title="Click to copy email"
              >
                <Mail size={14} className="text-emerald" />
                <span>{personalData.email}</span>
                {copiedEmail ? <Check size={13} className="text-emerald" /> : <Copy size={12} className="text-dim" />}
              </button>

              <span className="sep">•</span>

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

          {/* Card 2: Redesigned Aesthetic Profile Card */}
          <div
            className="bento-card bento-profile-card-modern spotlight-card reveal-on-scroll delay-1"
            onMouseMove={handleCardMouseMove}
          >
            {/* Top Card Header with Verification Badge */}
            <div className="profile-card-top-bar">
              <div className="profile-verified-badge mono">
                <ShieldCheck size={14} className="text-emerald" />
                <span>VERIFIED TALENT</span>
              </div>
              <div className="profile-active-radar mono">
                <span className="radar-dot-small" />
                <span>ACTIVE</span>
              </div>
            </div>

            {/* Harmonious Avatar Container with Soft Cyber Aura */}
            <div className="profile-avatar-showcase">
              <div className="avatar-ambient-glow" />
              <div className="avatar-frame">
                <img
                  src={personalData.profilePhoto}
                  alt="Habibi Rizqullah"
                  className="avatar-photo"
                />
                {/* Subtle dark gradient overlay to blend passport photo seamlessly */}
                <div className="avatar-blend-overlay" />
                <div className="picture-shimmer-sweep" />
              </div>
            </div>

            {/* Status Pill Positioned Neatly Below Avatar */}
            <div className="profile-role-status-pill mono">
              <span className="status-live-dot" />
              <span>AVAILABLE FOR HIRE</span>
            </div>

            {/* Identity Details */}
            <div className="profile-identity-block">
              <h3 className="profile-name">Habibi Rizqullah</h3>
              <div className="profile-sub-title mono">JUNIOR FULL-STACK ENGINEER</div>

              {/* Academic Details Badge */}
              <div className="profile-academic-box">
                <div className="academic-row">
                  <GraduationCap size={15} className="text-emerald" />
                  <span>Universitas Sumatera Utara</span>
                </div>
                <div className="academic-honors-pill mono">
                  <Award size={13} className="text-amber" />
                  <span>HONORS GPA 3.80 / 4.00</span>
                </div>
              </div>

              {/* Key Competencies Strip */}
              <div className="profile-quick-tags mono">
                <span className="p-tag">PHP/MySQL</span>
                <span className="p-tag">React.js</span>
                <span className="p-tag">Python</span>
                <span className="p-tag">REST API</span>
              </div>
            </div>
          </div>

          {/* Card 3: Telemetry & Statistics Panel */}
          <div
            className="bento-card bento-stats-panel spotlight-card reveal-on-scroll delay-2"
            ref={statsRef}
            onMouseMove={handleCardMouseMove}
          >
            <div className="stats-header">
              <div className="stats-title-row">
                <Terminal size={16} className="text-emerald animate-pulse" />
                <span className="mono stats-title">TELEMETRY &amp; METRICS</span>
              </div>
              <span className="stats-badge-live mono">
                <span className="live-mini-dot" />
                <span>LIVE STATS</span>
              </span>
            </div>

            <div className="stats-metric-list">
              {telemetryStats.map((stat, i) => (
                <div className="stat-metric-row" key={stat.id}>
                  <div className="stat-metric-value-box">
                    <span className="stat-metric-number mono counter-number">
                      {counts[i]}{stat.suffix}
                    </span>
                  </div>
                  <div className="stat-metric-details">
                    <div className="stat-metric-label">{stat.label}</div>
                    <div className="stat-metric-sub">{stat.sub}</div>
                  </div>
                  <span className="stat-row-tag mono">{stat.badge}</span>
                </div>
              ))}
            </div>

            <div className="stats-footer-status mono">
              <span className="dot-green" />
              <span>STACK: REACT • PHP • PYTHON • MYSQL • REST API</span>
            </div>
          </div>
        </div>

        {/* Scroll Down Floating Indicator */}
        <div className="hero-scroll-indicator reveal-on-scroll delay-3">
          <a
            href="#work"
            className="scroll-indicator-btn mono"
            onClick={handleScrollToWork}
            onMouseEnter={playHoverSound}
          >
            <div className="mouse-scroll-icon">
              <span className="mouse-wheel-dot" />
            </div>
            <span>SCROLL TO EXPLORE</span>
            <ChevronDown size={14} className="scroll-chevron" />
          </a>
        </div>
      </div>
    </section>
  );
}
