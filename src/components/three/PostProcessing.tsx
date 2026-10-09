'use client';

import {
  EffectComposer,
  Bloom,
  Vignette,
  Noise,
} from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

/**
 * Post-processing effects pipeline for 32-bit Retro aesthetic:
 * Bloom (for neon glow) + Noise (for grain) + Vignette (CRT corners)
 */
export function PostProcessing() {
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
