import { useEffect, useRef } from "react";
import { animate, createSpring } from "animejs";
import { cn } from "../lib/utils";

interface DockItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface Props {
  items: DockItem[];
}

export function Dock({ items }: Props) {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    // Entrance animation
    animate(nav, {
      translateY: [100, 0],
      opacity: [0, 1],
      duration: 800,
      delay: 1500,
      ease: "outExpo",
    });

    // Hover animations for each item
    const buttons = nav.querySelectorAll<HTMLElement>(".dock-item");
    const cleanups: (() => void)[] = [];

    buttons.forEach((btn) => {
      const enter = () => {
        animate(btn, {
          scale: 1.3,
          translateY: -8,
          duration: 300,
          ease: createSpring({ stiffness: 400, damping: 15 }),
        });
      };
      const leave = () => {
        animate(btn, {
          scale: 1,
          translateY: 0,
          duration: 300,
          ease: createSpring({ stiffness: 400, damping: 15 }),
        });
      };
      btn.addEventListener("mouseenter", enter);
      btn.addEventListener("mouseleave", leave);
      cleanups.push(() => {
        btn.removeEventListener("mouseenter", enter);
        btn.removeEventListener("mouseleave", leave);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 opacity-0 hidden md:block"
    >
      <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
        {items.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={cn(
              "dock-item relative flex items-center justify-center w-11 h-11 rounded-xl",
              "bg-white/5 hover:bg-white/10 text-white/60 hover:text-cyan-accent",
              "transition-colors group"
            )}
            title={item.label}
          >
            {item.icon}
            <span className="absolute -top-8 px-2 py-1 text-xs rounded-md bg-white/10 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {item.label}
            </span>
          </a>
        ))}
      </div>
    </nav>
  );
}
