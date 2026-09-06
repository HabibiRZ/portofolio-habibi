import React, { useState, useEffect } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Layers,
  ArrowUpRight,
  Camera,
  Eye,
  Sparkles,
  Image as ImageIcon,
  Lock,
  ExternalLink,
  CheckCircle2,
  Database,
  Shield,
  Activity,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn
} from 'lucide-react';
import { workExperience } from '../data/portfolioData';
import { playHoverSound, playClickSound, playSwitchSound, playModalSound } from '../utils/soundEffects';
import ProjectModal from './ProjectModal';

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedArchId, setExpandedArchId] = useState(null);
  // Track selected screenshot index for each project
  const [activeScreenIndexes, setActiveScreenIndexes] = useState({
    'sipabs': 0,
    'bpjs-dashboard': 0,
    'disdukcapil': 0,
    'ai-attendance': 0
  });
  const [modalState, setModalState] = useState({ isOpen: false, project: null, initialIndex: 0 });
  const [photoViewerState, setPhotoViewerState] = useState({ isOpen: false, project: null, activeIndex: 0 });

  const categories = [
    { id: 'all', label: 'All Systems (4)' },
    { id: 'banking', label: 'Banking & Archival' },
    { id: 'admin', label: 'Public Administration' },
    { id: 'vision', label: 'Biometric AI & Vision' }
  ];

  const handleCategoryFilter = (id) => {
    playSwitchSound();
    setActiveCategory(id);
  };

  const filteredProjects = workExperience.filter((item) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'banking') return item.id === 'sipabs';
    if (activeCategory === 'admin') return item.id === 'bpjs-dashboard' || item.id === 'disdukcapil';
    if (activeCategory === 'vision') return item.id === 'ai-attendance';
    return true;
  });

  const handleSelectScreen = (projectId, index, e) => {
    e.stopPropagation();
    playSwitchSound();
    setActiveScreenIndexes((prev) => ({ ...prev, [projectId]: index }));
  };

  const handleOpenModal = (project, initialIndex = 0, e = null) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    playModalSound();
    setModalState({ isOpen: true, project, initialIndex });
  };

  const handleCloseModal = () => {
    playClickSound();
    setModalState({ isOpen: false, project: null, initialIndex: 0 });
  };

  // Full Overview Picture Viewer (When pressing project images)
  const handleOpenPhotoViewer = (project, screenIndex = 0, e = null) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    playModalSound();
    setPhotoViewerState({ isOpen: true, project, activeIndex: screenIndex });
  };

  const handleClosePhotoViewer = () => {
    playClickSound();
    setPhotoViewerState({ isOpen: false, project: null, activeIndex: 0 });
  };

  const handleNextPhoto = (e = null) => {
    if (e) e.stopPropagation();
    if (!photoViewerState.project?.screenshots?.length) return;
    playSwitchSound();
    setPhotoViewerState((prev) => ({
      ...prev,
      activeIndex: (prev.activeIndex + 1) % prev.project.screenshots.length
    }));
  };

  const handlePrevPhoto = (e = null) => {
    if (e) e.stopPropagation();
    if (!photoViewerState.project?.screenshots?.length) return;
    playSwitchSound();
    setPhotoViewerState((prev) => ({
      ...prev,
      activeIndex: (prev.activeIndex - 1 + prev.project.screenshots.length) % prev.project.screenshots.length
    }));
  };

  // Keyboard navigation for photo viewer
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!photoViewerState.isOpen) return;
      if (e.key === 'Escape') {
        handleClosePhotoViewer();
      } else if (e.key === 'ArrowRight') {
        handleNextPhoto();
      } else if (e.key === 'ArrowLeft') {
        handlePrevPhoto();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [photoViewerState.isOpen]);

  const toggleArchDrawer = (id, e) => {
    e.stopPropagation();
    playClickSound();
    setExpandedArchId((prev) => (prev === id ? null : id));
  };

  // Map simulated URLs for the browser bar
  const getSimulatedUrl = (id) => {
    switch (id) {
      case 'sipabs':
        return 'https://sipabs.banksumut.co.id/archive-ledger/audit';
      case 'bpjs-dashboard':
        return 'https://sertakan.bpjsketenagakerjaan.go.id/medan/monitoring';
      case 'disdukcapil':
        return 'https://keuangan.disdukcapil.medan.go.id/budget-ledger';
      case 'ai-attendance':
        return 'https://attendance.vision.internal/biometric-gate';
      default:
        return 'https://habibi-systems.internal/production';
    }
  };

  return (
    <section className="section-block" id="work">
      <div className="wrap">
        {/* Section Header with Volume Badge */}
        <div className="section-header-row reveal-on-scroll">
          <div>
            <div className="system-layer-badge mono">
              <span className="layer-bracket">[</span>
              <span className="layer-num text-sky">LAYER 02</span>
              <span className="layer-sep">//</span>
              <span className="layer-name">PRODUCTION SYSTEMS &amp; ENTERPRISE ARCHITECTURE</span>
              <span className="layer-bracket">]</span>
            </div>
            <h2 className="volume-heading">
              Proven <span className="font-serif-italic text-sky">systems.</span> <br />
              Measurable <span className="font-serif-italic">impact.</span>
            </h2>
            <p className="volume-subtext">
              Battle-tested institutional software spanning regional banking digitization, municipal public administration, and biometric verification — complete with production audits and interactive screen viewports.
            </p>
          </div>
          <div className="section-header-note mono">
            <span className="live-screens-pill">
              <span className="pulse-ping-dot" />
              <span>13 PRODUCTION SCREENS AUDITED</span>
            </span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="skills-filter-tabs reveal-on-scroll delay-1" style={{ marginBottom: '32px' }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`skills-tab-btn mono ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => handleCategoryFilter(cat.id)}
              onMouseEnter={playHoverSound}
            >
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Flagship Projects Dual-Panel Deck */}
        <div className="flagship-projects-wrapper reveal-on-scroll delay-1">
          {filteredProjects.map((item) => {
            const hasScreens = item.screenshots && item.screenshots.length > 0;
            const currentIdx = activeScreenIndexes[item.id] || 0;
            const currentScreen = hasScreens ? item.screenshots[currentIdx] : null;
            const isArchOpen = expandedArchId === item.id;

            return (
              <div
                key={item.id}
                className="flagship-project-card spotlight-card"
                style={{
                  '--project-accent': item.accentColor,
                  '--project-glow': `${item.accentColor}25`
                }}
                onMouseEnter={playHoverSound}
              >
                <div className="flagship-layout">
                  {/* Left Column: Control Deck & System Metadata */}
                  <div className="flagship-deck">
                    <div className="flagship-deck-header">
                      <div className="flagship-index-tag">
                        <span>{item.index} //</span>
                        <span>{item.type.toUpperCase()}</span>
                      </div>
                      <div className="flagship-sector-badge">
                        <span>{item.period}</span>
                      </div>
                    </div>

                    <h3 className="flagship-title">
                      {item.title}
                    </h3>

                    <div className="flagship-org-row">
                      <span style={{ color: item.accentColor, fontWeight: '700' }}>{item.org}</span>
                      <span>•</span>
                      <span>{item.role}</span>
                      <span>•</span>
                      <span>{item.teamSize}</span>
                    </div>

                    <p className="flagship-summary">
                      {item.summary}
                    </p>

                    {/* Impact Callout Box */}
                    <div className="flagship-impact-callout">
                      <div className="mono" style={{ fontSize: '0.72rem', color: item.accentColor, letterSpacing: '0.1em', marginBottom: '4px' }}>
                        OUTCOME &amp; LEARNING
                      </div>
                      <span className="font-serif-italic">"{item.outcome}"</span>
                    </div>

                    {/* Tech Stack Chips */}
                    <div className="flagship-chips-row">
                      {item.chips.map((chip) => (
                        <span key={chip} className="flagship-chip">
                          {chip}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flagship-actions-row">
                      <button
                        type="button"
                        className="flagship-btn-primary"
                        onClick={(e) => handleOpenModal(item, currentIdx, e)}
                        onMouseEnter={playHoverSound}
                      >
                        <Eye size={15} />
                        <span>INSPECT PRODUCTION UI</span>
                      </button>

                      <button
                        type="button"
                        className="flagship-btn-secondary"
                        onClick={(e) => toggleArchDrawer(item.id, e)}
                        onMouseEnter={playHoverSound}
                      >
                        <Layers size={15} />
                        <span>{isArchOpen ? 'HIDE ARCHITECTURE' : 'SYSTEM BLUEPRINT'}</span>
                        {isArchOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Simulated Browser Viewport Window */}
                  <div className="flagship-browser-window">
                    <div className="flagship-browser-bar">
                      <div className="flagship-traffic-dots">
                        <span className="traffic-dot red" />
                        <span className="traffic-dot yellow" />
                        <span className="traffic-dot green" />
                      </div>
                      <div className="flagship-browser-url">
                        <Lock size={12} className="text-emerald" />
                        <span>{getSimulatedUrl(item.id)}</span>
                      </div>
                      <div className="mono" style={{ fontSize: '0.7rem', color: item.accentColor }}>
                        AUDITED
                      </div>
                    </div>

                    {/* Interactive Stage - Opens Full Overview Picture on Click */}
                    {hasScreens && currentScreen && (
                      <div
                        className="flagship-browser-stage"
                        onClick={(e) => handleOpenPhotoViewer(item, currentIdx, e)}
                        title="Click to view full overview picture"
                      >
                        <img
                          src={currentScreen.url}
                          alt={currentScreen.title}
                          className="flagship-browser-img"
                          loading="lazy"
                        />
                        <div className="flagship-browser-overlay">
                          <div className="flagship-stage-caption">{currentScreen.title}</div>
                          <div className="flagship-stage-tag">{currentScreen.tag} • CLICK FOR FULL PICTURE</div>
                        </div>
                      </div>
                    )}

                    {/* Thumbnail Switcher Bar */}
                    {hasScreens && item.screenshots.length > 1 && (
                      <div className="flagship-thumbs-carousel">
                        {item.screenshots.map((s, idx) => (
                          <button
                            key={idx}
                            type="button"
                            className={`flagship-thumb-btn ${currentIdx === idx ? 'active' : ''}`}
                            onClick={(e) => handleSelectScreen(item.id, idx, e)}
                            onMouseEnter={playHoverSound}
                            title={s.title}
                          >
                            <img src={s.url} alt={s.title} className="flagship-thumb-img" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Expandable Architecture Blueprint Drawer */}
                {isArchOpen && item.architecture && (
                  <div className="flagship-arch-drawer reveal-on-scroll">
                    <div>
                      <div className="flagship-arch-title">ARCHITECTURE OVERVIEW</div>
                      <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', margin: '0 0 12px 0', lineHeight: '1.6' }}>
                        {item.architecture.overview}
                      </p>
                      <div className="flagship-chips-row">
                        {item.architecture.stack.map((s) => (
                          <span key={s} className="flagship-chip mono" style={{ background: 'rgba(56, 189, 248, 0.08)', color: '#38bdf8' }}>
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flagship-arch-title">ENGINEERING HIGHLIGHTS</div>
                      <ul className="flagship-arch-list mono">
                        {item.architecture.highlights.map((h, i) => (
                          <li key={i}>
                            <CheckCircle2 size={14} className="text-emerald" style={{ flexShrink: 0, marginTop: '3px' }} />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Full Detailed Inspection Modal (Opened only by 'INSPECT PRODUCTION UI' button) */}
      <ProjectModal
        isOpen={modalState.isOpen}
        project={modalState.project}
        initialIndex={modalState.initialIndex}
        onClose={handleCloseModal}
      />

      {/* Fullscreen Picture Overview Lightbox (Opened when clicking project images) */}
      {photoViewerState.isOpen && photoViewerState.project?.screenshots && (
        <div
          className="fullscreen-lightbox-backdrop"
          onClick={handleClosePhotoViewer}
          role="dialog"
          aria-modal="true"
        >
          <div className="lightbox-content-box" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-top-bar">
              <div className="lightbox-title-wrap mono">
                <span className="lightbox-count">
                  {String(photoViewerState.activeIndex + 1).padStart(2, '0')} / {String(photoViewerState.project.screenshots.length).padStart(2, '0')}
                </span>
                <span className="sep">•</span>
                <span className="lightbox-title">
                  {photoViewerState.project.screenshots[photoViewerState.activeIndex]?.title}
                </span>
                <span className="sep">•</span>
                <span className="text-sky font-semibold">
                  {photoViewerState.project.org}
                </span>
              </div>
              <button
                type="button"
                className="lightbox-close-btn"
                onClick={handleClosePhotoViewer}
                aria-label="Close picture overview"
                onMouseEnter={playHoverSound}
              >
                <X size={20} />
              </button>
            </div>

            <div className="lightbox-image-wrap">
              <img
                src={photoViewerState.project.screenshots[photoViewerState.activeIndex]?.url}
                alt={photoViewerState.project.screenshots[photoViewerState.activeIndex]?.title}
                className="lightbox-full-img"
              />

              {photoViewerState.project.screenshots.length > 1 && (
                <>
                  <button
                    type="button"
                    className="lightbox-nav-btn prev"
                    onClick={handlePrevPhoto}
                    aria-label="Previous capture"
                    onMouseEnter={playHoverSound}
                  >
                    <ChevronLeft size={28} />
                  </button>
                  <button
                    type="button"
                    className="lightbox-nav-btn next"
                    onClick={handleNextPhoto}
                    aria-label="Next capture"
                    onMouseEnter={playHoverSound}
                  >
                    <ChevronRight size={28} />
                  </button>
                </>
              )}
            </div>

            <div className="lightbox-bottom-bar">
              <p className="lightbox-desc">
                {photoViewerState.project.screenshots[photoViewerState.activeIndex]?.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
