import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useUniHive } from '../../context/UniHiveContext';
import { useTheme } from '../../context/ThemeContext';
import { ThemeToggle } from '../common/ThemeToggle';
import { Logo } from '../common/Logo';
import { UserAvatar } from '../common/UserAvatar';
import { UPCOMING_EVENTS } from '../../data/mockData';
import { Post, TabType } from '../../types';
import { 
  Search, 
  Bell, 
  X, 
  BookOpen, 
  HelpCircle, 
  Users, 
  MapPin, 
  Calendar, 
  ArrowRight,
  FileText
} from 'lucide-react';

interface TopBarProps {
  onToggleNotifications: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onToggleNotifications }) => {
  const { 
    searchQuery, 
    setSearchQuery, 
    unreadNotificationsCount, 
    userProfile, 
    setActiveTab,
    posts,
    setSelectedPost,
    addToast
  } = useUniHive();

  const { isDark } = useTheme();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Compute live search matches across categories
  const results = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) {
      return {
        resources: [],
        requests: [],
        teams: [],
        lostFound: [],
        events: [],
        total: 0
      };
    }

    const matchesPost = (p: Post) => {
      return (
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.author?.name || '').toLowerCase().includes(q) ||
        (p.tags || []).some(t => t.toLowerCase().includes(q)) ||
        (p.category || '').toLowerCase().includes(q) ||
        (p.resourceDetails?.fileName || '').toLowerCase().includes(q) ||
        (p.teamDetails?.event || '').toLowerCase().includes(q)
      );
    };

    const matchingPosts = posts.filter(matchesPost);

    const resources = matchingPosts.filter(p => p.type === 'resource');
    const requests = matchingPosts.filter(p => p.type === 'request');
    const teams = matchingPosts.filter(p => p.type === 'team');
    const lostFound = matchingPosts.filter(p => p.type === 'lost-found');

    const matchingEvents = UPCOMING_EVENTS.filter(evt =>
      evt.title.toLowerCase().includes(q) ||
      evt.location.toLowerCase().includes(q)
    );

    return {
      resources,
      requests,
      teams,
      lostFound,
      events: matchingEvents,
      total: matchingPosts.length + matchingEvents.length
    };
  }, [searchQuery, posts]);

  // Flatten items for keyboard navigation
  const flatItems = useMemo(() => {
    const list: Array<{
      type: 'post' | 'event';
      data: any;
      tab: TabType;
    }> = [];

    results.resources.slice(0, 3).forEach(p => list.push({ type: 'post', data: p, tab: 'resources' }));
    results.requests.slice(0, 3).forEach(p => list.push({ type: 'post', data: p, tab: 'ask' }));
    results.teams.slice(0, 3).forEach(p => list.push({ type: 'post', data: p, tab: 'teams' }));
    results.lostFound.slice(0, 2).forEach(p => list.push({ type: 'post', data: p, tab: 'lost-found' }));
    results.events.slice(0, 2).forEach(e => list.push({ type: 'event', data: e, tab: 'discover' }));

    return list;
  }, [results]);

  const handleSelectPost = (post: Post, tab?: TabType) => {
    setSelectedPost(post);
    if (tab) setActiveTab(tab);
    setIsOpen(false);
  };

  const handleSelectEvent = (eventTitle: string) => {
    setActiveTab('discover');
    setIsOpen(false);
    addToast({
      type: 'info',
      title: 'Campus Event',
      message: `Viewing "${eventTitle}" on your campus calendar.`
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
      return;
    }

    if (!isOpen || flatItems.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % flatItems.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + flatItems.length) % flatItems.length);
    } else if (e.key === 'Enter' && selectedIndex >= 0 && selectedIndex < flatItems.length) {
      e.preventDefault();
      const item = flatItems[selectedIndex];
      if (item.type === 'post') {
        handleSelectPost(item.data, item.tab);
      } else {
        handleSelectEvent(item.data.title);
      }
    }
  };

  const handleViewAllInFeed = () => {
    setActiveTab('discover');
    setIsOpen(false);
  };

  return (
    <header className={`sticky top-0 z-30 px-4 lg:px-8 py-3 flex items-center justify-between gap-4 transition-colors duration-200 border-b ${
      isDark 
        ? 'bg-[#191420]/95 border-borderSubtle text-content-primary backdrop-blur-md' 
        : 'bg-[#F7F1E8]/95 border-borderSubtle text-content-primary backdrop-blur-md'
    }`}>
      {/* Mobile-only Brand Logo */}
      <div className="md:hidden flex items-center shrink-0 cursor-pointer" onClick={() => setActiveTab('discover')}>
        <Logo size="sm" showTagline={false} />
      </div>

      {/* Center: Search bar container */}
      <div className="flex-1 max-w-lg relative" ref={containerRef}>
        <div className="relative">
          <Search className="w-4 h-4 text-content-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onFocus={() => setIsOpen(true)}
            onChange={e => {
              setSearchQuery(e.target.value);
              setIsOpen(true);
              setSelectedIndex(-1);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search posts, resources, people..."
            className={`w-full pl-9 pr-8 py-2 text-xs md:text-sm border rounded-full text-content-primary placeholder:text-content-muted focus:outline-none focus:ring-2 focus:ring-lavender/30 transition-all ${
              isDark
                ? 'bg-[#251D30] border-borderSubtle focus:border-lavender'
                : 'bg-surface border-borderSubtle focus:border-plum'
            }`}
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setIsOpen(false);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-content-muted hover:text-content-primary p-0.5 rounded-md"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Global Floating Search Dropdown */}
        {isOpen && searchQuery.trim().length > 0 && (
          <div
            className={`absolute left-0 right-0 top-full mt-2 rounded-2xl border shadow-float overflow-hidden z-50 animate-dreamy-reveal max-h-[75vh] flex flex-col ${
              isDark
                ? 'bg-[#251D30] border-borderSubtle text-content-primary'
                : 'bg-[#FFF9F2] border-borderSubtle text-content-primary'
            }`}
          >
            {/* Header info */}
            <div className="px-4 py-2.5 border-b border-borderSubtle/60 flex items-center justify-between text-xs text-content-secondary">
              <span className="font-medium">
                {results.total > 0 ? `Found ${results.total} matching campus items` : 'Campus search'}
              </span>
              <span className="font-mono text-[10px] hidden sm:inline text-content-muted">
                Esc to dismiss
              </span>
            </div>

            {/* Results body */}
            <div className="overflow-y-auto p-2 space-y-3 flex-1">
              {results.total === 0 ? (
                <div className="py-8 px-4 text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-peach/10 text-peach mx-auto flex items-center justify-center">
                    <Search className="w-4 h-4" />
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-content-primary">
                    No results for "{searchQuery}"
                  </p>
                  <p className="text-xs text-content-secondary max-w-xs mx-auto">
                    Try searching for keywords like <strong className="text-content-primary">"DBMS"</strong>, <strong className="text-content-primary">"SQL"</strong>, <strong className="text-content-primary">"Hackathon"</strong>, or <strong className="text-content-primary">"ID Card"</strong>.
                  </p>
                  <div className="pt-2 flex flex-wrap justify-center gap-1.5">
                    {['DBMS', 'SQL', 'Hackathon', 'Design'].map(term => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => setSearchQuery(term)}
                        className="px-2.5 py-1 text-[11px] rounded-full border border-borderSubtle hover:border-lavender text-content-secondary hover:text-content-primary transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {/* Category: Shared Resources & Notes */}
                  {results.resources.length > 0 && (
                    <div className="space-y-1">
                      <div className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-content-secondary flex items-center gap-1.5">
                        <BookOpen className="w-3 h-3 text-lavender" />
                        <span>Study Guides & Resources</span>
                      </div>
                      {results.resources.slice(0, 3).map(post => (
                        <div
                          key={post.id}
                          onClick={() => handleSelectPost(post, 'resources')}
                          className={`p-2.5 rounded-xl cursor-pointer transition-all flex items-center justify-between gap-3 group ${
                            isDark ? 'hover:bg-plum-elevated/70' : 'hover:bg-[#F3E8D8]/60'
                          }`}
                        >
                          <div className="flex items-start gap-2.5 min-w-0">
                            <div className="w-7 h-7 rounded-lg bg-surface-subtle border border-borderSubtle flex items-center justify-center shrink-0 mt-0.5">
                              <FileText className="w-3.5 h-3.5 text-peach" />
                            </div>
                            <div className="min-w-0">
                              <h4 className="text-xs font-bold text-content-primary group-hover:text-lavender transition-colors truncate">
                                {post.title}
                              </h4>
                              <p className="text-[11px] text-content-secondary truncate">
                                By {post.author.name} • {post.resourceDetails?.fileType?.toUpperCase() || 'NOTES'} • {post.resourceDetails?.fileSize || 'PDF'}
                              </p>
                            </div>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-content-muted group-hover:text-content-primary group-hover:translate-x-0.5 transition-all shrink-0" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Category: Help Loop Questions */}
                  {results.requests.length > 0 && (
                    <div className="space-y-1">
                      <div className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-content-secondary flex items-center gap-1.5">
                        <HelpCircle className="w-3 h-3 text-peach" />
                        <span>Help Loop Questions</span>
                      </div>
                      {results.requests.slice(0, 3).map(post => (
                        <div
                          key={post.id}
                          onClick={() => handleSelectPost(post, 'ask')}
                          className={`p-2.5 rounded-xl cursor-pointer transition-all flex items-center justify-between gap-3 group ${
                            isDark ? 'hover:bg-plum-elevated/70' : 'hover:bg-[#F3E8D8]/60'
                          }`}
                        >
                          <div className="flex items-start gap-2.5 min-w-0">
                            <div className="w-7 h-7 rounded-lg bg-surface-subtle border border-borderSubtle flex items-center justify-center shrink-0 mt-0.5">
                              <HelpCircle className="w-3.5 h-3.5 text-peach" />
                            </div>
                            <div className="min-w-0">
                              <h4 className="text-xs font-bold text-content-primary group-hover:text-lavender transition-colors truncate">
                                {post.title}
                              </h4>
                              <p className="text-[11px] text-content-secondary truncate">
                                {post.author.name} • {post.tags.slice(0, 3).join(', ')}
                              </p>
                            </div>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-content-muted group-hover:text-content-primary group-hover:translate-x-0.5 transition-all shrink-0" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Category: Project Teams */}
                  {results.teams.length > 0 && (
                    <div className="space-y-1">
                      <div className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-content-secondary flex items-center gap-1.5">
                        <Users className="w-3 h-3 text-lavender" />
                        <span>Team Opportunities</span>
                      </div>
                      {results.teams.slice(0, 3).map(post => (
                        <div
                          key={post.id}
                          onClick={() => handleSelectPost(post, 'teams')}
                          className={`p-2.5 rounded-xl cursor-pointer transition-all flex items-center justify-between gap-3 group ${
                            isDark ? 'hover:bg-plum-elevated/70' : 'hover:bg-[#F3E8D8]/60'
                          }`}
                        >
                          <div className="flex items-start gap-2.5 min-w-0">
                            <div className="w-7 h-7 rounded-lg bg-surface-subtle border border-borderSubtle flex items-center justify-center shrink-0 mt-0.5">
                              <Users className="w-3.5 h-3.5 text-lavender" />
                            </div>
                            <div className="min-w-0">
                              <h4 className="text-xs font-bold text-content-primary group-hover:text-lavender transition-colors truncate">
                                {post.title}
                              </h4>
                              <p className="text-[11px] text-content-secondary truncate">
                                {post.teamDetails?.event || 'Hackathon'} • {post.teamDetails?.rolesNeeded?.join(', ') || 'Teammate'}
                              </p>
                            </div>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-content-muted group-hover:text-content-primary group-hover:translate-x-0.5 transition-all shrink-0" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Category: Lost & Found */}
                  {results.lostFound.length > 0 && (
                    <div className="space-y-1">
                      <div className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-content-secondary flex items-center gap-1.5">
                        <MapPin className="w-3 h-3 text-terracotta" />
                        <span>Lost & Found Items</span>
                      </div>
                      {results.lostFound.slice(0, 2).map(post => (
                        <div
                          key={post.id}
                          onClick={() => handleSelectPost(post, 'lost-found')}
                          className={`p-2.5 rounded-xl cursor-pointer transition-all flex items-center justify-between gap-3 group ${
                            isDark ? 'hover:bg-plum-elevated/70' : 'hover:bg-[#F3E8D8]/60'
                          }`}
                        >
                          <div className="flex items-start gap-2.5 min-w-0">
                            <div className="w-7 h-7 rounded-lg bg-surface-subtle border border-borderSubtle flex items-center justify-center shrink-0 mt-0.5">
                              <MapPin className="w-3.5 h-3.5 text-terracotta" />
                            </div>
                            <div className="min-w-0">
                              <h4 className="text-xs font-bold text-content-primary group-hover:text-lavender transition-colors truncate">
                                {post.title}
                              </h4>
                              <p className="text-[11px] text-content-secondary truncate">
                                {post.lostFoundDetails?.location || 'Campus'} • {post.lostFoundDetails?.itemType === 'found' ? 'Found' : 'Lost'}
                              </p>
                            </div>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-content-muted group-hover:text-content-primary group-hover:translate-x-0.5 transition-all shrink-0" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Category: Upcoming Events */}
                  {results.events.length > 0 && (
                    <div className="space-y-1">
                      <div className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-content-secondary flex items-center gap-1.5">
                        <Calendar className="w-3 h-3 text-lavender" />
                        <span>Campus Events</span>
                      </div>
                      {results.events.slice(0, 2).map(evt => (
                        <div
                          key={evt.id}
                          onClick={() => handleSelectEvent(evt.title)}
                          className={`p-2.5 rounded-xl cursor-pointer transition-all flex items-center justify-between gap-3 group ${
                            isDark ? 'hover:bg-plum-elevated/70' : 'hover:bg-[#F3E8D8]/60'
                          }`}
                        >
                          <div className="flex items-start gap-2.5 min-w-0">
                            <div className="w-7 h-7 rounded-lg bg-surface-subtle border border-borderSubtle flex items-center justify-center shrink-0 mt-0.5">
                              <Calendar className="w-3.5 h-3.5 text-lavender" />
                            </div>
                            <div className="min-w-0">
                              <h4 className="text-xs font-bold text-content-primary group-hover:text-lavender transition-colors truncate">
                                {evt.title}
                              </h4>
                              <p className="text-[11px] text-content-secondary truncate">
                                {evt.date} • {evt.location}
                              </p>
                            </div>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-content-muted group-hover:text-content-primary group-hover:translate-x-0.5 transition-all shrink-0" />
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Bottom action bar */}
            {results.total > 0 && (
              <div className="px-4 py-2 border-t border-borderSubtle/60 flex items-center justify-between text-xs bg-surface-subtle/40">
                <button
                  type="button"
                  onClick={handleViewAllInFeed}
                  className="font-semibold text-lavender hover:underline flex items-center gap-1"
                >
                  <span>Filter Discover feed for "{searchQuery}"</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="text-content-muted hover:text-content-primary text-[11px]"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right: Theme Toggle, Notifications, User Avatar */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notifications Bell */}
        <button
          onClick={onToggleNotifications}
          className={`relative p-2 rounded-full border transition-colors ${
            isDark 
              ? 'bg-[#251D30] border-borderSubtle text-content-secondary hover:text-content-primary' 
              : 'bg-surface border-borderSubtle text-content-secondary hover:text-plum'
          }`}
          aria-label="Campus notifications"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-peach" />
          )}
        </button>

        {/* User Profile Pill */}
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 p-1 pr-3 rounded-full border transition-all group ${
            isDark 
              ? 'bg-[#251D30] border-borderSubtle hover:border-lavender' 
              : 'bg-surface border-borderSubtle hover:border-lavender'
          }`}
          title="View Student Profile"
        >
          <UserAvatar
            src={userProfile.avatar}
            name={userProfile.name}
            size="sm"
          />
          <span className="text-xs font-semibold text-content-primary group-hover:text-lavender transition-colors hidden sm:inline-block">
            {userProfile.name}
          </span>
        </button>
      </div>
    </header>
  );
};
