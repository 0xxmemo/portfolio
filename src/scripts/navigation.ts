export function initNavigation(): void {
  const header = document.querySelector<HTMLElement>("[data-floating-header]");
  const menu = header?.querySelector<HTMLDetailsElement>(".mobile-menu");
  if (!header) return;

  let previousY = window.scrollY;
  let travel = 0;
  let framePending = false;
  const reveal = (): void => {
    header.removeAttribute("data-hidden");
    travel = 0;
  };

  const update = (): void => {
    const y = Math.max(0, Math.min(window.scrollY, document.documentElement.scrollHeight - window.innerHeight));
    const delta = y - previousY;
    header.toggleAttribute("data-scrolled", y > 60);
    if (y < 120 || menu?.open || header.matches(":focus-within")) reveal();
    else {
      if (Math.sign(delta) !== Math.sign(travel)) travel = 0;
      travel += delta;
      if (travel > 24) header.setAttribute("data-hidden", "");
      else if (travel < -12) reveal();
    }
    previousY = y;
    framePending = false;
  };

  window.addEventListener("scroll", () => {
    if (!framePending) {
      framePending = true;
      requestAnimationFrame(update);
    }
  }, { passive: true });
  header.addEventListener("focusin", reveal);
  menu?.addEventListener("toggle", () => { if (menu.open) reveal(); });
  update();

  const links = Array.from(header.querySelectorAll<HTMLAnchorElement>("[data-nav-section]"));
  const observer = new IntersectionObserver((entries) => {
    const active = entries.find((entry) => entry.isIntersecting)?.target.id;
    if (!active) return;
    links.forEach((link) => {
      if (link.dataset.navSection === active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }, { rootMargin: "-15% 0px -65% 0px" });
  // Observing all sections clears the highlight outside the three nav targets.
  document.querySelectorAll<HTMLElement>("main section[id]").forEach((section) => observer.observe(section));
}
