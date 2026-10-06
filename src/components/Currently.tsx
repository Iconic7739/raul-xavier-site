import React, { useState } from 'react';
import { siteContent, ActivityItem } from '../data/content';
import { Sparkles } from 'lucide-react';

export const Currently: React.FC = () => {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const selectedItem: ActivityItem | undefined = siteContent.currently.find(
    (item) => item.id === activeTag
  );

  return (
    <section className="py-16 md:py-24 border-b border-white/[0.08]">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#8A8A8A] mb-2 select-none">
              radar
            </h2>
            <p className="text-2xl sm:text-3xl font-medium tracking-tight text-[#F5F5F5]">
              currently
            </p>
          </div>
          <span className="text-xs text-[#8A8A8A] font-mono">
            {activeTag ? 'tap tag to dismiss' : 'select a focus to inspect notes'}
          </span>
        </div>

        {/* Interactive Tags */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          {siteContent.currently.map((item) => {
            const isActive = activeTag === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTag(isActive ? null : item.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-mono tracking-wide rounded border transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#181818] border-emerald-400/60 text-[#F5F5F5] shadow-[0_0_15px_rgba(16,185,129,0.12)]'
                    : 'bg-[#111111] border-white/[0.08] text-[#8A8A8A] hover:border-white/20 hover:text-[#F5F5F5] hover:bg-[#141414]'
                }`}
              >
                <span>{item.tag}</span>
                {isActive && <span className="ml-2 text-emerald-400 select-none">●</span>}
              </button>
            );
          })}
        </div>

        {/* Active Tag Details Drawer (Subtle, purposeful depth) */}
        {selectedItem && (
          <div className="mt-6 p-5 sm:p-6 rounded-lg bg-[#111111] border border-white/[0.10] animate-fade-in">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
              <Sparkles size={13} />
              <span>Active focus · {selectedItem.tag}</span>
            </div>
            <h4 className="text-base sm:text-lg font-medium text-[#F5F5F5] mb-2">
              {selectedItem.title}
            </h4>
            <p className="text-sm text-[#8A8A8A] leading-relaxed mb-3">
              {selectedItem.description}
            </p>
            <div className="pt-3 border-t border-white/[0.08] flex items-baseline gap-2 text-xs text-[#F5F5F5]/90">
              <span className="text-[#8A8A8A] font-mono shrink-0">Working on:</span>
              <span className="font-light">{selectedItem.currentFocus}</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
