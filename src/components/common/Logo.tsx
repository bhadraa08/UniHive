import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import unihiveLogoFull from '../../assets/unihive_logo_full.png';
import unihiveLogoFullDark from '../../assets/unihive_logo_full_dark.png';
import unihiveLogoHorizontal from '../../assets/unihive_logo_horizontal.png';
import unihiveLogoHorizontalDark from '../../assets/unihive_logo_horizontal_dark.png';
import unihiveLogoCompact from '../../assets/unihive_logo_horizontal_compact.png';
import unihiveLogoCompactDark from '../../assets/unihive_logo_horizontal_compact_dark.png';
import unihiveLogoIcon from '../../assets/unihive_logo_icon.png';
import unihiveLogoIconDark from '../../assets/unihive_logo_icon_dark.png';

export interface LogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  variant?: 'horizontal' | 'stacked' | 'icon';
  showTagline?: boolean;
  animated?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  variant,
  showTagline = true,
  animated = false,
  className = ''
}) => {
  const { isDark } = useTheme();

  // If size is hero or lg and variant not explicitly given, default to stacked
  const effectiveVariant = variant || (size === 'hero' ? 'stacked' : 'horizontal');

  // Select the theme-appropriate genuinely transparent logo asset
  let logoSrc = isDark ? unihiveLogoHorizontalDark : unihiveLogoHorizontal;
  if (effectiveVariant === 'icon') {
    logoSrc = isDark ? unihiveLogoIconDark : unihiveLogoIcon;
  } else if (effectiveVariant === 'stacked') {
    logoSrc = isDark ? unihiveLogoFullDark : unihiveLogoFull;
  } else {
    // horizontal
    logoSrc = showTagline 
      ? (isDark ? unihiveLogoHorizontalDark : unihiveLogoHorizontal) 
      : (isDark ? unihiveLogoCompactDark : unihiveLogoCompact);
  }

  // Size mapping for horizontal lockup (height controlled, width auto)
  const horizontalSizes = {
    xs: 'h-6 w-auto max-w-[130px]',
    sm: 'h-8 w-auto max-w-[160px]',
    md: 'h-9 sm:h-10 w-auto max-w-[195px]',
    lg: 'h-11 sm:h-12 w-auto max-w-[230px]',
    xl: 'h-14 sm:h-16 w-auto max-w-[280px]',
    hero: 'h-20 sm:h-24 w-auto max-w-[340px]'
  };

  // Size mapping for stacked lockup
  const stackedSizes = {
    xs: 'w-24 h-auto',
    sm: 'w-28 h-auto',
    md: 'w-36 h-auto',
    lg: 'w-44 h-auto',
    xl: 'w-56 h-auto',
    hero: 'w-56 sm:w-64 md:w-72 h-auto'
  };

  // Size mapping for icon-only
  const iconSizes = {
    xs: 'h-6 w-auto',
    sm: 'h-8 w-auto',
    md: 'h-10 w-auto',
    lg: 'h-14 w-auto',
    xl: 'h-18 w-auto',
    hero: 'h-24 w-auto'
  };

  const currentSizeClass = effectiveVariant === 'icon' 
    ? iconSizes[size] 
    : effectiveVariant === 'stacked' 
      ? stackedSizes[size] 
      : horizontalSizes[size];

  return (
    <div
      className={`inline-flex items-center justify-start shrink-0 select-none bg-transparent ${className}`}
    >
      <img
        src={logoSrc}
        alt="UniHive — Your campus. Your people. Your hive."
        className={`object-contain transition-transform duration-300 ${currentSizeClass} ${
          animated ? 'animate-soft-pulse' : ''
        }`}
      />
    </div>
  );
};
