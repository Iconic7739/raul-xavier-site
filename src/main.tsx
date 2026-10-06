import React, { Component, ErrorInfo, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    // If it's a browser extension error, don't show an error state
    const msg = error?.message || '';
    const stack = error?.stack || '';
    if (
      msg.includes('chrome-extension') ||
      stack.includes('chrome-extension') ||
      msg.includes('walletRouter') ||
      msg.includes('isZerion') ||
      msg.includes('Keplr')
    ) {
      return { hasError: false };
    }
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const msg = error?.message || '';
    if (!msg.includes('chrome-extension') && !msg.includes('walletRouter')) {
      console.error('App error caught by ErrorBoundary:', error, errorInfo);
    }
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#080808] text-[#F5F5F5] flex items-center justify-center p-6 text-center font-mono">
          <div className="max-w-md p-6 rounded-xl bg-[#111111] border border-white/10">
            <h2 className="text-base font-semibold mb-2 text-white">Something went wrong</h2>
            <p className="text-xs text-[#8A8A8A] mb-4">
              An unexpected error occurred while rendering the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 text-xs bg-white text-black rounded font-medium hover:bg-neutral-200 transition-colors cursor-pointer"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
