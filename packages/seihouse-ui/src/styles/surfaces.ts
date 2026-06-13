import { tv, type VariantProps } from "tailwind-variants";

/**
 * SEIHOUSE-UI surface, elevation, glass, and glow utilities (Phase 6).
 *
 * These consolidate the surface / blur / glow Tailwind strings that were
 * previously duplicated across primitives and particles. Components and the
 * Foundation Diagnostics area consume them so the visual language stays in one
 * place while the brand is still being defined.
 */

/** Base surface tones — the background + border language shared by containers. */
export const seiSurfaceVariants = tv({
  base: "border",
  variants: {
    surface: {
      base: "border-white/10 bg-[var(--sh-surface-base)] text-[var(--sh-color-ivory)]",
      elevated: "border-white/10 bg-[var(--sh-surface-elevated)] text-[var(--sh-color-ivory)]",
      raised: "border-white/12 bg-[var(--sh-surface-raised)] text-[var(--sh-color-ivory)]",
      glass:
        "border-[var(--sh-glass-border)] bg-[var(--sh-glass-bg)] text-white backdrop-blur-[var(--sh-blur-md)]",
      sunken: "border-black/30 bg-[rgba(0,0,0,0.28)] text-[var(--sh-color-cloud)]",
    },
    elevation: {
      0: "shadow-none",
      1: "shadow-[var(--sh-elevation-1)]",
      2: "shadow-[var(--sh-elevation-2)]",
      3: "shadow-[var(--sh-elevation-3)]",
      4: "shadow-[var(--sh-elevation-4)]",
      5: "shadow-[var(--sh-elevation-5)]",
    },
    glow: {
      none: "",
      sea: "shadow-[var(--sh-glow-sea)]",
      accent: "shadow-[var(--sh-glow-accent)]",
    },
  },
  defaultVariants: {
    surface: "base",
    elevation: 2,
    glow: "none",
  },
});

export type SEISurfaceVariantProps = VariantProps<typeof seiSurfaceVariants>;

/** Frosted-glass treatment — apply on top of any background. */
export const seiGlass =
  "border border-[var(--sh-glass-border)] bg-[var(--sh-glass-bg)] backdrop-blur-[var(--sh-blur-md)]";

/** Soft sea glow for emphasis (artwork, active states). */
export const seiGlowSea = "shadow-[var(--sh-glow-sea)]";

/** Soft accent glow. */
export const seiGlowAccent = "shadow-[var(--sh-glow-accent)]";
