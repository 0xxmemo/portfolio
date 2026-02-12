import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { GlowCard } from "../components/GlowCard";
import { IconExternalLink } from "../components/Icons";
import { MOTION } from "../lib/motion";

const projects = [
  {
    title: "Inverter SDK",
    description: "Highly generic, type-safe SDK for blockchain interactions. Composable modules that make DeFi development seamless.",
    tags: ["TypeScript", "SDK", "Web3", "Type-Safety"],
    url: "https://inverter.network",
    gradient: "from-cyan-accent/20 to-blue-500/20",
  },
  {
    title: "Controlroom",
    description: "Full-stack Next.js application with modular architecture. Responsive dashboard for managing decentralized workflows.",
    tags: ["Next.js", "React", "Full-Stack", "Modular"],
    url: "https://inverter.network",
    gradient: "from-purple-accent/20 to-pink-500/20",
  },
  {
    title: "Breadcrumb.cash",
    description: "InfoFi platform with 2,652+ followers. On-chain intelligence and analytics for the crypto ecosystem.",
    tags: ["InfoFi", "Analytics", "DeFi", "Community"],
    url: "https://breadcrumb.cash",
    gradient: "from-amber-500/20 to-orange-500/20",
  },
  {
    title: "Levr",
    description: "Crypto launchpad built on Base. Winner of the Base Builder Grant. Fair launch infrastructure for the next wave of tokens.",
    tags: ["Base", "Launchpad", "Solidity", "DeFi"],
    url: "https://levr.world",
    gradient: "from-green-500/20 to-emerald-500/20",
  },
];

export function Projects({ isActive }: { isActive?: boolean }) {
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

    // Project cards: stagger fade + slideY + scale
    animate(el.querySelectorAll(".project-card"), {
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
          style={{ color: "#22c55e", opacity: 0 }}
        >
          // Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 mt-8">
          {projects.map((project) => (
            <a
              key={project.title}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card block group"
              style={{ opacity: 0 }}
            >
              <GlowCard className="p-4 sm:p-5 md:p-6 h-full transition-all duration-500 hover:shadow-[0_0_30px_rgba(34,197,94,0.2)] bg-white/[0.02] border-white/[0.08]">
                <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${project.gradient}`} />
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-base sm:text-lg font-semibold text-white group-hover:text-green-400 transition-colors">{project.title}</h3>
                  <IconExternalLink className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors" />
                </div>
                <p className="text-white/60 leading-relaxed mb-4 text-sm">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-white/40">{tag}</span>
                  ))}
                </div>
              </GlowCard>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
