import React from 'react';
import { Menu, Sparkles, User, ChevronRight, LogOut } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useAuth } from '../context/AuthContext';

interface TopBarProps {
  onOpenMobileSidebar: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  activeTab: string;
}

export const TopBar: React.FC<TopBarProps> = ({
  onOpenMobileSidebar,
  theme,
  onToggleTheme,
  activeTab
}) => {
  const { user, signOut } = useAuth();
  
  const getTabLabel = (id: string) => {
    switch (id) {
      case 'generator': return 'Generator Workspace';
      case 'my-prompts': return 'Saved Prompts';
      case 'examples': return 'Prompt Inspiration';
      case 'templates': return 'Website Templates';
      case 'how-it-works': return 'Guide & Documentation';
      case 'favorites': return 'Favorite Prompts';
      default: return 'Generator';
    }
  };

  const userDisplayName = user?.email ? user.email.split('@')[0] : 'Designer';

  return (
    <header className="sticky top-0 z-30 w-full bg-surface/90 backdrop-blur-md border-b border-theme px-4 sm:px-6 py-3 transition-colors">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Left Side: Mobile Menu Button + Brand / Breadcrumb */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <button
            onClick={onOpenMobileSidebar}
            type="button"
            className="lg:hidden p-2 rounded-xl border border-theme bg-surface hover:bg-surface-elevated text-theme-secondary transition-colors"
            aria-label="Open sidebar navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Breadcrumb Context */}
          <div className="flex items-center space-x-2 text-xs font-semibold text-theme-secondary">
            <span className="hidden sm:inline-block hover:text-theme-primary transition-colors">Workspace</span>
            <ChevronRight className="hidden sm:inline-block w-3.5 h-3.5 text-theme-secondary" />
            <div className="flex items-center space-x-1.5 text-theme-primary font-bold">
              <Sparkles className="w-3.5 h-3.5 text-brand-500" />
              <span>{getTabLabel(activeTab)}</span>
            </div>
          </div>
        </div>

        {/* Right Side: Quick Actions & Profile */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Quick Theme Toggle Icon (Visible on small screens or top bar) */}
          <ThemeToggle theme={theme} onToggle={onToggleTheme} variant="compact" />

          {/* Profile Badge Area & Logout */}
          <div className="flex items-center space-x-3 pl-3 border-l border-theme">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-600 to-teal-400 text-white flex items-center justify-center font-bold text-xs shadow-sm ring-2 ring-brand-500/20">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="hidden md:flex flex-col text-left max-w-[140px] truncate">
                <span className="text-xs font-bold text-theme-primary leading-tight truncate">{userDisplayName}</span>
                <span className="text-[11px] font-semibold text-brand-500 leading-tight truncate">{user?.email || 'Pro Account'}</span>
              </div>
            </div>

            <button
              onClick={() => signOut()}
              type="button"
              title="Sign Out"
              aria-label="Sign out of application"
              className="p-2 rounded-xl border border-theme bg-surface hover:bg-rose-500/10 hover:border-rose-500/30 text-theme-secondary hover:text-rose-500 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500/30"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
