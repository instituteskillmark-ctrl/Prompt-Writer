import React, { useState } from 'react';
import { SlidersHorizontal, ChevronDown, ChevronUp, FolderKanban, Palette, FileText, Tag, Cpu, Bot } from 'lucide-react';
import { ProjectDetails, type ProjectDetailsState } from './ProjectDetails';
import { CreativeDirection, type CreativeDirectionState } from './CreativeDirection';
import { BrandContext } from './BrandContext';
import { TechnicalStack } from './TechnicalStack';
import { AIBuildRules } from './AIBuildRules';
import { GoalSelector } from './GoalSelector';
import { UXPrioritySelector } from './UXPrioritySelector';
import { FeatureSelector } from './FeatureSelector';
import { PromptModeSelector } from './PromptModeSelector';
import { AdvancedOptions } from './AdvancedOptions';
import { DesignReferences } from './DesignReferences';
import { ResponsiveRequirements } from './ResponsiveRequirements';

import type { BrandContextState, DesignReferenceItem, ResponsiveReqState, TechnicalStackState, AIBuildRulesState } from '../types/brand';
import type { AdvancedGeneratorState } from '../types/generator';

interface CustomizePromptProps {
  projectDetails: ProjectDetailsState;
  onProjectDetailsChange: (details: ProjectDetailsState) => void;

  creativeDirection: CreativeDirectionState;
  onCreativeDirectionChange: (direction: CreativeDirectionState) => void;

  brandContext: BrandContextState;
  onBrandContextChange: (context: BrandContextState) => void;

  designReferences: DesignReferenceItem[];
  onDesignReferencesChange: (refs: DesignReferenceItem[]) => void;

  responsiveReq: ResponsiveReqState;
  onResponsiveReqChange: (req: ResponsiveReqState) => void;

  techStack: TechnicalStackState;
  onTechStackChange: (stack: TechnicalStackState) => void;

  buildRules: AIBuildRulesState;
  onBuildRulesChange: (rules: AIBuildRulesState) => void;

  advancedState: AdvancedGeneratorState;
  onAdvancedStateChange: (updater: (prev: AdvancedGeneratorState) => AdvancedGeneratorState) => void;

  onToggleFeature: (feat: string) => void;
}

