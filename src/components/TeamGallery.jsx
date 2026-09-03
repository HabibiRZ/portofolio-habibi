import React, { useState, useEffect } from 'react';
import { Camera, MapPin, Calendar, Users, X, ZoomIn, Info, Sparkles } from 'lucide-react';
import { internshipMoments } from '../data/portfolioData';
import { playHoverSound, playClickSound, playModalSound, playSwitchSound } from '../utils/soundEffects';

export default function TeamGallery() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activePhoto, setActivePhoto] = useState(null);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activePhoto) {
        playClickSound();
        setActivePhoto(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhoto]);

  const categories = [
    { id: 'all', label: 'All Moments' },
    { id: 'bank-sumut', label: 'PT. Bank Sumut' },
    { id: 'bpjs-team', label: 'BPJS Ketenagakerjaan' },
    { id: 'campus-dev', label: 'Campus & Graduation' },
  ];

  const filteredMoments = activeFilter === 'all'
    ? internshipMoments
    : internshipMoments.filter((m) => m.category === activeFilter);

  const handleOpenPhoto = (item) => {
    playModalSound();
    setActivePhoto(item);
  };

  const handleClosePhoto = () => {
    playClickSound();
    setActivePhoto(null);
  };

  const handleCardMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section className="section-block" id="gallery">
      <div className="wrap">
        {/* Section Header */}
        <div className="section-header-row reveal-on-scroll">
          <div>
            <div className="section-category-tag mono">
              <Camera size={14} className="text-emerald" />
              <span>TEAM IN ACTION // FIELD DOCUMENTATION</span>
            </div>
            <h2 className="section-heading">Internship &amp; Team Moments</h2>
            <p className="section-subtext">
              Real-world collaboration, enterprise database optimization, dashboard briefings, and sprint sessions during institutional internships.
            </p>
          </div>
        </div>

        {/* Category Filters */}
        <div className="gallery-filter-tabs reveal-on-scroll delay-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`gallery-tab-btn mono ${activeFilter === cat.id ? 'active' : ''}`}
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

        {/* Gallery Grid */}
        <div className="gallery-grid reveal-on-scroll delay-2">
          {filteredMoments.map((item) => (
            <div
              key={item.id}
              className="gallery-card spotlight-card"
              style={{ '--accent-color': item.accent }}
              onClick={() => handleOpenPhoto(item)}
              onMouseEnter={playHoverSound}
              onMouseMove={handleCardMouseMove}
            >
              <div className="gallery-image-wrapper">
                <img
                  src={item.image}
                  alt={item.title}
                  className="gallery-img"
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <div className="picture-shimmer-sweep" />
                <div className="gallery-img-overlay">
                  <span className="gallery-zoom-badge mono">
                    <ZoomIn size={14} />
                    <span>VIEW FULL PHOTO</span>
                  </span>
                </div>
                <div className="gallery-card-tag mono" style={{ borderColor: `${item.accent}50`, color: item.accent }}>
                  {item.tag}
                </div>
              </div>

              <div className="gallery-card-content">
                <div className="gallery-org-line mono">
                  <span className="text-emerald">{item.organization}</span>
                  <span className="sep">•</span>
                  <span>{item.period}</span>
                </div>
                <h3 className="gallery-card-title">{item.title}</h3>
                <p className="gallery-card-desc">{item.description}</p>

                <div className="gallery-card-footer mono">
                  <div className="inline-flex items-center gap-1 text-dim">
                    <MapPin size={12} />
                    <span>{item.location}</span>
                  </div>
                  <div className="gallery-role-pill mono">
                    <Users size={12} className="text-cyan" />
                    <span>{item.teamRole}</span>
                  </div>
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
              <X size={22} />
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
                  <MapPin size={13} className="text-emerald" />
                  {activePhoto.location}
                </span>
              </div>

              <h2 className="lightbox-title">{activePhoto.title}</h2>
              <p className="lightbox-desc">{activePhoto.description}</p>

              <div className="lightbox-footer mono">
                <span>ROLE IN TEAM: <strong>{activePhoto.teamRole}</strong></span>
                <span className="text-dim">ESC TO CLOSE</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
