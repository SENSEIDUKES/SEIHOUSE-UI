import type { HTMLAttributes } from "react";

import { cn } from "../styles/cn";
import { motionSafe } from "../styles/reduced-motion";

/**
 * Clamp an arbitrary numeric progress value into the inclusive 0–100 range and
 * round to the nearest integer. Pure + exported for unit testing.
 */
export function clampProgress(value: number): number {
  if (Number.isNaN(value)) return 0;
  return Math.round(Math.min(100, Math.max(0, value)));
}

const toneMap = {
  sea: "bg-[var(--sh-color-sea)]",
  success: "bg-[var(--sh-color-success)]",
  warning: "bg-[var(--sh-color-warning)]",
  danger: "bg-[var(--sh-color-danger)]",
  accent: "bg-[var(--sh-color-accent)]",
} as const;

const trackSizeMap = {
  sm: "h-1.5",
  md: "h-2.5",
} as const;

const INDETERMINATE_KEYFRAMES =
  "@keyframes sei-progress-indeterminate{0%{left:-40%;right:100%}60%{left:100%;right:-10%}100%{left:100%;right:-10%}}";

export interface SEIProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  /** 0–100. Clamped internally. Ignored when `indeterminate`. */
  value?: number;
  indeterminate?: boolean;
  tone?: "sea" | "success" | "warning" | "danger" | "accent";
  size?: "sm" | "md";
  label?: string;
  showValue?: boolean;
}

export function SEIProgressBar({
  className,
  value = 0,
  indeterminate = false,
  tone = "sea",
  size = "md",
  label,
  showValue = false,
  ...props
}: SEIProgressBarProps) {
  const clamped = clampProgress(value);

  return (
    <div className={cn("flex w-full flex-col gap-1.5", className)} {...props}>
      {(label || (showValue && !indeterminate)) && (
        <div className="flex items-center justify-between gap-3 text-xs font-medium text-[var(--sh-color-mist)]">
          {label ? <span>{label}</span> : <span />}
          {showValue && !indeterminate ? (
            <span className="tabular-nums text-[var(--sh-color-cloud)]">
              {clamped}%
            </span>
          ) : null}
        </div>
      )}
      <div
        role="progressbar"
        aria-label={label ?? "Progress"}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={indeterminate ? undefined : clamped}
        className={cn(
          "relative w-full overflow-hidden rounded-full bg-white/[0.08]",
          trackSizeMap[size],
        )}
      >
        {indeterminate ? (
          <>
            <style
              dangerouslySetInnerHTML={{ __html: INDETERMINATE_KEYFRAMES }}
            />
            <span
              aria-hidden="true"
              className={cn(
                "absolute inset-y-0 rounded-full",
                toneMap[tone],
                "motion-safe:[animation:sei-progress-indeterminate_1.4s_ease-in-out_infinite]",
                "motion-reduce:inset-x-0 motion-reduce:opacity-60",
              )}
            />
          </>
        ) : (
          <span
            aria-hidden="true"
            className={cn(
              "absolute inset-y-0 left-0 rounded-full",
              toneMap[tone],
              motionSafe,
            )}
            style={{ width: `${clamped}%` }}
          />
        )}
      </div>
    </div>
  );
}
