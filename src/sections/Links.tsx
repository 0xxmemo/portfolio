import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { GlowCard } from "../components/GlowCard";
import { IconTwitter, IconGitHub, IconLinkedIn, IconTelegram, IconMedium, IconZora } from "../components/Icons";
import { MOTION } from "../lib/motion";
import type { ReactNode } from "react";

const links: { name: string; url: string; icon: ReactNode; color: string }[] = [
  { name: "Twitter / X", url: "https://x.com/0xxmemo", icon: <IconTwitter />, color: "hover:text-white" },
  { name: "GitHub", url: "https://github.com/0xxmemo", icon: <IconGitHub />, color: "hover:text-white" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/mehmet-guleryuz-9a7381206/", icon: <IconLinkedIn />, color: "hover:text-blue-400" },
  { name: "Telegram", url: "https://t.me/x0memo", icon: <IconTelegram />, color: "hover:text-sky-400" },
  { name: "Medium", url: "https://medium.com/@0xxmemo", icon: <IconMedium />, color: "hover:text-white" },
  { name: "Zora", url: "https://zora.co/@0xmemo", icon: <IconZora />, color: "hover:text-white" },
];

export function Links({ isActive = false }: { isActive?: boolean }) {
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

    // Link cards: stagger fade + slideY + scale
    animate(el.querySelectorAll(".link-card"), {
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
          style={{ color: "#ec4899", opacity: 0 }}
        >
          // Connect
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
          {links.map((link) => (
            <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="link-card" style={{ opacity: 0 }}>
              <GlowCard className={`p-4 sm:p-5 md:p-6 flex flex-col items-center gap-2 sm:gap-3 text-white/40 ${link.color} transition-colors duration-300 cursor-pointer`}>
                <div className="text-xl sm:text-2xl">{link.icon}</div>
                <span className="text-xs sm:text-sm font-medium text-center">{link.name}</span>
              </GlowCard>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
