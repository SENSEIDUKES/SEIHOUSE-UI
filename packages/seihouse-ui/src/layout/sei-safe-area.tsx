import type { ElementType, HTMLAttributes } from "react";

import { cn } from "../styles/cn";

type SEISafeAreaEdge = "top" | "right" | "bottom" | "left";

type SEISafeAreaElement = "div" | "section" | "main" | "header" | "footer";

const edgePadding: Record<SEISafeAreaEdge, string> = {
  top: "pt-[var(--sh-safe-top)]",
  right: "pr-[var(--sh-safe-right)]",
  bottom: "pb-[var(--sh-safe-bottom)]",
  left: "pl-[var(--sh-safe-left)]",
};

const ALL_EDGES: readonly SEISafeAreaEdge[] = ["top", "right", "bottom", "left"];

export interface SEISafeAreaProps extends HTMLAttributes<HTMLElement> {
  /** Edges to pad with the device safe-area inset (default: all four). */
  edges?: readonly SEISafeAreaEdge[];
  /** Polymorphic root element. */
  as?: SEISafeAreaElement;
}

/**
 * Wrapper that applies `env(safe-area-inset-*)` padding (via the `--sh-safe-*`
 * tokens) on the requested edges so content clears notches and home indicators.
 */
export function SEISafeArea({
  edges = ALL_EDGES,
  as = "div",
  className,
  ...props
}: SEISafeAreaProps) {
  const Component = as as ElementType;

  return (
    <Component
      className={cn(
        edges.map((edge) => edgePadding[edge]),
        className,
      )}
      {...props}
    />
  );
}
