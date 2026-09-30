'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useAudio } from '@/hooks/useAudio';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  vx: number;
  vy: number;
  color: string;
}

export function SwordCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSlashing, setIsSlashing] = useState(false);
  const [isDoubleSlashing, setIsDoubleSlashing] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [particles, setParticles] = useState<Sparkle[]>([]);

  const cursorRef = useRef<HTMLDivElement>(null);
  const { playLaser, playDoubleSlash } = useAudio();
  const nextId = useRef(0);
  const posRef = useRef({ x: -100, y: -100 });
  const prevPosRef = useRef({ x: -100, y: -100 });

  const isSlashingRef = useRef(false);
  const isDoubleSlashingRef = useRef(false);
  const slashTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dblSlashTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastClickTimeRef = useRef(0);
  const isHoveringRef = useRef(false);

  // Keep isHoveringRef in sync
  useEffect(() => {
    isHoveringRef.current = isHovering;
  }, [isHovering]);

  // Spawn spark particles (trail or click burst)
  const spawnParticles = useCallback((x: number, y: number, count = 2, isBurst = false) => {
    const colors = ['#00FFAA', '#00E575', '#38BDF8', '#FFD700', '#FF4477', '#FFFFFF'];
    const newSparkles: Sparkle[] = [];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = isBurst ? Math.random() * 5.5 + 2.5 : Math.random() * 1.5 + 0.5;
      newSparkles.push({
        id: nextId.current++,
        x: x + (Math.random() - 0.5) * 10,
        y: y + (Math.random() - 0.5) * 10,
        size: isBurst ? Math.random() * 5 + 3 : Math.random() * 3 + 1.5,
        opacity: 0.95,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    setParticles((prev) => [...prev.slice(-36), ...newSparkles]);
  }, []);

  useEffect(() => {
    // Only run on fine-pointer devices (desktop mice/trackpads)
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    let moveDistance = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      if (x < 1 || y < 1 || x > window.innerWidth - 1 || y > window.innerHeight - 1) {
        setIsVisible(false);
        return;
      }

      setIsVisible(true);

      const dx = x - prevPosRef.current.x;
      prevPosRef.current = { x, y };
      posRef.current = { x, y };

      const swayAngle = Math.max(-18, Math.min(18, dx * 0.75));

      // Direct DOM update for zero-latency tracking
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        const blade = cursorRef.current.querySelector<HTMLElement>('.saber-blade-sprite');
        
        // CRITICAL FIX: Only override transform if NOT currently performing a slash animation!
        if (blade && !isSlashingRef.current && !isDoubleSlashingRef.current) {
          const baseRotation = isHoveringRef.current ? -14 : 0;
          blade.style.transform = `translate(-4px, -4px) rotate(${baseRotation + swayAngle}deg) scale(${isHoveringRef.current ? 1.15 : 1})`;
        }
      }

      moveDistance += Math.hypot(dx, 0);
      if (moveDistance > 18) {
        moveDistance = 0;
        spawnParticles(x, y, 1, false);
      }

      const target = e.target as HTMLElement | null;
      const clickable = !!target?.closest(
        'a, button, input, textarea, select, [role="button"], label, .boss-card, .weapon-wheel__node, .retro-btn'
      );
      setIsHovering(clickable);
    };

    const handleMouseDown = (e: MouseEvent) => {
      const now = Date.now();
      const timeDiff = now - lastClickTimeRef.current;
      lastClickTimeRef.current = now;

      const isDblClick = timeDiff > 0 && timeDiff < 320;

      if (isDblClick) {
        // DOUBLE CLICK: EX Cross-Spin Slash Animation
        if (slashTimeoutRef.current) clearTimeout(slashTimeoutRef.current);
        if (dblSlashTimeoutRef.current) clearTimeout(dblSlashTimeoutRef.current);

        isSlashingRef.current = false;
        setIsSlashing(false);
        isDoubleSlashingRef.current = true;
        setIsDoubleSlashing(true);

        playDoubleSlash();
        spawnParticles(e.clientX, e.clientY, 22, true);

        dblSlashTimeoutRef.current = setTimeout(() => {
          isDoubleSlashingRef.current = false;
          setIsDoubleSlashing(false);
          if (cursorRef.current) {
            const blade = cursorRef.current.querySelector<HTMLElement>('.saber-blade-sprite');
            if (blade) {
              const baseRotation = isHoveringRef.current ? -14 : 0;
              blade.style.transform = `translate(-4px, -4px) rotate(${baseRotation}deg) scale(${isHoveringRef.current ? 1.15 : 1})`;
            }
          }
        }, 440);
      } else {
        // SINGLE CLICK: Saber Slash Animation
        if (dblSlashTimeoutRef.current) clearTimeout(dblSlashTimeoutRef.current);
        if (slashTimeoutRef.current) clearTimeout(slashTimeoutRef.current);

        isDoubleSlashingRef.current = false;
        setIsDoubleSlashing(false);
        isSlashingRef.current = true;
        setIsSlashing(true);

        playLaser();
        spawnParticles(e.clientX, e.clientY, 10, true);

        slashTimeoutRef.current = setTimeout(() => {
          isSlashingRef.current = false;
          setIsSlashing(false);
          if (cursorRef.current) {
            const blade = cursorRef.current.querySelector<HTMLElement>('.saber-blade-sprite');
            if (blade && !isDoubleSlashingRef.current) {
              const baseRotation = isHoveringRef.current ? -14 : 0;
              blade.style.transform = `translate(-4px, -4px) rotate(${baseRotation}deg) scale(${isHoveringRef.current ? 1.15 : 1})`;
            }
          }
        }, 220);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      prevPosRef.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);
    };
    const handleBlur = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('blur', handleBlur);
      if (slashTimeoutRef.current) clearTimeout(slashTimeoutRef.current);
      if (dblSlashTimeoutRef.current) clearTimeout(dblSlashTimeoutRef.current);
    };
  }, [playLaser, playDoubleSlash, spawnParticles]);

  // Particle physics update tick
  useEffect(() => {
    if (particles.length === 0) return;
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            opacity: p.opacity - 0.07,
            size: Math.max(0, p.size - 0.12),
          }))
          .filter((p) => p.opacity > 0)
      );
    }, 25);
    return () => clearInterval(interval);
  }, [particles.length]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[999999] overflow-hidden"
      aria-hidden="true"
      style={{
        opacity: isVisible ? 1 : 0,
        visibility: isVisible ? 'visible' : 'hidden',
        transition: 'opacity 0.15s ease',
      }}
    >
      {/* Laser Sparkle Trail Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: p.x,
            top: p.y,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            borderRadius: '1px',
            opacity: p.opacity,
            boxShadow: `0 0 6px ${p.color}`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      {/* Saber Cursor Container */}
      <div
        ref={cursorRef}
        className="absolute top-0 left-0 will-change-transform"
        style={{
          transform: 'translate3d(-100px, -100px, 0)',
        }}
      >
        {/* Animated Mega Man X4 Z-Saber Blade Sprite */}
        <div
          className="saber-blade-sprite"
          style={{
            transformOrigin: '4px 4px',
            transform: 'translate(-4px, -4px) rotate(0deg) scale(1)',
            filter: isDoubleSlashing
              ? 'drop-shadow(0 0 24px #FFD700) drop-shadow(0 0 10px #FFFFFF)'
              : isSlashing
              ? 'drop-shadow(0 0 18px #00FFAA) drop-shadow(0 0 6px #FFFFFF)'
              : isHovering
              ? 'drop-shadow(0 0 14px #00FFAA) drop-shadow(0 0 4px #FFFFFF)'
              : 'drop-shadow(0 0 6px rgba(0, 210, 106, 0.75))',
            animation: isDoubleSlashing
              ? 'mmx4-double-saber-cut 0.44s cubic-bezier(0.1, 0.9, 0.2, 1) forwards'
              : isSlashing
              ? 'mmx4-saber-cut 0.22s cubic-bezier(0.1, 0.9, 0.2, 1) forwards'
              : 'none',
            transition: isSlashing || isDoubleSlashing
              ? 'none'
              : 'transform 0.12s cubic-bezier(0.2, 0.8, 0.2, 1), filter 0.2s ease',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/mmx4-zsaber.svg"
            alt="Mega Man Z-Saber"
            width={48}
            height={48}
            className="block select-none pointer-events-none"
            style={{ imageRendering: 'pixelated' }}
          />

          {/* Single Click: Green Crescent Slash Arc Wave */}
          {isSlashing && !isDoubleSlashing && (
            <div
              className="absolute -top-6 -left-6 pointer-events-none select-none"
              style={{
                width: '96px',
                height: '96px',
                animation: 'mmx4-slash-wave 0.22s ease-out forwards',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/mmx4-slash-arc.svg"
                alt=""
                width={96}
                height={96}
                className="block select-none pointer-events-none"
                style={{ imageRendering: 'pixelated' }}
              />
            </div>
          )}

          {/* Double Click: Dual EX Cross-Slash Arc Waves */}
          {isDoubleSlashing && (
            <>
              <div
                className="absolute -top-8 -left-8 pointer-events-none select-none"
                style={{
                  width: '112px',
                  height: '112px',
                  animation: 'mmx4-cross-slash-wave-1 0.44s ease-out forwards',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/mmx4-slash-arc.svg"
                  alt=""
                  width={112}
                  height={112}
                  className="block select-none pointer-events-none"
                  style={{ imageRendering: 'pixelated', filter: 'hue-rotate(120deg)' }}
                />
              </div>
              <div
                className="absolute -top-8 -left-8 pointer-events-none select-none"
                style={{
                  width: '112px',
                  height: '112px',
                  animation: 'mmx4-cross-slash-wave-2 0.44s ease-out forwards',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/mmx4-slash-arc.svg"
                  alt=""
                  width={112}
                  height={112}
                  className="block select-none pointer-events-none"
                  style={{ imageRendering: 'pixelated', filter: 'hue-rotate(-60deg)' }}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
