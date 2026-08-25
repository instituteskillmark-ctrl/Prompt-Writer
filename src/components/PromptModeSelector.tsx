import React from 'react';
import { Zap, Layers, Cpu, Check } from 'lucide-react';
import type { PromptMode } from '../types/generator';

interface PromptModeSelectorProps {
  value: PromptMode;
  onChange: (mode: PromptMode) => void;
}

export const PromptModeSelector: React.FC<PromptModeSelectorProps> = ({ value, onChange }) => {
  const modes: { id: PromptMode; label: string; desc: string; icon: React.ElementType }[] = [
    {
      id: 'Quick',
      label: 'Quick',
      desc: 'Concise specification for fast AI generation.',
      icon: Zap
    },
    {
      id: 'Detailed',
      label: 'Detailed',
      desc: 'Complete design, structure & functional outline.',
      icon: Layers
    },
    {
      id: 'Expert',
      label: 'Expert',
      desc: 'Master prompt with deep UX, UI, responsive & tech constraints.',
      icon: Cpu
    }
  ];

  return (
    <div className="bg-surface border border-theme rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all duration-300">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-theme">
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 rounded-lg bg-brand-500/10 text-brand-500">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-extrabold tracking-widest text-theme-primary uppercase">
              PROMPT MODE
            </h3>
            <p className="text-[11px] text-theme-muted">Select structural depth and granularity for output.</p>
          </div>
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded badge-teal">
          MODE: {value.toUpperCase()}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {modes.map((mode) => {
          const Icon = mode.icon;
          const isSelected = value === mode.id;
          return (
            <button
              key={mode.id}
              onClick={() => onChange(mode.id)}
              type="button"
              className={`p-3.5 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between relative group ${
                isSelected
                  ? 'bg-brand-500/10 border-brand-500 text-theme-primary shadow-sm'
                  : 'bg-surface-elevated border-theme hover:border-theme-hover text-theme-secondary hover:text-theme-primary'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <div className="flex items-center space-x-2">
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-brand-500' : 'text-theme-muted'}`} />
                  <span className="text-xs font-bold text-theme-primary">{mode.label}</span>
                </div>
                {isSelected && (
                  <Check className="w-3.5 h-3.5 text-brand-500 stroke-[3]" />
                )}
              </div>
              <p className="text-[11px] text-theme-muted leading-relaxed">{mode.desc}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
