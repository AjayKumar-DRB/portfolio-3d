'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { skillCategories, Skill, getSkillRank } from '@/data/skills';
import { SkillIcon } from '@/components/retro/SkillIcon';

export function Constellation() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);

  const allSkills = skillCategories.flatMap((c) =>
    c.skills.map((s) => ({ ...s, categoryId: c.id, categoryColor: c.color }))
  );

  const filteredCategories =
    activeCategory === 'all'
      ? skillCategories
      : skillCategories.filter((c) => c.id === activeCategory);

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-10">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-start gap-3">
        <button
          onClick={() => setActiveCategory('all')}
          className="px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200"
          style={{
            background: activeCategory === 'all' ? 'var(--accent-primary)' : 'rgba(255, 255, 255, 0.08)',
            color: activeCategory === 'all' ? '#09090b' : 'var(--text-primary)',
            border: activeCategory === 'all' ? 'none' : '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: activeCategory === 'all' ? '0 0 20px var(--accent-primary)66' : 'none',
          }}
        >
          All Domains
        </button>
        {skillCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className="px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 flex items-center gap-2"
            style={{
              background: activeCategory === cat.id ? `${cat.color}33` : 'rgba(255, 255, 255, 0.08)',
              color: activeCategory === cat.id ? cat.color : 'var(--text-primary)',
              border: `1px solid ${activeCategory === cat.id ? cat.color : 'rgba(255, 255, 255, 0.15)'}`,
              boxShadow: activeCategory === cat.id ? `0 0 15px ${cat.color}44` : 'none',
            }}
          >
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: cat.color }}
            />
            {cat.title}
          </button>
        ))}
      </div>

      {/* Interactive Constellation Cloud Showcase */}
      <div
        className="relative p-8 rounded-2xl overflow-hidden border border-slate-700/60 shadow-2xl"
        style={{
          background: 'rgba(30, 41, 59, 0.65)',
          backdropFilter: 'blur(20px)',
          minHeight: '260px',
        }}
      >
        {/* Ambient background glow */}
        <div
          className="absolute -top-20 -left-20 w-72 h-72 rounded-full pointer-events-none opacity-25 blur-3xl"
          style={{ background: hoveredSkill ? hoveredSkill.color : '#06b6d4' }}
        />
        <div
          className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full pointer-events-none opacity-25 blur-3xl"
          style={{ background: '#ec4899' }}
        />

        <div className="relative z-10 flex flex-wrap items-center justify-center gap-4">
          {allSkills
            .filter((s) => activeCategory === 'all' || s.categoryId === activeCategory)
            .map((skill) => {
              const isSelected = hoveredSkill?.name === skill.name;
              const rankInfo = getSkillRank(skill.level);
              return (
                <div
                  key={skill.name}
                  onMouseEnter={() => setHoveredSkill(skill)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className="cursor-pointer group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300"
                  style={{
                    background: isSelected ? 'rgba(255, 255, 255, 0.16)' : 'rgba(255, 255, 255, 0.07)',
                    border: `1px solid ${isSelected ? skill.color : 'rgba(255, 255, 255, 0.12)'}`,
                    transform: isSelected ? 'scale(1.05) translateY(-2px)' : 'scale(1)',
                    boxShadow: isSelected ? `0 10px 25px -5px ${skill.color}55` : 'none',
                  }}
                >
                  <SkillIcon iconKey={skill.iconKey} color={skill.color} size={20} />
                  <div className="flex flex-col">
                    <span
                      className="text-sm font-semibold tracking-wide text-white group-hover:text-cyan-300 transition-colors"
                      style={{ fontFamily: 'var(--font-outfit)' }}
                    >
                      {skill.name}
                    </span>
                    <span
                      className="text-xs font-mono text-slate-300"
                      style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
                    >
                      Rank {rankInfo.rank} • {skill.level}%
                    </span>
                  </div>
                </div>
              );
            })}
        </div>

        {/* Dynamic Skill Detail Bar when hovered */}
        {hoveredSkill && (
          <motion.div
            key={hoveredSkill.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="mt-8 pt-4 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <SkillIcon iconKey={hoveredSkill.iconKey} color={hoveredSkill.color} size={22} />
              <span className="font-bold text-white text-base" style={{ fontFamily: 'var(--font-outfit)' }}>
                {hoveredSkill.name}
              </span>
              <span
                className="text-xs px-2.5 py-0.5 rounded-full font-mono font-bold"
                style={{
                  background: 'rgba(255, 255, 255, 0.12)',
                  color: getSkillRank(hoveredSkill.level).color,
                  border: `1px solid ${getSkillRank(hoveredSkill.level).color}66`,
                }}
              >
                {getSkillRank(hoveredSkill.level).label} ({hoveredSkill.level}%)
              </span>
            </div>
            <div className="w-full sm:w-64 h-2.5 bg-slate-800 rounded-full overflow-hidden border border-white/10">
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${hoveredSkill.level}%`, background: hoveredSkill.color }}
              />
            </div>
          </motion.div>
        )}
      </div>

      {/* Grid of Domain Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCategories.map((cat) => (
          <div
            key={cat.id}
            className="p-6 rounded-2xl border border-slate-700/60 flex flex-col gap-4 transition-all duration-300 hover:border-slate-500/80 shadow-lg"
            style={{
              background: 'rgba(30, 41, 59, 0.55)',
              backdropFilter: 'blur(16px)',
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span
                  className="w-3.5 h-3.5 rounded-full"
                  style={{ background: cat.color }}
                />
                <h3
                  className="text-lg font-bold text-white"
                  style={{ fontFamily: 'var(--font-outfit)' }}
                >
                  {cat.title}
                </h3>
              </div>
              <span
                className="text-xs font-mono px-2.5 py-1 rounded-md"
                style={{
                  background: `${cat.color}25`,
                  color: cat.color,
                  border: `1px solid ${cat.color}44`,
                }}
              >
                {cat.skills.length} TECHNOLOGIES
              </span>
            </div>

            <div className="flex flex-col gap-3.5 mt-2">
              {cat.skills.map((skill) => (
                <div key={skill.name} className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-200 font-medium flex items-center gap-2">
                      <SkillIcon iconKey={skill.iconKey} color={skill.color} size={16} />
                      {skill.name}
                    </span>
                    <span className="font-mono text-slate-300 font-semibold">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden border border-white/5">
                    <div
                      className="h-full rounded-full transition-all duration-700 ease-out"
                      style={{ width: `${skill.level}%`, background: cat.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
