import { useEffect, useRef, useState } from "react";
import { animate } from "animejs";
import { About } from "../sections/About";
import { Experience } from "../sections/Experience";
import { Projects } from "../sections/Projects";
import { TechStack } from "../sections/TechStack";
import { Awards } from "../sections/Awards";
import { Links } from "../sections/Links";
import { Contact } from "../sections/Contact";

const sections = [
  { id: "about", label: "// About", color: "#06b6d4", Component: About },
  { id: "experience", label: "// Experience", color: "#a855f7", Component: Experience },
  { id: "projects", label: "// Projects", color: "#22c55e", Component: Projects },
  { id: "tech", label: "// Tech Stack", color: "#f97316", Component: TechStack },
  { id: "awards", label: "// Awards & Grants", color: "#eab308", Component: Awards },
  { id: "links", label: "// Connect", color: "#ec4899", Component: Links },
  { id: "contact", label: "// Contact", color: "#f43f5e", Component: Contact },
];

function ScrollSidebar({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3">
      {sections.map((s, i) => {
        const isActive = i === activeIndex;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="group flex items-center gap-3"
          >
            <div
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                background: isActive ? s.color : "rgba(255,255,255,0.15)",
                boxShadow: isActive ? `0 0 8px ${s.color}` : "none",
                transform: isActive ? "scale(1.5)" : "scale(1)",
              }}
            />
            <span
              className="text-[10px] font-mono uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ color: isActive ? s.color : "rgba(255,255,255,0.3)" }}
            >
              {s.id}
            </span>
          </a>
        );
      })}
    </div>
  );
}

export function ScrollShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const prevIndexRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const containerTop = -rect.top;
      const containerHeight = container.scrollHeight - window.innerHeight;

      if (containerTop < 0 || containerTop > containerHeight) return;

      const totalProgress = containerTop / containerHeight;
      const sectionCount = sections.length;
      const rawIndex = totalProgress * sectionCount;
      const index = Math.min(Math.floor(rawIndex), sectionCount - 1);

      if (index !== prevIndexRef.current) {
        setActiveIndex(index);
        prevIndexRef.current = index;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animate section wrapper transitions (fade in/out + slide)
  useEffect(() => {
    sectionRefs.current.forEach((el, i) => {
      if (!el) return;

      const isActive = i === activeIndex;
      const offset = i < activeIndex ? -60 : i > activeIndex ? 60 : 0;

      animate(el, {
        opacity: isActive ? 1 : 0,
        translateY: offset,
        scale: isActive ? 1 : 0.95,
        duration: 600,
        ease: "outExpo",
      });
    });
  }, [activeIndex]);

  const currentSection = sections[activeIndex];

  return (
    <>
      <ScrollSidebar activeIndex={activeIndex} />

      <div
        ref={containerRef}
        style={{ height: `${sections.length * 100}vh` }}
        className="relative"
      >
        {sections.map((s, i) => (
          <div
            key={s.id}
            id={s.id}
            className="absolute"
            style={{ top: `${(i / sections.length) * 100}%` }}
          />
        ))}

        <div className="sticky top-0 min-h-screen flex items-center overflow-hidden py-8 sm:py-12 md:py-16">
          <div
            className="absolute inset-0 transition-opacity duration-700 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at 70% 50%, ${currentSection.color}15 0%, ${currentSection.color}08 40%, transparent 70%)`,
            }}
          />

          <div className="w-full max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 relative min-h-[70vh] flex items-center">
            {sections.map((section, i) => {
              const Component = section.Component;
              return (
                <div
                  key={section.id}
                  ref={(el) => {
                    sectionRefs.current[i] = el;
                  }}
                  className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-5 sm:px-8 lg:px-12"
                  style={{
                    opacity: i === 0 ? 1 : 0,
                    pointerEvents: i === activeIndex ? "auto" : "none",
                  }}
                >
                  <Component isActive={i === activeIndex} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
