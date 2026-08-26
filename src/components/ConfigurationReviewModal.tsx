import React from 'react';
import { X, ArrowRight } from 'lucide-react';
import type { ProjectDetailsState } from './ProjectDetails';
import type { CreativeDirectionState } from './CreativeDirection';
import type { BrandContextState, TechnicalStackState } from '../types/brand';
import type { AdvancedGeneratorState } from '../types/generator';

interface ConfigurationReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmGenerate: () => void;
  ideaText: string;
  outputLanguage?: string;
  projectDetails: ProjectDetailsState;
  creativeDirection: CreativeDirectionState;
  brandContext: BrandContextState;
  techStack: TechnicalStackState;
  advancedState: AdvancedGeneratorState;
}

export const ConfigurationReviewModal: React.FC<ConfigurationReviewModalProps> = ({
  isOpen,
  onClose,
  onConfirmGenerate,
  ideaText,
  outputLanguage = 'English',
  projectDetails,
  creativeDirection,
  brandContext,
  techStack,
  advancedState
}) => {
  if (!isOpen) return null;

  // Collect user's explicit selections only
  const userChoices: { label: string; value: string }[] = [];

  if (brandContext.brandName) {
    userChoices.push({ label: 'Brand Name', value: brandContext.brandName });
  }
  if (projectDetails.websiteType) {
    userChoices.push({ label: 'Website Type', value: projectDetails.websiteType });
  }
  if (projectDetails.visualStyle) {
    userChoices.push({ label: 'Visual Style', value: projectDetails.visualStyle });
  }
  if (creativeDirection.colorTheme) {
    userChoices.push({ label: 'Color Theme', value: creativeDirection.colorTheme });
  }
  if (creativeDirection.layout) {
    userChoices.push({ label: 'Layout', value: creativeDirection.layout });
  }
  if (advancedState.websiteGoal) {
    userChoices.push({ label: 'Website Goal', value: advancedState.websiteGoal });
  }
  if (techStack.framework) {
    userChoices.push({ label: 'Framework', value: techStack.framework });
  }
  if (advancedState.buildTarget) {
    userChoices.push({ label: 'Target Builder', value: advancedState.buildTarget });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-surface border border-theme rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl relative max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-theme mb-4">
          <div>
            <h3 className="text-base font-bold text-theme-primary leading-tight">
              Ready to generate your prompt?
            </h3>
            <p className="text-xs text-theme-secondary font-normal mt-0.5">
              Review your website idea before building.
            </p>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="p-1.5 rounded-lg text-theme-muted hover:text-theme-primary hover:bg-surface-elevated transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto space-y-4 pr-1 flex-1 text-xs">
          {/* Idea Excerpt */}
          <div className="p-3.5 rounded-xl bg-surface-elevated border border-theme space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-theme-muted uppercase tracking-wider">
                YOUR IDEA
              </span>
              <span className="text-[11px] font-semibold text-brand-500 bg-brand-500/10 px-2 py-0.5 rounded border border-brand-500/20">
                Language: {outputLanguage}
              </span>
            </div>
            <p className="text-theme-primary leading-relaxed text-xs">
              "{ideaText || 'No description specified'}"
            </p>
          </div>

          {/* Optional Direction (Selected Items Only) */}
          <div className="space-y-2">
            <span className="text-[11px] font-semibold text-theme-muted uppercase tracking-wider block">
              OPTIONAL DIRECTION
            </span>

            {userChoices.length > 0 ? (
              <div className="grid grid-cols-2 gap-2">
                {userChoices.map((c) => (
                  <div key={c.label} className="p-2.5 rounded-lg bg-surface-elevated border border-theme">
                    <span className="text-[10px] text-theme-muted block">{c.label}</span>
                    <span className="font-semibold text-theme-primary truncate block">{c.value}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3 rounded-lg bg-surface-elevated border border-theme text-theme-secondary text-xs leading-relaxed">
                We'll make sensible design decisions based on your idea.
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions (Simple Primary + Secondary) */}
        <div className="pt-4 border-t border-theme mt-4 flex items-center justify-between">
          <button
            onClick={onClose}
            type="button"
            className="px-4 py-2 rounded-xl border border-theme bg-surface hover:bg-surface-elevated text-xs font-semibold text-theme-secondary hover:text-theme-primary transition-colors"
          >
            Edit
          </button>

          <button
            onClick={() => {
              onClose();
              onConfirmGenerate();
            }}
            type="button"
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-sm transition-all"
          >
            <span>Generate Website Prompt</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
