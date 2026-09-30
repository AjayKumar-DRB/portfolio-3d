'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { getSkillRank } from '@/data/skills';
import { SkillIcon } from './SkillIcon';
import { EnergyBar } from './EnergyBar';
import { useAudio } from '@/hooks/useAudio';
import { cn } from '@/lib/utils';

export interface SkillNodeData {
  id: string;
  name: string;
  iconKey: string;
  level: number;
  category: 'frontend' | 'backend' | 'devops';
  x: number; // SVG canvas percentage 0-100 or coordinate
  y: number;
  parentIds: string[];
  isUnlocked?: boolean;
}

// 3-Trunk Tree Skill Nodes matching ARC Skill Tree reference layout
const treeNodes: SkillNodeData[] = [
  // --- GREEN BRANCH (FRONTEND - LEFT) ---
  { id: 'ts', name: 'TypeScript', iconKey: 'SiTypescript', level: 90, category: 'frontend', x: 380, y: 470, parentIds: [] },
  { id: 'react', name: 'React', iconKey: 'SiReact', level: 95, category: 'frontend', x: 280, y: 400, parentIds: ['ts'] },
  { id: 'next', name: 'Next.js', iconKey: 'SiNextdotjs', level: 90, category: 'frontend', x: 200, y: 310, parentIds: ['react'] },
  { id: 'tailwind', name: 'Tailwind CSS', iconKey: 'SiTailwindcss', level: 85, category: 'frontend', x: 130, y: 240, parentIds: ['next'] },
  { id: 'ux', name: 'Responsive UX', iconKey: 'SiReact', level: 88, category: 'frontend', x: 70, y: 170, parentIds: ['tailwind'] },
  { id: 'three', name: 'Three.js', iconKey: 'SiThreedotjs', level: 70, category: 'frontend', x: 190, y: 460, parentIds: ['react'] },
  { id: 'webgl', name: 'WebGL / Shaders', iconKey: 'SiThreedotjs', level: 68, category: 'frontend', x: 110, y: 485, parentIds: ['three'] },
  { id: 'canvas', name: 'Canvas 2D', iconKey: 'SiReact', level: 75, category: 'frontend', x: 45, y: 425, parentIds: ['webgl'] },

  // --- YELLOW BRANCH (BACKEND - CENTER) ---
  { id: 'node', name: 'Node.js', iconKey: 'SiNodedotjs', level: 90, category: 'backend', x: 450, y: 470, parentIds: [] },
  { id: 'nest', name: 'NestJS', iconKey: 'SiNestjs', level: 80, category: 'backend', x: 450, y: 375, parentIds: ['node'] },
  { id: 'python', name: 'Python', iconKey: 'SiPython', level: 75, category: 'backend', x: 450, y: 280, parentIds: ['nest'] },
  { id: 'graphql', name: 'GraphQL', iconKey: 'SiGraphql', level: 70, category: 'backend', x: 400, y: 190, parentIds: ['python'] },
  { id: 'rest', name: 'REST APIs', iconKey: 'SiNodedotjs', level: 88, category: 'backend', x: 370, y: 100, parentIds: ['graphql'] },
  { id: 'sockets', name: 'WebSockets', iconKey: 'SiNodedotjs', level: 72, category: 'backend', x: 500, y: 190, parentIds: ['python'] },
  { id: 'micro', name: 'Microservices', iconKey: 'SiNestjs', level: 75, category: 'backend', x: 530, y: 100, parentIds: ['sockets'] },

  // --- RED BRANCH (DEVOPS & TESTING - RIGHT) ---
  { id: 'git', name: 'Git', iconKey: 'SiGit', level: 90, category: 'devops', x: 520, y: 470, parentIds: [] },
  { id: 'docker', name: 'Docker', iconKey: 'SiDocker', level: 78, category: 'devops', x: 620, y: 400, parentIds: ['git'] },
  { id: 'cicd', name: 'GitHub Actions', iconKey: 'SiGithubactions', level: 85, category: 'devops', x: 700, y: 310, parentIds: ['docker'] },
  { id: 'postgres', name: 'PostgreSQL', iconKey: 'SiPostgresql', level: 85, category: 'devops', x: 770, y: 240, parentIds: ['cicd'] },
  { id: 'redis', name: 'Redis', iconKey: 'SiRedis', level: 75, category: 'devops', x: 840, y: 170, parentIds: ['postgres'] },
  { id: 'linux', name: 'Linux / Cloud', iconKey: 'SiLinux', level: 78, category: 'devops', x: 890, y: 250, parentIds: ['redis'] },
  { id: 'jest', name: 'Jest / QA', iconKey: 'SiJest', level: 88, category: 'devops', x: 710, y: 460, parentIds: ['docker'] },
  { id: 'testinglib', name: 'Testing Library', iconKey: 'SiTestinglibrary', level: 85, category: 'devops', x: 795, y: 485, parentIds: ['jest'] },
  { id: 'cypress', name: 'Cypress E2E', iconKey: 'SiCypress', level: 80, category: 'devops', x: 855, y: 425, parentIds: ['testinglib'] },
];

