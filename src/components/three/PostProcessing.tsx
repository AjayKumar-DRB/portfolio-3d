'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree, extend } from '@react-three/fiber';
import {
  EffectComposer,
  Bloom,
  Vignette,
  Noise,
} from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { useThemeStore } from '@/stores/themeStore';

/**
 * Post-processing effects pipeline.
 * - Retro: Bloom (for neon glow) + Noise (for grain) + Vignette (CRT corners)
 * - Sleek: Bloom (cinematic) + subtle Vignette
 */
export function PostProcessing() {
  const theme = useThemeStore((s) => s.theme);

  if (theme === 'retro') {
    return (
      <EffectComposer>
        <Bloom
          intensity={0.8}
          luminanceThreshold={0.3}
          luminanceSmoothing={0.7}
          mipmapBlur
        />
        <Noise
          opacity={0.06}
          blendFunction={BlendFunction.ADD}
        />
        <Vignette
          offset={0.3}
          darkness={0.8}
          blendFunction={BlendFunction.NORMAL}
        />
      </EffectComposer>
    );
  }

  // Sleek theme
  return (
    <EffectComposer>
      <Bloom
        intensity={1.2}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      <Vignette
        offset={0.2}
        darkness={0.5}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  );
}
