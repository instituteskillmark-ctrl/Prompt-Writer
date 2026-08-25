import React from 'react';
import { SlidersHorizontal, Sparkles } from 'lucide-react';
import type { ProjectDetailsState } from './ProjectDetails';
import type { CreativeDirectionState } from './CreativeDirection';
import type { BrandContextState } from '../types/brand';

interface PromptReadinessProps {
  ideaText: string;
  projectDetails: ProjectDetailsState;
  creativeDirection: CreativeDirectionState;
  brandContext: BrandContextState;
  techStackFramework?: string;
  websiteGoal?: string;
}

export const PromptReadiness: React.FC<PromptReadinessProps> = ({
  ideaText,
  projectDetails,
  creativeDirection,
  brandContext,
  techStackFramework,
  websiteGoal
}) => {
  const optionalCheckpoints = [
    Boolean(projectDetails.websiteType),
    Boolean(projectDetails.visualStyle),
    Boolean(projectDetails.targetAudience.trim()),
    projectDetails.selectedPages.length > 0,
    Boolean(creativeDirection.colorTheme),
    Boolean(creativeDirection.typography),
    Boolean(creativeDirection.layout),
    Boolean(creativeDirection.animation),
    Boolean(brandContext.brandName.trim()),
    Boolean(brandContext.brandPersonality.trim()),
    Boolean(techStackFramework),
    Boolean(websiteGoal)
  ];

  const configuredCount = optionalCheckpoints.filter(Boolean).length;
  const totalCount = 12;

  return (
    <div className="bg-surface border border-theme rounded-2xl p-4 sm:p-5 shadow-card space-y-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 rounded-lg bg-brand-500/10 text-brand-500">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-theme-primary">
              OPTIONAL CUSTOMIZATION
            </h3>
            <p className="text-[11px] text-theme-secondary">
              Add more details for a more tailored result.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-mono font-bold text-brand-500 px-3 py-1 rounded-xl bg-brand-500/10 border border-brand-500/20">
            {configuredCount} of {totalCount} optional settings configured
          </span>
        </div>
      </div>

      {!ideaText.trim() && (
        <div className="pt-2 flex items-center space-x-1.5 text-[11px] text-theme-muted font-medium">
          <Sparkles className="w-3.5 h-3.5 text-brand-500" />
          <span>Tip: You only need a website idea and output language to generate!</span>
        </div>
      )}
    </div>
  );
};
