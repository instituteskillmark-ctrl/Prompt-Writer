import React from 'react';
import { Sparkles, RotateCcw } from 'lucide-react';
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
}

export const QuickPresets: React.FC<QuickPresetsProps> = ({ onApplyPreset, onResetAll }) => {
  const presets = [
    {
      name: 'Premium SaaS',
      desc: 'Modern • Dark • Conversion',
      project: { websiteType: 'SaaS', visualStyle: 'Modern', selectedPages: ['Hero', 'Features', 'Pricing', 'Testimonials', 'FAQ', 'Contact', 'Footer'] },
      creative: { colorTheme: 'Dark', typography: 'Modern', layout: 'Minimal', animation: 'Smooth' },
      advanced: { promptMode: 'Detailed' as const, websiteGoal: 'Launch a SaaS' as const, uxPriority: 'Conversion' as const, buildTarget: 'v0' as const }
    },
    {
      name: 'Creative Portfolio',
      desc: 'Editorial • Dark • Visual Impact',
      project: { websiteType: 'Portfolio', visualStyle: 'Editorial', selectedPages: ['Hero', 'Portfolio Grid', 'Case Studies', 'Contact', 'Footer'] },
      creative: { colorTheme: 'Dark', typography: 'Editorial', layout: 'Asymmetric', animation: 'Cinematic' },
      advanced: { promptMode: 'Expert' as const, websiteGoal: 'Showcase Work' as const, uxPriority: 'Visual Impact' as const, buildTarget: 'Antigravity' as const }
    },
    {
      name: 'Luxury Brand',
      desc: 'Luxury • Light • Storytelling',
      project: { websiteType: 'Agency', visualStyle: 'Luxury', selectedPages: ['Hero', 'Case Studies', 'Team Showcase', 'Contact', 'Footer'] },
      creative: { colorTheme: 'Light', typography: 'Editorial', layout: 'Editorial', animation: 'Cinematic' },
      advanced: { promptMode: 'Expert' as const, websiteGoal: 'Build Brand Presence' as const, uxPriority: 'Storytelling' as const, buildTarget: 'Claude' as const }
    },
    {
      name: 'Startup Landing Page',
      desc: 'Minimal • Light • Speed',
      project: { websiteType: 'Landing Page', visualStyle: 'Minimal', selectedPages: ['Hero', 'Features', 'Pricing', 'FAQ', 'Footer'] },
      creative: { colorTheme: 'Light', typography: 'Minimal', layout: 'Grid', animation: 'Subtle' },
      advanced: { promptMode: 'Quick' as const, websiteGoal: 'Generate Leads' as const, uxPriority: 'Speed' as const, buildTarget: 'Cursor' as const }
    }
  ];

  return (
    <div className="bg-surface border border-theme rounded-2xl p-5 shadow-card space-y-3">
      <div className="flex items-center justify-between pb-2 border-b border-theme">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-brand-500" />
          <h3 className="text-xs font-extrabold tracking-widest text-theme-primary uppercase">
            QUICK PRESETS
          </h3>
        </div>

        <button
          onClick={onResetAll}
          type="button"
          className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg border border-theme bg-surface hover:bg-surface-elevated text-[11px] font-semibold text-theme-muted hover:text-theme-primary transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset Configuration</span>
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {presets.map((preset) => (
          <button
            key={preset.name}
            onClick={() => onApplyPreset(preset.project, preset.creative, preset.advanced)}
            type="button"
            className="p-3 rounded-xl bg-surface-elevated hover:bg-brand-500/10 border border-theme hover:border-brand-500/50 text-left transition-all group"
          >
            <span className="text-xs font-bold text-theme-primary group-hover:text-brand-500 transition-colors block">
              {preset.name}
            </span>
            <span className="text-[11px] font-semibold text-theme-secondary group-hover:text-theme-primary block mt-0.5">{preset.desc}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
