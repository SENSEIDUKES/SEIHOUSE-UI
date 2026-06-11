"use client";

import React from "react";
import clsx from "clsx";

interface ActionCardProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  actions: React.ReactNode;
  variant?: "default" | "compact" | "prominent";
  className?: string;
}

const variantStyles: Record<string, string> = {
  default:
    "bg-[var(--sh-surface-elevated)] border border-[var(--sh-surface-glass-border)]",
  compact:
    "bg-[var(--sh-surface-base)] border border-[var(--sh-color-slate)]",
  prominent:
    "bg-[var(--sh-surface-elevated)] border border-[var(--sh-color-sea)]/30 shadow-[var(--sh-shadow-glow-sea)]",
};

export function ActionCard({
  title,
  description,
  icon,
  actions,
  variant = "default",
  className,
}: ActionCardProps) {
  return (
    <div
      className={clsx(
        "rounded-xl p-5 space-y-4",
        "transition-all duration-[var(--sh-transition-base)]",
        variantStyles[variant],
        "hover:shadow-[var(--sh-shadow-md)]",
        className
      )}
    >
      <div className="flex items-start gap-4">
        {icon && (
          <div className="shrink-0 w-10 h-10 rounded-lg bg-[var(--sh-surface-raised)] flex items-center justify-center text-[var(--sh-color-sea)]">
            {icon}
          </div>
        )}
        <div className="flex-1 min-w-0 space-y-1">
          <h4 className="text-sm font-semibold text-[var(--sh-color-ivory)]">
            {title}
          </h4>
          {description && (
            <p className="text-sm text-[var(--sh-color-mist)] leading-snug">
              {description}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3">{actions}</div>
    </div>
  );
}

/* ---- CTA Row (horizontal action strip) ---- */
interface CtaRowProps {
  title: string;
  description?: string;
  actions: React.ReactNode;
  className?: string;
}

export function CtaRow({
  title,
  description,
  actions,
  className,
}: CtaRowProps) {
  return (
    <div
      className={clsx(
        "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4",
        "p-5 rounded-xl bg-[var(--sh-surface-elevated)] border border-[var(--sh-surface-glass-border)]",
        className
      )}
    >
      <div className="space-y-1">
        <h4 className="text-base font-semibold text-[var(--sh-color-ivory)]">
          {title}
        </h4>
        {description && (
          <p className="text-sm text-[var(--sh-color-mist)]">{description}</p>
        )}
      </div>
      <div className="flex items-center gap-3 shrink-0">{actions}</div>
    </div>
  );
}