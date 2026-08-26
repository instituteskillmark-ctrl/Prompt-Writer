import React from 'react';

export const GeneratorHero: React.FC = () => {
  return (
    <section className="pt-4 pb-6 text-center max-w-2xl mx-auto px-4">
      {/* Eyebrow */}
      <span className="text-[11px] font-bold tracking-widest uppercase text-theme-muted block mb-2">
        WEBSITE PROMPT GENERATOR
      </span>

      {/* Main Headline */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-theme-primary leading-tight mb-3">
        Turn your website idea into a prompt worth building from.
      </h1>

      {/* Supporting Copy */}
      <p className="text-xs sm:text-sm font-medium text-theme-secondary max-w-lg mx-auto leading-relaxed">
        Describe what you want to build. Add detail only when you need it.
      </p>
    </section>
  );
};
