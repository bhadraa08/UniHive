import React, { useState, useEffect, useRef } from 'react';
import { TabType } from '../../types';
import { useTheme } from '../../context/ThemeContext';

interface PageTransitionProps {
  activeTab: TabType;
  children: React.ReactNode;
}

type TransitionDirection = 'slide-left' | 'slide-right' | 'slide-up' | 'slide-down' | 'fade';

export const PageTransition: React.FC<PageTransitionProps> = ({ activeTab, children }) => {
  const { isDark } = useTheme();

  const [displayedChildren, setDisplayedChildren] = useState<React.ReactNode>(children);
  const [displayedTab, setDisplayedTab] = useState<TabType>(activeTab);
  const [phase, setPhase] = useState<'idle' | 'leaving' | 'entering'>('idle');
  const [direction, setDirection] = useState<TransitionDirection>('slide-left');
  
  const prevTabRef = useRef<TabType>(activeTab);
  const timerRef = useRef<number | null>(null);
  const safetyTimerRef = useRef<number | null>(null);
  const childrenRef = useRef<React.ReactNode>(children);

  useEffect(() => {
    childrenRef.current = children;
  }, [children]);

  useEffect(() => {
    if (activeTab === displayedTab) return;

    const prev = prevTabRef.current;
    prevTabRef.current = activeTab;

    // -------------------------------------------------------------
    // NAVIGATION DIRECTION DETERMINATION
    // -------------------------------------------------------------
    let dir: TransitionDirection = 'slide-left';

    // Discover to Ask for Help: gentle horizontal transition
    if (prev === 'discover' && activeTab === 'ask') {
      dir = 'slide-left';
    } else if (prev === 'ask' && activeTab === 'discover') {
      dir = 'slide-right';
    }
    // Discover to Resources: soft upward reveal
    else if (prev === 'discover' && activeTab === 'resources') {
      dir = 'slide-up';
    } else if (prev === 'resources' && activeTab === 'discover') {
      dir = 'slide-down';
    }
    // Discover to Find Teammates: horizontal transition with card stagger
    else if (prev === 'discover' && activeTab === 'teams') {
      dir = 'slide-left';
    } else if (prev === 'teams' && activeTab === 'discover') {
      dir = 'slide-right';
    }
    // Discover to Lost & Found: soft upward reveal
    else if (prev === 'discover' && activeTab === 'lost-found') {
      dir = 'slide-up';
    } else if (prev === 'lost-found' && activeTab === 'discover') {
      dir = 'slide-down';
    }
    // General hierarchy order for consistent spatial awareness
    else {
      const tabOrder: TabType[] = ['discover', 'ask', 'resources', 'teams', 'lost-found', 'activity', 'profile'];
      const prevIdx = tabOrder.indexOf(prev);
      const nextIdx = tabOrder.indexOf(activeTab);
      if (prevIdx !== -1 && nextIdx !== -1) {
        dir = nextIdx > prevIdx ? 'slide-left' : 'slide-right';
      }
    }

    setDirection(dir);
    setPhase('leaving');

    if (timerRef.current) clearTimeout(timerRef.current);
    if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);

    // Midpoint: Switch page DOM, scroll to top, start entering
    timerRef.current = window.setTimeout(() => {
      setDisplayedChildren(childrenRef.current);
      setDisplayedTab(activeTab);
      try {
        window.scrollTo({ top: 0, behavior: 'instant' });
      } catch {
        window.scrollTo(0, 0);
      }
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      setPhase('entering');

      // Finish: Settle into idle state (130ms outgoing + 260ms incoming = 390ms)
      timerRef.current = window.setTimeout(() => {
        setPhase('idle');
      }, 260);
    }, 130);

    // Absolute fallback timer: guarantees phase ALWAYS resets to idle
    safetyTimerRef.current = window.setTimeout(() => {
      setDisplayedChildren(childrenRef.current);
      setDisplayedTab(activeTab);
      setPhase('idle');
    }, 450);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
    };
  }, [activeTab, displayedTab]);

  // Map phase and direction to hardware-accelerated CSS animation classes
  const getAnimationClass = () => {
    if (phase === 'leaving') {
      switch (direction) {
        case 'slide-left': return 'animate-page-exit-left';
        case 'slide-right': return 'animate-page-exit-right';
        case 'slide-up': return 'animate-page-exit-up';
        case 'slide-down': return 'animate-page-exit-down';
        default: return 'animate-page-exit-fade';
      }
    }
    if (phase === 'entering') {
      switch (direction) {
        case 'slide-left': return 'animate-page-enter-left';
        case 'slide-right': return 'animate-page-enter-right';
        case 'slide-up': return 'animate-page-enter-up';
        case 'slide-down': return 'animate-page-enter-down';
        default: return 'animate-page-enter-fade';
      }
    }
    return '';
  };

  return (
    <div className="relative w-full min-h-[calc(100vh-140px)]">
      {/* -------------------------------------------------------------
          THEME-AWARE ATMOSPHERIC GLOW VEIL
          Light: Soft lavender (#E9DDF8), pale violet (#C8B0F0), peach (#F3C3AE), warm ivory (#FFF9F1)
          Dark: Deep plum (#1D1524), dark violet (#281B32), muted lavender (#A98ADB), soft violet (#8060BD), champagne (#F0C58E)
         ----------------------------------------------------------- */}
      <div
        className={`pointer-events-none fixed top-0 left-0 right-0 h-44 z-20 transition-opacity duration-300 ease-out ${
          phase !== 'idle' ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: isDark
            ? 'radial-gradient(ellipse 90% 70% at 50% 0%, rgba(128, 96, 189, 0.28) 0%, rgba(169, 138, 219, 0.16) 40%, rgba(29, 21, 36, 0.05) 75%, transparent 100%)'
            : 'radial-gradient(ellipse 90% 70% at 50% 0%, rgba(200, 176, 240, 0.32) 0%, rgba(243, 195, 174, 0.18) 45%, rgba(255, 249, 241, 0.05) 80%, transparent 100%)'
        }}
        aria-hidden="true"
      />

      {/* Main Animated Page Content - NEVER blocked by pointer-events-none */}
      <div
        key={displayedTab}
        className={`w-full ${getAnimationClass()}`}
      >
        {phase === 'idle' ? children : displayedChildren}
      </div>
    </div>
  );
};
