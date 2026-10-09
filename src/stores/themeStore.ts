import { create } from 'zustand';

export type Theme = 'retro';
export type PerformanceTier = 'high' | 'medium' | 'low';

interface ThemeState {
  /** Current visual theme */
  theme: Theme;
  /** Overall scroll progress 0-1 */
  scrollProgress: number;
  /** Currently active section identifier */
  currentSection: string;
  /** GPU/device performance tier */
  performanceTier: PerformanceTier;
  /** Whether the WebGL canvas should render */
  shouldRenderWebGL: boolean;

  /** Whether sound effects are enabled */
  audioEnabled: boolean;

  // Actions
  setScrollProgress: (progress: number) => void;
  setCurrentSection: (section: string) => void;
  setPerformanceTier: (tier: PerformanceTier) => void;
  setShouldRenderWebGL: (should: boolean) => void;
  toggleAudio: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: 'retro',
  scrollProgress: 0,
  currentSection: 'hero',
  performanceTier: 'high',
  shouldRenderWebGL: true,
  audioEnabled: true,

  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  setCurrentSection: (section) => set({ currentSection: section }),
  setPerformanceTier: (tier) => set({ performanceTier: tier }),
  setShouldRenderWebGL: (should) => set({ shouldRenderWebGL: should }),
  toggleAudio: () => set((state) => ({ audioEnabled: !state.audioEnabled })),
}));
