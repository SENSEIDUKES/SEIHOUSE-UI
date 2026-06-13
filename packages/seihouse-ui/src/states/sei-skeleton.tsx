import type { CSSProperties, HTMLAttributes } from "react";

import { cn } from "../styles/cn";
import { motionSafe } from "../styles/reduced-motion";

const radiusMap = {
  sm: "rounded-[var(--sh-radius-sm)]",
  md: "rounded-[var(--sh-radius-md)]",
  lg: "rounded-[var(--sh-radius-lg)]",
  full: "rounded-full",
} as const;

/**
 * Self-contained shimmer keyframes. Injected once per render tree via a
 * `<style>` tag so the component works without depending on global CSS or a
 * Tailwind keyframe registration (we must not touch files outside this folder).
 * Gated below by `motion-safe:` so reduced-motion users never see travel.
 */
const SHIMMER_KEYFRAMES =
  "@keyframes sei-skeleton-shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}";

export interface SEISkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /** Width as a CSS length (number → px). */
  width?: string | number;
  /** Height as a CSS length (number → px). */
  height?: string | number;
  radius?: "sm" | "md" | "lg" | "full";
  variant?: "pulse" | "shimmer";
}

export function SEISkeleton({
  className,
  style,
  width,
  height,
  radius = "md",
  variant = "pulse",
  ...props
}: SEISkeletonProps) {
  const mergedStyle: CSSProperties = {
    width,
    height,
    ...style,
  };

  return (
    <>
      {variant === "shimmer" ? (
        <style dangerouslySetInnerHTML={{ __html: SHIMMER_KEYFRAMES }} />
      ) : null}
      <div
        aria-hidden="true"
        className={cn(
          "block overflow-hidden bg-white/[0.06]",
          radiusMap[radius],
          variant === "pulse" && "motion-safe:animate-pulse",
          variant === "shimmer" && [
            "relative",
            motionSafe,
            "motion-safe:bg-[linear-gradient(90deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.12)_50%,rgba(255,255,255,0.04)_100%)]",
            "motion-safe:bg-[length:200%_100%]",
            "motion-safe:[animation:sei-skeleton-shimmer_1.6s_ease-in-out_infinite]",
          ],
          className,
        )}
        style={mergedStyle}
        {...props}
      />
    </>
  );
}
