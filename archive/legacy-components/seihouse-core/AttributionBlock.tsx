"use client";

import React from "react";
import clsx from "clsx";

interface AttributionBlockProps {
  label: string;
  value: string;
  secondary?: string;
  variant?: "default" | "compact";
  className?: string;
}

export function AttributionBlock({
  label,
  value,
  secondary,
  variant = "default",
  className,
}: AttributionBlockProps) {
  return (
    <div
      className={clsx(
        variant === "default" && "p-4 rounded-xl bg-[var(--sh-surface-base)] border border-[var(--sh-surface-glass-border)]",
        variant === "compact" && "",
        className
      )}
    >
      <p
        className={clsx(
          "font-medium text-[var(--sh-color-ivory)]",
          variant === "default" ? "text-sm" : "text-xs"
        )}
      >
        {value}
      </p>
      <div className="flex items-center gap-2 mt-0.5">
        <span className="text-xs text-[var(--sh-color-mist)]">{label}</span>
        {secondary && (
          <>
            <span className="text-xs text-[var(--sh-color-slate)]">·</span>
            <span className="text-xs text-[var(--sh-color-mist)]">{secondary}</span>
          </>
        )}
      </div>
    </div>
  );
}

/* ---- Credit Stack (multi-attribution) ---- */
interface CreditStackProps {
  credits: { label: string; value: string }[];
  className?: string;
}

export function CreditStack({ credits, className }: CreditStackProps) {
  return (
    <div className={clsx("space-y-2", className)}>
      {credits.map((credit) => (
        <AttributionBlock
          key={credit.label}
          label={credit.label}
          value={credit.value}
          variant="compact"
        />
      ))}
    </div>
  );
}