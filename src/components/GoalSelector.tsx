import React from 'react';
import { Target } from 'lucide-react';
import type { WebsiteGoal } from '../types/generator';

interface GoalSelectorProps {
  value: WebsiteGoal;
  onChange: (goal: WebsiteGoal) => void;
}

export const WEBSITE_GOALS: WebsiteGoal[] = [
  'Build Brand Presence',
  'Generate Leads',
  'Sell Products',
  'Showcase Work',
  'Launch a SaaS',
  'Increase Conversions',
  'Provide Information',
  'Build Community',
  'Other'
];

export const GoalSelector: React.FC<GoalSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="bg-surface border border-theme rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all duration-300">
      <div className="flex items-center space-x-2.5 mb-4 pb-3 border-b border-theme">
        <Target className="w-4 h-4 text-brand-500" />
        <div>
          <h3 className="text-xs font-extrabold tracking-widest text-theme-primary uppercase">
            PRIMARY WEBSITE GOAL
          </h3>
          <p className="text-[11px] text-theme-muted">Select the primary business or strategic objective.</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {WEBSITE_GOALS.map((goal) => {
          const isSelected = value === goal;
          return (
            <button
              key={goal}
              onClick={() => onChange(goal)}
              type="button"
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 border ${
                isSelected
                  ? 'bg-brand-500/10 text-brand-500 dark:text-brand-400 border-brand-500 font-semibold shadow-sm'
                  : 'bg-surface-elevated text-theme-secondary hover:text-theme-primary border-theme hover:border-theme-hover'
              }`}
            >
              {goal}
            </button>
          );
        })}
      </div>
    </div>
  );
};
