import Swiper from "swiper";
import { Pagination } from "swiper/modules";
import EffectCardsStack from "../lib/swiper-effects/effect-cards-stack.js";
import { clampCardIndex, type DeepLinkState } from "./deep-link";
import { type ProjectCategory } from "./deep-link";

const SWIPER_CATS: readonly ProjectCategory[] = ["featured", "sdk", "tools"];

/** Shared feel/motion tuning for both cards-stack swipers. */
const MOTION_OPTIONS = {
  speed: 550,
  grabCursor: true,
  // Track the finger 1:1 while dragging, then settle on release.
  followFinger: true,
  // Smaller threshold so a deliberate drag engages without feeling sticky.
  threshold: 3,
  // Softer rubber-banding at the first/last card.
  resistance: true,
  resistanceRatio: 0.65,
  // A short flick past ~20% of the card still advances, so snapping
  // resolves in the direction of intent instead of springing back.
  longSwipesRatio: 0.2,
  longSwipesMs: 200,
  shortSwipes: true,
} as const;

interface SwiperInitOptions {
  getInitialExperienceCard?: () => number;
  getInitialProjectCard?: (cat: ProjectCategory) => number;
  onSlideChange?: (state: DeepLinkState) => void;
}

export interface SwiperController {
  slideToCard: (card: number) => void;
  getSlideCount: () => number;
}

export type ProjectSwipersController = {
  [key in ProjectCategory]: SwiperController | null;
};

export function initExperienceSwiper({ getInitialExperienceCard = () => 1, onSlideChange }: SwiperInitOptions = {}): SwiperController | null {
  const el = document.querySelector<HTMLElement>(".swiper-experience");
  if (!el || (el as unknown as { swiper?: unknown }).swiper) return null;

  const slideCount = el.querySelectorAll<HTMLElement>(".swiper-slide").length;
  const initialCard = clampCardIndex(getInitialExperienceCard(), slideCount);

  const swiper = new Swiper(el, {
    modules: [EffectCardsStack, Pagination],
    effect: "cards-stack",
    ...MOTION_OPTIONS,
    pagination: {
      clickable: true,
      el: el.querySelector(".swiper-pagination"),
    },
    cardsStackEffect: { slideShadows: true },
    initialSlide: initialCard - 1,
    on: {
      slideChange: () => {
        onSlideChange?.({
          section: "experience",
          tab: "featured",
          card: clampCardIndex(swiper.realIndex + 1, swiper.slides.length || 1),
        });
      },
    },
  });

  return {
    slideToCard: (card) => {
      if (swiper.slides.length === 0) return;
      swiper.slideTo(clampCardIndex(card, swiper.slides.length) - 1);
    },
    getSlideCount: () => swiper.slides.length,
  };
}

export function initProjectsSwipers({ getInitialProjectCard = () => 1, onSlideChange }: SwiperInitOptions = {}): ProjectSwipersController {
  const controllers: ProjectSwipersController = {
    featured: null,
    sdk: null,
    tools: null,
  };

  for (const cat of SWIPER_CATS) {
    const el = document.querySelector<HTMLElement>(`.swiper-projects-${cat}`);
    if (!el || (el as unknown as { swiper?: unknown }).swiper) continue;

    const slideCount = el.querySelectorAll<HTMLElement>(".swiper-slide").length;
    const initialCard = clampCardIndex(getInitialProjectCard(cat), slideCount);

    const swiper = new Swiper(el, {
      modules: [EffectCardsStack, Pagination],
      effect: "cards-stack",
      ...MOTION_OPTIONS,
      pagination: {
        clickable: true,
        el: el.querySelector(".swiper-pagination"),
      },
      cardsStackEffect: { slideShadows: true },
      initialSlide: initialCard - 1,
      on: {
        slideChange: () => {
          onSlideChange?.({
            section: "projects",
            tab: cat,
            card: clampCardIndex(swiper.realIndex + 1, swiper.slides.length || 1),
          });
        },
      },
    });

    controllers[cat] = {
      slideToCard: (card) => {
        if (swiper.slides.length === 0) return;
        swiper.slideTo(clampCardIndex(card, swiper.slides.length) - 1);
      },
      getSlideCount: () => swiper.slides.length,
    };
  }

  return controllers;
}
