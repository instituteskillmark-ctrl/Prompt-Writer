import React from 'react';

export const GeneratorHero: React.FC = () => {
  return (
    <section className="relative pt-4 pb-6 text-center max-w-3xl mx-auto px-4">
      {/* Subtle Radial Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-36 bg-brand-500/10 blur-3xl rounded-full pointer-events-none -z-10" 
        aria-hidden="true"
      />

      {/* Clean Tagline Badge */}
      <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-500 text-xs font-semibold mb-4">
        <span>Turn an idea into a build-ready prompt.</span>
      </div>

      {/* Main Heading */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-theme-primary leading-tight mb-3">
        Website Prompt Generator
      </h1>

      {/* Subtitle */}
      <p className="text-xs sm:text-sm font-medium text-theme-secondary max-w-xl mx-auto leading-relaxed">
        Describe what you want to build. Get a structured prompt optimized for v0, Bolt, Cursor, Claude, and modern AI coding assistants.
      </p>
    </section>
  );
};
