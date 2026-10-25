import React, { useState } from 'react';
import { useUniHive } from '../../context/UniHiveContext';
import { useTheme } from '../../context/ThemeContext';
import { PostCard } from '../cards/PostCard';
import { EmptyState } from '../common/EmptyState';
import { ConfirmationDialog } from '../common/ConfirmationDialog';
import { 
  Clock, 
  HelpCircle, 
  Bookmark, 
  BookOpen, 
  Plus, 
  Repeat
} from 'lucide-react';

export const MyActivityPage: React.FC = () => {
  const { 
    posts, 
    userProfile, 
    helpOffers, 
    openCreateModalWithType, 
    deletePost, 
    setSelectedPost 
  } = useUniHive();

  const { isDark } = useTheme();

  const [activeSubTab, setActiveSubTab] = useState<'my_posts' | 'my_responses' | 'saved' | 'my_resources'>('my_posts');
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  // My posts
  const myPosts = posts.filter(p => p.author.id === userProfile.id);

  // Requests I responded to
  const myResponsePostIds = Object.entries(helpOffers).filter(([, offers]) =>
    offers.some(o => o.authorId === userProfile.id)
  ).map(([postId]) => postId);

  const respondedPosts = posts.filter(p => myResponsePostIds.includes(p.id));

  // Saved posts
  const savedPosts = posts.filter(p => p.isSaved);

  // My shared resources
  const myResources = posts.filter(p => p.author.id === userProfile.id && p.type === 'resource');

  const subTabs = [
    { id: 'my_posts', label: 'My Posts', count: myPosts.length, icon: HelpCircle },
    { id: 'my_responses', label: 'Helped by Me', count: respondedPosts.length, icon: Repeat },
    { id: 'saved', label: 'Saved Bookmarks', count: savedPosts.length, icon: Bookmark },
    { id: 'my_resources', label: 'My Resources', count: myResources.length, icon: BookOpen }
  ];

  const getActiveList = () => {
    switch (activeSubTab) {
      case 'my_posts':
        return myPosts;
      case 'my_responses':
        return respondedPosts;
      case 'saved':
        return savedPosts;
      case 'my_resources':
        return myResources;
      default:
        return myPosts;
    }
  };

  const activeList = getActiveList();

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className={`page-header-reveal rounded-3xl border p-6 sm:p-8 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all ${
        isDark 
          ? 'bg-plum-surface border-plum-border' 
          : 'bg-surface border-borderSubtle'
      }`}>
        <div>
          <div className="flex items-center gap-2 mb-1.5 text-lavender font-bold text-xs uppercase tracking-wider font-mono">
            <Clock className="w-4 h-4 text-terracotta" />
            <span>Personal Dashboard</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-content-primary">
            My Activity & Contributions
          </h2>
          <p className="text-xs sm:text-sm text-content-secondary max-w-xl mt-1.5 leading-relaxed">
            Manage questions you've posted, review your bookmarks, and track your active campus karma.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className={`text-right p-3 rounded-2xl border ${
            isDark ? 'bg-plum-elevated/70 border-plum-border' : 'bg-surface-subtle border-borderSubtle'
          }`}>
            <span className="text-[10px] uppercase font-bold tracking-wider text-content-muted block">
              Karma Points
            </span>
            <span className="font-display font-extrabold text-xl text-terracotta block">
              ★ {userProfile.stats.hivePoints} pts
            </span>
          </div>

          <button
            onClick={() => openCreateModalWithType('request')}
            className={`flex items-center gap-2 px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all shadow-subtle ${
              isDark
                ? 'bg-lavender text-plum-dark hover:bg-parchment'
                : 'bg-plum text-parchment hover:bg-plum-hover'
            }`}
          >
            <Plus className="w-4 h-4 text-terracotta" />
            <span>New Post</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {subTabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all border ${
                isActive
                  ? isDark
                    ? 'bg-lavender text-plum-dark border-lavender shadow-xs'
                    : 'bg-plum text-parchment border-plum shadow-xs'
                  : 'bg-surface border-borderSubtle text-content-secondary hover:text-content-primary hover:border-lavender'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              <span className={`px-2 py-0.2 rounded-full text-[10px] font-bold ${
                isActive
                  ? 'bg-surface/30 text-current'
                  : 'bg-lavender/15 text-lavender-dark dark:text-lavender'
              }`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Content Feed */}
      {activeList.length === 0 ? (
        <EmptyState
          title={`No items in ${subTabs.find(t => t.id === activeSubTab)?.label}`}
          description={
            activeSubTab === 'my_posts'
              ? 'You have not created any campus posts yet. Ask for help or share what you know!'
              : activeSubTab === 'my_responses'
              ? 'You have not responded to any peer help requests yet. Check out the Discover feed to offer help!'
              : activeSubTab === 'saved'
              ? 'You have not bookmarked any posts yet. Click the bookmark icon on any post to save it for later.'
              : 'You have not uploaded any study guides yet. Share your handwritten notes to earn points!'
          }
          actionLabel={activeSubTab === 'saved' ? 'Explore Discover' : 'Create a Post'}
          onAction={() => openCreateModalWithType('request')}
        />
      ) : (
        <div className="page-cards-stagger grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeList.map(post => (
            <PostCard
              key={post.id}
              post={post}
              onSelect={() => setSelectedPost(post)}
            />
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={!!deleteTargetId}
        title="Delete Post"
        message="Are you sure you want to remove this post from UniHive? This cannot be undone."
        confirmLabel="Delete"
        isDestructive={true}
        onConfirm={() => {
          if (deleteTargetId) {
            deletePost(deleteTargetId);
            setDeleteTargetId(null);
          }
        }}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};
