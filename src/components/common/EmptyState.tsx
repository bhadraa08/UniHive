import React from 'react';
import { LucideIcon, Search, Sparkles } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionText?: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryActionText?: string;
  onSecondaryAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = Search,
  title,
  description,
  actionText,
  actionLabel,
  onAction,
  secondaryActionText,
  onSecondaryAction
}) => {
  const { isDark } = useTheme();
  const primaryLabel = actionLabel || actionText;

  return (
    <div className={`flex flex-col items-center justify-center p-8 md:p-12 text-center rounded-3xl border my-6 max-w-xl mx-auto shadow-subtle transition-all ${
      isDark 
        ? 'bg-plum-surface/80 border-plum-border text-parchment' 
        : 'bg-surface/80 border-borderSubtle text-plum'
    }`}>
      <div className="w-14 h-14 rounded-2xl bg-lavender/20 flex items-center justify-center text-lavender mb-4 border border-lavender/30">
        <Icon className="w-7 h-7" />
      </div>

      <h3 className="font-display font-bold text-lg text-content-primary mb-1">
        {title}
      </h3>
      
      <p className="text-xs sm:text-sm text-content-secondary max-w-md mb-6 leading-relaxed">
        {description}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {primaryLabel && onAction && (
          <button
            onClick={onAction}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-subtle ${
              isDark
                ? 'bg-lavender text-plum-dark hover:bg-parchment'
                : 'bg-plum text-parchment hover:bg-plum-hover'
            }`}
          >
            <Sparkles className="w-4 h-4 text-terracotta" />
            <span>{primaryLabel}</span>
          </button>
        )}

        {secondaryActionText && onSecondaryAction && (
          <button
            onClick={onSecondaryAction}
            className="inline-flex items-center px-4 py-2 rounded-xl text-xs sm:text-sm font-medium bg-surface-subtle text-content-primary hover:bg-lavender/10 border border-borderSubtle transition-colors"
          >
            {secondaryActionText}
          </button>
        )}
      </div>
    </div>
  );
};
