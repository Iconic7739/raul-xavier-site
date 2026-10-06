import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { siteContent } from '../data/content';

export const OpenForWork: React.FC = () => {
  const { openForWork } = siteContent;

  return (
    <section className="py-20 md:py-28 border-b border-white/[0.08]">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <div className="p-8 sm:p-12 rounded-2xl bg-[#0D0D0D] border border-white/[0.08] relative overflow-hidden">
          {/* Subtle accent highlight on top edge */}
          <div className="absolute top-0 left-0 w-32 h-[1px] bg-emerald-400" />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6 text-xs font-mono text-emerald-400">
            <Sparkles size={13} />
            <span className="uppercase tracking-widest">collaboration</span>
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#F5F5F5] mb-4">
            {openForWork.headline}
          </h2>

          {/* Text */}
          <p className="text-base sm:text-lg text-[#8A8A8A] max-w-xl mb-8 leading-relaxed">
            {openForWork.subline}
          </p>

          {/* Available for bullet points */}
          <div className="mb-10">
            <p className="text-xs font-mono uppercase tracking-wider text-[#8A8A8A] mb-4 select-none">
              Available for:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-[#F5F5F5]">
              {openForWork.availableFor.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <span className="text-emerald-400 font-mono select-none">→</span>
                  <span className="text-[#D1D1D1]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div>
            <a
              href={openForWork.ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#F5F5F5] hover:bg-white text-[#080808] font-medium text-sm transition-all duration-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] group"
            >
              <span>{openForWork.ctaText}</span>
              <ArrowRight
                size={15}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
