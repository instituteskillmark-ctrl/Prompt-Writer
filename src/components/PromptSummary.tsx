import React from 'react';
import { Compass, CheckCircle2, Layers, Globe } from 'lucide-react';
import type { ProjectDetailsState } from './ProjectDetails';
import type { CreativeDirectionState } from './CreativeDirection';

interface PromptSummaryProps {
  projectDetails: ProjectDetailsState;
  creativeDirection: CreativeDirectionState;
  outputLanguage?: string;
}

export const PromptSummary: React.FC<PromptSummaryProps> = ({
  projectDetails,
  creativeDirection,
  outputLanguage = 'English'
}) => {
  const coverageCheckpoints = [
    { label: 'Structure', verified: true },
    { label: 'Design', verified: true },
    { label: 'Typography', verified: true },
    { label: 'Responsive', verified: true },
    { label: 'Animation', verified: true },
    { label: 'Technical Direction', verified: true }
  ];

  return (
    <div className="space-y-4">
      {/* 1. Website Direction Card */}
      <div className="bg-surface border border-theme rounded-2xl p-5 shadow-card">
        <div className="flex items-center space-x-2 pb-3 mb-4 border-b border-theme">
          <Compass className="w-4 h-4 text-brand-500" />
          <h3 className="text-xs font-extrabold tracking-widest text-theme-primary uppercase">
            WEBSITE DIRECTION
          </h3>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-theme-muted font-medium flex items-center space-x-1">
              <Globe className="w-3.5 h-3.5 text-brand-500" />
              <span>Output Language:</span>
            </span>
            <span className="font-extrabold text-brand-500 px-2 py-0.5 rounded bg-brand-500/10 border border-brand-500/30">
              {outputLanguage}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-theme-muted font-medium">Type:</span>
            <span className="font-semibold text-theme-primary px-2 py-0.5 rounded bg-surface-elevated border border-theme">
              {projectDetails.websiteType || 'SaaS'}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-theme-muted font-medium">Style:</span>
            <span className="font-semibold text-theme-primary px-2 py-0.5 rounded bg-surface-elevated border border-theme">
              {projectDetails.visualStyle || 'Modern'}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-theme-muted font-medium">Theme:</span>
            <span className="font-semibold text-theme-primary px-2 py-0.5 rounded bg-surface-elevated border border-theme">
              {creativeDirection.colorTheme || 'Dark'}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-theme-muted font-medium">Layout:</span>
            <span className="font-semibold text-theme-primary px-2 py-0.5 rounded bg-surface-elevated border border-theme">
              {creativeDirection.layout || 'Minimal'}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-theme-muted font-medium">Animation:</span>
            <span className="font-semibold text-theme-primary px-2 py-0.5 rounded bg-surface-elevated border border-theme">
              {creativeDirection.animation || 'Smooth'}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Prompt Coverage Card */}
      <div className="bg-surface border border-theme rounded-2xl p-5 shadow-card">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-theme">
          <div className="flex items-center space-x-2">
            <Layers className="w-4 h-4 text-brand-500" />
            <h3 className="text-xs font-extrabold tracking-widest text-theme-primary uppercase">
              PROMPT COVERAGE
            </h3>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md badge-teal">
            100% COMPLETE
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          {coverageCheckpoints.map((item) => (
            <div
              key={item.label}
              className="flex items-center space-x-1.5 p-2 rounded-xl bg-surface-elevated border border-theme text-theme-primary"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span className="text-[11px] font-semibold truncate">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
