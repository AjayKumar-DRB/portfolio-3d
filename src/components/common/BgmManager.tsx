'use client';

import { useEffect, useRef } from 'react';
import { useThemeStore } from '@/stores/themeStore';

const MELODY_SEQUENCE = [
  // Measure 1: C - E - G - A (Bass: C3)
  { freq: 523.25, bassFreq: 130.81, duration: 0.2 },
  { freq: 659.25, bassFreq: 0, duration: 0.2 },
  { freq: 783.99, bassFreq: 0, duration: 0.2 },
  { freq: 880.00, bassFreq: 0, duration: 0.2 },

  // Measure 2: F - E - D - C (Bass: F3)
  { freq: 880.00, bassFreq: 174.61, duration: 0.2 },
  { freq: 659.25, bassFreq: 0, duration: 0.2 },
  { freq: 587.33, bassFreq: 0, duration: 0.2 },
  { freq: 523.25, bassFreq: 0, duration: 0.2 },

  // Measure 3: G - B - D - G (Bass: G3)
  { freq: 783.99, bassFreq: 196.00, duration: 0.2 },
  { freq: 987.77, bassFreq: 0, duration: 0.2 },
  { freq: 1174.66, bassFreq: 0, duration: 0.2 },
  { freq: 783.99, bassFreq: 0, duration: 0.2 },

  // Measure 4: A - G - E - C turnaround (Bass: A2 -> C3)
  { freq: 880.00, bassFreq: 110.00, duration: 0.2 },
  { freq: 783.99, bassFreq: 0, duration: 0.2 },
  { freq: 659.25, bassFreq: 0, duration: 0.2 },
  { freq: 523.25, bassFreq: 130.81, duration: 0.28 },
];

export function BgmManager() {
  const audioEnabled = useThemeStore((s) => s.audioEnabled);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const stepRef = useRef<number>(0);
  const isStartedRef = useRef<boolean>(false);

  useEffect(() => {
    // AudioContext initialization
    const getContext = () => {
      if (!audioCtxRef.current && typeof window !== 'undefined') {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) {
          const ctx = new AudioCtx();
          const gain = ctx.createGain();
          gain.gain.setValueAtTime(0.018, ctx.currentTime);
          gain.connect(ctx.destination);
          audioCtxRef.current = ctx;
          masterGainRef.current = gain;
        }
      }
      return audioCtxRef.current;
    };

    const playStep = () => {
      const ctx = audioCtxRef.current;
      const masterGain = masterGainRef.current;
      if (!ctx || !masterGain || ctx.state !== 'running') return;

      const current = MELODY_SEQUENCE[stepRef.current];
      stepRef.current = (stepRef.current + 1) % MELODY_SEQUENCE.length;

      const now = ctx.currentTime;

      // 1. Lead note (warm triangle wave chiptune)
      try {
        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(current.freq, now);

        noteGain.gain.setValueAtTime(0.016, now);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, now + current.duration);

        osc.connect(noteGain);
        noteGain.connect(masterGain);

        osc.start(now);
        osc.stop(now + current.duration);
      } catch {
        // Safe fail
      }

      // 2. Sub-bass note on beat
      if (current.bassFreq > 0) {
        try {
          const bassOsc = ctx.createOscillator();
          const bassGain = ctx.createGain();

          bassOsc.type = 'triangle';
          bassOsc.frequency.setValueAtTime(current.bassFreq, now);

          bassGain.gain.setValueAtTime(0.022, now);
          bassGain.gain.exponentialRampToValueAtTime(0.0001, now + current.duration * 1.5);

          bassOsc.connect(bassGain);
          bassGain.connect(masterGain);

          bassOsc.start(now);
          bassOsc.stop(now + current.duration * 1.5);
        } catch {
          // Safe fail
        }
      }
    };

    const startMusicLoop = () => {
      if (timerRef.current) return;
      const ctx = getContext();
      if (!ctx) return;

      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      timerRef.current = setInterval(playStep, 240);
      isStartedRef.current = true;
    };

    const stopMusicLoop = () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      isStartedRef.current = false;
    };

    if (audioEnabled) {
      const handleUserInteraction = () => {
        const ctx = getContext();
        if (ctx && ctx.state === 'suspended') {
          ctx.resume().then(() => {
            if (audioEnabled && !timerRef.current) {
              startMusicLoop();
            }
          });
        } else if (audioEnabled && !timerRef.current) {
          startMusicLoop();
        }
      };

      // Handle immediate start if already allowed, or register first interaction
      const ctx = getContext();
      if (ctx && ctx.state === 'running') {
        startMusicLoop();
      } else {
        window.addEventListener('pointerdown', handleUserInteraction, { once: true });
        window.addEventListener('keydown', handleUserInteraction, { once: true });
        window.addEventListener('scroll', handleUserInteraction, { once: true, passive: true });
      }

      return () => {
        window.removeEventListener('pointerdown', handleUserInteraction);
        window.removeEventListener('keydown', handleUserInteraction);
        window.removeEventListener('scroll', handleUserInteraction);
        stopMusicLoop();
      };
    } else {
      stopMusicLoop();
    }
  }, [audioEnabled]);

  return null;
}
