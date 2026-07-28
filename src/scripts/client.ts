import {
  DEFAULT_CARD_INDEX,
  DEFAULT_TAB_ID,
  DEFAULT_SECTION_ID,
  clampCardIndex,
  isSwiperSection,
  parseDeepLink,
  sectionIndexById,
  sectionScrollOffset,
  updateDeepLinkQuery,
  type DeepLinkState,
  type ProjectCategory,
  type SectionId,
} from "./deep-link";
import { initSpaceCanvas } from "./space-canvas";
import { initHero } from "./hero";
import { initScrollShowcase, type ScrollShowcaseController } from "./scroll-showcase";
import { initGlowCards } from "./glow-cards";
import { initExperienceSwiper, initProjectsSwipers, type ProjectSwipersController } from "./swiper-init";
import { initProjectsTabs } from "./projects-tabs";

interface SwiperCardState {
  experience: number;
  projects: Record<ProjectCategory, number>;
}

export function initClient(): void {
  initSpaceCanvas();
  initHero();
  initGlowCards();

  const container = document.getElementById("showcase-scroll-container");
  if (!container) return;

  const state: DeepLinkState = {
    ...parseDeepLink(),
    card: DEFAULT_CARD_INDEX,
  };

  let sectionsController: ScrollShowcaseController | null = null;

  let swiperState: SwiperCardState = {
    experience: 0,
    projects: {
      featured: 0,
      sdk: 0,
      tools: 0,
    },
  };

  const normalize = (sectionId: SectionId, tab: ProjectCategory, card: number): number => {
    if (sectionId === "experience") {
      return clampCardIndex(card, swiperState.experience);
    }
    if (sectionId === "projects") {
      return clampCardIndex(card, swiperState.projects[tab]);
    }
    return DEFAULT_CARD_INDEX;
  };

  const updateUrl = () => {
    updateDeepLinkQuery(state);
  };

  const tabsController = initProjectsTabs({
    initialCategory: state.tab,
    onCategoryChange: (category) => {
      state.tab = category;
      if (state.section === "projects") {
        state.card = DEFAULT_CARD_INDEX;
      }
      sectionsController?.setActiveSection(state.section, { notify: false });
      updateUrl();
    },
  });

  const experienceSwiper = initExperienceSwiper({
    getInitialExperienceCard: () => (state.section === "experience" ? state.card : DEFAULT_CARD_INDEX),
    onSlideChange: (next) => {
      if (!sectionsController || sectionsController.getActiveSection() !== "experience") return;
      state.section = next.section;
      state.card = normalize("experience", state.tab, next.card);
      updateUrl();
    },
  });

  const projectSwipers: ProjectSwipersController = initProjectsSwipers({
    getInitialProjectCard: (cat) =>
      state.section === "projects" && state.tab === cat ? state.card : DEFAULT_CARD_INDEX,
    onSlideChange: (next) => {
      if (!sectionsController || sectionsController.getActiveSection() !== "projects") return;
      const activeTab = tabsController.getActiveCategory();
      if (activeTab !== next.tab) return;

      state.section = next.section;
      state.tab = next.tab;
      state.card = normalize(next.section, next.tab, next.card);
      updateUrl();
    },
  });

  swiperState = {
    experience: experienceSwiper?.getSlideCount() ?? 0,
    projects: {
      featured: projectSwipers.featured?.getSlideCount() ?? 0,
      sdk: projectSwipers.sdk?.getSlideCount() ?? 0,
      tools: projectSwipers.tools?.getSlideCount() ?? 0,
    },
  };

  state.card = normalize(state.section, state.tab, state.card);

  sectionsController = initScrollShowcase({
    initialSection: state.section,
    onActiveSectionChange: (sectionId) => {
      state.section = sectionId;

      if (!isSwiperSection(sectionId)) {
        state.card = DEFAULT_CARD_INDEX;
        state.tab = DEFAULT_TAB_ID;
        updateUrl();
        return;
      }

      if (sectionId === "experience") {
        state.card = normalize("experience", state.tab, state.card);
        experienceSwiper?.slideToCard(state.card);
      }

      if (sectionId === "projects") {
        tabsController.setActiveCategory(state.tab, { animate: false });
        const activeTab = tabsController.getActiveCategory();
        state.tab = activeTab;
        state.card = normalize("projects", activeTab, state.card);
        projectSwipers[activeTab]?.slideToCard(state.card);
      }

      updateUrl();
    },
  });

  const applyDeepLink = (nextState: DeepLinkState, withUrl = false): void => {
    state.section = nextState.section;
    state.tab = nextState.tab;
    state.card = normalize(nextState.section, nextState.tab, nextState.card);

    sectionsController?.setActiveSection(state.section, { notify: false });

    if (state.section === "projects") {
      tabsController.setActiveCategory(state.tab, { animate: false });
      const activeTab = tabsController.getActiveCategory();
      state.tab = activeTab;
      state.card = normalize("projects", activeTab, state.card);
      projectSwipers[activeTab]?.slideToCard(state.card);
    }

    if (state.section === "experience") {
      experienceSwiper?.slideToCard(state.card);
    }

    const sectionIndex = sectionIndexById(state.section);
    const offset = sectionScrollOffset(container, sectionIndex);

    requestAnimationFrame(() => {
      window.scrollTo({ top: offset, behavior: "instant" as ScrollBehavior });
    });

    if (withUrl) {
      updateUrl();
    }
  };

  applyDeepLink(state, true);

  window.addEventListener("popstate", () => {
    applyDeepLink(parseDeepLink());
  }, false);

  if (state.section === DEFAULT_SECTION_ID) {
    updateUrl();
  }
}

initClient();
