'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, lazy } from 'react';
import { useThemeStore } from '@/stores/themeStore';
import { getQualitySettings } from '@/lib/device-detector';

const RetroScene = lazy(() =>
  import('./RetroScene').then((m) => ({ default: m.RetroScene }))
);
const SleekScene = lazy(() =>
  import('./SleekScene').then((m) => ({ default: m.SleekScene }))
);
const PostProcessing = lazy(() =>
  import('./PostProcessing').then((m) => ({ default: m.PostProcessing }))
);

export function Canvas3D() {
  const theme = useThemeStore((s) => s.theme);
  const performanceTier = useThemeStore((s) => s.performanceTier);
  const shouldRenderWebGL = useThemeStore((s) => s.shouldRenderWebGL);

  if (!shouldRenderWebGL) return null;

  const quality = getQualitySettings(performanceTier);

  return (
    <div className="fixed inset-0 z-0" aria-hidden="true">
      <Canvas
        dpr={quality.dpr}
        gl={{
          antialias: quality.antialias,
          powerPreference: 'high-performance',
          alpha: true,
          stencil: false,
          depth: true,
        }}
        camera={{
          position: [0, 2, 8],
          fov: 75,
          near: 0.1,
          far: 100,
        }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          {theme === 'retro' ? <RetroScene /> : <SleekScene />}
          {quality.postProcessing && <PostProcessing />}
        </Suspense>
      </Canvas>
    </div>
  );
}
