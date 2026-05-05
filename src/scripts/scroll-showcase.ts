import { animate } from "animejs";
import { showcaseSections } from "../data/portfolio";
import { runSectionEnterAnimation, type SectionId } from "./section-animations";

export function initScrollShowcase(): void {
  const container = document.getElementById("showcase-scroll-container");
  if (!container) return;

  const panels = showcaseSections.map((s) => ({
    ...s,
    el: document.querySelector<HTMLElement>(`[data-showcase-panel="${s.id}"]`),
  }));

  const gradEl = document.getElementById("showcase-gradient");

  let prevIndex = 0;

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

  const applyActiveIndex = (index: number) => {
    const clamped = Math.max(0, Math.min(index, showcaseSections.length - 1));
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
      if (isActive) runSectionEnterAnimation(p.id as SectionId);
    });

    prevIndex = clamped;
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

  window.addEventListener("scroll", handleScroll, { passive: true });

  // Initial: first panel visible, first section animation
  panels.forEach((p, i) => {
    if (p.el) {
      p.el.style.opacity = i === 0 ? "1" : "0";
      p.el.style.pointerEvents = i === 0 ? "auto" : "none";
    }
  });
  updateNavDots(0);
  prevIndex = 0;
  runSectionEnterAnimation(showcaseSections[0].id as SectionId);

  handleScroll();
}
