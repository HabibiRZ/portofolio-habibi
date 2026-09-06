import React from 'react';
import { GraduationCap, Award, MapPin } from 'lucide-react';
import { educationData } from '../data/portfolioData';
import { playHoverSound } from '../utils/soundEffects';

export default function Education() {
  return (
    <section className="section-block" id="education">
      <div className="wrap">
        {/* Section Header */}
        <div className="section-header-row reveal-on-scroll">
          <div>
            <div className="system-layer-badge mono">
              <span className="layer-bracket">[</span>
              <span className="layer-num text-amber">LAYER 06</span>
              <span className="layer-sep">//</span>
              <span className="layer-name">ACADEMIC FOUNDATIONS &amp; ENGINEERING RIGOR</span>
              <span className="layer-bracket">]</span>
            </div>
            <h2 className="volume-heading">
              Academic <span className="font-serif-italic text-sky">foundations.</span> <br />
              Engineering <span className="font-serif-italic">rigor.</span>
            </h2>
            <p className="volume-subtext">
              Formal informatics engineering degree and academic honors from North Sumatra's premier university.
            </p>
          </div>
        </div>

        {/* Education List */}
        <div className="education-cards-grid reveal-on-scroll delay-1">
          {educationData.map((edu) => (
            <div
              key={edu.institution}
              className="education-card spotlight-card"
              onMouseEnter={playHoverSound}
            >
              <div className="edu-card-top">
                <div className="edu-icon-badge">
                  <GraduationCap size={22} className="text-emerald" />
                </div>
                <div className="edu-score-pill mono">
                  <Award size={14} className="text-amber" />
                  <span>{edu.score}</span>
                </div>
              </div>

              <h3 className="edu-school-name">{edu.institution}</h3>
              <div className="edu-degree-line">{edu.degree}</div>

              <p className="edu-details-text">{edu.details}</p>

              <div className="edu-footer mono">
                <div className="edu-location">
                  <MapPin size={13} className="text-muted" />
                  <span>{edu.period}</span>
                </div>
                <span className="edu-badge-tag">{edu.badge}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
