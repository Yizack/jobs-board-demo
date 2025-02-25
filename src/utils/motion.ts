/**
 * Custom motion bindings for vueuse motion
 */
export const useMotionBinds = () => ({
  "fade-scale": {
    initial: { scale: .95, opacity: 0 },
    enter: { scale: 1, opacity: 1 }
  },
  "fade-scale-dim": {
    initial: { scale: .9, opacity: 0 },
    enter: { scale: 1, opacity: .5 }
  },
  "fade-slide-bottom": {
    initial: { opacity: 0, y: 100 },
    enter: { opacity: 1, y: 0 }
  },
  "fade-slide-bottom-dim": {
    initial: { opacity: 0, y: 50 },
    enter: { opacity: 1, y: 0 }
  },
  "fade-slide-left": {
    initial: { opacity: 0, x: -100 },
    enter: { opacity: 1, x: 0 }
  }
});
