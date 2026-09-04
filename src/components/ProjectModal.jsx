import React, { useState, useEffect } from 'react';
import {
  X,
  Layers,
  CheckCircle,
  Cpu,
  Building2,
  Calendar,
  Users,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ZoomIn,
  Camera,
  Info,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { playHoverSound, playClickSound, playSwitchSound } from '../utils/soundEffects';

export default function ProjectModal({ project, initialImageIndex = 0, onClose }) {
  const [activeImageIdx, setActiveImageIdx] = useState(initialImageIndex);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const hasScreenshots = project?.screenshots && project.screenshots.length > 0;
  const currentScreenshot = hasScreenshots ? project.screenshots[activeImageIdx] : null;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isLightboxOpen) {
          setIsLightboxOpen(false);
        } else {
          onClose();
        }
      } else if (e.key === 'ArrowRight' && hasScreenshots) {
        handleNextImage();
      } else if (e.key === 'ArrowLeft' && hasScreenshots) {
        handlePrevImage();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, activeImageIdx, hasScreenshots, onClose]);

  const handleNextImage = (e) => {
    if (e) e.stopPropagation();
    if (!hasScreenshots) return;
    playSwitchSound();
    setActiveImageIdx((prev) => (prev + 1) % project.screenshots.length);
  };

  const handlePrevImage = (e) => {
    if (e) e.stopPropagation();
    if (!hasScreenshots) return;
    playSwitchSound();
    setActiveImageIdx((prev) => (prev - 1 + project.screenshots.length) % project.screenshots.length);
  };

  const handleSelectImage = (idx, e) => {
    if (e) e.stopPropagation();
    playSwitchSound();
    setActiveImageIdx(idx);
  };

  if (!project) return null;

  return (
    <>
      <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
        <div className="modal-container spotlight-modal" onClick={(e) => e.stopPropagation()}>
          {/* Modal Header */}
          <div className="modal-header">
            <div className="modal-header-meta">
              <span className="modal-index mono">{project.index}</span>
              <span
                className="modal-badge mono"
                style={{ borderColor: project.accentColor, color: project.accentColor }}
              >
                {project.type}
              </span>
              {hasScreenshots && (
                <span className="modal-screen-count mono">
                  <Camera size={13} className="text-emerald" />
                  <span>{project.screenshots.length} Screenshots</span>
                </span>
              )}
            </div>
            <button
              type="button"
              className="modal-close-btn"
              onClick={onClose}
              aria-label="Close modal"
              onMouseEnter={playHoverSound}
            >
              <X size={20} />
            </button>
          </div>

          {/* Modal Title & Org */}
          <div className="modal-title-block">
            <h2 className="modal-title">{project.title}</h2>
            <div className="modal-org-strip mono">
              <span className="inline-flex items-center gap-1">
                <Building2 size={14} className="text-emerald" />
                {project.org}
              </span>
              <span className="sep">•</span>
              <span className="inline-flex items-center gap-1">
                <Calendar size={14} />
                {project.period}
              </span>
              <span className="sep">•</span>
              <span className="inline-flex items-center gap-1">
                <Users size={14} />
                {project.teamSize}
              </span>
            </div>
          </div>

          {/* Modal Body */}
          <div className="modal-body">
            {/* Interactive Production Screenshot Walkthrough */}
            {hasScreenshots && currentScreenshot && (
              <div className="modal-gallery-section">
                <div className="gallery-section-header mono">
                  <div className="gallery-header-left">
                    <Sparkles size={15} className="text-emerald" />
                    <span>PRODUCTION SYSTEM CAPTURES</span>
                  </div>
                  <div className="gallery-header-right">
                    <span className="gallery-counter-tag">
                      {String(activeImageIdx + 1).padStart(2, '0')} / {String(project.screenshots.length).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                {/* Main Image Display Box */}
                <div className="modal-main-display-frame">
                  <div className="modal-image-viewport">
                    <img
                      key={currentScreenshot.url}
                      src={currentScreenshot.url}
                      alt={currentScreenshot.title}
                      className="modal-featured-image"
                      onClick={() => setIsLightboxOpen(true)}
                    />

                    {/* Cyber Scan Effect */}
                    <div className="cyber-scanner-line" />

                    {/* Lightbox / Zoom Action Overlay */}
                    <button
                      type="button"
                      className="modal-zoom-btn mono"
                      onClick={() => setIsLightboxOpen(true)}
                      onMouseEnter={playHoverSound}
                      title="Open full resolution inspection"
                    >
                      <ZoomIn size={15} />
                      <span>Full Resolution</span>
                    </button>

                    {/* Navigation Buttons */}
                    {project.screenshots.length > 1 && (
                      <>
                        <button
                          type="button"
                          className="gallery-nav-arrow arrow-left"
                          onClick={handlePrevImage}
                          aria-label="Previous screenshot"
                          onMouseEnter={playHoverSound}
                        >
                          <ChevronLeft size={22} />
                        </button>
                        <button
                          type="button"
                          className="gallery-nav-arrow arrow-right"
                          onClick={handleNextImage}
                          aria-label="Next screenshot"
                          onMouseEnter={playHoverSound}
                        >
                          <ChevronRight size={22} />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Active Caption Details */}
                  <div className="modal-image-caption-panel">
                    <div className="caption-meta-row">
                      <h4 className="caption-title">{currentScreenshot.title}</h4>
                      <span className="caption-tag-pill mono">{currentScreenshot.tag}</span>
                    </div>
                    <p className="caption-description">{currentScreenshot.description}</p>
                  </div>

                  {/* Interactive Thumbnail Filmstrip */}
                  {project.screenshots.length > 1 && (
                    <div className="modal-thumbnails-strip">
                      {project.screenshots.map((screen, idx) => {
                        const isActive = idx === activeImageIdx;
                        return (
                          <button
                            key={screen.url}
                            type="button"
                            className={`modal-thumb-btn ${isActive ? 'active' : ''}`}
                            onClick={(e) => handleSelectImage(idx, e)}
                            onMouseEnter={playHoverSound}
                            title={screen.title}
                          >
                            <img src={screen.url} alt={screen.title} className="modal-thumb-img" />
                            <span className="thumb-idx-badge mono">{idx + 1}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Architecture Overview */}
            <div className="modal-section">
              <div className="modal-section-title mono">
                <Layers size={16} className="text-emerald" />
                <span>SYSTEM ARCHITECTURE &amp; OVERVIEW</span>
              </div>
              <p className="modal-desc">{project.architecture?.overview || project.summary}</p>
            </div>

            {/* Key Engineering Highlights */}
            {project.architecture?.highlights && (
              <div className="modal-section">
                <div className="modal-section-title mono">
                  <CheckCircle size={16} className="text-cyan" />
                  <span>TECHNICAL HIGHLIGHTS &amp; DELIVERABLES</span>
                </div>
                <ul className="modal-highlights-list">
                  {project.architecture.highlights.map((h, i) => (
                    <li key={i} className="highlight-item">
                      <span className="highlight-bullet mono">0{i + 1}</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech Stack */}
            <div className="modal-section">
              <div className="modal-section-title mono">
                <Cpu size={16} className="text-amber" />
                <span>PRODUCTION TECHNOLOGY STACK</span>
              </div>
              <div className="modal-tech-chips">
                {(project.architecture?.stack || project.chips).map((tech) => (
                  <span key={tech} className="tech-chip mono">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Takeaway Outcome */}
            <div className="modal-outcome-box">
              <span className="modal-outcome-label mono">CORE TAKEAWAY //</span>
              <p className="modal-outcome-text">"{project.outcome}"</p>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen High-Resolution Lightbox */}
      {isLightboxOpen && currentScreenshot && (
        <div
          className="fullscreen-lightbox-backdrop"
          onClick={() => setIsLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div className="lightbox-content-box" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-top-bar">
              <div className="lightbox-title-wrap mono">
                <span className="lightbox-count">
                  {String(activeImageIdx + 1).padStart(2, '0')} / {String(project.screenshots.length).padStart(2, '0')}
                </span>
                <span className="sep">•</span>
                <span className="lightbox-title">{currentScreenshot.title}</span>
              </div>
              <button
                type="button"
                className="lightbox-close-btn"
                onClick={() => setIsLightboxOpen(false)}
                aria-label="Close fullscreen inspection"
              >
                <X size={22} />
              </button>
            </div>

            <div className="lightbox-image-wrap">
              <img
                src={currentScreenshot.url}
                alt={currentScreenshot.title}
                className="lightbox-full-img"
              />

              {project.screenshots.length > 1 && (
                <>
                  <button
                    type="button"
                    className="lightbox-nav-btn prev"
                    onClick={handlePrevImage}
                    aria-label="Previous"
                  >
                    <ChevronLeft size={28} />
                  </button>
                  <button
                    type="button"
                    className="lightbox-nav-btn next"
                    onClick={handleNextImage}
                    aria-label="Next"
                  >
                    <ChevronRight size={28} />
                  </button>
                </>
              )}
            </div>

            <div className="lightbox-bottom-bar">
              <p className="lightbox-desc">{currentScreenshot.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
