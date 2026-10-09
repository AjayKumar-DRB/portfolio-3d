'use client';

import portfolioData from '@/data/portfolioData.json';

const tickerItems = portfolioData.softSkillStrip;

export function SkillTickerStrip() {
  return (
    <div
      className="w-full relative z-20 overflow-hidden select-none"
      style={{
        background: '#E11D48',
        borderTop: '2px solid #0F172A',
        borderBottom: '2px solid #0F172A',
        boxShadow: '0 2px 8px rgba(225, 29, 72, 0.25)',
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
                fontFamily: 'var(--font-heading)',
                fontSize: '10px',
                color: '#FFFFFF',
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
