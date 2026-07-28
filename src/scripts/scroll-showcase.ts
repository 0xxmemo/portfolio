import { animate } from "animejs";
import { showcaseSections } from "../data/portfolio";
import { runSectionEnterAnimation } from "./section-animations";
import { type SectionId, sectionIdByIndex } from "./deep-link";

interface ScrollShowcaseOptions {
  initialSection?: SectionId;
  onActiveSectionChange?: (sectionId: SectionId) => void;
}

interface SetActiveSectionOptions {
  notify?: boolean;
}

export interface ScrollShowcaseController {
  setActiveSection: (sectionId: SectionId, options?: SetActiveSectionOptions) => void;
  getActiveSection: () => SectionId;
}

export function initScrollShowcase({ initialSection, onActiveSectionChange }: ScrollShowcaseOptions = {}): ScrollShowcaseController {
  const container = document.getElementById("showcase-scroll-container");
  if (!container) {
    return {
      setActiveSection: () => {},
      getActiveSection: () => showcaseSections[0].id,
    };
  }

  const panels = showcaseSections.map((s) => ({
    ...s,
    el: document.querySelector<HTMLElement>(`[data-showcase-panel="${s.id}"]`),
  }));

  const gradEl = document.getElementById("showcase-gradient");

  const initialIndex = typeof initialSection === "string" ? showcaseSections.findIndex((s) => s.id === initialSection) : 0;

  let prevIndex = Math.max(0, Math.min(initialIndex, showcaseSections.length - 1));

  const updateNavDots = (activeIndex: number) => {
    document.querySelectorAll<HTMLElement>("[data-showcase-nav]").forEach((dot, i) => {
      const s = showcaseSections[i];
      if (!s) return;
      const on = i === activeIndex;
      dot.style.background = on ? s.color : "rgba(255,255,255,0.15)";
      dot.style.boxShadow = on ? `0 0 8px ${s.color}` : "none";
      dot.style.transform = on ? "scale(1.5)" : "scale(1)";
      const label = dot.querySelector<HTMLElement>("[data-nav-label]");
      if (label) label.style.color = on ? s.color : "rgba(255,255,255,0.3)";
    });
  };

  const applyActiveIndex = (index: number, notify = true) => {
    const clamped = Math.max(0, Math.min(index, showcaseSections.length - 1));
    const section = showcaseSections[clamped]?.id;
    if (!section) return;

    const color = showcaseSections[clamped]?.color ?? "#10b981";
    if (gradEl) {
      gradEl.style.background = `radial-gradient(ellipse at 70% 50%, ${color}15 0%, ${color}08 40%, transparent 70%)`;
    }

    updateNavDots(clamped);

    panels.forEach((p, i) => {
      if (!p.el) return;
      const isActive = i === clamped;
      const offset = i < clamped ? -60 : i > clamped ? 60 : 0;
      animate(p.el, {
        opacity: isActive ? 1 : 0,
        translateY: offset,
        scale: isActive ? 1 : 0.95,
        duration: 600,
        ease: "outExpo",
      });
      p.el.style.pointerEvents = isActive ? "auto" : "none";
      if (isActive) runSectionEnterAnimation(section);
    });

    prevIndex = clamped;

    if (notify && onActiveSectionChange) {
      onActiveSectionChange(section);
    }
  };

  const handleScroll = () => {
    const rect = container.getBoundingClientRect();
    const containerTop = -rect.top;
    const containerHeight = container.scrollHeight - window.innerHeight;

    if (containerTop < 0 || containerTop > containerHeight) return;

    const totalProgress = containerTop / containerHeight;
    const rawIndex = totalProgress * showcaseSections.length;
    const index = Math.min(Math.floor(rawIndex), showcaseSections.length - 1);

    if (index !== prevIndex) {
      applyActiveIndex(index);
    }
  };

  const setActiveSection = (sectionId: SectionId, options: SetActiveSectionOptions = {}) => {
    const targetIndex = showcaseSections.findIndex((s) => s.id === sectionId);
    const index = Math.max(0, Math.min(targetIndex, showcaseSections.length - 1));
    const shouldNotify = options.notify ?? true;
    applyActiveIndex(index, shouldNotify);
  };

  window.addEventListener("scroll", handleScroll, { passive: true });

  panels.forEach((p, i) => {
    if (p.el) {
      p.el.style.opacity = i === prevIndex ? "1" : "0";
      p.el.style.pointerEvents = i === prevIndex ? "auto" : "none";
    }
  });

  const initialSectionId = sectionIdByIndex(prevIndex);
  updateNavDots(prevIndex);
  runSectionEnterAnimation(initialSectionId);

  handleScroll();

  return {
    setActiveSection,
    getActiveSection: () => sectionIdByIndex(prevIndex),
  };
}
