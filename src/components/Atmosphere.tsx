import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Lightbulb, Zap, Moon } from 'lucide-react';
import { sound } from './SoundEffects';

export default function Atmosphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [soundOn, setSoundOn] = useState(true);
  
  // Three elegant lighting states: 'off' | 'soft' | 'cozy'
  const [lampMode, setLampMode] = useState<'off' | 'soft' | 'cozy'>('cozy');

  // Floating Dust Particles in the lamp light
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      fadeSpeed: number;
    }> = [];

    // Subtle cozy floating particles
    const particleCount = lampMode === 'cozy' ? 15 : lampMode === 'soft' ? 8 : 0;
    for (let i = 0; i < 20; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 0.9 + 0.3,
        speedX: (Math.random() - 0.5) * 0.08,
        speedY: -Math.random() * 0.12 - 0.03, // Slow drift upwards
        opacity: Math.random() * 0.12 + 0.03,
        fadeSpeed: (Math.random() - 0.5) * 0.0015
      });
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, width, height);

      if (lampMode !== 'off') {
        // Table lamp positioned at the top-right corner of the desk
        const lampX = width * 0.88;
        const lampY = -30;
        
        // Cozy radial warm light wash
        const gradient = ctx.createRadialGradient(
          lampX,
          lampY,
          20,
          lampX,
          lampY,
          Math.max(width, height) * (lampMode === 'cozy' ? 1.15 : 0.8)
        );

        if (lampMode === 'cozy') {
          gradient.addColorStop(0, 'rgba(253, 186, 116, 0.095)'); // Warm Amber/Orange
          gradient.addColorStop(0.3, 'rgba(212, 175, 55, 0.035)'); // Golden Hue
          gradient.addColorStop(0.65, 'rgba(212, 175, 55, 0.008)');
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        } else {
          gradient.addColorStop(0, 'rgba(245, 241, 232, 0.05)'); // Soft warm white
          gradient.addColorStop(0.4, 'rgba(212, 175, 55, 0.01)');
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        }

        ctx.fillStyle = gradient;
        ctx.beginPath();
        // Wider dispersion from top right casting downward and leftwards
        ctx.moveTo(width - 150, 0);
        ctx.lineTo(width, 0);
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.lineTo(0, height * 0.25);
        ctx.closePath();
        ctx.fill();

        // Draw soft, glowing light beam cone from top-right lamp fixture
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        const beamGradient = ctx.createLinearGradient(lampX, lampY, width * 0.2, height);
        beamGradient.addColorStop(0, lampMode === 'cozy' ? 'rgba(253, 186, 116, 0.045)' : 'rgba(245, 241, 232, 0.025)');
        beamGradient.addColorStop(0.5, lampMode === 'cozy' ? 'rgba(212, 175, 55, 0.01)' : 'rgba(212, 175, 55, 0.003)');
        beamGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = beamGradient;

        ctx.beginPath();
        ctx.moveTo(width, 0);
        ctx.lineTo(width - 250, 0);
        ctx.lineTo(width * 0.1, height);
        ctx.lineTo(width * 0.7, height);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      // Render floating dust particles reflecting lamp rays
      if (lampMode !== 'off') {
        const maxParticles = lampMode === 'cozy' ? particles.length : Math.floor(particles.length / 2);
        for (let i = 0; i < maxParticles; i++) {
          const p = particles[i];
          p.y += p.speedY;
          p.x += p.speedX;
          p.opacity += p.fadeSpeed;

          if (p.opacity <= 0.015 || p.opacity >= 0.22) {
            p.fadeSpeed = -p.fadeSpeed;
          }

          if (p.y < 0) {
            p.y = height;
            p.x = Math.random() * width;
          }
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;

          // Particles are only visible where the light is cast
          const distanceToLamp = Math.hypot(p.x - width * 0.88, p.y - 0);
          const lightIntensityFactor = Math.max(0.05, 1 - distanceToLamp / (width * 0.9));

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(253, 244, 215, ${Math.max(0.005, p.opacity * lightIntensityFactor * (lampMode === 'cozy' ? 1.2 : 0.6))})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    drawParticles();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [lampMode]);

  const handleSoundToggle = () => {
    const nextState = !soundOn;
    setSoundOn(nextState);
    sound.toggle(nextState);
    sound.playLampClick();
  };

  const cycleLampMode = () => {
    sound.playLampClick();
    setLampMode((prev) => {
      if (prev === 'cozy') return 'off';
      if (prev === 'off') return 'soft';
      return 'cozy';
    });
  };

  return (
    <>
      {/* Absolute background Dust & Ambient Light Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-10" />

      {/* Warm Ambient filter over the entire document container when lamp is in Cozy mode */}
      <div 
        className="fixed inset-0 pointer-events-none z-30 transition-all duration-1000 ease-in-out" 
        style={{
          backgroundImage: lampMode === 'cozy' 
            ? 'radial-gradient(circle at 88% 5%, rgba(251, 191, 36, 0.05) 0%, rgba(217, 119, 6, 0.015) 50%, transparent 85%)'
            : lampMode === 'soft'
            ? 'radial-gradient(circle at 88% 5%, rgba(245, 241, 232, 0.02) 0%, transparent 60%)'
            : 'none',
          backgroundColor: lampMode === 'cozy' 
            ? 'rgba(251, 146, 60, 0.008)' 
            : 'transparent',
          mixBlendMode: 'multiply',
        }}
      />

      {/* Global Lamp Switch and Audio Control Panel (Glow effect at top right) */}
      <div className="fixed top-4 right-4 sm:top-6 sm:right-6 flex items-center space-x-2.5 sm:space-x-3 z-45 font-mono text-[9px] sm:text-[10px]">
        {/* Toggle Audio Feedback */}
        <button
          id="toggle-audio-feedback"
          onClick={handleSoundToggle}
          className="flex items-center space-x-1.5 sm:space-x-2 bg-neutral-950/85 border border-white/10 hover:border-classified-red text-secondary-text hover:text-white px-2.5 sm:px-3 py-1.5 rounded-sm backdrop-blur-md transition-all cursor-pointer shadow-lg active:scale-95"
          title="Toggle Physical Feedback Sounds"
        >
          {soundOn ? (
            <>
              <Volume2 className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-classified-red" />
              <span className="inline">AUDIO</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-neutral-600" />
              <span className="inline text-neutral-500">MUTE</span>
            </>
          )}
        </button>

        {/* Triple-State Lamp Controller */}
        <button
          id="toggle-lamp-brightness"
          onClick={cycleLampMode}
          className={`flex items-center space-x-1.5 sm:space-x-2 bg-neutral-950/85 border px-2.5 sm:px-3 py-1.5 rounded-sm backdrop-blur-md transition-all cursor-pointer shadow-lg active:scale-95 ${
            lampMode === 'cozy' 
              ? 'border-orange-400 text-orange-400 shadow-[0_0_12px_rgba(251,146,60,0.2)]' 
              : lampMode === 'soft'
              ? 'border-yellow-100 text-yellow-100'
              : 'border-white/10 text-neutral-500 hover:text-white'
          }`}
          title="Cycle Table Lamp Modes (Cozy -> Off -> Soft)"
        >
          {lampMode === 'cozy' ? (
            <>
              <Lightbulb className="w-3 sm:w-3.5 h-3 sm:h-3.5 fill-orange-400/25 animate-pulse" />
              <span>LAMP: COZY</span>
            </>
          ) : lampMode === 'soft' ? (
            <>
              <Zap className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
              <span>LAMP: SOFT</span>
            </>
          ) : (
            <>
              <Moon className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
              <span className="text-neutral-500">LAMP: OFF</span>
            </>
          )}
        </button>
      </div>
    </>
  );
}
