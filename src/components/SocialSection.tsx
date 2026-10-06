import React, { useState } from 'react';
import { ArrowUpRight, Copy, Check } from 'lucide-react';
import { siteContent } from '../data/content';

interface SocialSectionProps {
  onNotify: (msg: string) => void;
}

export const SocialSection: React.FC<SocialSectionProps> = ({ onNotify }) => {
  const [copiedDiscord, setCopiedDiscord] = useState(false);

  const copyDiscord = async () => {
    try {
      await navigator.clipboard.writeText(siteContent.socials.discord.handle);
      setCopiedDiscord(true);
      onNotify(`Copied Discord handle "${siteContent.socials.discord.handle}" to clipboard`);
      setTimeout(() => setCopiedDiscord(false), 2000);
    } catch {
      onNotify(`Discord: ${siteContent.socials.discord.handle}`);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 border-b border-white/[0.08]">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-xs font-mono uppercase tracking-widest text-[#8A8A8A] mb-2 select-none">
            channels
          </h2>
          <p className="text-2xl sm:text-3xl font-medium tracking-tight text-[#F5F5F5]">
            somewhere on the internet
          </p>
        </div>

        {/* Minimal interactive list of social handles */}
        <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
          {/* X / Twitter */}
          <a
            href={siteContent.socials.x.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between py-6 px-4 -mx-4 rounded-lg hover:bg-[#111111]/70 transition-colors"
          >
            <div className="flex items-center gap-6">
              <span className="text-base sm:text-lg font-medium text-[#F5F5F5] group-hover:text-white">
                {siteContent.socials.x.label}
              </span>
              <span className="font-mono text-xs sm:text-sm text-[#8A8A8A] group-hover:text-emerald-400 transition-colors">
                {siteContent.socials.x.handle}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#8A8A8A] group-hover:text-[#F5F5F5]">
              <span className="hidden sm:inline text-xs text-[#8A8A8A]">open profile</span>
              <ArrowUpRight
                size={16}
                className="group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
              />
            </div>
          </a>

          {/* Telegram */}
          <a
            href={siteContent.socials.telegram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between py-6 px-4 -mx-4 rounded-lg hover:bg-[#111111]/70 transition-colors"
          >
            <div className="flex items-center gap-6">
              <span className="text-base sm:text-lg font-medium text-[#F5F5F5] group-hover:text-white">
                {siteContent.socials.telegram.label}
              </span>
              <span className="font-mono text-xs sm:text-sm text-[#8A8A8A] group-hover:text-emerald-400 transition-colors">
                {siteContent.socials.telegram.handle}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#8A8A8A] group-hover:text-[#F5F5F5]">
              <span className="hidden sm:inline text-xs text-[#8A8A8A]">send message</span>
              <ArrowUpRight
                size={16}
                className="group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
              />
            </div>
          </a>

          {/* Discord */}
          <div
            onClick={copyDiscord}
            className="group flex items-center justify-between py-6 px-4 -mx-4 rounded-lg hover:bg-[#111111]/70 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-6">
              <span className="text-base sm:text-lg font-medium text-[#F5F5F5] group-hover:text-white">
                {siteContent.socials.discord.label}
              </span>
              <span className="font-mono text-xs sm:text-sm text-[#8A8A8A] group-hover:text-emerald-400 transition-colors">
                {siteContent.socials.discord.handle}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#8A8A8A] group-hover:text-[#F5F5F5]">
              <span className="hidden sm:inline text-xs text-[#8A8A8A]">
                {copiedDiscord ? 'copied' : 'copy tag'}
              </span>
              {copiedDiscord ? (
                <Check size={16} className="text-emerald-400" />
              ) : (
                <Copy
                  size={15}
                  className="group-hover:text-emerald-400 transition-colors"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