export function ArcSkillTree() {
  const [hoveredNode, setHoveredNode] = useState<SkillNodeData | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const { playHover } = useAudio();

  // Root origin point where 3 main trunks merge
  const rootPoint = { x: 450, y: 550 };

  const getCategoryColor = (cat: 'frontend' | 'backend' | 'devops') => {
    switch (cat) {
      case 'frontend':
        return '#00FFAA'; // Vibrant Green
      case 'backend':
        return '#FFD700'; // Vibrant Gold/Yellow
      case 'devops':
        return '#FF3366'; // Vibrant Red/Pink
    }
  };

  // Helper to generate smooth bezier curve paths between 2 points
  const createCurvedPath = (x1: number, y1: number, x2: number, y2: number) => {
    const midY = (y1 + y2) / 2;
    return `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`;
  };

  const isNodeHighlighted = (node: SkillNodeData) => {
    if (!hoveredNode) return true;
    if (hoveredNode.id === node.id) return true;
    if (hoveredNode.parentIds.includes(node.id)) return true;
    if (node.parentIds.includes(hoveredNode.id)) return true;
    return false;
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 select-none">
      {/* Category Filter Controls */}
      <div className="flex flex-wrap items-center justify-start gap-3">
        <button
          onClick={() => setActiveCategoryFilter('all')}
          className={cn(
            'px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider transition-all duration-150 rounded-sm',
            activeCategoryFilter === 'all'
              ? 'bg-slate-900 text-white border-2 border-slate-900 shadow-[3px_3px_0px_#00FFAA]'
              : 'bg-white text-slate-800 border-2 border-slate-900 shadow-[2px_2px_0px_#0F172A] hover:bg-slate-50'
          )}
        >
          ► ALL BRANCHES (22 NODES)
        </button>
        <button
          onClick={() => setActiveCategoryFilter('frontend')}
          className={cn(
            'px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider transition-all duration-150 flex items-center gap-2 rounded-sm',
            activeCategoryFilter === 'frontend'
              ? 'bg-emerald-600 text-white border-2 border-slate-900 shadow-[3px_3px_0px_#00FFAA]'
              : 'bg-white text-slate-800 border-2 border-slate-900 shadow-[2px_2px_0px_#0F172A] hover:bg-slate-50'
          )}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#00FFAA] border border-slate-900" />
          FRONTEND (8)
        </button>
        <button
          onClick={() => setActiveCategoryFilter('backend')}
          className={cn(
            'px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider transition-all duration-150 flex items-center gap-2 rounded-sm',
            activeCategoryFilter === 'backend'
              ? 'bg-amber-500 text-slate-900 border-2 border-slate-900 shadow-[3px_3px_0px_#FFD700]'
              : 'bg-white text-slate-800 border-2 border-slate-900 shadow-[2px_2px_0px_#0F172A] hover:bg-slate-50'
          )}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFD700] border border-slate-900" />
          BACKEND (7)
        </button>
        <button
          onClick={() => setActiveCategoryFilter('devops')}
          className={cn(
            'px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider transition-all duration-150 flex items-center gap-2 rounded-sm',
            activeCategoryFilter === 'devops'
              ? 'bg-rose-600 text-white border-2 border-slate-900 shadow-[3px_3px_0px_#FF3366]'
              : 'bg-white text-slate-800 border-2 border-slate-900 shadow-[2px_2px_0px_#0F172A] hover:bg-slate-50'
          )}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF3366] border border-slate-900" />
          DEVOPS & TESTING (9)
        </button>
      </div>

      {/* Main ARC Skill Tree Stage Container */}
      <div className="relative w-full bg-white border-2 border-slate-900 shadow-[6px_6px_0px_#0F172A] rounded-sm p-4 overflow-hidden">
        {/* Decorative Grid Overlay matching portfolio design system */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage: `linear-gradient(#0F172A 1px, transparent 1px), linear-gradient(90deg, #0F172A 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* SVG Canvas for Organic Branch Paths */}
        <div className="relative w-full aspect-[16/10] min-h-[560px]">
          <svg
            viewBox="0 0 940 580"
            className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
          >
            <defs>
              {/* Glow Filters for Branch Lines */}
              <filter id="glow-green" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="glow-yellow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="glow-red" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* 3 Main Bottom Trunk Extensions (Root split) */}
            {/* Green Trunk */}
            <path
              d={createCurvedPath(rootPoint.x - 10, rootPoint.y, 380, 470)}
              stroke="#00FFAA"
              strokeWidth={8}
              strokeLinecap="round"
              fill="none"
              filter="url(#glow-green)"
              opacity={activeCategoryFilter === 'all' || activeCategoryFilter === 'frontend' ? 1 : 0.2}
            />
            {/* Yellow Trunk */}
            <path
              d={createCurvedPath(rootPoint.x, rootPoint.y, 450, 470)}
              stroke="#FFD700"
              strokeWidth={8}
              strokeLinecap="round"
              fill="none"
              filter="url(#glow-yellow)"
              opacity={activeCategoryFilter === 'all' || activeCategoryFilter === 'backend' ? 1 : 0.2}
            />
            {/* Red Trunk */}
            <path
              d={createCurvedPath(rootPoint.x + 10, rootPoint.y, 520, 470)}
              stroke="#FF3366"
              strokeWidth={8}
              strokeLinecap="round"
              fill="none"
              filter="url(#glow-red)"
              opacity={activeCategoryFilter === 'all' || activeCategoryFilter === 'devops' ? 1 : 0.2}
            />

            {/* Root Bottom Base Hub */}
            <circle cx={rootPoint.x} cy={rootPoint.y} r={14} fill="#0F172A" stroke="#FFFFFF" strokeWidth={3} />
            <circle cx={rootPoint.x} cy={rootPoint.y} r={6} fill="#00FFAA" />

            {/* Branch Connector Paths between Skill Nodes */}
            {treeNodes.map((node) => {
              const color = getCategoryColor(node.category);
              const isFilteredOut = activeCategoryFilter !== 'all' && activeCategoryFilter !== node.category;

              return node.parentIds.map((parentId) => {
                const parentNode = treeNodes.find((n) => n.id === parentId);
                if (!parentNode) return null;

                const isPathActive =
                  hoveredNode &&
                  (hoveredNode.id === node.id || hoveredNode.id === parentNode.id);

                return (
                  <path
                    key={`${parentId}-${node.id}`}
                    d={createCurvedPath(parentNode.x, parentNode.y, node.x, node.y)}
                    stroke={color}
                    strokeWidth={isPathActive ? 6 : 4}
                    strokeLinecap="round"
                    fill="none"
                    filter={`url(#glow-${node.category === 'frontend' ? 'green' : node.category === 'backend' ? 'yellow' : 'red'})`}
                    opacity={isFilteredOut ? 0.15 : isPathActive ? 1 : 0.75}
                    className="transition-all duration-300"
                  />
                );
              });
            })}
          </svg>

          {/* Render Circular Interactive Skill Nodes */}
          {treeNodes.map((node) => {
            const rankInfo = getSkillRank(node.level);
            const color = getCategoryColor(node.category);
            const isHovered = hoveredNode?.id === node.id;
            const isHighlighted = isNodeHighlighted(node);
            const isFilteredOut = activeCategoryFilter !== 'all' && activeCategoryFilter !== node.category;

            return (
              <div
                key={node.id}
                onMouseEnter={() => {
                  setHoveredNode(node);
                  playHover();
                }}
                onMouseLeave={() => setHoveredNode(null)}
                className={cn(
                  'absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 group z-10',
                  isFilteredOut && 'opacity-30 pointer-events-none'
                )}
                style={{
                  left: `${(node.x / 940) * 100}%`,
                  top: `${(node.y / 580) * 100}%`,
                }}
              >
                {/* Outer Circular Node Card matching image layout */}
                <div
                  className={cn(
                    'w-12 h-12 md:w-14 md:h-14 rounded-full bg-white border-2 border-slate-900 flex items-center justify-center relative transition-transform duration-200',
                    isHovered ? 'scale-125 z-30 shadow-[0_0_20px_rgba(15,23,42,0.8)]' : 'shadow-[2px_2px_0px_#0F172A]'
                  )}
                  style={{
                    borderColor: isHovered ? color : '#0F172A',
                    boxShadow: isHovered ? `0 0 20px ${color}` : undefined,
                  }}
                >
                  {/* Skill Icon */}
                  <SkillIcon iconKey={node.iconKey} color={color} size={22} />

                  {/* Rank Badge Tag on top-right edge */}
                  <span
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full border border-slate-900 bg-slate-900 text-white flex items-center justify-center text-[9px] font-mono font-bold"
                    style={{
                      color: rankInfo.color,
                      borderColor: color,
                    }}
                  >
                    {rankInfo.rank}
                  </span>
                </div>

                {/* Skill Name Tag on Hover or Active */}
                <div
                  className={cn(
                    'absolute left-1/2 -translate-x-1/2 top-full mt-1.5 px-2 py-0.5 bg-slate-900 text-white text-[9px] font-mono font-bold whitespace-nowrap rounded-sm border border-slate-700 shadow-md transition-opacity duration-150 pointer-events-none',
                    isHovered ? 'opacity-100 scale-100 z-40' : 'opacity-0 scale-95'
                  )}
                >
                  {node.name.toUpperCase()} • {node.level}%
                </div>
              </div>
            );
          })}

          {/* 3 Main Trunk Category Labels at Bottom matching Reference Image */}
          {/* Left: FRONTEND 25 */}
          <div
            className="absolute left-[26%] bottom-[4%] text-center cursor-pointer"
            onClick={() => setActiveCategoryFilter('frontend')}
          >
            <div
              className="text-xs font-bold font-mono tracking-widest text-emerald-600 uppercase"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              FRONTEND ARCH
            </div>
            <div className="text-xl font-bold font-mono text-emerald-600">25</div>
          </div>

          {/* Center: BACKEND 27 */}
          <div
            className="absolute left-[45%] bottom-[4%] text-center cursor-pointer"
            onClick={() => setActiveCategoryFilter('backend')}
          >
            <div
              className="text-xs font-bold font-mono tracking-widest text-amber-500 uppercase"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              BACKEND & APIS
            </div>
            <div className="text-xl font-bold font-mono text-amber-500">27</div>
          </div>

          {/* Right: DEVOPS & QA 24 */}
          <div
            className="absolute left-[65%] bottom-[4%] text-center cursor-pointer"
            onClick={() => setActiveCategoryFilter('devops')}
          >
            <div
              className="text-xs font-bold font-mono tracking-widest text-rose-600 uppercase"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              DEVOPS & TESTING
            </div>
            <div className="text-xl font-bold font-mono text-rose-600">24</div>
          </div>
        </div>

        {/* Skill Inspector Panel when node is hovered */}
        {hoveredNode && (
          <motion.div
            key={hoveredNode.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="mt-4 p-4 bg-white border-2 border-slate-900 shadow-[4px_4px_0px_#0F172A] rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <div
                className="p-2.5 rounded-sm border-2 border-slate-900 bg-slate-50 flex-shrink-0"
                style={{ background: `${getCategoryColor(hoveredNode.category)}20` }}
              >
                <SkillIcon iconKey={hoveredNode.iconKey} color={getCategoryColor(hoveredNode.category)} size={24} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4
                    className="text-sm font-bold text-slate-900 uppercase"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {hoveredNode.name}
                  </h4>
                  <span
                    className="px-2 py-0.5 text-[9px] font-mono font-bold border border-slate-900 bg-slate-900 text-white rounded-sm"
                    style={{ color: getSkillRank(hoveredNode.level).color }}
                  >
                    {getSkillRank(hoveredNode.level).label}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-600 uppercase">
                  BRANCH: {hoveredNode.category.toUpperCase()} • PROFICIENT MASTERY
                </span>
              </div>
            </div>

            <div className="w-full sm:w-64">
              <EnergyBar
                value={hoveredNode.level}
                color="gradient"
                label="TREE PWR"
                showValue
              />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
