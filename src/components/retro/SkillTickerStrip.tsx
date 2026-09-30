'use client';

import { useThemeStore } from '@/stores/themeStore';
import portfolioData from '@/data/portfolioData.json';

const tickerItems = portfolioData.softSkillStrip;

export function SkillTickerStrip() {
  const theme = useThemeStore((s) => s.theme);
  const isRetro = theme === 'retro';

  return (
    <div
      className="w-full relative z-20 overflow-hidden select-none"
      style={{
        background: isRetro ? '#E11D48' : 'var(--bg-secondary)',
        borderTop: '2px solid #0F172A',
        borderBottom: '2px solid #0F172A',
        boxShadow: isRetro ? '0 2px 8px rgba(225, 29, 72, 0.25)' : 'none',
      }}
      aria-label="Soft skills and mission chapters ticker"
    >
      <div className="py-2.5 flex items-center overflow-hidden">
        {/* Infinite Marquee Track (repeated for seamless loop) */}
        <div className="animate-marquee flex items-center whitespace-nowrap">
          {[...tickerItems, ...tickerItems].map((item, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-3 px-3"
              style={{
                fontFamily: isRetro ? 'var(--font-heading)' : 'var(--font-jetbrains-mono)',
                fontSize: isRetro ? '10px' : '11px',
                color: isRetro ? '#FFFFFF' : 'var(--text-primary)',
                letterSpacing: '0.12em',
                fontWeight: 700,
              }}
            >
              <span className="text-amber-300 font-bold">★</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
