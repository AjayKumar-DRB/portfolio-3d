'use client';

import React from 'react';

interface PixelIconProps {
  id: string;
  size?: number;
  color?: string;
  className?: string;
}

/**
 * Authentic 8-bit Pixel Art Icon Collection for Developer Tech Stack.
 * Rendered on a 24x24 pixel grid with shapeRendering="crispEdges"
 * for razor-sharp pixel blocks without anti-aliasing blur.
 */
export function PixelSkillIcon({
  id,
  size = 24,
  color = 'currentColor',
  className = '',
}: PixelIconProps) {
  const normId = id.toLowerCase().replace(/[^a-z0-9]/g, '');

  const renderPath = () => {
    switch (normId) {
      // ── FRONTEND ──
      case 'react':
      case 'reactjs':
        // Authentic pixel atom (pixelarticons react)
        return (
          <path d="M8 22H4V20H8V22ZM20 22H16V20H20V22ZM4 20H2V16H4V20ZM10 20H8V18H10V20ZM16 20H14V18H16V20ZM22 20H20V16H22V20ZM14 18H10V16H14V18ZM6 16H4V14H6V16ZM10 16H8V14H10V16ZM16 16H14V14H16V16ZM20 16H18V14H20V16ZM4 14H2V10H4V14ZM8 14H6V10H8V14ZM14 14H10V10H14V14ZM18 14H16V10H18V14ZM22 14H20V10H22V14ZM6 10H4V8H6V10ZM10 10H8V8H10V10ZM16 10H14V8H16V10ZM20 10H18V8H20V10ZM4 8H2V4H4V8ZM14 8H10V6H14V8ZM22 8H20V4H22V8ZM10 6H8V4H10V6ZM16 6H14V4H16V6ZM8 4H4V2H8V4ZM20 4H16V2H20V4Z" />
        );

      case 'nextjs':
      case 'next':
        // Pixel Next.js 'N' with diagonal cut
        return (
          <>
            <path d="M4 4h3v16H4zM17 4h3v16h-3z" />
            <path d="M7 6h2v2H7zm2 2h2v2H9zm2 2h2v2h-2zm2 2h2v2h-2zm2 2h2v2h-2zm2 2h2v2h-2z" />
          </>
        );

      case 'typescript':
      case 'ts':
        // Pixel 'TS' cartridge badge
        return (
          <>
            <path d="M2 3h20v2H2zm0 16h20v2H2zM2 5h2v14H2zm18 0h2v14h-2z" />
            {/* T */}
            <path d="M5 7h6v2H5zm2 2h2v7H7z" />
            {/* S */}
            <path d="M13 7h6v2h-6zm4 2h2v2h-2zm-4 2h6v2h-6zm-2 2h2v2h-2zm2 2h6v2h-6z" />
          </>
        );

      case 'redux':
      case 'reduxtoolkit':
        // Pixel state triangular orbit / nodes
        return (
          <>
            <path d="M10 10h4v4h-4zM10 3h4v4h-4zM4 16h4v4H4zM16 16h4v4h-4z" />
            <path d="M11 7h2v3h-2zm-3 5h2v2H8zm6 0h2v2h-2zm-3 2h2v2h-2z" />
          </>
        );

      case 'tailwind':
      case 'tailwindcss':
        // Pixel dual wind waves
        return (
          <>
            <path d="M7 6h3v2H7zm3-2h4v2h-4zm4 0h3v2h-3zm-6 4h2v2H8zm4 0h3v2h-3zm-6 2h2v2H6zm6 0h2v2h-2z" />
            <path d="M11 14h3v2h-3zm3-2h4v2h-4zm4 0h3v2h-3zm-6 4h2v2h-2zm4 0h3v2h-3zm-6 2h2v2h-2zm6 0h2v2h-2z" />
          </>
        );

      // ── BACKEND ──
      case 'nodejs':
      case 'node':
        // Pixel hexagon with core
        return (
          <>
            <path d="M9 3h6v2H9zm6 2h2v2h-2zm2 2h2v2h-2zm1 2h2v6h-2zm-1 6h-2v2h2zm-2 2h-2v2h2zm-4 2H9v-2h4zm-4-2H5v-2h2zm-2-2H4v-2h2zm-1-2H2V9h2zm1-2h2V5H4zm2-2h2V3H6zm3 0h6v2H9z" />
            <path d="M8 8h2v8H8zm6 0h2v8h-2zm-4 2h2v2h-2zm2 2h2v2h-2z" />
          </>
        );

      case 'express':
      case 'expressjs':
        // Pixel lightning bolt / zap
        return (
          <path d="M4 13h8v6h2v2h-2v2h-2v-8H2v-4h2v2Zm12 6h-2v-2h2v2Zm2-2h-2v-2h2v2Zm2-2h-2v-2h2v2Zm-6-6h8v4h-2v-2h-8V5h-2V3h2V1h2v8Zm-8 2H4V9h2v2Zm2-2H6V7h2v2Zm2-2H8V5h2v2Z" />
        );

      case 'nestjs':
      case 'nest':
        // Pixel fire cat crest
        return (
          <>
            <path d="M4 3h4v3H4zm12 0h4v3h-4z" />
            <path d="M3 6h18v6H3zm2 6h14v4H5zm2 4h10v3H7zm3 3h4v3h-4z" />
            <path d="M7 8h2v2H7zm8 0h2v2h-2zm-5 3h4v1h-4z" fill="#0F172A" />
          </>
        );

      case 'python':
      case 'py':
        // Pixel interlocking dual snakes
        return (
          <>
            <path d="M6 3h8v2H6zm8 2h3v4h-3zM6 5h2v4H6zm2 4h8v2H8zm2-4h2v2h-2z" />
            <path d="M10 19h8v2h-8zm-3-4h3v4H7zm8-2h2v4h-2zm-8-2h8v2H7zm4 4h2v2h-2z" />
          </>
        );

      case 'restapis':
      case 'rest':
      case 'api':
        // Pixel link / API communication transfer
        return (
          <path d="M4 6h7v2H4zm0 10h7v2H4zM2 8h2v8H2zm18-2h-7v2h7zm0 10h-7v2h7zm2-8h-2v8h2zM7 11h10v2H7z" />
        );

      // ── DATABASES ──
      case 'postgresql':
      case 'postgres':
        // Pixel relational database cylinders
        return (
          <path d="M2 6h2v4H2zm0 4h2v4H2zm0 4h2v4H2zm18-8h2v4h-2zm0 4h2v4h-2zm0 4h2v4h-2zM4 4h4v2H4zm0 8h4v-2H4zm0 4h4v-2H4zm0 4h4v-2H4zM16 4h4v2h-4zm0 8h4v-2h-4zm0 4h4v-2h-4zm0 4h4v-2h-4zM8 2h8v2H8zm0 12h8v-2H8zm0 4h8v-2H8zm0 4h8v-2H8z" />
        );

      case 'mongodb':
      case 'mongo':
        // Pixel leaf / crystal
        return (
          <>
            <path d="M11 2h2v2h-2zm-1 2h4v3h-4zm-2 3h8v4H8zm-1 4h10v5H7zm2 5h6v3H9zm2 3h2v3h-2z" />
            <path d="M11 5h2v14h-2z" fill="#0F172A" />
          </>
        );

      case 'redis':
        // Pixel stacked memory cache plates
        return (
          <>
            <path d="M3 4h16v3H3zm2-1h12v1H5zm0 4h12v1H5z" />
            <path d="M3 10h16v3H3zm2-1h12v1H5zm0 4h12v1H5z" />
            <path d="M3 16h16v3H3zm2-1h12v1H5zm0 4h12v1H5z" />
            <path d="M20 5h3v2h-3zm0 6h3v2h-3zm0 6h3v2h-3z" />
          </>
        );

      case 'mysql':
      case 'sql':
        // Pixel SQL data table / database
        return (
          <>
            <path d="M3 4h18v2H3zm0 14h18v2H3zM3 6h2v12H3zm16 0h2v12h-2z" />
            <path d="M5 9h14v2H5zm0 4h14v2H5zm4-5h2v10H9zm5 0h2v10h-2z" />
          </>
        );

      // ── DEVOPS ──
      case 'docker':
        // Authentic pixel whale with containers
        return (
          <path d="M16 20H6v-2h10v2ZM6 18H4v-2h2v2Zm12 0h-2v-2h2v2Zm2-2h-2v-4H4v4H2v-6h16V8h2v8ZM9 15H7v-2h2v2ZM6 8H4V6h2v2Zm3 0H7V6h2v2Zm3 0h-2V6h2v2Zm6 0h-2V6h2v2Zm4 0h-2V6h2v2ZM9 5H7V3h2v2Zm3 0h-2V3h2v2Z" />
        );

      case 'githubactions':
      case 'ghactions':
      case 'actions':
        // Pixel automated workflow loop
        return (
          <>
            <path d="M18 10h-2V6h-4V4h6v6zm-6 8h6v-2h-4v-4h-2v6zm-6-6h2v4h4v2H6v-6z" />
            <path d="M10 2h4v2h-4zm0 16h4v2h-4zM2 10h2v4H2zm18 0h2v4h-2z" />
            <path d="M11 9h2v2h-2zm0 4h2v2h-2zm2-2h2v2h-2z" />
          </>
        );

      case 'git':
      case 'github':
        // Authentic pixel git branch
        return (
          <path d="M4 14h4v2H4zm0 6h4v2H4zm-2-4h2v4H2zm6 0h2v4H8zm8-14h4v2h-4zm0 6h4v2h-4zm-2-4h2v4h-2zm6 0h2v4h-2zm-8 13h5v2h-5zm5-5h2v5h-2zM5 2h2v10H5z" />
        );

      case 'vercel':
      case 'netlify':
        // Pixel triangle / cloud deploy
        return (
          <>
            <path d="M11 4h2v2h-2zm-2 2h2v2H9zm-2 2h2v2H7zm-2 2h2v2H5zm-2 2h2v2H3zm-2 2h20v2H1z" />
            <path d="M13 6h2v2h-2zm2 2h2v2h-2zm2 2h2v2h-2zm2 2h2v2h-2z" />
            <path d="M10 6h4v2h-4zm-2 2h8v2H8zm-2 2h12v2H6zm-2 2h16v2H4z" />
          </>
        );

      // ── TESTING ──
      case 'qarigor':
      case 'qa':
      case 'testing':
        // Authentic pixel bug / target
        return (
          <>
            <path d="M2 5h2v4H2zm20 0h-2v4h2zM4 9h2v2H4zm16 0h-2v2h2zM2 13h4v2H2zm20 0h-4v2h4zM4 17h2v2H4zm16 0h-2v2h2zM2 19h2v2H2zm20 0h-2v2h2zM6 11h12v2H6z" />
            <path d="M6 7h2v12H6zm10 0h2v12h-2zM8 19h8v2H8zM8 5h8v2H8z" />
            <path d="M11 15h2v6h-2zM8 1h2v6H8zm6 0h2v6h-2z" />
          </>
        );

      case 'jest':
        // Pixel double checkmark (verified test pass)
        return (
          <path d="M7 18H5v-2h2v2Zm6 0h-2v-2h2v2Zm-8-2H3v-2h2v2Zm4 0H7v-2h2v2Zm6-2v2h-2v-2h2ZM3 14H1v-2h2v2Zm8 0H9v-2h2v2Zm6 0h-2v-2h2v2Zm-4-2h-2v-2h2v2Zm6 0h-2v-2h2v2Zm-4-2h-2V8h2v2Zm6 0h-2V8h2v2Zm-4-2h-2V6h2v2Zm6 0h-2V6h2v2Z" />
        );

      case 'postman':
        // Pixel payload rocket
        return (
          <>
            <path d="M11 2h2v2h-2zm-1 2h4v3h-4zm-1 3h6v7H9z" />
            <path d="M11 7h2v3h-2z" fill="#0F172A" />
            <path d="M6 12h3v4H6zm9 0h3v4h-3zM4 15h2v3H4zm14 0h2v3h-2z" />
            <path d="M10 15h4v3h-4zm1 3h2v3h-2z" />
          </>
        );

      // ── INTEGRATIONS ──
      case 'stripe':
        // Pixel credit card terminal
        return (
          <>
            <path d="M4 4h16v2H4zm0 14h16v2H4zM2 6h2v12H2zm18 0h2v12h-2zM4 8h16v4H4zm2 6h6v2H6z" />
            <path d="M14 13h4v3h-4z" />
          </>
        );

      case 'paypal':
        // Pixel coins / wallet
        return (
          <>
            <path d="M6 2h6v2H6zM4 4h2v2H4zm8 0h2v2h-2zm-8 8h2v2H4zm8 0h2v2h-2zm-6 2h6v2H6zM2 6h2v6H2zm12 0h2v6h-2z" />
            <path d="M14 8h4v2h-4zm-4 10h2v2h-2zm8-8h2v2h-2zm-6 10h2v2h-2zm6-2h2v2h-2z" />
            <path d="M12 20h6v2h-6zm-4-6h2v4H8zm12-2h2v6h-2zM7 6h4v2H7z" />
            <path d="M9 6h2v6H9zm6 8h2v4h-2zm-1-2h3v2h-3z" />
          </>
        );

      case 'claudeapi':
      case 'claude':
      case 'ai':
        // Pixel CPU / Neural AI processor
        return (
          <path d="M5 3h14v2H5zm0 16h14v2H5zM3 5h2v14H3zm16 0h2v14h-2zM9 7h6v2H9zm0 8h6v2H9zM7 9h2v6H7zm8 0h2v6h-2zm-4-8h2v2h-2zm0 20h2v2h-2zM1 11h2v2H1zm20 0h2v2h-2zm0-4h2v2h-2zm0 8h2v2h-2zM1 15h2v2H1zm0-8h2v2H1zm6-6h2v2H7zm8 0h2v2h-2zm0 20h2v2h-2zm-8 0h2v2H7z" />
        );

      default:
        // Generic pixel chip
        return (
          <path d="M4 4h16v16H4zm2 2v12h12V6H6zm3 3h6v6H9V9z" />
        );
    }
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={color}
      shapeRendering="crispEdges"
      className={className}
      style={{ imageRendering: 'pixelated' }}
    >
      {renderPath()}
    </svg>
  );
}
