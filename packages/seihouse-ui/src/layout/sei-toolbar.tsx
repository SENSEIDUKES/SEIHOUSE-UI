import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "../styles/cn";
import { seiLayer } from "../styles/layering";

export interface SEIToolbarProps extends HTMLAttributes<HTMLDivElement> {
  /** Accessible label for the toolbar region (required for a11y). */
  "aria-label": string;
  /** Leading slot (left-aligned). */
  start?: ReactNode;
  /** Trailing slot (right-aligned). */
  end?: ReactNode;
  /** Stick the toolbar to the top of its scroll container. */
  sticky?: boolean;
}

/** Horizontal toolbar with `role="toolbar"` and start/end slots. */
export function SEIToolbar({
  start,
  end,
  sticky = false,
  children,
  className,
  ...props
}: SEIToolbarProps) {
  return (
    <div
      role="toolbar"
      className={cn(
        "flex w-full flex-wrap items-center gap-2",
        "rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2",
        sticky &&
          cn(
            "sticky top-0",
            seiLayer.sticky,
            "bg-[var(--sh-glass-bg)] backdrop-blur-[var(--sh-blur-md)]",
          ),
        className,
      )}
      {...props}
    >
      {start ? <div className="flex items-center gap-2">{start}</div> : null}
      {children}
      {end ? <div className="ml-auto flex items-center gap-2">{end}</div> : null}
    </div>
  );
}

type SEIActionBarAlign = "start" | "between" | "end";

const actionBarAlign: Record<SEIActionBarAlign, string> = {
  start: "justify-start",
  between: "justify-between",
  end: "justify-end",
};

export interface SEIActionBarProps extends HTMLAttributes<HTMLDivElement> {
  /** Horizontal distribution of actions. */
  align?: SEIActionBarAlign;
}

/** Footer-style bar for grouping primary/secondary actions. */
export function SEIActionBar({ align = "end", children, className, ...props }: SEIActionBarProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2",
        "border-t border-white/10 pt-4",
        actionBarAlign[align],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
