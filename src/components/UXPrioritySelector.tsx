import React from 'react';
import { Compass, FileText } from 'lucide-react';
import type { UXPriority, ContentDirection } from '../types/generator';

interface UXPrioritySelectorProps {
  uxPriority: UXPriority;
  onUXPriorityChange: (val: UXPriority) => void;
  contentDirection: ContentDirection;
  onContentDirectionChange: (val: ContentDirection) => void;
}

export const UX_PRIORITIES: UXPriority[] = [
  'Simplicity',
  'Conversion',
  'Accessibility',
  'Visual Impact',
  'Speed',
  'Storytelling'
];

export const CONTENT_DIRECTIONS: ContentDirection[] = [
  'Minimal Copy',
  'Marketing Focused',
  'Editorial',
  'Technical',
  'Storytelling',
  'Conversion Focused'
];

export const UXPrioritySelector: React.FC<UXPrioritySelectorProps> = ({
  uxPriority,
  onUXPriorityChange,
  contentDirection,
  onContentDirectionChange
}) => {
  return (
    <div className="bg-surface border border-theme rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* UX Priority */}
        <div>
          <div className="flex items-center space-x-2 mb-3 pb-2 border-b border-theme">
            <Compass className="w-4 h-4 text-brand-500" />
            <h3 className="text-xs font-extrabold tracking-widest text-theme-primary uppercase">
              UX PRIORITY
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {UX_PRIORITIES.map((item) => {
              const isSelected = uxPriority === item;
              return (
                <button
                  key={item}
                  onClick={() => onUXPriorityChange(item)}
                  type="button"
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 border ${
                    isSelected
                      ? 'bg-brand-500/10 text-brand-500 dark:text-brand-400 border-brand-500 font-semibold shadow-sm'
                      : 'bg-surface-elevated text-theme-secondary hover:text-theme-primary border-theme hover:border-theme-hover'
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Direction */}
        <div>
          <div className="flex items-center space-x-2 mb-3 pb-2 border-b border-theme">
            <FileText className="w-4 h-4 text-brand-500" />
            <h3 className="text-xs font-extrabold tracking-widest text-theme-primary uppercase">
              CONTENT DIRECTION
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {CONTENT_DIRECTIONS.map((item) => {
              const isSelected = contentDirection === item;
              return (
                <button
                  key={item}
                  onClick={() => onContentDirectionChange(item)}
                  type="button"
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 border ${
                    isSelected
                      ? 'bg-brand-500/10 text-brand-500 dark:text-brand-400 border-brand-500 font-semibold shadow-sm'
                      : 'bg-surface-elevated text-theme-secondary hover:text-theme-primary border-theme hover:border-theme-hover'
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
