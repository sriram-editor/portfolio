import React from 'react';
import { motion } from 'motion/react';
import { FUTURE_MISSIONS } from '../data';
import { CheckCircle2, Lock, Unlock, FileSignature, ShieldCheck } from 'lucide-react';
import { sound } from './SoundEffects';

export default function FutureMissionsSection() {
  const handleItemHover = () => {
    sound.playPaperRustle();
  };

  return (
    <section className="relative min-h-screen w-full py-24 px-4 bg-[#080808] z-20 overflow-hidden flex flex-col items-center justify-center">
      {/* Light glow spotlight */}
      <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-96 h-96 bg-classified-red/5 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-2xl relative">
        {/* Paper Document docket sheet */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ type: 'spring', stiffness: 50, damping: 14 }}
          onHoverStart={handleItemHover}
          className="relative bg-paper text-neutral-900 px-6 sm:px-12 py-12 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-neutral-300 paper-texture overflow-hidden"
        >
          {/* Header */}
          <div className="border-b-2 border-neutral-900 pb-5 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <div className="flex items-center space-x-1.5 text-classified-red font-mono text-xs font-bold uppercase tracking-wider mb-1">
                <FileSignature className="w-3.5 h-3.5" />
                <span>TRAINING PIPELINE REPORT</span>
              </div>
              <h2 className="font-display text-4xl text-neutral-900 tracking-wide font-bold uppercase">
                FUTURE MISSIONS
              </h2>
            </div>
            
            <div className="font-mono text-[9px] text-neutral-400 mt-2 sm:mt-0 uppercase tracking-widest text-left sm:text-right">
              <div>REGISTRY: METRIC_021_PIPELINE</div>
              <div>PROTOCOLS: ENFORCED</div>
            </div>
          </div>

          <p className="font-mono text-xs text-neutral-500 uppercase tracking-wider mb-6 pb-4 border-b border-neutral-900/10 leading-relaxed">
            The ongoing roadmap consists of deconstructing complex editing formats. As milestones are satisfied, they receive formal verification tags.
          </p>

          {/* Checklist Area */}
          <div className="space-y-4">
            {FUTURE_MISSIONS.map((mission, index) => {
              return (
                <div 
                  key={mission.id}
                  className={`relative p-4 rounded-sm border transition-all duration-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 overflow-hidden ${
                    mission.completed 
                      ? 'border-neutral-200 bg-neutral-900/[0.01]' 
                      : 'border-neutral-200 bg-neutral-950/[0.02] opacity-75'
                  }`}
                >
                  {/* Left Column Content */}
                  <div className="flex items-center space-x-4 z-20">
                    <div className="shrink-0">
                      {mission.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600 fill-green-50" />
                      ) : (
                        <Lock className="w-5 h-5 text-neutral-400" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-display text-lg text-neutral-900 tracking-wide uppercase leading-tight">
                        {mission.title}
                      </h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="font-mono text-[8px] bg-neutral-900 text-[#F5F1E8] px-1.5 py-0.5 rounded-sm uppercase tracking-wider font-semibold">
                          {mission.category}
                        </span>
                        <span className="font-mono text-[8px] text-neutral-400 uppercase tracking-wider font-bold">
                          DIFFICULTY: {mission.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column Action Badge / Stamp */}
                  <div className="z-20">
                    {mission.completed ? (
                      <div className="completed-stamp text-[9px] px-1.5 py-0.5 scale-90 whitespace-nowrap -rotate-6">
                        MISSION COMPLETE
                      </div>
                    ) : (
                      <span className="font-mono text-[9px] text-neutral-400 font-bold tracking-widest uppercase border border-neutral-300 px-2 py-1 rounded-sm bg-white/40">
                        READY TO COMMENCE
                      </span>
                    )}
                  </div>

                  {/* Complete background faded tag stamp watermark */}
                  {mission.completed && (
                    <div className="absolute right-32 top-1 pointer-events-none opacity-[0.04] text-green-700 font-display text-4xl rotate-12 tracking-widest uppercase">
                      SATISFIED
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer watermark seal */}
          <div className="absolute bottom-4 left-6 opacity-35 pointer-events-none font-display text-4xl text-neutral-300 -rotate-3 tracking-widest uppercase select-none">
            021_DOCKET
          </div>
        </motion.div>
      </div>
    </section>
  );
}
