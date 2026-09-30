'use client';

import { useEffect, useRef, createContext, useContext, type ReactNode, type MutableRefObject } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThemeStore } from '@/stores/themeStore';

gsap.registerPlugin(ScrollTrigger);

interface ScrollContextValue {
  lenisRef: MutableRefObject<Lenis | null>;
}

const ScrollContext = createContext<ScrollContextValue>({ lenisRef: { current: null } });

export function useScrollContext() {
  return useContext(ScrollContext);
}

export function ScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const setScrollProgress = useThemeStore((s) => s.setScrollProgress);

  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    lenisRef.current = lenisInstance;

    // Sync with GSAP ScrollTrigger
    lenisInstance.on('scroll', ScrollTrigger.update);

    // Track overall scroll progress
    lenisInstance.on('scroll', (e: Lenis) => {
      const progress = e.progress ?? 0;
      setScrollProgress(progress);
    });

    // Wire GSAP ticker to Lenis RAF
    const rafCallback = (time: number) => {
      lenisInstance.raf(time * 1000);
    };
    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(rafCallback);
      lenisInstance.destroy();
      lenisRef.current = null;
    };
  }, [setScrollProgress]);

  return (
    <ScrollContext.Provider value={{ lenisRef }}>
      {children}
    </ScrollContext.Provider>
  );
}
