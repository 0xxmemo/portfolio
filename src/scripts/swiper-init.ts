import Swiper from "swiper";
import { Pagination } from "swiper/modules";
import EffectCardsStack from "../lib/swiper-effects/effect-cards-stack.js";

export function initExperienceSwiper(): void {
  const el = document.querySelector<HTMLElement>(".swiper-experience");
  if (!el || (el as unknown as { swiper?: unknown }).swiper) return;

  new Swiper(el, {
    modules: [EffectCardsStack, Pagination],
    effect: "cards-stack",
    grabCursor: true,
    pagination: {
      clickable: true,
      el: el.querySelector(".swiper-pagination"),
    },
    cardsStackEffect: { slideShadows: true },
  });
}

export function initProjectsSwipers(): void {
  for (const cat of ["featured", "sdk", "tools"] as const) {
    const el = document.querySelector<HTMLElement>(`.swiper-projects-${cat}`);
    if (!el || (el as unknown as { swiper?: unknown }).swiper) continue;
    new Swiper(el, {
      modules: [EffectCardsStack, Pagination],
      effect: "cards-stack",
      grabCursor: true,
      pagination: {
        clickable: true,
        el: el.querySelector(".swiper-pagination"),
      },
      cardsStackEffect: { slideShadows: true },
    });
  }
}
