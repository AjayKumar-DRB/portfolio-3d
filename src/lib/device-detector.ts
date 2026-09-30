/** Device profile for adaptive rendering */
export interface DeviceProfile {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  hasWebGL: boolean;
  estimatedRAM: number;
  shouldRenderWebGL: boolean;
  tier: 'high' | 'medium' | 'low';
}

/** Quality settings derived from device profile */
export interface QualitySettings {
  textureSize: number;
  geometryDetail: number;
  shadowQuality: 'high' | 'low' | 'none';
  particleCount: number;
  renderScale: number;
  dpr: [number, number];
  antialias: boolean;
  postProcessing: boolean;
}

/** Detect device capabilities and return a profile */
export function getDeviceProfile(): DeviceProfile {
  if (typeof window === 'undefined') {
    // SSR fallback — assume high-end desktop
    return {
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      hasWebGL: true,
      estimatedRAM: 8,
      shouldRenderWebGL: true,
      tier: 'high',
    };
  }

  const width = window.innerWidth;
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;

  // Check WebGL support
  let hasWebGL = false;
  try {
    const canvas = document.createElement('canvas');
    hasWebGL = !!(
      canvas.getContext('webgl2') || canvas.getContext('webgl')
    );
  } catch {
    hasWebGL = false;
  }

  // Approximate RAM (navigator.deviceMemory is Chrome-only)
  const nav = navigator as Navigator & { deviceMemory?: number };
  const estimatedRAM = nav.deviceMemory || 4;

  // Determine if we should render WebGL
  const shouldRenderWebGL = hasWebGL && (!isMobile || estimatedRAM >= 4);

  // Determine performance tier
  let tier: DeviceProfile['tier'] = 'high';
  if (isMobile) {
    tier = 'low';
  } else if (isTablet || estimatedRAM < 4) {
    tier = 'medium';
  }

  return {
    isMobile,
    isTablet,
    isDesktop,
    hasWebGL,
    estimatedRAM,
    shouldRenderWebGL,
    tier,
  };
}

/** Get quality settings based on performance tier */
export function getQualitySettings(tier: DeviceProfile['tier']): QualitySettings {
  switch (tier) {
    case 'low':
      return {
        textureSize: 512,
        geometryDetail: 0.3,
        shadowQuality: 'none',
        particleCount: 100,
        renderScale: 0.75,
        dpr: [1, 1],
        antialias: false,
        postProcessing: false,
      };
    case 'medium':
      return {
        textureSize: 1024,
        geometryDetail: 0.6,
        shadowQuality: 'low',
        particleCount: 1000,
        renderScale: 1.0,
        dpr: [1, 1.5],
        antialias: true,
        postProcessing: true,
      };
    case 'high':
    default:
      return {
        textureSize: 2048,
        geometryDetail: 1.0,
        shadowQuality: 'high',
        particleCount: 5000,
        renderScale: 1.0,
        dpr: [1, 2],
        antialias: true,
        postProcessing: true,
      };
  }
}
