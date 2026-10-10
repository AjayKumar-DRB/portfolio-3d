'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from '@/hooks/useAudio';
import { skillCategories } from '@/data/skills';
import { PixelSkillIcon } from '@/components/retro/PixelSkillIcon';

interface FlatSkillNode {
  id: string;
  abbr: string;
  name: string;
  branch: string;
  categoryId: string;
  color: string;
  mastery: number;
  use: number;
  description: string;
  pairs?: string;
  iconKey: string;
  usedIn?: {
    projects?: string[];
    companies?: string[];
  };
}

// Flatten all skills from Source of Truth (portfolioData.json via skills.ts)
const ALL_SKILL_NODES: FlatSkillNode[] = skillCategories.flatMap((category) =>
  category.skills.map((skill) => ({
    id: skill.id || skill.name.toLowerCase().replace(/[^a-z0-9]/g, ''),
    abbr: skill.abbr || skill.name.slice(0, 2).toUpperCase(),
    name: skill.name.toUpperCase(),
    branch: category.retroLabel || category.title.toUpperCase(),
    categoryId: category.id,
    color: category.color,
    mastery: skill.level,
    use: skill.use ?? Math.min(skill.level, 90),
    description: skill.description || `${skill.name} utilized across production deployments and engineering workflows.`,
    pairs: skill.pairs?.toUpperCase(),
    iconKey: skill.iconKey,
    usedIn: skill.usedIn,
  }))
);

// Color-coded category legend data
const CATEGORY_LEGEND = skillCategories.map((c) => ({
  id: c.id,
  label: c.retroLabel || c.title.toUpperCase(),
  color: c.color,
  count: c.skills.length,
}));

