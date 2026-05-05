export function initGlowCards(): void {
  const onMove = (e: MouseEvent) => {
    const target = (e.currentTarget as HTMLElement) ?? null;
    if (!target) return;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty("--gx", `${x}px`);
    target.style.setProperty("--gy", `${y}px`);
  };

  document.querySelectorAll<HTMLElement>("[data-glow-card]").forEach((el) => {
    el.addEventListener("mousemove", onMove);
  });
}
