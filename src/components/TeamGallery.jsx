import React, { useState, useEffect } from 'react';
import { Camera, MapPin, Calendar, Users, X, ZoomIn, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { internshipMoments } from '../data/portfolioData';
import { playHoverSound, playClickSound, playModalSound, playSwitchSound } from '../utils/soundEffects';

export default function TeamGallery() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activePhotoIndex, setActivePhotoIndex] = useState(null);

  const categories = [
    { id: 'all', label: `All Moments (${internshipMoments.length})` },
    { id: 'bank-sumut', label: 'PT. Bank Sumut' },
    { id: 'bpjs-team', label: 'BPJS Ketenagakerjaan' },
    { id: 'campus-dev', label: 'Campus & Honors' },
  ];

  const filteredMoments = activeFilter === 'all'
    ? internshipMoments
    : internshipMoments.filter((m) => m.category === activeFilter);

  const handleOpenPhoto = (item) => {
    playModalSound();
    const idx = internshipMoments.findIndex((m) => m.id === item.id);
    setActivePhotoIndex(idx !== -1 ? idx : 0);
  };

  const handleClosePhoto = () => {
    playClickSound();
    setActivePhotoIndex(null);
  };

  const navigatePhoto = (direction, e = null) => {
    if (e) e.stopPropagation();
    playClickSound();
    setActivePhotoIndex((prev) => {
      if (prev === null) return 0;
      const next = (prev + direction + internshipMoments.length) % internshipMoments.length;
      return next;
    });
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activePhotoIndex === null) return;
      if (e.key === 'Escape') {
        handleClosePhoto();
      } else if (e.key === 'ArrowRight') {
        navigatePhoto(1);
      } else if (e.key === 'ArrowLeft') {
        navigatePhoto(-1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoIndex]);

  const activePhoto = activePhotoIndex !== null ? internshipMoments[activePhotoIndex] : null;

  return (
    <section className="section-block" id="gallery">
      <div className="wrap">
        {/* Section Header */}
        <div className="section-header-row reveal-on-scroll">
          <div>
            <div className="volume-badge">
              <span className="dot-sky" />
              <span>VISUAL ARCHIVE // FIELD DOCUMENTATION</span>
            </div>
            <h2 className="volume-heading">
              Visual <span className="font-serif-italic text-sky">archive.</span> <br />
              Institutional <span className="font-serif-italic">collaboration.</span>
            </h2>
            <p className="volume-subtext">
              A curated photographic documentary of enterprise software sprints, banking archive digitization at PT. Bank Sumut, and IT cohorts at BPJS Ketenagakerjaan.
            </p>
          </div>

          <div className="section-header-note mono">
            <span className="live-screens-pill">
              <Camera size={13} className="text-sky" />
              <span>{internshipMoments.length} ARCHIVAL FRAMES</span>
            </span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="skills-filter-tabs reveal-on-scroll delay-1" style={{ marginBottom: '28px' }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`skills-tab-btn mono ${activeFilter === cat.id ? 'active' : ''}`}
              onClick={() => {
                playSwitchSound();
                setActiveFilter(cat.id);
              }}
              onMouseEnter={playHoverSound}
            >
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Cinematic Visual Archive Grid */}
        <div className="archive-grid reveal-on-scroll delay-2">
          {filteredMoments.map((item, idx) => (
            <div
              key={item.id}
              className="archive-film-card spotlight-card"
              onClick={() => handleOpenPhoto(item)}
              onMouseEnter={playHoverSound}
            >
              {/* Film Log Strip Header */}
              <div className="archive-film-header">
                <span>[ARCHIVE // LOG_{String(idx + 1).padStart(2, '0')}]</span>
                <span>{item.period}</span>
              </div>

              {/* Archival Photo Stage */}
              <div className="archive-stage">
                <img
                  src={item.image}
                  alt={item.title}
                  className="archive-img"
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <div className="archive-badge">
                  {item.tag}
                </div>

                <div className="archive-zoom-hover">
                  <span className="cert-vault-pill-btn">
                    <ZoomIn size={14} />
                    <span>EXPAND FRAME</span>
                  </span>
                </div>
              </div>

              {/* Caption & Metadata Panel */}
              <div className="archive-details">
                <div className="archive-org-line">
                  <span style={{ color: item.accent, fontWeight: '700' }}>{item.organization}</span>
                  <span>•</span>
                  <span>{item.location}</span>
                </div>

                <h3 className="archive-title">{item.title}</h3>
                <p className="archive-desc">{item.description}</p>

                <div className="archive-footer-row">
                  <span style={{ color: 'var(--color-sky)' }}>ROLE: {item.teamRole}</span>
                  <span>MEDAN, ID</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div className="lightbox-backdrop" onClick={handleClosePhoto} role="dialog" aria-modal="true">
          <div className="lightbox-container" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="lightbox-close-btn"
              onClick={handleClosePhoto}
              aria-label="Close photo preview"
            >
              <X size={20} />
            </button>

            {/* Navigation Arrows on Modal */}
            <button
              type="button"
              className="cert-modal-nav-arrow prev"
              onClick={(e) => navigatePhoto(-1, e)}
              aria-label="Previous photo"
              title="Previous (Left Arrow)"
              style={{ left: '16px' }}
            >
              <ChevronLeft size={24} />
            </button>

            <button
              type="button"
              className="cert-modal-nav-arrow next"
              onClick={(e) => navigatePhoto(1, e)}
              aria-label="Next photo"
              title="Next (Right Arrow)"
              style={{ right: '16px' }}
            >
              <ChevronRight size={24} />
            </button>

            <div className="lightbox-image-box">
              <img src={activePhoto.image} alt={activePhoto.title} className="lightbox-full-img" />
            </div>

            <div className="lightbox-details">
              <div className="lightbox-meta-strip mono">
                <span className="lightbox-org-badge" style={{ color: activePhoto.accent, borderColor: activePhoto.accent }}>
                  {activePhoto.organization}
                </span>
                <span className="sep">•</span>
                <span>{activePhoto.period}</span>
                <span className="sep">•</span>
                <span className="inline-flex items-center gap-1">
                  <MapPin size={13} className="text-sky" />
                  {activePhoto.location}
                </span>
              </div>

              <h2 className="lightbox-title">{activePhoto.title}</h2>
              <p className="lightbox-desc">{activePhoto.description}</p>

              <div className="lightbox-footer mono">
                <span>TEAM ROLE: <strong>{activePhoto.teamRole}</strong></span>
                <span className="text-dim">USE ARROWS ← → OR ESC TO CLOSE</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
