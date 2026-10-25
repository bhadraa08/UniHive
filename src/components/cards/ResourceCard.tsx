import React from 'react';
import { Post } from '../../types';
import { useUniHive } from '../../context/UniHiveContext';
import { useTheme } from '../../context/ThemeContext';
import { UserAvatar } from '../common/UserAvatar';
import { 
  Download, 
  Bookmark 
} from 'lucide-react';

interface ResourceCardProps {
  post: Post;
  onPreview: (post: Post) => void;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ post, onPreview }) => {
  const { toggleSavePost, addToast } = useUniHive();
  const { isDark } = useTheme();
  const res = post.resourceDetails;

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToast({
      type: 'success',
      title: 'Resource Downloaded',
      message: `Downloaded "${res?.fileName || post.title}". Happy studying!`
    });
  };

  const getFormatBadge = (fileType?: string) => {
    switch (fileType) {
      case 'pdf':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-error/15 text-error border border-error/25">PDF</span>;
      case 'figma':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-lavender/20 text-lavender-dark dark:text-lavender border border-lavender/30">FIGMA</span>;
      case 'code':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-success/20 text-success border border-success/30">CODE</span>;
      case 'slides':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-terracotta/20 text-terracotta border border-terracotta/30">SLIDES</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-surface-subtle text-content-secondary border border-borderSubtle">NOTES</span>;
    }
  };

  return (
    <div
      onClick={() => onPreview(post)}
      className={`rounded-2xl border p-5 hover:shadow-card transition-all duration-200 flex flex-col justify-between cursor-pointer group shadow-subtle ${
        isDark 
          ? 'bg-plum-surface border-plum-border hover:border-lavender/60' 
          : 'bg-surface border-borderSubtle hover:border-lavender'
      }`}
    >
      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            {getFormatBadge(res?.fileType)}
            {res?.courseCode && (
              <span className="text-xs font-semibold text-lavender-dark dark:text-lavender bg-lavender/15 px-2 py-0.5 rounded-md border border-lavender/20">
                {res.courseCode}
              </span>
            )}
            <span className="text-xs text-content-muted">
              {res?.fileSize}
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
            title="Bookmark resource"
          >
            <Bookmark className={`w-4 h-4 ${post.isSaved ? 'fill-terracotta' : ''}`} />
          </button>
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-base text-content-primary group-hover:text-lavender transition-colors leading-snug mb-2 line-clamp-2">
          {post.title}
        </h3>

        {/* Summary */}
        <p className="text-xs text-content-secondary line-clamp-2 leading-relaxed mb-4">
          {res?.previewSummary || post.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {post.tags.map(tag => (
            <span
              key={tag}
              className="text-[10px] font-medium text-content-secondary px-2 py-0.5 rounded-md bg-surface-subtle border border-borderSubtle/60"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Info & Actions */}
      <div className="pt-3 border-t border-borderSubtle/60 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <UserAvatar
            src={post.author.avatar}
            name={post.author.name}
            size="xs"
          />
          <span className="text-xs font-medium text-content-secondary truncate">
            {post.author.name}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleDownload}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shadow-subtle ${
              isDark
                ? 'bg-lavender text-plum-dark hover:bg-parchment'
                : 'bg-plum text-parchment hover:bg-plum-hover'
            }`}
          >
            <Download className="w-3.5 h-3.5 text-terracotta" />
            <span>Download</span>
          </button>
        </div>
      </div>
    </div>
  );
};
