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
    <div className="pt-2 pb-4 flex flex-col items-center justify-center">
      <button
        onClick={handleClick}
        disabled={isDisabled}
        type="button"
        className={`group relative w-full sm:w-auto min-w-[280px] sm:min-w-[320px] px-8 py-3.5 rounded-xl text-sm font-bold tracking-wide text-white transition-all duration-200 transform active:scale-[0.99] flex items-center justify-center space-x-2.5 shadow-md hover:shadow-lg cursor-pointer ${
          isDisabled
            ? 'opacity-50 cursor-not-allowed bg-slate-500'
            : 'bg-brand-600 hover:bg-brand-500 active:scale-98 border border-brand-500/30'
        }`}
      >
        <span>Generate Website Prompt</span>
        <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform duration-200" />
      </button>

      <span className="mt-2.5 text-[11px] font-medium text-theme-muted">
        Only idea and language required. Everything else is handled automatically.
      </span>
    </div>
  );
};
