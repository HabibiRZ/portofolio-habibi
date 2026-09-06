import React, { useState, useEffect, useRef } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Copy,
  Check,
  Send,
  MessageSquare,
  Loader2,
  ArrowRight,
  ChevronDown,
  Clock,
  Sparkles,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import { personalData } from '../data/portfolioData';
import { playHoverSound, playClickSound, playSuccessSound } from '../utils/soundEffects';

// EmailJS Configuration
const EMAILJS_SERVICE_ID = 'service_8129erw';
const EMAILJS_TEMPLATE_ID = 'template_frg4qvc';
const EMAILJS_PUBLIC_KEY = 'oYV6cKgTjk2pouop9';

const marqueeTechStack = [
  "PHP 8.x",
  "MySQL",
  "React.js",
  "Next.js",
  "JavaScript (ES6+)",
  "Python",
  "Tailwind CSS",
  "Apache",
  "Vite",
  "Git & GitHub",
  "RESTful APIs",
  "Chart.js",
  "Docker",
  "Linux Environment",
  "PostgreSQL",
  "Financial Data Security"
];

const marqueeRoles = [
  "Software Engineer",
  "Full-Stack Developer",
  "Systems Analyst",
  "Backend Engineer",
  "Database Architect",
  "Web Application Developer",
  "Archival Systems Specialist",
  "Operations Dashboard Engineer",
  "QA & Regression Testing"
];

const faqData = [
  {
    q: "What is your main area of expertise?",
    a: "I specialize in high-reliability web systems, enterprise archival databases, and executive data dashboards. Having engineered production systems for PT. Bank Sumut (SIPABS) and BPJS Ketenagakerjaan Medan Kota (SERTAKAN), my engineering philosophy prioritizes zero-downtime reliability, clean database indexing, and intuitive UI."
  },
  {
    q: "Are you open to remote or on-site opportunities?",
    a: "Yes, I am actively open to junior full-stack developer, backend engineer, and software engineering opportunities — whether remote, hybrid, or on-site in Medan, Jakarta, or other tech hubs."
  },
  {
    q: "What is your typical production tech stack?",
    a: "For backend and database architecture, I use PHP 8.x and Python with MySQL/PostgreSQL, structured REST APIs, and Apache/Nginx. For frontend interfaces, I build high-performance reactive applications using React.js, Vite, Next.js, and modern CSS/Tailwind."
  },
  {
    q: "Do you have enterprise or institutional project experience?",
    a: "Yes. I have engineered and QA'd live production software inside PT. Bank Sumut (regional commercial bank) handling digitized archival records and audit compliance, as well as analytics monitoring dashboards for BPJS Ketenagakerjaan tracking ASN participation under formal decree."
  },
  {
    q: "How can we start a conversation or project?",
    a: "You can submit the message form below or reach out directly at habibirizqullah27@gmail.com or via WhatsApp/Phone at +62 812 7111 8127. I typically respond within 12–24 hours."
  }
];

