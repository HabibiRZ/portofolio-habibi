import React, { useEffect, useState, useRef } from 'react';
import { 
  X, 
  Download, 
  ExternalLink, 
  Printer, 
  FileText, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  User, 
  GraduationCap, 
  Building2, 
  Maximize2 
} from 'lucide-react';
import { playHoverSound, playClickSound, playSuccessSound } from '../utils/soundEffects';

export default function ResumeModal({ isOpen, onClose, onDownloadCv }) {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const modalRef = useRef(null);

  // Keyboard Escape listener & body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        playClickSound();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  // Reset iframe loading on open
  useEffect(() => {
    if (isOpen) {
      setIframeLoaded(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      playClickSound();
      onClose();
    }
  };

  const handlePrint = () => {
    playClickSound();
    try {
      const iframe = document.getElementById('resume-pdf-frame');
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
        return;
      }
    } catch (err) {
      console.warn('Iframe print access restricted, opening standalone print window:', err);
    }
    window.open('/CV.pdf', '_blank');
  };

  const handleDownload = (e) => {
    if (onDownloadCv) {
      onDownloadCv(e);
    }
  };

  return (
    <div 
      className="resume-modal-backdrop"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
    >
      <div className="resume-modal-window" ref={modalRef}>
        {/* ── Window Titlebar & Controls ── */}
        <div className="resume-modal-titlebar">
          {/* Left: Window Traffic Dots & Document Identity */}
          <div className="resume-titlebar-left">
            <div className="resume-traffic-dots">
              <button 
                type="button" 
                className="resume-dot red" 
                onClick={() => { playClickSound(); onClose(); }}
                title="Close Overview (Esc)"
              />
              <span className="resume-dot yellow" />
              <span className="resume-dot green" />
            </div>

            <div className="resume-doc-identity">
              <FileText size={16} className="text-sky" />
              <span id="resume-modal-title" className="resume-doc-filename mono">
                CURRICULUM_VITAE_HABIBI_RIZQULLAH.PDF
              </span>
              <span className="resume-doc-badge mono">OFFICIAL DOSSIER</span>
            </div>
          </div>

          {/* Right: Action Toolbar */}
          <div className="resume-titlebar-actions">
            <a
              href="/CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="resume-action-btn mono"
              title="Open Raw PDF in New Tab"
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
            >
              <ExternalLink size={14} />
              <span className="hide-mobile">Open Tab</span>
            </a>

            <button
              type="button"
              className="resume-action-btn mono"
              onClick={handlePrint}
              title="Print Curriculum Vitae"
              onMouseEnter={playHoverSound}
            >
              <Printer size={14} />
              <span className="hide-mobile">Print</span>
            </button>

            <button
              type="button"
              className="resume-btn-download-primary mono"
              onClick={handleDownload}
              title="Download Official PDF Copy"
              onMouseEnter={playHoverSound}
            >
              <Download size={14} />
              <span>DOWNLOAD PDF</span>
            </button>

            <button
              type="button"
              className="resume-close-btn"
              onClick={() => { playClickSound(); onClose(); }}
              aria-label="Close Preview"
              onMouseEnter={playHoverSound}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* ── Executive Candidate Overview Strip ── */}
        <div className="resume-candidate-strip">
          <div className="candidate-strip-left">
            <div className="candidate-strip-avatar">
              <img src="/HABIBI RIZQULLAH.JPG" alt="Habibi Rizqullah" />
              <span className="avatar-status-dot" title="Active Status: Available" />
            </div>
            <div className="candidate-strip-info">
              <div className="candidate-strip-name">
                <span>Habibi Rizqullah</span>
                <span className="candidate-strip-tag mono">Junior Full-Stack &amp; Systems Engineer</span>
              </div>
              <div className="candidate-strip-location mono">
                <span>Diploma in Informatics Engineering</span>
                <span className="strip-sep">•</span>
                <span className="text-sky">Universitas Sumatera Utara (GPA 3.80)</span>
              </div>
            </div>
          </div>

          <div className="candidate-strip-highlights mono">
            <div className="strip-highlight-item">
              <Building2 size={13} className="text-amber" />
              <span>PT. Bank Sumut (SIPABS)</span>
            </div>
            <div className="strip-highlight-item">
              <ShieldCheck size={13} className="text-emerald" />
              <span>BPJS Ketenagakerjaan</span>
            </div>
            <div className="strip-highlight-item">
              <Sparkles size={13} className="text-sky" />
              <span>Vector AI / Computer Vision</span>
            </div>
          </div>
        </div>

        {/* ── Document Viewport ── */}
        <div className="resume-viewport">
          {!iframeLoaded && (
            <div className="resume-loading-state mono">
              <div className="resume-spinner" />
              <div className="resume-loading-text">DECRYPTING AND RENDERING PDF STREAM...</div>
              <div className="resume-loading-sub">Format: Vector A4 • 300 DPI • Cryptographic Hash: Verified</div>
            </div>
          )}

          <iframe
            id="resume-pdf-frame"
            src="/CV.pdf#toolbar=1&navpanes=0&scrollbar=1"
            title="Habibi Rizqullah Official Curriculum Vitae"
            className={`resume-iframe ${iframeLoaded ? 'visible' : ''}`}
            onLoad={() => setIframeLoaded(true)}
          />

          {/* Mobile Direct Assist Bar (in case browser restricts mobile iframe interactions) */}
          <div className="resume-mobile-assist-bar mono">
            <div className="assist-info">
              <ShieldCheck size={14} className="text-emerald" />
              <span>A4 Vector Curriculum Vitae (2 Pages)</span>
            </div>
            <div className="assist-btns">
              <a 
                href="/CV.pdf" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-assist-open"
                onClick={playClickSound}
              >
                <Maximize2 size={13} />
                <span>Fullscreen</span>
              </a>
              <button 
                type="button" 
                className="btn-assist-download"
                onClick={handleDownload}
              >
                <Download size={13} />
                <span>Download</span>
              </button>
            </div>
          </div>
        </div>

        {/* ── Document Footer Telemetry ── */}
        <div className="resume-modal-footer mono">
          <div className="resume-footer-left">
            <span className="dot-green" />
            <span>INTEGRITY STATUS: OFFICIAL &amp; SIGNED</span>
            <span className="footer-sep">//</span>
            <span className="footer-file-meta">FILE SIZE: ~176 KB • PAGES: 2</span>
          </div>

          <div className="resume-footer-right">
            <span>PRESS <kbd>ESC</kbd> OR CLICK OUTSIDE TO CLOSE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
