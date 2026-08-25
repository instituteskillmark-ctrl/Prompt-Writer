import React from 'react';
import { Layers, Palette, Users, LayoutGrid, Check } from 'lucide-react';

export interface ProjectDetailsState {
  websiteType: string;
  visualStyle: string;
  targetAudience: string;
  selectedPages: string[];
}

interface ProjectDetailsProps {
  details: ProjectDetailsState;
  onChange: (details: ProjectDetailsState) => void;
}

export const WEBSITE_TYPES = [
  'Portfolio',
  'Agency',
  'SaaS',
  'E-commerce',
  'Restaurant',
  'Landing Page',
  'Blog',
  'Other'
];

export const VISUAL_STYLES = [
  'Minimal',
  'Modern',
  'Luxury',
  'Editorial',
  'Futuristic',
  'Creative'
];

export const AVAILABLE_PAGES = [
  'Hero',
  'Features',
  'Pricing',
  'Testimonials',
  'FAQ',
  'Contact',
  'Blog',
  'Footer',
  'Team Showcase',
  'Case Studies'
];

export const ProjectDetails: React.FC<ProjectDetailsProps> = ({ details, onChange }) => {
  const handleTypeSelect = (type: string) => {
    onChange({ ...details, websiteType: type });
  };

  const handleStyleSelect = (style: string) => {
    onChange({ ...details, visualStyle: style });
  };

  const handleAudienceChange = (val: string) => {
    onChange({ ...details, targetAudience: val });
  };

  const handlePageToggle = (page: string) => {
    const isSelected = details.selectedPages.includes(page);
    let updatedPages: string[];
    if (isSelected) {
      updatedPages = details.selectedPages.filter((p) => p !== page);
    } else {
      updatedPages = [...details.selectedPages, page];
    }
    onChange({ ...details, selectedPages: updatedPages });
  };

  return (
    <div className="bg-surface border border-theme rounded-2xl p-5 sm:p-6 shadow-card hover:shadow-card-hover transition-all duration-300">
      {/* Card Header */}
      <div className="flex items-center space-x-3 mb-6 pb-3 border-b border-theme">
        <div className="w-7 h-7 rounded-lg bg-brand-500/10 text-brand-500 flex items-center justify-center font-bold text-xs">
          02
        </div>
        <div>
          <h2 className="text-xs font-bold tracking-widest text-theme-primary uppercase">
            PROJECT DETAILS
          </h2>
          <p className="text-[11px] text-theme-muted">
            Define structure, audience, and functional scope for your layout.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* 1. Website Type */}
        <div>
          <label className="flex items-center space-x-2 text-xs font-bold text-theme-primary mb-3">
            <Layers className="w-3.5 h-3.5 text-brand-500" />
            <span>Website Type</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {WEBSITE_TYPES.map((type) => {
              const isSelected = details.websiteType === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleTypeSelect(type)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 border ${
                    isSelected
                      ? 'bg-brand-500/10 text-brand-500 dark:text-brand-400 border-brand-500 font-semibold shadow-sm'
                      : 'bg-surface-elevated text-theme-secondary hover:text-theme-primary border-theme hover:border-theme-hover'
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Visual Style */}
        <div>
          <label className="flex items-center space-x-2 text-xs font-bold text-theme-primary mb-3">
            <Palette className="w-3.5 h-3.5 text-brand-500" />
            <span>Visual Style</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {VISUAL_STYLES.map((style) => {
              const isSelected = details.visualStyle === style;
              return (
                <button
                  key={style}
                  type="button"
                  onClick={() => handleStyleSelect(style)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 border ${
                    isSelected
                      ? 'bg-brand-500/10 text-brand-500 dark:text-brand-400 border-brand-500 font-semibold shadow-sm'
                      : 'bg-surface-elevated text-theme-secondary hover:text-theme-primary border-theme hover:border-theme-hover'
                  }`}
                >
                  {style}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Target Audience */}
        <div>
          <label className="flex items-center space-x-2 text-xs font-bold text-theme-primary mb-2.5">
            <Users className="w-3.5 h-3.5 text-brand-500" />
            <span>Target Audience</span>
          </label>
          <input
            type="text"
            value={details.targetAudience}
            onChange={(e) => handleAudienceChange(e.target.value)}
            placeholder="e.g. Founders, Software Engineers, Enterprise IT Buyers..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-theme bg-surface-elevated text-theme-primary placeholder-theme-muted text-xs font-normal focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
          />
        </div>

        {/* 4. Pages / Sections (Multi-select) */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="flex items-center space-x-2 text-xs font-bold text-theme-primary">
              <LayoutGrid className="w-3.5 h-3.5 text-brand-500" />
              <span>Pages / Sections</span>
            </label>
            <span className="text-[10px] text-theme-muted">
              {details.selectedPages.length} selected
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {AVAILABLE_PAGES.map((page) => {
              const isSelected = details.selectedPages.includes(page);
              return (
                <button
                  key={page}
                  type="button"
                  onClick={() => handlePageToggle(page)}
                  className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 border ${
                    isSelected
                      ? 'bg-brand-500/10 text-brand-500 dark:text-brand-400 border-brand-500 font-semibold shadow-sm'
                      : 'bg-surface-elevated text-theme-secondary hover:text-theme-primary border-theme hover:border-theme-hover'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 text-brand-500 stroke-[3]" />}
                  <span>{page}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
