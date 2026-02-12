// @ts-nocheck
import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

const techItems = [
  "TS", "React", "Next", "Node", "Sol",
  "Viem", "GQL", "AWS", "Docker", "Prisma",
];

interface Props {
  progress?: number;
}

export function OrbitDemo({ progress }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef(0);
  const rafRef = useRef<number>(0);
  const itemsRef = useRef<{ angle: number; ring: number; speed: number }[]>([]);
  const initRef = useRef(false);

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
      // Setup orbital items
      techItems.forEach((item, i) => {
        const ring = i < 4 ? 0 : i < 7 ? 1 : 2;
        const angleOffset = (Math.PI * 2 * i) / techItems.length;
        const speed = 0.3 + ring * 0.15;
        itemsRef.current.push({ angle: angleOffset, ring, speed });
      });

      // Animate items appearing with stagger
      const itemElements = Array.from({ length: techItems.length }, (_, i) => ({ opacity: 0, scale: 0 }));
      animate(itemElements, {
        opacity: [0, 1],
        scale: [0, 1],
        duration: 600,
        delay: stagger(50),
        ease: "outElastic(1, .6)",
      });

      initRef.current = true;
    }

    function draw() {
      timeRef.current += 0.012;
      const time = timeRef.current;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2, cy = h / 2;

      // Center dot
      ctx.fillStyle = `rgba(249, 115, 22, 0.9)`;
      ctx.beginPath();
      ctx.arc(cx, cy, 5, 0, Math.PI * 2);
      ctx.fill();

      // Center glow
      const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 30);
      cg.addColorStop(0, `rgba(249, 115, 22, 0.4)`);
      cg.addColorStop(1, "transparent");
      ctx.fillStyle = cg;
      ctx.beginPath();
      ctx.arc(cx, cy, 30, 0, Math.PI * 2);
      ctx.fill();

      // Orbit rings (faint)
      for (let r = 0; r < 3; r++) {
        const radius = 60 + r * 50;
        ctx.strokeStyle = `rgba(249,115,22,0.15)`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Tech items orbiting
      techItems.forEach((item, i) => {
        const orbitData = itemsRef.current[i];
        const radius = 60 + orbitData.ring * 50;
        orbitData.angle += orbitData.speed * 0.016;
        const angle = orbitData.angle;

        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius * 0.6;

        const alpha = 0.7 + Math.sin(time + i) * 0.3;

        // Dot
        ctx.fillStyle = `rgba(249,115,22,${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();

        // Label
        ctx.font = "10px Inter, system-ui, sans-serif";
        ctx.fillStyle = `rgba(255,255,255,${alpha * 0.7})`;
        ctx.textAlign = "center";
        ctx.fillText(item, x, y - 10);
      });

      rafRef.current = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center bg-white/[0.02] rounded-2xl border border-white/[0.05]">
      <div ref={containerRef} className="relative">
        <canvas ref={canvasRef} className="w-full h-full max-w-[400px] max-h-[400px] mx-auto" />
      </div>
    </div>
  );
}
