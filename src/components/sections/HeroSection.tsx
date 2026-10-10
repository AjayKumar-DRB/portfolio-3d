'use client';

import { useRef, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
import { useScrollContext } from '@/components/providers/ScrollProvider';
import { useAudio } from '@/hooks/useAudio';
import portfolioData from '@/data/portfolioData.json';

const { hero, identity } = portfolioData;

const EASE_POWER3 = [0.16, 1, 0.3, 1] as const;

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_POWER3 },
  },
};

const titleVariants: Variants = {
  hidden: { opacity: 0, y: 35 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_POWER3 },
  },
};

const portraitVariants: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: EASE_POWER3, delay: 0.2 },
  },
};

export function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { lenisRef } = useScrollContext();
  const { playClick, playHover } = useAudio();

  const handleScrollTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    playClick();
    const target = document.getElementById(id);
    if (target) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, { offset: -70, duration: 1.2 });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const glitchEls = titleRef.current?.querySelectorAll('.glitch-text');
      glitchEls?.forEach((el) => {
        el.classList.add('glitch-active');
        setTimeout(() => {
          el.classList.remove('glitch-active');
        }, 800);
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative pt-12 min-h-[calc(100vh-48px)] overflow-hidden"
      style={{ zIndex: 10 }}
    >
      {/* Two-column grid matching reference: 1.15fr left content, 0.85fr portrait */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] min-h-[calc(100vh-48px)]">

        {/* Left Column: Mission Briefing & Title Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="z-10 relative flex flex-col justify-start px-6 sm:px-10 lg:px-16 pt-6 sm:pt-8 lg:pt-10 pb-10 sm:pb-16 text-left"
        >
          {/* Stage Badge with Star Icon */}
          <motion.div
            variants={fadeUpItem}
            className="inline-flex items-center gap-3 bg-white shadow-[3px_3px_0px_#0F172A] mb-5 px-3 py-1.5 border-2 border-slate-900 w-fit select-none"
          >
            <span className="font-bold text-md text-sky-500 select-none">👾</span>
            <span className="font-mono font-bold text-amber-500 text-md tracking-wider">
              {hero.stageBadge}
            </span>
            <span className="font-mono font-bold text-md text-rose-600 tracking-wider">
              {hero.stageStatus}
            </span>
          </motion.div>

          {/* Subtitle / Kicker */}
          <motion.p
            variants={fadeUpItem}
            className="mb-3 font-mono font-bold text-[12px] text-rose-600 sm:text-[15px] lg:text-[18px] uppercase tracking-[0.2em] select-none"
          >
            {hero.subtitleLine}
          </motion.p>

          {/* Huge Condensed Display Headline */}
          <motion.h1
            ref={titleRef}
            variants={titleVariants}
            className="text-left uppercase select-none font-display leading-[0.85] tracking-tight"
            style={{
              fontSize: 'clamp(2.6rem, 7.5vw, 6.25rem)',
            }}
          >
            <span className="block font-bold text-slate-900">
              <span className="glitch-text" data-text="AJAY KUMAR">
                AJAY KUMAR
              </span>
            </span>
            <span className="block font-bold text-rose-600 mt-0.5 sm:mt-1">
              <span className="glitch-text" data-text="DRB">
                DRB
              </span>
            </span>
          </motion.h1>

          {/* Mission Box — reference: max-w-md mt-6 */}
          <motion.div
            variants={fadeUpItem}
            className="bg-white shadow-[4px_4px_0px_#0F172A] mt-4 sm:mt-5 p-4 border-2 border-slate-900 w-full max-w-md text-left"
          >
            <div className="flex justify-between items-center mb-2 pb-2 border-slate-200 border-b font-mono font-bold text-[9px]">
              <span className="flex items-center gap-2 text-rose-600">
                <span className="inline-block bg-rose-600 w-2 h-2" />
                {hero.missionLabel}
              </span>
              <span className="hidden sm:flex items-center gap-1.5 font-bold text-emerald-600">
                <span className="inline-block bg-emerald-500 w-2 h-2 animate-pixel-frame" />
                ONLINE
              </span>
            </div>
            <p className="font-mono text-[13px] text-slate-700 leading-relaxed">
              {hero.missionDescription}
            </p>
          </motion.div>

          {/* Action Buttons — reference: mt-8 gap-4 px-6 py-3.5 */}
          <motion.div
            variants={fadeUpItem}
            className="flex flex-wrap gap-4 mt-5 sm:mt-6"
          >
            <a
              href={`#${hero.ctaPrimary.href}`}
              onClick={(e) => handleScrollTo(e, hero.ctaPrimary.href)}
              onMouseEnter={playHover}
              className="flex items-center gap-2 bg-rose-600 hover:bg-rose-500 shadow-[4px_4px_0px_#0F172A] hover:shadow-[2px_2px_0px_#0F172A] active:shadow-none px-6 py-3.5 border-2 border-slate-900 font-mono font-bold text-[10px] text-white uppercase tracking-wider transition-all hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px] duration-75 cursor-pointer select-none"
            >
              <span>{hero.ctaPrimary.icon}</span>
              <span>{hero.ctaPrimary.label}</span>
            </a>
            <a
              href={`#${hero.ctaSecondary.href}`}
              onClick={(e) => handleScrollTo(e, hero.ctaSecondary.href)}
              onMouseEnter={playHover}
              className="flex items-center gap-2 bg-white hover:bg-slate-100 shadow-[4px_4px_0px_#0F172A] hover:shadow-[2px_2px_0px_#0F172A] active:shadow-none px-6 py-3.5 border-2 border-slate-900 font-mono font-bold text-[10px] text-slate-900 uppercase tracking-wider transition-all hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px] duration-75 cursor-pointer select-none"
            >
              <span>{hero.ctaSecondary.icon}</span>
              <span>{hero.ctaSecondary.label}</span>
            </a>
          </motion.div>

          {/* Bottom Status Tags — reference: mt-10 font-pixel text-[9px] border-[2px] border-ink/30 */}
          <motion.div
            variants={fadeUpItem}
            className="flex flex-wrap gap-2 mt-6 sm:mt-8 font-mono text-[9px] text-slate-900"
          >
            {hero.statusTags.map((tag) => (
              <span key={tag} className="px-2 py-1 border-2 border-slate-300">{tag}</span>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Column: Film Reel Pixel Portrait — reference: relative border-ink lg:border-l-[3px], hidden on mobile */}
        <motion.div
          variants={portraitVariants}
          initial="hidden"
          animate="show"
          className="hidden lg:block relative bg-[#0A0F1D] -mt-[2px] pt-[2px] border-slate-900 border-l-[3px] overflow-hidden select-none"
        >
          {/* Reel Header Bar — reference: absolute top-0 h-9 bg-ink px-3 font-pixel text-[9px] text-cream */}
          <div className="top-0 left-0 z-10 absolute flex justify-between items-center bg-slate-950 px-3 border-slate-900 border-b-0 w-full h-9 font-mono text-[9px] text-slate-300">
            <span className="tracking-wider">REEL 01</span>
            <span className="text-rose-500 tracking-wider">
              <span className="inline-block bg-rose-600 mr-1 w-1.5 h-1.5 animate-pixel-frame" />
              REC
            </span>
          </div>

          {/* Portrait Image — reference: h-full min-h-[420px] w-full object-cover, width=912 height=1104 */}
          <img
            src="/images/portrait-ajay.png"
            alt="Ajay Kumar DRB - Pixel Art Portrait"
            width={912}
            height={1104}
            className="pt-9 pb-8 w-full h-full min-h-[420px] object-cover object-top select-none"
            style={{ imageRendering: 'pixelated' }}
          />

          {/* Subtle CRT scanline overlay */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.4) 2px, rgba(0,0,0,0.4) 4px)',
            }}
          />

          {/* Bottom Caption */}
          <div className="bottom-0 left-0 z-10 absolute bg-slate-950 px-3 py-2.5 border-slate-900 border-t-2 w-full font-mono text-[8px] text-slate-400 text-center tracking-wider">
            {identity.name.toUpperCase()} · RENDERED IN PIXELS
          </div>
        </motion.div>
      </div>
    </section>
  );
}
