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
  // Main accordion state: COLLAPSED BY DEFAULT
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Sub-categories accordion states: COLLAPSED BY DEFAULT
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
              <h3 className="text-xs font-bold tracking-wider text-theme-primary uppercase">
                + Customize
              </h3>
              <span className="text-[10px] font-semibold text-theme-muted">
                (Optional {configuredCount > 0 ? `· ${configuredCount} set` : ''})
              </span>
            </div>
            <p className="text-[11px] text-theme-secondary font-medium mt-0.5">
              Add specific design, brand, or technical preferences if desired.
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
        <div className="mt-5 pt-4 border-t border-theme space-y-3 animate-fadeIn">
          {/* Group 1: PROJECT */}
          <div className="border border-theme rounded-xl overflow-hidden bg-surface-elevated">
            <button
              type="button"
              onClick={() => toggleSection('project')}
              className="w-full p-3.5 flex items-center justify-between text-left font-bold text-xs text-theme-primary hover:bg-brand-500/5 transition-colors"
            >
              <div className="flex items-center space-x-2.5">
                <FolderKanban className="w-4 h-4 text-brand-500" />
                <span className="uppercase tracking-wider">PROJECT (Type, Audience, Goal)</span>
                {projectDetails.websiteType && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-brand-500/10 text-brand-500 font-mono font-bold">
                    {projectDetails.websiteType}
                  </span>
                )}
              </div>
              {openSections.project ? <ChevronUp className="w-4 h-4 text-theme-muted" /> : <ChevronDown className="w-4 h-4 text-theme-muted" />}
            </button>

            {openSections.project && (
              <div className="p-4 border-t border-theme space-y-4 bg-surface">
                <ProjectDetails details={projectDetails} onChange={onProjectDetailsChange} />
                <GoalSelector
                  value={advancedState.websiteGoal}
                  onChange={(goal) => onAdvancedStateChange((prev) => ({ ...prev, websiteGoal: goal }))}
                />
              </div>
            )}
          </div>

          {/* Group 2: DESIGN */}
          <div className="border border-theme rounded-xl overflow-hidden bg-surface-elevated">
            <button
              type="button"
              onClick={() => toggleSection('design')}
              className="w-full p-3.5 flex items-center justify-between text-left font-bold text-xs text-theme-primary hover:bg-brand-500/5 transition-colors"
            >
              <div className="flex items-center space-x-2.5">
                <Palette className="w-4 h-4 text-brand-500" />
                <span className="uppercase tracking-wider">DESIGN (Style, Colors, Layout)</span>
                {creativeDirection.colorTheme && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-brand-500/10 text-brand-500 font-mono font-bold">
                    {creativeDirection.colorTheme}
                  </span>
                )}
              </div>
              {openSections.design ? <ChevronUp className="w-4 h-4 text-theme-muted" /> : <ChevronDown className="w-4 h-4 text-theme-muted" />}
            </button>

            {openSections.design && (
              <div className="p-4 border-t border-theme bg-surface">
                <CreativeDirection direction={creativeDirection} onChange={onCreativeDirectionChange} />
              </div>
            )}
          </div>

          {/* Group 3: STRUCTURE */}
          <div className="border border-theme rounded-xl overflow-hidden bg-surface-elevated">
            <button
              type="button"
              onClick={() => toggleSection('structure')}
              className="w-full p-3.5 flex items-center justify-between text-left font-bold text-xs text-theme-primary hover:bg-brand-500/5 transition-colors"
            >
              <div className="flex items-center space-x-2.5">
                <LayoutGrid className="w-4 h-4 text-brand-500" />
                <span className="uppercase tracking-wider">STRUCTURE (Pages & Features)</span>
                {advancedState.selectedFeatures.length > 0 && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-brand-500/10 text-brand-500 font-mono font-bold">
                    {advancedState.selectedFeatures.length} selected
                  </span>
                )}
              </div>
              {openSections.structure ? <ChevronUp className="w-4 h-4 text-theme-muted" /> : <ChevronDown className="w-4 h-4 text-theme-muted" />}
            </button>

            {openSections.structure && (
              <div className="p-4 border-t border-theme bg-surface">
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

          {/* Group 4: BRAND */}
          <div className="border border-theme rounded-xl overflow-hidden bg-surface-elevated">
            <button
              type="button"
              onClick={() => toggleSection('brand')}
              className="w-full p-3.5 flex items-center justify-between text-left font-bold text-xs text-theme-primary hover:bg-brand-500/5 transition-colors"
            >
              <div className="flex items-center space-x-2.5">
                <Tag className="w-4 h-4 text-brand-500" />
                <span className="uppercase tracking-wider">BRAND (Name, Identity & Colors)</span>
                {brandContext.brandName && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-brand-500/10 text-brand-500 font-mono font-bold">
                    {brandContext.brandName}
                  </span>
                )}
              </div>
              {openSections.brand ? <ChevronUp className="w-4 h-4 text-theme-muted" /> : <ChevronDown className="w-4 h-4 text-theme-muted" />}
            </button>

            {openSections.brand && (
              <div className="p-4 border-t border-theme bg-surface">
                <BrandContext context={brandContext} onChange={onBrandContextChange} />
              </div>
            )}
          </div>

          {/* Group 5: REFERENCES */}
          <div className="border border-theme rounded-xl overflow-hidden bg-surface-elevated">
            <button
              type="button"
              onClick={() => toggleSection('references')}
              className="w-full p-3.5 flex items-center justify-between text-left font-bold text-xs text-theme-primary hover:bg-brand-500/5 transition-colors"
            >
              <div className="flex items-center space-x-2.5">
                <Link2 className="w-4 h-4 text-brand-500" />
                <span className="uppercase tracking-wider">REFERENCES (URL & Inspiration)</span>
                {designReferences.length > 0 && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-brand-500/10 text-brand-500 font-mono font-bold">
                    {designReferences.length} links
                  </span>
                )}
              </div>
              {openSections.references ? <ChevronUp className="w-4 h-4 text-theme-muted" /> : <ChevronDown className="w-4 h-4 text-theme-muted" />}
            </button>

            {openSections.references && (
              <div className="p-4 border-t border-theme bg-surface">
                <DesignReferences references={designReferences} onChange={onDesignReferencesChange} />
              </div>
            )}
          </div>

          {/* Group 6: TECH */}
          <div className="border border-theme rounded-xl overflow-hidden bg-surface-elevated">
            <button
              type="button"
              onClick={() => toggleSection('tech')}
              className="w-full p-3.5 flex items-center justify-between text-left font-bold text-xs text-theme-primary hover:bg-brand-500/5 transition-colors"
            >
              <div className="flex items-center space-x-2.5">
                <Cpu className="w-4 h-4 text-brand-500" />
                <span className="uppercase tracking-wider">TECH (Stack & Target Tool)</span>
                {techStack.framework && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-brand-500/10 text-brand-500 font-mono font-bold">
                    {techStack.framework}
                  </span>
                )}
              </div>
              {openSections.tech ? <ChevronUp className="w-4 h-4 text-theme-muted" /> : <ChevronDown className="w-4 h-4 text-theme-muted" />}
            </button>

            {openSections.tech && (
              <div className="p-4 border-t border-theme bg-surface space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-theme-primary mb-1.5 block">
                      Target Builder
                    </label>
                    <select
                      value={advancedState.buildTarget || ''}
                      onChange={(e) => onAdvancedStateChange((prev) => ({ ...prev, buildTarget: e.target.value as any }))}
                      className="w-full px-3 py-2 bg-surface-elevated border border-theme rounded-xl text-xs font-medium text-theme-primary focus:outline-none focus:border-brand-500"
                    >
                      <option value="">Auto (Any AI Builder)</option>
                      <option value="v0.dev">v0.dev</option>
                      <option value="Bolt.new">Bolt.new</option>
                      <option value="Cursor">Cursor</option>
                      <option value="Lovable">Lovable</option>
                      <option value="Claude">Claude / ChatGPT</option>
                      <option value="Webflow">Webflow</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-theme-primary mb-1.5 block">
                      Preferred Framework
                    </label>
                    <select
                      value={techStack.framework || ''}
                      onChange={(e) => onTechStackChange({ ...techStack, framework: e.target.value })}
                      className="w-full px-3 py-2 bg-surface-elevated border border-theme rounded-xl text-xs font-medium text-theme-primary focus:outline-none focus:border-brand-500"
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
