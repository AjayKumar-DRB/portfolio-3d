'use client';

import { useThemeStore } from '@/stores/themeStore';

export function Footer() {
  const theme = useThemeStore((s) => s.theme);
  const isRetro = theme === 'retro';

  return (
    <footer
      style={{
        padding: 'var(--sp-8) var(--sp-6)',
        borderTop: isRetro ? '2px solid var(--border)' : '1px solid var(--border)',
        background: 'var(--bg-secondary)',
        textAlign: 'center',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <p
        style={{
          fontFamily: isRetro ? 'var(--font-heading)' : 'var(--font-body)',
          fontSize: isRetro ? '7px' : 'var(--text-xs)',
          color: 'var(--text-dim)',
          textTransform: isRetro ? 'uppercase' : 'none',
          letterSpacing: isRetro ? '0.1em' : 'normal',
        }}
      >
        {isRetro
          ? `© ${new Date().getFullYear()} AK.DRB // ALL SYSTEMS OPERATIONAL`
          : `© ${new Date().getFullYear()} Ajay Kumar DRB. All rights reserved.`}
      </p>
      {isRetro && (
        <p
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '7px',
            color: 'var(--accent-primary)',
            marginTop: 'var(--sp-2)',
            opacity: 0.85,
          }}
        >
          {'<< 32-BIT RETRO ZERO ENGINE // POWERED BY NEXT.JS + GSAP + ❤ >>'}
        </p>
      )}
    </footer>
  );
}
