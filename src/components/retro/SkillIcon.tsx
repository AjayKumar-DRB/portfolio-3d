'use client';

import React from 'react';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiThreedotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiNestjs,
  SiPython,
  SiGraphql,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiDocker,
  SiGit,
  SiGithubactions,
  SiLinux,
  SiJest,
  SiCypress,
  SiTestinglibrary,
  SiExpress,
  SiPostman,
  SiRedux,
  SiStripe,
  SiPaypal,
  SiGithub,
  SiVercel,
  SiMysql,
} from 'react-icons/si';

const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties; size?: number }>> = {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiThreedotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiNestjs,
  SiPython,
  SiGraphql,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiDocker,
  SiGit,
  SiGithubactions,
  SiLinux,
  SiJest,
  SiCypress,
  SiTestinglibrary,
  SiExpress,
  SiPostman,
  SiRedux,
  SiStripe,
  SiPaypal,
  SiGithub,
  SiVercel,
  SiMysql,
};

interface SkillIconProps {
  iconKey: string;
  color?: string;
  size?: number;
  className?: string;
}

export function SkillIcon({ iconKey, color, size = 20, className }: SkillIconProps) {
  const IconComponent = iconMap[iconKey];

  if (!IconComponent) {
    return (
      <span className={className} style={{ fontSize: `${size}px`, color, lineHeight: 1 }}>
        ◆
      </span>
    );
  }

  return <IconComponent size={size} className={className} style={{ color }} />;
}
