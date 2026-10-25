import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('UniHive ErrorBoundary caught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="w-full min-h-[360px] flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full rounded-2xl border border-borderSubtle bg-surface p-6 sm:p-8 shadow-card space-y-4 animate-dreamy-reveal">
            <div className="w-12 h-12 rounded-full bg-peach/15 text-peach mx-auto flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-content-primary">
                Something paused in the hive
              </h3>
              <p className="text-xs sm:text-sm text-content-secondary mt-1.5 leading-relaxed">
                The interface encountered a momentary hiccup while rendering this campus view.
              </p>
            </div>
            <button
              onClick={this.handleReset}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-lavender text-plum hover:bg-parchment transition-all shadow-subtle"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reload Campus View</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
