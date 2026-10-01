export function initTheme(): void {
  const selector = document.querySelector<HTMLSelectElement>("[data-theme-selector]");
  const control = document.querySelector<HTMLElement>(".theme-control");
  if (!selector || !control) return;

  selector.value = document.documentElement.dataset.theme ?? "system";
  control.hidden = false;
  selector.addEventListener("change", () => {
    const preference = selector.value;
    if (preference === "light" || preference === "dark") document.documentElement.dataset.theme = preference;
    else delete document.documentElement.dataset.theme;
    try {
      if (preference === "system") localStorage.removeItem("portfolio-theme");
      else localStorage.setItem("portfolio-theme", preference);
    } catch {
      // The selected theme still works for this visit when storage is blocked.
    }
  });

  window.addEventListener("storage", (event) => {
    if (event.key !== "portfolio-theme" && event.key !== null) return;
    const preference = event.newValue;
    if (preference === "light" || preference === "dark") document.documentElement.dataset.theme = preference;
    else delete document.documentElement.dataset.theme;
    selector.value = document.documentElement.dataset.theme ?? "system";
  });
}
