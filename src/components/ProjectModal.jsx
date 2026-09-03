import React, { useEffect } from 'react';
import { X, Layers, CheckCircle, Cpu, Building2, Calendar, Users } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-header-meta">
            <span className="modal-index mono">{project.index}</span>
            <span className="modal-badge mono" style={{ borderColor: project.accentColor, color: project.accentColor }}>
              {project.type}
            </span>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
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
          {/* Architecture Overview */}
          <div className="modal-section">
            <div className="modal-section-title mono">
              <Layers size={16} className="text-emerald" />
              <span>SYSTEM ARCHITECTURE & OVERVIEW</span>
            </div>
            <p className="modal-desc">{project.architecture?.overview || project.summary}</p>
          </div>

          {/* Key Engineering Highlights */}
          {project.architecture?.highlights && (
            <div className="modal-section">
              <div className="modal-section-title mono">
                <CheckCircle size={16} className="text-cyan" />
                <span>TECHNICAL HIGHLIGHTS & DELIVERABLES</span>
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
  );
}
