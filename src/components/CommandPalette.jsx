import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Search,
  Terminal,
  FileText,
  Download,
  Mail,
  Phone,
  Volume2,
  VolumeX,
  FolderOpen,
  Compass,
  ExternalLink,
  CornerDownLeft,
  X
} from 'lucide-react';
import { personalData, workExperience } from '../data/portfolioData';
import { lockBodyScroll, unlockBodyScroll } from '../utils/scrollLock';
import { playClickSound, playHoverSound, playSwitchSound, playSuccessSound } from '../utils/soundEffects';

export default function CommandPalette({
  isOpen,
  onClose,
  onOpenResume,
  onDownloadCv,
  onNavigateSection,
  onOpenProjectFolder,
  onToggleSound,
  soundActive,
  showToastMessage
}) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const commands = useMemo(() => {
    const navItems = [
      { id: 'nav-hero', group: 'NAVIGATION', label: 'Go to Index / Command Deck', hint: '#hero', icon: Compass, action: () => onNavigateSection('hero') },
      { id: 'nav-about', group: 'NAVIGATION', label: 'Go to Identity & Telemetry', hint: '#about', icon: Compass, action: () => onNavigateSection('about') },
      { id: 'nav-work', group: 'NAVIGATION', label: 'Go to Production Systems', hint: '#work', icon: Compass, action: () => onNavigateSection('work') },
      { id: 'nav-certs', group: 'NAVIGATION', label: 'Go to Verified Credentials', hint: '#certificates', icon: Compass, action: () => onNavigateSection('certificates') },
      { id: 'nav-gallery', group: 'NAVIGATION', label: 'Go to Field Archive & Team', hint: '#gallery', icon: Compass, action: () => onNavigateSection('gallery') },
      { id: 'nav-skills', group: 'NAVIGATION', label: 'Go to Technical Stack', hint: '#skills', icon: Compass, action: () => onNavigateSection('skills') },
      { id: 'nav-edu', group: 'NAVIGATION', label: 'Go to Education & Honors', hint: '#education', icon: Compass, action: () => onNavigateSection('education') },
      { id: 'nav-contact', group: 'NAVIGATION', label: 'Go to Direct Dispatch / Contact', hint: '#contact', icon: Compass, action: () => onNavigateSection('contact') },
    ];

    const projectItems = workExperience.map((proj) => ({
      id: `proj-${proj.id}`,
      group: 'SYSTEM DOSSIERS',
      label: `Open Dossier: ${proj.title}`,
      hint: proj.org,
      icon: FolderOpen,
      keywords: `${proj.org} ${proj.type} ${proj.chips.join(' ')}`,
      action: () => onOpenProjectFolder(proj.id),
    }));

    const actionItems = [
      {
        id: 'act-resume',
        group: 'QUICK ACTIONS',
        label: 'Inspect Curriculum Vitae (PDF)',
        hint: 'MODAL',
        icon: FileText,
        keywords: 'cv resume pdf',
        action: () => onOpenResume(),
      },
      {
        id: 'act-download-cv',
        group: 'QUICK ACTIONS',
        label: 'Download Official CV (PDF)',
        hint: 'DOWNLOAD',
        icon: Download,
        keywords: 'cv resume download',
        action: () => onDownloadCv(),
      },
      {
        id: 'act-copy-email',
        group: 'QUICK ACTIONS',
        label: `Copy Email: ${personalData.email}`,
        hint: 'CLIPBOARD',
        icon: Mail,
        keywords: 'email mail contact',
        action: () => {
          navigator.clipboard?.writeText(personalData.email);
          playSuccessSound();
          showToastMessage?.(`Copied ${personalData.email} to clipboard!`, 'info');
        },
      },
      {
        id: 'act-copy-phone',
        group: 'QUICK ACTIONS',
        label: `Copy Phone: ${personalData.phone}`,
        hint: 'CLIPBOARD',
        icon: Phone,
        keywords: 'phone whatsapp call',
        action: () => {
          navigator.clipboard?.writeText(personalData.phone);
          playSuccessSound();
          showToastMessage?.(`Copied ${personalData.phone} to clipboard!`, 'info');
        },
      },
      {
        id: 'act-sound',
        group: 'SYSTEM PREFERENCES',
        label: soundActive ? 'Mute Interface Sound Effects' : 'Enable Interface Sound Effects',
        hint: soundActive ? 'ON → OFF' : 'OFF → ON',
        icon: soundActive ? VolumeX : Volume2,
        keywords: 'audio mute sound fx',
        action: () => onToggleSound(),
      },
      {
        id: 'ext-github',
        group: 'EXTERNAL PROFILES',
        label: 'Open GitHub Profile (HabibiRZ)',
        hint: 'GITHUB',
        icon: ExternalLink,
        keywords: 'github code repos',
        action: () => window.open(personalData.github, '_blank', 'noopener,noreferrer'),
      },
      {
        id: 'ext-linkedin',
        group: 'EXTERNAL PROFILES',
        label: 'Open LinkedIn Profile',
        hint: 'LINKEDIN',
        icon: ExternalLink,
        keywords: 'linkedin career',
        action: () => window.open(personalData.linkedin, '_blank', 'noopener,noreferrer'),
      },
    ];

    return [...actionItems, ...projectItems, ...navItems];
  }, [soundActive, onNavigateSection, onOpenProjectFolder, onOpenResume, onDownloadCv, onToggleSound, showToastMessage]);

  const filteredCommands = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((cmd) => {
      const haystack = `${cmd.label} ${cmd.group} ${cmd.hint || ''} ${cmd.keywords || ''}`.toLowerCase();
      return q.split(/\s+/).every((part) => haystack.includes(part));
    });
  }, [commands, query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    lockBodyScroll();
    setQuery('');
    const focusTimer = setTimeout(() => inputRef.current?.focus(), 20);
    return () => {
      clearTimeout(focusTimer);
      unlockBodyScroll();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        playClickSound();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        playSwitchSound();
        setSelectedIndex((prev) => (filteredCommands.length ? (prev + 1) % filteredCommands.length : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        playSwitchSound();
        setSelectedIndex((prev) =>
          filteredCommands.length ? (prev - 1 + filteredCommands.length) % filteredCommands.length : 0
        );
      } else if (e.key === 'Enter' && filteredCommands[selectedIndex]) {
        e.preventDefault();
        executeCommand(filteredCommands[selectedIndex]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  useEffect(() => {
    const activeEl = listRef.current?.querySelector(`[data-cmd-index="${selectedIndex}"]`);
    activeEl?.scrollIntoView({ block: 'nearest' });
  }, [selectedIndex]);

  const executeCommand = (cmd) => {
    playClickSound();
    onClose();
    cmd.action();
  };

  if (!isOpen) return null;

  return (
    <div
      className="cmd-palette-backdrop"
      onClick={() => {
        playClickSound();
        onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
    >
      <div className="cmd-palette-window" onClick={(e) => e.stopPropagation()}>
        {/* Header / Search Input */}
        <div className="cmd-palette-input-row">
          <Terminal size={16} className="text-sky cmd-input-icon" />
          <input
            ref={inputRef}
            type="text"
            className="cmd-palette-input mono"
            placeholder="Type a command, project, or section..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search commands"
          />
          <button
            type="button"
            className="cmd-palette-close mono"
            onClick={() => {
              playClickSound();
              onClose();
            }}
            aria-label="Close command palette"
          >
            <X size={15} />
          </button>
        </div>

        {/* Results List */}
        <div className="cmd-palette-list" ref={listRef} role="listbox">
          {filteredCommands.length === 0 ? (
            <div className="cmd-palette-empty mono">
              <Search size={18} className="text-dim" />
              <span>No matching command for "{query}"</span>
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const Icon = cmd.icon;
              const isSelected = idx === selectedIndex;
              const showGroupHeader = idx === 0 || filteredCommands[idx - 1].group !== cmd.group;
              return (
                <React.Fragment key={cmd.id}>
                  {showGroupHeader && (
                    <div className="cmd-palette-group mono">{cmd.group}</div>
                  )}
                  <button
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    data-cmd-index={idx}
                    className={`cmd-palette-item ${isSelected ? 'selected' : ''}`}
                    onClick={() => executeCommand(cmd)}
                    onMouseEnter={() => {
                      setSelectedIndex(idx);
                      playHoverSound();
                    }}
                  >
                    <div className="cmd-item-left">
                      <span className="cmd-item-icon">
                        <Icon size={15} />
                      </span>
                      <span className="cmd-item-label">{cmd.label}</span>
                    </div>
                    <div className="cmd-item-right mono">
                      {cmd.hint && <span className="cmd-item-hint">{cmd.hint}</span>}
                      {isSelected && <CornerDownLeft size={13} className="text-sky" />}
                    </div>
                  </button>
                </React.Fragment>
              );
            })
          )}
        </div>

        {/* Footer Hints */}
        <div className="cmd-palette-footer mono">
          <span><kbd>↑</kbd> <kbd>↓</kbd> Navigate</span>
          <span><kbd>↵</kbd> Execute</span>
          <span><kbd>ESC</kbd> Close</span>
        </div>
      </div>
    </div>
  );
}
