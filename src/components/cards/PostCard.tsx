import React from 'react';
import { Post } from '../../types';
import { useUniHive } from '../../context/UniHiveContext';
import { useTheme } from '../../context/ThemeContext';
import { UserAvatar } from '../common/UserAvatar';
import { 
  Heart, 
  MessageSquare, 
  Bookmark, 
  MoreHorizontal
} from 'lucide-react';

interface PostCardProps {
  post: Post;
  onSelect?: () => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onSelect }) => {
  const { toggleSavePost, toggleLikePost, setSelectedPost } = useUniHive();
  const { isDark } = useTheme();

  const handleCardClick = () => {
    if (onSelect) {
      onSelect();
    } else {
      setSelectedPost(post);
    }
  };

  // Label for type in the subtitle: "2h ago • Ask for Help"
  const getTypeLabel = () => {
    switch (post.type) {
      case 'request':
        return 'Ask for Help';
      case 'resource':
        return 'Share Resource';
      case 'team':
        return 'Find Teammates';
      case 'lost-found':
        return 'Lost & Found';
      default:
        return 'Campus Post';
    }
  };

  // Primary action button label based on post type
  const getButtonLabel = () => {
    switch (post.type) {
      case 'request':
        return 'Offer Help';
      case 'resource':
        return 'View Resource';
      case 'team':
        return 'Join Team';
      case 'lost-found':
        return 'View Details';
      default:
        return 'View Details';
    }
  };

  const likes = post.likesCount ?? post.savesCount ?? 0;
  const comments = post.responsesCount ?? 0;

  return (
    <article
      onClick={handleCardClick}
      className={`dreamy-card rounded-2xl border p-5 transition-all duration-200 cursor-pointer flex flex-col justify-between group shadow-subtle hover:shadow-card ${
        isDark 
          ? 'bg-[#251F32] border-borderSubtle hover:border-lavender/50' 
          : 'bg-surface border-borderSubtle hover:border-lavender/50'
      }`}
    >
      <div>
        {/* Top Header: Author + Timestamp + Type + Three Dots */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <UserAvatar
              src={post.author?.avatar}
              name={post.author?.name}
              size="lg"
            />
            <div className="min-w-0">
              <h4 className="font-sans font-bold text-xs sm:text-sm text-content-primary truncate">
                {post.author?.name || 'Campus Peer'}
              </h4>
              <p className="text-[11px] text-content-secondary mt-0.2">
                {post.createdAt} • <span className="font-medium text-content-primary/80">{getTypeLabel()}</span>
              </p>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleSavePost(post.id);
            }}
            className="p-1.5 rounded-full text-content-muted hover:text-content-primary transition-colors"
            title="Options"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Post Title */}
        <h3 className="font-sans font-bold text-sm sm:text-base text-content-primary group-hover:text-lavender transition-colors leading-snug">
          {post.title}
        </h3>

        {/* Post Description */}
        <p className="text-xs sm:text-[13px] text-content-secondary mt-1.5 leading-relaxed line-clamp-3">
          {post.description}
        </p>

        {/* Tag Pills */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {(post.tags || []).map((tag, idx) => (
            <span
              key={idx}
              className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full border ${
                isDark 
                  ? 'bg-[#302640] text-content-secondary border-borderSubtle/60' 
                  : 'bg-[#F3E7DE]/70 text-content-secondary border-borderSubtle/60'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer: Likes, Comments, Bookmark & Action Button */}
      <div className="mt-4 pt-3.5 border-t border-borderSubtle/60 flex items-center justify-between gap-3">
        {/* Engagement Stats */}
        <div className="flex items-center gap-4 text-xs text-content-secondary">
          {/* Like Toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleLikePost(post.id);
            }}
            className={`flex items-center gap-1.5 transition-colors ${
              post.isLiked ? 'text-peach font-semibold' : 'hover:text-peach'
            }`}
            title="Like post"
          >
            <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-peach text-peach' : ''}`} />
            <span>{likes}</span>
          </button>

          {/* Comment Count */}
          <div className="flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4 text-content-muted" />
            <span>{comments}</span>
          </div>

          {/* Bookmark */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleSavePost(post.id);
            }}
            className={`transition-colors hidden sm:inline-block ${
              post.isSaved ? 'text-peach' : 'text-content-muted hover:text-content-primary'
            }`}
            title={post.isSaved ? 'Saved' : 'Save'}
          >
            <Bookmark className={`w-3.5 h-3.5 ${post.isSaved ? 'fill-peach' : ''}`} />
          </button>
        </div>

        {/* Primary Action Button (Offer Help, View Resource, Join Team, View Details) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleCardClick();
          }}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all shadow-subtle ${
            isDark
              ? 'bg-lavender text-[#191522] hover:bg-[#F7EFE8]'
              : 'bg-[#332B35] text-[#FFF9F1] hover:bg-[#211A29]'
          }`}
        >
          {getButtonLabel()}
        </button>
      </div>
    </article>
  );
};
