import React from 'react';
import { siteContent } from '../data/content';

export const WhatIDo: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-28 border-b border-white/[0.08]">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-xs font-mono uppercase tracking-widest text-[#8A8A8A] mb-2 select-none">
            overview
          </h2>
          <p className="text-2xl sm:text-3xl font-medium tracking-tight text-[#F5F5F5]">
            what i do
          </p>
        </div>

        {/* 5 Minimal Rows / Cards */}
        <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
          {siteContent.whatIDo.map((item) => (
            <div
              key={item.number}
              className="group py-6 md:py-8 transition-colors duration-200 hover:bg-[#111111]/60 px-4 -mx-4 rounded-lg flex flex-col md:flex-row md:items-baseline justify-between gap-3 md:gap-8"
            >
              {/* Left: Number & Title */}
              <div className="flex items-baseline gap-4 md:w-1/3 shrink-0">
                <span className="font-mono text-xs text-[#8A8A8A] group-hover:text-emerald-400 transition-colors">
                  {item.number}
                </span>
                <span className="text-white/20 font-mono text-xs select-none">—</span>
                <h3 className="text-base sm:text-lg font-semibold tracking-wide text-[#F5F5F5] group-hover:text-white transition-colors">
                  {item.title}
                </h3>
              </div>

              {/* Right: Description */}
              <div className="md:w-2/3">
                <p className="text-sm sm:text-base text-[#8A8A8A] leading-relaxed group-hover:text-[#D1D1D1] transition-colors">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
