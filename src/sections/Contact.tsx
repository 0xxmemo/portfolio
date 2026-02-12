import { useEffect, useRef } from "react";
import { animate } from "animejs";
import { ShimmerButton } from "../components/ShimmerButton";
import { IconCalendar } from "../components/Icons";
import { MOTION } from "../lib/motion";

export function Contact({ isActive = false }: { isActive?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isActive || hasAnimated.current) return;
    const el = sectionRef.current;
    if (!el) return;
    hasAnimated.current = true;

    // Make section visible
    el.style.opacity = "1";

    // Heading: fade + slideY
    animate(el.querySelector(".contact-heading")!, {
      opacity: [0, 1],
      translateY: [MOTION.slideY.header, 0],
      duration: MOTION.duration,
      ease: MOTION.ease,
    });

    // Subtitle: fade + slideY
    animate(el.querySelector(".contact-subtitle")!, {
      opacity: [0, 1],
      translateY: [MOTION.slideY.header, 0],
      duration: MOTION.duration,
      ease: MOTION.ease,
      delay: 100,
    });

    // CTA button: fade + slideY + scale
    animate(el.querySelector(".contact-cta")!, {
      opacity: [0, 1],
      translateY: [MOTION.slideY.item, 0],
      scale: [MOTION.scale.initial, MOTION.scale.final],
      duration: MOTION.duration,
      ease: MOTION.spring,
      delay: 200,
    });

    // Links: fade + slideY
    animate(el.querySelector(".contact-links")!, {
      opacity: [0, 1],
      translateY: [MOTION.slideY.header, 0],
      duration: MOTION.duration,
      ease: MOTION.ease,
      delay: 300,
    });
  }, [isActive]);

  return (
    <section ref={sectionRef} className="min-h-[60vh] flex items-center" style={{ opacity: 0 }}>
      <div className="w-full text-center">
        <h2 className="contact-heading text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4" style={{ opacity: 0 }}>
          Let's Build Together
        </h2>
        <p className="contact-subtitle text-white/40 mb-8 sm:mb-10 text-sm sm:text-base md:text-lg px-4" style={{ opacity: 0 }}>
          Open to collaborations, consulting, and interesting conversations about the future of decentralized systems.
        </p>

        <div className="contact-cta" style={{ opacity: 0 }}>
          <ShimmerButton href="https://calendar.app.google/PDhuEYSbAo4Nbc1Y6">
            <IconCalendar className="w-5 h-5 mr-2 inline" />
            Schedule a Meeting
          </ShimmerButton>
        </div>

        <p className="contact-links mt-8 text-white/20 text-xs sm:text-sm px-4" style={{ opacity: 0 }}>
          or reach out on{" "}
          <a href="https://x.com/0xxmemo" target="_blank" rel="noopener noreferrer" className="text-cyan-accent/50 hover:text-cyan-accent transition-colors">
            Twitter
          </a>{" "}
          ·{" "}
          <a href="https://t.me/x0memo" target="_blank" rel="noopener noreferrer" className="text-cyan-accent/50 hover:text-cyan-accent transition-colors">
            Telegram
          </a>
        </p>
      </div>
    </section>
  );
}
