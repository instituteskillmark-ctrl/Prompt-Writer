import React from 'react';
import { Sparkles, ArrowUpRight } from 'lucide-react';

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
    <div className="pt-2 pb-6 flex flex-col items-center justify-center">
      <button
        onClick={handleClick}
        disabled={isDisabled}
        type="button"
        className={`group relative w-full sm:w-auto min-w-[280px] sm:min-w-[340px] px-8 py-4 rounded-2xl text-sm sm:text-base font-extrabold tracking-wide text-white transition-all duration-300 transform active:scale-[0.99] flex items-center justify-center space-x-3 shadow-md hover:shadow-lg cursor-pointer ${
          isDisabled
            ? 'opacity-50 cursor-not-allowed bg-slate-500'
            : 'bg-teal-600 hover:bg-teal-700 active:scale-98 border border-teal-500/30'
        }`}
      >
        {/* Subtle Shine Reflection Overlay */}
        <span 
          className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" 
          aria-hidden="true" 
        />

        {/* Icon & Label */}
        <Sparkles className="w-5 h-5 text-teal-100 group-hover:rotate-12 transition-transform duration-300" />
        <span className="uppercase tracking-wider drop-shadow-sm">✦ GENERATE WEBSITE PROMPT</span>
        <ArrowUpRight className="w-4 h-4 text-teal-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
      </button>

      {/* Helper text explaining frontend stage */}
      <span className="mt-3 text-[11px] font-semibold text-theme-muted tracking-wide flex items-center space-x-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
        <span>Instant AI Generation • Powered by Gemini AI</span>
      </span>
    </div>
  );
};
