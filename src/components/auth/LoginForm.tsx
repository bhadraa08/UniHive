import React, { useState } from 'react';
import { Eye, EyeOff, LogIn, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface LoginFormProps {
  onSuccess: (email: string) => void;
  onSwitchToRegister: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, onSwitchToRegister }) => {
  const { isDark } = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs: { email?: string; password?: string } = {};
    if (!email.trim()) {
      errs.email = 'Please enter your campus email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please enter a valid email address (e.g. alex@campus.edu).';
    }

    if (!password) {
      errs.password = 'Password is required.';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess(email);
    }, 600);
  };

  const handleJudgeDemoAccess = () => {
    setEmail('bhadra@campus.edu');
    setPassword('unihive2026');
    setErrors({});
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess('bhadra@campus.edu');
    }, 400);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      {/* Editorial Title Block */}
      <div>
        <span className="text-xs font-semibold tracking-wider uppercase text-lavender font-mono">
          Student Portal
        </span>
        <h2 className={`font-display font-bold text-2xl sm:text-3xl tracking-tight mt-1 ${
          isDark ? 'text-parchment' : 'text-plum'
        }`}>
          Welcome back.
        </h2>
        <p className="text-xs sm:text-sm text-content-secondary mt-1.5 leading-relaxed">
          Your campus community is waiting. Sign in to collaborate, ask questions, or trade study guides.
        </p>
      </div>

      {/* Judge One-Click Demo Access Box */}
      <div className={`p-3.5 rounded-2xl border transition-all ${
        isDark 
          ? 'bg-plum-surface/90 border-lavender/30 text-parchment' 
          : 'bg-lavender/10 border-lavender/40 text-plum'
      }`}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold">Judges & Reviewers Demo</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-terracotta text-white">
                  Instant Access
                </span>
              </div>
              <p className="text-[11px] text-content-secondary mt-0.5">
                Explore UniHive immediately as <strong>Bhadra</strong> (3rd Yr CS & Design) with rich sample data pre-loaded.
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleJudgeDemoAccess}
          disabled={isSubmitting}
          className="mt-3 w-full py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 bg-lavender/25 hover:bg-lavender/40 text-plum dark:text-parchment border border-lavender/40 shadow-xs"
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-success" />
          <span>Launch with Judge Demo Account</span>
        </button>
      </div>

      {/* Standard Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-content-primary">
            University Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={e => {
              setEmail(e.target.value);
              if (errors.email) setErrors({ ...errors, email: undefined });
            }}
            placeholder="student@university.edu"
            className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border transition-all bg-surface focus:outline-none focus:ring-2 ${
              errors.email
                ? 'border-error focus:ring-error/20'
                : 'border-borderSubtle focus:border-lavender focus:ring-lavender/20'
            }`}
          />
          {errors.email && (
            <p className="text-[11px] text-error flex items-center gap-1 mt-1 font-medium">
              <AlertCircle className="w-3 h-3 shrink-0" />
              <span>{errors.email}</span>
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-semibold text-content-primary">
              Password
            </label>
            <button
              type="button"
              onClick={() => {
                alert('For this competition demo, any 6+ character password or the Judge Access button works!');
              }}
              className="text-[11px] text-lavender hover:underline font-medium"
            >
              Demo hint?
            </button>
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => {
                setPassword(e.target.value);
                if (errors.password) setErrors({ ...errors, password: undefined });
              }}
              placeholder="••••••••••••"
              className={`w-full px-3.5 py-2.5 pr-10 text-xs sm:text-sm rounded-xl border transition-all bg-surface focus:outline-none focus:ring-2 ${
                errors.password
                  ? 'border-error focus:ring-error/20'
                  : 'border-borderSubtle focus:border-lavender focus:ring-lavender/20'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-content-muted hover:text-content-primary p-1"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-[11px] text-error flex items-center gap-1 mt-1 font-medium">
              <AlertCircle className="w-3 h-3 shrink-0" />
              <span>{errors.password}</span>
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-card hover:shadow-float active:scale-[0.99] ${
            isDark
              ? 'bg-parchment text-plum hover:bg-white'
              : 'bg-plum text-parchment hover:bg-plum-hover'
          } ${isSubmitting ? 'opacity-80 cursor-wait' : ''}`}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              <span>Authenticating...</span>
            </span>
          ) : (
            <>
              <LogIn className="w-4 h-4" />
              <span>Log in to UniHive</span>
            </>
          )}
        </button>
      </form>

      {/* Switch to Registration link */}
      <div className="pt-2 text-center border-t border-borderSubtle">
        <p className="text-xs text-content-secondary">
          New to campus or haven't joined yet?{' '}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="font-bold text-lavender hover:underline ml-1"
          >
            Create an account
          </button>
        </p>
      </div>
    </div>
  );
};
