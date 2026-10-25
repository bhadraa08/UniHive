import React, { useState } from 'react';
import { getIllustratedAvatar, bhadraAvatar } from '../../utils/avatarMap';

export interface UserAvatarProps {
  src?: string | null;
  name?: string | null;
  alt?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'custom';
  className?: string;
  badge?: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  src,
  name,
  alt,
  size = 'md',
  className = '',
  badge,
  onClick
}) => {
  const [hasError, setHasError] = useState(false);

  // Compute resolved illustrated avatar
  const resolvedSrc = hasError 
    ? bhadraAvatar 
    : getIllustratedAvatar(src, name);

  const sizeClasses: Record<string, string> = {
    xs: 'w-6 h-6',
    sm: 'w-7 h-7',
    md: 'w-8 h-8',
    lg: 'w-9 h-9',
    xl: 'w-10 h-10',
    '2xl': 'w-20 h-20 md:w-24 md:h-24',
    custom: ''
  };

  const selectedSizeClass = sizeClasses[size] || sizeClasses.md;

  return (
    <div 
      className={`relative inline-block shrink-0 select-none ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <img
        src={resolvedSrc}
        alt={alt || name || 'Student avatar'}
        onError={() => setHasError(true)}
        className={`rounded-full object-cover border border-lavender/30 transition-all duration-200 ${selectedSizeClass} ${className}`}
        loading="lazy"
      />
      {badge && (
        <span className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4">
          {badge}
        </span>
      )}
    </div>
  );
};
