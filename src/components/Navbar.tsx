import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { siteContent } from '../data/content';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#080808]/85 backdrop-blur-md border-b border-white/[0.08] py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-4xl mx-auto px-6 md:px-8 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark with PFP */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 text-sm font-semibold tracking-wider text-[#F5F5F5] hover:text-white transition-colors group"
        >
          <img
            src={siteContent.identity.avatar}
            alt={siteContent.identity.name}
            className="w-6 h-6 rounded-full object-cover border border-white/15 ring-1 ring-white/5 shrink-0"
            referrerPolicy="no-referrer"
          />
          <span>{siteContent.identity.name}</span>
        </a>

        {/* Zone 2: Desktop Clean Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs tracking-wider text-[#8A8A8A]">
          <button
            onClick={() => scrollTo('about')}
            className="hover:text-[#F5F5F5] transition-colors cursor-pointer"
          >
            about
          </button>
          <button
            onClick={() => scrollTo('work')}
            className="hover:text-[#F5F5F5] transition-colors cursor-pointer"
          >
            work
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="hover:text-[#F5F5F5] transition-colors cursor-pointer"
          >
            contact
          </button>
        </nav>

        {/* Zone 3: Status / Action Indicator */}
        <div className="hidden md:flex items-center">
          <a
            href={siteContent.socials.telegram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs text-[#8A8A8A] hover:text-[#F5F5F5] transition-colors group"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] tracking-wide">open for work</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          className="md:hidden p-1.5 text-[#8A8A8A] hover:text-[#F5F5F5] transition-colors"
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0D0D0D] border-b border-white/[0.08] px-6 py-6 transition-all">
          <nav className="flex flex-col gap-4 text-sm tracking-wider text-[#8A8A8A]">
            <button
              onClick={() => scrollTo('about')}
              className="text-left py-2 hover:text-[#F5F5F5] transition-colors"
            >
              about
            </button>
            <button
              onClick={() => scrollTo('work')}
              className="text-left py-2 hover:text-[#F5F5F5] transition-colors"
            >
              work
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="text-left py-2 hover:text-[#F5F5F5] transition-colors"
            >
              contact
            </button>
            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
              <a
                href={siteContent.socials.telegram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-emerald-400"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>open for mod / collab work</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
