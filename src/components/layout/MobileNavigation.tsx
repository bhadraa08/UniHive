import React, { useState } from 'react';
import { useUniHive } from '../../context/UniHiveContext';
import { useTheme } from '../../context/ThemeContext';
import { ThemeToggle } from '../common/ThemeToggle';
import { TabType } from '../../types';
import { 
  Home, 
  HelpCircle, 
  BookOpen, 
  Users, 
  User,
  Bell,
  Search,
  X,
  ArrowRight
} from 'lucide-react';
import { Logo } from '../common/Logo';
import { UserAvatar } from '../common/UserAvatar';

interface MobileNavigationProps {
  onToggleNotifications: () => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({ onToggleNotifications }) => {
  const { 
    activeTab, 
    setActiveTab, 
    unreadNotificationsCount, 
    userProfile,
    searchQuery,
    setSearchQuery,
    posts,
    setSelectedPost
  } = useUniHive();

  const { isDark } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const primaryTabs: { id: TabType; label: string; icon: React.FC<any> }[] = [
    { id: 'discover', label: 'Home', icon: Home },
    { id: 'ask', label: 'Ask', icon: HelpCircle },
    { id: 'resources', label: 'Resources', icon: BookOpen },
    { id: 'teams', label: 'Teams', icon: Users },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  const filteredPosts = searchQuery.trim()
    ? posts.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.author?.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.tags || []).some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 4)
    : [];

  return (
    <>
      {/* Mobile Top Header (hidden on md and up) */}
      <div className={`md:hidden sticky top-0 z-40 backdrop-blur-md border-b px-4 py-2.5 transition-colors ${
        isDark 
          ? 'bg-[#191420]/95 border-borderSubtle text-content-primary' 
          : 'bg-[#F7F1E8]/95 border-borderSubtle text-content-primary'
      }`}>
        <div className="flex items-center justify-between">
          <div onClick={() => setActiveTab('discover')} className="cursor-pointer">
            <Logo size="sm" showTagline={false} />
          </div>

          <div className="flex items-center gap-2">
            {/* Search Toggle */}
            <button
              onClick={() => setIsSearchOpen(prev => !prev)}
              className={`p-2 rounded-full border transition-colors ${
                isSearchOpen 
                  ? 'bg-peach/20 text-peach border-peach/30' 
                  : isDark 
                    ? 'bg-[#251D30] border-borderSubtle text-content-secondary' 
                    : 'bg-surface border-borderSubtle text-content-secondary'
              }`}
              aria-label="Toggle Search"
              title="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Theme Switcher */}
            <ThemeToggle />

            {/* Notifications button */}
            <button
              onClick={onToggleNotifications}
              className={`relative p-2 rounded-full border transition-colors ${
                isDark 
                  ? 'bg-[#251D30] border-borderSubtle text-content-secondary' 
                  : 'bg-surface border-borderSubtle text-content-secondary'
              }`}
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-peach" />
              )}
            </button>

            {/* Profile button */}
            <button
              onClick={() => setActiveTab('profile')}
              className="p-0.5 rounded-full"
              aria-label="Profile"
            >
              <UserAvatar
                src={userProfile.avatar}
                name={userProfile.name}
                size="sm"
              />
            </button>
          </div>
        </div>

        {/* Mobile Search Expandable Bar */}
        {isSearchOpen && (
          <div className="mt-2.5 pt-2 border-t border-borderSubtle/60 animate-dreamy-reveal space-y-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-content-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                autoFocus
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search DBMS, Hackathon, notes..."
                className={`w-full pl-8 pr-8 py-1.5 text-xs border rounded-full text-content-primary placeholder:text-content-muted focus:outline-none focus:ring-2 focus:ring-lavender/30 transition-all ${
                  isDark
                    ? 'bg-[#251D30] border-borderSubtle focus:border-lavender'
                    : 'bg-surface border-borderSubtle focus:border-plum'
                }`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-content-muted p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Quick dropdown for mobile */}
            {searchQuery.trim() && filteredPosts.length > 0 && (
              <div className={`p-2 rounded-xl border shadow-card max-h-56 overflow-y-auto space-y-1 ${
                isDark ? 'bg-[#251D30] border-borderSubtle' : 'bg-surface border-borderSubtle'
              }`}>
                {filteredPosts.map(p => (
                  <div
                    key={p.id}
                    onClick={() => {
                      setSelectedPost(p);
                      setIsSearchOpen(false);
                    }}
                    className="p-2 rounded-lg text-xs flex items-center justify-between gap-2 hover:bg-lavender/10 cursor-pointer"
                  >
                    <div className="truncate min-w-0">
                      <div className="font-bold text-content-primary truncate">{p.title}</div>
                      <div className="text-[10px] text-content-secondary truncate">{p.author.name} • {p.type}</div>
                    </div>
                    <ArrowRight className="w-3 h-3 text-content-muted shrink-0" />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Bottom Fixed Bar (hidden on md and up) */}
      <nav className={`md:hidden fixed bottom-0 left-0 right-0 z-40 backdrop-blur-md border-t py-2 px-3 flex items-center justify-around shadow-float transition-colors ${
        isDark 
          ? 'bg-[#251D30]/95 border-borderSubtle text-content-primary' 
          : 'bg-[#FFF9F2]/95 border-borderSubtle text-content-primary'
      }`}>
        {primaryTabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg transition-all ${
                isActive 
                  ? isDark ? 'text-lavender font-bold' : 'text-plum font-bold'
                  : 'text-content-secondary hover:text-content-primary'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.2]' : 'stroke-[1.8]'}`} />
              <span className="text-[10px] mt-1 leading-none">{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
