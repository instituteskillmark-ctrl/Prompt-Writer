import React from 'react';
import { Check, FileCode2, Sliders } from 'lucide-react';
import type { AIBuildRulesState } from '../types/brand';

interface AIBuildRulesProps {
  buildRules: AIBuildRulesState;
  onChange: (buildRules: AIBuildRulesState) => void;
}

export const DEFAULT_AI_RULES = [
  { id: 'rule-generic', label: 'Avoid generic layouts & templated sections', enabled: true },
  { id: 'rule-gradients', label: 'Avoid unnecessary heavy gradients', enabled: true },
  { id: 'rule-animations', label: 'Avoid excessive disruptive animations', enabled: true },
  { id: 'rule-invent', label: 'Do not invent unrequested functionality', enabled: true },
  { id: 'rule-fake-data', label: 'Do not use fake data unless explicitly requested', enabled: true },
  { id: 'rule-spacing', label: 'Maintain consistent spacing system & typography', enabled: true },
  { id: 'rule-responsive', label: 'Prioritize mobile-first responsive behavior', enabled: true },
  { id: 'rule-direction', label: 'Follow selected visual direction strictly', enabled: true },
  { id: 'rule-decisions', label: 'Make reasonable design decisions when details are missing', enabled: true },
  { id: 'rule-reusable', label: 'Keep components reusable, clean & maintainable', enabled: true }
];

export const AIBuildRules: React.FC<AIBuildRulesProps> = ({ buildRules, onChange }) => {
  const toggleRule = (id: string) => {
    const updated = buildRules.rules.map((r) =>
      r.id === id ? { ...r, enabled: !r.enabled } : r
    );
    onChange({ ...buildRules, rules: updated });
  };

  const handleCustomInstructionsChange = (val: string) => {
    onChange({ ...buildRules, customInstructions: val });
  };

  return (
    <div className="bg-surface border border-theme rounded-2xl p-5 sm:p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-5 pb-3 border-b border-theme">
        <div className="w-7 h-7 rounded-lg bg-brand-500/10 text-brand-500 flex items-center justify-center font-bold text-xs">
          <Sliders className="w-4 h-4 text-brand-500" />
        </div>
        <div>
          <h2 className="text-xs font-bold tracking-wider text-theme-primary uppercase">
            BUILD RULES & CONSTRAINTS
          </h2>
          <p className="text-[11px] text-theme-muted">
            Enforce architectural constraints, code style, and custom instructions.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Rule Toggles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {buildRules.rules.map((rule) => {
            const isChecked = rule.enabled;
            return (
              <div
                key={rule.id}
                onClick={() => toggleRule(rule.id)}
                className={`p-2.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between space-x-2 ${
                  isChecked
                    ? 'bg-brand-500/10 border-brand-500/40 text-theme-primary'
                    : 'bg-surface-elevated border-theme text-theme-secondary hover:text-theme-primary'
                }`}
              >
                <span className="text-xs font-medium leading-tight">{rule.label}</span>

                <div className={`w-4 h-4 rounded flex items-center justify-center border shrink-0 ${
                  isChecked ? 'bg-brand-500 border-brand-500 text-white' : 'border-theme bg-surface'
                }`}>
                  {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Instructions Textarea */}
        <div className="pt-2 border-t border-theme">
          <label className="flex items-center space-x-1.5 text-xs font-semibold text-theme-primary mb-1.5">
            <FileCode2 className="w-3.5 h-3.5 text-brand-500" />
            <span>Custom Instructions & Constraints</span>
          </label>
          <textarea
            value={buildRules.customInstructions}
            onChange={(e) => handleCustomInstructionsChange(e.target.value)}
            placeholder="Add specific instructions (e.g. 'Use Lucide React icons', 'Implement sticky navigation', 'Ensure smooth focus states')..."
            rows={3}
            className="w-full p-3 rounded-xl border border-theme bg-surface-elevated text-theme-primary placeholder-theme-muted text-xs focus:outline-none focus:border-brand-500 transition-all resize-y"
          />
        </div>
      </div>
    </div>
  );
};
