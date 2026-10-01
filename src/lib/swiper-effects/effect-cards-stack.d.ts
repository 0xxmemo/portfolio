import type { SwiperModule } from 'swiper/types';

declare module 'swiper/types' {
  interface SwiperOptions {
    cardsStackEffect?: { slideShadows?: boolean };
  }
}

declare const EffectCardsStack: SwiperModule;
export default EffectCardsStack;
