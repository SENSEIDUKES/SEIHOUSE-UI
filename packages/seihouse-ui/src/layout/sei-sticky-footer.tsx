import type { ElementType, HTMLAttributes } from "react";

import { cn } from "../styles/cn";
import { seiLayer } from "../styles/layering";

type SEIStickyFooterElement = "div" | "footer";

export interface SEIStickyFooterProps extends HTMLAttributes<HTMLElement> {
  /** Polymorphic root (default `footer`). */
  as?: SEIStickyFooterElement;
}

/**
 * Sticky bottom action region with a frosted-glass surface.
 *
 * Sticks to the bottom of its scroll container and pads for the device bottom
 * safe-area inset so controls clear the home indicator on mobile.
 */
export function SEIStickyFooter({
  as = "footer",
  className,
  children,
  ...props
}: SEIStickyFooterProps) {
  const Component = as as ElementType;

  return (
    <Component
      className={cn(
        "sticky bottom-0",
        seiLayer.sticky,
        "border-t border-[var(--sh-glass-border)] bg-[var(--sh-glass-bg)] backdrop-blur-[var(--sh-blur-md)]",
        "px-4 pt-3",
        "pb-[calc(0.75rem+var(--sh-safe-bottom))]",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
