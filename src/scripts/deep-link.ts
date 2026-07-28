import { projectCategories, showcaseSections } from "../data/portfolio";

type SectionId = (typeof showcaseSections)[number]["id"];
type ProjectCategory = (typeof projectCategories)[number]["id"];

export type { SectionId, ProjectCategory };

export interface DeepLinkState {
  section: SectionId;
  tab: ProjectCategory;
  card: number;
}

export const DEFAULT_SECTION_ID: SectionId = showcaseSections[0].id;
export const DEFAULT_TAB_ID: ProjectCategory = projectCategories[0].id;
export const DEFAULT_CARD_INDEX = 1;

const sectionIds = new Set(showcaseSections.map((s) => s.id));
const tabIds = new Set(projectCategories.map((c) => c.id));
const swiperSections = new Set<SectionId>(["experience", "projects"]);

function isSection(value: string | null): value is SectionId {
  return !!value && sectionIds.has(value);
}

function isProjectCategory(value: string | null): value is ProjectCategory {
  return !!value && tabIds.has(value);
}

function parseCard(value: string | null): number {
  const next = Number.parseInt(value ?? "", 10);
  if (!Number.isFinite(next) || next < 1) return DEFAULT_CARD_INDEX;
  return Math.floor(next);
}

function sanitizeSection(value: string | null): SectionId {
  return isSection(value) ? value : DEFAULT_SECTION_ID;
}

function sanitizeTab(value: string | null): ProjectCategory {
  return isProjectCategory(value) ? value : DEFAULT_TAB_ID;
}

export function parseDeepLink(search = window.location.search): DeepLinkState {
  const params = new URLSearchParams(search);
  const section = sanitizeSection(params.get("section"));
  const card = parseCard(params.get("card"));

  if (section === "projects") {
    return {
      section,
      tab: sanitizeTab(params.get("tab")),
      card,
    };
  }

  if (section === "experience") {
    return {
      section,
      tab: DEFAULT_TAB_ID,
      card,
    };
  }

  return {
    section,
    tab: DEFAULT_TAB_ID,
    card: DEFAULT_CARD_INDEX,
  };
}

export function sanitizeDeepLinkState(state: DeepLinkState): DeepLinkState {
  const section = sanitizeSection(state.section);

  if (section === "projects") {
    return {
      section,
      tab: sanitizeTab(state.tab),
      card: parseCard(String(state.card)),
    };
  }

  if (section === "experience") {
    return {
      section,
      tab: DEFAULT_TAB_ID,
      card: parseCard(String(state.card)),
    };
  }

  return {
    section,
    tab: DEFAULT_TAB_ID,
    card: DEFAULT_CARD_INDEX,
  };
}

export function sectionIndexById(sectionId: SectionId): number {
  const idx = showcaseSections.findIndex((s) => s.id === sectionId);
  return Math.max(0, Math.min(idx, showcaseSections.length - 1));
}

export function sectionIdByIndex(index: number): SectionId {
  const idx = Math.max(0, Math.min(index, showcaseSections.length - 1));
  return showcaseSections[idx].id;
}

export function sectionScrollOffset(container: HTMLElement, sectionIndex: number): number {
  const containerTop = container.getBoundingClientRect().top + window.scrollY;
  const maxScroll = container.scrollHeight - window.innerHeight;

  if (maxScroll <= 0) {
    return containerTop;
  }

  const safeIndex = Math.max(0, Math.min(sectionIndex, showcaseSections.length - 1));
  return containerTop + maxScroll * ((safeIndex + 0.5) / showcaseSections.length);
}

export function isSwiperSection(section: SectionId): boolean {
  return swiperSections.has(section);
}

export function clampCardIndex(value: number, slideCount: number): number {
  if (!Number.isFinite(value) || value < 1) {
    return DEFAULT_CARD_INDEX;
  }

  if (slideCount <= 0) {
    return DEFAULT_CARD_INDEX;
  }

  return Math.max(1, Math.min(Math.floor(value), slideCount));
}

export function serializeDeepLink(state: DeepLinkState): string {
  const normalized = sanitizeDeepLinkState(state);
  const params = new URLSearchParams();

  if (normalized.section !== DEFAULT_SECTION_ID) {
    params.set("section", normalized.section);
  }

  if (normalized.section === "projects" && normalized.tab !== DEFAULT_TAB_ID) {
    params.set("tab", normalized.tab);
  }

  if (isSwiperSection(normalized.section) && normalized.card > 1) {
    params.set("card", String(normalized.card));
  }

  return params.toString();
}

export function updateDeepLinkQuery(state: DeepLinkState): void {
  const query = serializeDeepLink(state);
  const url = new URL(window.location.href);
  url.search = query ? `?${query}` : "";
  window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
}
