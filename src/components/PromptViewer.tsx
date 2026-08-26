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
    <div className="bg-surface border border-theme rounded-2xl shadow-sm flex flex-col h-full overflow-hidden transition-colors">
      {/* Header Container */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 border-b border-theme bg-surface-elevated">
        <div>
          <h2 className="text-xs font-bold tracking-tight text-theme-primary uppercase">
            Final Website Prompt
          </h2>
          <p className="text-[11px] text-theme-muted mt-0.5">
            Ready to copy or export for v0.dev, Bolt.new, Cursor, Claude, or ChatGPT.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2 shrink-0">
          <CopyButton textToCopy={promptText} isPrimary={true} />
          
          <button
            onClick={onEditClick}
            type="button"
            className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg border border-theme bg-surface hover:bg-surface-elevated text-xs font-medium text-theme-primary transition-all active:scale-95"
            title="Edit prompt text"
          >
            <Edit3 className="w-3.5 h-3.5 text-theme-muted" />
            <span>Edit</span>
          </button>

          <DownloadButton content={promptText} filename="website-prompt.txt" />
        </div>
      </div>

      {/* Main Prompt Text Container */}
      <div className="p-5 sm:p-6 overflow-y-auto max-h-[650px] text-xs text-theme-primary leading-relaxed whitespace-pre-wrap select-text font-mono font-normal leading-7">
        {promptText}
      </div>

      {/* Footer Info */}
      <div className="p-3 px-5 border-t border-theme bg-surface-elevated flex items-center justify-between text-[11px] text-theme-muted font-medium">
        <span>Format: Markdown Prompt</span>
        <span>{promptText.length} characters</span>
      </div>
    </div>
  );
};
