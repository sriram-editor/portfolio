import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SKILL_ITEMS } from '../data';
import { Star, ShieldAlert, Cpu } from 'lucide-react';
import { sound } from './SoundEffects';

export default function SkillsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleCardHover = (index: number | null) => {
    setHoveredIndex(index);
    if (index !== null) {
      sound.playPaperRustle();
    }
  };

  return (
    <section className="relative min-h-screen w-full py-24 px-4 bg-[#080808] z-20 overflow-hidden">
      {/* Dynamic light cone overlay */}
      <div className="absolute right-1/4 top-1/4 w-96 h-96 bg-gold-accent/5 blur-[140px] pointer-events-none" />

      {/* Grid Header */}
      <div className="text-center mb-16 relative">
        <span className="font-mono text-xs text-gold-accent tracking-[0.3em] uppercase block mb-2">SYSTEM PARAMETERS</span>
        <h2 className="font-display text-5xl sm:text-6xl text-white tracking-wider uppercase font-bold">
          ACQUIRED SKILLS
        </h2>
        <p className="font-mono text-xs text-secondary-text max-w-lg mx-auto mt-4 leading-relaxed uppercase">
          Each capability is developed through structured practice and reference study of modern editing techniques.
        </p>
        <div className="w-16 h-1 bg-gold-accent mx-auto mt-6" />
      </div>

      {/* Grid Area */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {SKILL_ITEMS.map((skill, index) => {
          const isHovered = hoveredIndex === index;

          return (
            <motion.div
              key={index}
              id={`skill-card-${index}`}
              onHoverStart={() => handleCardHover(index)}
              onHoverEnd={() => handleCardHover(null)}
              whileHover={{ 
                y: -10, 
                rotate: index % 2 === 0 ? 1.5 : -1.5,
                scale: 1.02,
                boxShadow: '0 25px 50px rgba(0,0,0,0.8)'
              }}
              className="relative bg-paper text-neutral-900 p-6 aspect-[5/4] sm:aspect-[4/3] lg:aspect-[5/4.5] rounded-sm border border-neutral-300 shadow-xl paper-texture cursor-default flex flex-col justify-between overflow-hidden"
              style={{
                transform: `rotate(${index % 2 === 0 ? -0.8 : 0.8}deg)`
              }}
              transition={{ type: 'spring', stiffness: 120, damping: 14 }}
            >
              {/* Paper line pattern background */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-repeat" 
                style={{
                  backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
                  backgroundSize: '16px 16px'
                }}
              />

              {/* Header tags */}
              <div className="flex justify-between items-start border-b border-neutral-900/10 pb-3 mb-2">
                <div className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest">
                  INDEX: SKL_0{index + 1}
                </div>
                <div className="flex items-center space-x-1 border border-gold-accent/40 px-1.5 py-0.5 rounded-sm text-gold-accent font-mono text-[8px] tracking-wide font-bold uppercase">
                  <Cpu className="w-2.5 h-2.5" />
                  <span>{skill.category}</span>
                </div>
              </div>

              {/* Main Skill Content */}
              <div>
                <h3 className="font-display text-2xl text-neutral-900 leading-none tracking-wide uppercase">
                  {skill.name}
                </h3>
                <p className="font-sans text-[11px] text-neutral-600 mt-2 leading-relaxed">
                  {skill.description}
                </p>
              </div>

              {/* Skill Proficiency Level Bar */}
              <div className="mt-4 border-t border-dashed border-neutral-900/10 pt-4">
                <div className="flex justify-between items-center font-mono text-[9px] text-neutral-500 font-semibold mb-1.5">
                  <span>METRIC VELOCITY</span>
                  <span className="text-classified-red font-bold">{skill.level}</span>
                </div>
                <div className="w-full h-1 bg-neutral-900/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: skill.level }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: 'easeOut', delay: index * 0.05 }}
                    className="h-full bg-classified-red"
                  />
                </div>
              </div>

              {/* Verified Stamp watermark always present at the corner of card */}
              <div className="absolute right-2 top-10 pointer-events-none opacity-[0.12] -rotate-12 border-2 border-classified-red text-classified-red font-mono text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-sm">
                VERIFIED
              </div>

              {/* Hover Glow string effect */}
              {isHovered && (
                <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-classified-red to-transparent" />
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
