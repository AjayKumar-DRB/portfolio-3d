/**
 * Projects data — sourced from portfolioData.json (Source of Truth)
 * Do NOT hardcode values here. All data lives in portfolioData.json.
 */
import data from './portfolioData.json';

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  stack: string[];
  github: string;
  live: string;
  status: string;
  isWIP: boolean;
  /** Retro theme: boss stats */
  stats: {
    atk: number; // Tech complexity
    def: number; // Code quality / type safety
    spd: number; // Performance / deployment speed
    mag: number; // Innovation / creativity
  };
  difficulty: 1 | 2 | 3 | 4 | 5;
  /** Gradient for card highlights */
  gradient: string;
  /** Accent color for card highlights */
  accentColor: string;
  highlights: string[];
}

export const projects: Project[] = data.projects as Project[];
