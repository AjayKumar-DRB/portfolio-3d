'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useThemeStore } from '@/stores/themeStore';
import * as THREE from 'three';

/** Retro 3D scene — pixelated terrain with scroll-driven camera */
export function RetroScene() {
  const groupRef = useRef<THREE.Group>(null);
  const scrollProgress = useThemeStore((s) => s.scrollProgress);

  return (
    <group ref={groupRef}>
      {/* Ambient lighting — low for retro mood */}
      <ambientLight intensity={0.15} color="#1a1a3e" />

      {/* Key light — electric blue tint */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={0.6}
        color="#00D4FF"
        castShadow={false}
      />

      {/* Fill light — pink accent */}
      <pointLight position={[-5, 3, -3]} intensity={0.3} color="#FF2E7E" />

      {/* Terrain */}
      <RetroTerrain scrollProgress={scrollProgress} />

      {/* Floating particles */}
      <RetroParticles scrollProgress={scrollProgress} />

      {/* Grid floor */}
      <RetroGrid scrollProgress={scrollProgress} />
    </group>
  );
}

/** Procedural terrain that deforms based on scroll */
function RetroTerrain({ scrollProgress }: { scrollProgress: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(30, 30, 64, 64);
    geo.rotateX(-Math.PI * 0.5);
    return geo;
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const positions = meshRef.current.geometry.attributes.position;
    const time = clock.getElapsedTime() * 0.3;

    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const z = positions.getZ(i);

      // Scroll-offset terrain displacement
      const scrollOffset = scrollProgress * 20;
      const height =
        Math.sin((x + scrollOffset) * 0.5 + time) * 0.8 +
        Math.sin((z + scrollOffset) * 0.3 + time * 0.7) * 0.6 +
        Math.cos((x * z) * 0.1 + time * 0.5) * 0.4;

      // Step the height for pixel-art feel (quantize)
      const stepped = Math.round(height * 4) / 4;
      positions.setY(i, stepped);
    }
    positions.needsUpdate = true;
    meshRef.current.geometry.computeVertexNormals();
  });

  return (
    <mesh ref={meshRef} geometry={geometry} position={[0, -2, -5]}>
      <meshStandardMaterial
        color="#0A0A0F"
        wireframe
        wireframeLinewidth={1}
        emissive="#00D4FF"
        emissiveIntensity={0.15}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

// ---------- Module-level particle data (computed once at load, never changes) ----------
const RETRO_PARTICLE_COUNT = 300;
const _retroParticleData = (() => {
  const pos = new Float32Array(RETRO_PARTICLE_COUNT * 3);
  const cols = new Float32Array(RETRO_PARTICLE_COUNT * 3);
  const palette = [
    [0, 0.83, 1],       // Electric blue
    [1, 0.18, 0.49],    // Hot pink
    [0.22, 1, 0.08],    // Lime green
    [0.75, 0.25, 1],    // Purple
  ];
  for (let i = 0; i < RETRO_PARTICLE_COUNT; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 25;
    pos[i * 3 + 1] = Math.random() * 12 - 2;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 25;
    const c = palette[Math.floor(Math.random() * palette.length)];
    cols[i * 3] = c[0];
    cols[i * 3 + 1] = c[1];
    cols[i * 3 + 2] = c[2];
  }
  return { pos, cols };
})();
// -------------------------------------------------------------------------------------

/** Floating pixel particles */
function RetroParticles({ scrollProgress }: { scrollProgress: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = RETRO_PARTICLE_COUNT;

  const positions = _retroParticleData.pos;
  const colors = _retroParticleData.cols;

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const time = clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;

      // Gentle float + scroll-driven vertical drift
      posAttr.array[iy] =
        positions[iy] +
        Math.sin(time * 0.5 + i * 0.1) * 0.3 +
        scrollProgress * 3;
    }
    posAttr.needsUpdate = true;

    // Slow rotation
    pointsRef.current.rotation.y = time * 0.02 + scrollProgress * 0.5;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/** Infinite-looking grid floor */
function RetroGrid({ scrollProgress }: { scrollProgress: number }) {
  const gridRef = useRef<THREE.GridHelper>(null);

  useFrame(({ clock }) => {
    if (!gridRef.current) return;
    // Scroll the grid to create forward movement
    gridRef.current.position.z = -(scrollProgress * 15) % 2;
  });

  return (
    <gridHelper
      ref={gridRef}
      args={[40, 40, '#00D4FF', '#1A1A2E']}
      position={[0, -2.01, -5]}
    />
  );
}
