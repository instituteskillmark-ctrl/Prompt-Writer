import React, { useState } from 'react';
import { FolderKanban, Plus, Clock, Trash2, Eye, X } from 'lucide-react';
import { CopyButton } from './CopyButton';
import { DownloadButton } from './DownloadButton';
import type { SavedPromptItem } from '../utils/storage';

interface MyPromptsViewProps {
  savedPrompts: SavedPromptItem[];
  onDeletePrompt: (id: string) => void;
  onNewPromptClick: () => void;
}

export const MyPromptsView: React.FC<MyPromptsViewProps> = ({
  savedPrompts,
  onDeletePrompt,
  onNewPromptClick
}) => {
  const [selectedPrompt, setSelectedPrompt] = useState<SavedPromptItem | null>(null);

  return (
    <div className="max-w-6xl mx-auto space-y-6 pt-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-theme">
        <div>
          <h1 className="text-2xl font-extrabold text-theme-primary tracking-tight">Saved Prompts</h1>
          <p className="text-xs text-theme-secondary mt-1">
            Access, view, copy, or export your locally saved website prompts.
          </p>
        </div>

        <button
          onClick={onNewPromptClick}
          type="button"
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-teal-glow transition-all active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Prompt</span>
        </button>
      </div>

      {/* Prompts Grid or Empty State */}
      {savedPrompts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {savedPrompts.map((item) => (
            <div
              key={item.id}
              className="bg-surface border border-theme hover:border-brand-500/40 rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-1 rounded-md badge-teal text-[10px] font-bold">
                      {item.websiteType}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-surface-elevated border border-theme text-[10px] text-theme-muted font-medium">
                      {item.visualStyle}
                    </span>
                  </div>

                  <div className="flex items-center space-x-1 text-[11px] text-theme-muted font-mono">
                    <Clock className="w-3 h-3" />
                    <span>{item.date}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold text-theme-primary mb-2 line-clamp-1">
                  {item.title}
                </h3>

                {/* Excerpt */}
                <div className="bg-surface-elevated p-3 rounded-xl border border-theme text-xs font-mono text-theme-secondary line-clamp-3 mb-4">
                  {item.text}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-3 border-t border-theme flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setSelectedPrompt(item)}
                    type="button"
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-theme bg-surface hover:bg-surface-elevated text-xs font-semibold text-theme-primary transition-all"
                  >
                    <Eye className="w-3.5 h-3.5 text-brand-500" />
                    <span>View</span>
                  </button>

                  <CopyButton textToCopy={item.text} />
                </div>

                <div className="flex items-center space-x-2">
                  <DownloadButton content={item.text} filename={`${item.title.toLowerCase().replace(/\s+/g, '-')}.txt`} />
                  
                  <button
                    onClick={() => onDeletePrompt(item.id)}
                    type="button"
                    className="p-2 rounded-xl border border-theme bg-surface hover:bg-rose-500/10 text-theme-muted hover:text-rose-500 transition-colors"
                    title="Delete prompt"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-surface border border-theme rounded-2xl p-12 text-center flex flex-col items-center justify-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-brand-500/10 text-brand-500 flex items-center justify-center shadow-teal-glow">
            <FolderKanban className="w-7 h-7" />
          </div>
          <div className="max-w-md space-y-1">
            <h3 className="text-base font-extrabold text-theme-primary uppercase tracking-wide">
              NO PROMPTS YET
            </h3>
            <p className="text-xs text-theme-muted leading-relaxed">
              Your created website prompts will automatically be stored in your local workspace history when you generate them.
            </p>
          </div>
          <button
            onClick={onNewPromptClick}
            type="button"
            className="mt-2 inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-teal-glow transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>CREATE YOUR FIRST PROMPT</span>
          </button>
        </div>
      )}

      {/* Detail Modal */}
      {selectedPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-surface border border-theme rounded-2xl max-w-3xl w-full p-6 shadow-2xl relative max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-theme mb-4">
              <div>
                <h3 className="text-base font-bold text-theme-primary">{selectedPrompt.title}</h3>
                <p className="text-xs text-theme-muted">Saved on {selectedPrompt.date} • {selectedPrompt.websiteType}</p>
              </div>
              <button
                onClick={() => setSelectedPrompt(null)}
                type="button"
                className="p-1.5 rounded-lg text-theme-muted hover:text-theme-primary hover:bg-surface-elevated transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 p-4 bg-surface-elevated border border-theme rounded-xl font-mono text-xs text-theme-primary whitespace-pre-wrap">
              {selectedPrompt.text}
            </div>

            <div className="pt-4 border-t border-theme mt-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CopyButton textToCopy={selectedPrompt.text} />
                <DownloadButton content={selectedPrompt.text} filename={`${selectedPrompt.title.toLowerCase().replace(/\s+/g, '-')}.txt`} />
              </div>
              <button
                onClick={() => setSelectedPrompt(null)}
                type="button"
                className="px-4 py-2 rounded-xl text-xs font-semibold text-theme-secondary hover:text-theme-primary hover:bg-surface-elevated transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
