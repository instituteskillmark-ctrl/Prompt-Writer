import React from 'react';
import { Sparkles, Terminal } from 'lucide-react';

export const GeneratorHero: React.FC = () => {
  return (
    <section className="relative pt-6 pb-8 md:pt-10 md:pb-12 text-center max-w-4xl mx-auto px-4">
      {/* Background Subtle Radial Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-48 bg-brand-500/10 dark:bg-brand-500/15 blur-3xl rounded-full pointer-events-none -z-10" 
        aria-hidden="true"
      />

      {/* Pill Badge */}
      <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-800 dark:text-teal-300 text-xs font-bold mb-6 shadow-xs">
        <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
        <span>AI-OPTIMIZED PROMPT ENGINE</span>
      </div>

      {/* Main Large Heading */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 leading-[1.15] mb-5">
        TURN YOUR WEBSITE IDEA <br className="hidden sm:inline" />
        <span className="text-teal-600 dark:text-teal-400 bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-600 dark:from-teal-300 dark:via-brand-400 dark:to-emerald-300 bg-clip-text text-transparent font-extrabold inline-block">
          INTO A PRODUCTION-READY PROMPT
        </span>
      </h1>

      {/* Subtitle */}
      <p className="text-sm sm:text-base md:text-lg font-semibold text-slate-700 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
        Describe your website idea and get a detailed, AI-optimized prompt for any website builder or AI coding tool.
      </p>

      {/* Supported Tool Badges */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-6 text-[11px] font-bold text-slate-800 dark:text-slate-300">
        <span className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-surface border border-theme shadow-xs">
          <Terminal className="w-3 h-3 text-teal-600 dark:text-teal-400" />
          <span>v0.dev</span>
        </span>
        <span className="px-2.5 py-1 rounded-lg bg-surface border border-theme shadow-xs">Bolt.new</span>
        <span className="px-2.5 py-1 rounded-lg bg-surface border border-theme shadow-xs">Cursor</span>
        <span className="px-2.5 py-1 rounded-lg bg-surface border border-theme shadow-xs">Lovable</span>
        <span className="px-2.5 py-1 rounded-lg bg-surface border border-theme shadow-xs">Claude & ChatGPT</span>
        <span className="px-2.5 py-1 rounded-lg bg-surface border border-theme shadow-xs">Webflow</span>
      </div>
    </section>
  );
};
