/**
 * Tech stack / skills data — sourced from portfolioData.json (Source of Truth)
 * Do NOT hardcode values here. All data lives in portfolioData.json.
 */
import data from './portfolioData.json';

export interface Skill {
  id?: string;
  name: string;
  abbr?: string;
  /** Icon identifier (used to resolve react-icons) */
  iconKey: string;
  /** Proficiency level 0-100 */
  level: number;
  /** Production usage frequency 0-100 */
  use?: number;
  /** Category color */
  color: string;
  /** Optional prerequisite skill name for tree connection */
  parentSkill?: string;
  /** Description for tech specs / inspector */
  description?: string;
  /** Recommended tech pair */
  pairs?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  /** Retro theme: branch label */
  retroLabel: string;
  color: string;
  skills: Skill[];
}

export type MasteryTier = 'Feeble' | 'Capable' | 'Masterful' | 'Godlike';

export interface SkillMasteryInfo {
  adjective: MasteryTier;
  label: string;
  tierCode: 'G' | 'M' | 'C' | 'F';
  symbol: string;
  color: string;
  badgeBg: string;
  description: string;
}

export function getSkillMastery(level: number): SkillMasteryInfo {
  if (level >= 90) {
    return {
      adjective: 'Godlike',
      label: 'GODLIKE',
      tierCode: 'G',
      symbol: '★',
      color: '#D97706',
      badgeBg: 'rgba(217, 119, 6, 0.12)',
      description: 'Supreme architecture mastery & core system fluency',
    };
  }
  if (level >= 80) {
    return {
      adjective: 'Masterful',
      label: 'MASTERFUL',
      tierCode: 'M',
      symbol: '❖',
      color: '#059669',
      badgeBg: 'rgba(5, 150, 105, 0.12)',
      description: 'Advanced production velocity & architectural optimization',
    };
  }
  if (level >= 65) {
    return {
      adjective: 'Capable',
      label: 'CAPABLE',
      tierCode: 'C',
      symbol: '◈',
      color: '#0284C7',
      badgeBg: 'rgba(2, 132, 199, 0.12)',
      description: 'Solid operational proficiency across standard stacks',
    };
  }
  return {
    adjective: 'Feeble',
    label: 'FEEBLE',
    tierCode: 'F',
    symbol: '◌',
    color: '#64748B',
    badgeBg: 'rgba(100, 116, 139, 0.12)',
    description: 'Foundational baseline knowledge & active experimentation',
  };
}

export interface SkillRankInfo {
  rank: 'G' | 'M' | 'C' | 'F' | 'S' | 'A' | 'B' | 'C';
  label: string;
  color: string;
  adjective: MasteryTier;
}

export function getSkillRank(level: number): SkillRankInfo {
  const m = getSkillMastery(level);
  return {
    rank: m.tierCode,
    label: m.label,
    color: m.color,
    adjective: m.adjective,
  };
}

export const skillCategories: SkillCategory[] = data.skills.categories as SkillCategory[];
