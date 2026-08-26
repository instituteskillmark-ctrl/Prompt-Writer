import React, { useState } from 'react';
import { SlidersHorizontal, ChevronDown, ChevronUp, FolderKanban, Palette, LayoutGrid, Tag, Link2, Cpu } from 'lucide-react';
import { ProjectDetails, type ProjectDetailsState } from './ProjectDetails';
import { CreativeDirection, type CreativeDirectionState } from './CreativeDirection';
import { BrandContext } from './BrandContext';
import { GoalSelector } from './GoalSelector';
import { FeatureSelector } from './FeatureSelector';
import { DesignReferences } from './DesignReferences';

import type { BrandContextState, DesignReferenceItem, TechnicalStackState } from '../types/brand';
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

  techStack: TechnicalStackState;
  onTechStackChange: (stack: TechnicalStackState) => void;

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
  techStack,
  onTechStackChange,
  advancedState,
  onAdvancedStateChange,
  onToggleFeature
}) => {
  // Collapsed by default
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Sub-categories accordion states
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    project: false,
    design: false,
    structure: false,
    brand: false,
    references: false,
    tech: false
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Count active configured fields
  const configuredCount = [
    Boolean(projectDetails.websiteType),
    Boolean(projectDetails.visualStyle),
    Boolean(projectDetails.targetAudience.trim()),
    projectDetails.selectedPages.length > 0,
    Boolean(creativeDirection.colorTheme),
    Boolean(creativeDirection.layout),
    Boolean(creativeDirection.animation),
    Boolean(brandContext.brandName.trim()),
    Boolean(brandContext.brandPersonality.trim()),
    Boolean(techStack.framework),
    Boolean(advancedState.websiteGoal),
    Boolean(advancedState.buildTarget)
  ].filter(Boolean).length;

  return (
    <div className="border border-theme rounded-2xl p-4 sm:p-5 bg-surface transition-all duration-200">
      {/* Main Toggle Header */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between cursor-pointer select-none group"
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-surface-elevated text-theme-secondary flex items-center justify-center font-medium">
            <SlidersHorizontal className="w-4 h-4 text-theme-secondary group-hover:text-theme-primary transition-colors" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-xs font-bold text-theme-primary tracking-wide">
                + Customize
              </h3>
              <span className="text-[11px] text-theme-muted font-normal">
                {configuredCount > 0 ? `(${configuredCount} set)` : '(Optional)'}
              </span>
            </div>
            <p className="text-[11px] text-theme-secondary font-normal mt-0.5">
              Add detail only when you need it.
            </p>
          </div>
        </div>

        <button
          type="button"
          className="p-1.5 rounded-lg border border-theme bg-surface hover:bg-surface-elevated text-theme-muted group-hover:text-theme-primary transition-colors"
        >
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Main Collapsible Body */}
      {isOpen && (
        <div className="mt-4 pt-4 border-t border-theme space-y-2.5 animate-fadeIn">
          {/* Group 1: Project */}
          <div className="border border-theme rounded-xl overflow-hidden bg-surface">
            <button
              type="button"
              onClick={() => toggleSection('project')}
              className="w-full p-3 flex items-center justify-between text-left font-semibold text-xs text-theme-primary hover:bg-surface-elevated transition-colors"
            >
              <div className="flex items-center space-x-2">
                <FolderKanban className="w-3.5 h-3.5 text-brand-500" />
                <span>Project (Type, Audience, Goal)</span>
                {projectDetails.websiteType && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-brand-500/10 text-brand-500 font-mono font-semibold">
                    {projectDetails.websiteType}
                  </span>
                )}
              </div>
              {openSections.project ? <ChevronUp className="w-3.5 h-3.5 text-theme-muted" /> : <ChevronDown className="w-3.5 h-3.5 text-theme-muted" />}
            </button>

            {openSections.project && (
              <div className="p-4 border-t border-theme space-y-4 bg-surface-elevated">
                <ProjectDetails details={projectDetails} onChange={onProjectDetailsChange} />
                <GoalSelector
                  value={advancedState.websiteGoal}
                  onChange={(goal) => onAdvancedStateChange((prev) => ({ ...prev, websiteGoal: goal }))}
                />
              </div>
            )}
          </div>

          {/* Group 2: Design */}
          <div className="border border-theme rounded-xl overflow-hidden bg-surface">
            <button
              type="button"
              onClick={() => toggleSection('design')}
              className="w-full p-3 flex items-center justify-between text-left font-semibold text-xs text-theme-primary hover:bg-surface-elevated transition-colors"
            >
              <div className="flex items-center space-x-2">
                <Palette className="w-3.5 h-3.5 text-brand-500" />
                <span>Design (Style, Color, Layout, Animation)</span>
                {creativeDirection.colorTheme && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-brand-500/10 text-brand-500 font-mono font-semibold">
                    {creativeDirection.colorTheme}
                  </span>
                )}
              </div>
              {openSections.design ? <ChevronUp className="w-3.5 h-3.5 text-theme-muted" /> : <ChevronDown className="w-3.5 h-3.5 text-theme-muted" />}
            </button>

            {openSections.design && (
              <div className="p-4 border-t border-theme bg-surface-elevated">
                <CreativeDirection direction={creativeDirection} onChange={onCreativeDirectionChange} />
              </div>
            )}
          </div>

          {/* Group 3: Structure */}
          <div className="border border-theme rounded-xl overflow-hidden bg-surface">
            <button
              type="button"
              onClick={() => toggleSection('structure')}
              className="w-full p-3 flex items-center justify-between text-left font-semibold text-xs text-theme-primary hover:bg-surface-elevated transition-colors"
            >
              <div className="flex items-center space-x-2">
                <LayoutGrid className="w-3.5 h-3.5 text-brand-500" />
                <span>Structure (Pages & Features)</span>
                {advancedState.selectedFeatures.length > 0 && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-brand-500/10 text-brand-500 font-mono font-semibold">
                    {advancedState.selectedFeatures.length} selected
                  </span>
                )}
              </div>
              {openSections.structure ? <ChevronUp className="w-3.5 h-3.5 text-theme-muted" /> : <ChevronDown className="w-3.5 h-3.5 text-theme-muted" />}
            </button>

            {openSections.structure && (
              <div className="p-4 border-t border-theme bg-surface-elevated">
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

          {/* Group 4: Brand */}
          <div className="border border-theme rounded-xl overflow-hidden bg-surface">
            <button
              type="button"
              onClick={() => toggleSection('brand')}
              className="w-full p-3 flex items-center justify-between text-left font-semibold text-xs text-theme-primary hover:bg-surface-elevated transition-colors"
            >
              <div className="flex items-center space-x-2">
                <Tag className="w-3.5 h-3.5 text-brand-500" />
                <span>Brand (Name, Identity, Colors, CTA)</span>
                {brandContext.brandName && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-brand-500/10 text-brand-500 font-mono font-semibold">
                    {brandContext.brandName}
                  </span>
                )}
              </div>
              {openSections.brand ? <ChevronUp className="w-3.5 h-3.5 text-theme-muted" /> : <ChevronDown className="w-3.5 h-3.5 text-theme-muted" />}
            </button>

            {openSections.brand && (
              <div className="p-4 border-t border-theme bg-surface-elevated">
                <BrandContext context={brandContext} onChange={onBrandContextChange} />
              </div>
            )}
          </div>

          {/* Group 5: References */}
          <div className="border border-theme rounded-xl overflow-hidden bg-surface">
            <button
              type="button"
              onClick={() => toggleSection('references')}
              className="w-full p-3 flex items-center justify-between text-left font-semibold text-xs text-theme-primary hover:bg-surface-elevated transition-colors"
            >
              <div className="flex items-center space-x-2">
                <Link2 className="w-3.5 h-3.5 text-brand-500" />
                <span>References (URL & Image)</span>
                {designReferences.length > 0 && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-brand-500/10 text-brand-500 font-mono font-semibold">
                    {designReferences.length} added
                  </span>
                )}
              </div>
              {openSections.references ? <ChevronUp className="w-3.5 h-3.5 text-theme-muted" /> : <ChevronDown className="w-3.5 h-3.5 text-theme-muted" />}
            </button>

            {openSections.references && (
              <div className="p-4 border-t border-theme bg-surface-elevated">
                <DesignReferences references={designReferences} onChange={onDesignReferencesChange} />
              </div>
            )}
          </div>

          {/* Group 6: Technical */}
          <div className="border border-theme rounded-xl overflow-hidden bg-surface">
            <button
              type="button"
              onClick={() => toggleSection('tech')}
              className="w-full p-3 flex items-center justify-between text-left font-semibold text-xs text-theme-primary hover:bg-surface-elevated transition-colors"
            >
              <div className="flex items-center space-x-2">
                <Cpu className="w-3.5 h-3.5 text-brand-500" />
                <span>Technical (Framework & Build Target)</span>
                {techStack.framework && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-brand-500/10 text-brand-500 font-mono font-semibold">
                    {techStack.framework}
                  </span>
                )}
              </div>
              {openSections.tech ? <ChevronUp className="w-3.5 h-3.5 text-theme-muted" /> : <ChevronDown className="w-3.5 h-3.5 text-theme-muted" />}
            </button>

            {openSections.tech && (
              <div className="p-4 border-t border-theme bg-surface-elevated space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-theme-primary mb-1 block">
                      Target Builder
                    </label>
                    <select
                      value={advancedState.buildTarget || ''}
                      onChange={(e) => onAdvancedStateChange((prev) => ({ ...prev, buildTarget: e.target.value as any }))}
                      className="w-full px-3 py-2 bg-surface border border-theme rounded-xl text-xs font-medium text-theme-primary focus:outline-none focus:border-brand-500"
                    >
                      <option value="">Auto (Any Builder)</option>
                      <option value="v0">v0.dev</option>
                      <option value="Bolt">Bolt.new</option>
                      <option value="Cursor">Cursor</option>
                      <option value="Lovable">Lovable</option>
                      <option value="Claude">Claude / ChatGPT</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-theme-primary mb-1 block">
                      Framework
                    </label>
                    <select
                      value={techStack.framework || ''}
                      onChange={(e) => onTechStackChange({ ...techStack, framework: e.target.value })}
                      className="w-full px-3 py-2 bg-surface border border-theme rounded-xl text-xs font-medium text-theme-primary focus:outline-none focus:border-brand-500"
                    >
                      <option value="">Auto (AI Decides)</option>
                      <option value="React">React</option>
                      <option value="Next.js">Next.js</option>
                      <option value="Vite">Vite</option>
                      <option value="HTML-CSS-JS">HTML / CSS / JS</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
