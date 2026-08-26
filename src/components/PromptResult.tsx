import React, { useState } from 'react';
import { RotateCcw, Save, Sparkles, ChevronDown, Sliders } from 'lucide-react';
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
  onSavePrompt?: () => void;
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
  onStartOver,
  onSavePrompt
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [isImproveOpen, setIsImproveOpen] = useState(false);

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

  const improvementOptions: { label: string; modifier: ResultModifierType }[] = [
    { label: 'Make more creative', modifier: 'Make More Creative' },
    { label: 'Make more professional', modifier: 'Make More Professional' },
    { label: 'Make more minimal', modifier: 'Make More Minimal' },
    { label: 'Improve mobile UX', modifier: 'Improve Mobile UX' },
    { label: 'Improve animations', modifier: 'Add Animations' },
  ];

  return (
    <div className="space-y-5 max-w-6xl mx-auto pb-12 animate-fadeIn">
      {/* 1. Result Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-theme">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-theme-primary tracking-tight">
            YOUR WEBSITE PROMPT
          </h1>
          <p className="text-xs text-theme-secondary font-normal mt-0.5">
            A structured build-ready prompt based on your idea and selected direction.
          </p>
        </div>

        {/* Action Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Primary Action: Copy Prompt */}
          <CopyButton textToCopy={promptContent} isPrimary={true} />

          {/* Save Prompt */}
          {onSavePrompt && (
            <button
              onClick={onSavePrompt}
              type="button"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-theme bg-surface hover:bg-surface-elevated text-xs font-semibold text-theme-primary transition-all active:scale-95"
            >
              <Save className="w-3.5 h-3.5 text-brand-500" />
              <span>Save Prompt</span>
            </button>
          )}

          {/* Download */}
          <DownloadButton content={promptContent} filename="website-prompt.txt" />

          {/* Compact Improve Popover Menu */}
          <div className="relative">
            <button
              onClick={() => setIsImproveOpen(!isImproveOpen)}
              type="button"
              className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg border border-theme bg-surface hover:bg-surface-elevated text-xs font-semibold text-theme-primary transition-all"
            >
              <Sliders className="w-3.5 h-3.5 text-brand-500" />
              <span>Improve</span>
              <ChevronDown className="w-3 h-3 text-theme-muted" />
            </button>

            {isImproveOpen && (
              <div className="absolute right-0 mt-1 w-48 bg-surface border border-theme rounded-xl shadow-lg z-20 p-1 space-y-0.5 animate-fadeIn">
                {improvementOptions.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => {
                      setIsImproveOpen(false);
                      onApplyModifier(opt.modifier);
                    }}
                    type="button"
                    className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium text-theme-secondary hover:text-theme-primary hover:bg-surface-elevated transition-colors"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Regenerate */}
          <button
            onClick={() => onApplyModifier('Make More Professional')}
            type="button"
            className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg border border-theme bg-surface hover:bg-surface-elevated text-xs font-semibold text-theme-secondary hover:text-theme-primary transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-theme-muted" />
            <span>Regenerate</span>
          </button>

          {/* Start New Prompt */}
          <button
            onClick={onStartOver}
            type="button"
            className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg border border-theme bg-surface hover:bg-surface-elevated text-xs font-semibold text-theme-muted hover:text-theme-primary transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Start New Prompt</span>
          </button>
        </div>
      </div>

      {/* Main Two-Column Layout (Desktop) / Stacked (Mobile) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Summary Strip & Section Controls */}
        <div className="lg:col-span-4 space-y-4 order-2 lg:order-1">
          {/* Summary Strip */}
          <PromptSummary
            projectDetails={projectDetails}
            creativeDirection={creativeDirection}
            outputLanguage={outputLanguage}
          />

          {/* Section Toggles */}
          <PromptSectionToggles
            toggles={sectionToggles}
            onToggle={onToggleSection}
          />

          {/* Section Navigation */}
          <PromptSectionNav
            activeSection={activeSection}
            onSelectSection={handleSelectSection}
          />
        </div>

        {/* Right Column: Large Prompt Viewer / Editor */}
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
