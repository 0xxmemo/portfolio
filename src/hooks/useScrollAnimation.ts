import { useEffect, useRef, type RefObject } from "react";
import { animate, onScroll, stagger, type AnimationParams } from "animejs";

interface ScrollAnimConfig {
  targets: string;
  animation: Partial<AnimationParams>;
  sync?: boolean;
  enter?: string;
  leave?: string;
  staggerDelay?: number;
}

export function useScrollAnimations(
  configs: ScrollAnimConfig[]
): RefObject<HTMLElement | null> {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const anims = configs.map((cfg) => {
      const targets = el.querySelectorAll(cfg.targets);
      if (!targets.length) return null;

      return animate(targets, {
        ...cfg.animation,
        ...(cfg.staggerDelay ? { delay: stagger(cfg.staggerDelay) } : {}),
        autoplay: onScroll({
          target: el,
          enter: cfg.enter || "bottom-=100 top",
          leave: cfg.leave || "top bottom",
          ...(cfg.sync ? { sync: true } : {}),
        }),
      });
    });

    return () => {
      anims.forEach((a) => a?.pause());
    };
  }, []);

  return ref;
}
