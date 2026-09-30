'use client';

import { type Project } from '@/data/projects';
import { EnergyBar } from './EnergyBar';
import { RetroButton } from './RetroButton';
import { Tilt3D } from '@/components/common/Tilt3D';
import { cn } from '@/lib/utils';

interface BossBattleCardProps {
  project: Project;
  className?: string;
  index?: number;
}

export function BossBattleCard({ project, className, index = 0 }: BossBattleCardProps) {
  const difficultyStars = '★'.repeat(project.difficulty) + '☆'.repeat(5 - project.difficulty);

  return (
    <Tilt3D maxTilt={10} scale={1.02} enableScanline={true} className="h-full">
      <div
        className={cn('boss-card h-full flex flex-col justify-between', className)}
        style={{ animationDelay: `${index * 150}ms` }}
      >
        {/* Header */}
        <div>
          <div className="boss-card__header flex items-center justify-between gap-2">
            <span className="flex items-center gap-1.5 min-w-0">
              <span style={{ color: project.accentColor }} className="flex-shrink-0">▓</span>
              <span className="truncate">BOSS: {project.title}</span>
            </span>
            <span className="flex items-center gap-1.5 flex-shrink-0">
              {project.isWIP && (
                <span style={{ color: '#D97706', fontSize: '7px', border: '1px solid #D97706', padding: '1px 4px' }}>WIP</span>
              )}
              <span style={{ color: project.accentColor }}>▓</span>
            </span>
          </div>

          {/* Preview area */}
          <div
            className="boss-card__preview"
            style={{
              background: `linear-gradient(135deg, ${project.accentColor}22, var(--bg-tertiary))`,
            }}
          >
            {/* Decorative pixel pattern */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'var(--pixel-grid)',
                opacity: 0.5,
              }}
            />
            {/* Tagline overlay */}
            <div
              style={{
                position: 'absolute',
                bottom: '12px',
                left: '12px',
                right: '12px',
              }}
            >
              <div style={{ fontFamily: 'var(--font-subheading)', fontSize: 'var(--text-sm)', color: project.accentColor, textShadow: `0 0 10px ${project.accentColor}66` }}>
                {project.title}
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '9px', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>
                {project.tagline}
              </div>
            </div>
          </div>

          {/* Description */}
          <div style={{ padding: 'var(--sp-4)', paddingBottom: 'var(--sp-2)' }}>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
              }}
            >
              {project.description}
            </p>
          </div>

          {/* Stats */}
          <div className="boss-card__stats">
            <EnergyBar
              label="ATK"
              value={project.stats.atk}
              color="blue"
              animate
            />
            <EnergyBar
              label="DEF"
              value={project.stats.def}
              color="green"
              animate
            />
            <EnergyBar
              label="SPD"
              value={project.stats.spd}
              color="orange"
              animate
            />
            <EnergyBar
              label="MAG"
              value={project.stats.mag}
              color="pink"
              animate
            />
          </div>

          {/* Tech Stack as items */}
          <div style={{ padding: '0 var(--sp-4) var(--sp-3)' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-2)' }}>
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '7px',
                    padding: '2px 6px',
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border)',
                    color: 'var(--accent-primary)',
                    textTransform: 'uppercase',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Area: Difficulty & Actions */}
        <div>
          <div className="boss-card__difficulty">
            DIFFICULTY: {' '}
            <span style={{ color: 'var(--accent-gold)', letterSpacing: '2px' }}>
              {difficultyStars}
            </span>
          </div>

          <div className="boss-card__actions">
            <RetroButton
              variant="primary"
              as="a"
              href={project.live}
              className="!text-[8px]"
            >
              ⚔ BATTLE
            </RetroButton>
            <RetroButton
              variant="secondary"
              as="a"
              href={project.github}
              className="!text-[8px]"
            >
              📋 INTEL
            </RetroButton>
          </div>
        </div>
      </div>
    </Tilt3D>
  );
}
