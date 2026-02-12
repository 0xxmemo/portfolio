// @ts-nocheck
import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

interface Props {
  progress?: number;
}

const cards = [
  { title: "Inverter SDK", color: "#06b6d4", tags: ["TypeScript", "SDK", "Web3"] },
  { title: "Breadcrumb", color: "#f59e0b", tags: ["InfoFi", "Analytics"] },
  { title: "Levr", color: "#22c55e", tags: ["Base", "Launchpad"] },
];

export function CardStackDemo({ progress }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const initRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (!initRef.current) {
      const cardElements = container.querySelectorAll(".demo-card");

      // Initial stack -> fan out animation
      animate(cardElements, {
        rotateY: (_, i) => {
          const centerI = i - (cards.length - 1) / 2;
          return centerI * 25;
        },
        translateX: (_, i) => {
          const centerI = i - (cards.length - 1) / 2;
          return centerI * 80;
        },
        translateZ: (_, i) => {
          const centerI = i - (cards.length - 1) / 2;
          return -Math.abs(centerI) * 40;
        },
        scale: (_, i) => {
          const centerI = i - (cards.length - 1) / 2;
          return 1 - Math.abs(centerI) * 0.05;
        },
        opacity: [0.4, 1],
        duration: 1200,
        delay: stagger(100),
        ease: "outExpo",
      });

      initRef.current = true;
    }
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center bg-white/[0.02] rounded-2xl border border-white/[0.05]">
      <div ref={containerRef} className="relative w-[400px] h-[400px]" style={{ perspective: "800px" }}>
        {cards.map((card, i) => (
          <div
            key={card.title}
            className="demo-card absolute inset-0 flex items-center justify-center"
            style={{
              transformStyle: "preserve-3d",
              zIndex: i,
              opacity: 0.4,
            }}
          >
            <div
              className="w-48 h-64 rounded-xl p-5 flex flex-col justify-between"
              style={{
                background: `linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.05))`,
                border: `2px solid ${card.color}66`,
                boxShadow: `0 0 20px ${card.color}15`,
                backdropFilter: "blur(8px)",
              }}
            >
              <div>
                <div className="w-8 h-1 rounded-full mb-4" style={{ background: card.color }} />
                <h4 className="text-white font-semibold text-sm">{card.title}</h4>
              </div>
              <div className="flex flex-wrap gap-1">
                {card.tags.map(t => (
                  <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/40">{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
