import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EvidenceProject } from '../types';
import { sound } from './SoundEffects';
import { 
  X, ChevronLeft, ChevronRight, Play, Pause, 
  Settings, Award, Film, ClipboardList, PenTool, 
  Activity, ArrowRight, ShieldCheck, CheckSquare, EyeOff
} from 'lucide-react';

interface ProjectReportModalProps {
  project: EvidenceProject;
  allProjects: EvidenceProject[];
  onClose: () => void;
  onNavigateToProject: (project: EvidenceProject) => void;
}

export default function ProjectReportModal({ 
  project, 
  allProjects, 
  onClose, 
  onNavigateToProject 
}: ProjectReportModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showFinishedCut, setShowFinishedCut] = useState(true); // Before & After state
  const [videoProgress, setVideoProgress] = useState(35); // Simulated slider state

  useEffect(() => {
    // Play unfolding sound on mount
    sound.playPaperRustle();
    
    // Auto reset video play states when switching dossier
    setIsPlaying(false);
    setVideoProgress(20);
  }, [project]);

  // Navigate to next or previous case report
  const handleNextProject = () => {
    const currentIdx = allProjects.findIndex(p => p.id === project.id);
    const nextIdx = (currentIdx + 1) % allProjects.length;
    onNavigateToProject(allProjects[nextIdx]);
  };

  const handlePrevProject = () => {
    const currentIdx = allProjects.findIndex(p => p.id === project.id);
    const prevIdx = (currentIdx - 1 + allProjects.length) % allProjects.length;
    onNavigateToProject(allProjects[prevIdx]);
  };

  const toggleVideoPlay = () => {
    setIsPlaying(!isPlaying);
    sound.playLampClick();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 w-full h-full bg-[#030303]/95 z-50 overflow-y-auto px-4 py-8 md:py-12 flex justify-center backdrop-blur-md"
    >
      <div className="w-full max-w-4xl relative">
        {/* Floating Top Bar Control */}
        <div className="absolute -top-4 sm:-top-8 left-0 right-0 flex justify-between items-center px-2 font-mono text-[10px] text-secondary-text z-50">
          <button 
            id="modal-close-header"
            onClick={onClose}
            className="flex items-center space-x-2 border border-white/10 hover:border-classified-red bg-neutral-950 px-3 py-1.5 rounded text-white cursor-pointer transition-colors"
          >
            <X className="w-3 h-3 text-classified-red" />
            <span>CLOSE REPORT [ESC]</span>
          </button>

          <div className="flex items-center space-x-2">
            <span className="inline-block w-2 h-2 rounded-full bg-classified-red animate-pulse" />
            <span>REPORT FILE // SEC_{project.id.toUpperCase().replace('-', '_')}</span>
          </div>
        </div>

        {/* Dossier Document Sheet */}
        <motion.div
          initial={{ y: 80, scale: 0.95, rotate: -0.5 }}
          animate={{ y: 0, scale: 1, rotate: 0 }}
          exit={{ y: 80, scale: 0.95, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 55, damping: 13 }}
          className="relative bg-paper text-neutral-900 rounded-sm shadow-[0_35px_80px_rgba(0,0,0,0.95)] border border-neutral-300 px-6 sm:px-12 py-10 sm:py-14 paper-texture overflow-hidden"
        >
          {/* Watermark File ID in background */}
          <div className="absolute right-6 top-24 opacity-[0.05] pointer-events-none font-display text-8xl text-neutral-900 rotate-12 select-none uppercase">
            {project.id.replace('evidence-', 'CASE_')}
          </div>

          {/* Paper spine marker */}
          <div className="absolute left-0 top-0 h-full w-2 bg-classified-red" />
          <div className="absolute left-2 top-0 h-full w-1 border-r border-black/5" />

          {/* Header section with dossier details */}
          <div className="flex flex-col sm:flex-row justify-between items-start border-b-2 border-neutral-900 pb-6 mb-8 font-mono text-xs">
            <div>
              <div className="flex items-center space-x-1.5 text-classified-red font-bold uppercase tracking-wider mb-1.5 text-[10px]">
                <ShieldCheck className="w-4 h-4" />
                <span>CONFIDENTIAL INVESTIGATION REPORT</span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl text-neutral-900 tracking-wide leading-none uppercase">
                {project.title}
              </h1>
              <p className="text-neutral-500 font-bold uppercase tracking-wider mt-1">{project.category}</p>
            </div>

            <div className="mt-4 sm:mt-0 text-left sm:text-right space-y-1 text-neutral-500 text-[10px] tracking-widest uppercase border-t sm:border-t-0 sm:border-l border-neutral-900/10 pt-4 sm:pt-0 sm:pl-6">
              <div>DOSSIER LEVEL: SECRET</div>
              <div>DURATION: {project.duration}</div>
              <div>STATUS: <span className="text-classified-red font-bold">VERIFIED_PRACTICE</span></div>
            </div>
          </div>

          {/* MAIN COLUMN SPLIT */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT COLUMN: Narrative & Details (Dossier text) */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Mission & Objective Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border border-neutral-200 p-4 rounded-sm bg-neutral-900/[0.02]">
                  <div className="flex items-center space-x-1.5 text-neutral-400 font-mono text-[10px] uppercase tracking-wider font-bold mb-1.5">
                    <ClipboardList className="w-3.5 h-3.5 text-classified-red" />
                    <span>01 // THE MISSION</span>
                  </div>
                  <p className="font-sans text-[12px] text-neutral-700 leading-relaxed font-medium">
                    {project.mission}
                  </p>
                </div>

                <div className="border border-neutral-200 p-4 rounded-sm bg-neutral-900/[0.02]">
                  <div className="flex items-center space-x-1.5 text-neutral-400 font-mono text-[10px] uppercase tracking-wider font-bold mb-1.5">
                    <Award className="w-3.5 h-3.5 text-classified-red" />
                    <span>02 // THE OBJECTIVE</span>
                  </div>
                  <p className="font-sans text-[12px] text-neutral-700 leading-relaxed font-medium">
                    {project.objective}
                  </p>
                </div>
              </div>

              {/* Editing process timeline notes */}
              <div className="border-t border-b border-dashed border-neutral-900/15 py-6">
                <h3 className="font-mono text-xs text-neutral-400 tracking-widest uppercase mb-4 flex items-center space-x-2">
                  <Activity className="w-3.5 h-3.5 text-classified-red" />
                  <span>03 // CONSTRUCTIVE METHODOLOGY</span>
                </h3>
                <ul className="space-y-4 font-sans text-xs text-neutral-700">
                  {project.process.map((step, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <span className="font-mono text-[10px] text-classified-red font-bold bg-classified-red/10 px-1.5 py-0.5 rounded-sm mt-0.5">
                        STAGE 0{idx + 1}
                      </span>
                      <span className="leading-relaxed font-medium">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tools and Skills grids */}
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-neutral-200 p-4 rounded-sm">
                  <span className="font-mono text-[10px] text-neutral-400 block uppercase tracking-wider font-bold mb-2">
                    TECHNOLOGY STACK
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.toolsUsed.map(tool => (
                      <span key={tool} className="bg-neutral-900 text-white font-mono text-[9px] font-semibold uppercase px-2 py-0.5 rounded-sm shadow-sm">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border border-neutral-200 p-4 rounded-sm">
                  <span className="font-mono text-[10px] text-neutral-400 block uppercase tracking-wider font-bold mb-2">
                    SKILLS REINFORCED
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.skillsLearned.map(skill => (
                      <span key={skill} className="bg-classified-red/15 text-classified-red border border-classified-red/20 font-mono text-[9px] font-bold uppercase px-2 py-0.5 rounded-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Interactive Video Lab & Before/After */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* VIDEO DECK SECTION */}
              <div className="bg-neutral-950 p-4 rounded-sm shadow-lg border border-neutral-800 text-white flex flex-col justify-between aspect-[1.3/1] overflow-hidden relative">
                
                {/* Header labels */}
                <div className="flex justify-between items-center font-mono text-[8px] text-neutral-500 uppercase tracking-widest mb-2 border-b border-neutral-900 pb-2">
                  <span>VIDEO DECK // RAW_FEED</span>
                  <span className="text-classified-red flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-classified-red animate-pulse" />
                    <span>PLAYBACK_ACTIVE</span>
                  </span>
                </div>

                {/* Simulated playback frame */}
                <div className="w-full h-32 bg-neutral-900 rounded-sm border border-neutral-800 overflow-hidden relative flex items-center justify-center">
                  <img 
                    src={project.photoUrl} 
                    alt={project.title}
                    className="w-full h-full object-cover opacity-60 filter grayscale"
                    referrerPolicy="no-referrer"
                  />

                  {/* Active playing animation state */}
                  {isPlaying ? (
                    <div className="absolute inset-0 bg-neutral-900/40 flex flex-col items-center justify-center">
                      <div className="flex space-x-1.5 items-end h-8">
                        <span className="w-1 bg-classified-red h-4 animate-[bounce_0.8s_infinite]" />
                        <span className="w-1 bg-classified-red h-7 animate-[bounce_1s_infinite_0.1s]" />
                        <span className="w-1 bg-classified-red h-5 animate-[bounce_0.6s_infinite_0.2s]" />
                        <span className="w-1 bg-classified-red h-8 animate-[bounce_0.9s_infinite_0.3s]" />
                      </div>
                      <span className="font-mono text-[8px] text-neutral-300 uppercase tracking-widest mt-2">STREAMING DELIBERATE PRACTICE RUN_</span>
                    </div>
                  ) : (
                    <button 
                      id="play-report-video-btn"
                      onClick={toggleVideoPlay}
                      className="absolute w-12 h-12 bg-neutral-950 hover:bg-classified-red text-[#F5F1E8] rounded-full border border-neutral-800 flex items-center justify-center cursor-pointer shadow-lg transition-transform hover:scale-105"
                    >
                      <Play className="w-5 h-5 ml-0.5 fill-[#F5F1E8]" />
                    </button>
                  )}
                </div>

                {/* Interactive Deck Controls */}
                <div className="mt-4 font-mono text-[9px] text-neutral-400 space-y-2">
                  <div className="flex justify-between items-center">
                    <span>FRAME: 021_C_0{videoProgress}</span>
                    <span>FPS: 60.00</span>
                  </div>

                  {/* Seekbar scrub slider */}
                  <div className="w-full h-1 bg-neutral-800 rounded-full cursor-pointer relative overflow-hidden"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const pct = Math.round((x / rect.width) * 100);
                      setVideoProgress(pct);
                      sound.playPinDrop();
                    }}
                  >
                    <div className="h-full bg-classified-red" style={{ width: `${videoProgress}%` }} />
                  </div>

                  <div className="flex justify-between items-center pt-1 border-t border-neutral-900">
                    <button onClick={toggleVideoPlay} className="hover:text-white cursor-pointer uppercase flex items-center space-x-1.5">
                      {isPlaying ? <Pause className="w-3 h-3 text-classified-red" /> : <Play className="w-3 h-3 text-classified-red" />}
                      <span>{isPlaying ? 'PAUSE' : 'PLAY'}</span>
                    </button>
                    <span>TIMECODE: 00:00:{videoProgress < 10 ? `0${videoProgress}` : videoProgress}</span>
                  </div>
                </div>
              </div>

              {/* BEFORE & AFTER EXPERIMENT DECK */}
              <div className="border border-neutral-200 p-4 rounded-sm bg-neutral-900/[0.01]">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider font-bold">
                    BEFORE vs AFTER COMPARE
                  </span>
                  {/* Switch toggle Button */}
                  <button
                    id="toggle-before-after"
                    onClick={() => {
                      setShowFinishedCut(!showFinishedCut);
                      sound.playPaperRustle();
                    }}
                    className="border border-neutral-400 hover:border-classified-red bg-white text-neutral-800 font-mono text-[8px] font-semibold tracking-wider uppercase px-2 py-1 rounded-sm cursor-pointer shadow-sm flex items-center space-x-1 transition-all"
                  >
                    <span>VIEW: {showFinishedCut ? 'EDITED CUT' : 'RAW OUTTAKES'}</span>
                  </button>
                </div>

                {/* Compare text cards */}
                <div className="p-3 bg-neutral-950 text-[#F5F1E8] rounded-sm font-mono text-[11px] min-h-[60px] border border-neutral-800 flex items-start space-x-2">
                  <div className={`text-[8px] px-1.5 py-0.5 rounded-sm font-bold uppercase ${
                    showFinishedCut ? 'bg-classified-red text-white' : 'bg-neutral-800 text-neutral-400'
                  }`}>
                    {showFinishedCut ? 'FINISHED' : 'ORIGINAL'}
                  </div>
                  <p className="leading-relaxed font-medium">
                    {showFinishedCut ? project.beforeAfter.after : project.beforeAfter.before}
                  </p>
                </div>
              </div>

              {/* LESSONS LEARNED NOTES */}
              <div className="bg-[#FAF8F5] border border-neutral-300 p-4 rounded-sm relative">
                {/* Vintage typewriter paper look */}
                <span className="font-mono text-[10px] text-neutral-400 block uppercase tracking-wider font-bold mb-1 border-b border-neutral-200 pb-1.5">
                  CRITICAL ASSESSMENT LESSONS
                </span>
                <p className="font-serif text-neutral-700 text-xs italic leading-relaxed mt-2.5">
                  "{project.lessonsLearned}"
                </p>
              </div>

            </div>

          </div>

          {/* Dossier footer / Signature stamp */}
          <div className="mt-12 pt-6 border-t-2 border-neutral-900 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest">
              END OF REPORT // CASE FILE 021_EDIT
            </div>
            <div className="verified-stamp text-[11px] scale-90 -rotate-3 leading-none">
              VERIFIED VIDEO_EDIT
            </div>
          </div>
        </motion.div>

        {/* --- INTERACTIVE CASE-STUDY NARRATIVE NAVIGATOR --- */}
        <div className="mt-6 flex justify-between items-center px-4 font-mono text-xs">
          <button
            id="modal-prev-dossier"
            onClick={handlePrevProject}
            className="flex items-center space-x-2 border border-white/10 hover:border-classified-red hover:text-white px-4 py-2.5 rounded bg-black/50 text-secondary-text cursor-pointer transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-classified-red" />
            <span>PREV CASE REPORT</span>
          </button>

          <button
            id="modal-next-dossier"
            onClick={handleNextProject}
            className="flex items-center space-x-2 border border-white/10 hover:border-classified-red hover:text-white px-4 py-2.5 rounded bg-black/50 text-secondary-text cursor-pointer transition-colors"
          >
            <span>NEXT CASE REPORT</span>
            <ChevronRight className="w-4 h-4 text-classified-red" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
