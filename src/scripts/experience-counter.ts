import { getExperienceDuration } from "../lib/experience-time";

export function initExperienceCounter(): void {
  const counter = document.querySelector<HTMLElement>("[data-experience-counter]");
  if (!counter) return;
  const values = Array.from(counter.querySelectorAll<HTMLElement>("[data-experience-unit]"));
  let interval: number | undefined;

  const update = (): void => {
    const duration = getExperienceDuration();
    values.forEach((element) => {
      const unit = element.dataset.experienceUnit as keyof typeof duration;
      const next = String(duration[unit]).padStart(unit === "years" || unit === "days" ? 1 : 2, "0");
      if (element.textContent !== next) element.textContent = next;
    });
  };
  const stop = (): void => {
    window.clearInterval(interval);
    interval = undefined;
  };
  const start = (): void => {
    stop();
    update();
    if (!document.hidden) interval = window.setInterval(update, 1000);
  };

  document.addEventListener("visibilitychange", () => { if (document.hidden) stop(); else start(); });
  window.addEventListener("pagehide", stop);
  window.addEventListener("pageshow", start);
  start();
}
