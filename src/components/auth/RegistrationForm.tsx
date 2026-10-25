import React, { useState } from 'react';
import { UserPlus, AlertCircle } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface RegistrationFormProps {
  onSuccess: (userData: {
    name?: string;
    email: string;
    college: string;
    department: string;
    year: string;
  }) => void;
  onSwitchToLogin: () => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  onSuccess,
  onSwitchToLogin
}) => {
  const { isDark } = useTheme();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    college: 'North Campus Hub University',
    department: 'Computer Science & Engineering',
    year: '1st Year Undergraduate'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const departments = [
    'Computer Science & Engineering',
    'Design & Human-Computer Interaction',
    'Data Science & Artificial Intelligence',
    'Mechanical Engineering',
    'Electrical & Electronics Engineering',
    'Biotechnology',
    'Business & Economics',
    'Architecture & Urban Planning'
  ];

  const years = [
    '1st Year Undergraduate',
    '2nd Year Undergraduate',
    '3rd Year Undergraduate',
    '4th Year Undergraduate',
    'Graduate / Master’s Candidate',
    'PhD Researcher'
  ];

  const colleges = [
    'North Campus Hub University',
    'South Engineering & Tech Institute',
    'Central Arts & Sciences University',
    'Design & Architecture Polytech'
  ];

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!formData.email.trim()) {
      errs.email = 'University email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid university email address.';
    }

    if (!formData.password) {
      errs.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      errs.password = 'Password must be at least 6 characters.';
    }

    if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = 'Passwords do not match.';
    }

    if (!formData.college) {
      errs.college = 'Please choose your college or institution.';
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
      onSuccess({
        email: formData.email,
        college: formData.college,
        department: formData.department,
        year: formData.year
      });
    }, 600);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-5">
      {/* Editorial Title Block */}
      <div>
        <span className="text-xs font-semibold tracking-wider uppercase text-lavender font-mono">
          New Student Onboarding
        </span>
        <h2 className={`font-display font-bold text-2xl sm:text-3xl tracking-tight mt-1 ${
          isDark ? 'text-parchment' : 'text-plum'
        }`}>
          Find your people.
        </h2>
        <p className="text-xs sm:text-sm text-content-secondary mt-1.5 leading-relaxed">
          Join your campus community. Exchange study guides, request homework assistance, and connect for projects.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5">
        {/* Email */}
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-content-primary">
            University Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={e => {
              setFormData({ ...formData, email: e.target.value });
              if (errors.email) setErrors({ ...errors, email: '' });
            }}
            placeholder="jordan@university.edu"
            className={`w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border bg-surface transition-all focus:outline-none focus:ring-2 ${
              errors.email ? 'border-error focus:ring-error/20' : 'border-borderSubtle focus:border-lavender focus:ring-lavender/20'
            }`}
          />
          {errors.email && (
            <p className="text-[11px] text-error flex items-center gap-1 font-medium">
              <AlertCircle className="w-3 h-3 shrink-0" />
              <span>{errors.email}</span>
            </p>
          )}
        </div>

        {/* Password & Confirm Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-content-primary">
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={e => {
                setFormData({ ...formData, password: e.target.value });
                if (errors.password) setErrors({ ...errors, password: '' });
              }}
              placeholder="Min. 6 chars"
              className={`w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border bg-surface transition-all focus:outline-none focus:ring-2 ${
                errors.password ? 'border-error focus:ring-error/20' : 'border-borderSubtle focus:border-lavender focus:ring-lavender/20'
              }`}
            />
            {errors.password && (
              <p className="text-[10px] text-error">{errors.password}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-content-primary">
              Confirm Password
            </label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={e => {
                setFormData({ ...formData, confirmPassword: e.target.value });
                if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
              }}
              placeholder="Re-enter password"
              className={`w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border bg-surface transition-all focus:outline-none focus:ring-2 ${
                errors.confirmPassword ? 'border-error focus:ring-error/20' : 'border-borderSubtle focus:border-lavender focus:ring-lavender/20'
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-[10px] text-error">{errors.confirmPassword}</p>
            )}
          </div>
        </div>

        {/* Institution / College */}
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-content-primary">
            College or Institution
          </label>
          <select
            value={formData.college}
            onChange={e => setFormData({ ...formData, college: e.target.value })}
            className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-borderSubtle bg-surface focus:outline-none focus:border-lavender focus:ring-2 focus:ring-lavender/20"
          >
            {colleges.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Department & Year Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-content-primary">
              Department / Course
            </label>
            <select
              value={formData.department}
              onChange={e => setFormData({ ...formData, department: e.target.value })}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-borderSubtle bg-surface focus:outline-none focus:border-lavender focus:ring-2 focus:ring-lavender/20"
            >
              {departments.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-content-primary">
              Year of Study
            </label>
            <select
              value={formData.year}
              onChange={e => setFormData({ ...formData, year: e.target.value })}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-borderSubtle bg-surface focus:outline-none focus:border-lavender focus:ring-2 focus:ring-lavender/20"
            >
              {years.map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full mt-2 py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-card hover:shadow-float active:scale-[0.99] ${
            isDark
              ? 'bg-parchment text-plum hover:bg-white'
              : 'bg-plum text-parchment hover:bg-plum-hover'
          } ${isSubmitting ? 'opacity-80 cursor-wait' : ''}`}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              <span>Creating your profile...</span>
            </span>
          ) : (
            <>
              <UserPlus className="w-4 h-4" />
              <span>Create Account & Enter Hive</span>
            </>
          )}
        </button>
      </form>

      {/* Switch to Login */}
      <div className="pt-2 text-center border-t border-borderSubtle">
        <p className="text-xs text-content-secondary">
          Already registered on UniHive?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="font-bold text-lavender hover:underline ml-1"
          >
            Log in instead
          </button>
        </p>
      </div>
    </div>
  );
};
