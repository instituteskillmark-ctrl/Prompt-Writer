import React, { useState } from 'react';
import { ArrowUpRight, Copy, Check, Search, Heart, SlidersHorizontal } from 'lucide-react';

export interface ExampleIdeaItem {
  id: string;
  title: string;
  category: string;
  text: string;
}

interface ExamplesViewProps {
  onUsePrompt: (text: string) => void;
  favoriteIds: string[];
  onToggleFavorite: (id: string) => void;
}

export const EXAMPLE_IDEAS_LIST: ExampleIdeaItem[] = [
  {
    id: 'ex-ai-agency',
    title: 'Creative AI Agency',
    category: 'Agency / AI',
    text: 'A premium website for an AI creative agency working with modern startups. Features dark mode visual aesthetic, interactive client work showcase, team bio cards, service tier pricing, and sleek inquiry form.'
  },
  {
    id: 'ex-luxury-hotel',
    title: 'Luxury Boutique Hotel',
    category: 'Hospitality',
    text: 'A cinematic luxury hotel website with immersive full-width photography, editorial typography, room booking widget, spa & dining menu, and guest reviews slider.'
  },
  {
    id: 'ex-saas-analytics',
    title: 'SaaS Product Platform',
    category: 'SaaS / Tech',
    text: 'A modern SaaS landing page focused on conversion and product clarity. Includes live dashboard preview mockup, feature comparison table, integration grid, and 14-day free trial CTA.'
  },
  {
    id: 'ex-dev-portfolio',
    title: 'Developer & Architect Portfolio',
    category: 'Portfolio',
    text: 'A dark editorial portfolio for an AI creative developer. Features code snippet toggles, open-source project grid, terminal-style resume, and GitHub project stats.'
  },
  {
    id: 'ex-craft-coffee',
    title: 'Modern Craft Coffee & Eatery',
    category: 'Restaurant',
    text: 'An inviting, modern organic coffee shop and artisanal bakery website. Features online table reservation widget, seasonal food & beverage menu with filter tabs, and store locator.'
  },
  {
    id: 'ex-web3-incubator',
    title: 'Web3 & AI Venture Studio',
    category: 'Futuristic',
    text: 'A sleek futuristic landing page for an AI and decentralized tech incubator. Features interactive 3D particle hero background, portfolio startup cards, and pitch deck request form.'
  }
];

export const ExamplesView: React.FC<ExamplesViewProps> = ({
  onUsePrompt,
  favoriteIds,
  onToggleFavorite
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredExamples = EXAMPLE_IDEAS_LIST.filter((ex) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      ex.title.toLowerCase().includes(q) ||
      ex.category.toLowerCase().includes(q) ||
      ex.text.toLowerCase().includes(q)
    );
  });

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pt-4">
      {/* Header */}
      <div className="pb-6 border-b border-theme">
        <h1 className="text-2xl font-extrabold text-theme-primary tracking-tight">Prompt Examples</h1>
        <p className="text-xs text-theme-secondary mt-1">
          Explore curated website prompt ideas for popular tech stacks and industry niches.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-theme-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search examples..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-theme bg-surface text-theme-primary placeholder-theme-muted text-xs font-medium focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
        />
      </div>

      {/* Examples Grid */}
      {filteredExamples.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredExamples.map((item) => {
            const isFav = favoriteIds.includes(item.id);
            return (
              <div
                key={item.id}
                className="bg-surface border border-theme hover:border-brand-500/40 rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 rounded-md badge-teal text-[10px] font-bold">
                      {item.category}
                    </span>

                    <button
                      onClick={() => onToggleFavorite(item.id)}
                      type="button"
                      className="p-1 rounded-lg hover:bg-surface-elevated text-theme-muted hover:text-rose-500 transition-colors"
                      title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <Heart
                        className={`w-4 h-4 transition-transform active:scale-125 ${
                          isFav ? 'fill-rose-500 text-rose-500' : ''
                        }`}
                      />
                    </button>
                  </div>

                  <h3 className="text-sm font-bold text-theme-primary mb-2 group-hover:text-brand-500 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-theme-secondary leading-relaxed bg-surface-elevated p-3 rounded-xl border border-theme">
                    "{item.text}"
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-theme flex items-center justify-between">
                  <button
                    onClick={() => handleCopyText(item.id, item.text)}
                    type="button"
                    className="inline-flex items-center space-x-1.5 text-xs font-semibold text-theme-muted hover:text-theme-primary transition-colors"
                  >
                    {copiedId === item.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-emerald-500 font-bold">Copied ✓</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Text</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => onUsePrompt(item.text)}
                    type="button"
                    className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-brand-500/10 text-brand-500 hover:bg-brand-500 hover:text-white text-xs font-bold transition-all shadow-sm"
                  >
                    <span>TRY THIS IDEA</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-surface border border-theme rounded-2xl p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center mx-auto">
            <SlidersHorizontal className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-theme-primary">No matching examples found</h3>
          <p className="text-xs text-theme-muted max-w-sm mx-auto">
            Try adjusting your search query.
          </p>
          <button
            onClick={() => setSearchQuery('')}
            type="button"
            className="px-3.5 py-1.5 rounded-xl badge-teal text-xs font-semibold"
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
};
