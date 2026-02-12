import { useEffect, useRef, useState } from "react";
import { animate, stagger } from "animejs";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import EffectCardsStack from '../lib/swiper-effects/effect-cards-stack.js';
import { IconExternalLink } from "../components/Icons";
import { MOTION } from "../lib/motion";

import 'swiper/css';
import 'swiper/css/pagination';
import '../lib/swiper-effects/effect-cards-stack.css';

interface Project {
  title: string;
  description: string;
  tags: string[];
  url: string;
  logo?: string;
  category: "featured" | "sdk" | "tools";
}

const projects: Project[] = [
  // Featured Projects
  { 
    title: "Floor Markets", 
    description: "Leveraged DeFi protocol — amplify token price & yield up to 20× with floor protection. No liquidations, no interest. Redeem at market price anytime.", 
    tags: ["DeFi", "Leverage", "TypeScript", "Viem"], 
    url: "https://www.floors.finance/", 
    logo: "/logos/floors.svg", 
    category: "featured" 
  },
  { 
    title: "Controlroom", 
    description: "Modular operations dashboard for Inverter Network. Manage decentralized workflows, deploy modules, and monitor protocol state — all from one responsive interface.", 
    tags: ["Next.js", "Full-Stack", "Dashboard", "Web3"], 
    url: "https://beta.controlroom.inverter.network/", 
    logo: "/logos/controlroom.ico", 
    category: "featured" 
  },
  { 
    title: "Breadcrumb.cash", 
    description: "Decentralized InfoFi platform on Base with 2,600+ followers (10× personal account). On-chain intelligence, analytics, and a Reply Agent for X/Twitter automation.", 
    tags: ["InfoFi", "Base", "Analytics", "AI Agent"], 
    url: "https://breadcrumb.cash", 
    logo: "/logos/breadcrumb.ico", 
    category: "featured" 
  },
  { 
    title: "Levr", 
    description: "Customizable crypto launchpad on Base & BNB Chain. Staking, DAO treasury, liquidity pools, airdrop modules. Base Builder Grant winner. Sherlock-audited.", 
    tags: ["Base", "BNB", "Launchpad", "Solidity"], 
    url: "https://levr.world", 
    logo: "/logos/levr.ico",
    category: "featured" 
  },
  
  // SDKs & Libraries
  { 
    title: "Inverter SDK", 
    description: "Highly generic, type-safe SDK for composable blockchain interactions. Auto-generated types from on-chain module metadata. Powers Controlroom and third-party integrations.", 
    tags: ["TypeScript", "SDK", "Viem", "Wagmi"], 
    url: "https://github.com/InverterNetwork/sdk", 
    logo: "/logos/inverter.ico", 
    category: "sdk" 
  },
  { 
    title: "Floors SDK", 
    description: "SDK for Floor Markets protocol — handles leveraged positions, floor price calculations, and redemption flows with full type safety.", 
    tags: ["TypeScript", "SDK", "DeFi", "Ethers"], 
    url: "https://github.com/InverterNetwork/floors-sdk", 
    logo: "/logos/floors.svg", 
    category: "sdk" 
  },
  { 
    title: "Levr SDK", 
    description: "SDK for Levr launchpad protocol — staking, token launches, DAO treasury, and airdrop module interactions.", 
    tags: ["TypeScript", "SDK", "Base", "Solidity"], 
    url: "https://github.com/quantidexyz/levr-sdk", 
    logo: "/logos/levr.ico",
    category: "sdk" 
  },
  { 
    title: "Oven SDK", 
    description: "Shared SDK infrastructure layer for Quantide ecosystem. Common utilities, contract interfaces, and cross-project tooling.", 
    tags: ["TypeScript", "SDK", "Monorepo", "Infra"], 
    url: "https://github.com/quantidexyz/oven-sdk", 
    logo: "/logos/breadcrumb.ico",
    category: "sdk" 
  },
  { 
    title: "Clanker SDK", 
    description: "TypeScript SDK for Clanker token factory contracts — deploy, manage, and interact with tokenized assets on Base.", 
    tags: ["TypeScript", "SDK", "Base", "Tokens"], 
    url: "https://github.com/quantidexyz/clanker-sdk", 
    logo: "/logos/clanker.png",
    category: "sdk" 
  },
  
  // Tools & Experiments
  { 
    title: "cralph", 
    description: "AI coding agent wrapper — bash loop that orchestrates Claude/GPT for autonomous coding sessions. Think Cursor but in the terminal.", 
    tags: ["TypeScript", "AI", "CLI", "Agents"], 
    url: "https://github.com/0xxmemo/cralph", 
    logo: "/logos/ralph.png",
    category: "tools" 
  },
  { 
    title: "hono-sess", 
    description: "Lightweight session middleware for Hono framework. Cookie-based sessions with pluggable stores.", 
    tags: ["TypeScript", "Hono", "Middleware", "Auth"], 
    url: "https://github.com/0xxmemo/hono-sess", 
    logo: "/logos/hono.svg",
    category: "tools" 
  },
  { 
    title: "tanstack-effect", 
    description: "Bridge between TanStack Query and Effect-TS — type-safe async data fetching with functional error handling.", 
    tags: ["TypeScript", "TanStack", "Effect-TS"], 
    url: "https://github.com/0xxmemo/tanstack-effect", 
    logo: "/logos/tanstack.ico",
    category: "tools" 
  },
  { 
    title: "mongo-lead", 
    description: "MongoDB-based leader election for distributed Node.js services. Heartbeat-driven, zero external deps.", 
    tags: ["TypeScript", "MongoDB", "Distributed"], 
    url: "https://github.com/0xxmemo/mongo-lead", 
    logo: "/logos/mongodb.ico",
    category: "tools" 
  },
  { 
    title: "four-meme-cli", 
    description: "CLI for Four.meme token platform — snipe launches, manage positions, and interact with the bonding curve from the terminal.", 
    tags: ["TypeScript", "CLI", "DeFi", "BNB"], 
    url: "https://github.com/0xxmemo/four-meme-cli", 
    logo: "/logos/fourmeme.png",
    category: "tools" 
  },
  { 
    title: "geckoterm", 
    description: "Typed GeckoTerminal API wrapper — pool analytics, OHLCV data, token prices, and trending pairs across 200+ networks.", 
    tags: ["TypeScript", "API", "Analytics", "DeFi"], 
    url: "https://github.com/0xxmemo/geckoterm", 
    logo: "/logos/geckoterminal.png",
    category: "tools" 
  },
  { 
    title: "solmint", 
    description: "Solana token minting toolkit — create SPL tokens, set metadata, and manage mint authorities from CLI or code.", 
    tags: ["TypeScript", "Solana", "SPL", "CLI"], 
    url: "https://github.com/0xxmemo/solmint", 
    logo: "/logos/solana.png",
    category: "tools" 
  },
];

