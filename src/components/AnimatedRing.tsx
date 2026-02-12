import { useEffect, useRef } from "react";

export function AnimatedRing() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const size = 400;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    let time = 0;
    let animId: number;

    const rings = [
      { r: 140, speed: 0.3, width: 2.5, dashLen: 0.4, phase: 0 },
      { r: 110, speed: -0.5, width: 1.8, dashLen: 0.3, phase: 2 },
      { r: 80, speed: 0.7, width: 1.2, dashLen: 0.5, phase: 4 },
      { r: 55, speed: -0.4, width: 0.8, dashLen: 0.6, phase: 1 },
    ];

    const dots: { angle: number; r: number; speed: number; size: number }[] = [];
    for (let i = 0; i < 12; i++) {
      dots.push({
        angle: (Math.PI * 2 * i) / 12,
        r: rings[i % rings.length].r,
        speed: 0.2 + Math.random() * 0.5,
        size: 1.5 + Math.random() * 2,
      });
    }

    function hslColor(h: number, s: number, l: number, a: number) {
      return `hsla(${h}, ${s}%, ${l}%, ${a})`;
    }

    function draw() {
      time += 0.016;
      ctx.clearRect(0, 0, size, size);

      // Center glow
      const glowR = 30 + Math.sin(time * 2) * 10;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowR);
      grad.addColorStop(0, "rgba(0, 240, 255, 0.3)");
      grad.addColorStop(0.5, "rgba(124, 58, 237, 0.1)");
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, glowR, 0, Math.PI * 2);
      ctx.fill();

      // Draw 3D-looking rings with tilt
      for (let i = 0; i < rings.length; i++) {
        const ring = rings[i];
        const rotation = time * ring.speed + ring.phase;
        const tiltX = Math.sin(time * 0.3 + i) * 0.3;
        const tiltY = Math.cos(time * 0.2 + i * 0.5) * 0.4;

        // Color cycling
        const hue = (180 + time * 30 + i * 40) % 360;

        ctx.save();
        ctx.translate(cx, cy);

        // Draw ring as an ellipse with varying tilt for 3D effect
        const scaleY = 0.5 + Math.abs(Math.cos(tiltX)) * 0.5;
        const rotAngle = rotation;

        ctx.rotate(rotAngle);
        ctx.scale(1, scaleY);

        // Dashed arc
        const segments = 8;
        const segLen = (Math.PI * 2 * ring.dashLen) / segments;
        const gapLen = (Math.PI * 2 * (1 - ring.dashLen)) / segments;

        for (let s = 0; s < segments; s++) {
          const startAngle = s * (segLen + gapLen) + time * ring.speed * 2;
          const endAngle = startAngle + segLen;

          // Gradient along arc segment
          const alpha = 0.4 + Math.sin(time * 2 + s) * 0.3;
          ctx.strokeStyle = hslColor(hue, 80, 60, alpha);
          ctx.lineWidth = ring.width;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.arc(0, 0, ring.r, startAngle, endAngle);
          ctx.stroke();
        }

        ctx.restore();

        // Second pass: perpendicular ring for 3D depth
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rotAngle + Math.PI / 2);
        ctx.scale(1, 0.3 + Math.abs(Math.sin(tiltY)) * 0.4);

        for (let s = 0; s < segments; s++) {
          const startAngle = s * (segLen + gapLen) - time * ring.speed * 1.5;
          const endAngle = startAngle + segLen;
          const alpha = 0.2 + Math.sin(time * 1.5 + s) * 0.15;
          ctx.strokeStyle = hslColor((hue + 60) % 360, 70, 55, alpha);
          ctx.lineWidth = ring.width * 0.6;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.arc(0, 0, ring.r, startAngle, endAngle);
          ctx.stroke();
        }

        ctx.restore();
      }

      // Orbital dots
      for (const dot of dots) {
        dot.angle += dot.speed * 0.016;
        const x = cx + Math.cos(dot.angle) * dot.r;
        const y = cy + Math.sin(dot.angle) * dot.r * (0.5 + Math.abs(Math.cos(time * 0.3)) * 0.5);
        const alpha = 0.3 + Math.sin(time * 3 + dot.angle) * 0.3;
        const hue = (200 + time * 20 + dot.angle * 30) % 360;

        ctx.fillStyle = hslColor(hue, 80, 65, alpha);
        ctx.beginPath();
        ctx.arc(x, y, dot.size, 0, Math.PI * 2);
        ctx.fill();

        // Dot glow
        const dotGrad = ctx.createRadialGradient(x, y, 0, x, y, dot.size * 4);
        dotGrad.addColorStop(0, hslColor(hue, 80, 65, alpha * 0.3));
        dotGrad.addColorStop(1, "transparent");
        ctx.fillStyle = dotGrad;
        ctx.beginPath();
        ctx.arc(x, y, dot.size * 4, 0, Math.PI * 2);
        ctx.fill();
      }

      // Center bright dot
      const centerAlpha = 0.6 + Math.sin(time * 3) * 0.3;
      ctx.fillStyle = `rgba(0, 240, 255, ${centerAlpha})`;
      ctx.beginPath();
      ctx.arc(cx, cy, 3, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48"
      style={{ filter: "drop-shadow(0 0 40px rgba(0, 240, 255, 0.25))" }}
    />
  );
}
