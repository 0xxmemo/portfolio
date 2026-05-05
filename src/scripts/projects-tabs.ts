import { animate } from "animejs";
import { MOTION } from "../lib/motion";

type Cat = "featured" | "sdk" | "tools";

export function initProjectsTabs(): void {
  const root = document.getElementById("section-projects");
  if (!root) return;

  const fadeWrap = root.querySelector<HTMLElement>(".projects-swiper-fade-wrap");
  const holders = root.querySelectorAll<HTMLElement>("[data-projects-holder]");
  const buttons = root.querySelectorAll<HTMLButtonElement>("[data-project-cat]");

  let active: Cat = "featured";

  const syncVisibility = (cat: Cat) => {
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
      const on = (b.dataset.projectCat as Cat) === cat;
      b.classList.toggle("is-active", on);
    });
  };

  const go = (cat: Cat) => {
    if (cat === active) return;
    if (!fadeWrap) {
      active = cat;
      syncVisibility(cat);
      return;
    }

    animate(fadeWrap, {
      opacity: [1, 0],
      duration: 200,
      complete: () => {
        active = cat;
        syncVisibility(cat);
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
      const cat = btn.dataset.projectCat as Cat;
      if (cat) go(cat);
    });
  });

  syncVisibility(active);
}
