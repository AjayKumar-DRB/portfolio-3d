'use client';

import { type ReactNode, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface RetroButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'pink' | 'gold';
  as?: 'button' | 'a';
  href?: string;
  children: ReactNode;
}

export function RetroButton({
  variant = 'primary',
  as = 'button',
  href,
  children,
  className,
  ...props
}: RetroButtonProps) {
  const variantClass = {
    primary: 'retro-btn',
    secondary: 'retro-btn retro-btn--secondary',
    pink: 'retro-btn retro-btn--pink',
    gold: 'retro-btn retro-btn--gold',
  }[variant];

  if (as === 'a' && href) {
    return (
      <a
        href={href}
        className={cn(variantClass, className)}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={cn(variantClass, className)} {...props}>
      {children}
    </button>
  );
}
