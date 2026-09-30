'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { skillCategories, type Skill, getSkillRank } from '@/data/skills';
import { EnergyBar } from './EnergyBar';
import { SkillIcon } from './SkillIcon';
import { cn } from '@/lib/utils';
import { useAudio } from '@/hooks/useAudio';

export function WeaponWheel() {
  const [activeCategory, setActiveCategory] = useState<string>(skillCategories[0].id);
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);
  const { playHover } = useAudio();

  const currentCategory = skillCategories.find((c) => c.id === activeCategory) ?? skillCategories[0];

  // Calculate node positions in a circle around center (180, 180)
  const allSkills = useMemo(() => {
    return currentCategory.skills.map((skill, i) => {
      const total = currentCategory.skills.length;
      const angle = (i / total) * Math.PI * 2 - Math.PI / 2;
      const radius = 135;
      const x = Math.cos(angle) * radius + 180;
      const y = Math.sin(angle) * radius + 180;
      return { ...skill, x, y };
    });
  }, [currentCategory]);

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 w-full max-w-5xl mx-auto">
      {/* Category selector tabs - PROMINENT TECH STACK TITLES */}
      <div className="flex flex-row lg:flex-col flex-wrap justify-start gap-3 w-full lg:w-60">
        <div
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '8px',
            color: 'var(--accent-gold)',
            letterSpacing: '0.12em',
            marginBottom: '4px',
            textAlign: 'left',
          }}
          className="hidden lg:block uppercase"
        >
          ► TECH DOMAINS
        </div>
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
              onMouseEnter={() => playHover()}
              className={cn(
                'px-4 py-3 text-left transition-all duration-200 relative group rounded-lg border backdrop-blur-md',
                isActive
                  ? 'border-l-4 shadow-md'
                  : 'opacity-75 hover:opacity-100'
              )}
              style={{
                borderColor: isActive ? cat.color : 'rgba(255, 255, 255, 0.12)',
                background: isActive ? `${cat.color}22` : 'rgba(30, 41, 59, 0.5)',
                boxShadow: isActive ? `0 0 20px ${cat.color}33` : 'none',
              }}
            >
              {/* Prominent Domain Title */}
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '11px',
                  color: isActive ? cat.color : '#F8FAFC',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                }}
              >
                {cat.title}
              </div>

              {/* Subtitle */}
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '9px',
                  marginTop: '2px',
                  color: 'var(--text-secondary)',
                  opacity: isActive ? 0.95 : 0.75,
                }}
                className="flex items-center gap-1.5"
              >
                <span>[{cat.retroLabel}]</span>
                <span className="text-[8px] opacity-80 font-mono">({cat.skills.length})</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Weapon Wheel Container */}
      <div className="weapon-wheel flex-shrink-0" style={{ width: 360, height: 360 }}>
        {/* Center hub */}
        <div
          className="weapon-wheel__center"
          style={{
            borderColor: hoveredSkill ? hoveredSkill.color : currentCategory.color,
            boxShadow: hoveredSkill
              ? `0 0 25px ${hoveredSkill.color}99, inset 0 0 12px rgba(255, 255, 255, 0.1)`
              : `0 0 18px ${currentCategory.color}88, inset 0 0 12px rgba(255, 255, 255, 0.1)`,
          }}
        >
          {hoveredSkill ? (
            <motion.div
              key={hoveredSkill.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              style={{ textAlign: 'center' }}
            >
              {/* Hovered Skill Icon */}
              <div className="flex justify-center mb-1">
                <SkillIcon iconKey={hoveredSkill.iconKey} color={hoveredSkill.color} size={22} />
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '9px',
                  color: hoveredSkill.color,
                  marginBottom: '2px',
                  lineHeight: '1.2',
                }}
              >
                {hoveredSkill.name.toUpperCase()}
              </div>
              <div
                className="flex items-center justify-center gap-1"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '7px',
                  color: getSkillRank(hoveredSkill.level).color,
                }}
              >
                <span>RANK {getSkillRank(hoveredSkill.level).rank}</span>
                <span className="opacity-40">•</span>
                <span style={{ color: '#E2E8F0' }}>LV.{hoveredSkill.level}</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={currentCategory.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              style={{ textAlign: 'center' }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '7px',
                  color: 'var(--accent-gold)',
                  letterSpacing: '0.1em',
                  marginBottom: '2px',
                }}
              >
                TECH STACK
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '11px',
                  color: currentCategory.color,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  lineHeight: '1.2',
                }}
              >
                {currentCategory.title}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '8px',
                  color: '#94A3B8',
                  marginTop: '3px',
                }}
              >
                [{currentCategory.retroLabel}]
              </div>
            </motion.div>
          )}
        </div>

        {/* Connector lines (SVG) */}
        <svg
          style={{
            position: 'absolute',
            inset: 0,
            width: 360,
            height: 360,
            pointerEvents: 'none',
          }}
        >
          {allSkills.map((skill) => (
            <line
              key={skill.name}
              x1={180}
              y1={180}
              x2={skill.x}
              y2={skill.y}
              stroke={hoveredSkill?.name === skill.name ? skill.color : currentCategory.color}
              strokeWidth={hoveredSkill?.name === skill.name ? 2 : 1}
              opacity={hoveredSkill?.name === skill.name ? 0.9 : 0.35}
            />
          ))}
        </svg>

        {/* Skill nodes */}
        {allSkills.map((skill) => {
          const rankInfo = getSkillRank(skill.level);
          const isHovered = hoveredSkill?.name === skill.name;
          return (
            <div
              key={skill.name}
              className="weapon-wheel__node"
              style={{
                left: skill.x - 26,
                top: skill.y - 26,
                borderColor: isHovered ? skill.color : 'rgba(255, 255, 255, 0.2)',
                background: isHovered ? `${skill.color}33` : 'rgba(30, 41, 59, 0.85)',
                boxShadow: isHovered
                  ? `0 0 16px ${skill.color}, inset 0 0 10px ${skill.color}66`
                  : '0 4px 12px rgba(0, 0, 0, 0.3)',
              }}
              onMouseEnter={() => {
                setHoveredSkill(skill);
                playHover();
              }}
              onMouseLeave={() => setHoveredSkill(null)}
              title={`${skill.name} (Rank ${rankInfo.rank} - LV.${skill.level})`}
            >
              {/* Skill Tech Icon */}
              <SkillIcon iconKey={skill.iconKey} color={isHovered ? skill.color : skill.color} size={22} />

              {/* Rank Badge overlay */}
              <div
                className="weapon-wheel__rank-badge"
                style={{
                  color: rankInfo.color,
                  borderColor: `${rankInfo.color}AA`,
                  background: 'rgba(15, 23, 42, 0.95)',
                }}
              >
                {rankInfo.rank}
              </div>
            </div>
          );
        })}
      </div>

      {/* Skill details panel */}
      <div
        style={{ minWidth: 230 }}
        className="w-full lg:w-60 p-5 rounded-xl border border-slate-700/60 bg-slate-900/80 backdrop-blur-md shadow-xl"
      >
        {hoveredSkill ? (
          <motion.div
            key={hoveredSkill.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <SkillIcon iconKey={hoveredSkill.iconKey} color={hoveredSkill.color} size={20} />
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '11px',
                  color: hoveredSkill.color,
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                }}
              >
                {hoveredSkill.name}
              </div>
            </div>

            {/* Mastery display badge */}
            <div className="flex items-center justify-between my-2 text-xs font-mono px-2.5 py-1.5 bg-slate-800/80 rounded-md border border-slate-700">
              <span className="text-slate-300 text-[9px] font-heading uppercase">MASTERY TIER</span>
              <span style={{ color: getSkillRank(hoveredSkill.level).color, fontWeight: 'bold' }}>
                {getSkillRank(hoveredSkill.level).label}
              </span>
            </div>

            <EnergyBar
              value={hoveredSkill.level}
              color="gradient"
              label="PWR"
              showValue
            />

            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                color: 'var(--text-secondary)',
                marginTop: 'var(--sp-3)',
              }}
            >
              MASTERY LEVEL: {hoveredSkill.level}%
            </div>
          </motion.div>
        ) : (
          <div>
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '9px',
                color: currentCategory.color,
                marginBottom: '6px',
                textTransform: 'uppercase',
              }}
            >
              ► {currentCategory.title.toUpperCase()} TECHS
            </div>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                color: 'var(--text-secondary)',
                lineHeight: '1.5',
              }}
            >
              Hover over any technology node to inspect rank, level, and weapon parameters.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
