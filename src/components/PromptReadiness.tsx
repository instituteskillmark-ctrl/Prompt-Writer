import React from 'react';
import { Gauge, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import type { ProjectDetailsState } from './ProjectDetails';
import type { CreativeDirectionState } from './CreativeDirection';
import type { BrandContextState, DesignReferenceItem, ResponsiveReqState } from '../types/brand';

interface PromptReadinessProps {
  ideaText: string;
  projectDetails: ProjectDetailsState;
  creativeDirection: CreativeDirectionState;
  brandContext: BrandContextState;
  designReferences: DesignReferenceItem[];
  responsiveReq: ResponsiveReqState;
  onFocusSection?: (sectionId: string) => void;
}

export const PromptReadiness: React.FC<PromptReadinessProps> = ({
  ideaText,
  projectDetails,
  creativeDirection,
  brandContext,
  designReferences,
  responsiveReq
}) => {
  // Checkpoints evaluation
  const items = [
    { label: 'Website Idea Description', completed: Boolean(ideaText.trim()), section: 'card-01' },
    { label: 'Website Type & Visual Style', completed: Boolean(projectDetails.websiteType && projectDetails.visualStyle), section: 'card-02' },
    { label: 'Target Audience Defined', completed: Boolean(projectDetails.targetAudience.trim()), section: 'card-02' },
    { label: 'Pages / Sections Selected', completed: projectDetails.selectedPages.length > 0, section: 'card-02' },
    { label: 'Creative Direction Specified', completed: Boolean(creativeDirection.colorTheme && creativeDirection.layout), section: 'card-03' },
    { label: 'Brand Name & Personality', completed: Boolean(brandContext.brandName.trim() && brandContext.brandPersonality.trim()), section: 'card-04' },
    { label: 'Brand Colors & Primary CTA', completed: Boolean(brandContext.existingColors.trim() || brandContext.primaryCTA.trim()), section: 'card-04' },
    { label: 'Design References Attached', completed: designReferences.length > 0 || Boolean(brandContext.referenceWebsiteUrl.trim()), section: 'card-05' },
    { label: 'Responsive Requirements', completed: responsiveReq.targetDevices.length > 0, section: 'card-06' }
  ];

  const completedItems = items.filter((i) => i.completed);
  const missingItems = items.filter((i) => !i.completed);

  const percentage = Math.round((completedItems.length / items.length) * 100);

  // Suggestions generator
  const getSuggestions = (): string[] => {
    const list: string[] = [];
    if (!brandContext.brandName.trim()) list.push('Add your Brand / Project Name for tailored copy tags.');
    if (designReferences.length === 0 && !brandContext.referenceWebsiteUrl.trim()) {
      list.push('Add a design reference URL or screenshot to guide layout aesthetics.');
    }
    if (!projectDetails.targetAudience.trim()) list.push('Specify your Target Audience for higher conversion copy.');
    if (!brandContext.existingColors.trim()) list.push('Provide your Brand Colors to enforce precise color palette tokens.');
    if (list.length === 0) list.push('Prompt is fully optimized with high readiness for AI generation!');
    return list;
  };

  const suggestions = getSuggestions();

  return (
    <div className="bg-surface border border-theme rounded-2xl p-5 shadow-card space-y-4">
      {/* Top Percentage Meter */}
      <div className="flex items-center justify-between pb-3 border-b border-theme">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-xl bg-brand-500/10 text-brand-500">
            <Gauge className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold tracking-widest uppercase text-theme-muted block">
              PROMPT READINESS SYSTEM
            </span>
            <h3 className="text-base font-extrabold text-theme-primary leading-none mt-0.5">
              Prompt Readiness — <span className="text-brand-500 font-mono">{percentage}%</span>
            </h3>
          </div>
        </div>

        <span className={`px-2.5 py-1 rounded-md text-xs font-extrabold ${
          percentage >= 80 ? 'badge-teal' : percentage >= 50 ? 'bg-amber-500/10 text-amber-500 border border-amber-500/30' : 'bg-rose-500/10 text-rose-500 border border-rose-500/30'
        }`}>
          {percentage >= 80 ? 'EXCELLENT' : percentage >= 50 ? 'GOOD' : 'NEEDS INFO'}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2.5 rounded-full bg-surface-elevated overflow-hidden border border-theme">
        <div
          className="h-full bg-gradient-to-r from-brand-600 via-brand-500 to-teal-400 transition-all duration-500 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Completed vs Recommended Missing Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
        {/* Completed Column */}
        <div className="space-y-2">
          <span className="text-[10px] font-extrabold tracking-wider uppercase text-emerald-500 flex items-center space-x-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>Completed ({completedItems.length})</span>
          </span>
          <div className="space-y-1">
            {completedItems.map((item) => (
              <div key={item.label} className="p-2 rounded-lg bg-surface-elevated border border-theme text-theme-primary flex items-center justify-between">
                <span className="text-[11px] font-medium">{item.label}</span>
                <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* Missing / Recommended Column */}
        <div className="space-y-2">
          <span className="text-[10px] font-extrabold tracking-wider uppercase text-amber-500 flex items-center space-x-1">
            <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
            <span>Recommended Missing ({missingItems.length})</span>
          </span>
          <div className="space-y-1">
            {missingItems.length > 0 ? (
              missingItems.map((item) => (
                <div key={item.label} className="p-2 rounded-lg bg-surface-elevated border border-amber-500/20 text-theme-secondary flex items-center justify-between">
                  <span className="text-[11px] font-medium">{item.label}</span>
                  <span className="text-[9px] font-bold text-amber-500 uppercase">Optional</span>
                </div>
              ))
            ) : (
              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-semibold">
                All recommended configuration sections completed!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Actionable Improvement Suggestions */}
      <div className="p-3.5 rounded-xl bg-surface-elevated border border-theme space-y-1 text-xs">
        <div className="flex items-center space-x-1.5 font-bold text-brand-500">
          <Sparkles className="w-3.5 h-3.5" />
          <span className="text-[11px] uppercase tracking-wide">Improvement Suggestions</span>
        </div>
        <ul className="space-y-1 pl-1">
          {suggestions.map((sug, idx) => (
            <li key={idx} className="text-theme-secondary text-[11px] flex items-start space-x-1.5 leading-relaxed">
              <span className="text-brand-500 shrink-0 font-bold">•</span>
              <span>{sug}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
