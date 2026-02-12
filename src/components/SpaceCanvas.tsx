import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  pz: number;
  size: number;
  color: string;
}

export function SpaceCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    if (!ctx) return;

    let w = 0, h = 0;
    let animId: number;
    let scrollY = 0;
    let maxScroll = 1;

    const STAR_COUNT = 800;
    const stars: Star[] = [];

    // Nebula particles for depth
    const nebulae: { x: number; y: number; r: number; hue: number; speed: number }[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      maxScroll = document.documentElement.scrollHeight - h;
    };

    const initStars = () => {
      stars.length = 0;
      for (let i = 0; i < STAR_COUNT; i++) {
        const z = Math.random() * 1000;
        stars.push({
          x: (Math.random() - 0.5) * w * 3,
          y: (Math.random() - 0.5) * h * 3,
          z,
          pz: z,
          size: Math.random() * 2 + 0.5,
          color: pickStarColor(),
        });
      }
    };

    const initNebulae = () => {
      nebulae.length = 0;
      for (let i = 0; i < 5; i++) {
        nebulae.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: 150 + Math.random() * 200,
          hue: 130 + Math.random() * 40, // cyan-blue range
          speed: 0.1 + Math.random() * 0.2,
        });
      }
    };

    function pickStarColor(): string {
      const r = Math.random();
      if (r < 0.6) return "rgba(200, 220, 255, "; // blue-white
      if (r < 0.8) return "rgba(255, 240, 200, "; // warm white
      if (r < 0.9) return "rgba(0, 240, 255, ";   // cyan accent
      return "rgba(16, 185, 129, ";                 // emerald accent
    }

    resize();
    initStars();
    initNebulae();
    window.addEventListener("resize", () => { resize(); initStars(); initNebulae(); });

    const onScroll = () => {
      scrollY = window.scrollY;
      maxScroll = document.documentElement.scrollHeight - h;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    let time = 0;

    const draw = () => {
      time += 0.016;
      ctx.clearRect(0, 0, w, h);

      // Scroll progress 0-1
      const scrollP = Math.min(scrollY / Math.max(maxScroll, 1), 1);

      // Warp speed on hero (scrollP ~0), gentle drift when scrolled
      // Hero is roughly first 15% of page
      const heroP = Math.min(scrollY / (h * 1.2), 1);
      const warpSpeed = 12 * (1 - heroP * heroP) + 0.3; // fast at top, slow when scrolled
      const streakLength = Math.max(0, (1 - heroP) * 8); // streak effect fades as you scroll

      // Draw nebula clouds
      for (const neb of nebulae) {
        neb.x += Math.sin(time * neb.speed) * 0.3;
        neb.y += Math.cos(time * neb.speed * 0.7) * 0.2;

        // Shift hue based on scroll (emerald shades)
        const hueShift = scrollP * 120;
        const hue = (neb.hue + hueShift) % 360;

        const grad = ctx.createRadialGradient(neb.x, neb.y, 0, neb.x, neb.y, neb.r);
        grad.addColorStop(0, `hsla(${hue}, 70%, 40%, ${0.04 * (1 - scrollP * 0.5)})`);
        grad.addColorStop(0.5, `hsla(${hue}, 60%, 30%, ${0.02 * (1 - scrollP * 0.5)})`);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(neb.x, neb.y, neb.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw stars with warp effect
      const cx = w / 2;
      const cy = h / 2;

      for (const star of stars) {
        star.pz = star.z;
        star.z -= warpSpeed;

        if (star.z <= 0) {
          star.x = (Math.random() - 0.5) * w * 3;
          star.y = (Math.random() - 0.5) * h * 3;
          star.z = 1000;
          star.pz = 1000;
        }

        // Project to 2D
        const sx = (star.x / star.z) * 300 + cx;
        const sy = (star.y / star.z) * 300 + cy;

        // Skip if off screen
        if (sx < -10 || sx > w + 10 || sy < -10 || sy > h + 10) continue;

        // Brightness based on depth
        const brightness = Math.min(1, (1 - star.z / 1000) * 1.5);
        const alpha = brightness * (0.5 + Math.sin(time * 2 + star.x) * 0.2);
        const size = star.size * brightness * (1 + (1 - heroP) * 0.5);

        // Draw streak (warp lines) when in hero
        if (streakLength > 0.5) {
          const px = (star.x / star.pz) * 300 + cx;
          const py = (star.y / star.pz) * 300 + cy;
          
          ctx.strokeStyle = star.color + (alpha * 0.6) + ")";
          ctx.lineWidth = size * 0.5;
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(sx, sy);
          ctx.stroke();
        }

        // Draw star point
        ctx.fillStyle = star.color + alpha + ")";
        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fill();

        // Glow for bright stars
        if (brightness > 0.7 && size > 1) {
          const glowGrad = ctx.createRadialGradient(sx, sy, 0, sx, sy, size * 4);
          glowGrad.addColorStop(0, star.color + (alpha * 0.3) + ")");
          glowGrad.addColorStop(1, "transparent");
          ctx.fillStyle = glowGrad;
          ctx.beginPath();
          ctx.arc(sx, sy, size * 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Central glow behind hero text (fades as you scroll)
      if (heroP < 0.9) {
        const glowAlpha = (1 - heroP) * 0.15;
        const glowR = 300 + Math.sin(time) * 30;
        const heroGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowR);
        heroGlow.addColorStop(0, `rgba(0, 240, 255, ${glowAlpha})`);
        heroGlow.addColorStop(0.3, `rgba(124, 58, 237, ${glowAlpha * 0.5})`);
        heroGlow.addColorStop(1, "transparent");
        ctx.fillStyle = heroGlow;
        ctx.beginPath();
        ctx.arc(cx, cy, glowR, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[1]"
    />
  );
}
