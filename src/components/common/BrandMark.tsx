import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import unihiveLogoIcon from '../../assets/unihive_logo_icon.png';
import unihiveLogoIconDark from '../../assets/unihive_logo_icon_dark.png';

interface BrandMarkProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  animated?: boolean;
  className?: string;
}

export const BrandMark: React.FC<BrandMarkProps> = ({
  size = 'md',
  animated = false,
  className = ''
}) => {
  const { isDark } = useTheme();

  const dimensions = {
    xs: 'w-6 h-auto',
    sm: 'w-8 h-auto',
    md: 'w-10 h-auto',
    lg: 'w-14 h-auto',
    xl: 'w-20 h-auto',
    hero: 'w-28 sm:w-32 h-auto'
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${
        isDark ? 'drop-shadow-[0_2px_12px_rgba(255,255,255,0.15)]' : ''
      } ${className}`}
      aria-label="UniHive Official Brandmark"
    >
      <img
        src={isDark ? unihiveLogoIconDark : unihiveLogoIcon}
        alt="UniHive Official Brandmark"
        className={`object-contain transition-transform duration-300 ${dimensions[size]} ${
          animated ? 'animate-soft-pulse' : ''
        }`}
      />
    </div>
  );
};
