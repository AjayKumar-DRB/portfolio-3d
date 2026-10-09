'use client';

import { motion } from 'framer-motion';
import { SkillArsenal } from '@/components/retro/SkillArsenal';
import { SectionHeader } from '@/components/common/SectionHeader';

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative z-10 py-16 md:py-24 border-b-2 border-slate-900"
      style={{
        background: '#F5F2EB',
      }}
    >
      <div className="container mx-auto px-6">
        <SectionHeader
          stage="STAGE 04"
          title="TECH SKILL TREE + ARSENAL"
          subtitle="Tech branches across frontend, backend and DevOps & QA — every node unlocked in live battle."
          accentColor="#00FFAA"
        />

        <motion.div
          className="skills-content"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <SkillArsenal />
        </motion.div>
      </div>
    </section>
  );
}
