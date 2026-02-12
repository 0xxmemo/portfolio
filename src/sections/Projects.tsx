import { useEffect, useRef, useState } from "react";
import { animate, stagger } from "animejs";
import { GlowCard } from "../components/GlowCard";
import { IconExternalLink } from "../components/Icons";
import { MOTION } from "../lib/motion";

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
    description: "Decentralized trading platform with innovative floor pricing mechanics.", 
    tags: ["DeFi", "Trading", "TypeScript"], 
    url: "https://www.floors.finance/", 
    logo: "/logos/floors.svg", 
    category: "featured" 
  },
  { 
    title: "Controlroom", 
    description: "Modular dashboard for managing decentralized workflows and protocol operations.", 
    tags: ["Next.js", "Full-Stack", "Dashboard"], 
    url: "https://beta.controlroom.inverter.network/", 
    logo: "/logos/controlroom.ico", 
    category: "featured" 
  },
  { 
    title: "Breadcrumb.cash", 
    description: "InfoFi platform with 2,652+ followers. On-chain intelligence and analytics.", 
    tags: ["InfoFi", "Analytics", "Community"], 
    url: "https://breadcrumb.cash", 
    logo: "/logos/breadcrumb.ico", 
    category: "featured" 
  },
  { 
    title: "Levr", 
    description: "Customizable crypto launchpad on Base. Winner of Base Builder Grant.", 
    tags: ["Base", "Launchpad", "Solidity"], 
    url: "https://levr.world", 
    category: "featured" 
  },
  
  // SDKs & Libraries
  { 
    title: "Inverter SDK", 
    description: "Type-safe SDK for blockchain interactions. Composable modules for DeFi.", 
    tags: ["TypeScript", "SDK", "Web3"], 
    url: "https://github.com/InverterNetwork/sdk", 
    logo: "/logos/inverter.ico", 
    category: "sdk" 
  },
  { 
    title: "Floors SDK", 
    description: "SDK for Floor Markets protocol interactions.", 
    tags: ["TypeScript", "SDK", "DeFi"], 
    url: "https://github.com/InverterNetwork/floors-sdk", 
    logo: "/logos/floors.svg", 
    category: "sdk" 
  },
  { 
    title: "Levr SDK", 
    description: "SDK for Levr launchpad protocol.", 
    tags: ["TypeScript", "SDK", "Base"], 
    url: "https://github.com/quantidexyz/levr-sdk", 
    category: "sdk" 
  },
  { 
    title: "Oven SDK", 
    description: "Shared SDK infrastructure for Quantide projects.", 
    tags: ["TypeScript", "SDK", "Infra"], 
    url: "https://github.com/quantidexyz/oven-sdk", 
    category: "sdk" 
  },
  { 
    title: "Clanker SDK", 
    description: "TypeScript SDK for interacting with Clanker contracts.", 
    tags: ["TypeScript", "SDK", "Solidity"], 
    url: "https://github.com/quantidexyz/clanker-sdk", 
    category: "sdk" 
  },
  
  // Tools & Experiments
  { 
    title: "cralph", 
    description: "AI coding agent wrapper — bash loop automation for dev workflows.", 
    tags: ["TypeScript", "AI", "CLI"], 
    url: "https://github.com/0xxmemo/cralph", 
    category: "tools" 
  },
  { 
    title: "hono-sess", 
    description: "Session middleware for Hono framework.", 
    tags: ["TypeScript", "Hono", "Middleware"], 
    url: "https://github.com/0xxmemo/hono-sess", 
    category: "tools" 
  },
  { 
    title: "tanstack-effect", 
    description: "TanStack integration utilities with Effect-TS.", 
    tags: ["TypeScript", "TanStack", "Effect"], 
    url: "https://github.com/0xxmemo/tanstack-effect", 
    category: "tools" 
  },
  { 
    title: "mongo-lead", 
    description: "MongoDB leadership election and distributed coordination.", 
    tags: ["TypeScript", "MongoDB", "Distributed"], 
    url: "https://github.com/0xxmemo/mongo-lead", 
    category: "tools" 
  },
  { 
    title: "four-meme-cli", 
    description: "CLI tool for Four.meme token platform interactions.", 
    tags: ["TypeScript", "CLI", "DeFi"], 
    url: "https://github.com/0xxmemo/four-meme-cli", 
    category: "tools" 
  },
  { 
    title: "geckoterm", 
    description: "GeckoTerminal API wrapper for token analytics.", 
    tags: ["TypeScript", "API", "Analytics"], 
    url: "https://github.com/0xxmemo/geckoterm", 
    category: "tools" 
  },
  { 
    title: "solmint", 
    description: "Solana token minting utilities.", 
    tags: ["TypeScript", "Solana", "Tokens"], 
    url: "https://github.com/0xxmemo/solmint", 
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
    "bg-cyan-500/20 text-cyan-400",
    "bg-purple-500/20 text-purple-400",
    "bg-amber-500/20 text-amber-400",
    "bg-green-500/20 text-green-400",
    "bg-pink-500/20 text-pink-400",
    "bg-blue-500/20 text-blue-400",
  ];
  const index = letter.charCodeAt(0) % colors.length;
  return colors[index];
}

