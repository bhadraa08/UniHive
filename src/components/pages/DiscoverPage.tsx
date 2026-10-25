import React, { useState } from 'react';
import { useUniHive } from '../../context/UniHiveContext';
import { useTheme } from '../../context/ThemeContext';
import { PostCard } from '../cards/PostCard';
import { EmptyState } from '../common/EmptyState';
import { CampusIllustration } from '../common/CampusIllustration';
import { UPCOMING_EVENTS, POPULAR_RESOURCES } from '../../data/mockData';
import { deriveDisplayNameFromEmail } from '../../utils/userUtils';
import lightBanner from '../../assets/media_1792557804912_9370e5c5.png';
import darkBanner from '../../assets/Good_Morning_Bhadra_Dusk.png';
import { 
  HelpCircle, 
  BookOpen, 
  Users, 
  MapPin, 
  ArrowRight, 
  ChevronRight,
  Calendar,
  FileText
} from 'lucide-react';

export const DiscoverPage: React.FC = () => {
  const { 
    posts, 
    userProfile, 
    openCreateModalWithType, 
    searchQuery, 
    setActiveTab, 
    setSelectedPost,
    addToast
  } = useUniHive();

  const { isDark } = useTheme();

  // Local state for registered / saved events
  const [eventsList, setEventsList] = useState(UPCOMING_EVENTS);

  const handleEventAction = (eventId: string, title: string, currentAction: string) => {
    setEventsList(prev => prev.map(evt => {
      if (evt.id === eventId) {
        const nextRegistered = !evt.registered;
        return { ...evt, registered: nextRegistered };
      }
      return evt;
    }));

    const isRegister = currentAction === 'Register';
    addToast({
      type: 'success',
      title: isRegister ? 'Event Registration Confirmed' : 'Saved to Calendar',
      message: `${title} has been added to your campus schedule.`
    });
  };

  const handleResourceClick = (resourceTitle: string, postId?: string) => {
    if (postId) {
      const target = posts.find(p => p.id === postId);
      if (target) {
        setSelectedPost(target);
        return;
      }
    }
    const match = posts.find(p => 
      p.type === 'resource' && 
      (p.title.toLowerCase().includes(resourceTitle.toLowerCase().slice(0, 10)) || 
       resourceTitle.toLowerCase().includes(p.title.toLowerCase().slice(0, 10)))
    );
    if (match) {
      setSelectedPost(match);
      return;
    }
    addToast({
      type: 'info',
      title: 'Opening Resource',
      message: `Loading "${resourceTitle}" from the shared campus study vault.`
    });
  };

  // Filter posts based on search query
  const filteredPosts = posts.filter(post => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = post.title.toLowerCase().includes(q);
      const matchDesc = post.description.toLowerCase().includes(q);
      const matchAuthor = post.author.name.toLowerCase().includes(q);
      const matchTags = post.tags.some(t => t.toLowerCase().includes(q));
      return matchTitle || matchDesc || matchAuthor || matchTags;
    }
    return true;
  });

  // Calculate live pulse numbers
  const activeRequestsCount = posts.filter(p => p.type === 'request' && p.status === 'open').length || 12;
  const newResourcesCount = posts.filter(p => p.type === 'resource').length || 8;
  const teamOpeningsCount = posts.filter(p => p.type === 'team' && p.status === 'open').length || 6;
  const lostFoundCount = posts.filter(p => p.type === 'lost-found').length || 3;

  return (
    <div className="space-y-6 md:space-y-7 pb-6">
      {/* -------------------------------------------------------------
       * 1. WIDE ILLUSTRATED CAMPUS BANNER (Theme-Aware Background)
       * ----------------------------------------------------------- */}
      <section className={`page-header-reveal rounded-3xl border overflow-hidden shadow-card relative transition-all duration-300 ${
        isDark 
          ? 'border-borderSubtle bg-[#251D30]' 
          : 'border-borderSubtle bg-[#FFF9F2]'
      }`}>
        <div className="relative min-h-[175px] sm:min-h-[195px] lg:min-h-[215px] flex items-center overflow-hidden">
          {/* Light Theme Background Image Layer */}
          <div
            className="absolute inset-0 bg-cover bg-no-repeat transition-opacity duration-300 ease-in-out bg-[position:60%_center] sm:bg-[position:75%_center] lg:bg-[position:right_center]"
            style={{
              backgroundImage: `url(${lightBanner})`,
              opacity: isDark ? 0 : 1
            }}
            aria-hidden="true"
          />

          {/* Dark Theme Background Image Layer */}
          <div
            className="absolute inset-0 bg-cover bg-no-repeat transition-opacity duration-300 ease-in-out bg-[position:60%_center] sm:bg-[position:75%_center] lg:bg-[position:right_center]"
            style={{
              backgroundImage: `url(${darkBanner})`,
              opacity: isDark ? 1 : 0
            }}
            aria-hidden="true"
          />

          {/* Subtle Left Contrast Overlay to Guarantee Crisp Typography */}
          <div 
            className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
              isDark
                ? 'bg-gradient-to-r from-[#191420]/85 via-[#191420]/40 sm:via-[#191420]/25 via-70% sm:via-50% to-transparent opacity-100'
                : 'bg-gradient-to-r from-[#FFF9F2]/95 via-[#FFF9F2]/70 sm:via-[#FFF9F2]/45 via-70% sm:via-50% to-transparent opacity-100'
            }`} 
            aria-hidden="true"
          />

          {/* Banner Text Floating Cleanly over the Landscape in Both Themes */}
          <div className="relative z-10 px-6 sm:px-8 md:px-10 py-6 max-w-2xl sm:max-w-3xl">
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-content-primary font-normal tracking-tight leading-tight">
              Welcome to your hive, {deriveDisplayNameFromEmail(userProfile.email || userProfile.name)} 🐝
            </h1>
            <p className="font-sans text-xs sm:text-sm text-content-primary/80 dark:text-content-secondary mt-1.5 leading-relaxed font-medium">
              Your campus gets better when we help each other.
            </p>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
       * 2. FOUR CAMPUS ACTION CARDS (In a row beneath banner)
       * ----------------------------------------------------------- */}
      <section className="page-cards-stagger grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-3.5">
        {/* Card 1: Ask for Help */}
        <div
          onClick={() => setActiveTab('ask')}
          className={`action-card-dreamy rounded-2xl border p-3.5 sm:p-4 cursor-pointer group flex flex-col justify-between shadow-subtle ${
            isDark 
              ? 'bg-[#251F32] border-borderSubtle' 
              : 'bg-surface border-borderSubtle'
          }`}
          title="Go to Ask for Help"
        >
          <div>
            <div className="w-8 h-8 rounded-lg bg-[#F9E8E1] dark:bg-[#3D2C39] flex items-center justify-center text-[#DDA18E] mb-2.5 group-hover:scale-105 transition-transform">
              <HelpCircle className="w-4 h-4 text-[#DDA18E]" />
            </div>
            <h3 className="font-sans font-bold text-xs sm:text-sm text-content-primary group-hover:text-peach transition-colors">
              Ask for Help
            </h3>
            <p className="text-[11px] text-content-secondary mt-0.5 leading-snug">
              Get help from fellow students
            </p>
          </div>
          <div className="mt-3 flex justify-end">
            <ArrowRight className="w-3.5 h-3.5 text-content-muted group-hover:text-peach group-hover:translate-x-1.5 transition-all duration-200" />
          </div>
        </div>

        {/* Card 2: Share a Resource */}
        <div
          onClick={() => setActiveTab('resources')}
          className={`action-card-dreamy rounded-2xl border p-3.5 sm:p-4 cursor-pointer group flex flex-col justify-between shadow-subtle ${
            isDark 
              ? 'bg-[#251F32] border-borderSubtle' 
              : 'bg-surface border-borderSubtle'
          }`}
          title="Go to Resources"
        >
          <div>
            <div className="w-8 h-8 rounded-lg bg-[#EAF0E7] dark:bg-[#2C382E] flex items-center justify-center text-[#7E9975] mb-2.5 group-hover:scale-105 transition-transform">
              <BookOpen className="w-4 h-4 text-[#7E9975]" />
            </div>
            <h3 className="font-sans font-bold text-xs sm:text-sm text-content-primary group-hover:text-sage transition-colors">
              Share a Resource
            </h3>
            <p className="text-[11px] text-content-secondary mt-0.5 leading-snug">
              Share notes, links, materials
            </p>
          </div>
          <div className="mt-3 flex justify-end">
            <ArrowRight className="w-3.5 h-3.5 text-content-muted group-hover:text-sage group-hover:translate-x-1.5 transition-all duration-200" />
          </div>
        </div>

        {/* Card 3: Find Teammates */}
        <div
          onClick={() => setActiveTab('teams')}
          className={`action-card-dreamy rounded-2xl border p-3.5 sm:p-4 cursor-pointer group flex flex-col justify-between shadow-subtle ${
            isDark 
              ? 'bg-[#251F32] border-borderSubtle' 
              : 'bg-surface border-borderSubtle'
          }`}
          title="Go to Find Teammates"
        >
          <div>
            <div className="w-8 h-8 rounded-lg bg-[#EDE7F6] dark:bg-[#342747] flex items-center justify-center text-[#9E82C4] mb-2.5 group-hover:scale-105 transition-transform">
              <Users className="w-4 h-4 text-[#9E82C4]" />
            </div>
            <h3 className="font-sans font-bold text-xs sm:text-sm text-content-primary group-hover:text-lavender transition-colors">
              Find Teammates
            </h3>
            <p className="text-[11px] text-content-secondary mt-0.5 leading-snug">
              Build your team for projects & events
            </p>
          </div>
          <div className="mt-3 flex justify-end">
            <ArrowRight className="w-3.5 h-3.5 text-content-muted group-hover:text-lavender group-hover:translate-x-1.5 transition-all duration-200" />
          </div>
        </div>

        {/* Card 4: Lost & Found */}
        <div
          onClick={() => setActiveTab('lost-found')}
          className={`action-card-dreamy rounded-2xl border p-3.5 sm:p-4 cursor-pointer group flex flex-col justify-between shadow-subtle ${
            isDark 
              ? 'bg-[#251F32] border-borderSubtle' 
              : 'bg-surface border-borderSubtle'
          }`}
          title="Go to Lost & Found"
        >
          <div>
            <div className="w-8 h-8 rounded-lg bg-[#F8EFE4] dark:bg-[#3B2E28] flex items-center justify-center text-[#D8976F] mb-2.5 group-hover:scale-105 transition-transform">
              <MapPin className="w-4 h-4 text-[#D8976F]" />
            </div>
            <h3 className="font-sans font-bold text-xs sm:text-sm text-content-primary group-hover:text-peach transition-colors">
              Lost & Found
            </h3>
            <p className="text-[11px] text-content-secondary mt-0.5 leading-snug">
              Help someone return lost items
            </p>
          </div>
          <div className="mt-3 flex justify-end">
            <ArrowRight className="w-3.5 h-3.5 text-content-muted group-hover:text-peach group-hover:translate-x-1.5 transition-all duration-200" />
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
       * 3. TWO-COLUMN MAIN CONTENT (Community Feed + Right Column)
       * ----------------------------------------------------------- */}
      <div className="page-content-reveal grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Community Feed (7 cols on lg) */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="font-sans font-bold text-base sm:text-lg text-content-primary">
              Community Feed
            </h2>
            <button
              onClick={() => setActiveTab('ask')}
              className="text-xs font-medium text-content-secondary hover:text-content-primary flex items-center gap-1 transition-colors"
            >
              <span>View all</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Feed Posts */}
          {filteredPosts.length === 0 ? (
            <EmptyState
              title="No posts found"
              description="No campus posts matched your search. Try another keyword or create a new post!"
              actionLabel="Create a Post"
              onAction={() => openCreateModalWithType('request')}
            />
          ) : (
            <div className="space-y-4">
              {filteredPosts.map(post => (
                <PostCard
                  key={post.id}
                  post={post}
                  onSelect={() => setSelectedPost(post)}
                />
              ))}
            </div>
          )}

          {/* Bottom Feed Collaboration Banner matching the screenshot */}
          <div className={`rounded-2xl border p-4 sm:p-5 overflow-hidden transition-all shadow-subtle ${
            isDark 
              ? 'bg-[#251F32] border-borderSubtle' 
              : 'bg-surface border-borderSubtle'
          }`}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="w-full sm:w-1/2 h-24 overflow-hidden rounded-xl">
                <CampusIllustration variant="feed-collaboration" className="w-full h-full" />
              </div>
              <div className="w-full sm:w-1/2 text-left sm:text-right space-y-2">
                <p className="font-serif text-sm sm:text-base text-content-primary leading-snug">
                  Find your people, share your skills, make an impact.
                </p>
                <button
                  onClick={() => setActiveTab('teams')}
                  className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all shadow-subtle ${
                    isDark
                      ? 'bg-lavender text-[#191522] hover:bg-[#F7EFE8]'
                      : 'bg-[#332B35] text-[#FFF9F1] hover:bg-[#211A29]'
                  }`}
                >
                  <span>Explore now</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Events, Popular Resources, Community Pulse (5 cols on lg) */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-5">
          {/* A. Upcoming Events */}
          <div className={`rounded-2xl border p-5 shadow-subtle transition-all ${
            isDark ? 'bg-[#251F32] border-borderSubtle' : 'bg-surface border-borderSubtle'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-sans font-bold text-sm text-content-primary">
                Upcoming Events
              </h3>
              <button
                onClick={() => addToast({ type: 'info', title: 'Events Calendar', message: 'Full campus term calendar view is coming soon!' })}
                className="text-xs text-content-secondary hover:text-content-primary flex items-center gap-1 transition-colors"
              >
                <span>View all</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-3.5">
              {eventsList.map(evt => (
                <div key={evt.id} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-surface-subtle border border-borderSubtle/60 flex items-center justify-center text-content-secondary shrink-0">
                      <Calendar className="w-4 h-4 text-lavender" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-content-primary truncate">
                        {evt.title}
                      </h4>
                      <p className="text-[11px] text-content-secondary truncate">
                        {evt.date} • {evt.location}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleEventAction(evt.id, evt.title, evt.action)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all border shrink-0 ${
                      evt.registered
                        ? 'bg-sage/20 text-sage border-sage/40'
                        : isDark
                          ? 'border-borderSubtle hover:border-lavender text-content-secondary hover:text-content-primary'
                          : 'border-borderSubtle hover:border-plum text-content-secondary hover:text-plum'
                    }`}
                  >
                    {evt.registered ? (evt.action === 'Register' ? 'Registered' : 'Saved') : evt.action}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* B. Popular Resources */}
          <div className={`rounded-2xl border p-5 shadow-subtle transition-all ${
            isDark ? 'bg-[#251F32] border-borderSubtle' : 'bg-surface border-borderSubtle'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-sans font-bold text-sm text-content-primary">
                Popular Resources
              </h3>
              <button
                onClick={() => setActiveTab('resources')}
                className="text-xs text-content-secondary hover:text-content-primary flex items-center gap-1 transition-colors"
              >
                <span>View all</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-3">
              {POPULAR_RESOURCES.map(res => (
                <div
                  key={res.id}
                  onClick={() => handleResourceClick(res.title, res.postId)}
                  className="flex items-center justify-between gap-3 p-1 rounded-xl hover:bg-surface-subtle/60 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-surface-subtle border border-borderSubtle/60 flex items-center justify-center text-content-secondary shrink-0 group-hover:scale-105 transition-transform">
                      <FileText className="w-4 h-4 text-peach" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-content-primary group-hover:text-lavender transition-colors truncate">
                        {res.title}
                      </h4>
                      <p className="text-[11px] text-content-secondary truncate">
                        By {res.author} • {res.views}
                      </p>
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-content-muted group-hover:text-content-primary group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>
              ))}
            </div>
          </div>

          {/* C. Community Pulse */}
          <div className={`rounded-2xl border p-5 shadow-subtle transition-all ${
            isDark ? 'bg-[#251F32] border-borderSubtle' : 'bg-surface border-borderSubtle'
          }`}>
            <h3 className="font-sans font-bold text-sm text-content-primary mb-3">
              Community Pulse
            </h3>

            <div className="space-y-3">
              <div>
                <div className="text-xl font-bold font-serif text-content-primary">
                  {activeRequestsCount}
                </div>
                <p className="text-[11px] text-content-secondary">
                  Active requests
                </p>
              </div>

              <div>
                <div className="text-xl font-bold font-serif text-content-primary">
                  {newResourcesCount}
                </div>
                <p className="text-[11px] text-content-secondary">
                  New resources
                </p>
              </div>

              <div>
                <div className="text-xl font-bold font-serif text-content-primary">
                  {teamOpeningsCount}
                </div>
                <p className="text-[11px] text-content-secondary">
                  Team openings
                </p>
              </div>

              <div>
                <div className="text-xl font-bold font-serif text-content-primary">
                  {lostFoundCount}
                </div>
                <p className="text-[11px] text-content-secondary">
                  Lost & Found
                </p>
              </div>
            </div>
          </div>

          {/* D. Editorial Quote Card */}
          <div className={`rounded-2xl border p-5 shadow-subtle transition-all ${
            isDark 
              ? 'bg-[#2B2338]/60 border-borderSubtle text-content-primary' 
              : 'bg-[#F4ECE3] border-borderSubtle text-plum'
          }`}>
            <p className="font-serif italic text-sm sm:text-base leading-relaxed text-content-primary/90">
              "Small acts of help create a stronger campus."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
