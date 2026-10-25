import React from 'react';
import { useUniHive } from '../../context/UniHiveContext';
import { useTheme } from '../../context/ThemeContext';
import { Logo } from '../common/Logo';
import { CampusIllustration } from '../common/CampusIllustration';
import { TabType } from '../../types';
import { 
  Home, 
  HelpCircle, 
  BookOpen, 
  Users, 
  MapPin, 
  Sparkles, 
  User, 
  Plus
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    openCreateModalWithType
  } = useUniHive();

  const { isDark } = useTheme();

  const navItems: { id: TabType; label: string; icon: React.FC<any> }[] = [
    { id: 'discover', label: 'Home / Discover', icon: Home },
    { id: 'ask', label: 'Ask for Help', icon: HelpCircle },
    { id: 'resources', label: 'Resources', icon: BookOpen },
    { id: 'teams', label: 'Find Teammates', icon: Users },
    { id: 'lost-found', label: 'Lost & Found', icon: MapPin },
    { id: 'activity', label: 'My Activity', icon: Sparkles },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <aside className={`w-60 xl:w-64 border-r h-screen sticky top-0 flex flex-col justify-between p-4 lg:p-5 select-none shrink-0 overflow-y-auto transition-colors duration-200 z-20 ${
      isDark 
        ? 'bg-[#211A2D] border-borderSubtle text-content-primary' 
        : 'bg-[#FFF9F1] border-borderSubtle text-content-primary'
    }`}>
      {/* Top Half: Logo, Nav Links, Create Button */}
      <div className="space-y-6">
        {/* Logo */}
        <div 
          className="px-2 pt-1 pb-1 cursor-pointer" 
          onClick={() => setActiveTab('discover')}
        >
          <Logo size="md" showTagline={true} />
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1.5">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all group ${
                  isActive
                    ? isDark
                      ? 'bg-plum-elevated text-lavender font-semibold shadow-xs'
                      : 'bg-[#EDE4F5] text-plum font-semibold shadow-xs'
                    : isDark
                      ? 'text-content-secondary hover:text-content-primary hover:bg-plum-surface/60'
                      : 'text-content-secondary hover:text-content-primary hover:bg-surface-subtle'
                }`}
              >
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive 
                      ? isDark ? 'text-lavender' : 'text-plum'
                      : 'text-content-muted group-hover:text-content-primary'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Create Post Button (pill format matching reference) */}
        <div className="pt-2 px-1">
          <button
            onClick={() => openCreateModalWithType('request')}
            className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-subtle hover:shadow-card active:scale-[0.98] ${
              isDark
                ? 'bg-plum-elevated hover:bg-lavender/30 text-lavender border border-lavender/30'
                : 'bg-[#EAE0F5] hover:bg-[#E2D4F0] text-plum border border-lavender/40'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>Create a post</span>
          </button>
        </div>
      </div>

      {/* Bottom Half: Brand Philosophy + Botanical Illustration */}
      <div className="relative pt-6">
        {/* Brand Ethos & Botanical Illustration */}
        <div className="px-2 space-y-1 z-10 relative">
          <div className="font-serif italic text-base text-content-primary font-medium">
            Better together.
          </div>
          <p className="text-[11px] text-content-secondary leading-snug">
            Empowering students across campus.
          </p>
        </div>

        {/* Botanical floral illustration anchored at bottom left */}
        <div className="mt-2 -mx-4 -mb-4">
          <CampusIllustration variant="sidebar-botanicals" height={120} />
        </div>
      </div>
    </aside>
  );
};
