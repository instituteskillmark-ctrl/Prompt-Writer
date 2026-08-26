import React from 'react';
import { Menu, ChevronRight, User, LogOut } from 'lucide-react';
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
      case 'generator': return 'Generator';
      case 'my-prompts': return 'Saved Prompts';
      case 'examples': return 'Inspiration';
      case 'templates': return 'Templates';
      case 'how-it-works': return 'Guide';
      case 'favorites': return 'Favorites';
      default: return 'Generator';
    }
  };

  const userDisplayName = user?.email ? user.email.split('@')[0] : 'Designer';

  return (
    <header className="sticky top-0 z-30 w-full bg-surface/90 backdrop-blur-md border-b border-theme px-4 sm:px-6 py-2.5 transition-colors">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        {/* Left Side: Mobile Menu + Breadcrumb */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenMobileSidebar}
            type="button"
            className="lg:hidden p-1.5 rounded-lg border border-theme bg-surface hover:bg-surface-elevated text-theme-secondary transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu className="w-4 h-4" />
          </button>

          <div className="flex items-center space-x-2 text-xs font-medium text-theme-secondary">
            <span className="hidden sm:inline-block">Workspace</span>
            <ChevronRight className="hidden sm:inline-block w-3 h-3 text-theme-muted" />
            <span className="text-theme-primary font-semibold">{getTabLabel(activeTab)}</span>
          </div>
        </div>

        {/* Right Side: Theme Toggle & User Info */}
        <div className="flex items-center space-x-3">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} variant="compact" />

          <div className="flex items-center space-x-2.5 pl-3 border-l border-theme text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full bg-brand-500/20 text-brand-500 font-bold flex items-center justify-center text-[10px]">
                <User className="w-3.5 h-3.5 text-brand-500" />
              </div>
              <span className="hidden md:inline-block font-semibold text-theme-primary text-xs">
                {userDisplayName}
              </span>
            </div>

            <button
              onClick={() => signOut()}
              type="button"
              title="Sign Out"
              aria-label="Sign out"
              className="p-1 rounded-md text-theme-muted hover:text-rose-500 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
