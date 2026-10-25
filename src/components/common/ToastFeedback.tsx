import React from 'react';
import { useUniHive } from '../../context/UniHiveContext';
import { useTheme } from '../../context/ThemeContext';
import { CheckCircle2, Info, Sparkles, AlertTriangle, X } from 'lucide-react';

export const ToastFeedback: React.FC = () => {
  const { toasts, removeToast } = useUniHive();
  const { isDark } = useTheme();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => {
        const icons = {
          success: <CheckCircle2 className="w-5 h-5 text-success shrink-0" />,
          celebrate: <Sparkles className="w-5 h-5 text-terracotta shrink-0 animate-bounce" />,
          info: <Info className="w-5 h-5 text-lavender shrink-0" />,
          warning: <AlertTriangle className="w-5 h-5 text-terracotta shrink-0" />
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-2xl border shadow-float transition-all duration-300 transform translate-y-0 opacity-100 ${
              isDark 
                ? 'bg-plum-elevated border-plum-border text-parchment' 
                : 'bg-surface border-borderSubtle text-plum'
            }`}
          >
            {icons[toast.type]}
            <div className="flex-1 min-w-0 pr-1">
              <h4 className="text-xs font-bold text-content-primary leading-tight">
                {toast.title}
              </h4>
              <p className="text-xs text-content-secondary mt-0.5 leading-snug">
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-content-muted hover:text-content-primary p-1 rounded-md transition-colors"
              aria-label="Close notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
