import React from 'react';
import { RotateCcw, AlertCircle, Globe } from 'lucide-react';
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
    title: 'Creative AI Studio',
    text: 'Build a premium website for a creative AI studio that designs software and brand identity for modern startups.'
  },
  {
    title: 'Developer Portfolio',
    text: 'A minimal editorial portfolio for a creative full-stack developer showcasing selected projects, services, and stack.'
  },
  {
    title: 'Coffee Brand & Menu',
    text: 'A modern coffee brand website with online ordering, seasonal drinks menu, cafe locations, and customer reviews.'
  },
  {
    title: 'SaaS Product Landing',
    text: 'A conversion-focused SaaS landing page with key features, interactive pricing calculator, customer testimonials, and a free trial CTA.'
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
    <div className="space-y-4">
      {/* Hero Textarea Workspace Container */}
      <div className={`bg-surface border rounded-2xl p-5 sm:p-6 shadow-sm transition-all duration-200 ${
        validationError ? 'border-amber-500/80 ring-2 ring-amber-500/20' : 'border-theme focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/20'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-theme">
          <div>
            <h2 className="text-sm sm:text-base font-bold text-theme-primary tracking-tight">
              Describe your website idea
            </h2>
            <p className="text-xs text-theme-secondary font-normal mt-0.5">
              Start with your core concept. Add detail only when you need it.
            </p>
          </div>

          {value && (
            <button
              onClick={handleClear}
              type="button"
              className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg border border-theme bg-surface hover:bg-surface-elevated text-[11px] font-medium text-theme-muted hover:text-theme-primary transition-colors"
              title="Clear text"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear</span>
            </button>
          )}
        </div>

        {/* Textarea */}
        <div className="relative">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value.slice(0, MAX_CHARS))}
            placeholder="Describe your website idea in your own words..."
            rows={5}
            className="w-full p-3.5 rounded-xl border-0 bg-surface-elevated text-theme-primary placeholder-theme-muted text-sm font-normal focus:outline-none transition-all resize-y min-h-[140px] leading-relaxed"
          />

          {/* Validation Warning */}
          {validationError && (
            <div className="mt-2.5 flex items-center space-x-2 text-xs font-semibold text-amber-500 bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20 animate-fadeIn">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{validationError}</span>
            </div>
          )}

          {/* Character counter */}
          <div className="mt-2 flex items-center justify-between text-xs text-theme-muted">
            <span className="text-[11px]">No technical details required.</span>
            <span className={`font-mono text-[11px] ${isNearLimit ? 'text-amber-500 font-bold' : ''}`}>
              {charCount} / {MAX_CHARS}
            </span>
          </div>
        </div>
      </div>

      {/* Language Selector & Examples Row (Clean Open Layout, No Card Inception) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Language Selector */}
        <div className="md:col-span-1 bg-surface border border-theme p-3.5 rounded-xl space-y-1">
          <label className="text-[11px] font-bold uppercase tracking-wider text-theme-secondary flex items-center space-x-1.5">
            <Globe className="w-3.5 h-3.5 text-brand-500" />
            <span>Output Language</span>
          </label>
          <select
            value={outputLanguage}
            onChange={(e) => onLanguageChange(e.target.value as OutputLanguage)}
            className="w-full px-3 py-2 bg-surface-elevated border border-theme rounded-lg text-xs font-medium text-theme-primary focus:outline-none focus:border-brand-500 cursor-pointer"
          >
            {LANGUAGE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Examples Pills */}
        <div className="md:col-span-2 bg-surface border border-theme p-3.5 rounded-xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-theme-secondary">
              Try an example
            </span>
            <span className="text-[10px] text-theme-muted">Click to load idea</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {EXAMPLE_IDEAS.map((ex) => (
              <button
                key={ex.title}
                onClick={() => onChange(ex.text)}
                type="button"
                className="p-2 rounded-lg bg-surface-elevated hover:bg-brand-500/10 border border-theme hover:border-brand-500/30 text-left transition-all group"
              >
                <span className="text-[11px] font-bold text-theme-primary group-hover:text-brand-500 block truncate">
                  {ex.title}
                </span>
                <span className="text-[10px] text-brand-500 font-medium mt-0.5 block opacity-0 group-hover:opacity-100 transition-opacity">
                  Use this idea →
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
