'use client';

import React from 'react';
import { getSkillMastery } from '@/data/skills';
import { cn } from '@/lib/utils';

interface RadialSkillGaugeProps {
  level: number;
  className?: string;
  size?: number;
}

export function RadialSkillGauge({
  level,
  className,
  size = 72,
}: RadialSkillGaugeProps) {
  const mastery = getSkillMastery(level);
  const strokeWidth = 6;
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (level / 100) * circumference;

  return (
    <div
      className={cn(
        'p-3 bg-slate-50 border-2 border-slate-900 shadow-[2px_2px_0px_#0F172A] rounded-sm flex items-center gap-3.5',
        className
      )}
    >
      {/* Circular Gauge Dial */}
      <div
        className="relative flex-shrink-0 flex items-center justify-center select-none"
        style={{ width: size, height: size }}
      >
        <svg
          className="w-full h-full -rotate-90"
          viewBox={`0 0 ${size} ${size}`}
        >
          {/* Outer Border Guide / Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#E2E8F0"
            strokeWidth={strokeWidth}
            fill="none"
          />

          {/* Retro Segment Tick Ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius - 4.5}
            stroke="#CBD5E1"
            strokeWidth={1.2}
            strokeDasharray="2, 4"
            fill="none"
          />

          {/* Active Meter Arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={mastery.color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={progressOffset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
            style={{
              filter: `drop-shadow(0 0 5px ${mastery.color}55)`,
            }}
          />
        </svg>

        {/* Center Percentage Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span
            className="text-xs font-bold font-mono text-slate-900 leading-none"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {level}%
          </span>
          <span className="text-[6.5px] font-mono text-slate-500 uppercase tracking-widest mt-0.5">
            PWR
          </span>
        </div>
      </div>

      {/* Mastery Tier & Adjective Details */}
      <div className="flex flex-col gap-1 min-w-0 flex-1 justify-center">
        <div className="flex items-center justify-between text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest">
          <span>MASTERY TIER</span>
          <span className="text-[8px] font-mono text-slate-400">LVL {level}/100</span>
        </div>

        {/* Adjective Badge (Feeble -> Capable -> Masterful -> Godlike) */}
        <div
          className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-white border-2 border-slate-900 shadow-[1px_1px_0px_#0F172A] rounded-sm w-fit whitespace-nowrap"
        >
          <span className="text-[11px] leading-none" style={{ color: mastery.color }}>
            {mastery.symbol}
          </span>
          <span
            className="font-mono font-bold uppercase tracking-wide whitespace-nowrap"
            style={{
              color: mastery.color,
              fontFamily: 'var(--font-heading)',
              fontSize: '8.5px',
              lineHeight: 1.2,
            }}
          >
            {mastery.adjective}
          </span>
        </div>

        <span className="text-[8.5px] font-mono text-slate-600 leading-snug mt-0.5">
          {mastery.description}
        </span>
      </div>
    </div>
  );
}
