import type { HTMLAttributes } from "react";

import { cn } from "../styles/cn";

const toneMap = {
  neutral: "bg-[var(--sh-color-mist)]",
  sea: "bg-[var(--sh-color-sea)]",
  success: "bg-[var(--sh-color-success)]",
  warning: "bg-[var(--sh-color-warning)]",
  danger: "bg-[var(--sh-color-danger)]",
} as const;

type StatusTone = keyof typeof toneMap;

export interface SEIStatusDotProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: StatusTone;
  /** Motion-safe ping ring to draw attention (decorative). */
  pulse?: boolean;
}

export function SEIStatusDot({
  className,
  tone = "neutral",
  pulse = false,
  ...props
}: SEIStatusDotProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative inline-flex size-2.5 shrink-0 items-center justify-center",
        className,
      )}
      {...props}
    >
      {pulse ? (
        <span
          className={cn(
            "absolute inline-flex size-full rounded-full opacity-75",
            toneMap[tone],
            "motion-safe:animate-ping",
          )}
        />
      ) : null}
      <span
        className={cn(
          "relative inline-flex size-2.5 rounded-full",
          toneMap[tone],
        )}
      />
    </span>
  );
}

export interface SEIStatusLineProps extends HTMLAttributes<HTMLDivElement> {
  tone?: StatusTone;
  /** Status text — the accessible source of truth (the dot is decorative). */
  label: string;
  description?: string;
}

export function SEIStatusLine({
  className,
  tone = "neutral",
  label,
  description,
  ...props
}: SEIStatusLineProps) {
  return (
    <div
      className={cn("flex items-start gap-2.5", className)}
      {...props}
    >
      <SEIStatusDot tone={tone} className="mt-1.5" />
      <div className="flex min-w-0 flex-col">
        <span className="text-sm font-medium leading-tight text-[var(--sh-color-ivory)]">
          {label}
        </span>
        {description ? (
          <span className="text-xs leading-snug text-[var(--sh-color-mist)]">
            {description}
          </span>
        ) : null}
      </div>
    </div>
  );
}
