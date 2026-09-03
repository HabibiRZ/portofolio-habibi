import React, { useState } from 'react';
import {
  Code,
  Braces,
  Server,
  FileCode,
  Palette,
  Atom,
  BarChart3,
  LayoutGrid,
  Database,
  HardDrive,
  Sheet,
  Network,
  ShieldCheck,
  Smartphone,
  Cloud,
  Bug,
  Cpu
} from 'lucide-react';
import { skillsCategories, skillsList } from '../data/portfolioData';
import { playHoverSound, playSwitchSound } from '../utils/soundEffects';

const iconMap = {
  Code,
  Braces,
  Server,
  FileCode,
  Palette,
  Atom,
  BarChart3,
  LayoutGrid,
  Database,
  HardDrive,
  Sheet,
  Network,
  ShieldCheck,
  Smartphone,
  Cloud,
  Bug,
};

export default function SkillsMatrix() {
  const [activeCategory, setActiveCategory] = useState('all');

  const handleCategorySelect = (id) => {
    playSwitchSound();
    setActiveCategory(id);
  };

  const filteredSkills = activeCategory === 'all'
    ? skillsList
    : skillsList.filter((s) => s.category === activeCategory);

  return (
    <section className="section-block" id="skills">
      <div className="wrap">
        {/* Section Header */}
        <div className="section-header-row reveal-on-scroll">
          <div>
            <div className="section-category-tag mono">
              <span className="dot-cyan" />
              <span>TECHNICAL MATRIX</span>
            </div>
            <h2 className="section-heading">Skills &amp; Engineering Disciplines</h2>
            <p className="section-subtext">
              Categorized technologies, frameworks, relational databases, and architectural practices.
            </p>
          </div>
          <div className="skills-counter mono">
            <span>SHOWING {filteredSkills.length} OF {skillsList.length} CAPABILITIES</span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="skills-filter-tabs reveal-on-scroll delay-1">
          {skillsCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`skills-tab-btn mono ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => handleCategorySelect(cat.id)}
              onMouseEnter={playHoverSound}
            >
              <span>{cat.label}</span>
              {activeCategory === cat.id && (
                <span className="tab-pill-count">
                  {cat.id === 'all' ? skillsList.length : skillsList.filter((s) => s.category === cat.id).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="skills-matrix-grid reveal-on-scroll delay-2">
          {filteredSkills.map((skill) => {
            const IconComponent = iconMap[skill.icon] || Cpu;
            return (
              <div
                key={skill.name}
                className="skill-matrix-card spotlight-card"
                onMouseEnter={playHoverSound}
              >
                <div className="skill-card-icon-box">
                  <IconComponent size={20} className="skill-icon text-emerald" />
                </div>
                <div className="skill-card-details">
                  <div className="skill-card-name">{skill.name}</div>
                  <div className="skill-card-meta mono">
                    <span className="skill-category-label">{skill.category}</span>
                    <span className="sep">•</span>
                    <span className="skill-level-badge">{skill.level}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
