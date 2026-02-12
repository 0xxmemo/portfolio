/**
 * UI Initiative Cards Stack Slider
 *
 * Cards Stack slider made with Swiper
 *
 * https://uiinitiative.com
 *
 * Copyright 2025 UI Initiative
 *
 * Released under the UI Initiative Regular License
 *
 * February 07, 2025
 */

import {
  effectVirtualTransitionEnd,
  getSlideTransformEl,
  effectInit,
  createShadow,
  effectTarget,
} from 'swiper/effect-utils';

if (typeof window !== 'undefined' && window.SwiperElementRegisterParams) {
  window.SwiperElementRegisterParams(['cardsStackEffect']);
}

export default function EffectCardsStack({ swiper, on, extendParams }) {
  extendParams({
    cardsStackEffect: {
      slideShadows: true,
    },
  });

  const setTranslate = () => {
    const { slides, rtlTranslate: rtl } = swiper;
    const params = swiper.params.cardsStackEffect;
    const R = swiper.size / 2;
    const rtlMultiplier = rtl ? -1 : 1;

    for (let i = 0; i < slides.length; i += 1) {
      const slideEl = slides[i];
      const slideProgress = slideEl.progress;
      const progress = Math.min(Math.max(slideProgress, -4), 4);
      let offset = slideEl.swiperSlideOffset;

      if (swiper.params.centeredSlides && swiper.params.cssMode) {
        offset -= slides[0].swiperSlideOffset;
      }
      let tX = swiper.params.cssMode ? -offset - swiper.translate : -offset;
      let tY = 0;
      let tZ = 0;

      let rotateX = 0;
      let rotateY = 0;
      if (progress < 0) {
        const absProgress = Math.abs(progress);
        const pathProgress = Math.min(2, absProgress);
        const pathRotate = (-pathProgress * Math.PI) / 2;
        tZ = `${R * Math.cos(pathRotate) - R}px`;
        tX = `${tX - rtlMultiplier * R * Math.sin(pathRotate)}px`;
        const rotateProgress = Math.min(4, absProgress * 2);
        rotateY = -Math.max(-180, -rotateProgress * 80);
      } else if (progress > 0) {
        const absProgress = Math.abs(progress);
        const pathProgress = Math.min(4, absProgress);
        const pathRotate = (pathProgress * Math.PI) / 4;
        tZ = `${R * Math.cos(pathRotate) - R}px`;
        tX = `${tX - rtlMultiplier * R * Math.sin(pathRotate)}px`;
        rotateY = absProgress * 20;
      } else {
        tX = `${tX}px`;
      }
      if (!swiper.isHorizontal()) {
        tY = tX;
        tX = 0;
        rotateX = -rotateY;
        rotateY = 0;
      } else if (rtl) {
        rotateY = -rotateY;
      }

      /* eslint-disable */
      const transform = `
        translate3d(${tX}, ${tY}, ${tZ})
        scale(${1})
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
      `;
      /* eslint-enable */

      if (params.slideShadows) {
        // Set shadows
        let shadowEl = slideEl.querySelector('.swiper-slide-shadow');
        if (!shadowEl) {
          shadowEl = createShadow('cards', slideEl);
        }
        if (shadowEl)
          shadowEl.style.opacity = Math.min(
            Math.max((Math.abs(progress) - 0.5) / 0.5, 0),
            1,
          );
      }

      slideEl.style.zIndex =
        -Math.abs(Math.round(slideProgress)) + slides.length;
      const targetEl = effectTarget(params, slideEl);
      targetEl.style.transform = transform;
    }
  };

  const setTransition = (duration) => {
    const transformElements = swiper.slides.map((slideEl) =>
      getSlideTransformEl(slideEl),
    );
    transformElements.forEach((el) => {
      el.style.transitionDuration = `${duration}ms`;
      el.querySelectorAll('.swiper-slide-shadow').forEach((shadowEl) => {
        shadowEl.style.transitionDuration = `${duration}ms`;
      });
    });

    effectVirtualTransitionEnd({ swiper, duration, transformElements });
  };
  effectInit({
    effect: 'cards-stack',
    swiper,
    on,
    setTranslate,
    setTransition,
    perspective: () => true,
    overwriteParams: () => ({
      centeredSlides: true,
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 0,
      loopAdditionalSlides: 1,
      watchSlidesProgress: true,
      virtualTranslate: !swiper.params.cssMode,
    }),
  });
}
