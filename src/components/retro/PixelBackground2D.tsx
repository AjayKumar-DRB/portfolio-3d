'use client';

import { useEffect, useRef } from 'react';
import { useThemeStore } from '@/stores/themeStore';

interface SparkParticle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  color: string;
  opacity: number;
}

export function PixelBackground2D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollProgress = useThemeStore((s) => s.scrollProgress);
  const scrollRef = useRef(scrollProgress);

  useEffect(() => {
    scrollRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Color palette inspired by Mega Man Zero images
    const colors = [
      'rgba(0, 210, 106, ',   // Z-Saber Emerald Green
      'rgba(225, 29, 72, ',   // Zero Crimson Red
      'rgba(2, 132, 199, ',   // Energy Whip Blue
      'rgba(217, 119, 6, ',   // Blonde Amber Gold
    ];

    // Initialize 60 floating particles
    const particles: SparkParticle[] = Array.from({ length: 60 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.floor(Math.random() * 3) + 2, // 2-4px pixel squares
      speedY: -(Math.random() * 0.8 + 0.3),
      speedX: (Math.random() - 0.5) * 0.4,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.7 + 0.2,
    }));

    let step = 0;

    const render = () => {
      step++;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw light retro tech grid (24px matching lovable preview)
      const gridSize = 24;
      const offsetY = (scrollRef.current * 120 + step * 0.2) % gridSize;

      ctx.strokeStyle = 'rgba(15, 23, 42, 0.055)';
      ctx.lineWidth = 1;

      // Vertical grid lines
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Horizontal grid lines
      for (let y = offsetY; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Draw subtle green beam energy lines (from Z-Saber)
      const beamX = ((step * 0.5) % (width + 400)) - 200;
      const gradient = ctx.createLinearGradient(beamX - 100, 0, beamX + 100, height);
      gradient.addColorStop(0, 'rgba(0, 210, 106, 0)');
      gradient.addColorStop(0.5, 'rgba(0, 210, 106, 0.03)');
      gradient.addColorStop(1, 'rgba(0, 210, 106, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // 3. Draw and update pixel spark particles
      for (const p of particles) {
        p.y += p.speedY;
        p.x += p.speedX;

        // Reset if drifted off screen
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.fillStyle = `${p.color}${p.opacity})`;
        // Pixel-perfect square particles
        ctx.fillRect(Math.floor(p.x), Math.floor(p.y), p.size, p.size);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* 2D HTML5 Canvas Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ background: 'var(--bg-primary)' }}
        aria-hidden="true"
      />

      {/* Cyber Anime HUD Overlays with Screen Edge Vignette */}
      <div
        className="fixed inset-0 pointer-events-none z-[1] select-none shadow-[inset_0_0_60px_rgba(56,189,248,0.14)]"
        aria-hidden="true"
      >

        {/* Bottom-left Status Bar */}
        {/* Bottom-left Status Bar matching screenshot */}
        <div className="absolute bottom-3 left-6 hidden lg:flex items-center gap-3 font-mono text-[8px] text-slate-500 select-none">
          <span className="text-emerald-600 font-bold">⚔ Z-SABER</span>
          <span className="text-slate-400">OUTPUT: 8.4 GHz</span>
          <span className="text-rose-600 font-semibold">HUNTER PROTOCOL ACTIVE</span>
        </div>

        {/* Bottom-right Version Indicator matching screenshot */}
        <div className="absolute bottom-3 right-6 hidden lg:flex items-center gap-2 font-mono text-[8px] text-slate-500 select-none">
          <span>v2.1 // 32-BIT LIGHT</span>
        </div>

        {/* Four Corner Reticles */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-rose-600 pointer-events-none" />
        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-emerald-500 pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-emerald-500 pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-rose-600 pointer-events-none" />
      </div>
    </>
  );
}
