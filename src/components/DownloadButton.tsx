import React from 'react';
import { Download } from 'lucide-react';

interface DownloadButtonProps {
  content: string;
  filename?: string;
  className?: string;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({
  content,
  filename = 'website-prompt.txt',
  className = ''
}) => {
  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleDownload}
      type="button"
      className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-theme bg-surface hover:bg-surface-elevated text-xs font-semibold text-theme-primary transition-all active:scale-95 ${className}`}
      title="Download prompt as .txt file"
    >
      <Download className="w-3.5 h-3.5 text-brand-500" />
      <span>Download .txt</span>
    </button>
  );
};
