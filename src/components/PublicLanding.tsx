import React, { useState } from 'react';
import { 
  ArrowRight, 
  LogOut,
  Layers,
  Sliders,
  Sparkles
} from 'lucide-react';
import { GeneratorHero } from './GeneratorHero';
import { ThemeToggle } from './ThemeToggle';
import { ExamplesView } from './ExamplesView';
import { TemplatesView } from './TemplatesView';
import { HowItWorksView } from './HowItWorksView';
import { useAuth } from '../context/AuthContext';

interface PublicLandingProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onNavigate: (path: string) => void;
  onUseExampleText?: (text: string) => void;
}

export const PublicLanding: React.FC<PublicLandingProps> = ({
  theme,
  onToggleTheme,
  onNavigate,
}) => {
  const { session, signOut } = useAuth();
  const [landingTab, setLandingTab] = useState<'home' | 'examples' | 'templates' | 'how-it-works'>('home');

  return (
    <div className="min-h-screen bg-surface-gradient text-theme-primary selection:bg-brand-500/30 selection:text-brand-400 font-sans transition-colors duration-300 flex flex-col justify-between">
      
      {/* Navigation Bar */}
      <header className="sticky top-0 z-30 w-full bg-surface/80 backdrop-blur-md border-b border-theme px-4 sm:px-6 py-3 transition-colors">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          
          {/* Brand Header */}
          <div 
            onClick={() => setLandingTab('home')}
            className="flex items-center space-x-2.5 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-brand-500 text-white flex items-center justify-center font-bold shadow-sm">
              <Layers className="w-4 h-4 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold tracking-tight text-theme-primary leading-none">
                Website Prompt
              </span>
              <span className="text-[10px] font-medium text-theme-muted mt-0.5">
                Generator
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 border border-theme bg-surface-elevated/70 p-1 rounded-xl text-xs font-medium">
            <button
              onClick={() => setLandingTab('home')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                landingTab === 'home' 
                  ? 'bg-brand-500/10 text-brand-500 font-semibold' 
                  : 'text-theme-secondary hover:text-theme-primary'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setLandingTab('examples')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                landingTab === 'examples' 
                  ? 'bg-brand-500/10 text-brand-500 font-semibold' 
                  : 'text-theme-secondary hover:text-theme-primary'
              }`}
            >
              Examples
            </button>
            <button
              onClick={() => setLandingTab('templates')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                landingTab === 'templates' 
                  ? 'bg-brand-500/10 text-brand-500 font-semibold' 
                  : 'text-theme-secondary hover:text-theme-primary'
              }`}
            >
              Templates
            </button>
            <button
              onClick={() => setLandingTab('how-it-works')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                landingTab === 'how-it-works' 
                  ? 'bg-brand-500/10 text-brand-500 font-semibold' 
                  : 'text-theme-secondary hover:text-theme-primary'
              }`}
            >
              Guide
            </button>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-3">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} variant="compact" />

            {session ? (
              <div className="flex items-center space-x-2 pl-2 border-l border-theme">
                <button
                  onClick={() => onNavigate('/workspace')}
                  className="py-2 px-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-sm transition-all flex items-center space-x-1.5"
                >
                  <span>Open Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => signOut()}
                  title="Sign Out"
                  className="p-2 rounded-lg border border-theme bg-surface hover:bg-rose-500/10 text-theme-muted hover:text-rose-500 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onNavigate('/login')}
                  className="px-3.5 py-2 rounded-xl text-xs font-medium text-theme-primary hover:bg-surface-elevated border border-theme transition-colors cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  onClick={() => onNavigate('/signup')}
                  className="py-2 px-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-sm transition-all flex items-center space-x-1.5 cursor-pointer"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8">
        
        {landingTab === 'home' && (
          <div className="space-y-10 animate-fadeIn">
            {/* Hero Section */}
            <GeneratorHero />

            {/* CTA Workspace Banner */}
            <div className="bg-surface border border-theme rounded-2xl p-8 shadow-sm text-center relative overflow-hidden">
              <div className="max-w-xl mx-auto space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-theme-primary">
                  Turn your website idea into a prompt worth building from.
                </h2>
                
                <p className="text-xs text-theme-secondary leading-relaxed">
                  Describe what you want to build. Add detail only when you need it.
                </p>

                <div className="pt-2 flex items-center justify-center">
                  <button
                    onClick={() => onNavigate('/workspace')}
                    className="py-3 px-6 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-sm transition-all flex items-center space-x-2"
                  >
                    <span>Open Workspace</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* 3 Simple Product Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-surface border border-theme rounded-2xl p-5 space-y-2 shadow-sm">
                <div className="w-9 h-9 rounded-lg bg-brand-500/10 text-brand-500 flex items-center justify-center">
                  <Layers className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold text-theme-primary">Start with an idea</h3>
                <p className="text-xs text-theme-secondary leading-relaxed">
                  Describe the website you have in mind in your own words. No complex technical specifications required.
                </p>
              </div>

              <div className="bg-surface border border-theme rounded-2xl p-5 space-y-2 shadow-sm">
                <div className="w-9 h-9 rounded-lg bg-brand-500/10 text-brand-500 flex items-center justify-center">
                  <Sliders className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold text-theme-primary">Add detail when you need it</h3>
                <p className="text-xs text-theme-secondary leading-relaxed">
                  Customize style, color, layout, structure, and target builder only when you want additional control.
                </p>
              </div>

              <div className="bg-surface border border-theme rounded-2xl p-5 space-y-2 shadow-sm">
                <div className="w-9 h-9 rounded-lg bg-brand-500/10 text-brand-500 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold text-theme-primary">Get a build-ready prompt</h3>
                <p className="text-xs text-theme-secondary leading-relaxed">
                  Receive a clean, structured master prompt formatted for v0, Bolt, Cursor, Claude, or ChatGPT.
                </p>
              </div>
            </div>

          </div>
        )}

        {landingTab === 'examples' && (
          <div className="animate-fadeIn">
            <ExamplesView 
              onUsePrompt={() => onNavigate('/workspace')} 
              favoriteIds={[]}
              onToggleFavorite={() => {}}
            />
          </div>
        )}

        {landingTab === 'templates' && (
          <div className="animate-fadeIn">
            <TemplatesView 
              onSelectTemplate={() => onNavigate('/workspace')} 
              favoriteIds={[]}
              onToggleFavorite={() => {}}
            />
          </div>
        )}

        {landingTab === 'how-it-works' && (
          <div className="animate-fadeIn">
            <HowItWorksView />
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="w-full border-t border-theme py-6 text-center text-xs text-theme-muted space-y-1">
        <p className="font-semibold text-theme-primary">Website Prompt Generator</p>
        <p className="text-theme-muted">Turn ideas into build-ready website prompts.</p>
      </footer>

    </div>
  );
};
