import React, { useState } from 'react';
import { Save, X, Edit3 } from 'lucide-react';

interface PromptEditorProps {
  initialText: string;
  onSave: (newText: string) => void;
  onCancel: () => void;
}

export const PromptEditor: React.FC<PromptEditorProps> = ({
  initialText,
  onSave,
  onCancel
}) => {
  const [text, setText] = useState(initialText);

  return (
    <div className="bg-surface border border-brand-500/50 rounded-2xl shadow-lg flex flex-col h-full overflow-hidden animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-theme bg-surface-elevated">
        <div className="flex items-center space-x-2">
          <Edit3 className="w-4 h-4 text-brand-500" />
          <h2 className="text-xs font-extrabold tracking-widest text-theme-primary uppercase">
            EDIT PROMPT (LOCAL FRONTEND MODE)
          </h2>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={onCancel}
            type="button"
            className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl border border-theme bg-surface hover:bg-surface-elevated text-xs font-semibold text-theme-secondary transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            <span>Cancel</span>
          </button>

          <button
            onClick={() => onSave(text)}
            type="button"
            className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold shadow-teal-glow transition-all active:scale-95"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      {/* Editable Textarea */}
      <div className="p-4 flex-1">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={20}
          className="w-full h-full p-4 rounded-xl border border-theme bg-surface-elevated text-theme-primary text-xs font-mono focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all resize-y min-h-[450px]"
        />
      </div>
    </div>
  );
};
