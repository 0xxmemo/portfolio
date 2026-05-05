import { initSpaceCanvas } from "./space-canvas";
import { initHero } from "./hero";
import { initScrollShowcase } from "./scroll-showcase";
import { initGlowCards } from "./glow-cards";
import { initExperienceSwiper, initProjectsSwipers } from "./swiper-init";
import { initProjectsTabs } from "./projects-tabs";

export function initClient(): void {
  initSpaceCanvas();
  initHero();
  initGlowCards();
  initScrollShowcase();

  initExperienceSwiper();
  initProjectsSwipers();
  initProjectsTabs();
}

initClient();
