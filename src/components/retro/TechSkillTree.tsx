'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { skillCategories, type Skill, getSkillRank, getSkillMastery } from '@/data/skills';
import { SkillIcon } from './SkillIcon';
import { RadialSkillGauge } from './RadialSkillGauge';
import { Tilt3D } from '@/components/common/Tilt3D';
import { useAudio } from '@/hooks/useAudio';
import { cn } from '@/lib/utils';

export function TechSkillTree() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);
  const { playHover } = useAudio();

  const filteredCategories =
    activeCategory === 'all'
      ? skillCategories
      : skillCategories.filter((c) => c.id === activeCategory);

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-8 select-none">
      {/* Domain Selection Tabs (Light Retro Design System) */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => {
            setActiveCategory('all');
            setHoveredSkill(null);
            playHover();
          }}
          onMouseEnter={playHover}
          className={cn(
            'px-4 py-2.5 text-xs font-mono font-bold uppercase tracking-wider transition-all duration-150',
            activeCategory === 'all'
              ? 'bg-slate-900 text-white border-2 border-slate-900 shadow-[3px_3px_0px_#0284C7]'
              : 'bg-white text-slate-800 border-2 border-slate-900 shadow-[2px_2px_0px_#0F172A] hover:bg-slate-50'
          )}
        >
          ► ALL DOMAINS ({skillCategories.reduce((acc, c) => acc + c.skills.length, 0)})
        </button>

        {skillCategories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setHoveredSkill(null);
                playHover();
              }}
              onMouseEnter={playHover}
              className={cn(
                'px-4 py-2.5 text-xs font-mono font-bold uppercase tracking-wider transition-all duration-150 flex items-center gap-2',
                isActive
                  ? 'bg-white text-slate-900 border-2 border-slate-900 shadow-[3px_3px_0px_#0F172A]'
                  : 'bg-white text-slate-700 border-2 border-slate-900/60 shadow-[2px_2px_0px_rgba(15,23,42,0.4)] hover:bg-slate-50'
              )}
              style={{
                borderColor: isActive ? cat.color : undefined,
                boxShadow: isActive ? `3px 3px 0px ${cat.color}` : undefined,
              }}
            >
              <span
                className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
                style={{ background: cat.color }}
              />
              <span>{cat.title}</span>
              <span className="text-[10px] opacity-60">({cat.skills.length})</span>
            </button>
          );
        })}
      </div>

      {/* Main Grid: Interactive Skill Trees & Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left / Center: Tree Branches */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className="p-6 bg-white border-2 border-slate-900 shadow-[4px_4px_0px_#0F172A] rounded-sm relative overflow-hidden"
            >
              {/* Branch Header */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b-2 border-slate-900/10">
                <div className="flex items-center gap-3">
                  <span
                    className="w-3.5 h-3.5 rounded-sm flex-shrink-0 border border-slate-900"
                    style={{ background: category.color }}
                  />
                  <div>
                    <h3
                      className="text-sm md:text-base font-bold text-slate-900 uppercase tracking-wide"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {category.title} BRANCH
                    </h3>
                    <span className="text-[10px] font-mono text-slate-500">
                      [{category.retroLabel}]
                    </span>
                  </div>
                </div>

                <span
                  className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase bg-slate-100 border border-slate-900 rounded-sm"
                  style={{ color: category.color }}
                >
                  {category.skills.length} NODE TECHS
                </span>
              </div>

              {/* Skill Tree Nodes Grid with Connector Styling */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                {category.skills.map((skill) => {
                  const rankInfo = getSkillRank(skill.level);
                  const isHovered = hoveredSkill?.name === skill.name;

                  return (
                    <Tilt3D
                      key={skill.name}
                      maxTilt={8}
                      scale={1.02}
                      enableScanline={false}
                    >
                      <div
                        onMouseEnter={() => {
                          setHoveredSkill(skill);
                          playHover();
                        }}
                        onMouseLeave={() => setHoveredSkill(null)}
                        className={cn(
                          'p-4 bg-white border-2 transition-all duration-150 cursor-pointer relative group flex flex-col justify-between h-full rounded-sm',
                          isHovered
                            ? 'border-slate-900 bg-slate-50 shadow-[4px_4px_0px_#0F172A]'
                            : 'border-slate-900/70 shadow-[2px_2px_0px_#0F172A]'
                        )}
                        style={{
                          borderColor: isHovered ? skill.color : undefined,
                          boxShadow: isHovered ? `4px 4px 0px ${skill.color}` : undefined,
                        }}
                      >
                        {/* Top: Icon, Name & Rank Badge */}
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="flex items-center gap-2.5">
                            <div
                              className="p-2 rounded-sm border border-slate-900/20 bg-slate-50 flex items-center justify-center flex-shrink-0"
                              style={{ background: `${skill.color}15` }}
                            >
                              <SkillIcon iconKey={skill.iconKey} color={skill.color} size={22} />
                            </div>
                            <div>
                              <div
                                className="text-xs font-bold text-slate-900 uppercase tracking-wider"
                                style={{ fontFamily: 'var(--font-heading)' }}
                              >
                                {skill.name}
                              </div>
                              {skill.parentSkill && (
                                <div className="text-[9px] font-mono text-slate-500">
                                  └─ Requires: {skill.parentSkill}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Mastery Tier Badge */}
                          <span
                            className="px-2 py-0.5 text-[10px] font-mono font-bold border border-slate-900 rounded-sm shadow-[1px_1px_0px_#0F172A]"
                            style={{
                              background: '#FFFFFF',
                              color: rankInfo.color,
                            }}
                            title={`${skill.name}: ${rankInfo.adjective} (${skill.level}%)`}
                          >
                            {rankInfo.rank}
                          </span>
                        </div>

                        {/* Bottom: Level Progress Bar */}
                        <div>
                          <div className="flex justify-between items-center text-[10px] font-mono text-slate-600 mb-1">
                            <span>PROFICIENCY</span>
                            <span className="font-bold text-slate-900">{skill.level}%</span>
                          </div>
                          <div className="h-2 w-full bg-slate-200 border border-slate-900 rounded-none overflow-hidden">
                            <div
                              className="h-full transition-all duration-500 ease-out"
                              style={{
                                width: `${skill.level}%`,
                                background: skill.color,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </Tilt3D>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Skill Inspector Card (Light Retro Design System) */}
        <div className="lg:col-span-4 sticky top-24">
          <div className="p-6 bg-white border-2 border-slate-900 shadow-[5px_5px_0px_#0F172A] rounded-sm">
            <div
              className="text-[9px] font-mono font-bold text-rose-600 uppercase tracking-widest pb-3 mb-4 border-b-2 border-slate-900/10 flex items-center justify-between"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              <span>► SKILL INSPECTOR</span>
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            </div>

            {hoveredSkill ? (
              <motion.div
                key={hoveredSkill.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-4"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="p-3 rounded-sm border-2 border-slate-900 bg-slate-50"
                    style={{ background: `${hoveredSkill.color}20` }}
                  >
                    <SkillIcon iconKey={hoveredSkill.iconKey} color={hoveredSkill.color} size={28} />
                  </div>
                  <div>
                    <h4
                      className="text-base font-bold text-slate-900 uppercase"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {hoveredSkill.name}
                    </h4>
                    <span className="text-xs font-mono text-slate-500">
                      MASTERY: {hoveredSkill.level}%
                    </span>
                  </div>
                </div>

                {/* Radial / Circular Gauge Dial with Adjective Tier */}
                <RadialSkillGauge level={hoveredSkill.level} />

                <div className="text-xs font-mono text-slate-600 leading-relaxed p-3 bg-slate-100/70 border border-slate-900/20">
                  {hoveredSkill.name} is fully integrated into active production pipelines with a proven {hoveredSkill.level}% proficiency rank.
                </div>
              </motion.div>
            ) : (
              <div className="py-8 text-center text-slate-500 font-mono text-xs flex flex-col items-center gap-3">
                <span className="text-2xl text-slate-400">🔍</span>
                <p className="leading-relaxed">
                  Hover over any technology node in the skill tree to inspect rank ratings, levels, and prerequisites.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
