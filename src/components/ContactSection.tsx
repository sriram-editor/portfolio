import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'motion/react';
import { useInView } from './useInView';
import { sound } from './SoundEffects';
import { Mail, Linkedin, FileText, Send, Terminal, Instagram, Youtube } from 'lucide-react';

export default function ContactSection() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [typedText, setTypedText] = useState('');
  
  const fullMessage = "LOOKING FOR A DEDICATED EDITOR FOCUSED ON STORYTELLING, PRECISION, AND CONTINUOUS IMPROVEMENT? LET'S CREATE SOMETHING UNFORGETTABLE. MISSION BRIEF IS COMPILED AND READY FOR TRANSMISSION.";

  useEffect(() => {
    if (inView) {
      controls.start('visible');
      sound.playPaperRustle();

      // Custom high-fidelity typewriter typing effect
      let currentIdx = 0;
      const interval = setInterval(() => {
        setTypedText(fullMessage.substring(0, currentIdx + 1));
        currentIdx++;
        
        // Random keyboard tapping / click sounds at intervals for realism!
        if (currentIdx % 4 === 0) {
          sound.playPinDrop();
        }

        if (currentIdx >= fullMessage.length) {
          clearInterval(interval);
        }
      }, 35);

      return () => clearInterval(interval);
    }
  }, [inView, controls]);

  const handleActionClick = () => {
    sound.playLampClick();
  };

  return (
    <section ref={ref} className="relative min-h-screen w-full py-24 px-4 bg-[#0A0A0A] flex flex-col items-center justify-center z-20 overflow-hidden">
      {/* Heavy lamp glare overlay */}
      <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-amber-400/[0.015] to-transparent pointer-events-none" />

      <div className="w-full max-w-3xl relative">
        
        {/* Main Typed Dispatch Sheet */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { y: 60, opacity: 0 },
            visible: { y: 0, opacity: 1 }
          }}
          transition={{ type: 'spring', stiffness: 50, damping: 13 }}
          className="relative bg-paper text-neutral-900 px-6 sm:px-14 py-12 rounded-sm shadow-[0_30px_70px_rgba(0,0,0,0.9)] border border-neutral-300 paper-texture overflow-hidden"
        >
          {/* Paper creasing overlays */}
          <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-black/5 to-transparent pointer-events-none" />
          <div className="absolute left-0 top-0 h-full w-2 bg-classified-red" />

          {/* Header */}
          <div className="border-b border-neutral-900/15 pb-5 mb-8 flex justify-between items-start font-mono text-xs text-neutral-400 uppercase tracking-widest leading-relaxed">
            <div>
              <div>DISPATCH: COMM_OUT_021</div>
              <div>ENCRYPTION: SECURE_CH</div>
            </div>
            <div className="text-right">
              <div>SUBJECT: SRIRAM_CONTACT</div>
              <div>LEVEL: FINAL_BRIEF</div>
            </div>
          </div>

          {/* Title Area */}
          <div className="mb-8">
            <span className="inline-block bg-neutral-900 text-white font-mono text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-sm mb-2.5">
              FINAL BRIEFING
            </span>
            <h2 className="font-display text-4xl sm:text-5xl text-neutral-900 tracking-wide font-bold uppercase">
              CASE CLOSED?
            </h2>
          </div>

          {/* Custom typewriter body area */}
          <div className="min-h-[120px] font-mono text-xs sm:text-sm text-neutral-800 leading-relaxed border-t border-b border-neutral-900/10 py-6 my-6 bg-neutral-950/[0.01]">
            <div className="flex items-start space-x-2.5">
              <Terminal className="w-4 h-4 text-classified-red mt-1 shrink-0" />
              <p className="typewriter-cursor">
                {typedText}
              </p>
            </div>
          </div>

          {/* Contact action triggers formatted as small dossier tags */}
          <div className="mt-10 flex flex-col gap-4">
            
            {/* HIRE DIRECT ACTION */}
            <a
              href="mailto:freefiremax1311a@gmail.com?subject=Case%20File%20021%20-%20Video%20Editing%20Briefing"
              onClick={handleActionClick}
              className="bg-neutral-950 hover:bg-classified-red text-[#F5F1E8] p-4 rounded-sm border border-neutral-800 flex items-center justify-center space-x-2.5 cursor-pointer shadow-md hover:shadow-xl transition-all font-mono text-xs font-bold tracking-widest uppercase group"
            >
              <Send className="w-4 h-4 text-classified-red group-hover:text-white transition-colors" />
              <span>TRANSMIT RECRUITMENT BRIEFING</span>
            </a>

            {/* Icon Network Row */}
            <div className="bg-white p-3.5 rounded-sm border border-neutral-300 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-sm">
              <span className="font-mono text-neutral-400 text-[10px] uppercase font-bold tracking-wider">
                SECURE_NETWORKS_
              </span>
              <div className="flex items-center gap-3">
                {/* Email Icon */}
                <a
                  href="mailto:freefiremax1311a@gmail.com"
                  onClick={handleActionClick}
                  className="w-10 h-10 rounded-sm border border-neutral-300 bg-[#F5F1E8]/40 hover:bg-neutral-900 hover:text-white flex items-center justify-center text-neutral-800 transition-all shadow-sm active:scale-95 group"
                  title="Send Direct Email"
                >
                  <Mail className="w-4 h-4 text-classified-red group-hover:text-[#F5F1E8] transition-colors" />
                </a>

                {/* LinkedIn Icon */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleActionClick}
                  className="w-10 h-10 rounded-sm border border-neutral-300 bg-[#F5F1E8]/40 hover:bg-neutral-900 hover:text-white flex items-center justify-center text-neutral-800 transition-all shadow-sm active:scale-95 group"
                  title="Connect on LinkedIn"
                >
                  <Linkedin className="w-4 h-4 text-classified-red group-hover:text-[#F5F1E8] transition-colors" />
                </a>

                {/* Instagram Icon */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleActionClick}
                  className="w-10 h-10 rounded-sm border border-neutral-300 bg-[#F5F1E8]/40 hover:bg-neutral-900 hover:text-white flex items-center justify-center text-neutral-800 transition-all shadow-sm active:scale-95 group"
                  title="Follow on Instagram"
                >
                  <Instagram className="w-4 h-4 text-classified-red group-hover:text-[#F5F1E8] transition-colors" />
                </a>

                {/* YouTube Icon */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleActionClick}
                  className="w-10 h-10 rounded-sm border border-neutral-300 bg-[#F5F1E8]/40 hover:bg-neutral-900 hover:text-white flex items-center justify-center text-neutral-800 transition-all shadow-sm active:scale-95 group"
                  title="View YouTube Channel"
                >
                  <Youtube className="w-4 h-4 text-classified-red group-hover:text-[#F5F1E8] transition-colors" />
                </a>
              </div>
            </div>

            {/* Resume File (Aesthetic or real) */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleActionClick();
                sound.playPaperRustle();
                alert("Dossier Resume download action compiled! Secure PDF package will be made available shortly.");
              }}
              className="bg-white hover:bg-neutral-900/5 text-neutral-900 p-3.5 rounded-sm border border-neutral-300 flex items-center justify-between cursor-pointer shadow-sm hover:shadow transition-all font-mono text-xs font-semibold uppercase"
            >
              <span className="text-neutral-400 text-[10px]">RESUME_PDF_</span>
              <div className="flex items-center space-x-1.5 text-neutral-900">
                <FileText className="w-3.5 h-3.5 text-classified-red" />
                <span>ACQUIRE DOSSIER SUMMARY</span>
              </div>
            </a>

          </div>

          {/* Footer watermarks */}
          <div className="mt-12 flex justify-between items-center text-neutral-400 font-mono text-[9px] tracking-widest uppercase border-t border-dashed border-neutral-900/15 pt-5">
            <span>FILE REFS: SEC_SRIRAM_COMM_OK</span>
            <span className="classified-stamp text-[10px] scale-75 -mr-4">READY FOR CONTACT</span>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
