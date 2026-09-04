import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Layers, ArrowUpRight, Camera, Eye, Sparkles, Image as ImageIcon } from 'lucide-react';
import { workExperience } from '../data/portfolioData';
import { playHoverSound, playClickSound, playSwitchSound, playModalSound } from '../utils/soundEffects';
import ProjectModal from './ProjectModal';

export default function Projects() {
  const [expandedId, setExpandedId] = useState('sipabs');
  const [modalState, setModalState] = useState({ isOpen: false, project: null, initialIndex: 0 });

  const toggleExpand = (id) => {
    playSwitchSound();
    setExpandedId((prev) => (prev === id ? null : id));
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

  const handleCardMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section className="section-block" id="work">
      <div className="wrap">
        {/* Section Header */}
        <div className="section-header-row reveal-on-scroll">
          <div>
            <div className="section-category-tag mono">
              <span className="dot-emerald" />
              <span>PRODUCTION SYSTEMS &amp; ARCHITECTURE</span>
            </div>
            <h2 className="section-heading">What I've Engineered</h2>
            <p className="section-subtext">
              Four battle-tested systems spanning regional banking, public administration, municipal finance, and computer vision — complete with production screenshots and technical architecture.
            </p>
          </div>
          <div className="section-header-note mono">
            <span className="live-screens-pill">
              <span className="pulse-ping-dot" />
              <span>13 PRODUCTION SCREENS VERIFIED</span>
            </span>
          </div>
        </div>

        {/* Work Cards Grid / List */}
        <div className="work-cards-grid reveal-on-scroll delay-1">
          {workExperience.map((item) => {
            const isExpanded = expandedId === item.id;
            const hasScreenshots = item.screenshots && item.screenshots.length > 0;

            return (
              <div
                key={item.id}
                className={`work-card spotlight-card ${isExpanded ? 'card-expanded' : ''}`}
                style={{ '--card-accent': item.accentColor }}
                onClick={() => toggleExpand(item.id)}
                onMouseEnter={playHoverSound}
                onMouseMove={handleCardMouseMove}
              >
                {/* Accent Top Border Bar */}
                <div className="card-accent-bar" style={{ backgroundColor: item.accentColor }} />

                <div className="work-card-header">
                  <div className="work-card-index mono">{item.index}</div>
                  <div
                    className="work-card-badge mono"
                    style={{ borderColor: `${item.accentColor}40`, color: item.accentColor }}
                  >
                    {item.type}
                  </div>

                  {hasScreenshots && (
                    <div className="card-screens-badge mono" title="Live production interface captures available">
                      <Camera size={12} className="text-emerald" />
                      <span>{item.screenshots.length} Screens</span>
                    </div>
                  )}

                  <button
                    type="button"
                    className="card-toggle-icon-btn"
                    aria-label="Toggle details"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExpand(item.id);
                    }}
                  >
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                </div>

                <div className="work-card-body">
                  <div className="work-card-top-info">
                    <div>
                      <h3 className="work-card-title">{item.title}</h3>
                      <div className="work-card-org mono">{item.org}</div>
                    </div>
                  </div>

                  <p className="work-card-summary">{item.summary}</p>

                  {/* Chips */}
                  <div className="work-card-chips">
                    {item.chips.map((chip) => (
                      <span key={chip} className="chip-badge mono">
                        {chip}
                      </span>
                    ))}
                  </div>

                  {/* Interactive Screenshot Quick-Strip */}
                  {hasScreenshots && (
                    <div className="card-screenshots-preview-strip">
                      <div className="preview-strip-header mono">
                        <span className="preview-strip-label">
                          <ImageIcon size={13} className="text-emerald" />
                          <span>PRODUCTION SCREENSHOTS ({item.screenshots.length})</span>
                        </span>
                        <span className="preview-strip-hint">Click thumbnail to inspect</span>
                      </div>
                      <div className="preview-thumbnails-row">
                        {item.screenshots.map((screen, idx) => (
                          <div
                            key={screen.url}
                            className="preview-thumb-card"
                            onClick={(e) => handleOpenModal(item, idx, e)}
                            onMouseEnter={playHoverSound}
                            title={`${screen.title} — Click to inspect`}
                          >
                            <div className="thumb-img-wrap">
                              <img
                                src={screen.url}
                                alt={screen.title}
                                loading="lazy"
                                className="thumb-preview-img"
                              />
                              <div className="thumb-hover-overlay">
                                <Eye size={18} className="thumb-zoom-icon" />
                                <span className="thumb-index-tag mono">{idx + 1}/{item.screenshots.length}</span>
                              </div>
                            </div>
                            <div className="thumb-caption-meta mono">
                              <span className="thumb-tag">{screen.tag}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Expandable Outcome Area */}
                  <div className={`work-outcome-drawer ${isExpanded ? 'open' : ''}`}>
                    <div className="work-outcome-inner">
                      <div className="outcome-quote-box">
                        <span className="outcome-tag mono">CORE LESSON //</span>
                        <p className="outcome-quote">"{item.outcome}"</p>
                      </div>

                      <div className="card-actions-row">
                        <button
                          type="button"
                          className="btn-view-architecture mono"
                          onClick={(e) => handleOpenModal(item, 0, e)}
                          onMouseEnter={playHoverSound}
                        >
                          <Layers size={15} />
                          <span>View Screenshots &amp; System Architecture</span>
                          <ArrowUpRight size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail Modal with Interactive Screenshot Gallery */}
      {modalState.isOpen && modalState.project && (
        <ProjectModal
          project={modalState.project}
          initialImageIndex={modalState.initialIndex}
          onClose={handleCloseModal}
        />
      )}
    </section>
  );
}
