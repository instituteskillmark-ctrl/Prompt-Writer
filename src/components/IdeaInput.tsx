import React from 'react';
import { Lightbulb, RotateCcw, AlertCircle } from 'lucide-react';

interface IdeaInputProps {
  value: string;
  onChange: (val: string) => void;
  onOpenIdeasModal: () => void;
  validationError?: string | null;
}

const MAX_CHARS = 2000;

export const IdeaInput: React.FC<IdeaInputProps> = ({
  value,
  onChange,
  onOpenIdeasModal,
  validationError
}) => {
  const handleClear = () => {
    onChange('');
  };

  const charCount = value.length;
  const isNearLimit = charCount > MAX_CHARS * 0.9;

  return (
    <div className={`bg-surface border rounded-2xl p-5 sm:p-6 shadow-card hover:shadow-card-hover transition-all duration-300 ${
      validationError ? 'border-amber-500/80 ring-2 ring-amber-500/20' : 'border-theme'
    }`}>
      {/* Card Top Label & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-theme">
        <div className="flex items-center space-x-3">
          <div className="w-7 h-7 rounded-lg bg-brand-500/10 text-brand-500 flex items-center justify-center font-bold text-xs">
            01
          </div>
          <div>
            <h2 className="text-xs font-bold tracking-widest text-theme-primary uppercase">
              YOUR WEBSITE IDEA
            </h2>
            <p className="text-[11px] text-theme-muted">
              Specify your vision, core features, or visual aesthetic goals.
            </p>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center space-x-2">
          {value && (
            <button
              onClick={handleClear}
              type="button"
              className="inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-lg border border-theme bg-surface hover:bg-surface-elevated text-[11px] font-medium text-theme-muted hover:text-theme-primary transition-colors"
              title="Clear input"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear</span>
            </button>
          )}

          <button
            onClick={onOpenIdeasModal}
            type="button"
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl badge-teal text-xs font-semibold hover:opacity-90 transition-opacity"
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Example Ideas</span>
          </button>
        </div>
      </div>

      {/* Main Idea Textarea */}
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value.slice(0, MAX_CHARS))}
          placeholder="Describe the website you want to build... (e.g. A high-converting SaaS landing page for an AI developer platform with live dark mode code previews, pricing calculator, and interactive features menu)"
          rows={5}
          className={`w-full p-4 rounded-xl border bg-surface-elevated text-theme-primary placeholder-theme-muted text-sm font-normal focus:outline-none transition-all duration-200 resize-y min-h-[140px] leading-relaxed ${
            validationError
              ? 'border-amber-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20'
              : 'border-theme focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20'
          }`}
        />

        {/* Validation Warning Alert */}
        {validationError && (
          <div className="mt-2.5 flex items-center space-x-2 text-xs font-semibold text-amber-500 bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20 animate-fadeIn">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Bottom Bar inside Card 01: Character Counter & Helper */}
        <div className="mt-2.5 flex items-center justify-between text-xs text-theme-muted">
          <div className="flex items-center space-x-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-500" />
            <span>Be specific for best prompt structure</span>
          </div>

          <div className={`flex items-center space-x-1 font-mono text-[11px] ${isNearLimit ? 'text-amber-500 font-bold' : 'text-theme-muted'}`}>
            {isNearLimit && <AlertCircle className="w-3 h-3 text-amber-500" />}
            <span>{charCount}</span>
            <span>/</span>
            <span>{MAX_CHARS}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
