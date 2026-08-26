import React from 'react';
import { RotateCcw } from 'lucide-react';
import type { ProjectDetailsState } from './ProjectDetails';
import type { CreativeDirectionState } from './CreativeDirection';
import type { AdvancedGeneratorState } from '../types/generator';

interface QuickPresetsProps {
  onApplyPreset: (
    project: Partial<ProjectDetailsState>,
    creative: Partial<CreativeDirectionState>,
    advanced: Partial<AdvancedGeneratorState>
  ) => void;
  onResetAll: () => void;
  onStartFromScratch?: () => void;
}

export const QuickPresets: React.FC<QuickPresetsProps> = ({ 
  onApplyPreset, 
  onResetAll
}) => {
  const presets = [
    {
      name: 'SaaS Landing',
      project: { websiteType: 'SaaS', visualStyle: 'Modern', selectedPages: ['Hero', 'Features', 'Pricing', 'FAQ'] },
      creative: { colorTheme: 'Dark', typography: 'Modern', layout: 'Minimal', animation: 'Smooth' },
      advanced: { promptMode: 'Detailed' as const, websiteGoal: 'Launch a SaaS' as const, buildTarget: 'v0' as const }
    },
    {
      name: 'Agency Portfolio',
      project: { websiteType: 'Portfolio', visualStyle: 'Editorial', selectedPages: ['Hero', 'Case Studies', 'Contact'] },
      creative: { colorTheme: 'Dark', typography: 'Editorial', layout: 'Asymmetric', animation: 'Cinematic' },
      advanced: { promptMode: 'Expert' as const, websiteGoal: 'Showcase Work' as const, buildTarget: 'Cursor' as const }
    },
    {
      name: 'Restaurant',
      project: { websiteType: 'Restaurant', visualStyle: 'Modern', selectedPages: ['Hero', 'Menu', 'Reservation', 'Contact'] },
      creative: { colorTheme: 'Dark', typography: 'Modern', layout: 'Minimal', animation: 'Smooth' },
      advanced: { promptMode: 'Detailed' as const, websiteGoal: 'Generate Leads' as const, buildTarget: 'Antigravity' as const }
    },
    {
      name: 'E-commerce',
      project: { websiteType: 'E-commerce', visualStyle: 'Minimal', selectedPages: ['Hero', 'Products', 'Checkout'] },
      creative: { colorTheme: 'Light', typography: 'Minimal', layout: 'Grid', animation: 'Subtle' },
      advanced: { promptMode: 'Quick' as const, websiteGoal: 'Sell Products' as const, buildTarget: 'Lovable' as const }
    }
  ];

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 py-2 px-1 text-xs">
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="text-[11px] font-semibold text-theme-muted uppercase tracking-wider mr-1">
          Quick starts:
        </span>
        {presets.map((p) => (
          <button
            key={p.name}
            onClick={() => onApplyPreset(p.project, p.creative, p.advanced)}
            type="button"
            className="px-2.5 py-1 rounded-lg border border-theme bg-surface hover:bg-surface-elevated text-theme-secondary hover:text-theme-primary text-xs font-medium transition-all"
          >
            {p.name}
          </button>
        ))}
      </div>

      <button
        onClick={onResetAll}
        type="button"
        className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg border border-theme bg-surface hover:bg-surface-elevated text-xs font-medium text-theme-muted hover:text-theme-primary transition-colors"
        title="Reset all inputs"
      >
        <RotateCcw className="w-3 h-3" />
        <span>Reset</span>
      </button>
    </div>
  );
};
