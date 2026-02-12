import { cn } from "../lib/utils";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  href?: string;
}

export function ShimmerButton({ children, className, href }: Props) {
  const Tag = href ? "a" : "button";
  return (
    <Tag
      href={href}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      className={cn(
        "relative inline-flex items-center justify-center px-5 sm:px-8 py-3 sm:py-4 text-sm sm:text-base rounded-xl font-semibold text-white overflow-hidden",
        "bg-gradient-to-r from-accent/20 to-accent-dark/20",
        "border border-accent/30 hover:border-accent/60",
        "transition-all duration-300 group",
        "animate-[pulse-glow_3s_ease-in-out_infinite]",
        className
      )}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      <span className="relative z-10">{children}</span>
    </Tag>
  );
}
