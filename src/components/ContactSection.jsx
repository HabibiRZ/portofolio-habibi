import React, { useState } from 'react';
import { Mail, Phone, MapPin, Copy, Check, Download, Terminal, Send, ArrowRight } from 'lucide-react';
import { personalData } from '../data/portfolioData';
import { playHoverSound, playClickSound } from '../utils/soundEffects';

export default function ContactSection({ onDownloadCv, showToastMessage }) {
  const [copiedField, setCopiedField] = useState(null);

  const copyToClipboard = (text, fieldName) => {
    playClickSound();
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    showToastMessage(`Copied ${fieldName} to clipboard!`, 'info');
    setTimeout(() => setCopiedField(null), 2500);
  };

  return (
    <section className="section-block" id="contact">
      <div className="wrap">
        <div className="contact-bento-grid">
          {/* Card 1: Contact Terminal Card */}
          <div className="bento-card contact-terminal-card spotlight-card reveal-on-scroll">
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="dot red" />
                <span className="dot yellow" />
                <span className="dot green" />
              </div>
              <div className="terminal-title mono">habibi@workstation:~# contact-info</div>
            </div>

            <div className="terminal-body">
              <div className="terminal-line mono">
                <span className="term-prompt">$</span>
                <span className="term-cmd">cat availability.json</span>
              </div>

              <div className="terminal-code-block mono">
                <div>{'{'}</div>
                <div className="term-indent"><span className="term-key">"status"</span>: <span className="term-val">"Actively Seeking Junior Roles"</span>,</div>
                <div className="term-indent"><span className="term-key">"role"</span>: <span className="term-val">"Full-Stack Developer"</span>,</div>
                <div className="term-indent"><span className="term-key">"mindset"</span>: <span className="term-val">"Learn the system before touching it, stay until fixed"</span>,</div>
                <div className="term-indent"><span className="term-key">"location"</span>: <span className="term-val">"Medan, Indonesia (Open to Remote / Relocate)"</span></div>
                <div>{'}'}</div>
              </div>

              <div className="terminal-line mono mt-4">
                <span className="term-prompt">$</span>
                <span className="term-cmd">echo $CHANNELS</span>
              </div>

              {/* Action Buttons for Direct Copy / Communication */}
              <div className="contact-channels-list">
                <div className="contact-channel-item">
                  <div className="channel-icon-box">
                    <Mail size={16} className="text-emerald" />
                  </div>
                  <div className="channel-details">
                    <div className="channel-label mono">EMAIL</div>
                    <a href={`mailto:${personalData.email}`} className="channel-value">
                      {personalData.email}
                    </a>
                  </div>
                  <button
                    type="button"
                    className="btn-copy-channel mono"
                    onClick={() => copyToClipboard(personalData.email, 'Email')}
                    onMouseEnter={playHoverSound}
                    title="Copy Email"
                  >
                    {copiedField === 'Email' ? <Check size={14} className="text-emerald" /> : <Copy size={14} />}
                    <span>{copiedField === 'Email' ? 'COPIED' : 'COPY'}</span>
                  </button>
                </div>

                <div className="contact-channel-item">
                  <div className="channel-icon-box">
                    <Phone size={16} className="text-cyan" />
                  </div>
                  <div className="channel-details">
                    <div className="channel-label mono">PHONE / WHATSAPP</div>
                    <a href={`tel:${personalData.phone.replace(/\s+/g, '')}`} className="channel-value">
                      {personalData.phone}
                    </a>
                  </div>
                  <button
                    type="button"
                    className="btn-copy-channel mono"
                    onClick={() => copyToClipboard(personalData.phone, 'Phone')}
                    onMouseEnter={playHoverSound}
                    title="Copy Phone"
                  >
                    {copiedField === 'Phone' ? <Check size={14} className="text-emerald" /> : <Copy size={14} />}
                    <span>{copiedField === 'Phone' ? 'COPIED' : 'COPY'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Resume / CV Direct Download Card */}
          <div className="bento-card contact-cv-card spotlight-card reveal-on-scroll delay-1">
            <div className="cv-card-inner">
              <div className="cv-card-badge mono">
                <span className="radar-dot" />
                <span>OFFICIAL CURRICULUM VITAE</span>
              </div>

              <h3 className="cv-card-title">Need a Comprehensive Offline Resume?</h3>
              <p className="cv-card-desc">
                Download my verified CV in PDF format detailing academic transcripts, production systems, tech competencies, and institutional experience.
              </p>

              <button
                type="button"
                className="btn btn-emerald-full"
                onClick={onDownloadCv}
                onMouseEnter={playHoverSound}
              >
                <Download size={18} />
                <span>Download Official CV (PDF)</span>
              </button>

              <div className="cv-card-meta mono">
                <span>FORMAT: PDF • SIZE: ~176 KB • UPDATED: 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
