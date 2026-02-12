import { useEffect, useRef } from "react";
import { createDraggable, createSpring } from "animejs";

export function DraggableDemo() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const circles = container.querySelectorAll<HTMLElement>(".drag-circle");
    const draggable = createDraggable(circles, {
      container: container,
      releaseEase: createSpring({ stiffness: 200, damping: 10 }),
    });

    return () => {
      (draggable as any).revert?.();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-48 rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden"
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-white/10 text-sm">drag me around</span>
      </div>
      {[
        { color: "bg-cyan-accent/60", x: "20%", y: "30%" },
        { color: "bg-purple-accent/60", x: "50%", y: "50%" },
        { color: "bg-amber-400/60", x: "70%", y: "25%" },
      ].map((c, i) => (
        <div
          key={i}
          className={`drag-circle absolute w-10 h-10 rounded-full ${c.color} cursor-grab active:cursor-grabbing shadow-lg`}
          style={{ left: c.x, top: c.y, transform: "translate(-50%, -50%)" }}
        />
      ))}
    </div>
  );
}
