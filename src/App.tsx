import React, { useState, useRef } from 'react';
import OpeningExperience from './components/OpeningExperience';
import Atmosphere from './components/Atmosphere';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import TimelineSection from './components/TimelineSection';
import SkillsSection from './components/SkillsSection';
import EvidenceBoard from './components/EvidenceBoard';
import ProjectReportModal from './components/ProjectReportModal';
import DashboardSection from './components/DashboardSection';
import FutureMissionsSection from './components/FutureMissionsSection';
import ContactSection from './components/ContactSection';
import ClosingExperience from './components/ClosingExperience';
import { EVIDENCE_PROJECTS } from './data';
import { EvidenceProject } from './types';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [openingComplete, setOpeningComplete] = useState(false);
  const [selectedProject, setSelectedProject] = useState<EvidenceProject | null>(null);

  // Layout Scrolling Target Refs
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const timelineSectionRef = useRef<HTMLDivElement>(null);
  const evidenceBoardRef = useRef<HTMLDivElement>(null);
  const contactSectionRef = useRef<HTMLDivElement>(null);

  const handleScrollToAbout = () => {
    aboutSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleScrollToTimeline = () => {
    timelineSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleScrollToEvidence = () => {
    evidenceBoardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleScrollToContact = () => {
    contactSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleOpenProject = (project: EvidenceProject) => {
    setSelectedProject(project);
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
  };

  const handleNavigateProject = (project: EvidenceProject) => {
    setSelectedProject(project);
  };

  return (
    <div className="relative min-h-screen bg-bg-dark text-white font-sans overflow-x-hidden selection:bg-classified-red selection:text-white">
      {/* 1. Opening Manila Folder Experience */}
      <AnimatePresence mode="wait">
        {!openingComplete && (
          <OpeningExperience onComplete={() => setOpeningComplete(true)} />
        )}
      </AnimatePresence>

      {/* 2. Main Portfolio Dossier Flow */}
      {openingComplete && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative min-h-screen flex flex-col"
        >
          {/* Elegant HUD Header bar */}
          <header className="sticky top-0 min-h-16 py-2 sm:py-0 flex flex-col sm:flex-row items-center justify-between px-4 sm:px-8 border-b border-white/10 z-50 bg-[#050505]/95 backdrop-blur-md gap-2 sm:gap-0">
            <div className="flex items-center gap-2.5 sm:gap-4">
              <div className="w-2.5 h-2.5 bg-[#D62828] rounded-full shadow-[0_0_8px_#D62828]"></div>
              <span className="font-mono text-[9px] sm:text-xs tracking-widest text-[#B8B8B8] uppercase">CLASSIFIED // DOSSIER: 021</span>
            </div>
            <div className="flex gap-4 sm:gap-6 text-[9px] sm:text-[10px] uppercase tracking-widest font-semibold text-[#B8B8B8]">
              <button onClick={handleScrollToAbout} className="hover:text-white transition-colors cursor-pointer">Personnel File</button>
              <button onClick={handleScrollToTimeline} className="hover:text-white transition-colors cursor-pointer">Mission Log</button>
              <button onClick={handleScrollToEvidence} className="hover:text-[#D62828] transition-colors cursor-pointer text-[#D62828]">Evidence Board</button>
              <button onClick={handleScrollToContact} className="hover:text-white transition-colors cursor-pointer">Contact Agent</button>
            </div>
            <div className="font-mono text-[8px] sm:text-[10px] text-[#D4AF37] uppercase">
              13 JUN 2026 // 09:42 EST
            </div>
          </header>

          {/* Hardware-accelerated Film Grain Overlay */}
          <div className="film-grain pointer-events-none" />

          {/* Environmental floating dust & volume controls */}
          <Atmosphere />

          {/* Hero Classified Document sheet */}
          <HeroSection 
            onScrollToEvidence={handleScrollToEvidence}
            onScrollToContact={handleScrollToContact}
          />

          {/* About Personnel Card */}
          <div ref={aboutSectionRef} className="scroll-mt-16">
            <AboutSection />
          </div>

          {/* Vertical scrolling Yarn timeline */}
          <div ref={timelineSectionRef} className="scroll-mt-16">
            <TimelineSection />
          </div>

          {/* Classified Skills cards */}
          <SkillsSection />

          {/* Centerpiece Cork Board (Anchored with relative ref) */}
          <div ref={evidenceBoardRef} className="scroll-mt-16">
            <EvidenceBoard onSelectProject={handleOpenProject} />
          </div>

          {/* Live Intelligence Dashboard */}
          <DashboardSection />

          {/* Upcoming pipelines checklist */}
          <FutureMissionsSection />

          {/* Final contact dispatch sheet */}
          <div ref={contactSectionRef} className="scroll-mt-16">
            <ContactSection />
          </div>

          {/* Dossier Footer bar */}
          <footer className="h-12 border-t border-white/5 flex items-center justify-center px-4 sm:px-8 bg-[#050505] z-20">
            <div className="flex flex-wrap gap-4 sm:gap-8 justify-center text-[9px] font-mono tracking-widest text-[#B8B8B8] text-center">
              <span>&copy; 2026 RAM EDITS</span>
              <span className="hidden sm:inline">//</span>
              <span>NO FAKE CLIENTS</span>
              <span className="hidden sm:inline">//</span>
              <span>PURE GROWTH</span>
              <span className="hidden sm:inline">//</span>
              <span className="text-white/40">BUILT ON DELIBERATE PRACTICE</span>
            </div>
          </footer>

          {/* Folder closing shutdown experience */}
          <ClosingExperience />
        </motion.div>
      )}

      {/* 3. Global Full-Screen Project Case Report Overlays */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectReportModal
            project={selectedProject}
            allProjects={EVIDENCE_PROJECTS}
            onClose={handleCloseProject}
            onNavigateToProject={handleNavigateProject}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
