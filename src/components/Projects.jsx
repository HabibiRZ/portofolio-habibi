import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink, Layers, ArrowUpRight } from 'lucide-react';
import { workExperience } from '../data/portfolioData';
import { playHoverSound, playClickSound, playSwitchSound, playModalSound } from '../utils/soundEffects';
import ProjectModal from './ProjectModal';

export default function Projects() {
  const [expandedId, setExpandedId] = useState('bank-sumut');
  const [selectedProject, setSelectedProject] = useState(null);

  const toggleExpand = (id) => {
    playSwitchSound();
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleOpenModal = (project, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    playModalSound();
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    playClickSound();
    setSelectedProject(null);
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
              Four battle-tested systems spanning regional banking, public administration, municipal finance, and computer vision.
            </p>
          </div>
          <div className="section-header-note mono">
            <span>CLICK CARDS TO REVEAL DETAILS</span>
          </div>
        </div>

        {/* Work Cards Grid / List */}
        <div className="work-cards-grid reveal-on-scroll delay-1">
          {workExperience.map((item) => {
            const isExpanded = expandedId === item.id;
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
                  <div className="work-card-badge mono" style={{ borderColor: `${item.accentColor}40`, color: item.accentColor }}>
                    {item.type}
                  </div>
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
                  <h3 className="work-card-title">{item.title}</h3>
                  <div className="work-card-org mono">{item.org}</div>
                  <p className="work-card-summary">{item.summary}</p>

                  {/* Chips */}
                  <div className="work-card-chips">
                    {item.chips.map((chip) => (
                      <span key={chip} className="chip-badge mono">
                        {chip}
                      </span>
                    ))}
                  </div>

                  {/* Expandable Outcome Area */}
                  <div className={`work-outcome-drawer ${isExpanded ? 'open' : ''}`}>
                    <div className="work-outcome-inner">
                      <div className="outcome-quote-box">
                        <span className="outcome-tag mono">CORE LESSON //</span>
                        <p className="outcome-quote">"{item.outcome}"</p>
                      </div>

                      <button
                        type="button"
                        className="btn-view-architecture mono"
                        onClick={(e) => handleOpenModal(item, e)}
                        onMouseEnter={playHoverSound}
                      >
                        <Layers size={14} />
                        <span>View System Architecture Breakdown</span>
                        <ArrowUpRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={handleCloseModal}
        />
      )}
    </section>
  );
}
