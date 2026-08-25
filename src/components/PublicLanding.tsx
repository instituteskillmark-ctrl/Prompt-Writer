import React, { useState } from 'react';
import { 
  Zap,
  Sparkles,
  ArrowRight, 
  LogOut, 
  ShieldCheck
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
      
      {/* Public Landing Navigation Bar */}
      <header className="sticky top-0 z-30 w-full bg-surface/80 backdrop-blur-md border-b border-theme px-4 sm:px-6 py-4 transition-colors">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          
          {/* Brand Header */}
          <div 
            onClick={() => setLandingTab('home')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-teal-glow text-white transition-transform duration-300 group-hover:scale-105">
              <Zap className="w-5 h-5 fill-current text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-extrabold tracking-widest text-theme-primary uppercase leading-none">
                WEBSITE
              </span>
              <span className="text-xs font-semibold tracking-widest text-brand-500 uppercase leading-tight mt-1">
                PROMPT GENERATOR
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 border border-theme bg-surface-elevated/70 p-1 rounded-xl">
            <button
              onClick={() => setLandingTab('home')}
              className={`px-3.5 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                landingTab === 'home' 
                  ? 'bg-teal-500/15 text-teal-700 dark:text-teal-300 font-bold border border-teal-500/30' 
                  : 'text-slate-700 dark:text-slate-300 font-semibold hover:text-teal-600 dark:hover:text-teal-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setLandingTab('examples')}
              className={`px-3.5 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                landingTab === 'examples' 
                  ? 'bg-teal-500/15 text-teal-700 dark:text-teal-300 font-bold border border-teal-500/30' 
                  : 'text-slate-700 dark:text-slate-300 font-semibold hover:text-teal-600 dark:hover:text-teal-300'
              }`}
            >
              Examples
            </button>
            <button
              onClick={() => setLandingTab('templates')}
              className={`px-3.5 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                landingTab === 'templates' 
                  ? 'bg-teal-500/15 text-teal-700 dark:text-teal-300 font-bold border border-teal-500/30' 
                  : 'text-slate-700 dark:text-slate-300 font-semibold hover:text-teal-600 dark:hover:text-teal-300'
              }`}
            >
              Templates
            </button>
            <button
              onClick={() => setLandingTab('how-it-works')}
              className={`px-3.5 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                landingTab === 'how-it-works' 
                  ? 'bg-teal-500/15 text-teal-700 dark:text-teal-300 font-bold border border-teal-500/30' 
                  : 'text-slate-700 dark:text-slate-300 font-semibold hover:text-teal-600 dark:hover:text-teal-300'
              }`}
            >
              How It Works
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center space-x-3">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} variant="compact" />

            {session ? (
              <div className="flex items-center space-x-3 pl-2 border-l border-theme">
                <button
                  onClick={() => onNavigate('/workspace')}
                  className="py-2 px-4 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-teal-500 text-white text-xs font-bold shadow-teal-glow transition-all flex items-center space-x-2 hover:-translate-y-0.5"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Open Workspace</span>
                </button>
                <button
                  onClick={() => signOut()}
                  title="Sign Out"
                  className="p-2 rounded-xl border border-theme bg-surface hover:bg-rose-500/10 hover:border-rose-500/30 text-theme-secondary hover:text-rose-500 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onNavigate('/login')}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold text-theme-primary hover:bg-surface-elevated border border-theme transition-colors cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  onClick={() => onNavigate('/signup')}
                  className="py-2 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-extrabold shadow-sm transition-all flex items-center space-x-1.5 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                >
                  <span>Create Account</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

        </div>
      </header>

      {/* Landing Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        
        {landingTab === 'home' && (
          <div className="space-y-12 animate-fadeIn">
            {/* Hero Section */}
            <GeneratorHero />

            {/* CTA Banner Section */}
            <div className="bg-surface border border-theme rounded-2xl p-8 shadow-card text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-600 via-teal-400 to-brand-500" />
              
              <div className="max-w-2xl mx-auto space-y-4">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full badge-teal text-xs font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Real Supabase Auth & Real Gemini AI</span>
                </div>
                
                <h2 className="text-2xl font-bold tracking-tight text-theme-primary">
                  Ready to Generate Production-Grade Prompts?
                </h2>
                
                <p className="text-xs text-theme-secondary leading-relaxed">
                  Access the full interactive workspace to configure brand context, technical stack, UX priorities, responsive requirements, and AI build rules.
                </p>

                <div className="pt-2 flex items-center justify-center space-x-4">
                  <button
                    onClick={() => onNavigate('/workspace')}
                    className="py-3 px-6 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-teal-500 text-white text-xs font-bold shadow-teal-glow hover:shadow-lg transition-all duration-200 flex items-center space-x-2 hover:-translate-y-0.5"
                  >
                    <span>Launch Prompt Generator Workspace</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-surface border border-theme rounded-2xl p-6 space-y-3 shadow-card">
                <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center border border-brand-500/20">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-theme-primary">Structured AI Specifications</h3>
                <p className="text-xs text-theme-secondary leading-relaxed">
                  Generate complete master prompts with role definition, visual design rules, typography hierarchy, page structure, and technical stack specifications.
                </p>
              </div>

              <div className="bg-surface border border-theme rounded-2xl p-6 space-y-3 shadow-card">
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center border border-teal-500/20">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-theme-primary">Protected Workspace & Auth</h3>
                <p className="text-xs text-theme-secondary leading-relaxed">
                  Powered by real Supabase Authentication with session persistence, route protection, and instant account security.
                </p>
              </div>

              <div className="bg-surface border border-theme rounded-2xl p-6 space-y-3 shadow-card">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-theme-primary">Server-Side Gemini AI</h3>
                <p className="text-xs text-theme-secondary leading-relaxed">
                  Secure server endpoint calling Gemini 3.6 Flash without exposing secret keys or credentials to the browser.
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
      <footer className="w-full border-t border-theme py-6 text-center text-xs text-theme-muted">
        <p>&copy; {new Date().getFullYear()} Website Prompt Generator &bull; Built with React, Supabase & Gemini AI</p>
      </footer>

    </div>
  );
};

