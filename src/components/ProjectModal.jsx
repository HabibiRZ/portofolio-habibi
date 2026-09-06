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
  Sparkles,
  Lock,
  ArrowRight,
  Terminal
} from 'lucide-react';
import { playHoverSound, playClickSound, playSwitchSound } from '../utils/soundEffects';

function getSimulatedUrl(id) {
  switch (id) {
    case 'sipabs':
      return 'https://internal.banksumut.co.id/sipabs/v2/ledger';
    case 'bpjs-dashboard':
      return 'https://sertakan.bpjsketenagakerjaan.go.id/monitoring';
    case 'disdukcapil':
      return 'https://disdukcapil.medan.go.id/pelayanan/antrian';
    case 'ai-attendance':
      return 'https://vision.usu.ac.id/attendance/biometrics';
    default:
      return 'https://production.internal/system/audit';
  }
}

export default function ProjectModal({ project, initialImageIndex = 0, onClose }) {
  const [activeImageIdx, setActiveImageIdx] = useState(initialImageIndex);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Sync initial index if prop changes
  useEffect(() => {
    setActiveImageIdx(initialImageIndex);
  }, [initialImageIndex]);

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

  // Prevent body scrolling while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

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
        <div className="modal-container executive-inspection-modal" onClick={(e) => e.stopPropagation()}>
          {/* Executive Window Chrome Bar */}
          <div className="modal-chrome-bar">
            <div className="modal-traffic-controls">
              <span className="window-dot red" onClick={onClose} title="Close inspection" />
              <span className="window-dot yellow" />
              <span className="window-dot green" />
            </div>

            <div className="modal-url-telemetry mono">
              <Lock size={12} className="text-emerald" />
              <span className="modal-url-text">{getSimulatedUrl(project.id)}</span>
            </div>

            <div className="modal-chrome-actions">
              <span className="modal-badge-system mono" style={{ color: project.accentColor, borderColor: `${project.accentColor}40` }}>
                {project.type || 'ENTERPRISE SYSTEM'}
              </span>
              <button
                type="button"
                className="modal-close-btn-executive"
                onClick={onClose}
                aria-label="Close modal"
                onMouseEnter={playHoverSound}
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Modal Header Dossier Info */}
          <div className="modal-dossier-header">
            <div className="modal-header-left-block">
              <div className="modal-id-pill mono">
                <span>SYSTEM BLUEPRINT // {project.index || '01'}</span>
                {hasScreenshots && (
                  <>
                    <span className="sep">•</span>
                    <span className="text-emerald font-semibold">{project.screenshots.length} PRODUCTION CAPTURES</span>
                  </>
                )}
              </div>
              <h2 className="modal-title-executive">{project.title}</h2>
              <div className="modal-meta-strip mono">
                <span className="meta-org-item">
                  <Building2 size={14} className="text-sky" />
                  <span>{project.org}</span>
                </span>
                <span className="sep">•</span>
                <span className="meta-org-item">
                  <Calendar size={14} className="text-dim" />
                  <span>{project.period}</span>
                </span>
                <span className="sep">•</span>
                <span className="meta-org-item">
                  <Users size={14} className="text-dim" />
                  <span>{project.teamSize}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Modal Scrollable Body */}
          <div className="modal-body-executive">
            {/* ── Section 1: Crisp Production UI Stage ── */}
            {hasScreenshots && currentScreenshot && (
              <div className="modal-stage-wrapper">
                {/* Stage Header Info */}
                <div className="modal-stage-toolbar mono">
                  <div className="stage-toolbar-left">
                    <Terminal size={14} className="text-sky" />
                    <span className="stage-title-bold">{currentScreenshot.title}</span>
                    <span className="stage-tag-badge">{currentScreenshot.tag}</span>
                  </div>

                  <div className="stage-toolbar-right">
                    <span className="stage-counter-chip">
                      FRAME {String(activeImageIdx + 1).padStart(2, '0')} / {String(project.screenshots.length).padStart(2, '0')}
                    </span>
                    <button
                      type="button"
                      className="stage-zoom-btn"
                      onClick={() => setIsLightboxOpen(true)}
                      onMouseEnter={playHoverSound}
                      title="Inspect full resolution"
                    >
                      <ZoomIn size={14} />
                      <span>EXPAND VIEW</span>
                    </button>
                  </div>
                </div>

                {/* Primary High-Resolution Screenshot Canvas (No Laser Line) */}
                <div className="modal-viewport-canvas" onClick={() => setIsLightboxOpen(true)}>
                  <img
                    key={currentScreenshot.url}
                    src={currentScreenshot.url}
                    alt={currentScreenshot.title}
                    className="modal-screen-img"
                    loading="eager"
                  />

                  {/* Gentle Floating Navigation Chevrons */}
                  {project.screenshots.length > 1 && (
                    <>
                      <button
                        type="button"
                        className="modal-canvas-nav prev"
                        onClick={handlePrevImage}
                        aria-label="Previous capture"
                        onMouseEnter={playHoverSound}
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        type="button"
                        className="modal-canvas-nav next"
                        onClick={handleNextImage}
                        aria-label="Next capture"
                        onMouseEnter={playHoverSound}
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}
                </div>

                {/* Filmstrip Thumbnail Switcher */}
                {project.screenshots.length > 1 && (
                  <div className="modal-thumb-filmstrip">
                    {project.screenshots.map((screen, idx) => {
                      const isActive = idx === activeImageIdx;
                      return (
                        <button
                          key={screen.url}
                          type="button"
                          className={`modal-filmstrip-item ${isActive ? 'active' : ''}`}
                          onClick={(e) => handleSelectImage(idx, e)}
                          onMouseEnter={playHoverSound}
                          title={screen.title}
                        >
                          <img src={screen.url} alt={screen.title} className="modal-filmstrip-img" />
                          <div className="modal-filmstrip-label mono">
                            <span>0{idx + 1}</span>
                            <span className="filmstrip-name">{screen.title}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* ── Section 2: 2-Column Architectural Dossier Deck ── */}
            <div className="modal-dossier-grid">
              {/* Left Column: Screen Context & Impact */}
              <div className="modal-dossier-col left">
                {currentScreenshot?.description && (
                  <div className="dossier-card">
                    <div className="dossier-card-title mono">
                      <Sparkles size={14} className="text-sky" />
                      <span>WORKFLOW &amp; OPERATIONAL CONTEXT</span>
                    </div>
                    <p className="dossier-card-text">
                      {currentScreenshot.description}
                    </p>
                  </div>
                )}

                <div className="dossier-card outcome-highlight">
                  <div className="dossier-card-title mono text-emerald">
                    <ShieldCheck size={15} />
                    <span>PRODUCTION OUTCOME &amp; SLA</span>
                  </div>
                  <p className="dossier-outcome-quote">
                    "{project.outcome}"
                  </p>
                </div>
              </div>

              {/* Right Column: Architecture Blueprint & Technical Highlights */}
              <div className="modal-dossier-col right">
                {/* Architecture Overview */}
                <div className="dossier-card">
                  <div className="dossier-card-title mono">
                    <Layers size={14} className="text-sky" />
                    <span>SYSTEM ARCHITECTURE OVERVIEW</span>
                  </div>
                  <p className="dossier-card-text">
                    {project.architecture?.overview || project.summary}
                  </p>
                </div>

                {/* Highlights List */}
                {project.architecture?.highlights && (
                  <div className="dossier-card">
                    <div className="dossier-card-title mono">
                      <CheckCircle size={14} className="text-emerald" />
                      <span>ENGINEERING DELIVERABLES &amp; RIGOR</span>
                    </div>
                    <ul className="dossier-highlights-list">
                      {project.architecture.highlights.map((h, i) => (
                        <li key={i}>
                          <span className="highlight-num mono">0{i + 1}</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tech Chips */}
                <div className="dossier-card">
                  <div className="dossier-card-title mono">
                    <Cpu size={14} className="text-amber" />
                    <span>VERIFIED PRODUCTION STACK</span>
                  </div>
                  <div className="modal-stack-chips mono">
                    {(project.architecture?.stack || project.chips).map((tech) => (
                      <span key={tech} className="modal-stack-chip">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
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
