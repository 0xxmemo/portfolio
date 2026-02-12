import { useEffect, useRef } from "react";
import { stagger, createTimeline } from "animejs";

export function DotGrid({ rows = 11, cols = 11 }: { rows?: number; cols?: number }) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    const options = { grid: [cols, rows], from: "center" as const };

    const tl = createTimeline({ loop: true, defaults: { ease: "inOutQuad" } });

    tl.add(el.querySelectorAll(".grid-dot"), {
      scale: stagger([1.4, 0.6], options),
      opacity: stagger([1, 0.3], options),
      duration: 1500,
    }, stagger(80, options))
      .add(el.querySelectorAll(".grid-dot"), {
        scale: 1,
        opacity: 0.5,
        duration: 1500,
      }, stagger(80, { ...options, start: 1500 }));

    return () => { tl.pause(); };
  }, [rows, cols]);

  return (
    <div
      ref={gridRef}
      className="grid gap-3 opacity-60"
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
    >
      {Array.from({ length: rows * cols }).map((_, i) => (
        <div
          key={i}
          className="grid-dot w-1.5 h-1.5 rounded-full bg-emerald-500/50"
        />
      ))}
    </div>
  );
}
