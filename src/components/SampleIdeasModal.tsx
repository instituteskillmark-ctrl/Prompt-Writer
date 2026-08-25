import React from 'react';
import { X, Sparkles, ArrowRight, Check } from 'lucide-react';

interface SampleIdeasModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectIdea: (ideaText: string) => void;
}

export const SAMPLE_IDEAS = [
  {
    title: 'AI SaaS Analytics Platform',
    category: 'SaaS / Tech',
    text: 'A high-converting SaaS landing page for an AI-powered data analytics platform called "PulseMetrics". Features a dark mode UI with interactive live dashboard previews, pricing calculator, integration logo cloud, customer ROI testimonials, and a prominent 14-day free trial CTA.'
  },
  {
    title: 'Architectural Design Studio',
    category: 'Portfolio / Agency',
    text: 'A minimalist luxury architecture and interior design portfolio for "Vanguard Atelier". Features full-screen editorial image showcases, smooth asymmetric scroll layouts, project detail modal, client inquiry form, and subtle minimalist typography with monochrome visual aesthetics.'
  },
  {
    title: 'Modern Craft Coffee & Eatery',
    category: 'Restaurant',
    text: 'An inviting, modern organic coffee shop and artisanal bakery website for "Solstice Cafe". Features online table reservation widget, interactive seasonal food & beverage menu with filter tabs, store locator with opening hours, and Instagram visual feed section.'
  },
  {
    title: 'B2B Developer Tool Landing Page',
    category: 'Developer Tools',
    text: 'A developer-first landing page for an open-source API monitoring tool called "APISentry". Includes dark theme aesthetic, code snippet toggle with copy button, CLI installation commands, benchmark performance graphs, and GitHub star counter badge.'
  },
  {
    title: 'Sustainable Fashion E-Commerce Store',
    category: 'E-Commerce',
    text: 'A clean, editorial e-commerce web storefront for "Aura Apparel", a sustainable streetwear brand. Features product grid with hover image toggles, size selector, instant drawer cart, eco-impact dashboard per item, and customer reviews carousel.'
  },
  {
    title: 'Web3 & AI Venture Studio',
    category: 'Agency / Futuristic',
    text: 'A sleek futuristic landing page for "Nexus Labs", an AI and decentralized tech incubator. Features interactive 3D particle hero background, portfolio startup cards with live stats, team showcase, and investor pitch deck request form.'
  }
];

export const SampleIdeasModal: React.FC<SampleIdeasModalProps> = ({
  isOpen,
  onClose,
  onSelectIdea
}) => {
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);

  if (!isOpen) return null;

  const handleSelect = (text: string, index: number) => {
    onSelectIdea(text);
    setCopiedIndex(index);
    setTimeout(() => {
      setCopiedIndex(null);
      onClose();
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-surface border border-theme rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[85vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-theme mb-4">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-brand-500/10 text-brand-500">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-theme-primary">Select an Example Website Idea</h3>
              <p className="text-xs text-theme-secondary">Click any prompt preset below to insert it into Card 01.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-1.5 rounded-lg text-theme-muted hover:text-theme-primary hover:bg-surface-elevated transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Ideas Grid */}
        <div className="overflow-y-auto space-y-3.5 pr-1 flex-1">
          {SAMPLE_IDEAS.map((idea, index) => {
            const isSelected = copiedIndex === index;
            return (
              <div
                key={index}
                onClick={() => handleSelect(idea.text, index)}
                className="p-4 rounded-xl border border-theme bg-surface-elevated hover:border-brand-500/50 hover:shadow-md cursor-pointer transition-all duration-200 group relative"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-theme-primary group-hover:text-brand-500 transition-colors">
                    {idea.title}
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md badge-teal">
                    {idea.category}
                  </span>
                </div>
                <p className="text-xs text-theme-secondary leading-relaxed line-clamp-2">
                  {idea.text}
                </p>
                <div className="mt-2.5 flex items-center justify-end text-[11px] font-semibold text-brand-500 space-x-1 opacity-90 group-hover:opacity-100">
                  <span>{isSelected ? 'Inserted into textarea!' : 'Use this idea'}</span>
                  {isSelected ? (
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-theme mt-4 flex items-center justify-end">
          <button
            onClick={onClose}
            type="button"
            className="px-4 py-2 rounded-xl text-xs font-medium text-theme-secondary hover:text-theme-primary hover:bg-surface-elevated transition-colors"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
