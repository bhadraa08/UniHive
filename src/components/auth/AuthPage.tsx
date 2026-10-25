import React, { useState, useRef } from 'react';
import { LoginForm } from './LoginForm';
import { RegistrationForm } from './RegistrationForm';
import { CampusIllustration } from '../common/CampusIllustration';
import { Logo } from '../common/Logo';
import { ThemeToggle } from '../common/ThemeToggle';
import { useTheme } from '../../context/ThemeContext';
import { 
  Sparkles, 
  BookOpen, 
  Users, 
  HelpCircle, 
  ArrowLeft 
} from 'lucide-react';

interface AuthPageProps {
  onLoginSuccess: (email: string) => void;
  onRegisterSuccess: (userData: {
    name: string;
    email: string;
    college: string;
    department: string;
    year: string;
  }) => void;
  onReplayIntro?: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({
  onLoginSuccess,
  onRegisterSuccess,
  onReplayIntro
}) => {
  const { isDark } = useTheme();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [isExiting, setIsExiting] = useState(false);

  const exitingRef = useRef(false);

  const handleLoginSuccess = (email: string) => {
    if (exitingRef.current) return;
    exitingRef.current = true;
    setIsExiting(true);
    setTimeout(() => {
      onLoginSuccess(email);
    }, 220);
  };

  const handleRegisterSuccess = (userData: {
    name: string;
    email: string;
    college: string;
    department: string;
    year: string;
  }) => {
    if (exitingRef.current) return;
    exitingRef.current = true;
    setIsExiting(true);
    setTimeout(() => {
      onRegisterSuccess(userData);
    }, 220);
  };

  return (
    <div className={`min-h-screen flex flex-col justify-between selection:bg-lavender selection:text-plum relative overflow-hidden ${
      isExiting ? 'animate-page-exit-up pointer-events-none' : 'animate-page-enter-fade'
    } ${
      isDark ? 'bg-plum-dark text-parchment' : 'bg-parchment text-plum'
    }`}>
      {/* Theme-Aware Atmospheric Entrance/Exit Glow Sweep */}
      <div
        className="pointer-events-none fixed top-0 left-0 right-0 h-48 z-10 opacity-70 transition-opacity duration-500"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(128, 96, 189, 0.3) 0%, rgba(169, 138, 219, 0.15) 45%, transparent 80%)'
            : 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(200, 176, 240, 0.35) 0%, rgba(243, 195, 174, 0.2) 50%, transparent 80%)'
        }}
        aria-hidden="true"
      />
      {/* Top Navigation Bar: Brand, Replay Intro & Theme Switcher */}
      <header className="px-5 sm:px-8 py-4 border-b border-borderSubtle/60 flex items-center justify-between z-20">
        <div className="flex items-center gap-4">
          <Logo size="md" showTagline={true} />
          {onReplayIntro && (
            <button
              onClick={onReplayIntro}
              className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-semibold text-content-secondary hover:text-content-primary px-2.5 py-1 rounded-full border border-borderSubtle/70 hover:border-lavender transition-all"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Watch Brand Intro</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle showLabel={false} />
        </div>
      </header>

      {/* Main Split Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex items-center justify-center">
        <div className={`w-full rounded-3xl border overflow-hidden shadow-card grid grid-cols-1 lg:grid-cols-12 transition-all ${
          isDark 
            ? 'bg-plum-surface border-plum-border' 
            : 'bg-surface border-borderSubtle'
        }`}>
          {/* Left Column: Campus Illustration & Editorial Brand Panel (Desktop) */}
          <div className="lg:col-span-6 relative flex flex-col justify-between p-6 sm:p-10 border-b lg:border-b-0 lg:border-r border-borderSubtle/70 overflow-hidden bg-gradient-to-br from-lavender/10 via-transparent to-terracotta/10">
            {/* Top Brand Quote */}
            <div className="relative z-10 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-lavender/20 text-lavender-dark dark:text-lavender border border-lavender/30">
                <Sparkles className="w-3.5 h-3.5 text-terracotta" />
                <span>The Student Community Hive</span>
              </div>

              <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl tracking-tight leading-snug">
                Your campus gets better when we help each other.
              </h2>

              <p className="text-xs sm:text-sm text-content-secondary max-w-md leading-relaxed">
                UniHive brings college life together: resolve tough questions in the Help Loop, 
                share peer notes, team up for hackathons, and reunite lost student essentials.
              </p>
            </div>

            {/* Campus Artwork Scene */}
            <div className="my-6 relative z-10 w-full rounded-2xl overflow-hidden border border-borderSubtle/60 shadow-subtle">
              <CampusIllustration variant="auth" height={300} />
            </div>

            {/* Live Community Proof Metrics */}
            <div className="relative z-10 grid grid-cols-3 gap-2.5 pt-4 border-t border-borderSubtle/60">
              <div className="p-2.5 rounded-xl bg-surface/70 border border-borderSubtle/50 text-center">
                <div className="flex items-center justify-center gap-1 text-terracotta font-bold text-base sm:text-lg">
                  <HelpCircle className="w-4 h-4" />
                  <span>98%</span>
                </div>
                <div className="text-[10px] text-content-secondary mt-0.5 font-medium">
                  Help Loop Solved
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-surface/70 border border-borderSubtle/50 text-center">
                <div className="flex items-center justify-center gap-1 text-lavender font-bold text-base sm:text-lg">
                  <BookOpen className="w-4 h-4" />
                  <span>340+</span>
                </div>
                <div className="text-[10px] text-content-secondary mt-0.5 font-medium">
                  Peer Guides
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-surface/70 border border-borderSubtle/50 text-center">
                <div className="flex items-center justify-center gap-1 text-success font-bold text-base sm:text-lg">
                  <Users className="w-4 h-4" />
                  <span>18 min</span>
                </div>
                <div className="text-[10px] text-content-secondary mt-0.5 font-medium">
                  Avg. Response
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Form (Login vs Registration) */}
          <div className="lg:col-span-6 p-6 sm:p-10 flex items-center justify-center">
            <div key={mode} className="w-full max-w-md animate-fadeIn">
              {mode === 'login' ? (
                <LoginForm
                  onSuccess={handleLoginSuccess}
                  onSwitchToRegister={() => setMode('register')}
                />
              ) : (
                <RegistrationForm
                  onSuccess={handleRegisterSuccess}
                  onSwitchToLogin={() => setMode('login')}
                />
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-4 text-center text-xs text-content-secondary border-t border-borderSubtle/60">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl mx-auto">
          <span>UniHive — Velvet Lavender Competition Edition</span>
          <span className="font-mono text-[11px]">Designed for college student connection • No backend required</span>
        </div>
      </footer>
    </div>
  );
};
