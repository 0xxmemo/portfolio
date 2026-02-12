import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { MOTION } from "../lib/motion";

const experiences = [
  {
    title: "Senior Fullstack Lead",
    company: "Inverter Network",
    url: "https://inverter.network",
    period: "Sept 2023 — Present",
    description:
      "Leading development of Inverter SDK for type-safe blockchain interactions and Controlroom, a modular full-stack Next.js application. Architecting highly generic, composable systems.",
    tags: ["TypeScript", "Next.js", "SDK Design", "Web3"],
  },
  {
    title: "Founding Engineer",
    company: "Crossify",
    period: "2022 — 2023",
    description:
      "Built core infrastructure as the first engineer. Designed and shipped cross-chain solutions from zero to production.",
    tags: ["React", "Solidity", "Node.js", "Cross-chain"],
  },
  {
    title: "Frontend Intern",
    company: "Getir",
    period: "2019 — 2020",
    description:
      "Early career experience at one of Turkey's fastest-growing startups, working on consumer-facing web applications at scale.",
    tags: ["React", "JavaScript", "CSS"],
  },
];

export function Experience({ isActive }: { isActive?: boolean }) {
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

    // Timeline items: stagger fade + slideY + scale
    animate(el.querySelectorAll(".timeline-item"), {
      opacity: [0, 1],
      translateY: [MOTION.slideY.item, 0],
      scale: [MOTION.scale.initial, MOTION.scale.final],
      duration: MOTION.duration,
      delay: stagger(MOTION.staggerDelay),
      ease: MOTION.spring,
    });

    // Tags within items: slight delay stagger
    animate(el.querySelectorAll(".exp-tag"), {
      opacity: [0, 1],
      translateY: [MOTION.slideY.header, 0],
      duration: MOTION.duration,
      delay: stagger(MOTION.staggerDelay / 2),
      ease: MOTION.ease,
    });
  }, [isActive]);

  return (
    <section ref={sectionRef} className="min-h-[60vh] flex items-center" style={{ opacity: 0 }}>
      <div className="w-full">
        <h2 
          className="section-header text-[10px] sm:text-xs font-mono mb-8 sm:mb-10 md:mb-12 tracking-[0.2em] sm:tracking-[0.3em] uppercase"
          style={{ color: "#a855f7", opacity: 0 }}
        >
          // Experience
        </h2>

        <div className="relative mt-8 bg-white/[0.02] rounded-2xl border border-white/[0.05] p-4 sm:p-6 md:p-8">
          <svg
            className="absolute left-[15px] sm:left-[19px] md:left-[23px] top-8 w-[2px] h-[calc(100%-4rem)] pointer-events-none"
            viewBox="0 0 2 500"
            preserveAspectRatio="none"
            style={{ overflow: "visible" }}
          >
            <defs>
              <linearGradient id="line-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="50%" stopColor="rgba(168,85,247,0.5)" />
                <stop offset="100%" stopColor="rgba(168,85,247,0.1)" />
              </linearGradient>
            </defs>
            <path
              d="M1 0 L1 500"
              stroke="url(#line-grad)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </svg>

          <div className="space-y-8 sm:space-y-10 pl-8 sm:pl-10">
            {experiences.map((exp, i) => (
              <div key={i} className="timeline-item relative" style={{ opacity: 0 }}>
                <div className="absolute -left-8 sm:-left-10 top-1.5 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-purple-accent bg-[#0a0a0a] shadow-[0_0_20px_rgba(168,85,247,0.8)]" />

                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-2">
                  <h3 className="text-base sm:text-lg font-semibold text-white">{exp.title}</h3>
                  <span className="text-white/30 hidden sm:inline">·</span>
                  {exp.url ? (
                    <a href={exp.url} target="_blank" rel="noopener noreferrer" className="text-purple-accent hover:underline text-sm sm:text-base">
                      {exp.company}
                    </a>
                  ) : (
                    <span className="text-white/60 text-sm sm:text-base">{exp.company}</span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-white/40 mb-3 font-mono">{exp.period}</p>
                <p className="text-white/60 leading-relaxed mb-4 text-sm sm:text-base">{exp.description}</p>

                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag) => (
                    <span key={tag} className="exp-tag px-2.5 py-0.5 text-xs rounded-full bg-white/5 border border-white/10 text-white/40" style={{ opacity: 0 }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
