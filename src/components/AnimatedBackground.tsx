import React, { useEffect, useRef, useState } from 'react';
import { Zap, Eye, Orbit } from 'lucide-react';

type Mode = 'warp' | 'neural' | 'gravity';

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  glyph?: string;
  baseSize: number;
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  intensity: number;
}

const GLYPHS = ['0x', 'α', 'Ξ', '◈', 'λ', '⬡', '⚡', 'AI', 'NFT', '999', 'β'];

export const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mode, setMode] = useState<Mode>('warp');
  const [velocityDisplay, setVelocityDisplay] = useState(0);
  const [warpActive, setWarpActive] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Mutable refs for high-frequency render loop (60 FPS without React re-renders)
  const stateRef = useRef({
    mode: 'warp' as Mode,
    scrollY: 0,
    lastScrollY: 0,
    scrollVelocity: 0,
    targetVelocity: 0,
    mouseX: -1000,
    mouseY: -1000,
    isHovered: false,
    particles: [] as Particle[],
    shockwaves: [] as Shockwave[],
    width: 0,
    height: 0,
    dpr: 1,
    lastTime: performance.now(),
  });

  // Keep stateRef mode in sync
  useEffect(() => {
    stateRef.current.mode = mode;
  }, [mode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const state = stateRef.current;

    // Resize handler
    const resize = () => {
      state.width = window.innerWidth;
      state.height = window.innerHeight;
      state.dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = state.width * state.dpr;
      canvas.height = state.height * state.dpr;
      canvas.style.width = `${state.width}px`;
      canvas.style.height = `${state.height}px`;

      ctx.scale(state.dpr, state.dpr);
      initParticles();
    };

    const initParticles = () => {
      const isMobile = state.width < 768;
      const count = isMobile ? 55 : 120;
      const particles: Particle[] = [];

      const colors = [
        '#10B981', // Emerald
        '#34D399', // Mint
        '#00F0FF', // Cyber Cyan
        '#E2E8F0', // Soft Silver
        '#A7F3D0', // Ice Green
      ];

      for (let i = 0; i < count; i++) {
        const hasGlyph = Math.random() < 0.25;
        particles.push({
          x: Math.random() * state.width,
          y: Math.random() * state.height,
          z: Math.random() * 800 + 100,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          size: Math.random() * 2 + 1,
          baseSize: Math.random() * 2 + 1,
          alpha: Math.random() * 0.6 + 0.2,
          color: colors[Math.floor(Math.random() * colors.length)],
          glyph: hasGlyph ? GLYPHS[Math.floor(Math.random() * GLYPHS.length)] : undefined,
        });
      }
      state.particles = particles;
    };

    resize();
    window.addEventListener('resize', resize);

    // Scroll tracking with velocity detection
    let lastScrollTime = performance.now();
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const now = performance.now();
      const dt = Math.max((now - lastScrollTime) / 1000, 0.016);
      
      const delta = currentScrollY - state.scrollY;
      const instantVelocity = Math.abs(delta / dt);
      
      // Update target velocity smoothly
      state.targetVelocity = Math.min(instantVelocity, 4000);
      state.scrollY = currentScrollY;
      lastScrollTime = now;

      // Update scroll progress
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(Math.max(currentScrollY / maxScroll, 0), 1) : 0;
      setScrollProgress(progress);

      // Trigger shockwave on high-speed scroll flick
      if (Math.abs(delta) > 150) {
        state.shockwaves.push({
          x: state.width / 2,
          y: Math.random() * state.height,
          radius: 10,
          maxRadius: Math.min(state.width, state.height) * 0.7,
          intensity: Math.min(Math.abs(delta) / 250, 1.5),
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      state.mouseX = e.clientX;
      state.mouseY = e.clientY;
      state.isHovered = true;
    };

    const handleMouseLeave = () => {
      state.isHovered = false;
      state.mouseX = -1000;
      state.mouseY = -1000;
    };

    const handleClick = (e: MouseEvent) => {
      // Create explosive shockwave on click
      state.shockwaves.push({
        x: e.clientX,
        y: e.clientY,
        radius: 10,
        maxRadius: Math.max(state.width, state.height) * 0.6,
        intensity: 2.0,
      });

      // Scatter nearby particles
      for (const p of state.particles) {
        const dx = p.x - e.clientX;
        const dy = p.y - e.clientY;
        const dist = Math.hypot(dx, dy);
        if (dist < 250) {
          const force = (250 - dist) / 250;
          p.vx += (dx / dist) * force * 15;
          p.vy += (dy / dist) * force * 15;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleClick);

    // Animation Render Loop
    let animId: number;
    let hudUpdateCounter = 0;

    const render = (time: number) => {
      const dt = Math.min((time - state.lastTime) / 1000, 0.05);
      state.lastTime = time;

      // Smooth decay of velocity
      state.scrollVelocity += (state.targetVelocity - state.scrollVelocity) * 0.15;
      state.targetVelocity *= 0.92;

      // Update HUD values every ~6 frames
      hudUpdateCounter++;
      if (hudUpdateCounter % 6 === 0) {
        const vel = Math.round(state.scrollVelocity);
        setVelocityDisplay(vel);
        setWarpActive(vel > 650);
      }

      ctx.clearRect(0, 0, state.width, state.height);

      const isWarping = state.scrollVelocity > 500;
      const speedMultiplier = 1 + (state.scrollVelocity / 300);

      // 1. Render Shockwaves
      for (let i = state.shockwaves.length - 1; i >= 0; i--) {
        const sw = state.shockwaves[i];
        sw.radius += 500 * dt;
        sw.intensity *= 0.94;

        if (sw.radius > sw.maxRadius || sw.intensity < 0.02) {
          state.shockwaves.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(16, 185, 129, ${sw.intensity * 0.35})`;
        ctx.lineWidth = 2 + sw.intensity * 3;
        ctx.stroke();

        // Push particles intersecting the shockwave
        for (const p of state.particles) {
          const dx = p.x - sw.x;
          const dy = p.y - sw.y;
          const dist = Math.hypot(dx, dy);
          if (Math.abs(dist - sw.radius) < 40) {
            const push = sw.intensity * 4;
            p.vx += (dx / (dist || 1)) * push;
            p.vy += (dy / (dist || 1)) * push;
          }
        }
        ctx.restore();
      }

      // 2. Mode-Specific Drawing & Particle Physics
      const currentMode = state.mode;

      // Neural connection lines (Mode = 'neural' or 'warp' with lower threshold)
      if (currentMode === 'neural' || currentMode === 'warp') {
        const connectDist = currentMode === 'neural' ? 140 : 100;
        ctx.lineWidth = 0.75;

        for (let i = 0; i < state.particles.length; i++) {
          for (let j = i + 1; j < state.particles.length; j++) {
            const p1 = state.particles[i];
            const p2 = state.particles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.hypot(dx, dy);

            if (dist < connectDist) {
              const alpha = (1 - dist / connectDist) * (isWarping ? 0.35 : 0.18);
              ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();

              // Electric pulse particle travelling down line
              if (Math.random() < 0.005) {
                const px = p1.x + dx * 0.5;
                const py = p1.y + dy * 0.5;
                ctx.fillStyle = '#00F0FF';
                ctx.beginPath();
                ctx.arc(px, py, 1.5, 0, Math.PI * 2);
                ctx.fill();
              }
            }
          }
        }
      }

      // 3. Render and Update Particles
      for (const p of state.particles) {
        // Mode-specific physics forces
        if (currentMode === 'gravity') {
          // Gravitational center vortex
          const cx = state.width / 2;
          const cy = state.height / 2;
          const dx = cx - p.x;
          const dy = cy - p.y;
          const dist = Math.hypot(dx, dy) || 1;
          const angle = Math.atan2(dy, dx);
          
          // Tangential swirl + radial pull
          p.vx += Math.cos(angle + Math.PI / 2) * 1.5 + (dx / dist) * 0.5;
          p.vy += Math.sin(angle + Math.PI / 2) * 1.5 + (dy / dist) * 0.5;
        }

        // Mouse interaction
        if (state.isHovered) {
          const mdx = state.mouseX - p.x;
          const mdy = state.mouseY - p.y;
          const mDist = Math.hypot(mdx, mdy);
          if (mDist < 180) {
            const mForce = (180 - mDist) / 180;
            // Push away
            p.vx -= (mdx / mDist) * mForce * 2.5;
            p.vy -= (mdy / mDist) * mForce * 2.5;
          }
        }

        // Scroll velocity stretch & drift
        const scrollDelta = (state.scrollY - state.lastScrollY);
        p.vy += scrollDelta * 0.04;

        // Apply velocities with damping
        p.x += p.vx * speedMultiplier;
        p.y += p.vy * speedMultiplier;
        p.vx *= 0.95;
        p.vy *= 0.95;

        // Wrap around screen boundaries
        if (p.x < -20) p.x = state.width + 20;
        if (p.x > state.width + 20) p.x = -20;
        if (p.y < -20) p.y = state.height + 20;
        if (p.y > state.height + 20) p.y = -20;

        // Render Particle / Warp Trails
        ctx.save();
        if (isWarping && currentMode === 'warp') {
          // Hyperdrive light streaks!
          const streakLength = Math.min(state.scrollVelocity * 0.08, 60);
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x, p.y - streakLength);
          ctx.strokeStyle = p.color;
          ctx.lineWidth = p.size * 1.5;
          ctx.stroke();
        } else {
          // Regular glowing orb or Web3 Alpha glyph
          if (p.glyph) {
            ctx.font = `600 ${Math.max(10, p.size * 5)}px "Geist Mono", monospace`;
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.alpha * (isWarping ? 1 : 0.65);
            ctx.fillText(p.glyph, p.x, p.y);
          } else {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.alpha;
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 8;
            ctx.fill();
          }
        }
        ctx.restore();
      }

      state.lastScrollY = state.scrollY;
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* Interactive HTML5 Canvas Engine */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block w-full h-full pointer-events-auto"
        title="Click anywhere to trigger a quantum pulse shockwave"
      />

      {/* Hairline Scroll Progress Bar with dynamic neon glow */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-emerald-500 via-[#00F0FF] to-emerald-400 z-[100] transition-all duration-75 ease-out shadow-[0_0_12px_rgba(0,240,255,0.8)]"
        style={{
          width: `${scrollProgress * 100}%`,
          opacity: scrollProgress > 0.005 ? 1 : 0,
        }}
      />

      {/* Cybernetic Telemetry HUD (Discrete Bottom-Left / Interactive controls) */}
      <div className="fixed bottom-6 left-6 z-40 hidden lg:flex items-center gap-3 p-2.5 rounded-xl bg-[#0D0D0D]/90 border border-white/10 backdrop-blur-md text-[11px] font-mono text-[#8A8A8A] pointer-events-auto shadow-2xl">
        <div className="flex items-center gap-2 pr-3 border-r border-white/10">
          <span
            className={`w-2 h-2 rounded-full ${
              warpActive ? 'bg-[#00F0FF] animate-ping' : 'bg-emerald-400 animate-pulse'
            }`}
          />
          <span className="text-[#F5F5F5] font-semibold tracking-wider">
            {warpActive ? 'WARP SPEED' : 'NEURAL FLOW'}
          </span>
          <span className="text-[#8A8A8A] tabular-nums">
            {velocityDisplay} px/s
          </span>
        </div>

        {/* Mode Switcher Buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setMode('warp')}
            title="Warp Mode (Hyperdrive velocity trails on scroll)"
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer flex items-center gap-1.5 ${
              mode === 'warp'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-medium'
                : 'text-[#8A8A8A] hover:text-[#F5F5F5]'
            }`}
          >
            <Zap size={11} />
            <span>Warp</span>
          </button>

          <button
            onClick={() => setMode('neural')}
            title="Neural Mode (Interconnected onchain constellation)"
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer flex items-center gap-1.5 ${
              mode === 'neural'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-medium'
                : 'text-[#8A8A8A] hover:text-[#F5F5F5]'
            }`}
          >
            <Eye size={11} />
            <span>Neural</span>
          </button>

          <button
            onClick={() => setMode('gravity')}
            title="Gravity Mode (Swirling black-hole vortex)"
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer flex items-center gap-1.5 ${
              mode === 'gravity'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-medium'
                : 'text-[#8A8A8A] hover:text-[#F5F5F5]'
            }`}
          >
            <Orbit size={11} />
            <span>Gravity</span>
          </button>
        </div>

        <span className="text-[10px] text-[#5A5A5A] pl-2 border-l border-white/10 select-none">
          Click background for quantum pulse
        </span>
      </div>

      {/* Subtle Ambient Vignette & Gradient Shadows */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-[#080808]/75 pointer-events-none" />
    </div>
  );
};
