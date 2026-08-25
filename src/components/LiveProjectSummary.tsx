import React from 'react';
import { LayoutList, Sparkles, CheckCircle } from 'lucide-react';
import type { ProjectDetailsState } from './ProjectDetails';
import type { CreativeDirectionState } from './CreativeDirection';
import type { AdvancedGeneratorState } from '../types/generator';

interface LiveProjectSummaryProps {
  ideaText: string;
  projectDetails: ProjectDetailsState;
  creativeDirection: CreativeDirectionState;
  advancedState: AdvancedGeneratorState;
}

export const LiveProjectSummary: React.FC<LiveProjectSummaryProps> = ({
  ideaText,
  projectDetails,
  creativeDirection,
  advancedState
}) => {
  const checkSection = (condition: boolean) => (condition ? 1 : 0);
  
  const configuredCount = 
    checkSection(Boolean(ideaText.trim())) +
    checkSection(Boolean(projectDetails.websiteType)) +
    checkSection(Boolean(projectDetails.visualStyle)) +
    checkSection(Boolean(projectDetails.targetAudience.trim())) +
    checkSection(projectDetails.selectedPages.length > 0) +
    checkSection(Boolean(creativeDirection.colorTheme)) +
    checkSection(Boolean(creativeDirection.typography)) +
    checkSection(Boolean(creativeDirection.layout)) +
    checkSection(Boolean(advancedState.websiteGoal)) +
    checkSection(Boolean(advancedState.uxPriority));

  const totalSections = 10;
  const progressPercent = Math.round((configuredCount / totalSections) * 100);

  const getDesignTip = (): string => {
    const style = projectDetails.visualStyle;
    const type = projectDetails.websiteType;

    if (style === 'Luxury' || style === 'Editorial') {
      return 'Dark + Editorial typography + Asymmetric grid layout works best for luxury showcases.';
    }
    if (type === 'SaaS') {
      return 'SaaS platforms perform best with Conversion UX priority, interactive pricing tables, and prominent CTAs.';
    }
    if (type === 'Portfolio') {
      return 'Portfolios excel with Visual Impact UX priority, minimalist frames, and full-bleed image showcases.';
    }
    if (type === 'Restaurant') {
      return 'Restaurant websites thrive with interactive menu tabs, online reservation widgets, and warm imagery.';
    }
    if (type === 'E-commerce') {
      return 'E-commerce storefronts perform best with Product-first grids, instant drawer cart, and reviews.';
    }
    return 'Pair generous whitespace with crisp typography hierarchy and a single vibrant CTA color for optimal UX.';
  };

  return (
    <div className="bg-surface border border-theme rounded-2xl p-5 shadow-card space-y-4">
      {/* 1. Completeness Indicator */}
      <div className="space-y-2 pb-3 border-b border-theme">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 font-bold text-theme-primary">
            <CheckCircle className="w-4 h-4 text-brand-500" />
            <span>Prompt Setup Completeness</span>
          </div>
          <span className="font-mono text-brand-500 font-bold">{configuredCount} / {totalSections} configured</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 rounded-full bg-surface-elevated overflow-hidden border border-theme">
          <div
            className="h-full bg-gradient-to-r from-brand-600 to-teal-400 transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* 2. Live Project Summary */}
      <div>
        <div className="flex items-center space-x-2 mb-3">
          <LayoutList className="w-4 h-4 text-brand-500" />
          <h3 className="text-xs font-extrabold tracking-widest text-theme-primary uppercase">
            PROJECT SUMMARY
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
          <div className="p-2.5 rounded-xl bg-surface-elevated border border-theme">
            <span className="text-[10px] text-theme-secondary font-bold block font-sans uppercase">Type</span>
            <span className="font-bold text-theme-primary truncate block">{projectDetails.websiteType || 'SaaS'}</span>
          </div>

          <div className="p-2.5 rounded-xl bg-surface-elevated border border-theme">
            <span className="text-[10px] text-theme-secondary font-bold block font-sans uppercase">Style</span>
            <span className="font-bold text-theme-primary truncate block">{projectDetails.visualStyle || 'Modern'}</span>
          </div>

          <div className="p-2.5 rounded-xl bg-surface-elevated border border-theme">
            <span className="text-[10px] text-theme-secondary font-bold block font-sans uppercase">Theme</span>
            <span className="font-bold text-theme-primary truncate block">{creativeDirection.colorTheme || 'Dark'}</span>
          </div>

          <div className="p-2.5 rounded-xl bg-surface-elevated border border-theme">
            <span className="text-[10px] text-theme-secondary font-bold block font-sans uppercase">Layout</span>
            <span className="font-bold text-theme-primary truncate block">{creativeDirection.layout || 'Minimal'}</span>
          </div>

          <div className="p-2.5 rounded-xl bg-surface-elevated border border-theme">
            <span className="text-[10px] text-theme-secondary font-bold block font-sans uppercase">Goal</span>
            <span className="font-bold text-theme-primary truncate block">{advancedState.websiteGoal}</span>
          </div>

          <div className="p-2.5 rounded-xl bg-surface-elevated border border-theme">
            <span className="text-[10px] text-theme-secondary font-bold block font-sans uppercase">UX Priority</span>
            <span className="font-bold text-theme-primary truncate block">{advancedState.uxPriority}</span>
          </div>

          <div className="p-2.5 rounded-xl bg-surface-elevated border border-theme">
            <span className="text-[10px] text-theme-secondary font-bold block font-sans uppercase">Prompt Mode</span>
            <span className="font-bold text-theme-primary truncate block">{advancedState.promptMode}</span>
          </div>

          <div className="p-2.5 rounded-xl bg-surface-elevated border border-theme">
            <span className="text-[10px] text-theme-secondary font-bold block font-sans uppercase">Build With</span>
            <span className="font-bold text-theme-primary truncate block">{advancedState.buildTarget}</span>
          </div>
        </div>
      </div>

      {/* 3. Rule-based Design Tip */}
      <div className="p-3 rounded-xl bg-brand-500/10 border border-brand-500/20 text-xs flex items-start space-x-2.5">
        <Sparkles className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="font-bold text-brand-500 uppercase tracking-wide text-[10px] block">DESIGN TIP</span>
          <p className="text-theme-secondary text-[11px] leading-relaxed">{getDesignTip()}</p>
        </div>
      </div>
    </div>
  );
};
