import React from 'react';
import type { ProjectDetailsState } from './ProjectDetails';
import type { CreativeDirectionState } from './CreativeDirection';
import type { AdvancedGeneratorState } from '../types/generator';

interface LiveProjectSummaryProps {
  ideaText: string;
  outputLanguage?: string;
  projectDetails: ProjectDetailsState;
  creativeDirection: CreativeDirectionState;
  advancedState: AdvancedGeneratorState;
}

export const LiveProjectSummary: React.FC<LiveProjectSummaryProps> = ({
  ideaText,
  outputLanguage = 'English',
  projectDetails,
  creativeDirection,
  advancedState
}) => {
  // Collect ONLY explicitly selected values
  const setupParts: string[] = [];

  if (ideaText.trim()) {
    setupParts.push('Idea');
  }
  if (outputLanguage) {
    setupParts.push(outputLanguage);
  }
  if (projectDetails.websiteType) {
    setupParts.push(projectDetails.websiteType);
  }
  if (projectDetails.visualStyle) {
    setupParts.push(projectDetails.visualStyle);
  }
  if (creativeDirection.colorTheme) {
    setupParts.push(creativeDirection.colorTheme);
  }
  if (advancedState.websiteGoal) {
    setupParts.push(advancedState.websiteGoal);
  }
  if (advancedState.buildTarget) {
    setupParts.push(advancedState.buildTarget);
  }

  const summaryText = setupParts.length > 0 ? setupParts.join(' · ') : 'Idea · English';

  return (
    <div className="py-2.5 px-4 rounded-xl bg-surface-elevated border border-theme flex items-center justify-between text-xs">
      <span className="font-semibold text-theme-muted uppercase tracking-wider text-[11px]">
        Your Setup
      </span>
      <span className="font-mono font-bold text-brand-500 bg-brand-500/10 px-2.5 py-1 rounded-md border border-brand-500/20">
        {summaryText}
      </span>
    </div>
  );
};
