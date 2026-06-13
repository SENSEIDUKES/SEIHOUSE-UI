import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "../styles/cn";

type SEISplitStackBreakpoint = "md" | "lg";

const stackGridClasses: Record<SEISplitStackBreakpoint, string> = {
  md: "grid-cols-1 md:grid-cols-[var(--sh-split-start)_1fr]",
  lg: "grid-cols-1 lg:grid-cols-[var(--sh-split-start)_1fr]",
};

const gapClasses = {
  none: "gap-0",
  sm: "gap-3",
  md: "gap-4",
  lg: "gap-6",
} as const;

export interface SEISplitPaneProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /** Leading region (list / sidebar). */
  start: ReactNode;
  /** Trailing region (detail / content). */
  end: ReactNode;
  /** Fixed width of the start column at/above the breakpoint. */
  startWidth?: string;
  /** Gap between the two regions. */
  gap?: keyof typeof gapClasses;
  /** Breakpoint below which the panes stack vertically. */
  stackOn?: SEISplitStackBreakpoint;
}

/**
 * Static two-region split layout built on CSS grid.
 *
 * NOTE: Draggable / user-resizable splitter is intentionally deferred. This
 * primitive renders a fixed `startWidth` column only. A future revision may add
 * a draggable handle (pointer events + ResizeObserver) without changing this
 * component's external shape.
 */
export function SEISplitPane({
  start,
  end,
  startWidth = "320px",
  gap = "md",
  stackOn = "md",
  className,
  style,
  ...props
}: SEISplitPaneProps) {
  return (
    <div
      className={cn(
        "grid w-full",
        stackGridClasses[stackOn],
        gapClasses[gap],
        className,
      )}
      style={{ ["--sh-split-start" as string]: startWidth, ...style }}
      {...props}
    >
      <div className="min-w-0">{start}</div>
      <div className="min-w-0">{end}</div>
    </div>
  );
}
