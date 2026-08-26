import React from 'react';
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
  const activeTags: string[] = [];

  if (projectDetails.websiteType) {
    activeTags.push(projectDetails.websiteType);
  }
  if (outputLanguage) {
    activeTags.push(outputLanguage);
  }
  if (creativeDirection.colorTheme) {
    activeTags.push(creativeDirection.colorTheme);
  }
  if (projectDetails.visualStyle) {
    activeTags.push(projectDetails.visualStyle);
  }
  if (creativeDirection.layout) {
    activeTags.push(creativeDirection.layout);
  }

  const summaryLine = activeTags.length > 0 ? activeTags.join(' · ') : outputLanguage;

  return (
    <div className="bg-surface border border-theme rounded-2xl p-4 shadow-sm space-y-2">
      <div className="text-[11px] font-semibold text-theme-muted uppercase tracking-wider">
        Setup Summary
      </div>
      <div className="text-xs font-mono font-bold text-brand-500 bg-brand-500/10 px-3 py-1.5 rounded-xl border border-brand-500/20 inline-block">
        {summaryLine}
      </div>
    </div>
  );
};
