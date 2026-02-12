// @ts-nocheck
import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

interface Props {
  progress?: number;
}

interface Particle {
  x: number; 
  y: number; 
  vx: number; 
  vy: number;
  size: number; 
  color: string; 
  rotation: number; 
  rotSpeed: number;
  offsetX: number;
  offsetY: number;
}

export function ConfettiDemo({ progress: _progress }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const initRef = useRef(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const w = 400, h = 400;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const ctx = canvas.getContext("2d")!;

    if (!initRef.current) {
      const colors = ["#eab308", "#fbbf24", "#f59e0b", "#facc15", "#fde047", "#fef08a"];
      const particles: Particle[] = [];
      
      for (let i = 0; i < 80; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 6;
        particles.push({
          x: w / 2, 
          y: h / 2,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 2,
          size: 3 + Math.random() * 5,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.3,
          offsetX: 0,
          offsetY: 0,
        });
      }
      
      particlesRef.current = particles;

      // Burst animation with anime.js
      setTimeout(() => {
        animate(particles, {
          offsetX: (p: any) => p.vx * 40,
          offsetY: (p: any) => p.vy * 40,
          duration: 1500,
          delay: stagger(10),
          ease: "outExpo",
        });
      }, 300);

      // Continuous render loop
      function draw() {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, w, h);

        // Draw trophy emoji in center before burst
        if (particles.every(p => p.offsetX === 0 && p.offsetY === 0)) {
          ctx.font = "48px serif";
          ctx.textAlign = "center";
          ctx.fillStyle = `rgba(234,179,8,0.8)`;
          ctx.fillText("🏆", w / 2, h / 2 + 16);

          const preGlow = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, 40);
          preGlow.addColorStop(0, `rgba(234,179,8,0.2)`);
          preGlow.addColorStop(1, "transparent");
          ctx.fillStyle = preGlow;
          ctx.beginPath();
          ctx.arc(w / 2, h / 2, 40, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw particles
        for (const p of particles) {
          const x = w / 2 + p.offsetX;
          const y = h / 2 + p.offsetY + Math.pow(p.offsetY / 40, 2) * 80; // gravity
          
          const distance = Math.sqrt(Math.pow(p.offsetX, 2) + Math.pow(p.offsetY, 2));
          const alpha = Math.max(0, 1 - distance / 80);
          
          const rot = p.rotation + p.rotSpeed * distance;

          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(rot);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = alpha;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
          ctx.restore();
        }

        // Central glow during burst
        const maxOffset = Math.max(...particles.map(p => Math.abs(p.offsetX) + Math.abs(p.offsetY)));
        if (maxOffset > 1) {
          const glowAlpha = Math.max(0, 0.4 - (maxOffset / 100) * 0.4);
          const glow = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, 60);
          glow.addColorStop(0, `rgba(234,179,8,${glowAlpha})`);
          glow.addColorStop(1, "transparent");
          ctx.globalAlpha = 1;
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(w / 2, h / 2, 60, 0, Math.PI * 2);
          ctx.fill();
        }

        rafRef.current = requestAnimationFrame(draw);
      }

      draw();
      initRef.current = true;
    }

    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center bg-white/[0.02] rounded-2xl border border-white/[0.05]">
      <canvas ref={canvasRef} className="w-full h-full max-w-[400px] max-h-[400px] mx-auto" />
    </div>
  );
}
