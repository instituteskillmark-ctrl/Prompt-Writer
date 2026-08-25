import React from 'react';
import { RotateCcw, AlertCircle, Globe, Sparkles } from 'lucide-react';
import type { OutputLanguage } from '../types/generator';

interface IdeaInputProps {
  value: string;
  onChange: (val: string) => void;
  outputLanguage: OutputLanguage | string;
  onLanguageChange: (lang: OutputLanguage | string) => void;
  onOpenIdeasModal?: () => void;
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
      {/* Hero Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-theme">
        <div>
          <h2 className="text-sm sm:text-base font-extrabold tracking-tight text-theme-primary uppercase flex items-center space-x-2">
            <span>WHAT DO YOU WANT TO BUILD?</span>
          </h2>
          <p className="text-xs text-theme-secondary font-medium mt-1">
            Describe your website idea in your own words. No technical knowledge required.
          </p>
        </div>

        {value && (
          <button
            onClick={handleClear}
            type="button"
            className="self-start sm:self-auto inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-lg border border-theme bg-surface hover:bg-surface-elevated text-[11px] font-medium text-theme-muted hover:text-theme-primary transition-colors"
            title="Clear input"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear</span>
          </button>
        )}
      </div>

      {/* Main Layout */}
      <div className="space-y-4">
        {/* Main Idea Textarea */}
        <div className="relative">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value.slice(0, MAX_CHARS))}
            placeholder={`Example: “I want a premium website for a modern coffee brand with online ordering, a menu, customer reviews and a strong visual identity.”`}
            rows={5}
            className={`w-full p-4 rounded-xl border bg-surface-elevated text-theme-primary placeholder-theme-muted text-sm font-normal focus:outline-none transition-all duration-200 resize-y min-h-[150px] leading-relaxed ${
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

          {/* Character Counter */}
          <div className="mt-2 flex items-center justify-between text-xs text-theme-muted">
            <div className="flex items-center space-x-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-500" />
              <span>Tell us what you want. We'll structure the rest.</span>
            </div>

            <div className={`flex items-center space-x-1 font-mono text-[11px] ${isNearLimit ? 'text-amber-500 font-bold' : 'text-theme-muted'}`}>
              {isNearLimit && <AlertCircle className="w-3 h-3 text-amber-500" />}
              <span>{charCount}</span>
              <span>/</span>
              <span>{MAX_CHARS}</span>
            </div>
          </div>
        </div>

        {/* Output Language & Try An Example Row */}
        <div className="pt-3 border-t border-theme grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Language Selector */}
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
          </div>

          {/* Try An Example Grid */}
          <div className="md:col-span-2 space-y-2">
            <div className="flex items-center space-x-1.5 text-[11px] font-bold uppercase text-theme-secondary">
              <Sparkles className="w-3.5 h-3.5 text-brand-500" />
              <span>TRY AN EXAMPLE</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {EXAMPLE_IDEAS.map((ex) => (
                <button
                  key={ex.title}
                  onClick={() => onChange(ex.text)}
                  type="button"
                  className="p-2 rounded-lg bg-surface-elevated hover:bg-brand-500/10 border border-theme hover:border-brand-500/40 text-left transition-all group"
                >
                  <span className="text-[11px] font-bold text-theme-primary group-hover:text-brand-500 transition-colors block truncate">
                    {ex.title}
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
