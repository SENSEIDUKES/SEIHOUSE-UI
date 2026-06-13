"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
} from "react";

import { cn } from "../styles/cn";

/**
 * Pure scroll-shadow resolver.
 *
 * - `top` is true when the region is scrolled away from the top.
 * - `bottom` is true when there is still content below the viewport (a 1px
 *   epsilon absorbs sub-pixel rounding at the very bottom).
 */
export function getScrollShadows(args: {
  scrollTop: number;
  scrollHeight: number;
  clientHeight: number;
}): { top: boolean; bottom: boolean } {
  const { scrollTop, scrollHeight, clientHeight } = args;
  return {
    top: scrollTop > 0,
    bottom: scrollTop + clientHeight < scrollHeight - 1,
  };
}

const thinScrollbar = cn(
  "[scrollbar-width:thin]",
  "[&::-webkit-scrollbar]:w-2",
  "[&::-webkit-scrollbar-track]:bg-transparent",
  "[&::-webkit-scrollbar-thumb]:rounded-full",
  "[&::-webkit-scrollbar-thumb]:bg-white/15",
  "[&::-webkit-scrollbar-thumb:hover]:bg-white/25",
);

export interface SEIScrollAreaProps extends HTMLAttributes<HTMLDivElement> {
  /** Max height before the region scrolls (e.g. "24rem", "60vh"). */
  maxHeight?: string;
  /** Accessible label for the scroll region (keyboard users can focus it). */
  label?: string;
  /** Alias for `label`. */
  "aria-label"?: string;
}

/**
 * Vertically scrollable region with a thin scrollbar and top/bottom scroll
 * shadows that appear only when content overflows in that direction.
 *
 * The region is keyboard-focusable (`tabIndex={0}`) so keyboard users can
 * scroll it with the arrow keys.
 */
export function SEIScrollArea({
  maxHeight = "20rem",
  label,
  "aria-label": ariaLabel,
  className,
  style,
  children,
  ...props
}: SEIScrollAreaProps) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [shadows, setShadows] = useState<{ top: boolean; bottom: boolean }>({
    top: false,
    bottom: false,
  });

  const recompute = useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;
    setShadows(
      getScrollShadows({
        scrollTop: el.scrollTop,
        scrollHeight: el.scrollHeight,
        clientHeight: el.clientHeight,
      }),
    );
  }, []);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    recompute();

    // One ResizeObserver on the viewport handles size changes; a MutationObserver
    // catches dynamically added/removed/changed content (more robust + cheaper
    // than observing every child).
    const resizeObserver = new ResizeObserver(() => recompute());
    resizeObserver.observe(el);

    const mutationObserver = new MutationObserver(() => recompute());
    mutationObserver.observe(el, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [recompute]);

  return (
    <div className={cn("relative", className)}>
      <div
        aria-hidden="true"
        data-visible={shadows.top || undefined}
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[var(--sh-scroll-shadow-size)] bg-[var(--sh-scroll-shadow-top)] opacity-0 transition-opacity duration-200 data-[visible]:opacity-100"
      />
      <div
        ref={viewportRef}
        role="region"
        aria-label={ariaLabel ?? label ?? "Scrollable content"}
        tabIndex={0}
        onScroll={recompute}
        className={cn(
          "overflow-y-auto overscroll-y-contain",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sh-color-sea)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--sh-color-black)]",
          thinScrollbar,
        )}
        style={{ maxHeight, ...style }}
        {...props}
      >
        {children}
      </div>
      <div
        aria-hidden="true"
        data-visible={shadows.bottom || undefined}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[var(--sh-scroll-shadow-size)] bg-[var(--sh-scroll-shadow-bottom)] opacity-0 transition-opacity duration-200 data-[visible]:opacity-100"
      />
    </div>
  );
}
