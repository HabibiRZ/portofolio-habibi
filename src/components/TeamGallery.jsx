import React, { useState, useEffect } from 'react';
import { 
  Camera, 
  MapPin, 
  Calendar, 
  Users, 
  X, 
  ZoomIn, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles,
  Maximize2
} from 'lucide-react';
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

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activePhotoIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activePhotoIndex]);

  const activePhoto = activePhotoIndex !== null ? internshipMoments[activePhotoIndex] : null;

  // Helper for Bento spans when viewing all 7 photos
  const getBentoSpanClass = (index) => {
    if (activeFilter !== 'all') return '';
    switch (index) {
      case 0: return 'bento-span-7'; // Row 1 Left: Wide Lead Showcase (Bank Sumut SIPABS)
      case 1: return 'bento-span-5'; // Row 1 Right: Balanced Complement
      case 2: return 'bento-span-4'; // Row 2 Left
      case 3: return 'bento-span-4'; // Row 2 Center
      case 4: return 'bento-span-4'; // Row 2 Right
      case 5: return 'bento-span-5'; // Row 3 Left: Video wrap-up
      case 6: return 'bento-span-7'; // Row 3 Right: Graduation Day Showcase Finale!
      default: return 'bento-span-6';
    }
  };

  return (
    <section className="section-block" id="gallery">
      <div className="wrap">
        {/* Section Header */}
        <div className="section-header-row reveal-on-scroll">
          <div>
            <div className="system-layer-badge mono">
              <span className="layer-bracket">[</span>
              <span className="layer-num text-sky">LAYER 04</span>
              <span className="layer-sep">//</span>
              <span className="layer-name">FIELD ARCHIVE &amp; INSTITUTIONAL COLLABORATION</span>
              <span className="layer-bracket">]</span>
            </div>
            <h2 className="volume-heading">
              Visual <span className="font-serif-italic text-sky">archive.</span> <br />
              Institutional <span className="font-serif-italic">collaboration.</span>
            </h2>
            <p className="volume-subtext">
              A curated photographic documentary of enterprise software sprints, banking archive digitization at PT. Bank Sumut, and IT cohorts at BPJS Ketenagakerjaan.
            </p>
          </div>

          {/* Top Controls: Frame Counter */}
          <div className="gallery-top-controls mono">
            <span className="live-screens-pill">
              <Camera size={13} className="text-sky" />
              <span>{filteredMoments.length} ARCHIVAL FRAMES</span>
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

        {/* ── Photo-First Curated Bento Mosaic Grid ── */}
        <div 
          className={`gallery-mosaic-grid ${activeFilter === 'all' ? 'bento-mode' : 'uniform-mode'} reveal-on-scroll delay-2`}
        >
          {filteredMoments.map((item, idx) => (
            <div
              key={item.id}
              className={`gallery-frame-card ${getBentoSpanClass(idx)}`}
              onClick={() => handleOpenPhoto(item)}
              onMouseEnter={playHoverSound}
              style={{ '--card-accent': item.accent }}
            >
              {/* Image Stage */}
              <div className="gallery-frame-stage">
                <img
                  src={item.image}
                  alt={item.title}
                  className="gallery-frame-img"
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />

                {/* Film Log Index Badge */}
                <div className="gallery-frame-tag-top mono">
                  <span className="log-idx">[LOG_{String(idx + 1).padStart(2, '0')}]</span>
                  <span className="log-date">{item.period}</span>
                </div>

                {/* Inspect Overlay on Hover */}
                <div className="gallery-frame-hover-pill mono">
                  <Maximize2 size={13} />
                  <span>EXPAND FRAME</span>
                </div>

                {/* Photo Caption Gradient Overlay */}
                <div className="gallery-frame-overlay">
                  <div className="gallery-frame-meta-line mono">
                    <span className="gallery-org-badge" style={{ color: item.accent }}>
                      <span className="org-dot" style={{ background: item.accent }} />
                      <span>{item.tag.split('•')[0].trim()}</span>
                    </span>
                    <span className="gallery-location-tag">{item.location}</span>
                  </div>

                  <h3 className="gallery-frame-title">{item.title}</h3>

                  <div className="gallery-frame-role-row mono">
                    <span className="gallery-role-label">ROLE: <strong style={{ color: '#ffffff' }}>{item.teamRole}</strong></span>
                    <span className="gallery-inspect-hint">CLICK TO INSPECT ↗</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── High-Fidelity Lightbox Modal ── */}
      {activePhoto && (
        <div className="lightbox-backdrop" onClick={handleClosePhoto} role="dialog" aria-modal="true">
          <div className="lightbox-container" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="lightbox-header-bar mono">
              <div className="lightbox-header-left">
                <span className="lightbox-traffic-dot red" onClick={handleClosePhoto} />
                <span className="lightbox-traffic-dot yellow" />
                <span className="lightbox-traffic-dot green" />
                <span className="lightbox-doc-title">
                  FRAME // {activePhoto.title.toUpperCase()}
                </span>
              </div>

              <div className="lightbox-header-right">
                <span className="lightbox-counter">
                  {(activePhotoIndex + 1)} / {internshipMoments.length}
                </span>
                <button
                  type="button"
                  className="lightbox-close-btn"
                  onClick={handleClosePhoto}
                  aria-label="Close photo preview"
                  onMouseEnter={playHoverSound}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Navigation Arrows on Modal */}
            <button
              type="button"
              className="lightbox-nav-arrow prev"
              onClick={(e) => navigatePhoto(-1, e)}
              aria-label="Previous photo"
              title="Previous (Left Arrow)"
              onMouseEnter={playHoverSound}
            >
              <ChevronLeft size={22} />
            </button>

            <button
              type="button"
              className="lightbox-nav-arrow next"
              onClick={(e) => navigatePhoto(1, e)}
              aria-label="Next photo"
              title="Next (Right Arrow)"
              onMouseEnter={playHoverSound}
            >
              <ChevronRight size={22} />
            </button>

            {/* Image Box */}
            <div className="lightbox-image-box">
              <img src={activePhoto.image} alt={activePhoto.title} className="lightbox-full-img" />
            </div>

            {/* Details Panel */}
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
                <div className="lightbox-footer-role">
                  <span className="text-dim">ASSIGNED ROLE:</span>{' '}
                  <strong style={{ color: activePhoto.accent }}>{activePhoto.teamRole}</strong>
                </div>
                <div className="lightbox-keyboard-hint">
                  NAVIGATE: <kbd>←</kbd> <kbd>→</kbd> • CLOSE: <kbd>ESC</kbd>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
