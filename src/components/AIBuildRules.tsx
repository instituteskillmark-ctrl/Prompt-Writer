import React from 'react';
import { Bot, Check, FileCode2 } from 'lucide-react';
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
    <div className="bg-surface border border-theme rounded-2xl p-5 sm:p-6 shadow-card hover:shadow-card-hover transition-all duration-300">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6 pb-3 border-b border-theme">
        <div className="w-7 h-7 rounded-lg bg-brand-500/10 text-brand-500 flex items-center justify-center font-bold text-xs">
          08
        </div>
        <div>
          <h2 className="text-xs font-bold tracking-widest text-theme-primary uppercase">
            AI BEHAVIOR & BUILD RULES
          </h2>
          <p className="text-[11px] text-theme-muted">
            Enforce architectural constraints, code style, and custom instructions for the AI engine.
          </p>
        </div>
      </div>

      <div className="space-y-5">
        {/* Rule Toggles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {buildRules.rules.map((rule) => {
            const isChecked = rule.enabled;
            return (
              <div
                key={rule.id}
                onClick={() => toggleRule(rule.id)}
                className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between space-x-2 ${
                  isChecked
                    ? 'bg-brand-500/10 border-brand-500/50 text-theme-primary'
                    : 'bg-surface-elevated border-theme text-theme-secondary hover:text-theme-primary'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Bot className={`w-3.5 h-3.5 shrink-0 ${isChecked ? 'text-brand-500' : 'text-theme-muted'}`} />
                  <span className="text-xs font-semibold leading-tight">{rule.label}</span>
                </div>

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
          <label className="flex items-center space-x-1.5 text-xs font-bold text-theme-primary mb-2">
            <FileCode2 className="w-3.5 h-3.5 text-brand-500" />
            <span>Custom AI Instructions & Implementation Constraints</span>
          </label>
          <textarea
            value={buildRules.customInstructions}
            onChange={(e) => handleCustomInstructionsChange(e.target.value)}
            placeholder="Add specific instructions for the AI tool (e.g., 'Use Lucide React icons exclusively', 'Implement sticky header with blur backdrop', 'Ensure all buttons have smooth focus rings')..."
            rows={3}
            className="w-full p-3.5 rounded-xl border border-theme bg-surface-elevated text-theme-primary placeholder-theme-muted text-xs focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all resize-y"
          />
        </div>
      </div>
    </div>
  );
};
