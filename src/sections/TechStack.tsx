import { useEffect, useRef } from "react";
import { animate } from "animejs";
import { Marquee } from "../components/Marquee";
import { MOTION } from "../lib/motion";

const techRow1 = [
  "TypeScript", "React", "Next.js", "Node.js", "Solidity",
  "Viem", "Wagmi", "Ethers.js", "Tailwind CSS", "PostgreSQL",
];
const techRow2 = [
  "GraphQL", "tRPC", "Prisma", "Docker", "AWS",
  "Vercel", "Hardhat", "Foundry", "The Graph", "IPFS",
];

function TechPill({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/[0.05] border border-white/[0.15] text-white/70 text-xs sm:text-sm whitespace-nowrap hover:border-emerald-500/40 hover:text-emerald-400/90 transition-all duration-300">
      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-r from-emerald-500/60 to-emerald-400/60" />
      {name}
    </div>
  );
}

export function TechStack({ isActive }: { isActive?: boolean }) {
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

    // Subtitle: fade + slideY
    animate(el.querySelector(".tech-subtitle")!, {
      opacity: [0, 1],
      translateY: [MOTION.slideY.header, 0],
      duration: MOTION.duration,
      ease: MOTION.ease,
    });

    // Content container: fade + slideY + scale
    animate(el.querySelector(".techstack-content")!, {
      opacity: [0, 1],
      translateY: [MOTION.slideY.item, 0],
      scale: [MOTION.scale.initial, MOTION.scale.final],
      duration: MOTION.duration,
      ease: MOTION.spring,
    });
  }, [isActive]);

  return (
    <section ref={sectionRef} className="min-h-[60vh] flex items-center" style={{ opacity: 0 }}>
      <div className="w-full">
        <h2 
          className="section-header text-[10px] sm:text-xs font-mono mb-8 sm:mb-10 md:mb-12 tracking-[0.2em] sm:tracking-[0.3em] uppercase"
          style={{ color: "#6ee7b7", opacity: 0 }}
        >
          // Tech Stack
        </h2>

        <p className="tech-subtitle text-white/40 mt-4 mb-8 text-xs sm:text-sm" style={{ opacity: 0 }}>
          Tools & technologies I work with daily
        </p>

        <div className="techstack-content" style={{ opacity: 0 }}>
          <div className="bg-white/[0.02] rounded-2xl border border-white/[0.05] p-4 sm:p-6 md:p-8">
            <Marquee speed={35} className="mb-4">
              {techRow1.map((t) => (
                <TechPill key={t} name={t} />
              ))}
            </Marquee>

            <Marquee speed={30} reverse>
              {techRow2.map((t) => (
                <TechPill key={t} name={t} />
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
}
