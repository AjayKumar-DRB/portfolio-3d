'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeStore } from '@/stores/themeStore';
import { useAudio } from '@/hooks/useAudio';
import { useScrollContext } from '@/components/providers/ScrollProvider';
import { cn } from '@/lib/utils';

const navItems = [
  { id: 'hero', label: 'HOME', num: '01' },
  { id: 'story', label: 'PATH', num: '02' },
  { id: 'projects', label: 'BOSSES', num: '03' },
  { id: 'skills', label: 'WEAPONS', num: '04' },
  { id: 'contact', label: 'COMMS', num: '05' },
];

export function Navbar() {
  const currentSection = useThemeStore((s) => s.currentSection);
  const setCurrentSection = useThemeStore((s) => s.setCurrentSection);
  const { audioEnabled, toggleAudio, playHover, playPowerup, playClick } = useAudio();
  const { lenisRef } = useScrollContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Track active section live on scroll
  useEffect(() => {
    const sectionIds = ['hero', 'story', 'projects', 'skills', 'contact'];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setCurrentSection(id);
            }
          });
        },
        { rootMargin: '-20% 0px -55% 0px', threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [setCurrentSection]);

  // Smooth scroll handler using Lenis
  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    playClick();
    setCurrentSection(id);
    setMobileMenuOpen(false);

    const targetEl = document.getElementById(id);
    if (targetEl) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(targetEl, { offset: -70, duration: 1.2 });
      } else {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[100] h-12 flex items-center transition-all duration-200"
        style={{
          height: '48px',
          padding: '0 16px',
          background: '#F5F2EB',
          backdropFilter: 'blur(12px)',
          borderBottom: '2px solid #0F172A',
        }}
      >
        <div className="container mx-auto flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo - Red badge matching the mock */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, 'hero')}
            onMouseEnter={playHover}
            className="flex items-center gap-1.5 select-none focus:outline-none transition-all duration-75 cursor-pointer px-3 py-1 bg-rose-600 text-white border-0 shadow-[2px_2px_0px_#0F172A] hover:bg-rose-500 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#0F172A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '10px',
              letterSpacing: '0.12em',
              textDecoration: 'none',
            }}
          >
            <span>◆</span>
            <span>AK.DRB</span>
          </a>

          {/* Nav links (Desktop & Tablet: >= 768px) */}
          <div className="hidden md:flex items-center gap-3 lg:gap-5">
            {navItems.map((item) => {
              const isActive = currentSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={(e) => handleNavClick(e, item.id)}
                  onMouseEnter={playHover}
                  className={cn(
                    'px-2.5 py-1 transition-all text-left flex items-center gap-1.5 select-none font-mono text-[10px] font-bold tracking-wider uppercase',
                    isActive
                      ? 'bg-white border-2 border-rose-600 text-slate-900 shadow-[2px_2px_0px_#E11D48]'
                      : 'border-2 border-transparent hover:border-slate-300'
                  )}
                  style={{
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  <span className="text-rose-600 font-bold text-[9px]">{item.num}</span>
                  <span className={isActive ? 'text-slate-950 font-bold' : 'text-slate-700 font-medium'}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Top Right Controls & Status Indicator */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Live Developer Status Badge */}
            <div
              className="hidden sm:flex items-center gap-2 px-3 py-1 border-2 border-slate-900 shadow-[2px_2px_0px_#0F172A] select-none bg-emerald-600 text-white"
              title="Full-Stack Developer available for immediate hiring"
            >
              <span className="text-white font-mono text-[9px] font-bold tracking-wider uppercase">
                AVAILABLE FOR HIRE
              </span>
            </div>

            {/* Audio Toggle */}
            <button
              onClick={() => {
                toggleAudio();
                if (!audioEnabled) {
                  setTimeout(() => playPowerup(), 50);
                }
              }}
              onMouseEnter={playHover}
              className="px-2 py-1 bg-white border-2 border-slate-900 shadow-[2px_2px_0px_#0F172A] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none flex items-center gap-1.5 transition-transform"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '7px',
                color: audioEnabled ? 'var(--accent-primary)' : 'var(--text-dim)',
              }}
              title={audioEnabled ? 'Mute 8-bit music & SFX' : 'Enable 8-bit music & SFX'}
              aria-label={audioEnabled ? 'Mute 8-bit music & SFX' : 'Enable 8-bit music & SFX'}
            >
              <span>{audioEnabled ? '🔊' : '🔇'}</span>
              <span className="hidden sm:inline">{audioEnabled ? 'MUSIC' : 'MUTED'}</span>
            </button>

            {/* Mobile Hamburger Toggle (md:hidden) */}
            <button
              onClick={() => {
                playClick();
                setMobileMenuOpen((prev) => !prev);
              }}
              onMouseEnter={playHover}
              className="md:hidden px-2.5 py-1 bg-white border-2 border-slate-900 shadow-[2px_2px_0px_#0F172A] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none text-slate-900 font-mono text-[9px] font-bold"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {mobileMenuOpen ? '✕ CLOSE' : '☰ MENU'}
            </button>
          </div>
        </div>
      </nav>

      {/* Responsive Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="fixed top-[54px] left-0 right-0 z-[99] bg-white/98 backdrop-blur-md border-b-2 border-slate-900 shadow-[0_8px_20px_rgba(15,23,42,0.15)] md:hidden p-4"
          >
            {/* Mobile Status Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
              <div className="flex items-center gap-2 font-mono text-[9px] font-bold text-slate-800">
                <span className="w-2 h-2 bg-emerald-500 inline-block animate-pixel-frame" />
                <span>STATUS: AVAILABLE FOR HIRE</span>
              </div>
              <span className="text-[8px] font-mono text-slate-500">FULL-STACK</span>
            </div>

            {/* Mobile Navigation Buttons */}
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = currentSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={(e) => handleNavClick(e, item.id)}
                    onMouseEnter={playHover}
                    className="w-full p-2.5 text-left border-2 flex items-center justify-between transition-all"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '8px',
                      borderColor: '#0F172A',
                      background: isActive ? '#FFE4E6' : '#FFFFFF',
                      boxShadow: isActive ? '3px 3px 0px #E11D48' : '3px 3px 0px #0F172A',
                      color: isActive ? '#E11D48' : '#0F172A',
                    }}
                  >
                    <span className="flex items-center gap-2">
                      <span className="font-mono text-[8px] opacity-60">[{item.num}]</span>
                      <span>{item.label}</span>
                    </span>
                    {isActive && (
                      <span className="text-[7px] font-mono font-bold text-rose-600">● ACTIVE</span>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
