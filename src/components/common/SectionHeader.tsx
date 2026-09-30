'use client';

import { useThemeStore } from '@/stores/themeStore';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  stage?: string;
  retroTitle: string;
  sleekTitle: string;
  subtitle: string;
  className?: string;
  accentColor?: string;
  badge?: string;
}

export function SectionHeader({
  stage,
  retroTitle,
  sleekTitle,
  subtitle,
  className,
  accentColor = '#00FFAA',
  badge,
}: SectionHeaderProps) {
  const theme = useThemeStore((s) => s.theme);
  const isRetro = theme === 'retro';
  const displayTitle = isRetro ? retroTitle : sleekTitle;

  return (
    <div className={cn('mb-10 md:mb-14 text-left select-none', className)}>
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        {/* Left Column: Stage + Main Title + Subtitle */}
        <div className="flex-1 max-w-4xl">
          {/* Stage / Section Tag */}
          {stage && (
            <div
              className={cn(
                'mb-2.5 font-bold uppercase select-none',
                isRetro
                  ? 'text-rose-600 font-mono tracking-[0.2em] text-[11px]'
                  : 'inline-block px-3 py-1 rounded-sm text-xs font-mono tracking-widest'
              )}
              style={{
                fontFamily: isRetro ? 'var(--font-heading)' : 'var(--font-jetbrains-mono)',
                color: isRetro ? '#E11D48' : accentColor,
                background: isRetro ? 'transparent' : `${accentColor}15`,
                border: isRetro ? 'none' : `1px solid ${accentColor}33`,
              }}
            >
              {stage}
            </div>
          )}

          {/* Heading - Styled matching User Image 3 font size, weight and Bebas Neue display typography */}
          <h2
            className="block font-bold uppercase tracking-tight text-left"
            style={{
              fontFamily: isRetro ? 'var(--font-display)' : 'var(--font-outfit)',
              fontSize: isRetro ? 'clamp(2.4rem, 5.2vw, 3.8rem)' : 'clamp(28px, 4.5vw, 48px)',
              fontWeight: 700,
              color: isRetro ? '#0F172A' : 'var(--text-primary)',
              letterSpacing: isRetro ? '-0.01em' : '-0.02em',
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

          {/* Subtitle - Relaxed font size & weight matching Image 3 */}
          <p
            className="text-left text-sm sm:text-base leading-relaxed max-w-3xl"
            style={{
              fontFamily: isRetro ? 'var(--font-body)' : 'var(--font-inter)',
              color: isRetro ? '#334155' : 'var(--text-secondary)',
              fontWeight: 400,
              lineHeight: 1.6,
            }}
          >
            {subtitle}
          </p>
        </div>

        {/* Optional Right Badge (e.g. "LV.01 · LV.09" from Image 1) */}
        {badge && isRetro && (
          <div className="self-start sm:self-center px-3 py-1.5 bg-white border-2 border-slate-900 shadow-[3px_3px_0px_#0F172A] text-slate-900 font-mono text-xs font-bold tracking-wider select-none">
            {badge}
          </div>
        )}
      </div>
    </div>
  );
}
