import type { Metadata } from 'next';
import {
  Press_Start_2P,
  Silkscreen,
  IBM_Plex_Mono,
  Outfit,
  Inter,
  JetBrains_Mono,
  Bebas_Neue,
} from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas-neue',
  display: 'swap',
});

// ---- Retro Fonts ----
const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-press-start',
  display: 'swap',
});

const silkscreen = Silkscreen({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-silkscreen',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
});

// ---- Sleek Fonts ----
const outfit = Outfit({
  weight: ['600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const inter = Inter({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// ---- Shared ----
const jetbrainsMono = JetBrains_Mono({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Ajay Kumar DRB | Full-Stack Developer Portfolio',
  description:
    'Full-stack developer portfolio showcasing the journey from mechanical engineering to building scalable web applications. Built with Three.js, Next.js, and GSAP.',
  openGraph: {
    title: 'Ajay Kumar DRB — Developer Portfolio',
    description:
      'Full-stack developer. Systems thinker. Interactive 3D portfolio with dual themes.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ajay Kumar DRB — Developer Portfolio',
    description:
      'Full-stack developer. Systems thinker. Interactive 3D portfolio experience.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="retro"
      suppressHydrationWarning
      className={`
        ${pressStart2P.variable}
        ${silkscreen.variable}
        ${ibmPlexMono.variable}
        ${outfit.variable}
        ${inter.variable}
        ${jetbrainsMono.variable}
        ${bebasNeue.variable}
        antialiased
      `}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Ajay Kumar DRB',
              jobTitle: 'Full-Stack Developer',
              url: 'https://ajaykumardrb.dev',
              sameAs: [],
            }),
          }}
        />
      </head>
      <body style={{ minHeight: '100vh' }}>
        {/* Accessibility: Skip link */}
        <a href="#hero" className="skip-link">
          Skip to main content
        </a>

        {children}

        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-body)',
            },
          }}
        />
      </body>
    </html>
  );
}
