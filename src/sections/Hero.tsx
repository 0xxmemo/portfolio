import { useEffect, useRef } from "react";
import { animate, stagger, createTimeline, onScroll, spring, splitText } from "animejs";
import { TypewriterEffect } from "../components/TypewriterEffect";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Split the heading into chars for staggered spring animation
    const heading = el.querySelector<HTMLElement>(".hero-name");
    const subtitleEl = el.querySelector<HTMLElement>(".hero-subtitle");

    const tl = createTimeline({ defaults: { ease: "outExpo" } });

    if (heading) {
      const { chars } = splitText(heading, { chars: true });
      // Characters spring-bounce in from below with blur
      tl.add(chars, {
        opacity: [0, 1],
        translateY: ['120%', '0%'],
        rotateX: [90, 0],
        filter: ["blur(20px)", "blur(0px)"],
        duration: 1200,
        delay: stagger(60),
        ease: spring({ bounce: 0.5, duration: 800 }),
      }, 0);
    }

    if (subtitleEl) {
      // Simple fade-in for subtitle (TypewriterEffect handles its own animation)
      tl.add(subtitleEl, {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
        ease: "outExpo",
      }, 400);
    }

    // CTA buttons: spring pop-in
    tl.add(".hero-cta", {
      opacity: [0, 1],
      translateY: [30, 0],
      scale: [
        { to: 1.05, duration: 300, ease: "outExpo" },
        { to: 1, ease: spring({ bounce: 0.4, duration: 400 }) },
      ],
      duration: 600,
      delay: stagger(120),
    }, 600);

    // Scroll indicator fade in
    tl.add(".hero-scroll", {
      opacity: [0, 1],
      duration: 1000,
    }, 800);

    // Floating scroll indicator
    animate(".scroll-dot", {
      translateY: [0, 8, 0],
      duration: 2000,
      loop: true,
      ease: "inOutSine",
    });

    // Parallax: text block drifts up and fades as you scroll away
    animate(".hero-text-block", {
      translateY: [0, -150],
      opacity: [1, 0],
      scale: [1, 0.85],
      duration: 1000,
      autoplay: onScroll({
        target: el,
        enter: "top top",
        leave: "bottom top",
        sync: true,
      }),
    });

    return () => {
      tl.pause();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
      style={{ perspective: "1200px" }}
    >
      <div className="hero-text-block relative z-10 text-center max-w-4xl" style={{ transformStyle: "preserve-3d" }}>
        <h1
          className="hero-name text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] font-bold tracking-tight mb-6 text-white"
          style={{ perspective: "600px" }}
        >
          0xMemo
        </h1>

        <div className="hero-subtitle text-base sm:text-xl md:text-2xl lg:text-3xl text-white/50 font-light mb-8 sm:mb-12 px-4" style={{ opacity: 0 }}>
          <TypewriterEffect
            words={[
              "Software Architect & Engineer",
              "Senior Fullstack Lead @ Inverter",
              "Building the Onchain Future",
              "Web3 Builder from 🇹🇷 in 🇵🇪",
            ]}
          />
        </div>

        <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap px-4">
          <a
            href="#projects"
            className="hero-cta px-5 sm:px-8 py-2.5 sm:py-3.5 text-sm sm:text-base rounded-xl bg-accent/10 border border-accent/30 text-accent hover:bg-accent/20 transition-all duration-300 font-medium backdrop-blur-sm"
            style={{ opacity: 0 }}
          >
            View Work
          </a>
          <a
            href="https://calendar.app.google/PDhuEYSbAo4Nbc1Y6"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-cta px-5 sm:px-8 py-2.5 sm:py-3.5 text-sm sm:text-base rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:border-white/20 transition-all duration-300 font-medium backdrop-blur-sm"
            style={{ opacity: 0 }}
          >
            Book a Call →
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-16 left-1/2 -translate-x-1/2" style={{ opacity: 0 }}>
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5">
          <div className="scroll-dot w-1.5 h-1.5 rounded-full bg-white/40" />
        </div>
      </div>
    </section>
  );
}
