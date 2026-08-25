import React from 'react';
import { Zap } from 'lucide-react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
}) => {
  const iconDimensions = size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-11 h-11' : 'w-9 h-9';
  const iconSize = size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-5 h-5' : 'w-4.5 h-4.5';

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className={`${iconDimensions} rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-teal-glow text-white shrink-0`}>
        <Zap className={`${iconSize} fill-current text-white`} />
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className="text-xs font-extrabold tracking-widest text-theme-primary uppercase leading-none">
            WEBSITE
          </span>
          <span className="text-xs font-semibold tracking-widest text-brand-500 uppercase leading-tight mt-1">
            PROMPT GENERATOR
          </span>
        </div>
      )}
    </div>
  );
};
