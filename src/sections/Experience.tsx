import { useEffect, useRef } from "react";
import { animate } from "animejs";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import EffectCardsStack from '../lib/swiper-effects/effect-cards-stack.js';
import { MOTION } from "../lib/motion";

import 'swiper/css';
import 'swiper/css/pagination';
import '../lib/swiper-effects/effect-cards-stack.css';

interface Experience {
  title: string;
  company: string;
  url?: string;
  period: string;
  description: string;
  tags: string[];
  logo?: string;
}

const experiences: Experience[] = [
  {
    title: "Fullstack Lead",
    company: "Floor Markets",
    url: "https://www.floors.finance/",
    period: "2024 — Present",
    description: "Leading full-stack development of Floor Markets, a decentralized trading platform. Building the Floors SDK for seamless protocol interactions.",
    tags: ["TypeScript", "Next.js", "SDK", "DeFi"],
    logo: "/logos/floors.svg",
  },
  {
    title: "Senior Fullstack Lead", 
    company: "Inverter Network",
    url: "https://inverter.network",
    period: "Sept 2023 — 2024",
    description: "Led development of Inverter SDK for type-safe blockchain interactions and Controlroom, a modular full-stack Next.js application.",
    tags: ["TypeScript", "Next.js", "SDK Design", "Web3"],
    logo: "/logos/inverter.ico",
  },
  {
    title: "Founding Engineer",
    company: "Crossify",
    period: "2022 — 2023",
    description: "Built core infrastructure as the first engineer. Designed and shipped cross-chain payment gateway from zero to production.",
    tags: ["React", "Solidity", "Node.js", "Cross-chain"],
  },
  {
    title: "Frontend Intern",
    company: "Getir",
    period: "2019 — 2020", 
    description: "Early career experience at one of Turkey's fastest-growing startups, working on consumer-facing web applications at scale.",
    tags: ["React", "JavaScript", "CSS"],
  },
];

// Helper to get first letter color
function getColorForLetter(letter: string) {
  const colors = [
    "bg-purple-500/20 text-purple-400 border-purple-500/30",
    "bg-pink-500/20 text-pink-400 border-pink-500/30",
    "bg-violet-500/20 text-violet-400 border-violet-500/30",
    "bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/30",
  ];
  const index = letter.charCodeAt(0) % colors.length;
  return colors[index];
}

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

    // Swiper container: fade + slideY
    animate(el.querySelector(".swiper-container")!, {
      opacity: [0, 1],
      translateY: [MOTION.slideY.item, 0],
      duration: MOTION.duration,
      delay: 200,
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

        <div className="swiper-container flex justify-center" style={{ opacity: 0 }}>
          <Swiper
            effect="cards-stack"
            grabCursor={true}
            modules={[EffectCardsStack, Pagination]}
            pagination={{ clickable: true }}
            className="w-full max-w-sm sm:max-w-md md:max-w-lg !pb-12 swiper-cards-stack"
          >
            {experiences.map((exp, i) => (
              <SwiperSlide key={i}>
                <div className="relative bg-white/[0.12] border border-white/[0.18] rounded-2xl p-6 h-[400px] flex flex-col shadow-lg shadow-black/20 [backdrop-filter:blur(24px)] [-webkit-backdrop-filter:blur(24px)] [will-change:transform] [transform:translateZ(0)]">
                  {/* Logo */}
                  <div className="mb-4">
                    {exp.logo ? (
                      <img 
                        src={exp.logo} 
                        className="w-8 h-8 rounded object-contain" 
                        alt={exp.company} 
                      />
                    ) : (
                      <div 
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border ${getColorForLetter(exp.company[0])}`}
                      >
                        {exp.company[0]}
                      </div>
                    )}
                  </div>

                  {/* Title & Company */}
                  <h3 className="text-lg font-semibold text-white mb-1">{exp.title}</h3>
                  {exp.url ? (
                    <a 
                      href={exp.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-purple-accent hover:underline mb-2 inline-block"
                    >
                      {exp.company}
                    </a>
                  ) : (
                    <span className="text-white/70 mb-2 block">{exp.company}</span>
                  )}

                  {/* Period */}
                  <p className="text-xs text-white/40 mb-4 font-mono">{exp.period}</p>

                  {/* Description */}
                  <p className="text-white/60 leading-relaxed mb-auto text-sm">
                    {exp.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {exp.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="px-2.5 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-white/40"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
