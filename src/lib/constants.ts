/** Scroll animation configuration constants */
export const SCROLL_CONFIG = {
  /** Lenis smooth scroll options */
  lenis: {
    duration: 1.2,
    orientation: 'vertical' as const,
    smoothWheel: true,
  },

  /** Section scroll trigger breakpoints (as fraction of total scroll) */
  sections: {
    hero: { start: 0, end: 0.15 },
    story: { start: 0.15, end: 0.55 },
    projects: { start: 0.55, end: 0.75 },
    skills: { start: 0.75, end: 0.9 },
    cta: { start: 0.9, end: 1 },
  },

  /** Story arc chapter breakpoints (within story section) */
  chapters: {
    engineering: { start: 0, end: 0.25 },
    qa: { start: 0.25, end: 0.5 },
    fullstack: { start: 0.5, end: 0.75 },
    layoff: { start: 0.75, end: 1 },
  },
} as const;

/** Breakpoint values in pixels */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

/** Three.js scene configuration */
export const SCENE_CONFIG = {
  camera: {
    fov: 75,
    near: 0.1,
    far: 1000,
    position: [0, 2, 5] as [number, number, number],
  },
  retro: {
    pixelSize: 4,
    colorLevels: 32,
    terrainSegments: 64,
    terrainSize: 20,
  },
} as const;
