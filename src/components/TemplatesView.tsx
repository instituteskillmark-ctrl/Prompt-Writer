import React, { useState } from 'react';
import { Sparkles, ArrowRight, Search, Heart, SlidersHorizontal } from 'lucide-react';

export interface TemplateItem {
  id: string;
  name: string;
  category: string;
  type: string;
  style: string;
  theme: string;
  typography: string;
  layout: string;
  animation: string;
  tags: string[];
  pages: string[];
  description: string;
}

interface TemplatesViewProps {
  onSelectTemplate: (template: TemplateItem) => void;
  favoriteIds: string[];
  onToggleFavorite: (id: string) => void;
}

export const TEMPLATE_CATEGORIES = [
  'All',
  'SaaS',
  'Agency',
  'Portfolio',
  'E-commerce',
  'Restaurant',
  'Landing Page',
  'Personal Brand',
  'Creative Studio'
];

export const TEMPLATE_GALLERY: TemplateItem[] = [
  {
    id: 'tpl-saas-modern',
    name: 'Modern SaaS Landing Page',
    category: 'SaaS',
    type: 'SaaS',
    style: 'Modern',
    theme: 'Dark',
    typography: 'Modern',
    layout: 'Minimal',
    animation: 'Smooth',
    tags: ['Modern', 'Minimal', 'Dark'],
    pages: ['Hero', 'Features', 'Pricing', 'Testimonials', 'FAQ', 'Contact', 'Footer'],
    description: 'A conversion-focused SaaS website with modern typography and clean product sections.'
  },
  {
    id: 'tpl-agency-minimal',
    name: 'Creative Agency Portfolio',
    category: 'Agency',
    type: 'Agency',
    style: 'Minimal',
    theme: 'Dark',
    typography: 'Editorial',
    layout: 'Editorial',
    animation: 'Smooth',
    tags: ['Minimal', 'Editorial', 'Dark'],
    pages: ['Hero', 'Portfolio Grid', 'Case Studies', 'Team Showcase', 'Contact', 'Footer'],
    description: 'Clean, spacious design showcasing client work, team culture, and inquiry forms.'
  },
  {
    id: 'tpl-luxury-editorial',
    name: 'Luxury Editorial Showcase',
    category: 'Portfolio',
    type: 'Portfolio',
    style: 'Luxury',
    theme: 'Dark',
    typography: 'Editorial',
    layout: 'Asymmetric',
    animation: 'Cinematic',
    tags: ['Luxury', 'Editorial', 'Cinematic'],
    pages: ['Hero', 'Portfolio Grid', 'Case Studies', 'Footer'],
    description: 'High-end aesthetic featuring large media frames and elegant editorial typography.'
  },
  {
    id: 'tpl-tech-futuristic',
    name: 'Futuristic AI Tech Landing',
    category: 'Landing Page',
    type: 'Landing Page',
    style: 'Futuristic',
    theme: 'Dark',
    typography: 'Bold',
    layout: 'Grid',
    animation: 'Interactive',
    tags: ['Futuristic', 'Bold', 'Interactive'],
    pages: ['Hero', 'Features', 'Pricing', 'FAQ', 'Footer'],
    description: 'Dark mode theme tailored for AI, web3, and next-gen developer tools.'
  },
  {
    id: 'tpl-artisan-ecom',
    name: 'Sustainable E-Commerce Storefront',
    category: 'E-commerce',
    type: 'E-commerce',
    style: 'Modern',
    theme: 'Light',
    typography: 'Modern',
    layout: 'Grid',
    animation: 'Subtle',
    tags: ['Modern', 'Light', 'Grid'],
    pages: ['Hero', 'Features', 'Testimonials', 'Contact', 'Footer'],
    description: 'Clean e-commerce interface with product grids, drawer cart, and eco-impact highlights.'
  },
  {
    id: 'tpl-personal-brand',
    name: 'Executive Leadership Brand',
    category: 'Personal Brand',
    type: 'Portfolio',
    style: 'Minimal',
    theme: 'Light',
    typography: 'Editorial',
    layout: 'Minimal',
    animation: 'Subtle',
    tags: ['Minimal', 'Light', 'Editorial'],
    pages: ['Hero', 'Case Studies', 'Team Showcase', 'Contact', 'Footer'],
    description: 'Sophisticated personal site for founders, keynote speakers, and industry thought leaders.'
  },
  {
    id: 'tpl-restaurant-modern',
    name: 'Artisanal Dining & Bar',
    category: 'Restaurant',
    type: 'Restaurant',
    style: 'Creative',
    theme: 'Dark',
    typography: 'Editorial',
    layout: 'Asymmetric',
    animation: 'Smooth',
    tags: ['Creative', 'Dark', 'Asymmetric'],
    pages: ['Hero', 'Features', 'Contact', 'Footer'],
    description: 'Atmospheric dining website with interactive food menu tabs, booking widget, and store locator.'
  },
  {
    id: 'tpl-studio-creative',
    name: 'Immersive Motion Studio',
    category: 'Creative Studio',
    type: 'Agency',
    style: 'Creative',
    theme: 'Dark',
    typography: 'Experimental',
    layout: 'Asymmetric',
    animation: 'Cinematic',
    tags: ['Creative', 'Experimental', 'Cinematic'],
    pages: ['Hero', 'Portfolio Grid', 'Case Studies', 'Contact', 'Footer'],
    description: 'Bold asymmetric layout with smooth scroll dynamics for video production and 3D studios.'
  }
];

