import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  theme: 'dark' | 'light';
  onToggle: () => void;
  variant?: 'compact' | 'full';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggle, variant = 'full' }) => {
  const isDark = theme === 'dark';

  if (variant === 'compact') {
    return (
      <button
        onClick={onToggle}
        type="button"
        aria-label="Toggle theme"
        className="p-2.5 rounded-xl border border-theme bg-surface hover:bg-surface-elevated text-theme-secondary hover:text-theme-primary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
      >
        {isDark ? (
          <Sun className="w-4 h-4 text-brand-400" />
        ) : (
          <Moon className="w-4 h-4 text-brand-600" />
        )}
      </button>
    );
  }

  return (
    <button
      onClick={onToggle}
      type="button"
      className="w-full flex items-center justify-between p-2.5 px-3 rounded-xl border border-theme bg-surface hover:bg-surface-elevated transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-brand-500/30"
    >
      <div className="flex items-center space-x-2.5">
        <div className={`p-1.5 rounded-lg transition-colors ${isDark ? 'bg-slate-800 text-brand-400' : 'bg-slate-100 text-brand-600'}`}>
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </div>
        <span className="text-xs font-semibold tracking-wide text-theme-secondary group-hover:text-theme-primary transition-colors">
          {isDark ? 'Dark Mode' : 'Light Mode'}
        </span>
      </div>
      
      {/* Switch pill */}
      <div className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-300 relative ${isDark ? 'bg-brand-600' : 'bg-slate-300'}`}>
        <div 
          className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300 transform ${isDark ? 'translate-x-4' : 'translate-x-0'}`} 
        />
      </div>
    </button>
  );
};
