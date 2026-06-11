/**
 * SEIHOUSE-UI reduced-motion strategy (Phase 4).
 *
 * Goal: motion is always *optional*. Every primitive and behavior component
 * must remain fully usable and understandable with motion turned off, and no
 * interaction may depend on an animation completing.
 *
 * How it works in this repo:
 * 1. Global CSS (`app/globals.css`) honours `@media (prefers-reduced-motion: reduce)`
 *    by *shortening* (not deleting) transitions/animations and disabling smooth
 *    scrolling. We shorten rather than remove so essential state-change feedback
 *    (focus rings, open/closed surfaces) still reads, just without travel.
 * 2. Components express transitions with the Tailwind utilities below. When a
 *    future motion component adds larger movement, gate it behind `motionSafe`
 *    so it only animates when the user allows motion.
 *
 * No motion library is used yet (no Motion/Framer). When one is added in a later
 * phase, it must read `prefersReducedMotion()` / the `motion-reduce:` variant and
 * fall back to an instant state change.
 */

/** Apply a transition only when the user has NOT requested reduced motion. */
export const motionSafe = "motion-safe:transition-all motion-reduce:transition-none";

/** Apply a transform-based animation only when motion is allowed. */
export const motionSafeTransform =
  "motion-safe:transition-transform motion-safe:duration-200 motion-reduce:transition-none motion-reduce:transform-none";

/** Opacity-only feedback that stays subtle under reduced motion. */
export const motionSafeFade =
  "motion-safe:transition-opacity motion-safe:duration-200 motion-reduce:transition-none";

/** Runtime check (client-only) for code paths that need to branch on the preference. */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Human-readable summary surfaced in the lab's Reduced Motion section. */
export const reducedMotionNotes = [
  "Motion is optional — every component works with animations disabled.",
  "Base primitives never hide information behind a transition.",
  "Reduced-motion preferences shorten transitions instead of removing UI feedback.",
  "Interaction never depends on an animation finishing.",
  "Future motion components must respect prefers-reduced-motion and fall back to instant state.",
] as const;
