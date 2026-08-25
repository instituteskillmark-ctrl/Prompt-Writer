import React from 'react';
import type { TechnicalStackState } from '../types/brand';

interface TechnicalStackProps {
  stack: TechnicalStackState;
  onChange: (stack: TechnicalStackState) => void;
}

export const FRAMEWORKS: TechnicalStackState['framework'][] = ['React', 'Next.js', 'Vite', 'HTML-CSS-JS'];
export const STYLINGS: TechnicalStackState['styling'][] = ['Tailwind', 'CSS', 'Custom'];
export const ARCHITECTURES: TechnicalStackState['componentArchitecture'][] = ['Atomic', 'Modular', 'Single File'];
export const ACCESSIBILITY_LEVELS: TechnicalStackState['accessibilityLevel'][] = ['WCAG 2.1 AA', 'WCAG 2.1 AAA', 'Basic'];

export const TechnicalStack: React.FC<TechnicalStackProps> = ({ stack, onChange }) => {
  const updateProp = <K extends keyof TechnicalStackState>(key: K, val: TechnicalStackState[K]) => {
    onChange({ ...stack, [key]: val });
  };

  return (
    <div className="bg-surface border border-theme rounded-2xl p-5 sm:p-6 shadow-card hover:shadow-card-hover transition-all duration-300">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6 pb-3 border-b border-theme">
        <div className="w-7 h-7 rounded-lg bg-brand-500/10 text-brand-500 flex items-center justify-center font-bold text-xs">
          07
        </div>
        <div>
          <h2 className="text-xs font-bold tracking-widest text-theme-primary uppercase">
            TECHNICAL STACK & IMPLEMENTATION
          </h2>
          <p className="text-[11px] text-theme-muted">
            Define technical framework, TypeScript, styling tokens, accessibility, and SEO.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1. Framework */}
        <div>
          <label className="block text-xs font-bold text-theme-primary mb-2">
            Target Framework
          </label>
          <div className="flex flex-wrap gap-2">
            {FRAMEWORKS.map((fw) => {
              const isSelected = stack.framework === fw;
              return (
                <button
                  key={fw}
                  onClick={() => updateProp('framework', fw)}
                  type="button"
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all border ${
                    isSelected
                      ? 'bg-brand-500/10 text-brand-500 border-brand-500 font-semibold'
                      : 'bg-surface-elevated text-theme-secondary border-theme hover:text-theme-primary'
                  }`}
                >
                  {fw}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. TypeScript Toggle */}
        <div>
          <label className="block text-xs font-bold text-theme-primary mb-2">
            TypeScript Usage
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => updateProp('useTypeScript', true)}
              type="button"
              className={`flex-1 py-1.5 rounded-xl text-xs font-medium transition-all border ${
                stack.useTypeScript
                  ? 'bg-brand-500/10 text-brand-500 border-brand-500 font-semibold'
                  : 'bg-surface-elevated text-theme-secondary border-theme'
              }`}
            >
              TypeScript (Strict)
            </button>
            <button
              onClick={() => updateProp('useTypeScript', false)}
              type="button"
              className={`flex-1 py-1.5 rounded-xl text-xs font-medium transition-all border ${
                !stack.useTypeScript
                  ? 'bg-brand-500/10 text-brand-500 border-brand-500 font-semibold'
                  : 'bg-surface-elevated text-theme-secondary border-theme'
              }`}
            >
              JavaScript (ES6+)
            </button>
          </div>
        </div>

        {/* 3. Styling Engine */}
        <div>
          <label className="block text-xs font-bold text-theme-primary mb-2">
            Styling Engine
          </label>
          <div className="flex flex-wrap gap-2">
            {STYLINGS.map((st) => {
              const isSelected = stack.styling === st;
              return (
                <button
                  key={st}
                  onClick={() => updateProp('styling', st)}
                  type="button"
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all border ${
                    isSelected
                      ? 'bg-brand-500/10 text-brand-500 border-brand-500 font-semibold'
                      : 'bg-surface-elevated text-theme-secondary border-theme hover:text-theme-primary'
                  }`}
                >
                  {st}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Component Architecture */}
        <div>
          <label className="block text-xs font-bold text-theme-primary mb-2">
            Component Architecture
          </label>
          <div className="flex flex-wrap gap-2">
            {ARCHITECTURES.map((arch) => {
              const isSelected = stack.componentArchitecture === arch;
              return (
                <button
                  key={arch}
                  onClick={() => updateProp('componentArchitecture', arch)}
                  type="button"
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all border ${
                    isSelected
                      ? 'bg-brand-500/10 text-brand-500 border-brand-500 font-semibold'
                      : 'bg-surface-elevated text-theme-secondary border-theme hover:text-theme-primary'
                  }`}
                >
                  {arch}
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. Accessibility Level */}
        <div>
          <label className="block text-xs font-bold text-theme-primary mb-2">
            Accessibility Standard
          </label>
          <div className="flex flex-wrap gap-2">
            {ACCESSIBILITY_LEVELS.map((acc) => {
              const isSelected = stack.accessibilityLevel === acc;
              return (
                <button
                  key={acc}
                  onClick={() => updateProp('accessibilityLevel', acc)}
                  type="button"
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all border ${
                    isSelected
                      ? 'bg-brand-500/10 text-brand-500 border-brand-500 font-semibold'
                      : 'bg-surface-elevated text-theme-secondary border-theme hover:text-theme-primary'
                  }`}
                >
                  {acc}
                </button>
              );
            })}
          </div>
        </div>

        {/* 6. Non-Functional Requirement Toggles */}
        <div>
          <label className="block text-xs font-bold text-theme-primary mb-2">
            Non-Functional Constraints
          </label>
          <div className="space-y-1.5 text-xs">
            <button
              onClick={() => updateProp('seoPriority', !stack.seoPriority)}
              type="button"
              className={`w-full p-2 rounded-xl border flex items-center justify-between transition-all ${
                stack.seoPriority ? 'bg-brand-500/10 border-brand-500/50 text-theme-primary' : 'bg-surface-elevated border-theme text-theme-muted'
              }`}
            >
              <span>SEO Optimization Standards</span>
              <span className="font-bold text-[10px]">{stack.seoPriority ? 'ENABLED' : 'OFF'}</span>
            </button>

            <button
              onClick={() => updateProp('performancePriority', !stack.performancePriority)}
              type="button"
              className={`w-full p-2 rounded-xl border flex items-center justify-between transition-all ${
                stack.performancePriority ? 'bg-brand-500/10 border-brand-500/50 text-theme-primary' : 'bg-surface-elevated border-theme text-theme-muted'
              }`}
            >
              <span>High Performance & Fast LCP</span>
              <span className="font-bold text-[10px]">{stack.performancePriority ? 'ENABLED' : 'OFF'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
