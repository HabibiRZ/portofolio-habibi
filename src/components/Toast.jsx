import React from 'react';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast || !toast.visible) return null;

  const icons = {
    success: <CheckCircle2 className="toast-icon text-emerald" size={20} />,
    error: <AlertCircle className="toast-icon text-rose" size={20} />,
    info: <Info className="toast-icon text-cyan" size={20} />
  };

  return (
    <div className={`toast-container ${toast.visible ? 'show' : ''}`} role="alert">
      {icons[toast.type] || icons.info}
      <span className="toast-message">{toast.message}</span>
    </div>
  );
}
