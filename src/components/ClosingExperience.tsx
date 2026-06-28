import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, RefreshCw, Power } from 'lucide-react';
import { sound } from './SoundEffects';

export default function ClosingExperience() {
  const [isClosing, setIsClosing] = useState(false);
  const [step, setStep] = useState<'open' | 'closing' | 'stamped' | 'dark' | 'thankyou'>('open');

  const handleCloseCase = () => {
    if (isClosing) return;
    setIsClosing(true);
    setStep('closing');
    sound.playPaperRustle();

    // Step 2: Folder closes & Rubber Stamp drops
    setTimeout(() => {
      setStep('stamped');
      sound.playStampThump();

      // Step 3: Lamp turns off (goes dark)
      setTimeout(() => {
        setStep('dark');
        sound.playLampClick();

        // Step 4: Show elegant thank you epilogue
        setTimeout(() => {
          setStep('thankyou');
        }, 1200);

      }, 1600);

    }, 1400);
  };

  const handleReset = () => {
    sound.playLampClick();
    setStep('open');
    setIsClosing(false);
    // Reload page to start fresh
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      window.location.reload();
    }, 400);
  };

  return (
    <section className="relative min-h-[80vh] w-full py-24 px-4 bg-[#0A0A0A] z-20 overflow-hidden flex flex-col items-center justify-center">
      {/* Film grain overlay */}
      <div className="film-grain" />

      {/* Main active frame switcher */}
      <div className="w-full max-w-lg relative flex flex-col items-center justify-center min-h-[400px]">
        
        {step === 'open' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-6"
          >
            <span className="font-mono text-xs text-neutral-500 uppercase tracking-[0.25em] block">TERMINAL MASTER CONTROLS</span>
            <div className="w-12 h-0.5 bg-neutral-800 mx-auto" />
            <p className="font-mono text-xs text-secondary-text max-w-sm mx-auto leading-relaxed uppercase">
              Once you have finished examining all elements of Case File 021, engage the lock-down lever below to secure the folder and turn off the terminal.
            </p>

            <motion.button
              id="close-case-secure-btn"
              onClick={handleCloseCase}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="bg-transparent hover:bg-classified-red/10 border-2 border-classified-red text-classified-red font-mono text-xs font-bold tracking-[0.2em] px-8 py-4 rounded-sm flex items-center justify-center space-x-3 mx-auto cursor-pointer transition-all duration-300"
            >
              <Power className="w-4 h-4 animate-pulse" />
              <span>SECURE DOSSIER & SHUT DOWN</span>
            </motion.button>
          </motion.div>
        )}

        {/* Cinematic MANILA folder visual sliding back in to close! */}
        <AnimatePresence>
          {(step === 'closing' || step === 'stamped') && (
            <motion.div
              initial={{ y: 500, rotate: 15, scale: 0.8 }}
              animate={{ y: 0, rotate: -2, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 60, damping: 13 }}
              className="relative w-full max-w-md aspect-[4/3] bg-amber-100 rounded-tr-[40px] rounded-br-[15px] rounded-bl-[15px] shadow-[0_25px_60px_rgba(0,0,0,0.95)] flex flex-col justify-between p-8 border-l-[10px] border-amber-200/50 paper-texture overflow-hidden"
            >
              <div className="absolute inset-0 pointer-events-none border-r border-amber-950/5" />
              
              <div className="flex justify-between items-start font-mono text-[9px] text-amber-900/60 uppercase">
                <span>SEC_DOSS_021</span>
                <span>STATUS: RETURNING</span>
              </div>

              <div className="text-center my-auto">
                <h3 className="font-display text-4xl text-neutral-900 tracking-wide font-bold">CASE FILE #021</h3>
                <span className="font-mono text-[9px] text-classified-red uppercase tracking-widest font-bold">SUBJECT: SRIRAM</span>
              </div>

              {/* Rubber Stamp landing animation */}
              <AnimatePresence>
                {step === 'stamped' && (
                  <motion.div
                    initial={{ scale: 4, rotate: -60, opacity: 0 }}
                    animate={{ scale: 1.1, rotate: -15, opacity: 0.9 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
                    transition={{ type: 'spring', stiffness: 220, damping: 13 }}
                  >
                    <div className="border-4 border-solid border-classified-red text-classified-red font-display text-5xl tracking-[0.2em] font-bold py-3 px-6 rotate-[-12deg] bg-transparent leading-none uppercase select-none rounded-sm">
                      CASE CLOSED
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="font-mono text-[8px] text-neutral-500 text-center uppercase tracking-widest mt-auto border-t border-amber-900/10 pt-4">
                © 2026 BUREAU OF DELIBERATE PRACTICE
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ambient Darkened lamp screen transition */}
        <AnimatePresence>
          {step === 'dark' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#030303] flex items-center justify-center z-40 text-center font-mono text-[10px] text-neutral-700 uppercase tracking-widest"
            >
              <div>
                <div>TERMINAL_CONNECTION_TERMINATED</div>
                <div className="text-classified-red font-bold mt-1.5 animate-pulse">OFFLINE</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Final Epilogue Display */}
        <AnimatePresence>
          {step === 'thankyou' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 flex flex-col items-center justify-center z-50 text-center"
            >
              <h3 className="font-display text-4xl sm:text-5xl text-white tracking-widest font-bold leading-none mb-3">
                THANK YOU
              </h3>
              <p className="font-mono text-xs text-secondary-text max-w-sm uppercase tracking-widest leading-relaxed">
                Thank you for reviewing the dossier. Sriram's practice history has been compiled with zero compromises on integrity.
              </p>

              <div className="w-12 h-0.5 bg-classified-red my-6" />

              {/* Reset trigger to re-open dossier */}
              <button
                id="closing-reset-btn"
                onClick={handleReset}
                className="font-mono text-[9px] text-gold-accent hover:text-white uppercase tracking-widest flex items-center space-x-1.5 cursor-pointer border border-gold-accent/20 hover:border-white/20 px-3 py-1.5 rounded bg-black/40 transition-all"
              >
                <RefreshCw className="w-3 h-3 animate-spin-slow" />
                <span>RE-OPEN CASE FILES</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
