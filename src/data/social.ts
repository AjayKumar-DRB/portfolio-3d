/**
 * Social links and contact info — sourced from portfolioData.json (Source of Truth)
 * Do NOT hardcode values here. All data lives in portfolioData.json.
 */
import data from './portfolioData.json';

export interface SocialLink {
  id: string;
  label: string;
  url: string;
  /** Phosphor icon name */
  icon: 'GithubLogo' | 'LinkedinLogo' | 'TwitterLogo' | 'DiscordLogo' | 'Envelope';
}

export const socialLinks: SocialLink[] = data.social.links as SocialLink[];

export const contactInfo = {
  email: data.social.contact.email,
  headline: data.social.contact.headline,
  subtext: data.social.contact.subtext,
};

export const identity = data.identity;
