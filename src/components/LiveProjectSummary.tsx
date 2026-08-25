import React from 'react';
import { LayoutList, Globe, Sparkles } from 'lucide-react';
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
  // Collect ONLY user-selected options (no guessed/invented defaults!)
  const activeItems: { label: string; value: string }[] = [];

  if (ideaText.trim()) {
    activeItems.push({ label: 'Idea', value: `${ideaText.trim().slice(0, 35)}${ideaText.trim().length > 35 ? '...' : ''}` });
  }
  if (outputLanguage) {
    activeItems.push({ label: 'Language', value: outputLanguage });
  }
  if (projectDetails.websiteType) {
    activeItems.push({ label: 'Type', value: projectDetails.websiteType });
  }
  if (projectDetails.visualStyle) {
    activeItems.push({ label: 'Style', value: projectDetails.visualStyle });
  }
  if (creativeDirection.colorTheme) {
    activeItems.push({ label: 'Theme', value: creativeDirection.colorTheme });
  }
  if (creativeDirection.layout) {
    activeItems.push({ label: 'Layout', value: creativeDirection.layout });
  }
  if (creativeDirection.typography) {
    activeItems.push({ label: 'Typography', value: creativeDirection.typography });
  }
  if (creativeDirection.animation) {
    activeItems.push({ label: 'Animation', value: creativeDirection.animation });
  }
  if (advancedState.websiteGoal) {
    activeItems.push({ label: 'Goal', value: advancedState.websiteGoal });
  }
  if (advancedState.uxPriority) {
    activeItems.push({ label: 'UX Priority', value: advancedState.uxPriority });
  }
  if (advancedState.buildTarget) {
    activeItems.push({ label: 'Build Target', value: advancedState.buildTarget });
  }
  if (advancedState.promptMode) {
    activeItems.push({ label: 'Prompt Mode', value: advancedState.promptMode });
  }

  return (
    <div className="bg-surface border border-theme rounded-2xl p-5 shadow-card space-y-3">
      <div className="flex items-center justify-between pb-2 border-b border-theme">
        <div className="flex items-center space-x-2">
          <LayoutList className="w-4 h-4 text-brand-500" />
          <h3 className="text-xs font-extrabold tracking-widest text-theme-primary uppercase">
            PROJECT SUMMARY
          </h3>
        </div>

        <span className="text-[10px] font-bold text-theme-muted">
          {activeItems.length} active selections
        </span>
      </div>

      {activeItems.length > 0 ? (
        <div className="flex flex-wrap gap-2 text-xs font-mono">
          {activeItems.map((item) => (
            <div 
              key={item.label} 
              className={`p-2.5 rounded-xl border ${
                item.label === 'Language' 
                  ? 'border-brand-500/30 bg-brand-500/10' 
                  : 'bg-surface-elevated border-theme'
              }`}
            >
              <span className="text-[10px] text-theme-secondary font-bold block font-sans uppercase flex items-center space-x-1">
                {item.label === 'Language' && <Globe className="w-3 h-3 text-brand-500" />}
                <span>{item.label}</span>
              </span>
              <span className="font-bold text-theme-primary truncate block mt-0.5">{item.value}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-3 px-4 rounded-xl bg-surface-elevated border border-theme text-xs text-theme-secondary flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-brand-500 shrink-0" />
          <div>
            <span className="font-bold text-theme-primary block">Ready when you are.</span>
            <span className="text-[11px] text-theme-muted">
              Start with a website idea. You can customize the direction later.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
