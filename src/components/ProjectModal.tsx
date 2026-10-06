import React, { useEffect } from 'react';
import { X, ArrowUpRight } from 'lucide-react';
import { Project } from '../data/content';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-xl bg-[#0F0F0F] border border-white/[0.12] rounded-xl p-6 sm:p-8 text-[#F5F5F5] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 p-2 text-[#8A8A8A] hover:text-[#F5F5F5] hover:bg-white/[0.06] rounded-md transition-colors"
        >
          <X size={18} />
        </button>

        {/* Header with Project Number & Category */}
        <div className="flex items-center gap-3 text-xs font-mono text-[#8A8A8A] mb-4">
          <span className="text-emerald-400 font-semibold">{project.number}</span>
          <span className="text-white/20">/</span>
          <span className="uppercase tracking-wider">{project.category}</span>
          <span className="text-white/20">/</span>
          <span>{project.status}</span>
        </div>

        {/* Project Title */}
        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F5F5F5] mb-3">
          {project.title}
        </h3>

        {/* One line punchy summary */}
        <p className="text-base text-[#D1D1D1] mb-6 font-light leading-relaxed">
          {project.description}
        </p>

        {/* Architecture & Concept Highlights */}
        <div className="space-y-3 mb-8 pt-4 border-t border-white/[0.08]">
          <h4 className="text-xs font-mono uppercase tracking-wider text-[#8A8A8A]">
            Core Concept & Architecture
          </h4>
          <ul className="space-y-2 text-sm text-[#8A8A8A]">
            {project.highlights.map((highlight, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-mono text-xs select-none">→</span>
                <span className="text-[#A3A3A3] leading-snug">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
          <span className="text-xs text-[#8A8A8A] font-mono">
            Direct builder inquiry
          </span>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono text-[#F5F5F5] bg-[#1A1A1A] hover:bg-white/10 border border-white/[0.12] rounded transition-all group"
            >
              <span>{project.linkText || 'Inquire'}</span>
              <ArrowUpRight
                size={13}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
