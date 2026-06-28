import React from 'react';
import { motion } from 'motion/react';
import { FileSearch, Mail, ShieldAlert, ArrowDown } from 'lucide-react';
import { sound } from './SoundEffects';

interface HeroSectionProps {
  onScrollToEvidence: () => void;
  onScrollToContact: () => void;
}

export default function HeroSection({ onScrollToEvidence, onScrollToContact }: HeroSectionProps) {
  const handleHoverStart = () => {
    sound.playPaperRustle();
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center pt-24 pb-12 px-4 z-20">
      {/* Decorative overhead lamp visual header */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-32 bg-gradient-to-b from-[#F5F1E8]/10 to-transparent blur-xl pointer-events-none" />

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 50, damping: 15, delay: 0.2 }}
        onHoverStart={handleHoverStart}
        whileHover={{ scale: 1.01 }}
        className="relative w-full max-w-2xl bg-paper text-neutral-900 px-6 sm:px-12 py-10 sm:py-14 rounded-sm shadow-[0_30px_70px_rgba(0,0,0,0.8)] border border-neutral-300 overflow-hidden paper-texture cursor-default"
      >
        {/* Red Folder border accent (Simulating a folder spine behind it) */}
        <div className="absolute top-0 left-0 w-full h-2 bg-classified-red" />
        <div className="absolute left-0 top-0 h-full w-1.5 bg-amber-800/10" />

        {/* Top Header metadata */}
        <div className="flex justify-between items-start border-b border-neutral-900/10 pb-5 font-mono text-[10px] text-neutral-500 uppercase tracking-widest leading-relaxed">
          <div>
            <div>DEPT: CREATIVE DIRECTIVES</div>
            <div>STATUS: ACTIVE DOSSIER</div>
          </div>
          <div className="text-right">
            <div>FILE CODE: SEC_021_SRIRAM</div>
            <div>VERIFIED DATE: 2026.06.28</div>
          </div>
        </div>

        {/* Subject Profiler Title */}
        <div className="mt-8 text-center relative">
          <div className="absolute top-0 right-0 -mr-2 sm:-mr-4 -mt-4">
            <span className="classified-stamp text-xs scale-75">TOP SECRET</span>
          </div>

          <span className="inline-block bg-classified-red text-white text-[9px] font-mono tracking-[0.2em] font-bold uppercase px-3 py-1 mb-4 rounded-sm">
            CONFIDENTIAL BRIEF
          </span>
          <h2 className="font-mono text-xs text-neutral-400 tracking-[0.3em] uppercase">CASE FILE #021</h2>
          <h1 className="font-display text-6xl sm:text-7xl text-neutral-900 tracking-wider font-bold mt-1 leading-none select-none">
            SRIRAM
          </h1>
          <p className="font-mono text-xs text-classified-red tracking-widest font-bold uppercase mt-2">
            ROLE: VIDEO EDITOR
          </p>
        </div>

        {/* Detailed Grid Stats */}
        <div className="mt-8 grid grid-cols-2 gap-4 border-t border-b border-neutral-900/15 py-5 font-mono text-xs text-neutral-800">
          <div>
            <span className="text-neutral-400 text-[10px] uppercase block mb-1">CURRENT STATUS</span>
            <span className="font-bold border border-classified-red text-classified-red px-2 py-0.5 rounded-sm bg-classified-red/5">
              ACTIVE TRAINING
            </span>
          </div>
          <div>
            <span className="text-neutral-400 text-[10px] uppercase block mb-1">COMMENCED</span>
            <span className="font-bold text-neutral-900">13 JUNE 2026</span>
          </div>
          <div className="col-span-2 mt-2">
            <span className="text-neutral-400 text-[10px] uppercase block mb-1">DELIBERATE MISSION</span>
            <span className="text-neutral-800 font-medium leading-relaxed block">
              Practicing and improving video editing pacing, animation keyframes, and sound design layers through continuous exercise. Rejecting fake credentials to showcase honest, transparent creative growth.
            </span>
          </div>
        </div>

        {/* Interactive Action Triggers */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            id="hero-open-evidence"
            onClick={() => {
              sound.playPaperRustle();
              onScrollToEvidence();
            }}
            className="w-full sm:w-auto bg-neutral-950 hover:bg-classified-red text-[#F5F1E8] font-mono text-xs font-bold tracking-widest px-6 py-4 rounded-sm flex items-center justify-center space-x-2 border border-neutral-800 cursor-pointer transition-all duration-300 shadow-md group"
          >
            <FileSearch className="w-4 h-4 text-classified-red group-hover:text-[#F5F1E8] transition-colors" />
            <span>OPEN EVIDENCE BOARD</span>
          </button>

          <button
            id="hero-contact"
            onClick={() => {
              sound.playPaperRustle();
              onScrollToContact();
            }}
            className="w-full sm:w-auto bg-transparent hover:bg-neutral-900/5 text-neutral-900 font-mono text-xs font-bold tracking-widest px-6 py-4 rounded-sm flex items-center justify-center space-x-2 border border-neutral-900/30 hover:border-neutral-900 cursor-pointer transition-all duration-300"
          >
            <Mail className="w-4 h-4" />
            <span>TRANSMIT BRIEFING</span>
          </button>
        </div>

        {/* Visual stamp on footer paper */}
        <div className="absolute bottom-4 right-6 opacity-30 pointer-events-none font-display text-4xl text-neutral-400 rotate-12 tracking-widest">
          SRIRAM_DIR021
        </div>
      </motion.div>

      {/* Down Arrow scroll helper */}
      <motion.div 
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        onClick={onScrollToEvidence}
        className="mt-12 flex flex-col items-center space-y-1 cursor-pointer text-secondary-text hover:text-white transition-colors z-20"
      >
        <span className="font-mono text-[9px] tracking-widest uppercase">SCROLL FOR DOSSIER</span>
        <ArrowDown className="w-4 h-4 text-classified-red" />
      </motion.div>
    </section>
  );
}
