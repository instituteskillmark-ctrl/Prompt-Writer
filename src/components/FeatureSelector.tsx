import React from 'react';
import { Sliders, Code2, Bot, Check, Sparkles } from 'lucide-react';
import type { TechStackPreference, BuildTarget, OutputStyle } from '../types/generator';

interface FeatureSelectorProps {
  selectedFeatures: string[];
  onToggleFeature: (feature: string) => void;
  techStack: TechStackPreference;
  onTechStackChange: (val: TechStackPreference) => void;
  buildTarget: BuildTarget;
  onBuildTargetChange: (val: BuildTarget) => void;
  outputStyle: OutputStyle;
  onOutputStyleChange: (val: OutputStyle) => void;
}

export const ALL_FEATURES = [
  'Contact Form',
  'Search',
  'Authentication',
  'Pricing',
  'Blog',
  'Testimonials',
  'FAQ',
  'Newsletter',
  'Dashboard',
  'Booking',
  'Product Catalog',
  'Reviews'
];

export const TECH_STACKS: TechStackPreference[] = [
  'No Preference',
  'Next.js',
  'React',
  'HTML / CSS / JS',
  'Tailwind CSS',
  'Custom'
];

export const BUILD_TARGETS: BuildTarget[] = [
  'Antigravity',
  'Claude',
  'Cursor',
  'v0',
  'Lovable',
  'Replit',
  'Generic AI Builder'
];

export const OUTPUT_STYLES: OutputStyle[] = [
  'Clean Specification',
  'Detailed Build Prompt',
  'Developer Prompt',
  'Creative Direction',
  'Complete Master Prompt'
];

export const FeatureSelector: React.FC<FeatureSelectorProps> = ({
  selectedFeatures,
  onToggleFeature,
  techStack,
  onTechStackChange,
  buildTarget,
  onBuildTargetChange,
  outputStyle,
  onOutputStyleChange
}) => {
  return (
    <div className="bg-surface border border-theme rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all duration-300 space-y-6">
      {/* 1. Website Features Multi-Select */}
      <div>
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-theme">
          <div className="flex items-center space-x-2">
            <Sliders className="w-4 h-4 text-brand-500" />
            <h3 className="text-xs font-extrabold tracking-widest text-theme-primary uppercase">
              WEBSITE FEATURES (CONFIG ONLY)
            </h3>
          </div>
          <span className="text-[10px] text-theme-muted font-mono">{selectedFeatures.length} selected</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {ALL_FEATURES.map((feat) => {
            const isSelected = selectedFeatures.includes(feat);
            return (
              <button
                key={feat}
                onClick={() => onToggleFeature(feat)}
                type="button"
                className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 border ${
                  isSelected
                    ? 'bg-brand-500/10 text-brand-500 dark:text-brand-400 border-brand-500 font-semibold shadow-sm'
                    : 'bg-surface-elevated text-theme-secondary hover:text-theme-primary border-theme hover:border-theme-hover'
                }`}
              >
                {isSelected && <Check className="w-3 h-3 text-brand-500 stroke-[3]" />}
                <span>{feat}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Tech Stack & Build Target */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 border-t border-theme">
        {/* Tech Stack */}
        <div>
          <label className="flex items-center space-x-2 text-xs font-bold text-theme-primary mb-2.5">
            <Code2 className="w-3.5 h-3.5 text-brand-500" />
            <span>Development Preference</span>
          </label>
          <div className="flex flex-wrap gap-1.5">
            {TECH_STACKS.map((stack) => {
              const isSelected = techStack === stack;
              return (
                <button
                  key={stack}
                  onClick={() => onTechStackChange(stack)}
                  type="button"
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all border ${
                    isSelected
                      ? 'bg-brand-500/10 text-brand-500 border-brand-500 font-semibold'
                      : 'bg-surface-elevated text-theme-secondary border-theme hover:text-theme-primary'
                  }`}
                >
                  {stack}
                </button>
              );
            })}
          </div>
        </div>

        {/* Build Target */}
        <div>
          <label className="flex items-center space-x-2 text-xs font-bold text-theme-primary mb-2.5">
            <Bot className="w-3.5 h-3.5 text-brand-500" />
            <span>Build With (AI Tool Target)</span>
          </label>
          <div className="flex flex-wrap gap-1.5">
            {BUILD_TARGETS.map((target) => {
              const isSelected = buildTarget === target;
              return (
                <button
                  key={target}
                  onClick={() => onBuildTargetChange(target)}
                  type="button"
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all border ${
                    isSelected
                      ? 'bg-brand-500/10 text-brand-500 border-brand-500 font-semibold'
                      : 'bg-surface-elevated text-theme-secondary border-theme hover:text-theme-primary'
                  }`}
                >
                  {target}
                </button>
              );
            })}
          </div>
        </div>

        {/* Output Style */}
        <div>
          <label className="flex items-center space-x-2 text-xs font-bold text-theme-primary mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-brand-500" />
            <span>Prompt Output Style</span>
          </label>
          <div className="flex flex-wrap gap-1.5">
            {OUTPUT_STYLES.map((style) => {
              const isSelected = outputStyle === style;
              return (
                <button
                  key={style}
                  onClick={() => onOutputStyleChange(style)}
                  type="button"
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all border ${
                    isSelected
                      ? 'bg-brand-500/10 text-brand-500 border-brand-500 font-semibold'
                      : 'bg-surface-elevated text-theme-secondary border-theme hover:text-theme-primary'
                  }`}
                >
                  {style}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