export default function ContactSection({ showToastMessage }) {
  const [copiedField, setCopiedField] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSending, setIsSending] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [localTime, setLocalTime] = useState('');
  const formRef = useRef(null);

  // Live Medan (WIB / UTC+7) Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      setLocalTime(new Intl.DateTimeFormat('en-GB', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const copyToClipboard = (text, fieldName) => {
    playClickSound();
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    showToastMessage(`Copied ${fieldName} to clipboard!`, 'info');
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    playClickSound();
    setIsSending(true);

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        EMAILJS_PUBLIC_KEY
      );

      playSuccessSound();
      showToastMessage('✓ Message sent successfully! I will respond within 24 hours.', 'success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('EmailJS Error:', error);
      // Fallback: open mailto
      window.location.href = `mailto:${personalData.email}?subject=Project%20Inquiry%20from%20${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message)}`;
      showToastMessage('Opened mail client directly to email Habibi.', 'info');
    } finally {
      setIsSending(false);
    }
  };

  const toggleFaq = (idx) => {
    playClickSound();
    setOpenFaqIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="section-block" id="contact">
      {/* ── Continuous Dual Marquee Ribbons (Reference Style) ── */}
      <div className="marquee-ribbon-wrapper reveal-on-scroll">
        {/* Ribbon 1: Technologies Track */}
        <div className="marquee-ribbon-track">
          {[...marqueeTechStack, ...marqueeTechStack, ...marqueeTechStack].map((item, idx) => (
            <span className="marquee-pill" key={`tech-${idx}`}>
              <span className="marquee-pill-dot" />
              <span>{item}</span>
            </span>
          ))}
        </div>

        {/* Ribbon 2: Roles Track (Reverse Motion) */}
        <div className="marquee-ribbon-track reverse">
          {[...marqueeRoles, ...marqueeRoles, ...marqueeRoles].map((item, idx) => (
            <span className="marquee-pill" key={`role-${idx}`}>
              <span className="marquee-pill-dot" />
              <span>{item}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="wrap" style={{ marginTop: '48px' }}>
        {/* Section Heading */}
        <div className="reveal-on-scroll">
          <div className="system-layer-badge mono">
            <span className="layer-bracket">[</span>
            <span className="layer-num text-sky">LAYER 07</span>
            <span className="layer-sep">//</span>
            <span className="layer-name">DIRECT DISPATCH &amp; COLLABORATION</span>
            <span className="layer-bracket">]</span>
          </div>

          <h2 className="volume-heading">
            Let's Build Something <span className="text-shiny">Together.</span>
          </h2>
          <p className="volume-subtext">
            Open to strategic collaborations in high-reliability web systems, backend infrastructure, and full-stack engineering. Let's transform ambitious requirements into battle-tested production software.
          </p>
        </div>

        {/* Contact Bento Grid */}
        <div className="contact-bento-grid">
          {/* Card 1: Workstation Info & Realtime Clock */}
          <div className="bento-card contact-terminal-card spotlight-card reveal-on-scroll delay-1">
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="dot red" />
                <span className="dot yellow" />
                <span className="dot green" />
              </div>
              <div className="terminal-title mono">habibi@workstation:~# status</div>
            </div>

            <div className="terminal-body">
              {/* Real-time Medan Clock Widget */}
              <div className="time-widget-box mono" style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '10px',
                padding: '14px 18px',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Clock size={16} className="text-sky" />
                  <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>MEDAN, ID LOCAL TIME</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="dot-green" />
                  <span style={{ fontSize: '1rem', fontWeight: '700', color: '#ffffff' }}>
                    {localTime || '18:30:00'} <span style={{ fontSize: '0.72rem', color: 'var(--color-sky)' }}>WIB (UTC+7)</span>
                  </span>
                </div>
              </div>

              <div className="terminal-line mono">
                <span className="term-prompt">$</span>
                <span className="term-cmd">cat availability.json</span>
              </div>

              <div className="terminal-code-block mono">
                <div>{'{'}</div>
                <div className="term-indent"><span className="term-key">"status"</span>: <span className="term-val">"Open for Junior Roles &amp; Projects"</span>,</div>
                <div className="term-indent"><span className="term-key">"role"</span>: <span className="term-val">"Junior Full-Stack / Systems Engineer"</span>,</div>
                <div className="term-indent"><span className="term-key">"mindset"</span>: <span className="term-val">"Understand existing systems before writing new lines"</span>,</div>
                <div className="term-indent"><span className="term-key">"location"</span>: <span className="term-val">"Medan, Indonesia (Remote / Relocation Open)"</span></div>
                <div>{'}'}</div>
              </div>

              <div className="terminal-line mono mt-4">
                <span className="term-prompt">$</span>
                <span className="term-cmd">echo $CHANNELS</span>
              </div>

              <div className="contact-channels-list">
                <div className="contact-channel-item">
                  <div className="channel-icon-box">
                    <Mail size={16} className="text-sky" />
                  </div>
                  <div className="channel-details">
                    <div className="channel-label mono">DIRECT INBOX</div>
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
                    <Phone size={16} className="text-amber" />
                  </div>
                  <div className="channel-details">
                    <div className="channel-label mono">WHATSAPP / PHONE</div>
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

              {/* Social Channels Row */}
              <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="terminal-line mono" style={{ marginBottom: '10px' }}>
                  <span className="term-prompt">$</span>
                  <span className="term-cmd">open $PROFILES</span>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <a
                    href="https://github.com/HabibiRZ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mono"
                    onMouseEnter={playHoverSound}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 12px',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '6px',
                      color: '#cbd5e1',
                      fontSize: '0.74rem',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span>GITHUB</span>
                    <ExternalLink size={12} className="text-sky" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/habibi-rizqullah-2b121329a/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mono"
                    onMouseEnter={playHoverSound}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 12px',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '6px',
                      color: '#cbd5e1',
                      fontSize: '0.74rem',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span>LINKEDIN</span>
                    <ExternalLink size={12} className="text-sky" />
                  </a>
                  <a
                    href="https://www.instagram.com/habibirz005/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mono"
                    onMouseEnter={playHoverSound}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 12px',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '6px',
                      color: '#cbd5e1',
                      fontSize: '0.74rem',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span>INSTAGRAM</span>
                    <ExternalLink size={12} className="text-sky" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Interactive Contact Form */}
          <div className="bento-card contact-form-card spotlight-card reveal-on-scroll delay-2">
            <form className="contact-form-inner" ref={formRef} onSubmit={handleSubmit} noValidate>
              <div className="contact-form-badge mono">
                <span className="radar-dot" />
                <span>DIRECT INGESTION FORM</span>
              </div>

              <h3 className="contact-form-title">Send a Direct Message</h3>
              <p className="contact-form-desc">
                Have an inquiry, role opening, or collaboration proposal? Send a message directly into my inbox.
              </p>

              <div className="contact-form-fields">
                <div className="form-row">
                  <div className="form-field">
                    <label className="form-label mono" htmlFor="contact-name">Your Name</label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      className={`form-input ${errors.name ? 'error' : ''}`}
                      placeholder="e.g. Alex Henderson"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={isSending}
                    />
                    {errors.name && <span className="form-error-text mono">{errors.name}</span>}
                  </div>
                  <div className="form-field">
                    <label className="form-label mono" htmlFor="contact-email">Your Email</label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      className={`form-input ${errors.email ? 'error' : ''}`}
                      placeholder="alex@organization.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={isSending}
                    />
                    {errors.email && <span className="form-error-text mono">{errors.email}</span>}
                  </div>
                </div>

                <div className="form-field">
                  <label className="form-label mono" htmlFor="contact-message">Project or Role Details</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    className={`form-textarea ${errors.message ? 'error' : ''}`}
                    placeholder="Describe your project requirements, scope, or career opportunity..."
                    value={formData.message}
                    onChange={handleInputChange}
                    disabled={isSending}
                  />
                  {errors.message && <span className="form-error-text mono">{errors.message}</span>}
                </div>
              </div>

              <button
                type="submit"
                className="btn-send-message"
                disabled={isSending}
                onMouseEnter={playHoverSound}
              >
                {isSending ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Transmitting Message...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Send Ingestion Request</span>
                  </>
                )}
              </button>

              <div className="contact-form-footer mono">
                <span>Encrypted Transmission • Direct to habibirizqullah27@gmail.com</span>
              </div>
            </form>
          </div>
        </div>

        {/* ── Frequently Asked Questions Accordion ── */}
        <div className="faq-section-block reveal-on-scroll delay-2" style={{ marginTop: '64px' }}>
          <div className="section-category-tag mono">
            <HelpCircle size={14} className="text-sky" />
            <span>COMMONLY ASKED QUESTIONS</span>
          </div>
          <h3 style={{
            fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
            fontWeight: '900',
            letterSpacing: '-0.03em',
            margin: '8px 0 24px',
            color: '#ffffff'
          }}>
            Technical Alignment &amp; Operations FAQ
          </h3>

          <div className="faq-list-accordion">
            {faqData.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className={`faq-item-card ${isOpen ? 'open' : ''}`}
                >
                  <button
                    type="button"
                    className="faq-question-btn"
                    onClick={() => toggleFaq(idx)}
                    onMouseEnter={playHoverSound}
                    aria-expanded={isOpen}
                  >
                    <span className="faq-question-text">
                      {faq.q}
                    </span>
                    <span className="faq-chevron-wrap">
                      <ChevronDown
                        size={18}
                        className="text-sky faq-chevron-icon"
                      />
                    </span>
                  </button>

                  <div className={`faq-answer-collapse ${isOpen ? 'open' : ''}`}>
                    <div className="faq-answer-inner">
                      <div className="faq-answer-content">
                        <p>{faq.a}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
