import React from 'react';
import { HelpCircle, Code2, Sliders, Sparkles, Rocket } from 'lucide-react';

export const HowItWorksView: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'DESCRIBE',
      desc: 'Tell the tool what website you want to build in Card 01. Specify your core product vision, target audience, or brand goals.',
      icon: Code2
    },
    {
      num: '02',
      title: 'CONFIGURE',
      desc: 'Choose website type, visual style, layout grid, typography, pages, and creative direction across Card 02 and Card 03.',
      icon: Sliders
    },
    {
      num: '03',
      title: 'GENERATE',
      desc: 'Click Generate to produce a structured, high-context AI website prompt organized into 13 production-ready sections.',
      icon: Sparkles
    },
    {
      num: '04',
      title: 'BUILD',
      desc: 'Copy or download your prompt into v0.dev, Bolt.new, Cursor, Webflow, Lovable, or Claude to build your website.',
      icon: Rocket
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pt-4">
      {/* Top Header */}
      <div className="pb-6 border-b border-theme text-center">
        <div className="inline-flex p-2.5 rounded-2xl bg-brand-500/10 text-brand-500 mb-3 shadow-teal-glow">
          <HelpCircle className="w-6 h-6" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-theme-primary tracking-tight">
          How It Works
        </h1>
        <p className="text-xs sm:text-sm text-theme-secondary mt-1.5 max-w-lg mx-auto leading-relaxed">
          Four simple steps to transform raw website ideas into AI-optimized production prompts.
        </p>
      </div>

      {/* 4-Step Timeline Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={step.num}
              className="bg-surface border border-theme rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 relative overflow-hidden group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center font-extrabold text-xs">
                    {step.num}
                  </div>
                  <span className="text-xs font-extrabold tracking-widest text-brand-500 uppercase">
                    STEP {idx + 1}
                  </span>
                </div>
                <Icon className="w-5 h-5 text-theme-muted group-hover:text-brand-500 transition-colors" />
              </div>

              <h3 className="text-sm font-extrabold text-theme-primary mb-2 tracking-wide">
                {step.title}
              </h3>
              <p className="text-xs text-theme-secondary leading-relaxed">
                {step.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
