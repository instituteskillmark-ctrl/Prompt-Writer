import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
  textToCopy: string;
  className?: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({ textToCopy, className = '' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for clipboard copy if permissions restricted
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

  return (
    <button
      onClick={handleCopy}
      type="button"
      className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-theme bg-surface hover:bg-surface-elevated text-xs font-semibold text-theme-primary transition-all active:scale-95 ${className}`}
      title="Copy prompt to clipboard"
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-500 stroke-[3]" />
          <span className="text-emerald-500 font-bold">Copied ✓</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5 text-brand-500" />
          <span>Copy Prompt</span>
        </>
      )}
    </button>
  );
};
