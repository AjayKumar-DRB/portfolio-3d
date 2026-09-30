'use client';

import { useEffect, useRef, type RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface UseScrollAnimationOptions {
  /** Animation trigger: 'top center', 'top 80%', etc. */
  start?: string;
  /** Animation end trigger */
  end?: string;
  /** Should the element pin during scroll? */
  pin?: boolean;
  /** Scrub amount (true for 1:1, number for smoothing) */
  scrub?: boolean | number;
  /** Enable markers for debugging */
  markers?: boolean;
  /** Callback when entering viewport */
  onEnter?: () => void;
  /** Callback when leaving viewport */
  onLeave?: () => void;
  /** GSAP animation properties to animate TO */
  animateTo?: gsap.TweenVars;
  /** GSAP animation properties to animate FROM */
  animateFrom?: gsap.TweenVars;
}

/**
 * Hook to create scroll-triggered GSAP animations on a ref.
 * Returns a ref to attach to the target element.
 */
export function useScrollAnimation<T extends HTMLElement>(
  options: UseScrollAnimationOptions = {}
): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      // If user prefers reduced motion, just make element visible
      gsap.set(el, { opacity: 1, clearProps: 'transform' });
      return;
    }

    const {
      start = 'top 80%',
      end = 'bottom 20%',
      pin = false,
      scrub = false,
      markers = false,
      onEnter,
      onLeave,
      animateFrom,
      animateTo,
    } = options;

    let tween: gsap.core.Tween | undefined;

    if (animateFrom && animateTo) {
      tween = gsap.fromTo(el, animateFrom, {
        ...animateTo,
        scrollTrigger: {
          trigger: el,
          start,
          end,
          pin,
          scrub,
          markers,
          onEnter,
          onLeave,
        },
      });
    } else if (animateTo) {
      tween = gsap.to(el, {
        ...animateTo,
        scrollTrigger: {
          trigger: el,
          start,
          end,
          pin,
          scrub,
          markers,
          onEnter,
          onLeave,
        },
      });
    } else if (animateFrom) {
      tween = gsap.from(el, {
        ...animateFrom,
        scrollTrigger: {
          trigger: el,
          start,
          end,
          pin,
          scrub,
          markers,
          onEnter,
          onLeave,
        },
      });
    } else {
      // Just create a trigger for callbacks
      ScrollTrigger.create({
        trigger: el,
        start,
        end,
        pin,
        markers,
        onEnter,
        onLeave,
      });
    }

    return () => {
      tween?.scrollTrigger?.kill();
      tween?.kill();
    };
  }, [options]);

  return ref;
}

/**
 * Hook to get the current scroll progress for a specific section.
 * Returns a value 0-1 representing how far through the section the user has scrolled.
 */
export function useSectionProgress(
  sectionRef: RefObject<HTMLElement | null>,
  callback: (progress: number) => void
) {
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        callback(self.progress);
      },
    });

    return () => {
      trigger.kill();
    };
  }, [sectionRef, callback]);
}
