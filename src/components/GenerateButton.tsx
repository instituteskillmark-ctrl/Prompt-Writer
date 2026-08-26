import React from 'react';
import { ArrowRight } from 'lucide-react';

interface GenerateButtonProps {
  onGenerate?: () => void;
  isDisabled?: boolean;
}

export const GenerateButton: React.FC<GenerateButtonProps> = ({ onGenerate, isDisabled = false }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onGenerate) {
      onGenerate();
    }
  };

  return (
    <div className="pt-2 pb-2 flex flex-col items-center justify-center">
      <button
        onClick={handleClick}
        disabled={isDisabled}
        type="button"
        className={`group relative w-full sm:w-auto min-w-[280px] sm:min-w-[320px] px-7 py-3.5 rounded-xl text-sm font-bold text-white transition-all duration-150 active:scale-[0.99] flex items-center justify-center space-x-2 shadow-sm ${
          isDisabled
            ? 'opacity-50 cursor-not-allowed bg-slate-500'
            : 'bg-brand-600 hover:bg-brand-500 border border-brand-500/20'
        }`}
      >
        <span>Generate Website Prompt</span>
        <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform duration-150" />
      </button>

      <span className="mt-2 text-[11px] text-theme-muted font-medium">
        Start with the idea. Add detail only when it matters.
      </span>
    </div>
  );
};
