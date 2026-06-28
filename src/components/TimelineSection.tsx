import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'motion/react';
import { TIMELINE_EVENTS } from '../data';
import { CheckCircle2, ShieldCheck } from 'lucide-react';
import { sound } from './SoundEffects';

export default function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stampedNodes, setStampedNodes] = useState<Record<number, boolean>>({});

  // Use framer-motion scroll mapping to draw the vertical red investigation thread!
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center']
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 18,
    restDelta: 0.001
  });

  // Track intersection of timeline events to stamp them!
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const nodes = containerRef.current.querySelectorAll('.timeline-node');
      const updated: Record<number, boolean> = { ...stampedNodes };
      let changed = false;

      nodes.forEach((node, idx) => {
        const rect = node.getBoundingClientRect();
        // Node entered top half of viewport
        if (rect.top < window.innerHeight * 0.7 && !stampedNodes[idx]) {
          updated[idx] = true;
          changed = true;
          sound.playStampThump();
        }
      });

      if (changed) {
        setStampedNodes(updated);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [stampedNodes]);

  return (
    <section ref={containerRef} className="relative min-h-screen w-full py-24 px-4 bg-bg-dark text-[#FFFFFF] z-20 overflow-hidden">
      {/* Background radial spotlight */}
      <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-96 h-96 bg-classified-red/5 blur-[120px] pointer-events-none" />

      {/* Title */}
      <div className="text-center mb-16 relative">
        <span className="font-mono text-xs text-classified-red tracking-[0.3em] uppercase block mb-2">PROGRESSIVE TIMELINE</span>
        <h2 className="font-display text-5xl sm:text-6xl text-white tracking-wider uppercase font-bold">
          INVESTIGATION TIMELINE
        </h2>
        <div className="w-16 h-1 bg-classified-red mx-auto mt-4" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4">
        {/* Dynamic Red Connection String / Yarn Line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 pointer-events-none">
          {/* Background mute track */}
          <div className="w-full h-full bg-neutral-800" />
          {/* Animated active yarn thread */}
          <motion.div
            style={{ height: useTransform(pathLength, [0, 1], ['0%', '100%']) }}
            className="absolute top-0 left-0 w-full bg-classified-red origin-top shadow-[0_0_8px_#D62828]"
          />
        </div>

        {/* Timeline checkpoints */}
        <div className="space-y-12">
          {TIMELINE_EVENTS.map((event, index) => {
            const isStamped = stampedNodes[index];
            const isLeft = index % 2 === 0;

            return (
              <div 
                key={index} 
                className={`timeline-node relative flex flex-col md:flex-row items-start ${
                  isLeft ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Spacer block on desktop to hold alternate items */}
                <div className="hidden md:block w-1/2 px-12" />

                {/* Pin Point Center Bullet */}
                <div className="absolute left-6 md:left-1/2 top-1.5 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-bg-dark bg-neutral-800 z-30 transition-all duration-300">
                  <div className={`w-1.5 h-1.5 rounded-full mx-auto my-auto mt-0.5 ${isStamped ? 'bg-classified-red shadow-[0_0_8px_rgba(214,40,40,0.8)] scale-125' : 'bg-neutral-600'}`} />
                </div>

                {/* Content Dossier Block */}
                <div className="w-full md:w-1/2 px-1.5 sm:px-12 pl-12 md:pl-12">
                  <motion.div
                    initial={{ opacity: 0, x: isLeft ? 40 : -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ type: 'spring', stiffness: 50, damping: 15 }}
                    className="relative bg-paper text-neutral-900 p-6 rounded-sm shadow-xl border border-neutral-300 paper-texture overflow-hidden group hover:shadow-2xl transition-all"
                  >
                    {/* Folded paper aesthetic tab */}
                    <div className="absolute right-0 top-0 w-4 h-4 bg-neutral-300 border-l border-b border-neutral-400 group-hover:bg-classified-red transition-colors" />

                    {/* Metadata line */}
                    <div className="flex justify-between items-center font-mono text-[9px] text-neutral-400 uppercase tracking-widest border-b border-neutral-900/10 pb-2 mb-3">
                      <span>CHKP_NODE // 0{index + 1}</span>
                      <span className="text-classified-red font-bold">{event.date}</span>
                    </div>

                    <h3 className="font-display text-2xl text-neutral-900 tracking-wide">
                      {event.title}
                    </h3>
                    <p className="font-mono text-xs text-classified-red uppercase tracking-wider font-bold mt-0.5">
                      {event.description}
                    </p>
                    <p className="font-sans text-xs text-neutral-600 mt-2.5 leading-relaxed">
                      {event.details}
                    </p>

                    {/* Verified Stamp dropping into place */}
                    <AnimatePresence>
                      {isStamped && (
                        <motion.div
                          initial={{ scale: 2.2, rotate: -40, opacity: 0 }}
                          animate={{ scale: 1, rotate: -8, opacity: 0.85 }}
                          className="absolute right-4 bottom-4 pointer-events-none z-30 scale-75 origin-bottom-right"
                          transition={{ type: 'spring', stiffness: 220, damping: 14 }}
                        >
                          <div className="completed-stamp">
                            VERIFIED
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
