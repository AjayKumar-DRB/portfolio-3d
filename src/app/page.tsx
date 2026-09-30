'use client';

import { ScrollProvider } from '@/components/providers/ScrollProvider';
import { PerformanceProvider } from '@/components/providers/PerformanceProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { SkillTickerStrip } from '@/components/retro/SkillTickerStrip';
import { StorySection } from '@/components/sections/StorySection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { CTASection } from '@/components/sections/CTASection';

import { PixelBackground2D } from '@/components/retro/PixelBackground2D';
import { SwordCursor } from '@/components/retro/SwordCursor';
import { BgmManager } from '@/components/common/BgmManager';

export default function Home() {
  return (
    <PerformanceProvider>
      <ScrollProvider>
        <BgmManager />
        <SwordCursor />
        <PixelBackground2D />
        <Navbar />

        <main>
          <HeroSection />
          <SkillTickerStrip />
          <StorySection />
          <ProjectsSection />
          <SkillsSection />
          <CTASection />
        </main>
        <Footer />
      </ScrollProvider>
    </PerformanceProvider>
  );
}
