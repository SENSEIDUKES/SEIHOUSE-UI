"use client";

import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "../styles/cn";

const gapClasses = {
  none: "gap-0",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
} as const;

const thinScrollbar = cn(
  "[scrollbar-width:thin]",
  "[&::-webkit-scrollbar]:h-2",
  "[&::-webkit-scrollbar-track]:bg-transparent",
  "[&::-webkit-scrollbar-thumb]:rounded-full",
  "[&::-webkit-scrollbar-thumb]:bg-white/15",
  "[&::-webkit-scrollbar-thumb:hover]:bg-white/25",
);

export interface SEIScrollLaneProps extends HTMLAttributes<HTMLDivElement> {
  /** Lane items (e.g. a row of cards). */
  children: ReactNode;
  /** Gap between items. */
  gap?: keyof typeof gapClasses;
  /** Enable CSS scroll-snap (children get `snap-start`). */
  snap?: boolean;
  /** Accessible label for the scroll region. */
  label?: string;
  /** Alias for `label`. */
  "aria-label"?: string;
}

/**
 * Horizontally scrolling lane — a flex row that overflows on the x-axis with a
 * thin scrollbar, optional scroll-snap, and contained overscroll. Focusable so
 * keyboard users can scroll it.
 */
export function SEIScrollLane({
  children,
  gap = "md",
  snap = false,
  label,
  "aria-label": ariaLabel,
  className,
  ...props
}: SEIScrollLaneProps) {
  return (
    <div
      role="region"
      aria-label={ariaLabel ?? label ?? "Scrollable lane"}
      tabIndex={0}
      className={cn(
        "flex overflow-x-auto overscroll-x-contain",
        gapClasses[gap],
        snap && "snap-x snap-mandatory [&>*]:snap-start",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sh-color-sea)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--sh-color-black)]",
        thinScrollbar,
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
