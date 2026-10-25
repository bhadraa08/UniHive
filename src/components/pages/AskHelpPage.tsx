import React, { useState } from 'react';
import { useUniHive } from '../../context/UniHiveContext';
import { useTheme } from '../../context/ThemeContext';
import { PostCard } from '../cards/PostCard';
import { EmptyState } from '../common/EmptyState';
import { 
  HelpCircle, 
  Plus, 
  AlertCircle, 
  CheckCircle2, 
  Filter
} from 'lucide-react';

export const AskHelpPage: React.FC = () => {
  const { posts, openCreateModalWithType, searchQuery, setSelectedPost } = useUniHive();
  const { isDark } = useTheme();

  const [urgencyFilter, setUrgencyFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'open' | 'resolved'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const helpRequests = posts.filter(p => p.type === 'request');

  const filteredRequests = helpRequests.filter(req => {
    if (urgencyFilter !== 'all' && req.urgency !== urgencyFilter) return false;
    if (statusFilter === 'open' && req.status === 'resolved') return false;
    if (statusFilter === 'resolved' && req.status !== 'resolved') return false;
    if (selectedCategory !== 'all' && req.category !== selectedCategory) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        req.title.toLowerCase().includes(q) ||
        req.description.toLowerCase().includes(q) ||
        req.author.name.toLowerCase().includes(q) ||
        req.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const urgentCount = helpRequests.filter(r => r.urgency === 'urgent' && r.status !== 'resolved').length;
  const openCount = helpRequests.filter(r => r.status !== 'resolved').length;
  const resolvedCount = helpRequests.filter(r => r.status === 'resolved').length;

  const categories = [
    'all',
    'Computer Science',
    'Mathematics',
    'Engineering',
    'Design & Tech',
    'Campus Life'
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner / Callout */}
      <div className={`page-header-reveal rounded-3xl border p-6 sm:p-8 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all ${
        isDark 
          ? 'bg-plum-surface border-plum-border' 
          : 'bg-surface border-borderSubtle'
      }`}>
        <div>
          <div className="flex items-center gap-2 mb-1.5 text-lavender font-bold text-xs uppercase tracking-wider font-mono">
            <HelpCircle className="w-4 h-4 text-terracotta" />
            <span>Campus Help Loop</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-content-primary">
            Ask for Help & Peer Support
          </h2>
          <p className="text-xs sm:text-sm text-content-secondary max-w-xl mt-1.5 leading-relaxed">
            Stuck on complex code, mathematical proofs, or need to borrow laboratory gear? 
            Ask your campus community and pay it forward when you can.
          </p>
        </div>

        <button
          onClick={() => openCreateModalWithType('request')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all shadow-subtle shrink-0 ${
            isDark
              ? 'bg-lavender text-plum-dark hover:bg-parchment'
              : 'bg-plum text-parchment hover:bg-plum-hover'
          }`}
        >
          <Plus className="w-4 h-4 text-terracotta" />
          <span>Ask a Question</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <button
          onClick={() => setStatusFilter(statusFilter === 'open' ? 'all' : 'open')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            statusFilter === 'open' 
              ? 'bg-lavender/20 border-lavender shadow-xs' 
              : isDark
                ? 'bg-plum-surface border-plum-border hover:border-lavender/50'
                : 'bg-surface border-borderSubtle hover:border-lavender'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-content-secondary">Awaiting Help</span>
            <span className="w-2 h-2 rounded-full bg-lavender animate-pulse" />
          </div>
          <div className="text-2xl font-bold font-display text-content-primary mt-1">
            {openCount}
          </div>
          <span className="text-[11px] text-content-muted">Open student requests</span>
        </button>

        <button
          onClick={() => setUrgencyFilter(urgencyFilter === 'urgent' ? 'all' : 'urgent')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            urgencyFilter === 'urgent' 
              ? 'bg-terracotta/20 border-terracotta shadow-xs' 
              : isDark
                ? 'bg-plum-surface border-plum-border hover:border-terracotta/50'
                : 'bg-surface border-borderSubtle hover:border-terracotta/50'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-terracotta">Urgent Priority</span>
            <AlertCircle className="w-4 h-4 text-error" />
          </div>
          <div className="text-2xl font-bold font-display text-error mt-1">
            {urgentCount}
          </div>
          <span className="text-[11px] text-content-muted">Exams or tight deadlines</span>
        </button>

        <button
          onClick={() => setStatusFilter(statusFilter === 'resolved' ? 'all' : 'resolved')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            statusFilter === 'resolved' 
              ? 'bg-success/20 border-success shadow-xs' 
              : isDark
                ? 'bg-plum-surface border-plum-border hover:border-success/50'
                : 'bg-surface border-borderSubtle hover:border-success/50'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-success">Resolved Loops</span>
            <CheckCircle2 className="w-4 h-4 text-success" />
          </div>
          <div className="text-2xl font-bold font-display text-success mt-1">
            {resolvedCount}
          </div>
          <span className="text-[11px] text-content-muted">Successfully closed with help</span>
        </button>
      </div>

      {/* Filter Chips Bar */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs font-semibold text-content-muted flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            Filter:
          </span>

          <button
            onClick={() => {
              setStatusFilter('all');
              setUrgencyFilter('all');
              setSelectedCategory('all');
            }}
            className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
              statusFilter === 'all' && urgencyFilter === 'all' && selectedCategory === 'all'
                ? isDark
                  ? 'bg-lavender text-plum-dark font-bold border-lavender'
                  : 'bg-plum text-parchment font-bold border-plum'
                : 'bg-surface border-borderSubtle text-content-secondary hover:text-content-primary'
            }`}
          >
            All Questions
          </button>

          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                selectedCategory === cat
                  ? isDark
                    ? 'bg-lavender text-plum-dark font-bold border-lavender'
                    : 'bg-plum text-parchment font-bold border-plum'
                  : 'bg-surface border-borderSubtle text-content-secondary hover:text-content-primary'
              }`}
            >
              {cat === 'all' ? 'All Subjects' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Questions Feed */}
      {filteredRequests.length === 0 ? (
        <EmptyState
          title="No help requests found"
          description={
            searchQuery
              ? `No requests match "${searchQuery}". Reset filters to see all campus queries.`
              : 'There are no open requests matching your active filters. If you have an academic question, ask the Hive!'
          }
          actionLabel="Ask a Question"
          onAction={() => openCreateModalWithType('request')}
        />
      ) : (
        <div className="page-cards-stagger grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredRequests.map(post => (
            <PostCard
              key={post.id}
              post={post}
              onSelect={() => setSelectedPost(post)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
