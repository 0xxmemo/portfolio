import { animate } from "animejs";
import { MOTION } from "../lib/motion";
import { DEFAULT_TAB_ID, type ProjectCategory } from "./deep-link";

interface ProjectsTabsOptions {
  initialCategory?: ProjectCategory;
  onCategoryChange?: (next: ProjectCategory) => void;
}

interface SetCategoryOptions {
  animate?: boolean;
}

export interface ProjectsTabsController {
  setActiveCategory: (category: ProjectCategory, options?: SetCategoryOptions) => void;
  getActiveCategory: () => ProjectCategory;
}

export function initProjectsTabs({
  initialCategory = DEFAULT_TAB_ID,
  onCategoryChange,
}: ProjectsTabsOptions = {}): ProjectsTabsController {
  const root = document.getElementById("section-projects");
  if (!root) {
    return {
      setActiveCategory: () => {},
      getActiveCategory: () => DEFAULT_TAB_ID,
    };
  }

  const fadeWrap = root.querySelector<HTMLElement>(".projects-swiper-fade-wrap");
  const holders = root.querySelectorAll<HTMLElement>("[data-projects-holder]");
  const buttons = root.querySelectorAll<HTMLButtonElement>("[data-project-cat]");

  let active: ProjectCategory = initialCategory;

  const syncVisibility = (cat: ProjectCategory) => {
    holders.forEach((h) => {
      const on = h.dataset.projectsHolder === cat;
      h.classList.toggle("opacity-100", on);
      h.classList.toggle("z-10", on);
      h.classList.toggle("pointer-events-auto", on);
      h.classList.toggle("opacity-0", !on);
      h.classList.toggle("pointer-events-none", !on);
      h.classList.toggle("z-0", !on);
    });

    buttons.forEach((b) => {
      const on = (b.dataset.projectCat as ProjectCategory) === cat;
      b.classList.toggle("is-active", on);
    });
  };

  const go = (cat: ProjectCategory, options: SetCategoryOptions = {}) => {
    if (cat === active) return;

    const shouldAnimate = options.animate ?? true;

    if (!fadeWrap || !shouldAnimate) {
      active = cat;
      syncVisibility(cat);
      onCategoryChange?.(cat);
      return;
    }

    animate(fadeWrap, {
      opacity: [1, 0],
      duration: 200,
      complete: () => {
        active = cat;
        syncVisibility(cat);
        onCategoryChange?.(cat);
        setTimeout(() => {
          animate(fadeWrap, {
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 400,
            ease: MOTION.ease,
          });
        }, 50);
      },
    });
  };

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const cat = btn.dataset.projectCat as ProjectCategory;
      if (cat) go(cat);
    });
  });

  syncVisibility(active);

  return {
    setActiveCategory: (category, options = {}) => go(category, options),
    getActiveCategory: () => active,
  };
}
