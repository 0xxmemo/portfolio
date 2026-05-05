import {
  animate,
  createTimeline,
  onScroll,
  spring,
  splitText,
  stagger,
} from "animejs";

const TYPEWRITER_WORDS = [
  "Software Architect & Engineer",
  "Senior Fullstack Lead @ Floors",
  "At the Intersection of Crypto & AI",
  "Shipping Agents, Proxies & Onchain Systems",
  "Builder from 🇹🇷 based in 🇵🇪",
];

export function initHero(): void {
  const root = document.querySelector<HTMLElement>("[data-hero-root]");
  if (!root) return;

  const heading = root.querySelector<HTMLElement>(".hero-name");
  const subtitleEl = root.querySelector<HTMLElement>(".hero-subtitle");

  const tl = createTimeline({ defaults: { ease: "outExpo" } });

  if (heading) {
    const { chars } = splitText(heading, { chars: true });
    tl.add(
      chars,
      {
        opacity: [0, 1],
        translateY: ["120%", "0%"],
        rotateX: [90, 0],
        filter: ["blur(20px)", "blur(0px)"],
        duration: 1200,
        delay: stagger(60),
        ease: spring({ bounce: 0.5, duration: 800 }),
      },
      0
    );
  }

  if (subtitleEl) {
    tl.add(
      subtitleEl,
      {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
        ease: "outExpo",
      },
      400
    );
  }

  tl.add(
    ".hero-cta",
    {
      opacity: [0, 1],
      translateY: [30, 0],
      scale: [
        { to: 1.05, duration: 300, ease: "outExpo" },
        { to: 1, ease: spring({ bounce: 0.4, duration: 400 }) },
      ],
      duration: 600,
      delay: stagger(120),
    },
    600
  );

  tl.add(
    ".hero-scroll",
    {
      opacity: [0, 1],
      duration: 1000,
    },
    800
  );

  animate(".scroll-dot", {
    translateY: [0, 8, 0],
    duration: 2000,
    loop: true,
    ease: "inOutSine",
  });

  animate(".hero-text-block", {
    translateY: [0, -150],
    opacity: [1, 0],
    scale: [1, 0.85],
    duration: 1000,
    autoplay: onScroll({
      target: root,
      enter: "top top",
      leave: "bottom top",
      sync: true,
    }),
  });

  initTypewriter(subtitleEl);
}

function initTypewriter(subtitleEl: HTMLElement | null): void {
  const span = subtitleEl?.querySelector<HTMLElement>("[data-typewriter]");
  if (!span) return;

  let wordIdx = 0;
  let charIdx = 0;
  let deleting = false;
  let timeout: ReturnType<typeof setTimeout> | undefined;

  const tick = () => {
    const word = TYPEWRITER_WORDS[wordIdx] ?? "";
    if (!deleting) {
      if (charIdx < word.length) {
        charIdx += 1;
        timeout = setTimeout(tick, 80);
      } else {
        timeout = setTimeout(() => {
          deleting = true;
          tick();
        }, 2000);
        return;
      }
    } else {
      if (charIdx > 0) {
        charIdx -= 1;
        timeout = setTimeout(tick, 40);
      } else {
        deleting = false;
        wordIdx = (wordIdx + 1) % TYPEWRITER_WORDS.length;
        timeout = setTimeout(tick, 80);
        return;
      }
    }
    span.textContent = word.slice(0, charIdx);
  };

  tick();

  window.addEventListener(
    "pagehide",
    () => clearTimeout(timeout),
    { once: true }
  );
}
