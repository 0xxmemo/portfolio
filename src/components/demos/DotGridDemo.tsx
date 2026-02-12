// @ts-nocheck
import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

// "MG" as a 9x7 dot grid bitmap
const M_GRID = [
  [1,0,0,0,1],
  [1,1,0,1,1],
  [1,0,1,0,1],
  [1,0,0,0,1],
  [1,0,0,0,1],
  [1,0,0,0,1],
  [1,0,0,0,1],
];
const G_GRID = [
  [0,1,1,1,0],
  [1,0,0,0,0],
  [1,0,0,0,0],
  [1,0,1,1,1],
  [1,0,0,0,1],
  [1,0,0,0,1],
  [0,1,1,1,0],
];

interface Props {
  progress?: number;
}

export function DotGridDemo({ progress: _progress }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<{ x: number; y: number; tx: number; ty: number; rx: number; ry: number; el?: HTMLDivElement }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const initRef = useRef(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const dpr = window.devicePixelRatio || 1;
    const w = 400, h = 400;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    if (!initRef.current) {
      const ctx = canvas.getContext("2d")!;
      
      // Build target positions for MG
      const dots: typeof dotsRef.current = [];
      const spacing = 18;
      const rows = 7, mCols = 5, gCols = 5;
      const totalW = (mCols + 1 + gCols) * spacing;
      const totalH = rows * spacing;
      const ox = (w - totalW) / 2;
      const oy = (h - totalH) / 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < mCols; c++) {
          if (M_GRID[r][c]) {
            dots.push({
              tx: ox + c * spacing, 
              ty: oy + r * spacing,
              rx: Math.random() * w, 
              ry: Math.random() * h,
              x: Math.random() * w, 
              y: Math.random() * h,
            });
          }
        }
        for (let c = 0; c < gCols; c++) {
          if (G_GRID[r][c]) {
            dots.push({
              tx: ox + (mCols + 1 + c) * spacing, 
              ty: oy + r * spacing,
              rx: Math.random() * w, 
              ry: Math.random() * h,
              x: Math.random() * w, 
              y: Math.random() * h,
            });
          }
        }
      }

      // Add extra random dots for ambiance
      for (let i = 0; i < 60; i++) {
        const rx = Math.random() * w, ry = Math.random() * h;
        dots.push({ tx: rx, ty: ry, rx, ry, x: rx, y: ry });
      }

      dotsRef.current = dots;

      // Animate dots forming the MG pattern
      animate(dots, {
        x: (d: any) => d.tx,
        y: (d: any) => d.ty,
        duration: 1500,
        delay: stagger(15),
        ease: "outExpo",
      });

      // Continuous render loop
      function draw() {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, w, h);

        for (const dot of dots) {
          const alpha = 0.7;
          ctx.fillStyle = `rgba(6, 182, 212, ${alpha})`;
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, 2.5, 0, Math.PI * 2);
          ctx.fill();

          // Glow
          const glow = ctx.createRadialGradient(dot.x, dot.y, 0, dot.x, dot.y, 8);
          glow.addColorStop(0, `rgba(6, 182, 212, ${alpha * 0.4})`);
          glow.addColorStop(1, "transparent");
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, 8, 0, Math.PI * 2);
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
      <div ref={containerRef} className="relative">
        <canvas ref={canvasRef} className="w-full h-full max-w-[400px] max-h-[400px] mx-auto" />
      </div>
    </div>
  );
}
