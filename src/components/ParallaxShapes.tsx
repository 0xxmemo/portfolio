import { useEffect, useRef } from "react";
import { animate, onScroll } from "animejs";

const shapes = [
  { x: "10%", y: "15%", size: 80, speed: 0.3, color: "rgba(0,240,255,0.04)" },
  { x: "85%", y: "25%", size: 120, speed: 0.5, color: "rgba(124,58,237,0.04)" },
  { x: "70%", y: "55%", size: 60, speed: 0.2, color: "rgba(0,240,255,0.03)" },
  { x: "15%", y: "70%", size: 100, speed: 0.4, color: "rgba(124,58,237,0.03)" },
  { x: "50%", y: "85%", size: 90, speed: 0.35, color: "rgba(0,240,255,0.03)" },
];

export function ParallaxShapes() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.querySelectorAll<HTMLElement>(".pshape").forEach((shape, i) => {
      const speed = shapes[i].speed;
      animate(shape, {
        translateY: [0, -200 * speed],
        rotate: [0, 45 * speed],
        duration: 1000,
        autoplay: onScroll({
          target: document.documentElement,
          enter: "top top",
          leave: "bottom bottom",
          sync: true,
        }),
      });
    });
  }, []);

  return (
    <div ref={ref} className="pointer-events-none fixed inset-0 z-[2] overflow-hidden">
      {shapes.map((s, i) => (
        <div
          key={i}
          className="pshape absolute rounded-full"
          style={{
            left: s.x,
            top: s.y,
            width: s.size,
            height: s.size,
            background: `radial-gradient(circle, ${s.color}, transparent 70%)`,
          }}
        />
      ))}
    </div>
  );
}
