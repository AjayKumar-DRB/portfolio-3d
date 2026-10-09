'use client';

import { motion } from 'framer-motion';
import { projects } from '@/data/projects';
import { BossBattleCard } from '@/components/retro/BossBattleCard';
import { SectionHeader } from '@/components/common/SectionHeader';

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative z-10 py-16 md:py-24 border-b-2 border-slate-900 bg-transparent"
    >
      <div className="container mx-auto px-6">
        {/* Prominent Header Matching User Image 2 */}
        <SectionHeader
          stage="STAGE 03"
          title="BOSS BATTLES & PROJECTS"
          subtitle="Select a target mission card to view battle intel, stack specs and live deployment."
          accentColor="#00FFAA"
        />

        {/* Project grid */}
        <div
          className="grid gap-8"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            maxWidth: '960px',
            margin: '0 auto',
          }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="project-card h-full"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-15%' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const, delay: index * 0.1 }}
            >
              <BossBattleCard project={project} index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
