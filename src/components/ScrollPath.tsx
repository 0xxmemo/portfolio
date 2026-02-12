import { useEffect, useRef } from "react";
import { createDrawable, animate, onScroll } from "animejs";

export function ScrollPath() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const path = svg.querySelector<SVGPathElement>(".scroll-path-line");
    if (!path) return;

    const [drawable] = createDrawable(path);
    animate(drawable, {
      draw: ["0 0", "0 1"],
      ease: "linear",
      duration: 1000,
      autoplay: onScroll({
        target: document.documentElement,
        enter: "top top",
        leave: "bottom bottom",
        sync: true,
      }),
    });
  }, []);

  return (
    <svg
      ref={svgRef}
      className="pointer-events-none fixed left-8 top-0 w-[2px] h-full z-20 hidden lg:block"
      viewBox="0 0 2 1000"
      preserveAspectRatio="none"
      style={{ overflow: "visible" }}
    >
      <defs>
        <linearGradient id="scroll-line-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
          <stop offset="25%" stopColor="#059669" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#22c55e" stopOpacity="0.6" />
          <stop offset="75%" stopColor="#eab308" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <path
        className="scroll-path-line"
        d="M1 0 L1 1000"
        stroke="url(#scroll-line-grad)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
