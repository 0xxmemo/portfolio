/// <reference types="vite/client" />

declare module '*.css' {
  const content: string;
  export default content;
}

declare module 'swiper/css';
declare module 'swiper/css/effect-cards';
declare module 'swiper/css/pagination';
declare module 'swiper/css/navigation';
