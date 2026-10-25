import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface ConfirmationDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isDestructive = false,
  onConfirm,
  onCancel
}) => {
  const { isDark } = useTheme();

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div 
        className={`rounded-3xl max-w-md w-full p-6 shadow-float border relative animate-scaleUp transition-all ${
          isDark 
            ? 'bg-plum-surface border-plum-border text-parchment' 
            : 'bg-surface border-borderSubtle text-plum'
        }`}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-content-muted hover:text-content-primary p-1.5 rounded-xl hover:bg-lavender/10 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-4 mb-4">
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
            isDestructive 
              ? 'bg-error/20 text-error border border-error/30' 
              : 'bg-terracotta/20 text-terracotta border border-terracotta/30'
          }`}>
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-base text-content-primary">
              {title}
            </h3>
            <p className="text-xs sm:text-sm text-content-secondary mt-1 leading-relaxed">
              {message}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-borderSubtle/60">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-content-secondary hover:text-content-primary hover:bg-lavender/10 transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white transition-all shadow-subtle ${
              isDestructive 
                ? 'bg-error hover:bg-error/90' 
                : isDark 
                  ? 'bg-lavender text-plum-dark hover:bg-parchment'
                  : 'bg-plum text-parchment hover:bg-plum-hover'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
