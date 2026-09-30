'use client';

import React, { useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useMotionTemplate,
} from 'framer-motion';
import { cn } from '@/lib/utils';

interface Tilt3DProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  enableScanline?: boolean; // Kept for backwards-compat (deprecated)
  enableHudCorners?: boolean;
  style?: React.CSSProperties;
}

export function Tilt3D({
  children,
  className,
  maxTilt = 10,
  scale = 1.02,
  enableHudCorners = true,
  style,
}: Tilt3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const smoothX = useSpring(mouseX, { stiffness: 300, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 300, damping: 25 });

  const rotateX = useTransform(smoothY, [0, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(smoothX, [0, 1], [-maxTilt, maxTilt]);

  const glareX = useTransform(smoothX, [0, 1], [0, 100]);
  const glareY = useTransform(smoothY, [0, 1], [0, 100]);

  const glareBackground = useMotionTemplate`radial-gradient(circle 280px at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.22), transparent 75%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale }}
      transition={{ duration: 0.2 }}
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
        rotateX,
        rotateY,
        ...style,
      }}
      className={cn('relative will-change-transform card-hud-hover', className)}
    >
      {/* Tactical HUD Corner Brackets on Hover */}
      {enableHudCorners && (
        <>
          <span className="card-hud-bracket card-hud-tl" style={{ opacity: isHovered ? 1 : 0 }} />
          <span className="card-hud-bracket card-hud-tr" style={{ opacity: isHovered ? 1 : 0 }} />
          <span className="card-hud-bracket card-hud-bl" style={{ opacity: isHovered ? 1 : 0 }} />
          <span className="card-hud-bracket card-hud-br" style={{ opacity: isHovered ? 1 : 0 }} />
        </>
      )}

      {/* Holographic Glare Overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] transition-opacity duration-300"
        style={{
          background: glareBackground,
          opacity: isHovered ? 0.16 : 0,
        }}
      />

      {children}
    </motion.div>
  );
}
