import React, { useState } from 'react';
import { Settings, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';
import type { AdvancedOptionsState } from '../types/generator';

interface AdvancedOptionsProps {
  options: AdvancedOptionsState;
  onChange: (options: AdvancedOptionsState) => void;
}

export const AdvancedOptions: React.FC<AdvancedOptionsProps> = ({ options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOption = (key: keyof AdvancedOptionsState) => {
    onChange({ ...options, [key]: !options[key] });
  };

  const toggleItems: { key: keyof AdvancedOptionsState; label: string; desc: string }[] = [
    { key: 'accessibility', label: 'Accessibility Requirements', desc: 'Enforce WCAG 2.1 AA contrast, ARIA landmarks & keyboard navigation.' },
    { key: 'seo', label: 'SEO Optimization Rules', desc: 'Include meta title, description tags, semantic H1-H6, and structured data.' },
    { key: 'performance', label: 'Performance Guidelines', desc: 'Specify lazy-loading assets, zero-cls layout stability & fast LCP.' },
    { key: 'responsive', label: 'Responsive Constraints', desc: 'Specify breakpoint bounds for mobile (375px), tablet, and desktop (1440px).' },
    { key: 'animation', label: 'Reduced Motion Rules', desc: 'Respect system prefers-reduced-motion settings and 300ms timing bounds.' },
    { key: 'browserCompat', label: 'Cross-Browser Rules', desc: 'Ensure standard CSS fallbacks across Chrome, Safari, Firefox, and Edge.' }
  ];

  const activeCount = Object.values(options).filter(Boolean).length;

  return (
    <div className="bg-surface border border-theme rounded-2xl shadow-card overflow-hidden transition-all">
      {/* Toggle Bar Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="w-full flex items-center justify-between p-4 px-5 bg-surface-elevated hover:bg-surface transition-colors"
      >
        <div className="flex items-center space-x-2.5">
          <Settings className="w-4 h-4 text-brand-500" />
          <span className="text-xs font-extrabold tracking-widest text-theme-primary uppercase">
            ADVANCED OPTIONS ({activeCount} ENABLED)
          </span>
        </div>

        <div className="flex items-center space-x-2 text-theme-muted">
          <span className="text-[11px] font-medium hidden sm:inline">
            {isOpen ? 'Collapse' : 'Expand settings'}
          </span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* Collapsible Options Body */}
      {isOpen && (
        <div className="p-5 border-t border-theme space-y-3 bg-surface animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {toggleItems.map((item) => {
              const isChecked = options[item.key];
              return (
                <div
                  key={item.key}
                  onClick={() => toggleOption(item.key)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all duration-200 flex items-start justify-between space-x-3 ${
                    isChecked
                      ? 'bg-brand-500/10 border-brand-500/50 text-theme-primary'
                      : 'bg-surface-elevated border-theme text-theme-secondary hover:text-theme-primary'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-1.5">
                      <ShieldCheck className={`w-3.5 h-3.5 ${isChecked ? 'text-brand-500' : 'text-theme-muted'}`} />
                      <span className="text-xs font-bold text-theme-primary">{item.label}</span>
                    </div>
                    <p className="text-[11px] text-theme-muted leading-tight">{item.desc}</p>
                  </div>

                  {/* Custom Check Switch */}
                  <div className={`w-8 h-4 rounded-full p-0.5 transition-colors relative shrink-0 mt-1 ${isChecked ? 'bg-brand-500' : 'bg-slate-300 dark:bg-slate-700'}`}>
                    <div className={`w-3 h-3 rounded-full bg-white transition-transform ${isChecked ? 'translate-x-4' : 'translate-x-0'}`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
