import React from 'react';
import { X, Sparkles, ArrowRight, RotateCcw } from 'lucide-react';
import type { ProjectDetailsState } from './ProjectDetails';
import type { CreativeDirectionState } from './CreativeDirection';
import type { BrandContextState, TechnicalStackState } from '../types/brand';
import type { AdvancedGeneratorState } from '../types/generator';

interface ConfigurationReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmGenerate: () => void;
  ideaText: string;
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
  projectDetails,
  creativeDirection,
  brandContext,
  techStack,
  advancedState
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-surface border border-theme rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-theme mb-4">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-brand-500/10 text-brand-500 shadow-teal-glow">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold tracking-widest uppercase text-brand-500 block">
                STEP 2 OF 3 — FINAL REVIEW
              </span>
              <h3 className="text-base font-extrabold text-theme-primary leading-none">
                Verify Project Configuration
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="p-1.5 rounded-lg text-theme-muted hover:text-theme-primary hover:bg-surface-elevated transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Configuration Review Grid */}
        <div className="overflow-y-auto space-y-4 pr-1 flex-1 font-mono text-xs">
          {/* Idea Excerpt */}
          <div className="p-3.5 rounded-xl bg-surface-elevated border border-theme space-y-1">
            <span className="text-[10px] font-sans font-extrabold uppercase text-theme-muted">Website Idea</span>
            <p className="text-theme-primary line-clamp-3 leading-relaxed font-sans text-xs">
              "{ideaText || 'No description specified'}"
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            <div className="p-3 rounded-xl bg-surface-elevated border border-theme">
              <span className="text-[10px] text-theme-muted block font-sans uppercase font-bold">Brand Name</span>
              <span className="font-bold text-theme-primary truncate block">{brandContext.brandName || 'Unspecified'}</span>
            </div>

            <div className="p-3 rounded-xl bg-surface-elevated border border-theme">
              <span className="text-[10px] text-theme-muted block font-sans uppercase font-bold">Website Type</span>
              <span className="font-bold text-theme-primary truncate block">{projectDetails.websiteType}</span>
            </div>

            <div className="p-3 rounded-xl bg-surface-elevated border border-theme">
              <span className="text-[10px] text-theme-muted block font-sans uppercase font-bold">Visual Style</span>
              <span className="font-bold text-theme-primary truncate block">{projectDetails.visualStyle}</span>
            </div>

            <div className="p-3 rounded-xl bg-surface-elevated border border-theme">
              <span className="text-[10px] text-theme-muted block font-sans uppercase font-bold">Theme Mode</span>
              <span className="font-bold text-theme-primary truncate block">{creativeDirection.colorTheme}</span>
            </div>

            <div className="p-3 rounded-xl bg-surface-elevated border border-theme">
              <span className="text-[10px] text-theme-muted block font-sans uppercase font-bold">Layout Grid</span>
              <span className="font-bold text-theme-primary truncate block">{creativeDirection.layout}</span>
            </div>

            <div className="p-3 rounded-xl bg-surface-elevated border border-theme">
              <span className="text-[10px] text-theme-muted block font-sans uppercase font-bold">Goal</span>
              <span className="font-bold text-theme-primary truncate block">{advancedState.websiteGoal}</span>
            </div>

            <div className="p-3 rounded-xl bg-surface-elevated border border-theme">
              <span className="text-[10px] text-theme-muted block font-sans uppercase font-bold">UX Priority</span>
              <span className="font-bold text-theme-primary truncate block">{advancedState.uxPriority}</span>
            </div>

            <div className="p-3 rounded-xl bg-surface-elevated border border-theme">
              <span className="text-[10px] text-theme-muted block font-sans uppercase font-bold">Framework</span>
              <span className="font-bold text-theme-primary truncate block">{techStack.framework}</span>
            </div>

            <div className="p-3 rounded-xl bg-surface-elevated border border-theme">
              <span className="text-[10px] text-theme-muted block font-sans uppercase font-bold">Build Target</span>
              <span className="font-bold text-theme-primary truncate block">{advancedState.buildTarget}</span>
            </div>
          </div>

          {/* Selected Pages & Features */}
          <div className="p-3.5 rounded-xl bg-surface-elevated border border-theme space-y-2">
            <span className="text-[10px] font-sans font-extrabold uppercase text-theme-muted block">Configured Pages & Features</span>
            <div className="flex flex-wrap gap-1.5 font-sans">
              {projectDetails.selectedPages.map((p) => (
                <span key={p} className="px-2 py-0.5 rounded badge-teal text-[10px] font-bold">
                  {p}
                </span>
              ))}
              {advancedState.selectedFeatures.map((f) => (
                <span key={f} className="px-2 py-0.5 rounded bg-surface border border-theme text-[10px] text-theme-secondary font-medium">
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-theme mt-4 flex items-center justify-between">
          <button
            onClick={onClose}
            type="button"
            className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl border border-theme bg-surface hover:bg-surface-elevated text-xs font-semibold text-theme-secondary hover:text-theme-primary transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Edit Configuration</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onConfirmGenerate();
            }}
            type="button"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-teal-500 hover:from-brand-500 hover:to-teal-400 text-white font-extrabold text-xs shadow-teal-glow transition-all active:scale-95 uppercase tracking-wider"
          >
            <Sparkles className="w-4 h-4" />
            <span>✦ CONFIRM & GENERATE PROMPT</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
