import { tv, type VariantProps } from "tailwind-variants";

import { seiLayer } from "./layering";

export const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sh-color-sea)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--sh-color-black)]";

export const transitionSurface =
  "transition-[background,border-color,box-shadow,color,opacity,transform] duration-200 ease-out";

/**
 * Shared interaction-state class set (Phase 6).
 *
 * One consistent expression of the standard interaction states so every
 * interactive surface (buttons, list items, toggles, cards) reads the same:
 * hover lift / glow, pressed settle, focus-visible ring, disabled dim, and a
 * busy/loading affordance. Compose with `cn(...)`; pair with `transitionSurface`.
 */
export const interactionStates = [
  focusRing,
  "hover:border-[rgba(0,122,255,0.28)] hover:bg-white/[0.05]",
  "active:translate-y-px active:bg-white/[0.08]",
  "disabled:pointer-events-none disabled:opacity-45",
  "aria-disabled:pointer-events-none aria-disabled:opacity-45",
  "data-[selected=true]:border-[rgba(0,122,255,0.45)] data-[selected=true]:bg-[rgba(0,122,255,0.12)] data-[selected=true]:text-white",
  "aria-busy:cursor-progress",
].join(" ");

export const seiButtonVariants = tv({
  base: [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full",
    "font-semibold leading-none tracking-[-0.01em]",
    "disabled:pointer-events-none disabled:opacity-45",
    "data-[icon-only=true]:aspect-square data-[icon-only=true]:px-0",
    focusRing,
    transitionSurface,
  ],
  variants: {
    variant: {
      default:
        "border border-white/10 bg-[var(--sh-color-ivory)] text-[var(--sh-color-black)] shadow-[0_16px_40px_rgba(242,242,247,0.12)] hover:-translate-y-0.5 hover:bg-white",
      soft: "border border-[rgba(0,122,255,0.2)] bg-[var(--sh-color-sea-subtle)] text-[#8fc8ff] hover:-translate-y-0.5 hover:border-[rgba(0,122,255,0.38)] hover:bg-[rgba(0,122,255,0.14)]",
      outline:
        "border border-white/14 bg-transparent text-[var(--sh-color-ivory)] hover:-translate-y-0.5 hover:border-white/28 hover:bg-white/[0.055]",
      ghost:
        "border border-transparent bg-transparent text-[var(--sh-color-cloud)] hover:bg-white/[0.055] hover:text-white",
      solid:
        "border border-[rgba(0,122,255,0.45)] bg-[var(--sh-color-sea)] text-white shadow-[0_16px_38px_rgba(0,122,255,0.24)] hover:-translate-y-0.5 hover:bg-[#2490ff]",
      dark: "border border-white/10 bg-[#08090d] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:-translate-y-0.5 hover:border-white/20 hover:bg-[#10131a]",
      light:
        "border border-black/10 bg-white text-[#111318] shadow-[0_18px_42px_rgba(255,255,255,0.12)] hover:-translate-y-0.5 hover:bg-[#f5f5f7]",
      "glass-test":
        "border border-white/16 bg-white/[0.075] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.11)] backdrop-blur-xl hover:-translate-y-0.5 hover:bg-white/[0.12]",
      "media-test":
        "border border-[rgba(255,255,255,0.12)] bg-[linear-gradient(135deg,rgba(0,122,255,0.28),rgba(255,107,53,0.18))] text-white shadow-[0_18px_50px_rgba(0,122,255,0.12)] hover:-translate-y-0.5 hover:border-[rgba(255,255,255,0.22)]",
    },
    size: {
      sm: "h-8 px-3 text-xs",
      md: "h-10 px-4 text-sm",
      lg: "h-12 px-6 text-base",
    },
    fullWidth: {
      true: "w-full",
      false: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    fullWidth: false,
  },
});

export const seiBadgeVariants = tv({
  base: [
    "inline-flex w-fit items-center gap-1.5 whitespace-nowrap rounded-full border",
    "font-bold uppercase tracking-[0.12em] leading-none",
    transitionSurface,
  ],
  variants: {
    variant: {
      default: "border-white/10 bg-white/[0.055] text-[var(--sh-color-cloud)]",
      soft: "border-[rgba(0,122,255,0.18)] bg-[var(--sh-color-sea-subtle)] text-[#8fc8ff]",
      outline: "border-white/16 bg-transparent text-[var(--sh-color-cloud)]",
      ghost: "border-transparent bg-transparent text-[var(--sh-color-mist)]",
      solid: "border-[rgba(0,122,255,0.42)] bg-[var(--sh-color-sea)] text-white",
      dark: "border-white/10 bg-[#07080c] text-white",
      light: "border-black/10 bg-white text-[#15171c]",
      "glass-test": "border-white/14 bg-white/[0.075] text-white backdrop-blur-xl",
      "media-test": "border-[rgba(255,107,53,0.28)] bg-[rgba(255,107,53,0.12)] text-[#ffad8d]",
      success: "border-[rgba(52,199,89,0.26)] bg-[rgba(52,199,89,0.11)] text-[#8ff0aa]",
      warning: "border-[rgba(255,159,10,0.28)] bg-[rgba(255,159,10,0.12)] text-[#ffd08a]",
      danger: "border-[rgba(255,69,58,0.28)] bg-[rgba(255,69,58,0.12)] text-[#ff9b94]",
      registry:
        "border-[rgba(255,255,255,0.18)] bg-[rgba(255,255,255,0.075)] text-[var(--sh-color-ivory)]",
    },
    size: {
      sm: "min-h-6 px-2 text-[0.625rem]",
      md: "min-h-7 px-2.5 text-[0.6875rem]",
      lg: "min-h-8 px-3 text-xs",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

export const seiPanelVariants = tv({
  base: [
    "relative overflow-hidden rounded-[1.35rem] border",
    "shadow-[0_24px_70px_rgba(0,0,0,0.22)]",
    transitionSurface,
  ],
  variants: {
    variant: {
      default: "border-white/10 bg-[rgba(18,20,26,0.86)] text-[var(--sh-color-ivory)]",
      soft: "border-[rgba(0,122,255,0.16)] bg-[rgba(0,122,255,0.065)] text-[var(--sh-color-ivory)]",
      outline: "border-white/14 bg-transparent text-[var(--sh-color-ivory)]",
      ghost: "border-transparent bg-transparent shadow-none text-[var(--sh-color-ivory)]",
      solid: "border-[rgba(0,122,255,0.36)] bg-[rgba(0,122,255,0.16)] text-white",
      dark: "border-white/10 bg-[#07080c] text-white shadow-[0_28px_80px_rgba(0,0,0,0.34)]",
      light: "border-black/10 bg-[#f7f6f1] text-[#111318] shadow-[0_24px_70px_rgba(0,0,0,0.16)]",
      "glass-test":
        "border-white/14 bg-white/[0.065] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_28px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl",
      "media-test":
        "border-[rgba(255,255,255,0.12)] bg-[radial-gradient(circle_at_18%_0%,rgba(0,122,255,0.20),transparent_30rem),radial-gradient(circle_at_88%_18%,rgba(255,107,53,0.16),transparent_24rem),rgba(12,14,20,0.9)] text-white",
    },
    padding: {
      none: "p-0",
      sm: "p-4",
      md: "p-5 sm:p-6",
      lg: "p-6 sm:p-8",
    },
    interactive: {
      true: "hover:-translate-y-1 hover:border-[rgba(0,122,255,0.32)] hover:shadow-[0_32px_90px_rgba(0,0,0,0.34),0_0_38px_rgba(0,122,255,0.08)]",
      false: "",
    },
  },
  defaultVariants: {
    variant: "default",
    padding: "md",
    interactive: false,
  },
});

export const seiCardVariants = tv({
  base: [
    "group relative overflow-hidden rounded-[1.35rem] border",
    "shadow-[0_22px_62px_rgba(0,0,0,0.24)]",
    transitionSurface,
  ],
  variants: {
    variant: {
      default: "border-white/10 bg-[rgba(16,18,24,0.9)] text-[var(--sh-color-ivory)]",
      soft: "border-[rgba(0,122,255,0.16)] bg-[rgba(0,122,255,0.06)] text-[var(--sh-color-ivory)]",
      outline: "border-white/14 bg-transparent text-[var(--sh-color-ivory)]",
      ghost: "border-transparent bg-transparent shadow-none text-[var(--sh-color-ivory)]",
      solid: "border-[rgba(0,122,255,0.32)] bg-[rgba(0,122,255,0.15)] text-white",
      dark: "border-white/10 bg-[#07080c] text-white",
      light: "border-black/10 bg-white text-[#111318] shadow-[0_22px_62px_rgba(0,0,0,0.12)]",
      "glass-test": "border-white/14 bg-white/[0.065] text-white backdrop-blur-2xl",
      "media-test":
        "border-[rgba(255,255,255,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.075),rgba(255,255,255,0.025)),rgba(10,12,18,0.92)] text-white",
    },
    padding: {
      none: "p-0",
      sm: "p-4",
      md: "p-5",
      lg: "p-6",
    },
    interactive: {
      true: "hover:-translate-y-1 hover:border-[rgba(0,122,255,0.3)] hover:shadow-[0_30px_84px_rgba(0,0,0,0.34)]",
      false: "",
    },
  },
  defaultVariants: {
    variant: "default",
    padding: "md",
    interactive: false,
  },
});

export const seiSectionVariants = tv({
  base: "relative mx-auto w-full max-w-7xl",
  variants: {
    spacing: {
      sm: "py-8",
      md: "py-12",
      lg: "py-16 sm:py-20",
    },
  },
  defaultVariants: {
    spacing: "lg",
  },
});

export const registrySealVariants = tv({
  base: [
    "relative inline-flex items-center gap-3 rounded-full border px-3 py-2",
    "font-semibold leading-none",
    transitionSurface,
  ],
  variants: {
    status: {
      draft: "border-white/12 bg-white/[0.045] text-[var(--sh-color-cloud)]",
      registered: "border-[rgba(0,122,255,0.28)] bg-[rgba(0,122,255,0.10)] text-[#8fc8ff]",
      verified: "border-[rgba(52,199,89,0.32)] bg-[rgba(52,199,89,0.11)] text-[#8ff0aa]",
      archived:
        "border-[rgba(174,174,178,0.18)] bg-[rgba(174,174,178,0.08)] text-[var(--sh-color-cloud)] opacity-85",
      experimental: "border-[rgba(255,107,53,0.32)] bg-[rgba(255,107,53,0.12)] text-[#ffad8d]",
    },
    compact: {
      true: "px-2.5 py-1.5 text-xs",
      false: "text-sm",
    },
  },
  defaultVariants: {
    status: "draft",
    compact: false,
  },
});

/* ------------------------------------------------------------------ */
/* Phase 4 — promoted shared behavior variants                         */
/* These patterns were stable across the Phase 3 behavior components    */
/* (dialog / drawer / popover / command) and are now shared. Component- */
/* specific styling (drawer side/size, tabs indicator) stays local.     */
/* ------------------------------------------------------------------ */

/** Modal/drawer scrim shared by dialog, drawer, and the command palette. */
export const seiOverlayVariants = tv({
  base: [
    `fixed inset-0 ${seiLayer.overlay} bg-black/60 backdrop-blur-sm`,
    "transition-opacity duration-200 ease-out",
    "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
  ],
  variants: {
    tone: {
      default: "",
      heavy: "bg-black/75",
      soft: "bg-black/45",
    },
  },
  defaultVariants: { tone: "default" },
});

/** Floating surface tone map shared by dialog, popover, and palette popups. */
export const seiPopupSurfaceVariants = tv({
  base: "border shadow-[0_30px_90px_rgba(0,0,0,0.5)]",
  variants: {
    tone: {
      default:
        "border-white/12 bg-[rgba(18,20,26,0.97)] text-[var(--sh-color-ivory)] backdrop-blur-xl",
      soft: "border-[rgba(0,122,255,0.22)] bg-[rgba(8,16,30,0.97)] text-[var(--sh-color-ivory)] backdrop-blur-xl",
      dark: "border-white/10 bg-[#07080c] text-white",
      light: "border-black/10 bg-white text-[#111318]",
      "glass-test":
        "border-white/16 bg-white/[0.08] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_30px_90px_rgba(0,0,0,0.5)] backdrop-blur-2xl",
    },
  },
  defaultVariants: { tone: "default" },
});

/** Focused/selected item states shared by menus, comboboxes, and commands. */
export const seiInteractiveItemVariants = tv({
  base: [
    "flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-sm outline-none",
    "text-[var(--sh-color-cloud)]",
    "data-[focused]:bg-white/[0.07] data-[focused]:text-white",
    "data-[hovered]:bg-white/[0.05]",
    "data-[selected]:text-white",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-40",
  ],
});

/** Section header style for grouped menus / command palettes. */
export const seiCommandGroupHeader =
  "flex items-center gap-2 px-3 pb-1 pt-2 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[var(--sh-color-mist)]";

export type SEIButtonVariantProps = VariantProps<typeof seiButtonVariants>;
export type SEIBadgeVariantProps = VariantProps<typeof seiBadgeVariants>;
export type SEIPanelVariantProps = VariantProps<typeof seiPanelVariants>;
export type SEICardVariantProps = VariantProps<typeof seiCardVariants>;
export type SEISectionVariantProps = VariantProps<typeof seiSectionVariants>;
export type RegistrySealVariantProps = VariantProps<typeof registrySealVariants>;
export type SEIOverlayVariantProps = VariantProps<typeof seiOverlayVariants>;
export type SEIPopupSurfaceVariantProps = VariantProps<typeof seiPopupSurfaceVariants>;
