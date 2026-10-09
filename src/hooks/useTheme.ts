'use client';

import { useThemeStore } from '@/stores/themeStore';

/**
 * Convenience hook for accessing theme state and actions.
 */
export function useTheme() {
  const theme = useThemeStore((s) => s.theme);
  const performanceTier = useThemeStore((s) => s.performanceTier);
  const shouldRenderWebGL = useThemeStore((s) => s.shouldRenderWebGL);

  return {
    theme,
    isRetro: true,
    isSleek: false,
    performanceTier,
    shouldRenderWebGL,
  };
}
