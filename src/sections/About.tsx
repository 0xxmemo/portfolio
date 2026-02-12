import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { GlowCard } from "../components/GlowCard";
import { IconMapPin } from "../components/Icons";
import { MOTION } from "../lib/motion";

export function About({ isActive }: { isActive?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isActive || hasAnimated.current) return;
    const el = sectionRef.current;
    if (!el) return;
    hasAnimated.current = true;

    // Make section visible before animating children
    el.style.opacity = "1";

    // Header: simple fade + slideX
    animate(el.querySelector(".section-header")!, {
      opacity: [0, 1],
      translateX: [MOTION.slideX.header, 0],
      duration: MOTION.duration,
      ease: MOTION.ease,
    });

    // Card: fade + slideY + scale
    animate(el.querySelector(".about-card")!, {
      opacity: [0, 1],
      translateY: [MOTION.slideY.item, 0],
      scale: [MOTION.scale.initial, MOTION.scale.final],
      duration: MOTION.duration,
      ease: MOTION.spring,
    });

    // Profile image: fade + scale (simple)
    animate(el.querySelector(".about-profile-img")!, {
      opacity: [0, 1],
      scale: [MOTION.scale.initial, MOTION.scale.final],
      duration: MOTION.duration,
      ease: MOTION.spring,
      delay: 100,
    });

    // Tags: stagger fade + slideY + scale
    animate(el.querySelectorAll(".about-tag"), {
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
          style={{ color: "#00f0ff", opacity: 0 }}
        >
          // About
        </h2>

        <div className="about-card mt-8" style={{ opacity: 0 }}>
          <GlowCard className="p-6 sm:p-10 bg-white/[0.02] border-white/[0.08]">
            <div className="flex flex-col sm:flex-row gap-8 items-start">
              <div className="flex-shrink-0 mx-auto sm:mx-0">
                <div className="relative w-32 h-32 sm:w-40 sm:h-40">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-accent/30 to-purple-accent/30 blur-xl" />
                  <img
                    src="/profile.jpg"
                    alt="0xMemo - Mehmet Guleryuz"
                    className="about-profile-img relative w-full h-full rounded-full object-cover border-2 border-cyan-accent/30"
                    style={{ opacity: 0 }}
                  />
                </div>
              </div>

              <div className="space-y-6 flex-1">
                <div className="flex items-center gap-2 text-white/40 text-sm">
                  <IconMapPin className="w-4 h-4" />
                  <span>Cusco, Peru · Turkish origin</span>
                </div>

                <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed">
                  Software Architect & Engineer crafting the infrastructure layer for decentralized systems. Currently leading full-stack development at{" "}
                  <a href="https://www.floors.finance/" target="_blank" rel="noopener noreferrer" className="text-cyan-accent hover:underline">
                    Floor Markets
                  </a>
                  , building a leveraged DeFi protocol with built-in floor protection — no liquidations, no interest.
                </p>

                <p className="text-sm sm:text-base text-white/60 leading-relaxed">
                  Previously led SDK architecture at Inverter Network and shipped a cross-chain payment gateway as founding engineer at Crossify. Koc University graduate — ETH Global Istanbul winner, Solana grant recipient, Base Builder grantee. I build things that ship.
                </p>

                <div className="flex flex-wrap gap-3 pt-4">
                  {["TypeScript", "React", "Next.js", "Solidity", "Node.js", "Web3"].map((tag) => (
                    <span key={tag} className="about-tag px-3 py-1.5 text-sm rounded-full bg-white/5 border border-white/10 text-white/50" style={{ opacity: 0 }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </GlowCard>
        </div>
      </div>
    </section>
  );
}
