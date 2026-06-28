import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EVIDENCE_PROJECTS } from '../data';
import { EvidenceProject } from '../types';
import { Pin, Paperclip, Link, ZoomIn, Play, MapPin, Eye } from 'lucide-react';
import { sound } from './SoundEffects';

interface EvidenceBoardProps {
  onSelectProject: (project: EvidenceProject) => void;
}

export default function EvidenceBoard({ onSelectProject }: EvidenceBoardProps) {
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [boardLoaded, setBoardLoaded] = useState(false);

  useEffect(() => {
    // Trigger board pin drop animations
    const timer = setTimeout(() => {
      setBoardLoaded(true);
      sound.playPinDrop();
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const handleNodeHover = (nodeId: string | null) => {
    setHoveredNodeId(nodeId);
    if (nodeId !== null) {
      sound.playPinDrop();
    }
  };

  // Center node metadata
  const centerNode = {
    title: "SRIRAM (SUBJECT)",
    note: "Primary Target. Commenced Deliberate Practice June 13, 2026. Objective: Absolute Mastery.",
    coordinates: { x: 50, y: 44 }
  };

  return (
    <section className="relative min-h-screen w-full py-20 px-4 bg-[#0A0A0A] flex flex-col items-center justify-center z-20 overflow-hidden select-none">
      {/* Visual Ambient Wall spotlight */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-radial-gradient" 
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(245, 241, 232, 0.035) 0%, transparent 70%)'
        }}
      />

      {/* Board title header */}
      <div className="text-center mb-10 relative z-20">
        <span className="font-mono text-xs text-classified-red tracking-[0.3em] uppercase block mb-2">EVIDENCE FILE #021</span>
        <h2 className="font-display text-5xl sm:text-6xl text-white tracking-wider uppercase font-bold">
          EVIDENCE BOARD
        </h2>
        <p className="font-mono text-xs text-secondary-text max-w-xl mx-auto mt-4 leading-relaxed uppercase">
          Analyze and explore the connected Deliberate Practice network. Hover nodes to illuminate strings. Click dossiers to inspect investigative video reports.
        </p>
        <div className="w-16 h-1 bg-classified-red mx-auto mt-4" />
      </div>

      {/* --- DESKTOP IMERSIVE BOARD LAYER (Lg screens) --- */}
      <div className="hidden lg:block w-full max-w-6xl aspect-[1.6/1] relative bg-neutral-900 border-[16px] border-[#1e120c] rounded shadow-[0_40px_80px_rgba(0,0,0,0.95)] cork-texture overflow-hidden select-none">
        {/* Subtle Paper Clippings / Coffee Stains background elements */}
        <div className="absolute left-[35%] top-[10%] w-40 h-40 rounded-full border-[8px] border-amber-950/15 pointer-events-none rotate-12 blur-[1px]" /> {/* Coffee Stain */}
        <div className="absolute left-[70%] top-[45%] w-32 h-32 rounded-full border-[6px] border-amber-950/10 pointer-events-none -rotate-45 blur-[0.5px]" /> {/* Coffee Stain 2 */}

        {/* Vintage Hanging Tape details */}
        <div className="absolute left-[8%] top-[45%] w-14 h-4 bg-amber-100/25 border-l border-r border-amber-900/10 -rotate-12 pointer-events-none" />
        <div className="absolute right-[12%] top-[15%] w-16 h-5 bg-amber-100/20 border-l border-r border-amber-900/10 rotate-45 pointer-events-none" />

        {/* SVG Dynamic Thread Connections Container */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-20" xmlns="http://www.w3.org/2000/svg">
          {EVIDENCE_PROJECTS.map((proj) => {
            return proj.connections.map((targetId) => {
              const target = EVIDENCE_PROJECTS.find(p => p.id === targetId) || (targetId === 'center' ? centerNode : null);
              if (!target) return null;

              // Check if connection is currently highlighted (either source or target hovered)
              const isHighlighted = hoveredNodeId === proj.id || hoveredNodeId === targetId;
              const hasHoverActive = hoveredNodeId !== null;

              return (
                <motion.line
                  key={`${proj.id}-${targetId}`}
                  x1={`${proj.coordinates.x}%`}
                  y1={`${proj.coordinates.y}%`}
                  x2={`${target.coordinates.x}%`}
                  y2={`${target.coordinates.y}%`}
                  stroke={isHighlighted ? "#D62828" : hasHoverActive ? "rgba(69, 10, 10, 0.15)" : "#450A0A"}
                  strokeWidth={isHighlighted ? 4 : 2}
                  className="evidence-string"
                  initial={{ pathLength: 0 }}
                  animate={boardLoaded ? { pathLength: 1 } : { pathLength: 0 }}
                  transition={{ duration: 1.2, ease: 'easeOut', delay: 0.5 }}
                />
              );
            });
          })}
        </svg>

        {/* --- CENTER SUBJECT CARD --- */}
        <motion.div
          id="evidence-center-card"
          initial={{ scale: 0, opacity: 0 }}
          animate={boardLoaded ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 50, damping: 12, delay: 0.2 }}
          className={`absolute z-30 -translate-x-1/2 -translate-y-1/2 bg-paper text-neutral-900 p-5 rounded-sm shadow-xl border border-amber-800/20 paper-texture flex flex-col justify-between w-64 h-48 pointer-events-auto transition-opacity duration-300 ${
            hoveredNodeId && hoveredNodeId !== 'center' ? 'opacity-40' : 'opacity-100'
          }`}
          style={{ left: `${centerNode.coordinates.x}%`, top: `${centerNode.coordinates.y}%` }}
        >
          {/* Metal Paperclip visual */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 rotate-12 z-40">
            <Paperclip className="w-6 h-6 text-neutral-600" />
          </div>

          <div className="border-b border-neutral-900/15 pb-2 mb-2 font-mono text-[9px] text-neutral-400 uppercase tracking-widest flex justify-between">
            <span>TARGET_INFO</span>
            <span className="text-classified-red font-bold">SEC_021</span>
          </div>

          <div className="text-center my-auto">
            <h3 className="font-display text-2xl text-neutral-900 leading-none tracking-wide">SRIRAM</h3>
            <p className="font-mono text-[9px] text-classified-red uppercase font-bold tracking-widest mt-1">
              SUBJECT EDIT INTERN
            </p>
            <p className="font-mono text-[10px] text-neutral-600 mt-2.5 leading-normal">
              Started June 13, 2026. Deliberately practicing video editing timing, sound design, and custom pacing exercises.
            </p>
          </div>

          <div className="classified-stamp text-[9px] scale-75 leading-none mx-auto -mb-1 mt-2">
            SUBJECT SPEC_021
          </div>
        </motion.div>

        {/* --- EVIDENCE CARDS SURROUNDING CENTER --- */}
        {EVIDENCE_PROJECTS.map((proj, idx) => {
          const isHovered = hoveredNodeId === proj.id;
          const isAnotherHovered = hoveredNodeId !== null && !isHovered;

          // Determine specific graphic format to make the corkboard look organic and dynamic (varying notes, clips, polaroids)
          const isPolaroid = proj.noteType === 'polaroid';
          const isSticky = proj.noteType === 'sticky';
          const isHandwritten = proj.noteType === 'handwritten';

          return (
            <motion.div
              key={proj.id}
              id={`evidence-node-${proj.id}`}
              initial={{ scale: 0, opacity: 0, rotate: idx % 2 === 0 ? -15 : 15 }}
              animate={boardLoaded 
                ? { scale: 1, opacity: isAnotherHovered ? 0.35 : 1, rotate: isHovered ? 0 : idx % 2 === 0 ? -4 : 4 }
                : {}
              }
              transition={{ type: 'spring', stiffness: 60, damping: 12, delay: 0.3 + idx * 0.1 }}
              onHoverStart={() => handleNodeHover(proj.id)}
              onHoverEnd={() => handleNodeHover(null)}
              onClick={() => onSelectProject(proj)}
              style={{
                left: `${proj.coordinates.x}%`,
                top: `${proj.coordinates.y}%`,
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer pointer-events-auto"
            >
              {/* Push Pin SVG on top of card */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-40 drop-shadow-md">
                <svg className="w-5 h-5 text-classified-red" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 12V4C16 2.9 15.1 2 14 2H10C8.9 2 8 2.9 8 4V12C5.8 12 4 13.8 4 16H20C20 13.8 18.2 12 16 12Z" />
                  <rect x="11" y="16" width="2" height="6" />
                </svg>
              </div>

              {/* Card visual template */}
              {isPolaroid ? (
                // Polaroid Photo Look
                <div 
                  className={`bg-white text-neutral-900 p-3 pb-8 rounded-sm shadow-xl border border-neutral-200 w-44 aspect-[1/1.2] flex flex-col justify-between transition-all duration-300 ${
                    isHovered ? 'shadow-[0_20px_45px_rgba(0,0,0,0.85)] scale-105' : ''
                  }`}
                >
                  <div className="w-full h-28 bg-neutral-950 border border-neutral-300 overflow-hidden relative group">
                    <img 
                      src={proj.photoUrl} 
                      alt={proj.title}
                      className="w-full h-full object-cover filter sepia-[0.15] contrast-110"
                      referrerPolicy="no-referrer"
                    />
                    {/* Hover preview indicator overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <Play className="w-8 h-8 text-classified-red" />
                    </div>
                  </div>
                  <div className="mt-2.5">
                    <span className="font-mono text-[8px] text-neutral-400 block tracking-widest">EVID_0{idx+1}</span>
                    <span className="font-sans font-bold text-[10px] text-neutral-800 truncate block leading-tight">{proj.title}</span>
                    <span className="font-mono text-[8px] text-classified-red uppercase block leading-none mt-1 font-semibold">{proj.category}</span>
                  </div>
                </div>
              ) : isSticky ? (
                // Sticky Note Look (Yellowish paper)
                <div 
                  className={`bg-yellow-100 text-neutral-900 p-4 rounded-sm shadow-lg border-b-4 border-yellow-200/50 w-44 min-h-[140px] flex flex-col justify-between transition-all duration-300 paper-texture ${
                    isHovered ? 'shadow-[0_20px_40px_rgba(0,0,0,0.85)] scale-105' : ''
                  }`}
                  style={{ backgroundImage: 'linear-gradient(to bottom, #fefce8 0%, #fef9c3 100%)' }}
                >
                  <div>
                    <div className="font-mono text-[8px] text-yellow-800/60 uppercase tracking-wider mb-1">MEMO_CASE // 0{idx+1}</div>
                    <p className="font-sans font-bold text-[11px] text-neutral-800 leading-tight">{proj.title}</p>
                    <p className="font-mono text-[9px] text-neutral-600 mt-2 leading-relaxed italic">"{proj.note}"</p>
                  </div>
                  <div className="text-[8px] font-mono font-bold text-classified-red mt-2 flex items-center space-x-1 border-t border-yellow-300/50 pt-1.5 uppercase tracking-wider">
                    <span>STATUS: REVISE</span>
                  </div>
                </div>
              ) : (
                // Standard index paper card (handwritten / clip format)
                <div 
                  className={`bg-[#f0ece1] text-neutral-900 p-4 rounded-sm shadow-xl border border-neutral-300 w-48 min-h-[140px] flex flex-col justify-between transition-all duration-300 paper-texture ${
                    isHovered ? 'shadow-[0_20px_45px_rgba(0,0,0,0.85)] scale-105' : ''
                  }`}
                >
                  <div className="border-b border-neutral-900/10 pb-2 mb-2 font-mono text-[8px] text-neutral-400 uppercase tracking-widest flex justify-between">
                    <span>EVID_0{idx+1}</span>
                    <span>RESTRICTED</span>
                  </div>
                  <div>
                    <h4 className="font-display text-base text-neutral-900 tracking-wide uppercase leading-tight">{proj.title}</h4>
                    <p className="font-sans text-[10px] text-neutral-600 leading-tight mt-1.5">{proj.note}</p>
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-dashed border-neutral-900/15 pt-2">
                    <span className="font-mono text-[8px] text-classified-red font-bold uppercase">{proj.category}</span>
                    <span className="font-mono text-[8px] text-neutral-400 block">{proj.duration}</span>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* --- MOBILE/TABLET RESPONSIVE FEED (Lg hidden) --- */}
      <div className="lg:hidden w-full max-w-md px-4 space-y-6 z-20">
        <p className="text-center font-mono text-[10px] text-gold-accent uppercase tracking-widest mb-4">
          — PHYSICAL FEED MODE ACTIVE —
        </p>

        {EVIDENCE_PROJECTS.map((proj, idx) => {
          return (
            <motion.div
              key={proj.id}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ type: 'spring', stiffness: 60, damping: 15 }}
              onClick={() => onSelectProject(proj)}
              className="relative bg-paper text-neutral-900 p-5 rounded-sm shadow-xl border border-neutral-300 paper-texture overflow-hidden flex flex-col justify-between cursor-pointer"
            >
              {/* Paper Spine Visual Tag */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-classified-red" />

              {/* Pin Accent Header */}
              <div className="flex justify-between items-center border-b border-neutral-900/10 pb-2.5 mb-3 font-mono text-[9px] text-neutral-400 uppercase tracking-widest">
                <span>EVIDENCE_00{idx + 1}</span>
                <span className="text-classified-red font-bold">{proj.category}</span>
              </div>

              {/* Polaroid Frame within details */}
              <div className="w-full aspect-[1.5/1] bg-neutral-950 border border-neutral-300 rounded-sm overflow-hidden mb-4 relative">
                <img 
                  src={proj.photoUrl} 
                  alt={proj.title}
                  className="w-full h-full object-cover filter sepia-[0.1] contrast-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-3 right-3 bg-neutral-950/85 border border-white/10 px-2 py-1 text-white text-[9px] rounded font-mono uppercase flex items-center space-x-1">
                  <Play className="w-2.5 h-2.5 text-classified-red fill-classified-red" />
                  <span>PREVIEW REPORT</span>
                </div>
              </div>

              {/* Text content */}
              <h3 className="font-display text-2xl text-neutral-900 tracking-wide uppercase leading-tight">
                {proj.title}
              </h3>
              <p className="font-sans text-xs text-neutral-600 mt-2 leading-relaxed italic">
                "{proj.note}"
              </p>

              {/* Connections label */}
              <div className="mt-4 border-t border-dashed border-neutral-900/15 pt-3.5 flex flex-wrap gap-2 items-center font-mono text-[9px] text-neutral-400 uppercase tracking-wider">
                <span>RELATED EVIDENCE:</span>
                {proj.connections.map(cId => {
                  const label = cId === 'center' ? 'RAM' : cId.replace('evidence-', '00');
                  return (
                    <span key={cId} className="bg-neutral-950 text-[#F5F1E8] px-1.5 py-0.5 rounded-sm font-bold text-[8px]">
                      #{label}
                    </span>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