export const TemplatesView: React.FC<TemplatesViewProps> = ({
  onSelectTemplate,
  favoriteIds,
  onToggleFavorite
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredTemplates = TEMPLATE_GALLERY.filter((tpl) => {
    const matchesCategory = selectedCategory === 'All' || tpl.category === selectedCategory;
    const matchesQuery = searchQuery === '' || 
      tpl.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesQuery;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 pt-4">
      {/* Header */}
      <div className="pb-6 border-b border-theme">
        <h1 className="text-2xl font-extrabold text-theme-primary tracking-tight">Website Templates</h1>
        <p className="text-xs text-theme-secondary mt-1">
          Select a pre-configured template blueprint to immediately populate your generator workspace.
        </p>
      </div>

      {/* Controls Bar: Search & Category Pills */}
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-theme-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search templates..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-theme bg-surface text-theme-primary placeholder-theme-muted text-xs font-medium focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
          {TEMPLATE_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                type="button"
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 shrink-0 border ${
                  isSelected
                    ? 'bg-brand-500/10 text-brand-500 dark:text-brand-400 border-brand-500 font-semibold shadow-sm'
                    : 'bg-surface-elevated text-theme-secondary hover:text-theme-primary border-theme hover:border-theme-hover'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Template Cards Grid */}
      {filteredTemplates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTemplates.map((tpl) => {
            const isFav = favoriteIds.includes(tpl.id);
            return (
              <div
                key={tpl.id}
                className="bg-surface border border-theme hover:border-brand-500/40 rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group relative"
              >
                <div>
                  {/* Card Header: Category & Favorite Toggle */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 rounded-md badge-teal text-[10px] font-bold">
                      {tpl.category}
                    </span>

                    <button
                      onClick={() => onToggleFavorite(tpl.id)}
                      type="button"
                      className="p-1.5 rounded-lg hover:bg-surface-elevated text-theme-muted hover:text-rose-500 transition-colors"
                      title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <Heart
                        className={`w-4 h-4 transition-transform active:scale-125 ${
                          isFav ? 'fill-rose-500 text-rose-500' : ''
                        }`}
                      />
                    </button>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-sm font-bold text-theme-primary mb-1.5 group-hover:text-brand-500 transition-colors">
                    {tpl.name}
                  </h3>
                  <p className="text-xs text-theme-secondary mb-4 leading-relaxed line-clamp-2">
                    {tpl.description}
                  </p>

                  {/* Style Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {tpl.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md bg-surface-elevated border border-theme text-[10px] font-medium text-theme-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Primary CTA */}
                <button
                  onClick={() => onSelectTemplate(tpl)}
                  type="button"
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-brand-500/10 text-brand-500 hover:bg-brand-500 hover:text-white text-xs font-bold transition-all shadow-sm group-hover:shadow-teal-glow"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>USE TEMPLATE</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty Filter State */
        <div className="bg-surface border border-theme rounded-2xl p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center mx-auto">
            <SlidersHorizontal className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-theme-primary">No matching templates found</h3>
          <p className="text-xs text-theme-muted max-w-sm mx-auto">
            Try adjusting your search term or selecting a different category filter above.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            type="button"
            className="px-3.5 py-1.5 rounded-xl badge-teal text-xs font-semibold"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};
