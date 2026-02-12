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
      style={{
        background: "rgba(255, 255, 255, 0.05)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        borderRadius: "1rem",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
      className={cn("relative overflow-hidden group transition-all duration-300 hover:border-[rgba(0,240,255,0.3)] hover:shadow-[0_0_25px_rgba(0,240,255,0.08)]", className)}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(400px circle at var(--gx, 50%) var(--gy, 50%), rgba(0,240,255,0.08), transparent 40%)",
        }}
      />
      {children}
    </div>
  );
}
