import React, { useEffect, useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'motion/react';
import { useInView } from './useInView';
import { ShieldCheck, Calendar, GraduationCap, Target, X, ZoomIn } from 'lucide-react';
import { sound } from './SoundEffects';

export default function AboutSection() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.25 });
  const [stampActive, setStampActive] = useState(false);
  const [isEnlarged, setIsEnlarged] = useState(false);
  const [lastTap, setLastTap] = useState<number>(0);

  const handlePhotoEnlarge = () => {
    sound.playPaperRustle();
    setIsEnlarged(true);
  };

  const handlePhotoCollapse = () => {
    sound.playPaperRustle();
    setIsEnlarged(false);
  };

  const handleTouchStart = () => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;
    if (now - lastTap < DOUBLE_TAP_DELAY) {
      handlePhotoEnlarge();
    }
    setLastTap(now);
  };

  const handleModalTouchStart = () => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;
    if (now - lastTap < DOUBLE_TAP_DELAY) {
      handlePhotoCollapse();
    }
    setLastTap(now);
  };

  useEffect(() => {
    if (inView) {
      controls.start('visible');
      // Thump stamp sound slightly delayed after paper appears
      const stampTimer = setTimeout(() => {
        setStampActive(true);
        sound.playStampThump();
      }, 700);
      return () => clearTimeout(stampTimer);
    }
  }, [inView, controls]);

  return (
    <section ref={ref} className="relative min-h-screen w-full flex flex-col items-center justify-center py-20 px-4 z-20 overflow-hidden">
      {/* Absolute Decorative elements */}
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-gradient-to-l from-lavender-accent/5 to-transparent blur-3xl pointer-events-none" />

      <div className="w-full max-w-3xl relative">
        {/* Physical Metallic Paper Clip decoration */}
        <div className="absolute -top-4 left-10 z-30 pointer-events-none">
          <svg className="w-10 h-20 text-neutral-400 drop-shadow-md" viewBox="0 0 100 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M30 40V140C30 156.569 43.4315 170 60 170C76.5685 170 90 156.569 90 140V50C90 27.9086 72.0914 10 50 10C27.9086 10 10 27.9086 10 50V140C10 167.614 32.3858 190 60 190C87.6142 190 110 167.614 110 140V70" 
              stroke="currentColor" 
              strokeWidth="10" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Paper Document Container */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { y: 60, opacity: 0, rotate: -1 },
            visible: { y: 0, opacity: 1, rotate: 1 }
          }}
          transition={{ type: 'spring', stiffness: 45, damping: 12 }}
          className="relative bg-paper text-neutral-900 px-5 sm:px-14 py-8 sm:py-12 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-neutral-300 paper-texture overflow-hidden"
        >
          {/* Authentic Watermarks / Stamp lines */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-neutral-900/5 flex items-center justify-center pointer-events-none">
            <div className="text-center font-mono text-[9px] text-neutral-900/5 tracking-[0.4em] uppercase">
              BUREAU OF DELIBERATE METRICS • SEC_DIR021
            </div>
          </div>

          {/* Heading Profile Tab */}
          <div className="flex flex-col sm:flex-row justify-between items-start border-b border-neutral-900/15 pb-6">
            <div>
              <div className="flex items-center space-x-2 text-classified-red font-mono text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>SUBJECT DOSSIER PROFILER</span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl text-neutral-900 tracking-wide mt-1 leading-none">
                SUBJECT PROFILE
              </h2>
            </div>

            {/* Simulated mugshot/photo slot with double tap/click interaction */}
            <div 
              onDoubleClick={handlePhotoEnlarge}
              onTouchStart={handleTouchStart}
              className="mt-4 sm:mt-0 w-24 h-24 bg-neutral-950 border-4 border-white shadow-md rounded-sm overflow-hidden flex items-center justify-center relative rotate-3 hover:rotate-0 transition-all duration-300 cursor-zoom-in group select-none"
              title="Double Tap / Double Click to Inspect Mugshot"
            >
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200" 
                alt="SRIRAM Mock Profile Picture"
                className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 inset-x-0 bg-black/60 text-center text-[7px] font-mono text-white py-0.5 tracking-widest uppercase">
                SUBJECT_SRIRAM
              </div>
              <div className="absolute inset-0 bg-neutral-950/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <ZoomIn className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          {/* Grid Information */}
          <div className="mt-8 space-y-6 font-mono text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Mission Commenced Card */}
              <div className="flex items-start space-x-3.5 p-3.5 border border-neutral-900/10 rounded-sm bg-neutral-950/5">
                <Calendar className="w-5 h-5 text-classified-red shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-neutral-400 uppercase block leading-none">MISSION STARTED</span>
                  <span className="text-neutral-900 font-bold block mt-1.5 text-base">13 JUNE 2026</span>
                  <span className="text-[11px] text-neutral-500 block mt-1">Starting point of serious, focused skill building.</span>
                </div>
              </div>

              {/* Status Code */}
              <div className="flex items-start space-x-3.5 p-3.5 border border-neutral-900/10 rounded-sm bg-neutral-950/5">
                <GraduationCap className="w-5 h-5 text-classified-red shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-neutral-400 uppercase block leading-none">CURRENT STATUS</span>
                  <span className="text-neutral-900 font-bold block mt-1.5 text-base">PROFESSIONAL TRAINING</span>
                  <span className="text-[11px] text-neutral-500 block mt-1">Acquiring high-end pacing, effects, and audio systems.</span>
                </div>
              </div>
            </div>

            {/* Professional Objective Card */}
            <div className="flex items-start space-x-3.5 p-4 border border-neutral-900/10 rounded-sm bg-neutral-950/5">
              <Target className="w-5 h-5 text-classified-red shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] text-neutral-400 uppercase block leading-none">PRIMARY OBJECTIVE</span>
                <span className="text-neutral-900 font-bold block mt-1.5 text-base">PRACTICING & IMPROVING VIDEO EDITING</span>
                <span className="text-neutral-600 block mt-1.5 font-sans leading-relaxed text-[13px]">
                  Sriram is dedicated to learning and practicing video editing from the ground up. By deconstructing quality editing styles, studying video pacing, and understanding the core mechanics of timing and sound design, Sriram is focused on constant daily improvement. Every project and case note represents hands-on timeline practice aimed at building clean, honest editing fundamentals with complete transparency.
                </span>
              </div>
            </div>
          </div>

          {/* Core Philosophy Section */}
          <div className="mt-8 border-t border-dashed border-neutral-900/15 pt-6">
            <span className="font-mono text-[10px] text-neutral-400 uppercase block mb-2">DELIBERATE GROWTH PRINCIPLES</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="border border-neutral-200 p-3 rounded-sm">
                <span className="font-bold text-neutral-900 block font-mono">01 / HYPER-TRANSPARENCY</span>
                <p className="font-sans text-neutral-600 mt-1">No exaggerated agencies or client work. Pure practice, deep results.</p>
              </div>
              <div className="border border-neutral-200 p-3 rounded-sm">
                <span className="font-bold text-neutral-900 block font-mono">02 / SOUND FIRST</span>
                <p className="font-sans text-neutral-600 mt-1">Videos are felt before seen. Sound design is treated as a core pillar.</p>
              </div>
              <div className="border border-neutral-200 p-3 rounded-sm">
                <span className="font-bold text-neutral-900 block font-mono">03 / VIEW PSYCHOLOGY</span>
                <p className="font-sans text-neutral-600 mt-1">Designing pacing and hooks to retain focus from the very first frame.</p>
              </div>
            </div>
          </div>

          {/* Stamped VERIFIED seal animation */}
          <AnimatePresence>
            {stampActive && (
              <motion.div
                initial={{ scale: 3, rotate: -45, opacity: 0 }}
                animate={{ scale: 1, rotate: -12, opacity: 0.85 }}
                className="absolute right-12 bottom-12 z-30 pointer-events-none"
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              >
                <div className="verified-stamp">
                  VERIFIED SUBJECT
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Enlarged Mugshot Dossier Lightbox Modal */}
      <AnimatePresence>
        {isEnlarged && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handlePhotoCollapse}
            className="fixed inset-0 bg-neutral-950/85 backdrop-blur-md flex items-center justify-center p-4 z-50 cursor-zoom-out select-none"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, rotate: -1 }}
              animate={{ scale: 1, y: 0, rotate: 0 }}
              exit={{ scale: 0.9, y: 20, rotate: 1 }}
              transition={{ type: 'spring', damping: 20, stiffness: 120 }}
              onClick={(e) => e.stopPropagation()}
              onDoubleClick={handlePhotoCollapse}
              onTouchStart={handleModalTouchStart}
              className="relative max-w-sm w-full bg-[#F5F1E8] text-neutral-900 border border-neutral-300 p-6 rounded-sm shadow-[0_25px_60px_rgba(0,0,0,0.8)] paper-texture flex flex-col items-center"
            >
              {/* Folder tab accent */}
              <div className="absolute -top-3.5 left-4 bg-[#F5F1E8] border-t border-x border-neutral-300 px-4 py-0.5 text-[8px] font-mono tracking-widest text-neutral-500 uppercase rounded-t-sm">
                DETAILED_MUGSHOT_021
              </div>

              {/* Close Button */}
              <button 
                onClick={handlePhotoCollapse}
                className="absolute top-3 right-3 w-7 h-7 bg-neutral-900 text-[#F5F1E8] hover:bg-classified-red hover:text-white rounded-full flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-90"
                title="Collapse Inspection"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              {/* Photo Frame Container */}
              <div className="mt-4 w-64 h-64 bg-neutral-950 border-8 border-white shadow-lg overflow-hidden flex items-center justify-center relative">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600" 
                  alt="SRIRAM Mock Profile Picture Large"
                  className="w-full h-full object-cover filter grayscale contrast-125"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual Stamp over photo */}
                <div className="absolute -bottom-1 -left-2 bg-classified-red/20 border border-classified-red/40 text-classified-red text-[8px] font-mono font-bold px-3 py-1 -rotate-12 uppercase tracking-widest rounded-sm pointer-events-none select-none">
                  DEPT_CONFIDENTIAL
                </div>

                <div className="absolute top-2 right-2 bg-black/65 text-white text-[7px] font-mono px-2 py-0.5 rounded-sm uppercase tracking-wider select-none">
                  SEC_021
                </div>
              </div>

              {/* Detailed Dossier Metadata */}
              <div className="w-full mt-5 border-t border-dashed border-neutral-900/25 pt-4 font-mono text-[10px] space-y-2 text-neutral-800">
                <div className="flex justify-between border-b border-neutral-950/5 pb-1">
                  <span className="text-neutral-400">SUBJECT:</span>
                  <span className="font-bold text-neutral-900 text-right">SRIRAM</span>
                </div>
                <div className="flex justify-between border-b border-neutral-950/5 pb-1">
                  <span className="text-neutral-400">TRACKING_ID:</span>
                  <span className="font-bold text-neutral-900 text-right">SUB_021_SRIRAM</span>
                </div>
                <div className="flex justify-between border-b border-neutral-950/5 pb-1">
                  <span className="text-neutral-400">MUGSHOT_GRADE:</span>
                  <span className="font-bold text-neutral-900 text-right">AESTHETIC LEVEL A</span>
                </div>
                <div className="flex justify-between pb-1">
                  <span className="text-neutral-400">STATUS:</span>
                  <span className="font-bold text-classified-red text-right">VERIFIED FOR CLEARANCE</span>
                </div>
              </div>

              {/* Interaction Hint */}
              <div className="mt-4 text-center font-mono text-[8px] text-neutral-400 tracking-wider uppercase animate-pulse">
                [ DOUBLE TAP PHOTO / CLICK OUTSIDE TO CLOSE ]
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
