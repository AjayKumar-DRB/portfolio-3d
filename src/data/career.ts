/**
 * Career narrative data — sourced from portfolioData.json (Source of Truth)
 * Do NOT hardcode values here. All data lives in portfolioData.json.
 */
import data from './portfolioData.json';

export interface CareerChapter {
  id: string;
  level: number;
  title: string;
  subtitle: string;
  period: string;
  company: string;
  role: string;
  description: string;
  highlights: string[];
  /** Retro theme: level name */
  retroTitle: string;
  /** Color accent for this chapter */
  accentColor: string;
}

export const careerChapters: CareerChapter[] = data.careerChapters;
