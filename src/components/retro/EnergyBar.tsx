'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface EnergyBarProps {
  /** Value 0-100 */
  value: number;
  /** Color variant */
  color?: 'blue' | 'pink' | 'green' | 'orange' | 'gradient';
  /** Label text (e.g., "ATK") */
  label?: string;
  /** Show numeric value */
  showValue?: boolean;
  className?: string;
  /** Whether to animate on mount */
  animate?: boolean;
}

export function EnergyBar({
  value,
  color = 'blue',
  label,
  showValue = true,
  className,
  animate = true,
}: EnergyBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className={cn('flex items-center gap-3', className)}>
      {label && (
        <span
          className="w-8 flex-shrink-0 text-right"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '8px',
            color: 'var(--text-secondary)',
            textTransform: 'uppercase',
          }}
        >
          {label}
        </span>
      )}
      <div className="energy-bar flex-1">
        <motion.div
          className={cn('energy-bar__fill', `energy-bar__fill--${color}`)}
          initial={{ width: 0 }}
          animate={{ width: `${clampedValue}%` }}
          transition={animate ? { duration: 0.8, ease: 'easeOut' } : { duration: 0 }}
        />
      </div>
      {showValue && (
        <span
          className="w-8 flex-shrink-0 text-right"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '8px',
            color: 'var(--text-primary)',
          }}
        >
          {clampedValue}
        </span>
      )}
    </div>
  );
}
