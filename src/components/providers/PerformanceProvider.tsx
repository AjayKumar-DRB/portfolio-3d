'use client';

import { useEffect, type ReactNode } from 'react';
import { getDeviceProfile } from '@/lib/device-detector';
import { useThemeStore } from '@/stores/themeStore';

export function PerformanceProvider({ children }: { children: ReactNode }) {
  const setPerformanceTier = useThemeStore((s) => s.setPerformanceTier);
  const setShouldRenderWebGL = useThemeStore((s) => s.setShouldRenderWebGL);

  useEffect(() => {
    const profile = getDeviceProfile();
    setPerformanceTier(profile.tier);
    setShouldRenderWebGL(profile.shouldRenderWebGL);

    // Re-evaluate on resize (e.g., device rotation)
    const handleResize = () => {
      const updated = getDeviceProfile();
      setPerformanceTier(updated.tier);
      setShouldRenderWebGL(updated.shouldRenderWebGL);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setPerformanceTier, setShouldRenderWebGL]);

  return <>{children}</>;
}
