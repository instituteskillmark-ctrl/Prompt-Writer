import React, { useState } from 'react';
import { RotateCcw, Sparkles, Layers, Wand2 } from 'lucide-react';
import { PromptSectionNav } from './PromptSectionNav';
import { PromptSummary } from './PromptSummary';
import { PromptViewer } from './PromptViewer';
import { PromptEditor } from './PromptEditor';
import { CopyButton } from './CopyButton';
import { DownloadButton } from './DownloadButton';
import { EmptyResultState } from './EmptyResultState';
import { PromptSectionToggles } from './PromptSectionToggles';
import type { ProjectDetailsState } from './ProjectDetails';
import type { CreativeDirectionState } from './CreativeDirection';
import type { AdvancedGeneratorState, SectionToggles } from '../types/generator';
import type { BrandContextState, ResultModifierType } from '../types/brand';

interface PromptResultProps {
  ideaText: string;
  outputLanguage?: string;
  projectDetails: ProjectDetailsState;
  creativeDirection: CreativeDirectionState;
  brandContext: BrandContextState;
  advancedState: AdvancedGeneratorState;
  promptContent: string;
  sectionToggles: SectionToggles;
  onToggleSection: (key: keyof SectionToggles) => void;
  onApplyModifier: (type: ResultModifierType) => void;
  onUpdatePromptContent: (newContent: string) => void;
  onStartOver: () => void;
}

export const PromptResult: React.FC<PromptResultProps> = ({
  ideaText,
  outputLanguage = 'English',
  projectDetails,
  creativeDirection,
  brandContext,
  advancedState,
  promptContent,
  sectionToggles,
  onToggleSection,
  onApplyModifier,
  onUpdatePromptContent,
  onStartOver
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

  // Show empty state if ideaText is completely empty and no custom content exists
  if (!ideaText.trim() && !promptContent.trim()) {
    return <EmptyResultState onReturnToForm={onStartOver} />;
  }

  const handleSaveEdit = (updatedText: string) => {
    onUpdatePromptContent(updatedText);
    setIsEditing(false);
  };

  const handleSelectSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById('prompt-viewer-container');
    if (element) {
      element.scrollTop = 0;
    }
  };

  const modifierButtons: ResultModifierType[] = [
    'Make More Creative',
    'Make More Professional',
    'Make More Minimal',
    'Add Animations',
    'Improve Mobile UX'
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12 animate-fadeIn">
      {/* Top Header & Actions Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-theme">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full badge-teal text-[11px] font-bold mb-2">
            <Sparkles className="w-3 h-3 text-brand-500" />
            <span>FRONTEND PROMPT PREVIEW</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-theme-primary tracking-tight">
            YOUR WEBSITE PROMPT
          </h1>
          <p className="text-xs sm:text-sm text-theme-secondary mt-1">
            A structured prompt based on your project direction and advanced configurations.
          </p>
        </div>

        {/* Global Toolbar Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onStartOver}
            type="button"
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl border border-theme bg-surface hover:bg-surface-elevated text-xs font-semibold text-theme-secondary hover:text-theme-primary transition-all active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>↻ START OVER</span>
          </button>

          <CopyButton textToCopy={promptContent} className="py-2" />
          <DownloadButton content={promptContent} filename="website-prompt.txt" className="py-2" />
        </div>
      </div>

      {/* Quick Prompt Modifier Actions Toolbar */}
      <div className="bg-surface border border-theme rounded-2xl p-4 shadow-card space-y-2">
        <div className="flex items-center space-x-2 pb-2 border-b border-theme text-xs font-bold text-theme-primary">
          <Wand2 className="w-4 h-4 text-brand-500" />
          <span>PROMPT MODIFIERS & TONE ADJUSTMENTS</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {modifierButtons.map((mod) => (
            <button
              key={mod}
              onClick={() => onApplyModifier(mod)}
              type="button"
              className="px-3 py-1.5 rounded-xl border border-theme bg-surface-elevated hover:bg-brand-500/10 hover:border-brand-500/50 text-xs font-semibold text-theme-secondary hover:text-brand-500 transition-all active:scale-95"
            >
              {mod}
            </button>
          ))}
        </div>
      </div>

      {/* Main Two-Column Layout (Desktop) / Stacked (Mobile) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Sections Nav, Summary & Blueprint Cards */}
        <div className="lg:col-span-4 space-y-5 order-2 lg:order-1">
          {/* Project Blueprint Card */}
          <div className="bg-surface border border-theme rounded-2xl p-5 shadow-card space-y-3">
            <div className="flex items-center space-x-2 pb-2 border-b border-theme">
              <Layers className="w-4 h-4 text-brand-500" />
              <h3 className="text-xs font-extrabold tracking-widest text-theme-primary uppercase">
                PROJECT BLUEPRINT
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
              <div className="p-2 rounded-xl bg-surface-elevated border border-theme">
                <span className="text-theme-muted block text-[10px] uppercase font-sans">Brand</span>
                <span className="font-bold text-theme-primary truncate block">{brandContext.brandName || 'Unspecified'}</span>
              </div>
              <div className="p-2 rounded-xl bg-surface-elevated border border-theme">
                <span className="text-theme-muted block text-[10px] uppercase font-sans">Goal</span>
                <span className="font-bold text-theme-primary truncate block">{advancedState.websiteGoal}</span>
              </div>
              <div className="p-2 rounded-xl bg-surface-elevated border border-theme">
                <span className="text-theme-muted block text-[10px] uppercase font-sans">UX Priority</span>
                <span className="font-bold text-theme-primary truncate block">{advancedState.uxPriority}</span>
              </div>
              <div className="p-2 rounded-xl bg-surface-elevated border border-theme">
                <span className="text-theme-muted block text-[10px] uppercase font-sans">Build With</span>
                <span className="font-bold text-theme-primary truncate block">{advancedState.buildTarget}</span>
              </div>
            </div>
          </div>

          {/* Section Output Toggles */}
          <PromptSectionToggles
            toggles={sectionToggles}
            onToggle={onToggleSection}
          />

          {/* Summary Cards */}
          <PromptSummary
            projectDetails={projectDetails}
            creativeDirection={creativeDirection}
            outputLanguage={outputLanguage}
          />

          {/* Section Navigation */}
          <PromptSectionNav
            activeSection={activeSection}
            onSelectSection={handleSelectSection}
          />
        </div>

        {/* Right Column: Prompt Viewer / Editor */}
        <div id="prompt-viewer-container" className="lg:col-span-8 order-1 lg:order-2">
          {isEditing ? (
            <PromptEditor
              initialText={promptContent}
              onSave={handleSaveEdit}
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <PromptViewer
              promptText={promptContent}
              onEditClick={() => setIsEditing(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
};
