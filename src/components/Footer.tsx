import React from 'react';
import { ArrowUp } from 'lucide-react';
import { siteContent } from '../data/content';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 py-16 md:py-24 bg-transparent">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-white/[0.08]">
          {/* Identity & Tagline with PFP */}
          <div className="flex items-center gap-3.5">
            <img
              src={siteContent.identity.avatar}
              alt={siteContent.identity.name}
              className="w-10 h-10 rounded-full object-cover border border-white/10 shrink-0"
              referrerPolicy="no-referrer"
            />
            <div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#F5F5F5] uppercase">
                {siteContent.identity.name}
              </h3>
              <p className="text-xs sm:text-sm font-mono text-[#8A8A8A]">
                {siteContent.footer.tagline}
              </p>
            </div>
          </div>

          {/* Back to top button */}
          <div>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 text-xs font-mono text-[#8A8A8A] hover:text-[#F5F5F5] p-2 hover:bg-[#111111] rounded border border-transparent hover:border-white/[0.08] transition-all cursor-pointer group"
            >
              <span>back to top</span>
              <ArrowUp
                size={13}
                className="group-hover:-translate-y-0.5 transition-transform"
              />
            </button>
          </div>
        </div>

        {/* Copyright notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#5A5A5A] gap-4">
          <p>{siteContent.footer.copyright}</p>
          <p className="text-[#4A4A4A]">designed with quiet confidence</p>
        </div>
      </div>
    </footer>
  );
};
