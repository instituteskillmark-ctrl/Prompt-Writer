import React from 'react';
import { Sparkles, ArrowLeft } from 'lucide-react';

interface EmptyResultStateProps {
  onReturnToForm: () => void;
}

export const EmptyResultState: React.FC<EmptyResultStateProps> = ({ onReturnToForm }) => {
  return (
    <div className="max-w-2xl mx-auto py-16 text-center space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-brand-500/10 text-brand-500 flex items-center justify-center mx-auto shadow-teal-glow">
        <Sparkles className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <h2 className="text-xl sm:text-2xl font-extrabold text-theme-primary tracking-tight">
          Your website prompt will appear here.
        </h2>
        <p className="text-xs sm:text-sm text-theme-secondary max-w-md mx-auto leading-relaxed">
          Start with your website idea and configure your creative direction in the generator workspace.
        </p>
      </div>

      <button
        onClick={onReturnToForm}
        type="button"
        className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-teal-glow transition-all active:scale-95"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Generator Form</span>
      </button>
    </div>
  );
};
