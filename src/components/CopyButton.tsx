import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
  textToCopy: string;
  className?: string;
  isPrimary?: boolean;
}

export const CopyButton: React.FC<CopyButtonProps> = ({ 
  textToCopy, 
  className = '',
  isPrimary = false 
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = textToCopy;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const primaryStyles = 'bg-brand-600 hover:bg-brand-500 text-white font-bold border border-brand-500/20 shadow-sm';
  const secondaryStyles = 'bg-surface hover:bg-surface-elevated text-theme-primary font-semibold border border-theme';

  return (
    <button
      onClick={handleCopy}
      type="button"
      className={`inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs transition-all active:scale-95 ${
        isPrimary ? primaryStyles : secondaryStyles
      } ${className}`}
      title="Copy prompt to clipboard"
    >
      {copied ? (
        <>
          <Check className={`w-3.5 h-3.5 stroke-[3] ${isPrimary ? 'text-white' : 'text-emerald-500'}`} />
          <span className={isPrimary ? 'text-white font-bold' : 'text-emerald-500 font-bold'}>Copied ✓</span>
        </>
      ) : (
        <>
          <Copy className={`w-3.5 h-3.5 ${isPrimary ? 'text-white' : 'text-brand-500'}`} />
          <span>Copy Prompt</span>
        </>
      )}
    </button>
  );
};
