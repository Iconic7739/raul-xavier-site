import React from 'react';
import { Check } from 'lucide-react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <aside
      aria-label="Notification"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-lg bg-[#141414] border border-white/15 text-xs font-mono text-[#F5F5F5] shadow-2xl backdrop-blur-md animate-fade-in"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
      <Check size={13} className="text-emerald-400 shrink-0" />
      <span>{message}</span>
    </aside>
  );
};
