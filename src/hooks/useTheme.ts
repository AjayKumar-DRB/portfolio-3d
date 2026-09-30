'use client';

import { useThemeStore, type Theme, type PerformanceTier } from '@/stores/themeStore';

/**
 * Convenience hook for accessing theme state and actions.
 */
export function useTheme() {
  const theme = useThemeStore((s) => s.theme);
  const setTheme = useThemeStore((s) => s.setTheme);
  const performanceTier = useThemeStore((s) => s.performanceTier);
  const shouldRenderWebGL = useThemeStore((s) => s.shouldRenderWebGL);

  const isRetro = theme === 'retro';
  const isSleek = theme === 'sleek';

  const toggleTheme = () => {
    setTheme(isRetro ? 'sleek' : 'retro');
  };

  return {
    theme,
    setTheme,
    toggleTheme,
    isRetro,
    isSleek,
    performanceTier,
    shouldRenderWebGL,
  };
}
