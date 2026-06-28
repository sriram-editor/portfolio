import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useInView } from './useInView';
import { ShieldCheck, Hourglass, Film, Crosshair, HelpCircle, Activity } from 'lucide-react';

export default function DashboardSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [projectsCount, setProjectsCount] = useState(0);
  const [hoursCount, setHoursCount] = useState(0);

  useEffect(() => {
    if (inView) {
      // Animate projects counter to 5
      let projStart = 0;
      const projInterval = setInterval(() => {
        projStart += 1;
        if (projStart >= 5) {
          setProjectsCount(5);
          clearInterval(projInterval);
        } else {
          setProjectsCount(projStart);
        }
      }, 120);

      // Animate hours counter to 80
      let hoursStart = 0;
      const hoursInterval = setInterval(() => {
        hoursStart += 2;
        if (hoursStart >= 80) {
          setHoursCount(80);
          clearInterval(hoursInterval);
        } else {
          setHoursCount(hoursStart);
        }
      }, 25);

      return () => {
        clearInterval(projInterval);
        clearInterval(hoursInterval);
      };
    }
  }, [inView]);

  return (
    <section ref={ref} className="relative min-h-[70vh] w-full py-24 px-4 bg-[#0A0A0A] z-20 overflow-hidden">
      {/* Background wireframe grids */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      <div className="max-w-5xl mx-auto">
        {/* Dashboard Title */}
        <div className="flex items-center space-x-2.5 mb-12 font-mono text-xs text-gold-accent border-b border-neutral-800 pb-4">
          <Activity className="w-4 h-4 text-classified-red animate-pulse" />
          <span className="tracking-[0.25em] font-bold uppercase">LIVE METRICS // PRACTICE INTELLIGENCE</span>
        </div>

        {/* Dashboard Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          
          {/* Mission Commenced large card */}
          <div className="md:col-span-8 bg-neutral-950/70 border border-neutral-800/80 p-6 rounded-sm backdrop-blur-md flex flex-col justify-between aspect-[2/1] md:aspect-auto">
            <div className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest flex justify-between items-center mb-4">
              <span>METRIC_NODE: INITIATION</span>
              <span className="text-green-500 font-bold flex items-center space-x-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                <span>ACTIVE</span>
              </span>
            </div>

            <div className="my-auto">
              <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest block">INITIATION DATE</span>
              <h3 className="font-display text-4xl sm:text-5xl text-white tracking-wider mt-1.5 uppercase font-semibold">
                13 JUNE 2026
              </h3>
              <p className="font-mono text-[11px] text-gold-accent mt-2 uppercase tracking-wide">
                Deliberate Skill Training Commenced • 0 Calendar Forgery Accreditations
              </p>
            </div>

            <div className="border-t border-neutral-900 pt-3 mt-4 text-[10px] font-mono text-neutral-500">
              TIME ELAPSED: STRICT TRANSPARENCY PROTOCOL ENFORCED_
            </div>
          </div>

          {/* Practice Hours Stat Card */}
          <div className="md:col-span-4 bg-neutral-950/70 border border-neutral-800/80 p-6 rounded-sm backdrop-blur-md flex flex-col justify-between aspect-square md:aspect-auto">
            <div className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest">
              METRIC_NODE: INTENSITY
            </div>

            <div className="my-auto text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-2 text-classified-red mb-1">
                <Hourglass className="w-4 h-4 animate-spin-slow" />
                <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest">DELIBERATE WORK</span>
              </div>
              <h3 className="font-display text-6xl sm:text-7xl text-white font-bold leading-none tracking-wide">
                {hoursCount}+
              </h3>
              <span className="font-mono text-[10px] text-neutral-500 uppercase block mt-2">PRACTICE HOURS LOGGED</span>
            </div>

            <div className="border-t border-neutral-900 pt-3 text-[9px] font-mono text-neutral-500">
              HOURS VERIFIED IN TIMELINE_
            </div>
          </div>

          {/* Active Projects counter card */}
          <div className="md:col-span-4 bg-neutral-950/70 border border-neutral-800/80 p-6 rounded-sm backdrop-blur-md flex flex-col justify-between aspect-square md:aspect-auto">
            <div className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest">
              METRIC_NODE: OUTPUTS
            </div>

            <div className="my-auto text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-2 text-classified-red mb-1">
                <Film className="w-4 h-4" />
                <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest">REPORTS</span>
              </div>
              <h3 className="font-display text-6xl sm:text-7xl text-white font-bold leading-none tracking-wide">
                0{projectsCount}
              </h3>
              <span className="font-mono text-[10px] text-neutral-500 uppercase block mt-2">PRACTICE RUN DOSSIERS</span>
            </div>

            <div className="border-t border-neutral-900 pt-3 text-[9px] font-mono text-neutral-500">
              CORK BOARD NODES FULL_
            </div>
          </div>

          {/* Current Focus detailed card */}
          <div className="md:col-span-8 bg-neutral-950/70 border border-neutral-800/80 p-6 rounded-sm backdrop-blur-md flex flex-col justify-between aspect-[2/1] md:aspect-auto">
            <div className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest">
              METRIC_NODE: TRAJECTORY
            </div>

            <div className="my-auto">
              <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest block">CURRENT CONTEXTUAL FOCUS</span>
              <h3 className="font-display text-3xl sm:text-4xl text-white tracking-wider mt-1.5 uppercase font-semibold">
                VIDEO EDITING TIMELINE & PACING WORKFLOWS
              </h3>
              <p className="font-mono text-[11px] text-neutral-500 mt-2 leading-relaxed uppercase">
                Studying keyframe speed curves, deconstructing modern video pacing, and practicing timeline precision inside Premiere Pro and After Effects.
              </p>
            </div>

            <div className="border-t border-neutral-900 pt-3 mt-4 flex justify-between items-center text-[9px] font-mono text-neutral-500">
              <span>AVAILABILITY: OPEN FOR COLLABORATION</span>
              <span className="text-classified-red font-bold">READY_</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
