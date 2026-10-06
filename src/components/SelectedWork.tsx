import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { siteContent, Project } from '../data/content';
import { ProjectModal } from './ProjectModal';

export const SelectedWork: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="work" className="py-20 md:py-28 border-b border-white/[0.08]">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-12 md:mb-16">
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#8A8A8A] mb-2 select-none">
              portfolio
            </h2>
            <p className="text-2xl sm:text-3xl font-medium tracking-tight text-[#F5F5F5]">
              selected work
            </p>
          </div>
          <span className="text-xs text-[#8A8A8A] font-mono">
            3 curated experiments
          </span>
        </div>

        {/* Project Cards Grid */}
        <div className="space-y-6">
          {siteContent.selectedWork.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group relative p-6 sm:p-8 rounded-xl bg-[#0D0D0D] border border-white/[0.08] hover:border-white/20 hover:bg-[#121212] transition-all duration-300 cursor-pointer overflow-hidden"
            >
              {/* Subtle top subtle accent glow on hover */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/0 to-transparent group-hover:via-emerald-400/40 transition-all duration-500" />

              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                {/* Left Side: Number + Title + Description */}
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-2xl sm:text-3xl font-bold font-mono text-[#4A4A4A] group-hover:text-emerald-400 transition-colors">
                      {project.number}
                    </span>
                    <span className="text-xs font-mono uppercase tracking-wider text-[#8A8A8A]">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#F5F5F5] group-hover:text-white mb-2 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#8A8A8A] group-hover:text-[#B5B5B5] leading-relaxed max-w-xl transition-colors">
                    {project.description}
                  </p>
                </div>

                {/* Right Side: CTA link with reveal arrow */}
                <div className="flex md:flex-col items-center md:items-end justify-between md:justify-start gap-3 pt-4 md:pt-0 border-t border-white/[0.06] md:border-t-0">
                  <span className="text-xs font-mono text-[#8A8A8A] group-hover:text-[#F5F5F5] transition-colors flex items-center gap-1.5">
                    <span>view details</span>
                    <ArrowUpRight
                      size={14}
                      className="text-[#8A8A8A] group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                    />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
