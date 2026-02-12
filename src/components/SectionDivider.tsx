import { useEffect, useRef } from "react";
import { animate, stagger, onScroll } from "animejs";

interface Props {
  accentColor?: string;
  dotCount?: number;
}

export function SectionDivider({ accentColor = "rgba(0,240,255,0.4)", dotCount = 5 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    animate(el.querySelectorAll(".divider-dot"), {
      scale: [0, 1.5, 1],
      opacity: [0, 1],
      duration: 600,
      delay: stagger(80, { from: "center" }),
      ease: "outElastic(1, .6)",
      autoplay: onScroll({ target: el, enter: "bottom top" }),
    });

    animate(el.querySelectorAll(".divider-line"), {
      scaleX: [0, 1],
      opacity: [0, 0.3],
      duration: 800,
      ease: "outExpo",
      autoplay: onScroll({ target: el, enter: "bottom top" }),
    });
  }, []);

  return (
    <div ref={ref} className="flex items-center justify-center gap-2 py-8">
      <div className="divider-line h-px w-16 origin-right" style={{ background: accentColor }} />
      {Array.from({ length: dotCount }).map((_, i) => (
        <div
          key={i}
          className="divider-dot w-1.5 h-1.5 rounded-full opacity-0"
          style={{ background: accentColor }}
        />
      ))}
      <div className="divider-line h-px w-16 origin-left" style={{ background: accentColor }} />
    </div>
  );
}
