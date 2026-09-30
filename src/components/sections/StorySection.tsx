'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThemeStore } from '@/stores/themeStore';
import { SectionHeader } from '@/components/common/SectionHeader';
import portfolioData from '@/data/portfolioData.json';
import { careerChapters } from '@/data/career';

gsap.registerPlugin(ScrollTrigger);

export function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const theme = useThemeStore((s) => s.theme);
  const isRetro = theme === 'retro';
  const { education, certifications, strengths, philosophy } = portfolioData;

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const bars = gsap.utils.toArray<HTMLElement>('.career-bar-fill');
      bars.forEach((bar) => {
        gsap.from(bar, {
          width: '0%',
          duration: 1.1,
          ease: 'steps(10)',
          scrollTrigger: {
            trigger: bar,
            start: 'top 85%',
            once: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="story"
      className="relative z-10 py-16 md:py-24 border-b-2 border-slate-900"
      style={{
        background: isRetro ? '#F5F2EB' : 'var(--bg-primary)',
      }}
    >
      <div className="container mx-auto px-6">
        <SectionHeader
          stage="STAGE 02"
          retroTitle="CAREER CHRONICLES"
          sleekTitle="CAREER PATH & EXPERIENCE"
          subtitle="From mechanical engineering curiosity to frontend-focused full-stack product engineering."
          accentColor="#FFD700"
          badge={`LV.01 · LV.0${careerChapters.length}`}
        />

        {/* Career Cards Grid — 3x2 on large screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {careerChapters.map((chapter, i) => {
            // Bar fill: increases along career progression
            const barFill = [62, 70, 78, 84, 90, 96][i] ?? 80;
            const barColor = chapter.accentColor;

            return (
              <motion.div
                key={chapter.id}
                className="career-card bg-[#F5F2EB] border-2 border-slate-900 shadow-[4px_4px_0px_#0F172A] p-5 flex flex-col justify-between select-none relative hover:-translate-y-1 transition-transform"
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-15%' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const, delay: i * 0.08 }}
              >
                <div>
                  {/* Level Tag & Period Header */}
                  <div className="flex items-center justify-between text-[10px] font-mono font-bold mb-3 pb-2 border-b border-slate-300">
                    <span className="text-amber-600 tracking-wider">
                      LV.0{chapter.level} · {chapter.period}
                    </span>
                    <span
                      className="font-bold tracking-wider text-[9px]"
                      style={{ color: chapter.accentColor }}
                    >
                      {chapter.retroTitle}
                    </span>
                  </div>

                  {/* Card Title */}
                  <h3 className="font-mono text-xs sm:text-[13px] font-bold text-slate-900 tracking-tight uppercase mb-1">
                    {chapter.title}
                  </h3>
                  <p className="font-mono text-[10px] text-slate-500 mb-3 tracking-wide">
                    {chapter.role} — {chapter.company}
                  </p>

                  {/* Description */}
                  <p className="font-mono text-xs text-slate-700 leading-relaxed">
                    {chapter.description}
                  </p>

                  {/* Highlights */}
                  <ul className="mt-3 space-y-1">
                    {chapter.highlights.slice(0, 3).map((h) => (
                      <li
                        key={h}
                        className="font-mono text-[10px] text-slate-600 flex items-start gap-1.5"
                      >
                        <span className="text-rose-500 mt-0.5 flex-shrink-0">▸</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Segmented Energy Progress Bar at Bottom */}
                <div className="mt-6 pt-3 border-t border-slate-200">
                  <div className="w-full h-3 bg-white border-2 border-slate-900 p-[1px] overflow-hidden">
                    <div
                      className="career-bar-fill h-full transition-all duration-700"
                      style={{
                        width: `${barFill}%`,
                        backgroundColor: barColor,
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Developer Philosophy & Core Strengths Dossier */}
        <div className="max-w-6xl mx-auto mt-12 space-y-6 select-none">
          {/* Philosophy Banner */}
          <div className="bg-white border-2 border-slate-900 shadow-[4px_4px_0px_#0F172A] p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-amber-500 font-bold text-xs">★</span>
              <span className="font-mono text-[9px] font-bold text-rose-600 tracking-widest uppercase">
                DEVELOPER PHILOSOPHY
              </span>
            </div>
            <p className="font-mono text-slate-800 text-xs sm:text-[13px] leading-relaxed italic border-l-2 border-rose-600 pl-4 py-1">
              &ldquo;{philosophy}&rdquo;
            </p>
          </div>

          {/* Two-Column Grid: Education/Certifications & Core Strengths */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Academic & Credentials */}
            <div className="bg-white border-2 border-slate-900 shadow-[4px_4px_0px_#0F172A] p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 mb-4 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="text-sky-500 font-bold text-xs">◆</span>
                    <h4 className="font-mono font-bold text-[10px] text-slate-900 uppercase tracking-wider">
                      EDUCATION & CREDENTIALS
                    </h4>
                  </div>
                  <span className="font-mono text-[8px] font-bold bg-sky-100 text-sky-800 px-2 py-0.5 border border-slate-900">
                    VERIFIED
                  </span>
                </div>

                {/* Degree Box */}
                <div className="p-3 bg-[#F5F2EB] border-2 border-slate-900 mb-4 shadow-[2px_2px_0px_#0F172A]">
                  <div className="flex items-center justify-between text-[9px] font-mono text-amber-700 font-bold mb-1">
                    <span>{education.period}</span>
                    <span className="bg-emerald-600 text-white px-1.5 py-0.2 text-[8px] font-mono font-bold">
                      GPA {education.gpa}
                    </span>
                  </div>
                  <h5 className="font-mono text-xs font-bold text-slate-900 uppercase">
                    {education.degree}
                  </h5>
                  <p className="font-mono text-[10px] text-slate-600 mt-0.5">
                    {education.institution} · {education.location}
                  </p>
                  <p className="font-mono text-[9px] text-emerald-700 font-bold mt-1">
                    ★ {education.distinction}
                  </p>
                </div>

                {/* Certifications List */}
                <div className="space-y-2">
                  <span className="font-mono text-[8px] text-slate-400 font-bold uppercase tracking-wider block">
                    CERTIFICATIONS & ACCREDITATIONS
                  </span>
                  {certifications.map((cert) => (
                    <div
                      key={cert.title}
                      className="p-2.5 bg-slate-50 border border-slate-900 flex items-center justify-between font-mono text-[10px]"
                    >
                      <div>
                        <span className="font-bold text-slate-900 block">{cert.title}</span>
                        <span className="text-slate-500 text-[9px]">{cert.issuer}</span>
                      </div>
                      <span className="text-[9px] font-bold text-rose-600 bg-rose-50 border border-slate-300 px-1.5 py-0.5">
                        {cert.year}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Core Engineering Strengths */}
            <div className="bg-white border-2 border-slate-900 shadow-[4px_4px_0px_#0F172A] p-5">
              <div className="flex items-center justify-between pb-2 mb-4 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold text-xs">❖</span>
                  <h4 className="font-mono font-bold text-[10px] text-slate-900 uppercase tracking-wider">
                    CORE ENGINEERING STRENGTHS
                  </h4>
                </div>
                <span className="font-mono text-[8px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 border border-slate-900">
                  {strengths.length} TRAITS
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {strengths.map((s) => (
                  <div
                    key={s.id}
                    className="p-2.5 bg-[#F5F2EB] border border-slate-900 shadow-[2px_2px_0px_#0F172A]"
                  >
                    <span className="font-mono font-bold text-[10px] text-rose-600 block uppercase mb-1">
                      {s.label}
                    </span>
                    <p className="font-mono text-[9px] text-slate-700 leading-snug">
                      {s.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
