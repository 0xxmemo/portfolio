import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { GlowCard } from "../components/GlowCard";
import { MOTION } from "../lib/motion";

const awards = [
  { title: "ETH Global Istanbul", subtitle: "Hackathon Winner — Scroll, ChainLink, Safe, ENS", logo: "/logos/ethglobal.png" },
  { title: "Solana Demo Day", subtitle: "Winner — Superteam", logo: "/logos/solana-award.png" },
  { title: "Solana Turkey Grant", subtitle: "Grant Recipient — Superteam", logo: "/logos/solana-award.png" },
  { title: "Base Builder Grant", subtitle: "Levr — Coinbase Base Ecosystem", logo: "/logos/base.png" },
];

export function Awards({ isActive }: { isActive?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isActive || hasAnimated.current) return;
    const el = sectionRef.current;
    if (!el) return;
    hasAnimated.current = true;

    el.style.opacity = "1";

    animate(el.querySelector(".section-header")!, {
      opacity: [0, 1],
      translateX: [MOTION.slideX.header, 0],
      duration: MOTION.duration,
      ease: MOTION.ease,
    });

    animate(el.querySelectorAll(".award-card"), {
      opacity: [0, 1],
      translateY: [MOTION.slideY.item, 0],
      scale: [MOTION.scale.initial, MOTION.scale.final],
      duration: MOTION.duration,
      delay: stagger(MOTION.staggerDelay),
      ease: MOTION.spring,
    });
  }, [isActive]);

  return (
    <section ref={sectionRef} className="min-h-[60vh] flex items-center" style={{ opacity: 0 }}>
      <div className="w-full">
        <h2 
          className="section-header text-[10px] sm:text-xs font-mono mb-8 sm:mb-10 md:mb-12 tracking-[0.2em] sm:tracking-[0.3em] uppercase"
          style={{ color: "#10b981", opacity: 0 }}
        >
          // Awards & Grants
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-8">
          {awards.map((award) => (
            <div key={award.title} className="award-card" style={{ opacity: 0 }}>
              <GlowCard className="p-4 sm:p-5 flex items-center gap-3 sm:gap-4 bg-white/[0.02] border-white/[0.08] hover:border-emerald-500/30 transition-all duration-300">
                <img 
                  src={award.logo} 
                  alt={award.title} 
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-contain flex-shrink-0" 
                />
                <div>
                  <h3 className="font-semibold text-white text-sm sm:text-base">{award.title}</h3>
                  <p className="text-xs sm:text-sm text-white/50">{award.subtitle}</p>
                </div>
              </GlowCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
