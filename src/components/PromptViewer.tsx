import React from 'react';
import { CopyButton } from './CopyButton';
import { DownloadButton } from './DownloadButton';
import { Edit3 } from 'lucide-react';

interface PromptViewerProps {
  promptText: string;
  onEditClick: () => void;
}

export const PromptViewer: React.FC<PromptViewerProps> = ({ promptText, onEditClick }) => {
  return (
    <div className="bg-surface border border-theme rounded-2xl shadow-card flex flex-col h-full overflow-hidden">
      {/* Header Container */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-5 border-b border-theme bg-surface-elevated">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse-subtle" />
            <h2 className="text-xs font-extrabold tracking-widest text-theme-primary uppercase">
              FINAL WEBSITE PROMPT
            </h2>
          </div>
          <p className="text-[11px] text-theme-muted mt-0.5">
            Ready to copy or export for v0.dev, Bolt.new, Cursor, Webflow, or Claude.
          </p>
        </div>

        {/* Top-Right Controls: Copy, Edit, Download */}
        <div className="flex items-center space-x-2 shrink-0">
          <CopyButton textToCopy={promptText} />
          
          <button
            onClick={onEditClick}
            type="button"
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-theme bg-surface hover:bg-surface-elevated text-xs font-semibold text-theme-primary transition-all active:scale-95"
            title="Edit prompt text locally"
          >
            <Edit3 className="w-3.5 h-3.5 text-brand-500" />
            <span>Edit</span>
          </button>

          <DownloadButton content={promptText} filename="website-prompt.txt" />
        </div>
      </div>

      {/* Main Prompt Text Code Display Container */}
      <div className="p-5 sm:p-6 overflow-y-auto max-h-[650px] font-mono text-xs text-theme-primary leading-relaxed whitespace-pre-wrap select-text bg-surface/50 font-normal">
        {promptText}
      </div>

      {/* Footer Info inside Viewer */}
      <div className="p-3 px-5 border-t border-theme bg-surface-elevated flex items-center justify-between text-[11px] text-theme-muted">
        <span>Format: Structured Markdown Prompt</span>
        <span>Total Characters: {promptText.length}</span>
      </div>
    </div>
  );
};