export function SkillArsenal() {
  const [selectedSkill, setSelectedSkill] = useState<FlatSkillNode>(ALL_SKILL_NODES[0]);
  const [hoveredSkill, setHoveredSkill] = useState<FlatSkillNode | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const { playHover, playClick } = useAudio();

  // Active skill shown in inspector: hovered takes priority for preview, defaults to selected
  const activeSkill = hoveredSkill || selectedSkill;
  const isPreviewing = Boolean(hoveredSkill && hoveredSkill.id !== selectedSkill.id);

  // Filter skills based on selected category in legend
  const displayedNodes =
    activeFilter === 'all'
      ? ALL_SKILL_NODES
      : ALL_SKILL_NODES.filter((node) => node.categoryId === activeFilter);

  const totalUnlocked = ALL_SKILL_NODES.length;

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-0 border-2 border-slate-900 shadow-[5px_5px_0px_#0F172A]">
      {/* ── LEFT: Legend + Node Grid ── */}
      <div className="bg-[#F5F2EB] p-5 sm:p-6 border-b-2 lg:border-b-0 lg:border-r-2 border-slate-900 flex flex-col justify-between">
        <div>
          {/* Panel Header */}
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-300">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-rose-600 rounded-none border border-slate-900" />
              <span className="font-heading text-xs text-slate-800 uppercase tracking-widest">
                UNLOCKED ARSENAL NODES
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-heading text-xs tracking-wider px-2 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-600">
                {displayedNodes.length} / {totalUnlocked} ACTIVE
              </span>
            </div>
          </div>

          {/* ── COLOR-CODED LEGEND ── */}
          <div className="mb-5 p-3 bg-white/80 border-2 border-slate-900 shadow-[2px_2px_0px_#0F172A]">
            <div className="flex items-center justify-between mb-2.5">
              <span className="font-heading text-[10px] text-slate-800 uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-slate-800" />
                TECH DOMAIN LEGEND
              </span>
              <span className="text-[9px] font-mono font-semibold text-slate-500 uppercase tracking-wider">
                CLICK TO FILTER
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {/* ALL FILTER PILL */}
              <button
                type="button"
                onClick={() => {
                  setActiveFilter('all');
                  playClick();
                }}
                onMouseEnter={playHover}
                className={`px-2.5 py-1 text-[10px] font-heading uppercase tracking-wider border border-slate-900 transition-all duration-150 flex items-center gap-1.5 cursor-pointer focus:outline-none ${
                  activeFilter === 'all'
                    ? 'bg-slate-900 text-white shadow-[2px_2px_0px_#0F172A]'
                    : 'bg-[#FAFAF8] text-slate-900 shadow-[1px_1px_0px_rgba(0,0,0,0.15)] hover:-translate-y-0.5'
                }`}
              >
                <span className="w-2 h-2 border border-slate-900 bg-white" />
                <span>ALL ({totalUnlocked})</span>
              </button>

              {/* CATEGORY LEGEND PILLS */}
              {CATEGORY_LEGEND.map((cat) => {
                const isActive = activeFilter === cat.id;
                const isHovered = hoveredCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setActiveFilter(activeFilter === cat.id ? 'all' : cat.id);
                      playClick();
                    }}
                    onMouseEnter={() => {
                      setHoveredCategory(cat.id);
                      playHover();
                    }}
                    onMouseLeave={() => setHoveredCategory(null)}
                    className={`px-2.5 py-1 text-[10px] font-heading uppercase tracking-wider border border-slate-900 transition-all duration-150 flex items-center gap-1.5 cursor-pointer focus:outline-none ${
                      isActive
                        ? 'text-white shadow-[2px_2px_0px_#0F172A]'
                        : isHovered
                        ? 'text-slate-900 shadow-[2px_2px_0px_#0F172A] -translate-y-0.5 bg-[#FAFAF8]'
                        : 'text-slate-900 shadow-[1px_1px_0px_rgba(0,0,0,0.15)] bg-[#FAFAF8]'
                    }`}
                    style={{
                      background: isActive ? cat.color : undefined,
                    }}
                  >
                    <span
                      className="w-2.5 h-2.5 border border-slate-900 flex-shrink-0"
                      style={{ background: cat.color }}
                    />
                    <span>{cat.label}</span>
                    <span
                      className="text-[9px] opacity-80"
                      style={{ color: isActive ? '#FFFFFF' : '#64748B' }}
                    >
                      ({cat.count})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── 6-COLUMN SKILL NODE GRID ── */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-3.5">
            {displayedNodes.map((node) => {
              const isSelected = selectedSkill.id === node.id;
              const isHovered = hoveredSkill?.id === node.id;
              const isCategoryHovered = hoveredCategory === node.categoryId;
              const isDimmed = hoveredCategory !== null && !isCategoryHovered;

              return (
                <motion.button
                  key={node.id}
                  layout
                  type="button"
                  onClick={() => {
                    setSelectedSkill(node);
                    playClick();
                  }}
                  onMouseEnter={() => {
                    setHoveredSkill(node);
                    playHover();
                  }}
                  onMouseLeave={() => setHoveredSkill(null)}
                  whileHover={{
                    scale: 1.08,
                    y: -4,
                    transition: { type: 'spring', stiffness: 450, damping: 20 },
                  }}
                  whileTap={{
                    scale: 0.94,
                    y: 2,
                    transition: { type: 'spring', stiffness: 500, damping: 25 },
                  }}
                  className="group flex flex-col items-center gap-1.5 select-none focus:outline-none cursor-pointer transition-opacity duration-150"
                  style={{
                    opacity: isDimmed ? 0.35 : 1,
                    filter: isDimmed ? 'grayscale(40%)' : 'none',
                  }}
                >
                  {/* Colored tile box matching category legend */}
                  <div
                    className="relative w-full aspect-square flex items-center justify-center border-2 transition-all duration-150 overflow-hidden"
                    style={{
                      background: node.color,
                      borderColor: '#0F172A',
                      boxShadow: isDimmed
                        ? '2px 2px 0px #0F172A'
                        : isSelected
                        ? '3px 4px 0px #0F172A, inset 0 0 0 2px rgba(255,255,255,0.6)'
                        : isHovered
                        ? '4px 6px 0px #0F172A'
                        : '2px 2px 0px #0F172A',
                      outline: isSelected && !isDimmed ? '2px solid #0F172A' : 'none',
                      outlineOffset: '2px',
                    }}
                  >
                    {/* Top-left glass highlight pixel */}
                    <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 bg-white/40 pointer-events-none" />

                    {/* Authentic Pixel Style Icon */}
                    <div className="transform transition-transform duration-150 group-hover:scale-115 flex items-center justify-center p-1">
                      <PixelSkillIcon
                        id={node.id}
                        size={28}
                        color="#FFFFFF"
                        className="drop-shadow-[1px_1px_0px_rgba(0,0,0,0.7)]"
                      />
                    </div>

                    {/* Selected badge triangle */}
                    {isSelected && !isDimmed && (
                      <div className="absolute bottom-0 right-0 w-0 h-0 border-l-[7px] border-l-transparent border-b-[7px] border-b-slate-900" />
                    )}
                  </div>

                  {/* Label below tile */}
                  <span
                    className="font-heading text-[8px] sm:text-[9px] uppercase tracking-wider text-center leading-tight transition-colors duration-150 group-hover:text-slate-950"
                    style={{
                      color: isSelected && !isDimmed ? node.color : '#334155',
                    }}
                  >
                    {node.name}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Footer info strip */}
        <div className="mt-6 pt-3 border-t border-slate-300 flex items-center justify-between text-[10px] font-mono text-slate-500 uppercase tracking-widest">
          <span>HOVER FOR PREVIEW // CLICK TO LOCK</span>
          <span className="font-bold text-slate-700">SOURCE: SINGLE TRUTH SPEC</span>
        </div>
      </div>

      {/* ── RIGHT: Inspector Panel ── */}
      <div className="bg-[#F5F2EB] p-5 sm:p-6 flex flex-col justify-between">
        <div>
          {/* Inspector Header */}
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-300">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-rose-600 rounded-none border border-slate-900" />
              <span className="font-heading text-xs text-slate-800 uppercase tracking-widest">
                INSPECTOR
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              {isPreviewing && (
                <span className="px-2 py-0.5 text-[9px] font-mono font-bold bg-amber-200 text-amber-900 border border-amber-500 uppercase tracking-wider animate-pulse">
                  PREVIEW
                </span>
              )}
              <span
                className="px-2 py-0.5 text-[9px] font-heading font-bold border border-slate-900 uppercase tracking-wider text-white shadow-[1px_1px_0px_#0F172A]"
                style={{
                  background: activeSkill.color,
                }}
              >
                BRANCH: {activeSkill.branch}
              </span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeSkill.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              className="flex flex-col gap-4"
            >
              {/* Skill Title & Icon Avatar */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="w-3 h-3 border border-slate-900"
                    style={{ background: activeSkill.color }}
                  />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                    {activeSkill.branch} SECTOR
                  </span>
                </div>

                <div className="flex items-center gap-3.5 min-w-0">
                  <div
                    className="w-14 h-14 flex-shrink-0 flex items-center justify-center border-2 border-slate-900 shadow-[3px_3px_0px_#0F172A]"
                    style={{ background: activeSkill.color }}
                  >
                    <PixelSkillIcon
                      id={activeSkill.id}
                      size={32}
                      color="#FFFFFF"
                      className="drop-shadow-[1px_1px_0px_rgba(0,0,0,0.7)]"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-heading text-sm sm:text-base font-bold text-slate-900 uppercase leading-snug tracking-tight break-words">
                      {activeSkill.name}
                    </h3>
                    <span className="text-xs font-mono text-slate-500 uppercase tracking-widest mt-1 block font-semibold">
                      SYSTEM LVL: {activeSkill.mastery}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Mastery & Use Metrics */}
              <div className="flex flex-col gap-3 p-3.5 bg-white border-2 border-slate-900 shadow-[3px_3px_0px_#0F172A]">
                {/* MASTERY */}
                <div className="flex items-center gap-2">
                  <span className="font-heading text-[10px] text-slate-700 uppercase tracking-wider w-20 flex-shrink-0">
                    MASTERY
                  </span>
                  <div className="flex-1 h-4 bg-slate-100 border border-slate-900 overflow-hidden">
                    <motion.div
                      className="h-full"
                      style={{ background: activeSkill.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${activeSkill.mastery}%` }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                    />
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-900 w-10 text-right">
                    {activeSkill.mastery}%
                  </span>
                </div>

                {/* PRODUCTION USAGE */}
                <div className="flex items-center gap-2">
                  <span className="font-heading text-[10px] text-slate-700 uppercase tracking-wider w-20 flex-shrink-0">
                    USE FREQ
                  </span>
                  <div className="flex-1 h-4 bg-slate-100 border border-slate-900 overflow-hidden">
                    <motion.div
                      className="h-full"
                      style={{ background: activeSkill.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${activeSkill.use}%` }}
                      transition={{ duration: 0.35, ease: 'easeOut', delay: 0.05 }}
                    />
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-900 w-10 text-right">
                    {activeSkill.use}%
                  </span>
                </div>
              </div>

              {/* Description Box */}
              <div className="p-3.5 border-2 border-slate-900 text-xs font-mono text-slate-800 leading-relaxed shadow-[3px_3px_0px_#0F172A] bg-[#FAFAF8]">
                {activeSkill.description}
              </div>

              {/* ── NEW: DEPLOYED IN (Projects & Professional Experience) ── */}
              {((activeSkill.usedIn?.projects && activeSkill.usedIn.projects.length > 0) ||
                (activeSkill.usedIn?.companies && activeSkill.usedIn.companies.length > 0)) && (
                <div className="p-3.5 bg-white border-2 border-slate-900 shadow-[3px_3px_0px_#0F172A] flex flex-col gap-2.5">
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-200">
                    <span className="font-heading text-[10px] text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-rose-600 inline-block" />
                      DEPLOYED IN
                    </span>
                    <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest font-semibold">
                      PRODUCTION CONTEXT
                    </span>
                  </div>

                  {activeSkill.usedIn?.companies && activeSkill.usedIn.companies.length > 0 && (
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                        ORGANIZATIONS / EXPERIENCE:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {activeSkill.usedIn.companies.map((c) => (
                          <span
                            key={c}
                            className="px-2 py-0.5 text-xs font-mono font-bold bg-amber-50 text-amber-900 border border-amber-600 shadow-[1px_1px_0px_#D97706]"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeSkill.usedIn?.projects && activeSkill.usedIn.projects.length > 0 && (
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                        FEATURED PROJECTS:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {activeSkill.usedIn.projects.map((p) => (
                          <span
                            key={p}
                            className="px-2 py-0.5 text-xs font-mono font-bold bg-sky-50 text-sky-900 border border-sky-600 shadow-[1px_1px_0px_#0284C7]"
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Recommended Pair */}
              {activeSkill.pairs && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-white border-2 border-slate-900 shadow-[3px_3px_0px_#0F172A]">
                  <span className="font-heading text-[10px] text-slate-600 uppercase tracking-wider">
                    RECOMMENDED PAIR
                  </span>
                  <span
                    className="px-2.5 py-1 text-[10px] font-heading font-bold border border-slate-900 uppercase tracking-wider text-white w-fit max-w-full break-words shadow-[1px_1px_0px_#0F172A]"
                    style={{
                      background: activeSkill.color,
                    }}
                  >
                    {activeSkill.pairs}
                  </span>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Lock Status Footer */}
        <div className="mt-5 pt-3 border-t border-slate-300 flex items-center justify-between text-xs font-mono text-slate-500">
          <span>STATUS:</span>
          <span className="font-bold text-slate-800 uppercase tracking-wider">
            {!isPreviewing ? '● LOCKED IN HUD' : '○ HOVER PREVIEW'}
          </span>
        </div>
      </div>
    </div>
  );
}
