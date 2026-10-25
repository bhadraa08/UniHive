import React, { useState } from 'react';
import { useUniHive } from '../../context/UniHiveContext';
import { useTheme } from '../../context/ThemeContext';
import { TeamOpportunityCard } from '../cards/TeamOpportunityCard';
import { EmptyState } from '../common/EmptyState';
import { 
  Users, 
  UserPlus 
} from 'lucide-react';

export const TeammatesPage: React.FC = () => {
  const { posts, openCreateModalWithType, setSelectedPost, searchQuery } = useUniHive();
  const { isDark } = useTheme();

  const [selectedSkill, setSelectedSkill] = useState<string>('all');

  const teamPosts = posts.filter(p => p.type === 'team');

  const filteredTeams = teamPosts.filter(post => {
    // Skill filter
    if (selectedSkill !== 'all') {
      const hasSkill = post.teamDetails?.rolesNeeded.some(role => 
        role.toLowerCase().includes(selectedSkill.toLowerCase())
      ) || post.tags.some(t => t.toLowerCase().includes(selectedSkill.toLowerCase()));
      if (!hasSkill) return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        post.title.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q) ||
        post.teamDetails?.projectName.toLowerCase().includes(q) ||
        post.teamDetails?.event.toLowerCase().includes(q) ||
        post.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const popularSkills = [
    'all',
    'React',
    'UI/UX',
    'Figma',
    'ML',
    'Frontend',
    'Mobile'
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
            <Users className="w-4 h-4 text-terracotta" />
            <span>Campus Collaboration Hub</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-content-primary">
            Find Teammates & Hackathon Crews
          </h2>
          <p className="text-xs sm:text-sm text-content-secondary max-w-xl mt-1.5 leading-relaxed">
            Form balanced multidisciplinary teams. Match with coders, product designers, data scientists, 
            and presenters across departments and graduating classes.
          </p>
        </div>

        <button
          onClick={() => openCreateModalWithType('team')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all shadow-subtle shrink-0 ${
            isDark
              ? 'bg-lavender text-plum-dark hover:bg-parchment'
              : 'bg-plum text-parchment hover:bg-plum-hover'
          }`}
        >
          <UserPlus className="w-4 h-4 text-terracotta" />
          <span>Post Team Opening</span>
        </button>
      </div>

      {/* Skills Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs font-semibold text-content-muted shrink-0">
          Required Skill:
        </span>
        {popularSkills.map(skill => (
          <button
            key={skill}
            onClick={() => setSelectedSkill(skill)}
            className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
              selectedSkill === skill
                ? isDark
                  ? 'bg-lavender text-plum-dark font-bold border-lavender shadow-xs'
                  : 'bg-plum text-parchment font-bold border-plum shadow-xs'
                : 'bg-surface border-borderSubtle text-content-secondary hover:text-content-primary'
            }`}
          >
            {skill === 'all' ? 'All Skills' : skill}
          </button>
        ))}
      </div>

      {/* Grid of Team Openings */}
      {filteredTeams.length === 0 ? (
        <EmptyState
          title="No teams match your skill filter"
          description={
            searchQuery
              ? `No team opportunities found matching "${searchQuery}". Reset filters to see all squads.`
              : 'No project teams currently need this skill set. Create your own team post to lead a new project!'
          }
          actionLabel="Create a Team Post"
          onAction={() => openCreateModalWithType('team')}
        />
      ) : (
        <div className="page-cards-stagger grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTeams.map(post => (
            <TeamOpportunityCard
              key={post.id}
              post={post}
              onApply={() => setSelectedPost(post)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
