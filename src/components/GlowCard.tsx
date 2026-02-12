import { useRef, type ReactNode, type MouseEvent } from "react";
import { cn } from "../lib/utils";

interface Props {
  children: ReactNode;
  className?: string;
}

export function GlowCard({ children, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouse = (e: MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ref.current?.style.setProperty("--gx", `${x}px`);
    ref.current?.style.setProperty("--gy", `${y}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouse}
      className={cn(
        "relative overflow-hidden group transition-all duration-300",
        "bg-white/[0.04] border border-white/[0.12] rounded-2xl",
        "hover:border-emerald-500/30 hover:shadow-[0_0_25px_rgba(16,185,129,0.08)]",
        className
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(400px circle at var(--gx, 50%) var(--gy, 50%), rgba(16,185,129,0.08), transparent 40%)",
        }}
      />
      {children}
    </div>
  );
}