export function Projects({ isActive }: { isActive?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<"featured" | "sdk" | "tools">("featured");
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const filteredProjects = projects.filter(p => p.category === activeCategory);

  // Check scroll position to show/hide arrows
  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    setShowLeftArrow(container.scrollLeft > 10);
    setShowRightArrow(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    );
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    checkScroll();
    container.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    
    return () => {
      container.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [filteredProjects]);

  // Scroll handlers
  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  // Handle category change with animation
  const handleCategoryChange = (category: typeof activeCategory) => {
    if (category === activeCategory) return;
    
    const el = sectionRef.current;
    if (!el) return;

    // Fade out current cards
    animate(el.querySelectorAll(".project-card"), {
      opacity: [1, 0],
      duration: 200,
      complete: () => {
        setActiveCategory(category);
        // Fade in new cards
        setTimeout(() => {
          animate(el.querySelectorAll(".project-card"), {
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 400,
            delay: stagger(40),
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

        {/* Horizontal Scrollable Container */}
        <div className="relative">
          {/* Left Arrow */}
          {showLeftArrow && (
            <button
              onClick={scrollLeft}
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-white/5 backdrop-blur border border-white/10 hover:bg-white/10 transition-all shadow-lg"
              aria-label="Scroll left"
            >
              <svg className="w-5 h-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Right Arrow */}
          {showRightArrow && (
            <button
              onClick={scrollRight}
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-white/5 backdrop-blur border border-white/10 hover:bg-white/10 transition-all shadow-lg"
              aria-label="Scroll right"
            >
              <svg className="w-5 h-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Scrollable Cards */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 px-1"
            style={{ scrollPaddingLeft: "1rem" }}
          >
            {filteredProjects.map((project) => (
              <a
                key={project.title}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card flex-shrink-0 w-[280px] sm:w-[300px] snap-start group"
                style={{ opacity: 0 }}
              >
                <GlowCard className="p-4 sm:p-5 h-full transition-all duration-500 hover:shadow-[0_0_30px_rgba(34,197,94,0.2)] bg-white/[0.02] border-white/[0.08]">
                  <div className="flex items-start gap-3 mb-3">
                    {/* Logo or Letter Circle */}
                    {project.logo ? (
                      <img 
                        src={project.logo} 
                        className="w-6 h-6 rounded object-contain flex-shrink-0" 
                        alt={project.title} 
                      />
                    ) : (
                      <div 
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${getColorForLetter(project.title[0])}`}
                      >
                        {project.title[0]}
                      </div>
                    )}
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-base sm:text-lg font-semibold text-white group-hover:text-green-400 transition-colors truncate">
                          {project.title}
                        </h3>
                        <IconExternalLink className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors flex-shrink-0" />
                      </div>
                    </div>
                  </div>

                  <p className="text-white/60 leading-relaxed mb-4 text-sm line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span 
                        key={tag} 
                        className="px-2 py-0.5 text-xs rounded-full bg-white/5 border border-white/10 text-white/40"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="px-2 py-0.5 text-xs rounded-full bg-white/5 border border-white/10 text-white/40">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                </GlowCard>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
