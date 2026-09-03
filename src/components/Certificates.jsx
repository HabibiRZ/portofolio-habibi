import React, { useState, useRef, useEffect } from 'react';
import {
  Award,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ZoomIn,
  X,
  Download,
  Calendar,
  ShieldCheck,
  Sparkles,
  MoveHorizontal,
  Maximize2,
  CheckCircle2
} from 'lucide-react';
import { certificatesData } from '../data/portfolioData';
import {
  playHoverSound,
  playClickSound,
  playModalSound,
  playSwitchSound
} from '../utils/soundEffects';

export default function Certificates() {
  const [selectedCert, setSelectedCert] = useState(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const trackRef = useRef(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasMovedRef = useRef(false);

  // Update scroll navigation buttons state
  const updateScrollState = () => {
    if (!trackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 0) {
      setScrollProgress((scrollLeft / maxScroll) * 100);
    }
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    updateScrollState();
    track.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);

    return () => {
      track.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, []);

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedCert) return;

      if (e.key === 'Escape') {
        playClickSound();
        setSelectedCert(null);
        setIsZoomed(false);
      } else if (e.key === 'ArrowRight') {
        navigateModal(1);
      } else if (e.key === 'ArrowLeft') {
        navigateModal(-1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCert]);

  // Modal navigation (Next/Prev)
  const navigateModal = (direction) => {
    if (!selectedCert) return;
    playSwitchSound();
    setIsZoomed(false);
    const currentIndex = certificatesData.findIndex((c) => c.id === selectedCert.id);
    const newIndex = (currentIndex + direction + certificatesData.length) % certificatesData.length;
    setSelectedCert(certificatesData[newIndex]);
  };

  // Horizontal scroll buttons
  const handleScroll = (direction) => {
    if (!trackRef.current) return;
    playSwitchSound();
    const scrollAmount = 390;
    trackRef.current.scrollBy({
      left: direction * scrollAmount,
      behavior: 'smooth'
    });
  };

  // Drag to scroll functionality
  const handleMouseDown = (e) => {
    // Only left click
    if (e.button !== 0 || !trackRef.current) return;
    isDraggingRef.current = true;
    hasMovedRef.current = false;
    startXRef.current = e.pageX - trackRef.current.offsetLeft;
    scrollLeftRef.current = trackRef.current.scrollLeft;
    trackRef.current.style.cursor = 'grabbing';
    trackRef.current.style.userSelect = 'none';
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    if (Math.abs(walk) > 5) {
      hasMovedRef.current = true;
    }
    trackRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    if (trackRef.current) {
      trackRef.current.style.cursor = 'grab';
      trackRef.current.style.removeProperty('user-select');
    }
  };

  // Open modal if not dragging
  const handleCardClick = (cert) => {
    if (hasMovedRef.current) {
      hasMovedRef.current = false;
      return;
    }
    playModalSound();
    setSelectedCert(cert);
    setIsZoomed(false);
  };

  // Spotlight mouse effect on cards
  const handleCardMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section className="section-block certificates-section" id="certificates">
      <div className="wrap">
        {/* Section Header */}
        <div className="section-header-row certificates-header reveal-on-scroll">
          <div>
            <div className="section-category-tag mono">
              <Award size={14} className="text-emerald" />
              <span>VERIFIED CREDENTIALS // CERTIFICATIONS</span>
            </div>
            <h2 className="section-heading">Certificates &amp; Accreditations</h2>
            <p className="section-subtext">
              Industry-recognized credentials in agentic AI development, prompt engineering, generative architectures, and machine learning.
            </p>
          </div>

          {/* Controls HUD */}
          <div className="certificates-hud-controls">
            <div className="certificates-counter mono">
              <span className="text-emerald font-semibold">{String(certificatesData.length).padStart(2, '0')}</span>
              <span className="text-dim">/ VERIFIED CERTS</span>
            </div>

            <div className="certificates-nav-arrows">
              <button
                type="button"
                className={`cert-arrow-btn ${!canScrollLeft ? 'disabled' : ''}`}
                onClick={() => handleScroll(-1)}
                disabled={!canScrollLeft}
                aria-label="Scroll certificates left"
                onMouseEnter={playHoverSound}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                className={`cert-arrow-btn ${!canScrollRight ? 'disabled' : ''}`}
                onClick={() => handleScroll(1)}
                disabled={!canScrollRight}
                aria-label="Scroll certificates right"
                onMouseEnter={playHoverSound}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Sideways Scroll Interactive Indicator */}
        <div className="cert-scroll-hint-bar reveal-on-scroll delay-1">
          <div className="cert-hint-pill mono">
            <MoveHorizontal size={13} className="text-cyan animate-pulse" />
            <span>DRAG OR SCROLL SIDEWAYS TO EXPLORE</span>
          </div>

          <div className="cert-scroll-track-progress">
            <div
              className="cert-scroll-progress-fill"
              style={{ width: `${Math.max(15, scrollProgress)}%` }}
            />
          </div>
        </div>

        {/* Horizontal Scrolling Track */}
        <div
          className="certificates-track-wrapper reveal-on-scroll delay-2"
          onMouseLeave={handleMouseUp}
        >
          <div
            ref={trackRef}
            className="certificates-scroll-track"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
            {certificatesData.map((cert, index) => (
              <div
                key={cert.id}
                className="certificate-card spotlight-card"
                style={{ '--accent-color': cert.accent }}
                onClick={() => handleCardClick(cert)}
                onMouseEnter={playHoverSound}
                onMouseMove={handleCardMouseMove}
              >
                {/* Certificate Preview Box */}
                <div className="certificate-preview-box">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="certificate-thumbnail-img"
                    loading="lazy"
                  />
                  <div className="picture-shimmer-sweep" />

                  {/* Hover Overlay */}
                  <div className="certificate-overlay">
                    <span className="cert-inspect-pill mono">
                      <ZoomIn size={14} />
                      <span>VIEW FULL CERTIFICATE</span>
                    </span>
                  </div>

                  {/* Top Badge */}
                  <div
                    className="cert-category-badge mono"
                    style={{ borderColor: `${cert.accent}60`, color: cert.accent }}
                  >
                    <ShieldCheck size={11} />
                    <span>{cert.category}</span>
                  </div>

                  {/* Issuer Strip Tag */}
                  <div className="cert-issuer-tag mono">
                    {cert.issuer}
                  </div>
                </div>

                {/* Content Details */}
                <div className="certificate-card-body">
                  <div className="cert-meta-row mono">
                    <span className="cert-index-tag">#{String(index + 1).padStart(2, '0')}</span>
                    <span className="sep">•</span>
                    <span className="inline-flex items-center gap-1 text-dim">
                      <Calendar size={12} />
                      {cert.issueDate}
                    </span>
                  </div>

                  <h3 className="certificate-title">{cert.title}</h3>
                  <p className="certificate-desc">{cert.description}</p>

                  {/* Skills / Topics */}
                  <div className="certificate-skills-wrap">
                    {cert.skills.slice(0, 3).map((skill) => (
                      <span key={skill} className="cert-skill-pill mono">
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Card Bottom Action */}
                  <div className="certificate-card-footer mono">
                    <span className="cert-action-link" style={{ color: cert.accent }}>
                      <span>INSPECT CREDENTIAL</span>
                      <ChevronRight size={14} />
                    </span>
                    <span className="cert-verified-icon" title="Authentic Credential">
                      <CheckCircle2 size={15} className="text-emerald" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Full Certificate Lightbox / Modal */}
      {selectedCert && (
        <div
          className="lightbox-backdrop cert-modal-backdrop"
          onClick={() => {
            playClickSound();
            setSelectedCert(null);
            setIsZoomed(false);
          }}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="lightbox-container cert-modal-container"
            onClick={(e) => e.stopPropagation()}
            style={{ '--modal-accent': selectedCert.accent }}
          >
            {/* Modal Header Bar */}
            <div className="cert-modal-header">
              <div className="cert-modal-header-meta mono">
                <span
                  className="cert-modal-issuer-badge"
                  style={{ color: selectedCert.accent, borderColor: `${selectedCert.accent}60` }}
                >
                  <Award size={13} />
                  {selectedCert.issuer}
                </span>
                <span className="sep">•</span>
                <span>{selectedCert.category}</span>
                <span className="sep">•</span>
                <span className="text-emerald inline-flex items-center gap-1">
                  <CheckCircle2 size={13} />
                  VERIFIED
                </span>
              </div>

              <div className="cert-modal-actions">
                <button
                  type="button"
                  className={`cert-header-btn ${isZoomed ? 'active' : ''}`}
                  onClick={() => setIsZoomed(!isZoomed)}
                  title={isZoomed ? 'Fit to window' : 'Zoom 100%'}
                  aria-label="Toggle certificate zoom"
                >
                  <Maximize2 size={16} />
                </button>
                <a
                  href={selectedCert.image}
                  download={`${selectedCert.title.replace(/\s+/g, '_')}_Certificate`}
                  className="cert-header-btn"
                  title="Download Certificate Image"
                  onClick={playClickSound}
                >
                  <Download size={16} />
                </a>
                <button
                  type="button"
                  className="lightbox-close-btn"
                  onClick={() => {
                    playClickSound();
                    setSelectedCert(null);
                    setIsZoomed(false);
                  }}
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Certificate High-Res Viewer */}
            <div className={`cert-modal-image-stage ${isZoomed ? 'zoomed' : ''}`}>
              {/* Modal Prev / Next Overlay Buttons */}
              <button
                type="button"
                className="cert-modal-nav-arrow prev"
                onClick={() => navigateModal(-1)}
                aria-label="Previous certificate"
                title="Previous (Left Arrow)"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                type="button"
                className="cert-modal-nav-arrow next"
                onClick={() => navigateModal(1)}
                aria-label="Next certificate"
                title="Next (Right Arrow)"
              >
                <ChevronRight size={24} />
              </button>

              <img
                src={selectedCert.image}
                alt={selectedCert.title}
                className="cert-modal-full-img"
              />
            </div>

            {/* Certificate Detailed Footer Strip */}
            <div className="cert-modal-footer-box">
              <div className="cert-modal-content-left">
                <h2 className="cert-modal-title">{selectedCert.title}</h2>
                <p className="cert-modal-desc">{selectedCert.description}</p>

                <div className="cert-modal-pills mono">
                  <div className="cert-info-badge">
                    <Calendar size={13} className="text-cyan" />
                    <span>Issued: <strong>{selectedCert.issueDate}</strong></span>
                  </div>
                  {selectedCert.credentialId && (
                    <div className="cert-info-badge">
                      <ShieldCheck size={13} className="text-emerald" />
                      <span>ID: <strong>{selectedCert.credentialId}</strong></span>
                    </div>
                  )}
                  {selectedCert.validUntil && (
                    <div className="cert-info-badge">
                      <Sparkles size={13} className="text-amber" />
                      <span>Validity: <strong>{selectedCert.validUntil}</strong></span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="cert-modal-content-right">
                {selectedCert.verifyUrl && (
                  <a
                    href={selectedCert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary mono cert-verify-btn"
                    onClick={playClickSound}
                  >
                    <span>VERIFY CREDENTIAL</span>
                    <ExternalLink size={15} />
                  </a>
                )}
                <a
                  href={selectedCert.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary mono cert-open-raw-btn"
                  onClick={playClickSound}
                >
                  <span>VIEW RAW FILE</span>
                  <ZoomIn size={15} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
