import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';
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
  promptContent,
  sectionToggles,
  onToggleSection,
  onApplyModifier,
  onUpdatePromptContent,
  onStartOver
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

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
    <div className="space-y-5 max-w-6xl mx-auto pb-12 animate-fadeIn">
      {/* Header & Main Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-theme">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-theme-primary tracking-tight">
            Your Website Prompt
          </h1>
          <p className="text-xs text-theme-secondary font-medium mt-0.5">
            Your prompt is ready to build from. Copy and paste directly into v0, Bolt, Cursor, Claude, or ChatGPT.
          </p>
        </div>

        {/* Global Toolbar Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onStartOver}
            type="button"
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-theme bg-surface hover:bg-surface-elevated text-xs font-medium text-theme-secondary hover:text-theme-primary transition-all active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Start Over</span>
          </button>

          <CopyButton textToCopy={promptContent} className="py-1.5" />
          <DownloadButton content={promptContent} filename="website-prompt.txt" className="py-1.5" />
        </div>
      </div>

      {/* Quick Prompt Modifiers Bar */}
      <div className="bg-surface border border-theme rounded-2xl p-3.5 space-y-2">
        <div className="text-xs font-semibold text-theme-primary">
          Refine Prompt Tone
        </div>
        <div className="flex flex-wrap gap-1.5">
          {modifierButtons.map((mod) => (
            <button
              key={mod}
              onClick={() => onApplyModifier(mod)}
              type="button"
              className="px-2.5 py-1 rounded-lg border border-theme bg-surface-elevated hover:bg-brand-500/10 hover:border-brand-500/30 text-xs font-medium text-theme-secondary hover:text-brand-500 transition-all active:scale-95"
            >
              {mod}
            </button>
          ))}
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Sidebar */}
        <div className="lg:col-span-4 space-y-4 order-2 lg:order-1">
          {/* Output Section Toggles */}
          <PromptSectionToggles
            toggles={sectionToggles}
            onToggle={onToggleSection}
          />

          {/* Setup Summary */}
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
