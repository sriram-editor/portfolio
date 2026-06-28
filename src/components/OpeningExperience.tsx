import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Folder, Lock, FileText, Eye } from 'lucide-react';
import { sound } from './SoundEffects';

interface OpeningExperienceProps {
  onComplete: () => void;
}

export default function OpeningExperience({ onComplete }: OpeningExperienceProps) {
  const [lampOn, setLampOn] = useState(false);
  const [lampFlickering, setLampFlickering] = useState(false);
  const [folderVisible, setFolderVisible] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Automated step timeline for cinematic feel without blocking the user
  useEffect(() => {
    // 1. Lamp flickers and clicks on after 600ms
    const timer1 = setTimeout(() => {
      setLampFlickering(true);
      sound.playLampClick();
      
      const timer2 = setTimeout(() => {
        setLampOn(true);
        setLampFlickering(false);
        
        // 2. Folder slides in after lamp is on
        const timer3 = setTimeout(() => {
          setFolderVisible(true);
          sound.playPaperRustle();
          
          // 3. Document opens automatically after 1400ms of display time
          const timer4 = setTimeout(() => {
            setIsOpening(true);
            sound.playPaperRustle();
            
            // 4. Zoom finishes and enters portfolio dossier flow
            const timer5 = setTimeout(() => {
              onComplete();
            }, 1400);

            return () => clearTimeout(timer5);
          }, 1400);

          return () => clearTimeout(timer4);
        }, 800);
        
        return () => clearTimeout(timer3);
      }, 150);

      return () => clearTimeout(timer2);
    }, 600);

    return () => clearTimeout(timer1);
  }, [onComplete]);

  const handleOpenFolder = () => {
    if (isOpening) return;
    setIsOpening(true);
    sound.playPaperRustle();
    
    setTimeout(() => {
      onComplete();
    }, 1400);
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-[#030303] overflow-hidden flex flex-col items-center justify-center z-50 select-none">
      {/* Wood Desk texture background */}
      <div 
        className="absolute inset-0 w-full h-full opacity-40 mix-blend-multiply"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 30%, rgba(139, 92, 246, 0.05) 0%, transparent 60%), 
                            repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 6px),
                            repeating-linear-gradient(90deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 6px)`,
          backgroundColor: '#0a0a0a'
        }}
      />

      {/* Desk Lamp Light Beam Overlay */}
      <AnimatePresence>
        {(lampOn || lampFlickering) && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: lampFlickering ? [0.2, 0.8, 0.3, 1] : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: 'radial-gradient(circle at 50% 25%, rgba(245, 241, 232, 0.12) 0%, rgba(212, 175, 55, 0.04) 35%, transparent 65%)'
            }}
          />
        )}
      </AnimatePresence>

      {/* Film Grain */}
      <div className="film-grain" />

      {/* Top Controls: Sound Mute & Secret Status */}
      <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-30 font-mono text-xs text-secondary-text">
        <div className="flex items-center space-x-3">
          <span className="inline-block w-2 h-2 rounded-full bg-classified-red animate-pulse" />
          <span className="tracking-widest">SYSTEM: READY_</span>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            id="toggle-opening-sound"
            onClick={() => {
              const newState = !soundEnabled;
              setSoundEnabled(newState);
              sound.toggle(newState);
              sound.playLampClick();
            }}
            className="border border-white/10 hover:border-classified-red hover:text-white px-3 py-1.5 rounded bg-black/40 backdrop-blur-sm transition-all duration-200 cursor-pointer flex items-center space-x-2"
          >
            <span>AUDIO: {soundEnabled ? 'ON' : 'OFF'}</span>
          </button>
        </div>
      </div>

      {/* Main Cinematic Table Area */}
      <div className="relative w-full max-w-4xl h-[80vh] flex items-center justify-center px-4 z-20">
        {/* Desk Lamp visual indicator top */}
        <div className="absolute top-0 flex flex-col items-center">
          <div className="w-16 h-4 bg-neutral-800 rounded-b-md border border-neutral-700/50" />
          <div className={`w-3 h-3 rounded-full transition-all duration-100 ${lampOn ? 'bg-amber-100 shadow-[0_0_15px_rgba(253,244,162,0.8)]' : 'bg-neutral-950'}`} />
        </div>

        <AnimatePresence>
          {folderVisible && (
            <motion.div
              initial={{ y: 600, x: -50, rotate: -15, opacity: 0, scale: 0.85 }}
              animate={isOpening 
                ? { scale: 1.4, rotate: 0, y: 0, opacity: 1, filter: 'blur(2px)' } 
                : { y: 0, x: 0, rotate: -3, opacity: 1, scale: 1 }
              }
              exit={{ opacity: 0, scale: 1.6, filter: 'blur(10px)', transition: { duration: 0.8, ease: 'easeIn' } }}
              transition={{ 
                type: 'spring', 
                stiffness: 70, 
                damping: 14,
                scale: { duration: 1.5, ease: [0.25, 1, 0.5, 1] },
                filter: { duration: 1.5 }
              }}
              className="relative w-full max-w-lg aspect-[4/3] bg-amber-100 rounded-tr-[40px] rounded-br-[15px] rounded-bl-[15px] shadow-[0_25px_60px_rgba(0,0,0,0.8)] flex flex-col justify-between p-8 border-l-[12px] border-amber-200/60 overflow-hidden paper-texture cursor-default"
              style={{
                boxShadow: 'inset -2px -2px 10px rgba(0,0,0,0.1), 0 30px 70px rgba(0,0,0,0.8)'
              }}
            >
              {/* Manila folder crease guidelines & realistic paper look */}
              <div className="absolute inset-0 border-r border-amber-900/10 pointer-events-none" />
              <div className="absolute left-0 top-0 bottom-0 w-3 border-r border-black/5 pointer-events-none" />

              {/* Folder Label Tape */}
              <div className="absolute -right-3 top-16 bg-[#F5F1E8] border border-neutral-300 text-neutral-800 px-8 py-2 rotate-90 origin-right text-[10px] font-mono tracking-widest uppercase shadow-sm">
                SRIRAM_DOSSIER
              </div>

              {/* Folder Header */}
              <div className="flex justify-between items-start">
                <div className="font-mono text-[11px] text-amber-900/70 space-y-1">
                  <div>DOSSIER_ID: #021</div>
                  <div>SECURITY_LEVEL: RESTRICTED</div>
                  <div>RECORD_COUNT: 05</div>
                </div>
                <div className="flex items-center space-x-1.5 border border-classified-red/40 px-2 py-1 text-classified-red rounded text-[9px] font-mono font-bold uppercase tracking-wider">
                  <Lock className="w-2.5 h-2.5" />
                  <span>CLASSIFIED</span>
                </div>
              </div>

              {/* Main Subject Information Center */}
              <div className="my-auto py-4">
                <div className="inline-block bg-neutral-900 text-[#F5F1E8] font-mono text-[9px] px-2 py-0.5 mb-2 tracking-widest uppercase rounded">
                  FEDERAL INTELLIGENCE / PERS_DIR
                </div>
                <h1 className="font-display text-5xl sm:text-6xl text-neutral-900 tracking-wide leading-none select-none">
                  CASE FILE 021
                </h1>
                
                <div className="mt-4 grid grid-cols-2 gap-4 border-t border-b border-neutral-900/15 py-3 font-mono text-xs">
                  <div>
                    <span className="text-neutral-500 block text-[10px] uppercase">Subject Name</span>
                    <span className="text-neutral-900 font-bold">SRIRAM</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block text-[10px] uppercase">Specialization</span>
                    <span className="text-neutral-900 font-bold">VIDEO EDITOR</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block text-[10px] uppercase">Initiation Date</span>
                    <span className="text-neutral-900 font-bold">13 JUNE 2026</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block text-[10px] uppercase">Active Training</span>
                    <span className="text-neutral-900 font-bold">STRICTLY HONEST</span>
                  </div>
                </div>
              </div>

              {/* Folder Footer: Big Action Button */}
              <div className="flex justify-between items-end border-t border-dashed border-neutral-900/15 pt-4">
                <div className="classified-stamp text-xs scale-75 -ml-4">
                  DO NOT DISTRIBUTE
                </div>
                
                <motion.button
                  id="open-case-file-btn"
                  onClick={handleOpenFolder}
                  whileHover={{ scale: 1.05, rotate: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-classified-red hover:bg-red-700 text-white font-mono text-xs font-bold tracking-widest px-5 py-3 rounded shadow-md flex items-center space-x-2.5 cursor-pointer transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  <span>OPENING...</span>
                </motion.button>
              </div>

              {/* Red String Tie decoration */}
              <div className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-16 border-r border-black/10 rounded-full" />
              <div className="absolute left-2.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-neutral-800" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Ambient glow hints at the bottom */}
      <div className="absolute bottom-6 font-mono text-[9px] text-neutral-600 tracking-widest uppercase">
        © 2026 BUREAU OF CREATIVE DELIBERATE PRACTICE
      </div>
    </div>
  );
}
