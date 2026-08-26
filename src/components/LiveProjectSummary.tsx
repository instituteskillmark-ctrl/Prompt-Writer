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

  const hasIdea = Boolean(ideaText.trim());
  const summaryText = setupParts.length > 0 ? setupParts.join(' · ') : 'Idea · English';

  return (
    <div className="py-2.5 px-4 rounded-xl bg-surface border border-theme flex items-center justify-between text-xs transition-colors">
      <span className="font-medium text-theme-muted text-[11px]">
        {hasIdea ? 'Your setup' : 'Ready when you are.'}
      </span>
      <span className="font-mono text-[11px] font-semibold text-brand-500 bg-brand-500/10 px-2.5 py-0.5 rounded-md border border-brand-500/20">
        {hasIdea ? summaryText : 'Start with a website idea'}
      </span>
    </div>
  );
};
