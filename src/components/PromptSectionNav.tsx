import React from 'react';
import { 
  FileText, 
  Sparkles, 
  Palette, 
  SunMoon, 
  Type, 
  LayoutGrid, 
  MousePointer, 
  Activity, 
  Smartphone, 
  Terminal 
} from 'lucide-react';

interface PromptSectionNavProps {
  activeSection: string;
  onSelectSection: (sectionId: string) => void;
}

export const PROMPT_SECTIONS = [
  { id: 'overview', label: 'Overview', icon: FileText, num: '01-02' },
  { id: 'brand', label: 'Brand Direction', icon: Sparkles, num: '04' },
  { id: 'visual', label: 'Visual Design', icon: Palette, num: '05' },
  { id: 'color', label: 'Color System', icon: SunMoon, num: '06' },
  { id: 'typography', label: 'Typography', icon: Type, num: '07' },
  { id: 'structure', label: 'Page Structure', icon: LayoutGrid, num: '08' },
  { id: 'uiux', label: 'UI/UX Requirements', icon: MousePointer, num: '09' },
  { id: 'animations', label: 'Animations', icon: Activity, num: '10' },
  { id: 'responsive', label: 'Responsive Design', icon: Smartphone, num: '11' },
  { id: 'technical', label: 'Technical Requirements', icon: Terminal, num: '12-13' }
];

export const PromptSectionNav: React.FC<PromptSectionNavProps> = ({
  activeSection,
  onSelectSection
}) => {
  return (
    <div className="bg-surface border border-theme rounded-2xl p-4 shadow-card">
      <div className="px-2 pb-3 mb-2 border-b border-theme flex items-center justify-between">
        <span className="text-[10px] font-extrabold tracking-widest text-theme-muted uppercase">
          PROMPT SECTIONS
        </span>
        <span className="text-[10px] font-semibold text-brand-500">13 Sections</span>
      </div>

      <nav className="space-y-1" aria-label="Prompt Sections Navigation">
        {PROMPT_SECTIONS.map((sec) => {
          const Icon = sec.icon;
          const isActive = activeSection === sec.id;

          return (
            <button
              key={sec.id}
              onClick={() => onSelectSection(sec.id)}
              type="button"
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 group text-left ${
                isActive
                  ? 'bg-brand-500/10 text-brand-500 dark:text-brand-400 font-semibold border border-brand-500/30'
                  : 'text-theme-secondary hover:text-theme-primary hover:bg-surface-elevated border border-transparent'
              }`}
            >
              <div className="flex items-center space-x-2.5 min-w-0">
                <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-brand-500' : 'text-theme-muted group-hover:text-theme-primary'}`} />
                <span className="truncate">{sec.label}</span>
              </div>

              <span className={`text-[10px] font-mono shrink-0 ml-2 ${isActive ? 'text-brand-500 font-bold' : 'text-theme-muted'}`}>
                {sec.num}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
