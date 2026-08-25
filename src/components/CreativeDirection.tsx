import React from 'react';
import { SunMoon, Type, Layout, Activity } from 'lucide-react';

export interface CreativeDirectionState {
  colorTheme: string;
  typography: string;
  layout: string;
  animation: string;
}

interface CreativeDirectionProps {
  direction: CreativeDirectionState;
  onChange: (direction: CreativeDirectionState) => void;
}

export const COLOR_THEMES = ['Dark', 'Light', 'Custom'];
export const TYPOGRAPHY_OPTIONS = ['Modern', 'Editorial', 'Minimal', 'Bold', 'Experimental'];
export const LAYOUT_OPTIONS = ['Minimal', 'Grid', 'Editorial', 'Asymmetric'];
export const ANIMATION_OPTIONS = ['Subtle', 'Smooth', 'Interactive', 'Cinematic'];

export const CreativeDirection: React.FC<CreativeDirectionProps> = ({ direction, onChange }) => {
  const updateField = (field: keyof CreativeDirectionState, value: string) => {
    onChange({ ...direction, [field]: value });
  };

  return (
    <div className="bg-surface border border-theme rounded-2xl p-5 sm:p-6 shadow-card hover:shadow-card-hover transition-all duration-300">
      {/* Card Header */}
      <div className="flex items-center space-x-3 mb-6 pb-3 border-b border-theme">
        <div className="w-7 h-7 rounded-lg bg-brand-500/10 text-brand-500 flex items-center justify-center font-bold text-xs">
          03
        </div>
        <div>
          <h2 className="text-xs font-bold tracking-widest text-theme-primary uppercase">
            CREATIVE DIRECTION
          </h2>
          <p className="text-[11px] text-theme-muted">
            Fine-tune visual mood, color scheme, grid composition, and animation dynamics.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* 1. Color Theme */}
        <div>
          <label className="flex items-center space-x-2 text-xs font-bold text-theme-primary mb-3">
            <SunMoon className="w-3.5 h-3.5 text-brand-500" />
            <span>Color Theme</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {COLOR_THEMES.map((themeOption) => {
              const isSelected = direction.colorTheme === themeOption;
              return (
                <button
                  key={themeOption}
                  type="button"
                  onClick={() => updateField('colorTheme', themeOption)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 border ${
                    isSelected
                      ? 'bg-brand-500/10 text-brand-500 dark:text-brand-400 border-brand-500 font-semibold shadow-sm'
                      : 'bg-surface-elevated text-theme-secondary hover:text-theme-primary border-theme hover:border-theme-hover'
                  }`}
                >
                  {themeOption}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Typography */}
        <div>
          <label className="flex items-center space-x-2 text-xs font-bold text-theme-primary mb-3">
            <Type className="w-3.5 h-3.5 text-brand-500" />
            <span>Typography</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {TYPOGRAPHY_OPTIONS.map((typo) => {
              const isSelected = direction.typography === typo;
              return (
                <button
                  key={typo}
                  type="button"
                  onClick={() => updateField('typography', typo)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 border ${
                    isSelected
                      ? 'bg-brand-500/10 text-brand-500 dark:text-brand-400 border-brand-500 font-semibold shadow-sm'
                      : 'bg-surface-elevated text-theme-secondary hover:text-theme-primary border-theme hover:border-theme-hover'
                  }`}
                >
                  {typo}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Layout */}
        <div>
          <label className="flex items-center space-x-2 text-xs font-bold text-theme-primary mb-3">
            <Layout className="w-3.5 h-3.5 text-brand-500" />
            <span>Layout Structure</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {LAYOUT_OPTIONS.map((lay) => {
              const isSelected = direction.layout === lay;
              return (
                <button
                  key={lay}
                  type="button"
                  onClick={() => updateField('layout', lay)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 border ${
                    isSelected
                      ? 'bg-brand-500/10 text-brand-500 dark:text-brand-400 border-brand-500 font-semibold shadow-sm'
                      : 'bg-surface-elevated text-theme-secondary hover:text-theme-primary border-theme hover:border-theme-hover'
                  }`}
                >
                  {lay}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Animation */}
        <div>
          <label className="flex items-center space-x-2 text-xs font-bold text-theme-primary mb-3">
            <Activity className="w-3.5 h-3.5 text-brand-500" />
            <span>Animation Level</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {ANIMATION_OPTIONS.map((anim) => {
              const isSelected = direction.animation === anim;
              return (
                <button
                  key={anim}
                  type="button"
                  onClick={() => updateField('animation', anim)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 border ${
                    isSelected
                      ? 'bg-brand-500/10 text-brand-500 dark:text-brand-400 border-brand-500 font-semibold shadow-sm'
                      : 'bg-surface-elevated text-theme-secondary hover:text-theme-primary border-theme hover:border-theme-hover'
                  }`}
                >
                  {anim}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
