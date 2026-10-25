import React, { useState, useEffect, useRef } from 'react';
import { StorybookCampusLandscape } from './StorybookCampusLandscape';
import { ThemeToggle } from '../common/ThemeToggle';
import { useTheme } from '../../context/ThemeContext';
import { ArrowRight, FastForward, Sparkles } from 'lucide-react';
import unihiveLogoIcon from '../../assets/unihive_logo_icon.png';
import unihiveLogoIconDark from '../../assets/unihive_logo_icon_dark.png';
import unihiveLogoWordmark from '../../assets/unihive_logo_wordmark.png';
import unihiveLogoWordmarkDark from '../../assets/unihive_logo_wordmark_dark.png';

interface IntroAnimationProps {
  onComplete: () => void;
}

export const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const { isDark } = useTheme();
  const [step, setStep] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);

  useEffect(() => {
    // Stage 1: 250ms -> campus landscape quietly reveals
    const t1 = setTimeout(() => setStep(1), 250);
    // Stage 2: 700ms -> official UniHive emblem emerges smoothly
    const t2 = setTimeout(() => setStep(2), 700);
    // Stage 3: 1400ms -> official wordmark and tagline reveal
    const t3 = setTimeout(() => setStep(3), 1400);
    // Stage 4: 2000ms -> editorial mission text & enter button activate
    const t4 = setTimeout(() => setStep(4), 2000);

    // Progress counter running smoothly over 3.2 seconds
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 60);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearInterval(interval);
    };
  }, []);

  const finishingRef = useRef<boolean>(false);

  const handleFinish = () => {
    if (finishingRef.current) return;
    finishingRef.current = true;
    setIsFadingOut(true);
    setTimeout(() => {
      onComplete();
    }, 400);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col justify-between overflow-hidden transition-opacity duration-500 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      } ${isDark ? 'bg-plum-dark text-parchment' : 'bg-parchment text-plum'}`}
    >
      {/* Top Header Controls: Skip & Theme Switcher */}
      <div className="relative z-20 flex items-center justify-between px-6 py-5 max-w-7xl mx-auto w-full">
        <button
          onClick={handleFinish}
          className={`flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-full transition-all ${
            isDark
              ? 'text-lavender hover:text-parchment bg-plum-surface/80 hover:bg-plum-surface border border-plum-border shadow-xs'
              : 'text-plum hover:text-plum/80 bg-surface/90 hover:bg-surface border border-borderSubtle shadow-subtle'
          }`}
          title="Skip intro and proceed"
        >
          <span>Skip Intro</span>
          <FastForward className="w-3.5 h-3.5" />
        </button>

        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>

      {/* Main Center Stage: Official Brand Presentation on 100% Transparent Canvas */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 text-center max-w-2xl mx-auto my-auto">
        {/* Animated Brand Presentation with soft dreamy glow, no white box */}
        <div className={`relative mb-4 sm:mb-6 transition-all duration-700 transform flex flex-col items-center justify-center ${
          step >= 2 ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
        }`}>
          {/* Subtle Dreamy Halo Glow (radial light, not a box) */}
          <div className={`absolute -inset-10 rounded-full blur-3xl pointer-events-none transition-opacity duration-1000 ${
            isDark ? 'bg-lavender/15' : 'bg-peach/25'
          }`} />

          {/* 1. Official Emblem on transparent background */}
          <div className={`relative z-10 flex justify-center transition-all duration-700 transform ${
            step >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}>
            <img
              src={isDark ? unihiveLogoIconDark : unihiveLogoIcon}
              alt="UniHive Emblem"
              className="w-20 sm:w-28 md:w-32 h-auto object-contain animate-soft-pulse"
            />
          </div>

          {/* 2. Official Wordmark & Tagline directly on transparent background */}
          <div className={`relative z-10 mt-3 sm:mt-5 transition-all duration-700 delay-100 transform ${
            step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}>
            <img
              src={isDark ? unihiveLogoWordmarkDark : unihiveLogoWordmark}
              alt="UniHive — Your campus. Your people. Your hive."
              className="w-48 sm:w-64 md:w-72 h-auto object-contain mx-auto"
            />
          </div>
        </div>

        {/* Editorial Subtext */}
        <div className={`transition-all duration-700 delay-150 transform ${
          step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
        }`}>
          <p className={`text-xs sm:text-sm max-w-md mx-auto leading-relaxed mb-4 sm:mb-6 font-medium ${
            isDark ? 'text-lavender/90' : 'text-plum/80'
          }`}>
            An editorial community connecting college peers through shared knowledge,
            collaborative projects, and genuine campus support.
          </p>

          {/* Action Button */}
          <button
            onClick={handleFinish}
            className={`group inline-flex items-center gap-3 px-6 sm:px-7 py-3 sm:py-3.5 rounded-2xl font-semibold text-xs sm:text-sm transition-all shadow-card hover:shadow-float active:scale-[0.98] ${
              isDark
                ? 'bg-parchment text-plum-dark hover:bg-white'
                : 'bg-plum text-parchment hover:bg-plum-hover'
            }`}
          >
            <Sparkles className="w-4 h-4 text-terracotta group-hover:rotate-12 transition-transform" />
            <span>Enter UniHive</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Atmospheric Storybook Campus Landscape Floor */}
      <div className={`relative z-0 w-full transition-opacity duration-1000 transform ${
        step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}>
        <div className="w-full h-36 sm:h-48 md:h-56 lg:h-64 xl:h-72 overflow-hidden">
          <StorybookCampusLandscape variant="intro" />
        </div>

        {/* Bottom progress indicator line */}
        <div className="w-full h-1 bg-black/5 dark:bg-white/5 relative z-10">
          <div
            className="h-full bg-gradient-to-r from-lavender via-terracotta to-lavender transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
