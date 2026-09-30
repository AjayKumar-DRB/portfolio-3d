'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useThemeStore } from '@/stores/themeStore';
import * as THREE from 'three';

/**
 * Sleek 3D Scene — Modern, premium, cinematic WebGL environment.
 * Features an undulating neon-edged wireframe topography, floating geometric core,
 * and high-density particle flows that react to scroll.
 */
export function SleekScene() {
  const groupRef = useRef<THREE.Group>(null);
  const scrollProgress = useThemeStore((s) => s.scrollProgress);

  return (
    <group ref={groupRef}>
      {/* Cinematic Lighting */}
      <ambientLight intensity={0.35} color="#0c1222" />
      <directionalLight
        position={[6, 10, 6]}
        intensity={1.2}
        color="#38bdf8"
        castShadow={false}
      />
      <pointLight position={[-6, 4, 2]} intensity={1.5} color="#ec4899" distance={25} />
      <pointLight position={[0, -2, -4]} intensity={0.8} color="#8b5cf6" distance={20} />

      {/* Modern Topography Landscape */}
      <SleekLandscape scrollProgress={scrollProgress} />

      {/* Floating Geometric Core */}
      <SleekGeometricCore scrollProgress={scrollProgress} />

      {/* Cosmic Floating Constellation Particles */}
      <SleekCosmicParticles scrollProgress={scrollProgress} />
    </group>
  );
}

/** Fluid undulating futuristic terrain */
function SleekLandscape({ scrollProgress }: { scrollProgress: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(40, 40, 60, 60);
    geo.rotateX(-Math.PI * 0.45);
    return geo;
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const positions = meshRef.current.geometry.attributes.position;
    const t = clock.getElapsedTime() * 0.4;
    const scrollFactor = scrollProgress * 14;

    for (let i = 0; i < positions.count; i++) {
      const u = positions.getX(i);
      const v = positions.getZ(i);

      // Smooth mathematical organic topography
      const distFromCenter = Math.sqrt(u * u + v * v);
      const wave1 = Math.sin((u * 0.25) + t + scrollFactor * 0.2) * 1.2;
      const wave2 = Math.cos((v * 0.2) + t * 0.8 + scrollFactor * 0.3) * 1.0;
      const wave3 = Math.sin((u * v * 0.02) + t * 0.5) * 0.6;

      // Soft dip in the center to keep content visible
      const centerFactor = Math.min(1, distFromCenter * 0.07);
      const elevation = (wave1 + wave2 + wave3) * centerFactor;

      positions.setY(i, elevation - 2.8);
    }

    positions.needsUpdate = true;
    meshRef.current.geometry.computeVertexNormals();
  });

  return (
    <mesh ref={meshRef} geometry={geometry} position={[0, -1.5, -4]}>
      <meshStandardMaterial
        color="#030712"
        roughness={0.2}
        metalness={0.8}
        wireframe
        emissive="#06b6d4"
        emissiveIntensity={0.25}
        transparent
        opacity={0.7}
      />
    </mesh>
  );
}

/** Central rotating cybernetic polyhedra */
function SleekGeometricCore({ scrollProgress }: { scrollProgress: number }) {
  const coreRef = useRef<THREE.Group>(null);
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (coreRef.current) {
      // Gentle floating bob
      coreRef.current.position.y = Math.sin(t * 0.8) * 0.2 + 0.3;
      // Scroll-driven position drift across sections
      coreRef.current.position.x = Math.sin(scrollProgress * Math.PI * 2) * 1.5;
      coreRef.current.position.z = -1 - scrollProgress * 2;
    }

    if (outerRef.current) {
      outerRef.current.rotation.x = t * 0.2 + scrollProgress * 3;
      outerRef.current.rotation.y = t * 0.3 + scrollProgress * 2;
    }

    if (innerRef.current) {
      innerRef.current.rotation.x = -t * 0.4;
      innerRef.current.rotation.z = t * 0.5;
    }

    if (ringRef.current) {
      ringRef.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.5) * 0.2;
      ringRef.current.rotation.y = t * 0.15;
    }
  });

  return (
    <group ref={coreRef} position={[0, 0.3, -1]}>
      {/* Outer Icosahedron Wireframe */}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[1.6, 1]} />
        <meshStandardMaterial
          color="#38bdf8"
          wireframe
          emissive="#0284c7"
          emissiveIntensity={0.6}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Inner Glowing Crystal Core */}
      <mesh ref={innerRef}>
        <octahedronGeometry args={[0.9, 0]} />
        <meshStandardMaterial
          color="#ec4899"
          roughness={0.1}
          metalness={0.9}
          emissive="#db2777"
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* Gyroscopic Orbital Ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[2.2, 0.02, 16, 100]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#9333ea"
          emissiveIntensity={1}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  );
}

// ---------- Module-level particle data (computed once at load, never changes) ----------
const SLEEK_PARTICLE_COUNT = 450;
const _sleekParticleData = (() => {
  const pos = new Float32Array(SLEEK_PARTICLE_COUNT * 3);
  const cols = new Float32Array(SLEEK_PARTICLE_COUNT * 3);
  const palette = [
    [0.22, 0.74, 0.97], // Cyan
    [0.93, 0.28, 0.6],  // Magenta
    [0.65, 0.33, 0.97], // Purple
    [1.0, 1.0, 1.0],    // Bright white
  ];
  for (let i = 0; i < SLEEK_PARTICLE_COUNT; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 30;
    pos[i * 3 + 1] = Math.random() * 16 - 4;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 26;
    const c = palette[Math.floor(Math.random() * palette.length)];
    cols[i * 3] = c[0];
    cols[i * 3 + 1] = c[1];
    cols[i * 3 + 2] = c[2];
  }
  return { pos, cols };
})();
// -------------------------------------------------------------------------------------

/** Floating constellation starlight particles */
function SleekCosmicParticles({ scrollProgress }: { scrollProgress: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = SLEEK_PARTICLE_COUNT;

  const positions = _sleekParticleData.pos;
  const colors = _sleekParticleData.cols;

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const t = clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const iy = i * 3 + 1;
      const ix = i * 3;
      // Gentle spiral drift
      posAttr.array[iy] = positions[iy] + Math.sin(t * 0.4 + i * 0.08) * 0.5 + scrollProgress * 4;
      posAttr.array[ix] = positions[ix] + Math.cos(t * 0.3 + i * 0.05) * 0.3;
    }
    posAttr.needsUpdate = true;
    pointsRef.current.rotation.y = t * 0.03 + scrollProgress * 0.8;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
