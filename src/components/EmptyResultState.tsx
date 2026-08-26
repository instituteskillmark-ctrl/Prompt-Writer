import React from 'react';
import { ArrowLeft, Layers } from 'lucide-react';

interface EmptyResultStateProps {
  onReturnToForm: () => void;
}

export const EmptyResultState: React.FC<EmptyResultStateProps> = ({ onReturnToForm }) => {
  return (
    <div className="max-w-md mx-auto py-20 text-center space-y-5">
      <div className="w-12 h-12 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center mx-auto">
        <Layers className="w-6 h-6" />
      </div>

      <div className="space-y-1.5">
        <h2 className="text-lg font-extrabold text-theme-primary tracking-tight">
          Ready when you are.
        </h2>
        <p className="text-xs text-theme-secondary max-w-sm mx-auto leading-relaxed">
          Start with a website idea and we'll structure the rest.
        </p>
      </div>

      <button
        onClick={onReturnToForm}
        type="button"
        className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Generator</span>
      </button>
    </div>
  );
};
