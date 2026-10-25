import React, { useState } from 'react';
import { useUniHive } from '../../context/UniHiveContext';
import { useTheme } from '../../context/ThemeContext';
import { LostFoundCard } from '../cards/LostFoundCard';
import { EmptyState } from '../common/EmptyState';
import { 
  MapPin, 
  Plus 
} from 'lucide-react';

export const LostFoundPage: React.FC = () => {
  const { posts, openCreateModalWithType, setSelectedPost, searchQuery } = useUniHive();
  const { isDark } = useTheme();

  const [typeFilter, setTypeFilter] = useState<'all' | 'lost' | 'found'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const lfPosts = posts.filter(p => p.type === 'lost-found');

  const filteredPosts = lfPosts.filter(post => {
    const item = post.lostFoundDetails;
    if (!item) return false;

    if (typeFilter !== 'all' && item.itemType !== typeFilter) return false;
    if (categoryFilter !== 'all' && item.itemCategory !== categoryFilter) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        post.title.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q) ||
        item.itemCategory.toLowerCase().includes(q) ||
        post.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const categories = [
    'all',
    'Electronics',
    'IDs & Cards',
    'Personal Accessories',
    'Stationery & Books'
  ];

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
            <MapPin className="w-4 h-4 text-terracotta" />
            <span>Campus Care Desk</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-content-primary">
            Lost & Found Desk
          </h2>
          <p className="text-xs sm:text-sm text-content-secondary max-w-xl mt-1.5 leading-relaxed">
            Misplaced a student ID, headphones, or locker keys? Report items with verified campus security pickup locations.
          </p>
        </div>

        <button
          onClick={() => openCreateModalWithType('lost-found')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all shadow-subtle shrink-0 ${
            isDark
              ? 'bg-lavender text-plum-dark hover:bg-parchment'
              : 'bg-plum text-parchment hover:bg-plum-hover'
          }`}
        >
          <Plus className="w-4 h-4 text-terracotta" />
          <span>Report Item</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className={`rounded-2xl border p-3.5 shadow-subtle flex flex-wrap items-center justify-between gap-3 ${
        isDark ? 'bg-plum-surface border-plum-border' : 'bg-surface border-borderSubtle'
      }`}>
        {/* Type Toggles */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTypeFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              typeFilter === 'all'
                ? isDark
                  ? 'bg-lavender text-plum-dark font-bold'
                  : 'bg-plum text-parchment font-bold'
                : 'text-content-secondary hover:text-content-primary'
            }`}
          >
            All Items
          </button>
          <button
            onClick={() => setTypeFilter('lost')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              typeFilter === 'lost'
                ? 'bg-terracotta text-white font-bold'
                : 'text-content-secondary hover:text-content-primary'
            }`}
          >
            Lost by Students
          </button>
          <button
            onClick={() => setTypeFilter('found')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              typeFilter === 'found'
                ? 'bg-success text-white font-bold'
                : 'text-content-secondary hover:text-content-primary'
            }`}
          >
            Found & Handed In
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
                categoryFilter === cat
                  ? isDark
                    ? 'bg-plum-elevated text-lavender border-lavender'
                    : 'bg-surface-elevated text-plum border-plum font-bold'
                  : 'border-borderSubtle text-content-secondary hover:text-content-primary'
              }`}
            >
              {cat === 'all' ? 'All Categories' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Lost & Found Posts */}
      {filteredPosts.length === 0 ? (
        <EmptyState
          title="No lost & found reports"
          description={
            searchQuery
              ? `No items match "${searchQuery}". Reset filters to review all reports.`
              : 'There are no active lost or found items under this category. Help report items you find on campus!'
          }
          actionLabel="Report an Item"
          onAction={() => openCreateModalWithType('lost-found')}
        />
      ) : (
        <div className="page-cards-stagger grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPosts.map(post => (
            <LostFoundCard
              key={post.id}
              post={post}
              onClaim={() => setSelectedPost(post)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
