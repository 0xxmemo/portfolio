import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { GlowCard } from "../components/GlowCard";
import { FaTrophy, FaMedal, FaDollarSign } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { MOTION } from "../lib/motion";
import type { ReactNode } from "react";

const awards: { title: string; subtitle: string; icon: ReactNode }[] = [
  { title: "ETH Global Istanbul", subtitle: "Hackathon Winner", icon: <FaTrophy className="text-yellow-400" /> },
  { title: "Solana Demo Day", subtitle: "Winner", icon: <FaMedal className="text-amber-400" /> },
  { title: "Solana Turkey Grant", subtitle: "Grant Recipient", icon: <FaDollarSign className="text-green-400" /> },
  { title: "Base Builder Grant", subtitle: "Levr Project", icon: <HiSparkles className="text-blue-400" /> },
];

export function Awards({ isActive }: { isActive?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isActive || hasAnimated.current) return;
    const el = sectionRef.current;
    if (!el) return;
    hasAnimated.current = true;

    // Make section visible
    el.style.opacity = "1";

    // Header: fade + slideX
    animate(el.querySelector(".section-header")!, {
      opacity: [0, 1],
      translateX: [MOTION.slideX.header, 0],
      duration: MOTION.duration,
      ease: MOTION.ease,
    });

    // Award cards: stagger fade + slideY + scale
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
          style={{ color: "#eab308", opacity: 0 }}
        >
          // Awards & Grants
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-8">
          {awards.map((award) => (
            <div key={award.title} className="award-card" style={{ opacity: 0 }}>
              <GlowCard className="p-4 sm:p-5 flex items-center gap-3 sm:gap-4 bg-white/[0.02] border-white/[0.08] hover:border-yellow-500/30 transition-all duration-300">
                <span className="text-2xl sm:text-3xl flex-shrink-0">{award.icon}</span>
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
