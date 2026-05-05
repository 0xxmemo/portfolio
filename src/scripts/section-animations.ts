import { animate, stagger } from "animejs";
import { showcaseSections } from "../data/portfolio";
import { MOTION } from "../lib/motion";

export type SectionId = (typeof showcaseSections)[number]["id"];

const ran = new Set<string>();

export function runSectionEnterAnimation(id: SectionId): void {
  if (ran.has(id)) return;
  ran.add(id);

  switch (id) {
    case "about":
      animateAbout();
      break;
    case "experience":
      animateExperience();
      break;
    case "projects":
      animateProjects();
      break;
    case "tech":
      animateTech();
      break;
    case "awards":
      animateAwards();
      break;
    case "links":
      animateLinks();
      break;
    case "contact":
      animateContact();
      break;
    default:
      break;
  }
}

function animateAbout(): void {
  const el = document.getElementById("section-about");
  if (!el) return;
  el.style.opacity = "1";

  const header = el.querySelector(".section-header");
  const card = el.querySelector(".about-card");
  const img = el.querySelector(".about-profile-img");
  const tags = el.querySelectorAll(".about-tag");

  if (header)
    animate(header, {
      opacity: [0, 1],
      translateX: [MOTION.slideX.header, 0],
      duration: MOTION.duration,
      ease: MOTION.ease,
    });
  if (card)
    animate(card, {
      opacity: [0, 1],
      translateY: [MOTION.slideY.item, 0],
      scale: [MOTION.scale.initial, MOTION.scale.final],
      duration: MOTION.duration,
      ease: MOTION.spring,
    });
  if (img)
    animate(img, {
      opacity: [0, 1],
      scale: [MOTION.scale.initial, MOTION.scale.final],
      duration: MOTION.duration,
      ease: MOTION.spring,
      delay: 100,
    });
  if (tags.length)
    animate(tags, {
      opacity: [0, 1],
      translateY: [MOTION.slideY.item, 0],
      scale: [MOTION.scale.initial, MOTION.scale.final],
      duration: MOTION.duration,
      delay: stagger(MOTION.staggerDelay),
      ease: MOTION.spring,
    });
}

function animateExperience(): void {
  const el = document.getElementById("section-experience");
  if (!el) return;
  el.style.opacity = "1";
  const header = el.querySelector(".section-header");
  const sw = el.querySelector(".swiper-container");
  if (header)
    animate(header, {
      opacity: [0, 1],
      translateX: [MOTION.slideX.header, 0],
      duration: MOTION.duration,
      ease: MOTION.ease,
    });
  if (sw)
    animate(sw, {
      opacity: [0, 1],
      translateY: [MOTION.slideY.item, 0],
      duration: MOTION.duration,
      delay: 200,
      ease: MOTION.ease,
    });
}

function animateProjects(): void {
  const el = document.getElementById("section-projects");
  if (!el) return;
  el.style.opacity = "1";
  const header = el.querySelector(".section-header");
  const tabs = el.querySelectorAll(".category-tab");
  const sw = el.querySelector(".projects-swiper-fade-wrap");
  if (header)
    animate(header, {
      opacity: [0, 1],
      translateX: [MOTION.slideX.header, 0],
      duration: MOTION.duration,
      ease: MOTION.ease,
    });
  if (tabs.length)
    animate(tabs, {
      opacity: [0, 1],
      translateY: [MOTION.slideY.header, 0],
      duration: MOTION.duration,
      delay: stagger(MOTION.staggerDelay / 2),
      ease: MOTION.ease,
    });
  if (sw)
    animate(sw, {
      opacity: [0, 1],
      translateY: [MOTION.slideY.item, 0],
      duration: MOTION.duration,
      delay: 200,
      ease: MOTION.ease,
    });
}

function animateTech(): void {
  const el = document.getElementById("section-tech");
  if (!el) return;
  el.style.opacity = "1";
  const h = el.querySelector(".section-header");
  const sub = el.querySelector(".tech-subtitle");
  const content = el.querySelector(".techstack-content");
  if (h)
    animate(h, {
      opacity: [0, 1],
      translateX: [MOTION.slideX.header, 0],
      duration: MOTION.duration,
      ease: MOTION.ease,
    });
  if (sub)
    animate(sub, {
      opacity: [0, 1],
      translateY: [MOTION.slideY.header, 0],
      duration: MOTION.duration,
      ease: MOTION.ease,
    });
  if (content)
    animate(content, {
      opacity: [0, 1],
      translateY: [MOTION.slideY.item, 0],
      scale: [MOTION.scale.initial, MOTION.scale.final],
      duration: MOTION.duration,
      ease: MOTION.spring,
    });
}

function animateAwards(): void {
  const el = document.getElementById("section-awards");
  if (!el) return;
  el.style.opacity = "1";
  const h = el.querySelector(".section-header");
  const cards = el.querySelectorAll(".award-card");
  if (h)
    animate(h, {
      opacity: [0, 1],
      translateX: [MOTION.slideX.header, 0],
      duration: MOTION.duration,
      ease: MOTION.ease,
    });
  if (cards.length)
    animate(cards, {
      opacity: [0, 1],
      translateY: [MOTION.slideY.item, 0],
      scale: [MOTION.scale.initial, MOTION.scale.final],
      duration: MOTION.duration,
      delay: stagger(MOTION.staggerDelay),
      ease: MOTION.spring,
    });
}

function animateLinks(): void {
  const el = document.getElementById("section-links");
  if (!el) return;
  el.style.opacity = "1";
  const h = el.querySelector(".section-header");
  const cards = el.querySelectorAll(".link-card");
  if (h)
    animate(h, {
      opacity: [0, 1],
      translateX: [MOTION.slideX.header, 0],
      duration: MOTION.duration,
      ease: MOTION.ease,
    });
  if (cards.length)
    animate(cards, {
      opacity: [0, 1],
      translateY: [MOTION.slideY.item, 0],
      scale: [MOTION.scale.initial, MOTION.scale.final],
      duration: MOTION.duration,
      delay: stagger(MOTION.staggerDelay),
      ease: MOTION.spring,
    });
}

function animateContact(): void {
  const el = document.getElementById("section-contact");
  if (!el) return;
  el.style.opacity = "1";
  const heading = el.querySelector(".contact-heading");
  const sub = el.querySelector(".contact-subtitle");
  const cta = el.querySelector(".contact-cta");
  const links = el.querySelector(".contact-links");
  if (heading)
    animate(heading, {
      opacity: [0, 1],
      translateY: [MOTION.slideY.header, 0],
      duration: MOTION.duration,
      ease: MOTION.ease,
    });
  if (sub)
    animate(sub, {
      opacity: [0, 1],
      translateY: [MOTION.slideY.header, 0],
      duration: MOTION.duration,
      ease: MOTION.ease,
      delay: 100,
    });
  if (cta)
    animate(cta, {
      opacity: [0, 1],
      translateY: [MOTION.slideY.item, 0],
      scale: [MOTION.scale.initial, MOTION.scale.final],
      duration: MOTION.duration,
      ease: MOTION.spring,
      delay: 200,
    });
  if (links)
    animate(links, {
      opacity: [0, 1],
      translateY: [MOTION.slideY.header, 0],
      duration: MOTION.duration,
      ease: MOTION.ease,
      delay: 300,
    });
}
