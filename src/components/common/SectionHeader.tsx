'use client';

import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  stage?: string;
  title?: string;
  retroTitle?: string;
  subtitle: string;
  className?: string;
  accentColor?: string;
  badge?: string;
}

export function SectionHeader({
  stage,
  title,
  retroTitle,
  subtitle,
  className,
  badge,
}: SectionHeaderProps) {
  const displayTitle = title || retroTitle || '';

  return (
    <div className={cn('mb-10 md:mb-14 text-left select-none', className)}>
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        {/* Left Column: Stage + Main Title + Subtitle */}
        <div className="flex-1 max-w-4xl">
          {/* Stage / Section Tag */}
          {stage && (
            <div
              className="mb-2.5 font-bold uppercase select-none text-rose-600 font-mono tracking-[0.2em] text-[11px]"
              style={{
                fontFamily: 'var(--font-heading)',
                color: '#E11D48',
                background: 'transparent',
                border: 'none',
              }}
            >
              {stage}
            </div>
          )}

          {/* Heading - Bebas Neue display typography */}
          <h2
            className="block font-bold uppercase tracking-tight text-left"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 5.2vw, 3.8rem)',
              fontWeight: 700,
              color: '#0F172A',
              letterSpacing: '-0.01em',
              lineHeight: 0.95,
              textShadow: 'none',
              marginTop: '4px',
              marginBottom: '10px',
            }}
          >
            <span className="glitch-text" data-text={displayTitle}>
              {displayTitle}
            </span>
          </h2>

          {/* Subtitle */}
          <p
            className="text-left text-sm sm:text-base leading-relaxed max-w-3xl"
            style={{
              fontFamily: 'var(--font-body)',
              color: '#334155',
              fontWeight: 400,
              lineHeight: 1.6,
            }}
          >
            {subtitle}
          </p>
        </div>

        {/* Optional Right Badge (e.g. "LV.01 · LV.09") */}
        {badge && (
          <div className="self-start sm:self-center px-3 py-1.5 bg-white border-2 border-slate-900 shadow-[3px_3px_0px_#0F172A] text-slate-900 font-mono text-xs font-bold tracking-wider select-none">
            {badge}
          </div>
        )}
      </div>
    </div>
  );
}
