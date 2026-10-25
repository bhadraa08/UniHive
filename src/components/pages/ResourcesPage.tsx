import React, { useState } from 'react';
import { useUniHive } from '../../context/UniHiveContext';
import { useTheme } from '../../context/ThemeContext';
import { ResourceCard } from '../cards/ResourceCard';
import { EmptyState } from '../common/EmptyState';
import { 
  BookOpen, 
  Upload
} from 'lucide-react';

export const ResourcesPage: React.FC = () => {
  const { posts, openCreateModalWithType, setSelectedPost, searchQuery } = useUniHive();
  const { isDark } = useTheme();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedFormat, setSelectedFormat] = useState<string>('all');

  const resourcePosts = posts.filter(p => p.type === 'resource');

  const filteredResources = resourcePosts.filter(post => {
    if (selectedCategory !== 'all' && post.category !== selectedCategory) return false;
    if (selectedFormat !== 'all' && post.resourceDetails?.fileType !== selectedFormat) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        post.title.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q) ||
        post.author.name.toLowerCase().includes(q) ||
        post.tags.some(t => t.toLowerCase().includes(q)) ||
        post.resourceDetails?.courseCode?.toLowerCase().includes(q) ||
        post.resourceDetails?.fileName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const formats = [
    { id: 'all', label: 'All Formats' },
    { id: 'pdf', label: 'PDF Documents' },
    { id: 'figma', label: 'Figma Kits' },
    { id: 'cheatsheet', label: 'Cheatsheets' },
    { id: 'code', label: 'Code & Repos' }
  ];

  const categories = [
    'all',
    'Computer Science',
    'Design & Tech',
    'Mathematics',
    'Engineering'
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
            <BookOpen className="w-4 h-4 text-terracotta" />
            <span>Shared Study Vault</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-content-primary">
            Academic Notes & Design Toolkits
          </h2>
          <p className="text-xs sm:text-sm text-content-secondary max-w-xl mt-1.5 leading-relaxed">
            Free, peer-verified study materials, high-yield exam summaries, and starter templates contributed by fellow students.
          </p>
        </div>

        <button
          onClick={() => openCreateModalWithType('resource')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all shadow-subtle shrink-0 ${
            isDark
              ? 'bg-lavender text-plum-dark hover:bg-parchment'
              : 'bg-plum text-parchment hover:bg-plum-hover'
          }`}
        >
          <Upload className="w-4 h-4 text-terracotta" />
          <span>Share a Resource (+25 pts)</span>
        </button>
      </div>

      {/* Format & Category Filter Chips */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {formats.map(fmt => (
            <button
              key={fmt.id}
              onClick={() => setSelectedFormat(fmt.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                selectedFormat === fmt.id
                  ? isDark
                    ? 'bg-lavender text-plum-dark border-lavender shadow-xs'
                    : 'bg-plum text-parchment border-plum shadow-xs'
                  : 'bg-surface border-borderSubtle text-content-secondary hover:text-content-primary'
              }`}
            >
              {fmt.label}
            </button>
          ))}

          <div className="h-4 w-px bg-borderSubtle shrink-0 mx-1" />

          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                selectedCategory === cat
                  ? isDark
                    ? 'bg-terracotta/20 text-terracotta border-terracotta'
                    : 'bg-terracotta/15 text-terracotta border-terracotta/40'
                  : 'bg-surface border-borderSubtle text-content-secondary hover:text-content-primary'
              }`}
            >
              {cat === 'all' ? 'All Subjects' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Resources */}
      {filteredResources.length === 0 ? (
        <EmptyState
          title="No study resources found"
          description={
            searchQuery
              ? `No resources match "${searchQuery}". Reset filters to browse all shared guides.`
              : 'No resources match the selected format and subject filters. Be the first to publish a study guide!'
          }
          actionLabel="Share First Resource"
          onAction={() => openCreateModalWithType('resource')}
        />
      ) : (
        <div className="page-cards-stagger grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredResources.map(post => (
            <ResourceCard
              key={post.id}
              post={post}
              onPreview={() => setSelectedPost(post)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