export const CustomizePrompt: React.FC<CustomizePromptProps> = ({
  projectDetails,
  onProjectDetailsChange,
  creativeDirection,
  onCreativeDirectionChange,
  brandContext,
  onBrandContextChange,
  designReferences,
  onDesignReferencesChange,
  responsiveReq,
  onResponsiveReqChange,
  techStack,
  onTechStackChange,
  buildRules,
  onBuildRulesChange,
  advancedState,
  onAdvancedStateChange,
  onToggleFeature
}) => {
  // Main accordion state: COLLAPSED BY DEFAULT
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Sub-categories accordion states: COLLAPSED BY DEFAULT
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    project: false,
    design: false,
    content: false,
    brand: false,
    technical: false,
    ai: false
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Count how many optional fields have been configured
  const configuredCount = [
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
    Boolean(techStack.framework),
    Boolean(advancedState.websiteGoal),
    Boolean(advancedState.buildTarget)
  ].filter(Boolean).length;

  return (
    <div className="bg-surface border border-theme rounded-2xl p-4 sm:p-5 shadow-card transition-all duration-300">
      {/* Main Toggle Header */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between cursor-pointer select-none group"
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center font-bold">
            <SlidersHorizontal className="w-4 h-4 text-brand-500" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-xs font-extrabold tracking-widest text-theme-primary uppercase">
                + CUSTOMIZE PROMPT
              </h3>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full badge-teal font-mono">
                OPTIONAL ({configuredCount} configured)
              </span>
            </div>
            <p className="text-[11px] text-theme-secondary font-medium mt-0.5">
              Add specific project, design, technical, or brand direction if desired.
            </p>
          </div>
        </div>

        <button
          type="button"
          className="p-2 rounded-xl border border-theme bg-surface-elevated text-theme-muted group-hover:text-theme-primary transition-colors"
        >
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Main Collapsible Body */}
      {isOpen && (
        <div className="mt-6 pt-5 border-t border-theme space-y-4 animate-fadeIn">
          {/* Section 1: PROJECT */}
          <div className="border border-theme rounded-xl overflow-hidden bg-surface-elevated">
            <button
              type="button"
              onClick={() => toggleSection('project')}
              className="w-full p-4 flex items-center justify-between text-left font-bold text-xs text-theme-primary hover:bg-brand-500/5 transition-colors"
            >
              <div className="flex items-center space-x-2.5">
                <FolderKanban className="w-4 h-4 text-brand-500" />
                <span className="uppercase tracking-wider">1. PROJECT DIRECTION</span>
                {projectDetails.websiteType && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-brand-500/10 text-brand-500 font-mono">
                    {projectDetails.websiteType}
                  </span>
                )}
              </div>
              {openSections.project ? <ChevronUp className="w-4 h-4 text-theme-muted" /> : <ChevronDown className="w-4 h-4 text-theme-muted" />}
            </button>

            {openSections.project && (
              <div className="p-4 border-t border-theme space-y-5 bg-surface">
                <ProjectDetails details={projectDetails} onChange={onProjectDetailsChange} />
                <GoalSelector
                  value={advancedState.websiteGoal}
                  onChange={(goal) => onAdvancedStateChange((prev) => ({ ...prev, websiteGoal: goal }))}
                />
              </div>
            )}
          </div>

          {/* Section 2: DESIGN */}
          <div className="border border-theme rounded-xl overflow-hidden bg-surface-elevated">
            <button
              type="button"
              onClick={() => toggleSection('design')}
              className="w-full p-4 flex items-center justify-between text-left font-bold text-xs text-theme-primary hover:bg-brand-500/5 transition-colors"
            >
              <div className="flex items-center space-x-2.5">
                <Palette className="w-4 h-4 text-brand-500" />
                <span className="uppercase tracking-wider">2. VISUAL DESIGN & MOOD</span>
                {creativeDirection.colorTheme && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-brand-500/10 text-brand-500 font-mono">
                    {creativeDirection.colorTheme}
                  </span>
                )}
              </div>
              {openSections.design ? <ChevronUp className="w-4 h-4 text-theme-muted" /> : <ChevronDown className="w-4 h-4 text-theme-muted" />}
            </button>

            {openSections.design && (
              <div className="p-4 border-t border-theme space-y-5 bg-surface">
                <CreativeDirection direction={creativeDirection} onChange={onCreativeDirectionChange} />
                <DesignReferences references={designReferences} onChange={onDesignReferencesChange} />
              </div>
            )}
          </div>

          {/* Section 3: CONTENT */}
          <div className="border border-theme rounded-xl overflow-hidden bg-surface-elevated">
            <button
              type="button"
              onClick={() => toggleSection('content')}
              className="w-full p-4 flex items-center justify-between text-left font-bold text-xs text-theme-primary hover:bg-brand-500/5 transition-colors"
            >
              <div className="flex items-center space-x-2.5">
                <FileText className="w-4 h-4 text-brand-500" />
                <span className="uppercase tracking-wider">3. CONTENT & FEATURES</span>
                {advancedState.selectedFeatures.length > 0 && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-brand-500/10 text-brand-500 font-mono">
                    {advancedState.selectedFeatures.length} features
                  </span>
                )}
              </div>
              {openSections.content ? <ChevronUp className="w-4 h-4 text-theme-muted" /> : <ChevronDown className="w-4 h-4 text-theme-muted" />}
            </button>

            {openSections.content && (
              <div className="p-4 border-t border-theme space-y-5 bg-surface">
                <UXPrioritySelector
                  uxPriority={advancedState.uxPriority}
                  onUXPriorityChange={(val) => onAdvancedStateChange((prev) => ({ ...prev, uxPriority: val }))}
                  contentDirection={advancedState.contentDirection}
                  onContentDirectionChange={(val) => onAdvancedStateChange((prev) => ({ ...prev, contentDirection: val }))}
                />
                <FeatureSelector
                  selectedFeatures={advancedState.selectedFeatures}
                  onToggleFeature={onToggleFeature}
                  techStack={advancedState.techStack}
                  onTechStackChange={(val) => onAdvancedStateChange((prev) => ({ ...prev, techStack: val }))}
                  buildTarget={advancedState.buildTarget}
                  onBuildTargetChange={(val) => onAdvancedStateChange((prev) => ({ ...prev, buildTarget: val }))}
                  outputStyle={advancedState.outputStyle}
                  onOutputStyleChange={(val) => onAdvancedStateChange((prev) => ({ ...prev, outputStyle: val }))}
                />
              </div>
            )}
          </div>

          {/* Section 4: BRAND */}
          <div className="border border-theme rounded-xl overflow-hidden bg-surface-elevated">
            <button
              type="button"
              onClick={() => toggleSection('brand')}
              className="w-full p-4 flex items-center justify-between text-left font-bold text-xs text-theme-primary hover:bg-brand-500/5 transition-colors"
            >
              <div className="flex items-center space-x-2.5">
                <Tag className="w-4 h-4 text-brand-500" />
                <span className="uppercase tracking-wider">4. BRAND & IDENTITY</span>
                {brandContext.brandName && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-brand-500/10 text-brand-500 font-mono">
                    {brandContext.brandName}
                  </span>
                )}
              </div>
              {openSections.brand ? <ChevronUp className="w-4 h-4 text-theme-muted" /> : <ChevronDown className="w-4 h-4 text-theme-muted" />}
            </button>

            {openSections.brand && (
              <div className="p-4 border-t border-theme space-y-5 bg-surface">
                <BrandContext context={brandContext} onChange={onBrandContextChange} />
              </div>
            )}
          </div>

          {/* Section 5: TECHNICAL */}
          <div className="border border-theme rounded-xl overflow-hidden bg-surface-elevated">
            <button
              type="button"
              onClick={() => toggleSection('technical')}
              className="w-full p-4 flex items-center justify-between text-left font-bold text-xs text-theme-primary hover:bg-brand-500/5 transition-colors"
            >
              <div className="flex items-center space-x-2.5">
                <Cpu className="w-4 h-4 text-brand-500" />
                <span className="uppercase tracking-wider">5. TECHNICAL STACK & SPECS</span>
                {techStack.framework && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-brand-500/10 text-brand-500 font-mono">
                    {techStack.framework}
                  </span>
                )}
              </div>
              {openSections.technical ? <ChevronUp className="w-4 h-4 text-theme-muted" /> : <ChevronDown className="w-4 h-4 text-theme-muted" />}
            </button>

            {openSections.technical && (
              <div className="p-4 border-t border-theme space-y-5 bg-surface">
                <TechnicalStack stack={techStack} onChange={onTechStackChange} />
                <ResponsiveRequirements responsive={responsiveReq} onChange={onResponsiveReqChange} />
                <AdvancedOptions
                  options={advancedState.advancedOptions}
                  onChange={(opt) => onAdvancedStateChange((prev) => ({ ...prev, advancedOptions: opt }))}
                />
              </div>
            )}
          </div>

          {/* Section 6: AI INSTRUCTIONS */}
          <div className="border border-theme rounded-xl overflow-hidden bg-surface-elevated">
            <button
              type="button"
              onClick={() => toggleSection('ai')}
              className="w-full p-4 flex items-center justify-between text-left font-bold text-xs text-theme-primary hover:bg-brand-500/5 transition-colors"
            >
              <div className="flex items-center space-x-2.5">
                <Bot className="w-4 h-4 text-brand-500" />
                <span className="uppercase tracking-wider">6. AI BUILD RULES & MODE</span>
              </div>
              {openSections.ai ? <ChevronUp className="w-4 h-4 text-theme-muted" /> : <ChevronDown className="w-4 h-4 text-theme-muted" />}
            </button>

            {openSections.ai && (
              <div className="p-4 border-t border-theme space-y-5 bg-surface">
                <PromptModeSelector
                  value={advancedState.promptMode}
                  onChange={(mode) => onAdvancedStateChange((prev) => ({ ...prev, promptMode: mode }))}
                />
                <AIBuildRules buildRules={buildRules} onChange={onBuildRulesChange} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
