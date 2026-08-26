import React from 'react';
import { FileText, Palette, LayoutGrid, MousePointer, Cpu } from 'lucide-react';

interface PromptSectionNavProps {
  activeSection: string;
  onSelectSection: (sectionId: string) => void;
}

export const PROMPT_SECTIONS = [
  { id: 'overview', label: 'Overview', icon: FileText },
  { id: 'design', label: 'Design', icon: Palette },
  { id: 'structure', label: 'Structure', icon: LayoutGrid },
  { id: 'ux', label: 'UX', icon: MousePointer },
  { id: 'technical', label: 'Technical', icon: Cpu }
];

export const PromptSectionNav: React.FC<PromptSectionNavProps> = ({
  activeSection,
  onSelectSection
}) => {
  return (
    <div className="bg-surface border border-theme rounded-2xl p-3.5 space-y-2">
      <div className="text-[11px] font-semibold text-theme-muted uppercase tracking-wider px-1">
        Prompt Sections
      </div>

      <nav className="space-y-0.5" aria-label="Prompt Sections Navigation">
        {PROMPT_SECTIONS.map((sec) => {
          const Icon = sec.icon;
          const isActive = activeSection === sec.id;

          return (
            <button
              key={sec.id}
              onClick={() => onSelectSection(sec.id)}
              type="button"
              className={`w-full flex items-center space-x-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors text-left ${
                isActive
                  ? 'bg-brand-500/10 text-brand-500 font-semibold'
                  : 'text-theme-secondary hover:text-theme-primary hover:bg-surface-elevated'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-brand-500' : 'text-theme-muted'}`} />
              <span>{sec.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
