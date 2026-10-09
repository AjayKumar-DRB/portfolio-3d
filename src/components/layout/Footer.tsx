'use client';

export function Footer() {
  return (
    <footer
      style={{
        padding: 'var(--sp-8) var(--sp-6)',
        borderTop: '2px solid var(--border)',
        background: 'var(--bg-secondary)',
        textAlign: 'center',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '7px',
          color: 'var(--text-dim)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        }}
      >
        {`© ${new Date().getFullYear()} AK.DRB // ALL SYSTEMS OPERATIONAL`}
      </p>
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
    </footer>
  );
}
