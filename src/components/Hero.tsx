import React, { useState } from 'react';
import { ArrowUpRight, Copy, Check } from 'lucide-react';
import { siteContent } from '../data/content';

interface HeroProps {
  onNotify: (msg: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNotify }) => {
  const [discordCopied, setDiscordCopied] = useState(false);

  const copyDiscord = async () => {
    try {
      await navigator.clipboard.writeText(siteContent.socials.discord.handle);
      setDiscordCopied(true);
      onNotify(`Copied Discord "${siteContent.socials.discord.handle}" to clipboard`);
      setTimeout(() => setDiscordCopied(false), 2000);
    } catch {
      onNotify(`Discord tag: ${siteContent.socials.discord.handle}`);
    }
  };

  return (
    <section
      id="hero"
      className="min-h-[85vh] md:min-h-[90vh] flex flex-col justify-center pt-24 pb-16 md:pt-32 md:pb-24 border-b border-white/[0.08]"
    >
      <div className="max-w-4xl mx-auto px-6 md:px-8 w-full">
        {/* Profile Avatar & Availability Badge Lockup */}
        <div className="flex items-center gap-4 sm:gap-5 mb-8 md:mb-10 animate-fade-in">
          <div className="relative group shrink-0">
            <img
              src={siteContent.identity.avatar}
              alt={siteContent.identity.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-white/15 bg-[#111111] shadow-xl group-hover:scale-105 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
            <span
              className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#080808] flex items-center justify-center border border-white/10"
              title="Online / Available"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            </span>
          </div>

          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#111111] border border-white/[0.08] text-xs text-[#8A8A8A]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="tracking-wide text-[#F5F5F5]/90 font-mono text-[11px]">
              {siteContent.identity.availability.status}
            </span>
          </div>
        </div>

        {/* Hero Name / Title */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-[#F5F5F5] uppercase mb-4 md:mb-5 select-none">
          {siteContent.identity.name}
        </h1>

        {/* Positioning Subhead */}
        <p className="text-sm sm:text-base md:text-lg text-[#8A8A8A] font-mono tracking-wide mb-8 md:mb-10">
          {siteContent.identity.positioning}
        </p>

        {/* Supporting Message */}
        <div className="max-w-2xl mb-8 md:mb-10">
          <p className="text-lg sm:text-xl md:text-2xl font-light text-[#F5F5F5] leading-relaxed">
            {siteContent.identity.supportingMessage}
          </p>
        </div>

        {/* Additional Focus Points */}
        <div className="space-y-2 mb-10 md:mb-12 max-w-xl text-sm sm:text-base text-[#8A8A8A]">
          {siteContent.identity.bulletPoints.map((point, index) => (
            <div
              key={index}
              className="flex items-start gap-2.5 transition-colors hover:text-[#F5F5F5] group"
            >
              <span className="text-emerald-400/80 font-mono select-none">→</span>
              <span className="leading-snug">{point}</span>
            </div>
          ))}
        </div>

        {/* Social Links Row */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4 border-t border-white/[0.08]">
          {/* X / Twitter */}
          <a
            href={siteContent.socials.x.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-[#F5F5F5] hover:text-emerald-400 transition-colors py-1 group"
          >
            <span>{siteContent.socials.x.label}</span>
            <ArrowUpRight
              size={14}
              className="text-[#8A8A8A] group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
            />
          </a>

          <span className="text-white/20 select-none">/</span>

          {/* Telegram */}
          <a
            href={siteContent.socials.telegram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-[#F5F5F5] hover:text-emerald-400 transition-colors py-1 group"
          >
            <span>{siteContent.socials.telegram.label}</span>
            <ArrowUpRight
              size={14}
              className="text-[#8A8A8A] group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
            />
          </a>

          <span className="text-white/20 select-none">/</span>

          {/* Discord (Copy Action) */}
          <button
            onClick={copyDiscord}
            title="Click to copy Discord handle"
            className="inline-flex items-center gap-2 text-sm text-[#F5F5F5] hover:text-emerald-400 transition-colors py-1 cursor-pointer group"
          >
            <span>{siteContent.socials.discord.label}</span>
            <span className="font-mono text-xs text-[#8A8A8A] group-hover:text-[#F5F5F5]">
              {siteContent.socials.discord.handle}
            </span>
            {discordCopied ? (
              <Check size={14} className="text-emerald-400" />
            ) : (
              <Copy
                size={13}
                className="text-[#8A8A8A] group-hover:text-emerald-400 transition-colors"
              />
            )}
          </button>
        </div>
      </div>
    </section>
  );
};
