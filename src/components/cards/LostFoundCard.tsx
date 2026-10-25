import React from 'react';
import { Post } from '../../types';
import { useUniHive } from '../../context/UniHiveContext';
import { useTheme } from '../../context/ThemeContext';
import { UserAvatar } from '../common/UserAvatar';
import { 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  HelpCircle, 
  MessageSquare, 
  Bookmark 
} from 'lucide-react';

interface LostFoundCardProps {
  post: Post;
  onClaim: (post: Post) => void;
}

export const LostFoundCard: React.FC<LostFoundCardProps> = ({ post, onClaim }) => {
  const { toggleSavePost } = useUniHive();
  const { isDark } = useTheme();
  const item = post.lostFoundDetails;
  const isFound = item?.itemType === 'found';
  const isReunited = item?.isReunited || post.status === 'resolved';

  return (
    <div
      onClick={() => onClaim(post)}
      className={`rounded-2xl border p-5 hover:shadow-card transition-all duration-200 flex flex-col justify-between cursor-pointer group shadow-subtle ${
        isDark 
          ? 'bg-plum-surface border-plum-border hover:border-lavender/60' 
          : 'bg-surface border-borderSubtle hover:border-lavender'
      }`}
    >
      <div>
        {/* Status Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            {isReunited ? (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-success/20 text-success border border-success/30 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Reunited
              </span>
            ) : isFound ? (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-success/15 text-success border border-success/30 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Found Item
              </span>
            ) : (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-terracotta/20 text-terracotta border border-terracotta/30 flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5" />
                Lost Item
              </span>
            )}

            <span className="text-xs font-medium text-content-secondary px-2 py-0.5 rounded-md bg-surface-subtle border border-borderSubtle">
              {item?.itemCategory || 'Personal'}
            </span>
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
            title="Save post"
          >
            <Bookmark className={`w-4 h-4 ${post.isSaved ? 'fill-terracotta' : ''}`} />
          </button>
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-base md:text-lg text-content-primary group-hover:text-lavender transition-colors leading-snug mb-2">
          {post.title}
        </h3>

        {/* Description */}
        <p className="text-xs md:text-sm text-content-secondary line-clamp-3 leading-relaxed mb-4">
          {post.description}
        </p>

        {/* Location & Time info box */}
        <div className={`p-3 rounded-xl border space-y-2 mb-4 text-xs ${
          isDark ? 'bg-plum-elevated/70 border-plum-border' : 'bg-surface-subtle border-borderSubtle'
        }`}>
          <div className="flex items-center gap-2 text-content-secondary">
            <MapPin className="w-3.5 h-3.5 text-terracotta shrink-0" />
            <span className="font-medium text-content-primary truncate">
              {item?.location || 'Campus Quad'}
            </span>
          </div>

          <div className="flex items-center gap-2 text-content-muted text-[11px]">
            <Calendar className="w-3.5 h-3.5 text-content-secondary shrink-0" />
            <span>Reported {item?.dateReported || post.createdAt}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-borderSubtle/60 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <UserAvatar
            src={post.author.avatar}
            name={post.author.name}
            size="xs"
          />
          <span className="text-xs text-content-secondary truncate">
            Reported by {post.author.name}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onClaim(post);
          }}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all shadow-subtle shrink-0 ${
            isDark
              ? 'bg-plum-elevated border-plum-border hover:border-lavender text-lavender'
              : 'bg-surface border-borderSubtle hover:border-lavender text-content-primary'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5 text-terracotta" />
          <span>{isFound ? 'Claim This' : 'I Found This'}</span>
        </button>
      </div>
    </div>
  );
};
