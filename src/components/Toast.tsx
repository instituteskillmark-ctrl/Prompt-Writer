import React from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-3 px-4 py-3 rounded-2xl bg-surface border border-brand-500/40 text-theme-primary shadow-2xl animate-fadeIn backdrop-blur-md">
      <div className="p-1 rounded-lg bg-brand-500/10 text-brand-500">
        <CheckCircle2 className="w-4 h-4" />
      </div>
      <span className="text-xs font-semibold">{message}</span>
      <button
        onClick={onClose}
        type="button"
        className="p-1 rounded-lg text-theme-muted hover:text-theme-primary transition-colors"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
