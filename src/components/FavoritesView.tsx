import React from 'react';
import { Star, Sparkles, ArrowRight, Heart } from 'lucide-react';
import { TEMPLATE_GALLERY } from './TemplatesView';
import type { TemplateItem } from './TemplatesView';
import { EXAMPLE_IDEAS_LIST } from './ExamplesView';

interface FavoritesViewProps {
  favoriteIds: string[];
  onToggleFavorite: (id: string) => void;
  onSelectTemplate: (template: TemplateItem) => void;
  onUsePrompt: (text: string) => void;
  onExploreClick: () => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  favoriteIds,
  onToggleFavorite,
  onSelectTemplate,
  onUsePrompt,
  onExploreClick
}) => {
  const favoriteTemplates = TEMPLATE_GALLERY.filter((t) => favoriteIds.includes(t.id));
  const favoriteExamples = EXAMPLE_IDEAS_LIST.filter((e) => favoriteIds.includes(e.id));

  const totalFavorites = favoriteTemplates.length + favoriteExamples.length;

  return (
    <div className="max-w-6xl mx-auto space-y-6 pt-4">
      {/* Header */}
      <div className="pb-6 border-b border-theme">
        <h1 className="text-2xl font-extrabold text-theme-primary tracking-tight">Favorite Prompts & Templates</h1>
        <p className="text-xs text-theme-secondary mt-1">
          Quick access to your favorited website templates and prompt ideas.
        </p>
      </div>

      {totalFavorites > 0 ? (
        <div className="space-y-8">
          {/* 1. Favorited Templates */}
          {favoriteTemplates.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xs font-extrabold tracking-widest text-theme-primary uppercase flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-brand-500" />
                <span>Favorited Templates ({favoriteTemplates.length})</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {favoriteTemplates.map((tpl) => (
                  <div
                    key={tpl.id}
                    className="bg-surface border border-theme rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2.5 py-1 rounded-md badge-teal text-[10px] font-bold">
                          {tpl.category}
                        </span>
                        <button
                          onClick={() => onToggleFavorite(tpl.id)}
                          type="button"
                          className="p-1 rounded-lg text-rose-500 hover:bg-surface-elevated transition-colors"
                        >
                          <Heart className="w-4 h-4 fill-rose-500" />
                        </button>
                      </div>

                      <h3 className="text-sm font-bold text-theme-primary mb-1.5">{tpl.name}</h3>
                      <p className="text-xs text-theme-secondary mb-4 leading-relaxed line-clamp-2">{tpl.description}</p>
                    </div>

                    <button
                      onClick={() => onSelectTemplate(tpl)}
                      type="button"
                      className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-brand-500/10 text-brand-500 hover:bg-brand-500 hover:text-white text-xs font-bold transition-all shadow-sm"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>USE TEMPLATE</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. Favorited Examples */}
          {favoriteExamples.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xs font-extrabold tracking-widest text-theme-primary uppercase flex items-center space-x-2">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500/20" />
                <span>Favorited Prompt Ideas ({favoriteExamples.length})</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {favoriteExamples.map((ex) => (
                  <div
                    key={ex.id}
                    className="bg-surface border border-theme rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2.5 py-1 rounded-md badge-teal text-[10px] font-bold">
                          {ex.category}
                        </span>
                        <button
                          onClick={() => onToggleFavorite(ex.id)}
                          type="button"
                          className="p-1 rounded-lg text-rose-500 hover:bg-surface-elevated transition-colors"
                        >
                          <Heart className="w-4 h-4 fill-rose-500" />
                        </button>
                      </div>

                      <h3 className="text-sm font-bold text-theme-primary mb-2">{ex.title}</h3>
                      <p className="text-xs text-theme-secondary leading-relaxed bg-surface-elevated p-3 rounded-xl border border-theme">
                        "{ex.text}"
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-theme flex justify-end">
                      <button
                        onClick={() => onUsePrompt(ex.text)}
                        type="button"
                        className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-brand-500/10 text-brand-500 hover:bg-brand-500 hover:text-white text-xs font-bold transition-all shadow-sm"
                      >
                        <span>TRY THIS IDEA</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Empty Favorites State */
        <div className="bg-surface border border-theme rounded-2xl p-12 text-center flex flex-col items-center justify-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center shadow-sm">
            <Star className="w-7 h-7 fill-amber-500/20" />
          </div>
          <div className="max-w-md space-y-1">
            <h3 className="text-base font-extrabold text-theme-primary uppercase tracking-wide">
              NO FAVORITES SAVED YET
            </h3>
            <p className="text-xs text-theme-muted leading-relaxed">
              Your favorite templates and prompt ideas will appear here when you click the heart icon on any card.
            </p>
          </div>
          <button
            onClick={onExploreClick}
            type="button"
            className="mt-2 inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-teal-glow transition-all active:scale-95"
          >
            <span>Explore Templates & Examples</span>
          </button>
        </div>
      )}
    </div>
  );
};
