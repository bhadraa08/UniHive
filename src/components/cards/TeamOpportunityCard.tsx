import React from 'react';
import { Post } from '../../types';
import { useUniHive } from '../../context/UniHiveContext';
import { useTheme } from '../../context/ThemeContext';
import { UserAvatar } from '../common/UserAvatar';
import { 
  Users, 
  Calendar, 
  ArrowRight, 
  Bookmark, 
  Award 
} from 'lucide-react';

interface TeamOpportunityCardProps {
  post: Post;
  onApply: (post: Post) => void;
}

export const TeamOpportunityCard: React.FC<TeamOpportunityCardProps> = ({ post, onApply }) => {
  const { toggleSavePost } = useUniHive();
  const { isDark } = useTheme();
  const team = post.teamDetails;

  const filled = team?.filledSpots || 1;
  const total = team?.totalSpots || 4;
  const progressPercent = Math.min(100, Math.round((filled / total) * 100));

  return (
    <div
      onClick={() => onApply(post)}
      className={`rounded-2xl border p-5 hover:shadow-card transition-all duration-200 flex flex-col justify-between cursor-pointer group shadow-subtle ${
        isDark 
          ? 'bg-plum-surface border-plum-border hover:border-lavender/60' 
          : 'bg-surface border-borderSubtle hover:border-lavender'
      }`}
    >
      <div>
        {/* Header with event badge */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-terracotta/20 text-terracotta border border-terracotta/30 flex items-center gap-1">
              <Award className="w-3 h-3" />
              {team?.event || 'Campus Challenge'}
            </span>
            {team?.deadline && (
              <span className="text-[11px] text-content-muted flex items-center gap-1">
                <Calendar className="w-3 h-3 text-content-secondary" />
                {team.deadline}
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleSavePost(post.id);
            }}
            className={`p-1.5 rounded-lg transition-colors ${
              post.isSaved 
                ? 'text-terracotta bg-terracotta/15' 
                : 'text-content-muted hover:text-content-primary hover:bg-lavender/10'
            }`}
            title="Save team opportunity"
          >
            <Bookmark className={`w-4 h-4 ${post.isSaved ? 'fill-terracotta' : ''}`} />
          </button>
        </div>

        {/* Project Title */}
        <h3 className="font-display font-bold text-base md:text-lg text-content-primary group-hover:text-lavender transition-colors leading-snug mb-2">
          {post.title}
        </h3>

        {/* Description */}
        <p className="text-xs md:text-sm text-content-secondary line-clamp-3 leading-relaxed mb-4">
          {post.description}
        </p>

        {/* Roles Needed */}
        <div className="mb-4">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-content-muted mb-2">
            Open Roles Needed:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {(team?.rolesNeeded || []).map((role, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-surface-subtle text-content-primary border border-borderSubtle flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-success" />
                {role}
              </span>
            ))}
          </div>
        </div>

        {/* Team Spots Progress */}
        <div className={`p-3 rounded-xl border mb-4 ${
          isDark ? 'bg-plum-elevated/70 border-plum-border' : 'bg-surface-subtle border-borderSubtle'
        }`}>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-medium text-content-secondary flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-lavender" />
              Team Roster
            </span>
            <span className="font-bold text-success">
              {filled} of {total} filled
            </span>
          </div>
          <div className="w-full bg-borderSubtle h-2 rounded-full overflow-hidden">
            <div
              className="bg-success h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Footer / CTA */}
      <div className="pt-3 border-t border-borderSubtle/60 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <UserAvatar
            src={post.author.avatar}
            name={post.author.name}
            size="sm"
          />
          <div className="truncate">
            <span className="text-xs font-semibold text-content-primary block truncate">
              {post.author.name}
            </span>
            <span className="text-[10px] text-content-muted block truncate">
              {post.author.department}
            </span>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onApply(post);
          }}
          className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all shadow-subtle shrink-0 group/btn ${
            isDark
              ? 'bg-lavender text-plum-dark hover:bg-parchment'
              : 'bg-plum text-parchment hover:bg-plum-hover'
          }`}
        >
          <span>Express Interest</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform text-terracotta" />
        </button>
      </div>
    </div>
  );
};
