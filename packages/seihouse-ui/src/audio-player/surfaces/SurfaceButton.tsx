"use client";

import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { tv, type VariantProps } from "tailwind-variants";

import { cn } from "../../styles/cn";
import { focusRing } from "../../styles/variants";

/**
 * SurfaceButton — the shared round/pill button shell used by the player surface
 * controls and the arc menu nodes. Strong touch targets, the repo's glass look,
 * and the standard tap convention (lift on hover, settle on press). State is
 * data-attribute driven so callers stay declarative.
 */
const surfaceButtonStyles = tv({
  base: [
    "relative inline-flex select-none items-center justify-center gap-2 rounded-full",
    "border text-[var(--sh-color-ivory)]",
    "shadow-[inset_0_1px_0_rgba(255,255,255,0.10)] backdrop-blur-xl",
    "border-white/14 bg-white/[0.075]",
    "transition-[background,border-color,box-shadow,color,opacity,transform] duration-200 ease-out",
    "motion-safe:hover:-translate-y-0.5 hover:bg-white/[0.12]",
    "active:translate-y-px active:bg-white/[0.08]",
    "disabled:pointer-events-none aria-disabled:pointer-events-none",
    focusRing,
  ],
  variants: {
    size: {
      sm: "size-10 text-xs [&_svg]:size-4",
      md: "size-12 text-sm [&_svg]:size-5",
      lg: "size-14 text-base [&_svg]:size-5",
    },
    /** Pill shape with room for a text label next to the icon. */
    shape: {
      round: "",
      pill: "w-auto px-4",
    },
    state: {
      default: "",
      active:
        "border-[rgba(0,122,255,0.55)] bg-[rgba(0,122,255,0.16)] text-white shadow-[0_0_28px_rgba(0,122,255,0.30),inset_0_1px_0_rgba(255,255,255,0.16)]",
      inactive: "opacity-70",
      disabled: "opacity-40",
      "coming-soon": "opacity-40",
      locked: "opacity-55",
    },
  },
  defaultVariants: { size: "md", shape: "round", state: "default" },
});

export type SurfaceButtonVariantProps = VariantProps<typeof surfaceButtonStyles>;

export interface SurfaceButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">,
    SurfaceButtonVariantProps {
  icon?: LucideIcon;
  /** Optional text — switches the shell to a pill automatically. */
  label?: ReactNode;
  children?: ReactNode;
}

export const SurfaceButton = forwardRef<HTMLButtonElement, SurfaceButtonProps>(
  function SurfaceButton(
    { className, size, shape, state, icon: Icon, label, children, type = "button", ...props },
    ref,
  ) {
    const resolvedShape = shape ?? (label ? "pill" : "round");
    const isDisabled =
      state === "disabled" || state === "coming-soon" || state === "locked" || props.disabled;

    return (
      <button
        ref={ref}
        type={type}
        className={cn(surfaceButtonStyles({ size, shape: resolvedShape, state }), className)}
        aria-disabled={isDisabled || undefined}
        data-state={state ?? "default"}
        {...props}
      >
        {Icon ? <Icon aria-hidden="true" /> : null}
        {label}
        {children}
      </button>
    );
  },
);
