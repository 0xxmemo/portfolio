import { clampCardIndex, parseDeepLink } from "./deep-link";
import { initTheme } from "./theme";
import { initNavigation } from "./navigation";
import { initExperienceCounter } from "./experience-counter";

export function initClient(): void {
  initTheme();
  initNavigation();
  initExperienceCounter();
  const filters = document.querySelector<HTMLElement>(".project-filters");
  const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>("[data-project-filter]"));
  const cards = Array.from(document.querySelectorAll<HTMLElement>("[data-project-category]"));
  const status = document.querySelector<HTMLElement>("[data-filter-status]");
  const menu = document.querySelector<HTMLDetailsElement>(".mobile-menu");

  const setCategory = (category: string): void => {
    let visible = 0;
    cards.forEach((card) => {
      card.hidden = category !== "all" && card.dataset.projectCategory !== category;
      if (!card.hidden) visible++;
    });
    buttons.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.projectFilter === category)));
    if (status) status.textContent = `${visible} projects shown.`;
  };

  const applyLocation = (): void => {
    document.querySelectorAll("[data-deep-linked]").forEach((element) => element.removeAttribute("data-deep-linked"));
    const params = new URLSearchParams(window.location.search);
    const state = parseDeepLink();
    setCategory(params.get("tab") === "all" ? "all" : state.section === "projects" ? state.tab : "featured");
    // Ordinary visits stay at the hero; old section/tab/card URLs still resolve.
    const hasLegacyLink = ["section", "tab", "card"].some((key) => params.has(key));
    if (!hasLegacyLink || window.location.hash) return;

    let target = document.getElementById(state.section);
    if (state.section === "projects" || state.section === "experience") {
      const candidates = state.section === "projects"
        ? cards.filter((card) => card.dataset.projectCategory === state.tab)
        : Array.from(document.querySelectorAll<HTMLElement>("[data-experience-card]"));
      target = candidates[clampCardIndex(state.card, candidates.length) - 1] ?? target;
      target?.setAttribute("data-deep-linked", "");
    }
    requestAnimationFrame(() => target?.scrollIntoView({ behavior: "instant", block: "start" }));
  };

  buttons.forEach((button) => button.addEventListener("click", () => {
    const category = button.dataset.projectFilter ?? "featured";
    setCategory(category);
    const url = new URL(window.location.href);
    url.searchParams.set("section", "projects");
    if (category === "featured") url.searchParams.delete("tab");
    else url.searchParams.set("tab", category);
    url.searchParams.delete("card");
    url.hash = "projects";
    document.querySelectorAll("[data-deep-linked]").forEach((element) => element.removeAttribute("data-deep-linked"));
    window.history.pushState(null, "", url);
  }));

  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((link) => link.addEventListener("click", () => {
    if (menu) menu.open = false;
  }));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu?.open) {
      menu.open = false;
      menu.querySelector("summary")?.focus();
    }
  });
  document.addEventListener("click", (event) => {
    if (menu?.open && event.target instanceof Node && !menu.contains(event.target)) menu.open = false;
  });
  window.matchMedia("(min-width: 801px)").addEventListener("change", (event) => {
    if (event.matches && menu) menu.open = false;
  });

  if (filters) filters.hidden = false;
  applyLocation();
  window.addEventListener("popstate", applyLocation);
}

initClient();
