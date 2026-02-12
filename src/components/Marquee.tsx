import { cn } from "../lib/utils";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  reverse?: boolean;
  speed?: number;
}

export function Marquee({ children, className, reverse = false, speed = 40 }: Props) {
  return (
    <div className={cn("flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]", className)}>
      <div
        className={cn("flex shrink-0 gap-8 items-center", reverse ? "animate-[marquee-reverse_var(--duration)_linear_infinite]" : "animate-[marquee_var(--duration)_linear_infinite]")}
        style={{ "--duration": `${speed}s` } as React.CSSProperties}
      >
        {children}
        {children}
      </div>
      <style>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes marquee-reverse { from { transform: translateX(-50%); } to { transform: translateX(0); } }
      `}</style>
    </div>
  );
}
