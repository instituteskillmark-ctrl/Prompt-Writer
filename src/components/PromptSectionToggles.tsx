import React from 'react';
import { SlidersHorizontal, Check } from 'lucide-react';
import type { SectionToggles } from '../types/generator';

interface PromptSectionTogglesProps {
  toggles: SectionToggles;
  onToggle: (key: keyof SectionToggles) => void;
}

export const PromptSectionToggles: React.FC<PromptSectionTogglesProps> = ({ toggles, onToggle }) => {
  const sectionsList: { key: keyof SectionToggles; label: string }[] = [
    { key: 'strategy', label: 'Strategy' },
    { key: 'branding', label: 'Branding' },
    { key: 'visualDesign', label: 'Visual Design' },
    { key: 'typography', label: 'Typography' },
    { key: 'pages', label: 'Pages' },
    { key: 'uiux', label: 'UI/UX' },
    { key: 'features', label: 'Features' },
    { key: 'animations', label: 'Animations' },
    { key: 'responsive', label: 'Responsive' },
    { key: 'seo', label: 'SEO' },
    { key: 'accessibility', label: 'Accessibility' },
    { key: 'performance', label: 'Performance' },
    { key: 'technical', label: 'Technical' }
  ];

  return (
    <div className="bg-surface border border-theme rounded-2xl p-4 shadow-card space-y-3">
      <div className="flex items-center justify-between pb-2 border-b border-theme">
        <div className="flex items-center space-x-2">
          <SlidersHorizontal className="w-4 h-4 text-brand-500" />
          <h3 className="text-xs font-extrabold tracking-widest text-theme-primary uppercase">
            OUTPUT SECTIONS
          </h3>
        </div>
        <span className="text-[10px] text-theme-muted font-mono">Toggle sections on/off</span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {sectionsList.map((item) => {
          const isEnabled = toggles[item.key];
          return (
            <button
              key={item.key}
              onClick={() => onToggle(item.key)}
              type="button"
              className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all border ${
                isEnabled
                  ? 'bg-brand-500/10 text-brand-500 border-brand-500 font-semibold'
                  : 'bg-surface-elevated text-theme-muted border-theme hover:text-theme-primary'
              }`}
            >
              {isEnabled && <Check className="w-3 h-3 text-brand-500 stroke-[3]" />}
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
