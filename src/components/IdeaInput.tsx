import React from 'react';
import { Lightbulb, RotateCcw, AlertCircle, Globe, Sparkles } from 'lucide-react';
import type { OutputLanguage } from '../types/generator';

interface IdeaInputProps {
  value: string;
  onChange: (val: string) => void;
  outputLanguage: OutputLanguage | string;
  onLanguageChange: (lang: OutputLanguage | string) => void;
  onOpenIdeasModal: () => void;
  validationError?: string | null;
}

const MAX_CHARS = 2000;

export const LANGUAGE_OPTIONS: { label: string; value: string }[] = [
  { label: 'English (Default)', value: 'English' },
  { label: 'Auto (Infer Language)', value: 'Auto' },
  { label: 'Urdu (اردو)', value: 'Urdu' },
  { label: 'Hindi (हिंदी)', value: 'Hindi' },
  { label: 'Arabic (العربية)', value: 'Arabic' },
  { label: 'Spanish (Español)', value: 'Spanish' },
  { label: 'French (Français)', value: 'French' },
  { label: 'German (Deutsch)', value: 'German' },
  { label: 'Portuguese (Português)', value: 'Portuguese' },
  { label: 'Chinese (中文)', value: 'Chinese' },
  { label: 'Japanese (日本語)', value: 'Japanese' },
  { label: 'Korean (한국어)', value: 'Korean' }
];

export const EXAMPLE_IDEAS = [
  {
    title: 'Creative Agency',
    text: 'A premium website for an AI creative agency that works with startups and modern brands.'
  },
  {
    title: 'Developer Portfolio',
    text: 'A dark editorial portfolio for an AI creative developer showcasing selected projects and services.'
  },
  {
    title: 'Restaurant',
    text: 'A modern restaurant website with online reservations, menu, location, testimonials, and strong food photography.'
  },
  {
    title: 'SaaS Platform',
    text: 'A conversion-focused SaaS landing page with pricing, features, integrations, testimonials, FAQ, and a free trial CTA.'
  }
];

export const IdeaInput: React.FC<IdeaInputProps> = ({
  value,
  onChange,
  outputLanguage,
  onLanguageChange,
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
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-theme">
        <div className="flex items-center space-x-3">
          <div className="w-7 h-7 rounded-lg bg-brand-500/10 text-brand-500 flex items-center justify-center font-bold text-xs">
            01
          </div>
          <div>
            <h2 className="text-xs font-bold tracking-widest text-theme-primary uppercase">
              YOUR WEBSITE IDEA
            </h2>
            <p className="text-[11px] text-theme-secondary font-medium mt-0.5">
              Have an idea? Describe it in your own words.
            </p>
          </div>
        </div>

        {/* Header Quick Actions */}
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
            <span>More Examples</span>
          </button>
        </div>
      </div>

      {/* Main Layout: Textarea + Controls */}
      <div className="space-y-4">
        {/* Main Idea Textarea */}
        <div className="relative">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value.slice(0, MAX_CHARS))}
            placeholder={`Tell us what you want to build.\nExample: “I want a premium dark website for a creative AI agency with a portfolio, services, case studies, and a contact section.”`}
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

          {/* Character Counter & Tip */}
          <div className="mt-2 flex items-center justify-between text-xs text-theme-muted">
            <div className="flex items-center space-x-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-500" />
              <span>Simple description is all you need</span>
            </div>

            <div className={`flex items-center space-x-1 font-mono text-[11px] ${isNearLimit ? 'text-amber-500 font-bold' : 'text-theme-muted'}`}>
              {isNearLimit && <AlertCircle className="w-3 h-3 text-amber-500" />}
              <span>{charCount}</span>
              <span>/</span>
              <span>{MAX_CHARS}</span>
            </div>
          </div>
        </div>

        {/* Output Language & Quick Idea Templates Grid */}
        <div className="pt-3 border-t border-theme grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Language Selector Column */}
          <div className="md:col-span-1 bg-surface-elevated border border-theme p-3 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-extrabold tracking-wider uppercase text-theme-secondary flex items-center space-x-1.5">
                <Globe className="w-3.5 h-3.5 text-brand-500" />
                <span>OUTPUT LANGUAGE</span>
              </label>
              <span className="text-[10px] font-bold text-brand-500 px-1.5 py-0.5 rounded bg-brand-500/10 border border-brand-500/20">
                {outputLanguage}
              </span>
            </div>
            
            <select
              value={outputLanguage}
              onChange={(e) => onLanguageChange(e.target.value as OutputLanguage)}
              className="w-full px-3 py-2 bg-surface border border-theme rounded-lg text-xs font-semibold text-theme-primary focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/30 transition-colors cursor-pointer"
            >
              {LANGUAGE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            <p className="text-[10px] text-theme-muted leading-tight">
              The AI will generate the prompt in your selected language.
            </p>
          </div>

          {/* Quick Example Ideas Grid (Column 2 & 3) */}
          <div className="md:col-span-2 space-y-2">
            <div className="flex items-center space-x-1.5 text-[11px] font-bold uppercase text-theme-secondary">
              <Sparkles className="w-3.5 h-3.5 text-brand-500" />
              <span>TRY AN EXAMPLE IDEA</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {EXAMPLE_IDEAS.map((ex) => (
                <button
                  key={ex.title}
                  onClick={() => onChange(ex.text)}
                  type="button"
                  className="p-2.5 rounded-xl bg-surface-elevated hover:bg-brand-500/10 border border-theme hover:border-brand-500/40 text-left transition-all group flex flex-col justify-between"
                >
                  <span className="text-xs font-bold text-theme-primary group-hover:text-brand-500 transition-colors block">
                    {ex.title}
                  </span>
                  <span className="text-[11px] text-theme-secondary line-clamp-2 mt-0.5 leading-snug">
                    "{ex.text}"
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
