import { useEffect, useRef } from "react";
import { animate, stagger, createDrawable } from "animejs";

const companies = [
  { name: "Getir", year: "2019", color: "#a855f7" },
  { name: "Crossify", year: "2022", color: "#c084fc" },
  { name: "Inverter", year: "2023", color: "#e9d5ff" },
];

interface Props {
  progress?: number;
}

export function TimelineDemo({ progress: _progress }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const initRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    const linePath = lineRef.current;
    if (!container || !linePath) return;

    if (!initRef.current) {
      initRef.current = true;

      // SVG line drawing animation
      const [drawable] = createDrawable(linePath);
      animate(drawable, {
        draw: ["0 0", "0 1"],
        ease: "outExpo",
        duration: 1000,
        delay: 200,
      });

      // Animate dots
      animate(container.querySelectorAll(".timeline-dot"), {
        scale: [0, 1],
        opacity: [0, 1],
        duration: 500,
        delay: stagger(150, { start: 400 }),
        ease: "outElastic(1, .6)",
      });

      // Animate labels
      animate(container.querySelectorAll(".timeline-label"), {
        opacity: [0, 1],
        translateX: [-20, 0],
        duration: 600,
        delay: stagger(150, { start: 500 }),
        ease: "outExpo",
      });
    }
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center bg-white/[0.02] rounded-2xl border border-white/[0.05]">
      <div ref={containerRef} className="relative w-[400px] h-[400px]">
        {/* SVG Timeline line */}
        <svg
          className="absolute left-[80px] top-[60px] w-[2px] h-[280px] pointer-events-none"
          viewBox="0 0 2 280"
          preserveAspectRatio="none"
          style={{ overflow: "visible" }}
        >
          <defs>
            <linearGradient id="demo-line-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="1" />
              <stop offset="50%" stopColor="#a855f7" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <path
            ref={lineRef}
            d="M1 0 L1 280"
            stroke="url(#demo-line-grad)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </svg>

        {/* Timeline items */}
        {companies.map((company, i) => {
          const dotY = 60 + (i * 140);
          return (
            <div key={company.name} className="absolute" style={{ top: `${dotY}px`, left: "80px" }}>
              <div
                className="timeline-dot absolute -left-[8px] -top-[8px] w-4 h-4 rounded-full border-2 border-emerald-500 bg-[#0a0a0a] shadow-[0_0_12px_rgba(16,185,129,0.6)]"
                style={{ opacity: 0, transform: "scale(0)" }}
              />
              
              <div className="timeline-label ml-6" style={{ opacity: 0 }}>
                <h4 className="text-white font-bold text-base">{company.name}</h4>
                <p className="text-[#a855f7] text-xs font-mono">{company.year}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
