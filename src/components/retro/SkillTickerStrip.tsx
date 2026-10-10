'use client';

import portfolioData from '@/data/portfolioData.json';

const tickerItems = portfolioData.softSkillStrip;

export function SkillTickerStrip() {
  return (
    <div
      className="w-full relative z-20 overflow-hidden select-none bg-rose-600 border-y-2 border-slate-900 shadow-[0_2px_8px_rgba(225,29,72,0.25)]"
      aria-label="Soft skills and mission chapters ticker"
    >
      <div className="py-2.5 flex items-center overflow-hidden">
        {/* Infinite Marquee Track (repeated for seamless loop) */}
        <div className="animate-marquee flex items-center whitespace-nowrap">
          {[...tickerItems, ...tickerItems].map((item, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-2.5 px-3 font-heading text-xs text-white tracking-widest font-bold"
            >
              <svg
                className="w-3.5 h-3.5 text-amber-300 fill-current shrink-0"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className="leading-none">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
