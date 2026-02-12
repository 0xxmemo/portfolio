/**
 * Uniform motion constants for consistent scroll-linked animations
 * Based on anime.js v4 patterns
 */

import { spring } from 'animejs'

export const MOTION = {
  // Timing
  staggerDelay: 60, // ms between items
  
  // Transforms
  slideY: {
    header: 20,   // px for headers/text
    item: 40,     // px for cards/items
  },
  slideX: {
    header: -20,  // px for headers (slide from left)
  },
  scale: {
    initial: 0.95,
    final: 1,
  },
  
  // Easing
  ease: 'outExpo' as const,
  spring: spring({ bounce: 0.3, duration: 600 }),
  
  // Duration
  duration: 600,
} as const
