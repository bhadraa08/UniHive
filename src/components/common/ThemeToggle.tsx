import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '', showLabel = false }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`relative inline-flex items-center gap-2 p-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-lavender ${
        isDark 
          ? 'bg-plum-surface hover:bg-plum-elevated text-lavender border border-plum-border shadow-sm' 
          : 'bg-surface hover:bg-surface-elevated text-plum border border-borderSubtle shadow-subtle'
      } ${className}`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {isDark ? (
          <Moon className="w-4 h-4 text-lavender transition-transform duration-300 rotate-0 scale-100" />
        ) : (
          <Sun className="w-4 h-4 text-terracotta transition-transform duration-300 rotate-0 scale-100" />
        )}
      </div>

      {showLabel && (
        <span className="text-xs font-medium pr-1 select-none">
          {isDark ? 'Dusk Theme' : 'Dawn Theme'}
        </span>
      )}
    </button>
  );
};
