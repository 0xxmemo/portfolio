import { cn } from "../lib/utils";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  reverse?: boolean;
  speed?: number;
}

export function Marquee({ children, className, reverse = false, speed = 40 }: Props) {
  const animClass = reverse
    ? "animate-[marquee-reverse_var(--duration)_linear_infinite]"
    : "animate-[marquee_var(--duration)_linear_infinite]";

  return (
    <div className={cn("flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]", className)}>
      <div
        className={cn("flex shrink-0 gap-8 items-center", animClass)}
        style={{ "--duration": `${speed}s` } as React.CSSProperties}
      >
        {children}
      </div>
      <div
        aria-hidden
        className={cn("flex shrink-0 gap-8 items-center", animClass)}
        style={{ "--duration": `${speed}s` } as React.CSSProperties}
      >
        {children}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% - 2rem)); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(calc(-100% - 2rem)); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
