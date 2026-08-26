import React, { useEffect } from 'react';
import { 
  Layers, 
  FolderKanban, 
  Lightbulb, 
  LayoutTemplate, 
  HelpCircle, 
  Star, 
  X,
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
    { id: 'generator', label: 'Generator', icon: Layers },
    { id: 'my-prompts', label: 'My Prompts', icon: FolderKanban },
    { id: 'examples', label: 'Examples', icon: Lightbulb },
    { id: 'templates', label: 'Templates', icon: LayoutTemplate },
    { id: 'how-it-works', label: 'Guide', icon: HelpCircle },
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
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-surface border-r border-theme flex flex-col justify-between p-5 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Sidebar Navigation"
      >
        {/* Top Header & Navigation */}
        <div className="flex flex-col space-y-6">
          {/* Brand Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
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

            {/* Mobile Close Button */}
            <button
              onClick={onClose}
              type="button"
              className="lg:hidden p-1.5 rounded-lg text-theme-muted hover:text-theme-primary hover:bg-surface-elevated transition-colors"
              aria-label="Close navigation sidebar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1" aria-label="Main Navigation">
            <div className="px-3 pb-2 text-[10px] font-semibold tracking-wider uppercase text-theme-muted">
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
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 group relative ${
                    isActive
                      ? 'bg-brand-500/10 text-brand-500 font-semibold'
                      : 'text-theme-secondary hover:text-theme-primary hover:bg-surface-elevated'
                  }`}
                >
                  {/* Left Icon & Label */}
                  <div className="flex items-center space-x-2.5">
                    <Icon 
                      className={`w-4 h-4 transition-colors ${
                        isActive 
                          ? 'text-brand-500' 
                          : 'text-theme-muted group-hover:text-theme-primary'
                      }`} 
                    />
                    <span>{item.label}</span>
                  </div>

                  {/* Active Indicator dot */}
                  {isActive && (
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Area: Account & Theme Toggle */}
        <div className="space-y-3 pt-4 border-t border-theme">
          <div className="p-2.5 rounded-lg bg-surface-elevated border border-theme flex items-center justify-between text-xs">
            <div className="flex flex-col truncate max-w-[150px]">
              <span className="text-[11px] font-medium text-theme-primary truncate">
                {user?.email || 'Authenticated User'}
              </span>
              <span className="text-[10px] text-theme-muted">Connected</span>
            </div>
            <button
              onClick={() => signOut()}
              type="button"
              title="Sign Out"
              className="p-1 rounded-md text-theme-muted hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>

          <ThemeToggle theme={theme} onToggle={onToggleTheme} variant="full" />
        </div>
      </aside>
    </>
  );
};