const categories = [
  { id: "featured" as const, label: "Featured" },
  { id: "sdk" as const, label: "SDKs" },
  { id: "tools" as const, label: "Tools" },
];

// Helper to get first letter color
function getColorForLetter(letter: string) {
  const colors = [
    "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    "bg-green-500/20 text-green-400 border-green-500/30",
    "bg-amber-500/20 text-amber-400 border-amber-500/30",
    "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  ];
  const index = letter.charCodeAt(0) % colors.length;
  return colors[index];
}

export function Projects({ isActive }: { isActive?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);
  const [activeCategory, setActiveCategory] = useState<"featured" | "sdk" | "tools">("featured");

  const filteredProjects = projects.filter(p => p.category === activeCategory);

  // Handle category change with animation
  const handleCategoryChange = (category: typeof activeCategory) => {
    if (category === activeCategory) return;
    
    const el = sectionRef.current;
    if (!el) return;

    // Fade out current swiper
    animate(el.querySelector(".swiper-container")!, {
      opacity: [1, 0],
      duration: 200,
      complete: () => {
        setActiveCategory(category);
        // Fade in new swiper
        setTimeout(() => {
          animate(el.querySelector(".swiper-container")!, {
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 400,
            ease: MOTION.ease,
          });
        }, 50);
      },
    });
  };

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

    // Category tabs: fade + slideY
    animate(el.querySelectorAll(".category-tab"), {
      opacity: [0, 1],
      translateY: [MOTION.slideY.header, 0],
      duration: MOTION.duration,
      delay: stagger(MOTION.staggerDelay / 2),
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
          style={{ color: "#22c55e", opacity: 0 }}
        >
          // Projects
        </h2>

        {/* Category Tabs */}
        <div className="flex gap-2 sm:gap-3 mb-6 sm:mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`category-tab px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeCategory === cat.id
                  ? "bg-green-accent/20 text-green-accent border border-green-accent/30"
                  : "bg-white/[0.02] text-white/40 border border-white/10 hover:bg-white/[0.05] hover:text-white/60"
              }`}
              style={{ opacity: 0 }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Swiper Cards */}
        <div className="swiper-container flex justify-center" style={{ opacity: 0 }}>
          <Swiper
            key={activeCategory}
            effect="cards-stack"
            grabCursor={true}
            modules={[EffectCardsStack, Pagination]}
            pagination={{ clickable: true }}
            className="w-full max-w-sm sm:max-w-md md:max-w-lg !pb-12 swiper-cards-stack"
          >
            {filteredProjects.map((project) => (
              <SwiperSlide key={project.title}>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative bg-white/[0.12] border border-white/[0.18] rounded-2xl p-6 h-[400px] flex flex-col hover:border-green-accent/30 transition-all duration-300 group shadow-lg shadow-black/20 [backdrop-filter:blur(24px)] [-webkit-backdrop-filter:blur(24px)] [will-change:transform] [transform:translateZ(0)]"
                >
                  {/* Logo */}
                  <div className="mb-4">
                    {project.logo ? (
                      <img 
                        src={project.logo} 
                        className="w-8 h-8 rounded object-contain" 
                        alt={project.title} 
                      />
                    ) : (
                      <div 
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border ${getColorForLetter(project.title[0])}`}
                      >
                        {project.title[0]}
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-white group-hover:text-green-400 transition-colors">
                      {project.title}
                    </h3>
                    <IconExternalLink className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors flex-shrink-0" />
                  </div>

                  {/* Description */}
                  <p className="text-white/60 leading-relaxed mb-auto text-sm">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span 
                        key={tag} 
                        className="px-2.5 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-white/40"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="px-2.5 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-white/40">
                        +{project.tags.length - 4}
                      </span>
                    )}
                  </div>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
