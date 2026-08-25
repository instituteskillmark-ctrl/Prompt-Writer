import React, { useEffect } from 'react';
import { 
  Sparkles, 
  FolderKanban, 
  Lightbulb, 
  LayoutTemplate, 
  HelpCircle, 
  Star, 
  X,
  Zap,
  LogOut
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useAuth } from '../context/AuthContext';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  theme,
  onToggleTheme,
  isOpen,
  onClose
}) => {
  const { user, signOut } = useAuth();

  // Handle ESC key to close drawer on mobile
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const navItems = [
    { id: 'generator', label: 'Generator', icon: Sparkles, badge: 'V1.0' },
    { id: 'my-prompts', label: 'My Prompts', icon: FolderKanban },
    { id: 'examples', label: 'Examples', icon: Lightbulb },
    { id: 'templates', label: 'Templates', icon: LayoutTemplate },
    { id: 'how-it-works', label: 'How It Works', icon: HelpCircle },
    { id: 'favorites', label: 'Favorites', icon: Star },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-surface border-r border-theme flex flex-col justify-between p-5 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Sidebar Navigation"
      >
        {/* Top Header & Navigation */}
        <div className="flex flex-col space-y-7">
          {/* Brand Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-teal-glow text-white">
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

            {/* Mobile Close Button */}
            <button
              onClick={onClose}
              type="button"
              className="lg:hidden p-1.5 rounded-lg text-theme-muted hover:text-theme-primary hover:bg-surface-elevated transition-colors"
              aria-label="Close navigation sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5" aria-label="Main Navigation">
            <div className="px-3 pb-2 text-[10px] font-bold tracking-widest uppercase text-theme-muted">
              Workspace
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    onClose();
                  }}
                  type="button"
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 group relative ${
                    isActive
                      ? 'bg-brand-500/10 text-brand-500 dark:text-brand-400 font-semibold border border-brand-500/20'
                      : 'text-theme-secondary hover:text-theme-primary hover:bg-surface-elevated border border-transparent'
                  }`}
                >
                  {/* Left Icon & Label */}
                  <div className="flex items-center space-x-3">
                    <Icon 
                      className={`w-4 h-4 transition-colors ${
                        isActive 
                          ? 'text-brand-500 dark:text-brand-400' 
                          : 'text-theme-muted group-hover:text-theme-primary'
                      }`} 
                    />
                    <span>{item.label}</span>
                  </div>

                  {/* Active Indicator bar */}
                  {isActive && (
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-500 shadow-teal-glow animate-pulse-subtle" />
                  )}

                  {/* Optional Badge */}
                  {item.badge && !isActive && (
                    <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-md bg-surface-elevated border border-theme text-theme-muted">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Area: Info & Theme Toggle */}
        <div className="space-y-3 pt-4 border-t border-theme">
          {/* User Account Info Pill */}
          <div className="p-3 rounded-xl bg-surface-elevated border border-theme flex items-center justify-between">
            <div className="flex items-center space-x-2.5 overflow-hidden">
              <div className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0 animate-pulse" />
              <div className="flex flex-col truncate">
                <span className="text-[11px] font-semibold text-theme-primary truncate">
                  {user?.email || 'Authenticated User'}
                </span>
                <span className="text-[10px] text-theme-muted">Supabase Active</span>
              </div>
            </div>
            <button
              onClick={() => signOut()}
              type="button"
              title="Sign Out"
              className="p-1.5 rounded-lg text-theme-muted hover:text-rose-500 hover:bg-rose-500/10 transition-colors focus:outline-none"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Theme Switcher Toggle */}
          <ThemeToggle theme={theme} onToggle={onToggleTheme} variant="full" />
        </div>
      </aside>
    </>
  );
};
