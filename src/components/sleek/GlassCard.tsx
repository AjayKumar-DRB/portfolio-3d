'use client';

import type { Project } from '@/data/projects';
import { Tilt3D } from '@/components/common/Tilt3D';

interface GlassCardProps {
  project: Project;
  index: number;
}

export function GlassCard({ project, index }: GlassCardProps) {
  return (
    <Tilt3D maxTilt={10} scale={1.02} enableScanline={true} className="h-full">
      <div
        className="group relative h-full flex flex-col justify-between overflow-hidden"
        style={{
          background: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          boxShadow: `0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 30px -10px ${project.accentColor}25`,
        }}
      >
        <div>
          {/* Top Header Banner with Neon Gradient Accent */}
          <div
            className="relative h-44 overflow-hidden flex items-end p-6"
            style={{
              background: `linear-gradient(135deg, ${project.accentColor}22 0%, rgba(10, 15, 30, 0.95) 100%)`,
              borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            {/* Subtle geometric grid background */}
            <div
              className="absolute inset-0 opacity-15"
              style={{
                backgroundImage: `linear-gradient(${project.accentColor}33 1px, transparent 1px), linear-gradient(90deg, ${project.accentColor}33 1px, transparent 1px)`,
                backgroundSize: '24px 24px',
              }}
            />

            {/* Project Number / Category Tag */}
            <div className="absolute top-4 left-6 flex items-center gap-2">
              <span
                className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full"
                style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: `1px solid ${project.accentColor}55`,
                  color: project.accentColor,
                }}
              >
                {`0${index + 1} // FEATURED`}
              </span>
            </div>

            {/* Difficulty Stars */}
            <div className="absolute top-4 right-6 flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  style={{
                    color: i < project.difficulty ? project.accentColor : 'rgba(255, 255, 255, 0.15)',
                    fontSize: '12px',
                  }}
                >
                  ★
                </span>
              ))}
            </div>

            <h3
              className="relative z-10 text-xl font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors"
              style={{ fontFamily: 'var(--font-outfit)' }}
            >
              {project.title}
              {project.isWIP && (
                <span className="ml-2 text-[10px] font-mono px-1.5 py-0.5 align-middle" style={{ background: 'rgba(217,119,6,0.15)', border: '1px solid #D97706', color: '#D97706', borderRadius: 2 }}>WIP</span>
              )}
            </h3>
            <p className="relative z-10 text-xs font-mono mt-1" style={{ color: 'rgba(255,255,255,0.45)' }}>
              {project.tagline}
            </p>
          </div>

          {/* Card Body */}
          <div className="p-6 flex flex-col gap-5">
            <p
              className="text-sm leading-relaxed"
              style={{
                color: 'var(--text-secondary)',
                fontFamily: 'var(--font-inter)',
              }}
            >
              {project.description}
            </p>

            {/* Modern Performance & Architecture Metrics */}
            <div className="grid grid-cols-2 gap-3 py-2">
              <div>
                <div className="flex justify-between text-xs mb-1 font-mono text-slate-400">
                  <span>Complexity</span>
                  <span style={{ color: project.accentColor }}>{project.stats.atk}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${project.stats.atk}%`, background: project.accentColor }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1 font-mono text-slate-400">
                  <span>Velocity</span>
                  <span style={{ color: project.accentColor }}>{project.stats.spd}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${project.stats.spd}%`, background: project.accentColor }}
                  />
                </div>
              </div>
            </div>

            {/* Tech Stack Badges */}
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2.5 py-1 rounded-md transition-colors"
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    color: 'var(--text-secondary)',
                    fontFamily: 'var(--font-jetbrains-mono)',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Links */}
        <div className="p-6 pt-0">
          <div className="flex items-center gap-3 pt-3 border-t border-white/5">
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-2 px-4 rounded-lg font-semibold text-xs tracking-wide uppercase transition-all duration-200"
              style={{
                background: project.accentColor,
                color: '#09090b',
                boxShadow: `0 0 15px ${project.accentColor}44`,
              }}
            >
              Explore Live ↗
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-4 rounded-lg text-xs font-medium tracking-wide transition-all duration-200"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: 'var(--text-primary)',
              }}
            >
              Source Code
            </a>
          </div>
        </div>
      </div>
    </Tilt3D>
  );
}
