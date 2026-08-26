import React from 'react';
import { Star, Heart, ArrowRight } from 'lucide-react';
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
    <div className="max-w-5xl mx-auto space-y-6 pt-2">
      {/* Header */}
      <div className="pb-4 border-b border-theme">
        <h1 className="text-xl sm:text-2xl font-bold text-theme-primary tracking-tight">Favorites</h1>
        <p className="text-xs text-theme-secondary mt-0.5">
          Quick access to your favorited website templates and prompt ideas.
        </p>
      </div>

      {totalFavorites > 0 ? (
        <div className="space-y-6">
          {/* Favorited Templates */}
          {favoriteTemplates.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-theme-secondary">
                Favorited Templates ({favoriteTemplates.length})
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {favoriteTemplates.map((tpl) => (
                  <div
                    key={tpl.id}
                    className="bg-surface border border-theme rounded-2xl p-4 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-0.5 rounded bg-brand-500/10 text-brand-500 text-[10px] font-semibold">
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

                      <h3 className="text-sm font-bold text-theme-primary mb-1">{tpl.name}</h3>
                      <p className="text-xs text-theme-secondary mb-3 leading-relaxed line-clamp-2">{tpl.description}</p>
                    </div>

                    <button
                      onClick={() => onSelectTemplate(tpl)}
                      type="button"
                      className="w-full flex items-center justify-center space-x-1.5 px-3 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold transition-colors"
                    >
                      <span>Use Template</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Favorited Examples */}
          {favoriteExamples.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-theme-secondary">
                Favorited Prompt Ideas ({favoriteExamples.length})
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {favoriteExamples.map((ex) => (
                  <div
                    key={ex.id}
                    className="bg-surface border border-theme rounded-2xl p-4 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-0.5 rounded bg-brand-500/10 text-brand-500 text-[10px] font-semibold">
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

                      <h3 className="text-sm font-bold text-theme-primary mb-1.5">{ex.title}</h3>
                      <p className="text-xs text-theme-secondary leading-relaxed bg-surface-elevated p-3 rounded-xl border border-theme">
                        "{ex.text}"
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-theme flex justify-end">
                      <button
                        onClick={() => onUsePrompt(ex.text)}
                        type="button"
                        className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-brand-500/10 text-brand-500 hover:bg-brand-500 hover:text-white text-xs font-semibold transition-colors"
                      >
                        <span>Try This Idea</span>
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
        /* Empty State */
        <div className="bg-surface border border-theme rounded-2xl p-10 text-center flex flex-col items-center justify-center space-y-3">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
            <Star className="w-6 h-6 fill-amber-500/20" />
          </div>
          <div className="max-w-sm space-y-1">
            <h3 className="text-base font-bold text-theme-primary">
              No favorites saved yet
            </h3>
            <p className="text-xs text-theme-secondary leading-relaxed">
              Click the heart icon on any template or example card to save it to your favorites.
            </p>
          </div>
          <button
            onClick={onExploreClick}
            type="button"
            className="mt-1 inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs transition-colors"
          >
            <span>Explore Templates</span>
          </button>
        </div>
      )}
    </div>
  );
};
