import React, { useState, useEffect } from 'react';
import {
  Award,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ZoomIn,
  X,
  Calendar,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Lock,
  Download
} from 'lucide-react';
import { certificatesData } from '../data/portfolioData';
import {
  playHoverSound,
  playClickSound,
  playModalSound,
  playSwitchSound
} from '../utils/soundEffects';

export default function Certificates() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedCert, setSelectedCert] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);

  const categories = [
    { id: 'all', label: 'All Credentials' },
    { id: 'anthropic', label: 'Anthropic Official' },
    { id: 'google', label: 'Google for Education' },
    { id: 'huawei', label: 'Huawei AI' }
  ];

  const handleCategorySelect = (id) => {
    playSwitchSound();
    setActiveCategory(id);
  };

  const filteredCerts = certificatesData.filter((c) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'anthropic') return c.issuer.toLowerCase().includes('anthropic');
    if (activeCategory === 'google') return c.issuer.toLowerCase().includes('google');
    if (activeCategory === 'huawei') return c.issuer.toLowerCase().includes('huawei');
    return true;
  });

  const handleOpenCert = (cert) => {
    playModalSound();
    setSelectedCert(cert);
    setIsZoomed(false);
  };

  const handleCloseCert = () => {
    playClickSound();
    setSelectedCert(null);
  };

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedCert) return;
      if (e.key === 'Escape') {
        handleCloseCert();
      } else if (e.key === 'ArrowRight') {
        const currIdx = certificatesData.findIndex((c) => c.id === selectedCert.id);
        if (currIdx !== -1) {
          const nextIdx = (currIdx + 1) % certificatesData.length;
          setSelectedCert(certificatesData[nextIdx]);
        }
      } else if (e.key === 'ArrowLeft') {
        const currIdx = certificatesData.findIndex((c) => c.id === selectedCert.id);
        if (currIdx !== -1) {
          const prevIdx = (currIdx - 1 + certificatesData.length) % certificatesData.length;
          setSelectedCert(certificatesData[prevIdx]);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCert]);

  return (
    <section className="section-block certificates-section" id="certificates">
      <div className="wrap">
        {/* Section Header with Volume Badge */}
        <div className="section-header-row reveal-on-scroll">
          <div>
            <div className="volume-badge">
              <span className="dot-sky" />
              <span>VOLUME III: VERIFIED CREDENTIALS &amp; ACCREDITATIONS</span>
            </div>
            <h2 className="volume-heading">
              Verified <span className="font-serif-italic text-sky">credentials.</span> <br />
              Industry <span className="font-serif-italic">standards.</span>
            </h2>
            <p className="volume-subtext">
              Cryptographically authenticated credentials in agentic AI architecture, prompt engineering, generative models, and machine learning from industry giants.
            </p>
          </div>

          <div className="section-header-note mono">
            <span className="live-screens-pill">
              <span className="pulse-ping-dot" />
              <span>4 VERIFIED ACCREDITATIONS</span>
            </span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="skills-filter-tabs reveal-on-scroll delay-1" style={{ marginBottom: '28px' }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`skills-tab-btn mono ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => handleCategorySelect(cat.id)}
              onMouseEnter={playHoverSound}
            >
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Luxury Credential Vault Grid */}
        <div className="cert-vault-container reveal-on-scroll delay-1">
          {filteredCerts.map((cert) => (
            <div
              key={cert.id}
              className="cert-vault-card spotlight-card"
              style={{
                '--cert-accent': cert.accent,
                '--cert-glow': `${cert.accent}30`
              }}
              onClick={() => handleOpenCert(cert)}
              onMouseEnter={playHoverSound}
            >
              {/* Holographic Top Stripe */}
              <div className="cert-vault-hologram" />

              {/* Card Header Seal */}
              <div className="cert-vault-top">
                <div className="cert-vault-seal">
                  <ShieldCheck size={13} />
                  <span>{cert.badge.toUpperCase()}</span>
                </div>
                <div className="cert-vault-issuer">
                  {cert.issuer}
                </div>
              </div>

              {/* Certificate Preview Frame with Zoom Overlay */}
              <div className="cert-vault-preview-stage">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="cert-vault-img"
                  loading="lazy"
                />
                <div className="cert-vault-inspect-overlay">
                  <span className="cert-vault-pill-btn">
                    <ZoomIn size={14} />
                    <span>INSPECT CREDENTIAL</span>
                  </span>
                </div>
              </div>

              {/* Content Information */}
              <div className="cert-vault-body">
                <h3 className="cert-vault-title">{cert.title}</h3>
                <p className="cert-vault-desc">{cert.description}</p>

                {/* Skills tags */}
                <div className="flagship-chips-row" style={{ marginTop: '8px' }}>
                  {cert.skills.map((s) => (
                    <span key={s} className="flagship-chip mono" style={{ fontSize: '0.7rem' }}>
                      {s}
                    </span>
                  ))}
                </div>

                {/* Meta Row */}
                <div className="cert-vault-meta-row">
                  <span className="inline-flex items-center gap-1">
                    <Calendar size={13} className="text-sky" />
                    <span>{cert.issueDate}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 text-emerald font-semibold">
                    <CheckCircle2 size={14} />
                    <span>VERIFIED</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Resolution Modal / Lightbox */}
      {selectedCert && (
        <div
          className="cert-modal-backdrop"
          onClick={handleCloseCert}
          role="dialog"
          aria-modal="true"
        >
          <div className="cert-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="cert-modal-header">
              <div className="cert-modal-header-meta mono">
                <span className="cert-modal-issuer-badge" style={{ color: selectedCert.accent, borderColor: selectedCert.accent }}>
                  {selectedCert.issuer}
                </span>
                <span className="sep">•</span>
                <span>ID: {selectedCert.credentialId || 'AUTHENTICATED'}</span>
              </div>

              <div className="cert-modal-actions">
                <button
                  type="button"
                  className={`cert-header-btn ${isZoomed ? 'active' : ''}`}
                  onClick={() => setIsZoomed(!isZoomed)}
                  aria-label="Toggle zoom"
                  title="Toggle Zoom"
                >
                  <ZoomIn size={16} />
                </button>
                <button
                  type="button"
                  className="cert-header-btn"
                  onClick={handleCloseCert}
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Certificate Stage */}
            <div className={`cert-modal-image-stage ${isZoomed ? 'zoomed' : ''}`}>
              <img
                src={selectedCert.image}
                alt={selectedCert.title}
                className="cert-modal-full-img"
              />
            </div>

            {/* Modal Footer Bar */}
            <div className="cert-modal-footer-box">
              <div className="cert-modal-content-left">
                <h3 className="cert-modal-title">{selectedCert.title}</h3>
                <p className="cert-modal-desc">{selectedCert.description}</p>
                <div className="mono" style={{ fontSize: '0.78rem', color: 'var(--color-text-dim)', marginTop: '8px' }}>
                  <span>VALIDITY: <strong>{selectedCert.validUntil}</strong></span>
                </div>
              </div>

              <div className="cert-modal-content-right">
                {selectedCert.verifyUrl && (
                  <a
                    href={selectedCert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary mono"
                    style={{ padding: '10px 20px', fontSize: '0.8rem' }}
                    onClick={playClickSound}
                  >
                    <span>VERIFY ON PORTAL</span>
                    <ExternalLink size={14} />
                  </a>
                )}
                <a
                  href={selectedCert.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary mono"
                  style={{ padding: '10px 18px', fontSize: '0.8rem' }}
                  onClick={playClickSound}
                >
                  <span>FULL IMAGE</span>
                  <ZoomIn size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
