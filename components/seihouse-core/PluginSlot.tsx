"use client";

import React from "react";
import clsx from "clsx";

interface PluginSlotProps {
  name: string;
  label?: string;
  children?: React.ReactNode;
  empty?: React.ReactNode;
  className?: string;
}

/**
 * PluginSlot — a lightweight extension point.
 *
 * Core components stay pure. Plugin slots attach on top.
 * A slot renders its children if provided, or a fallback empty state.
 *
 * This is intentionally simple. Plugin architecture will evolve
 * separately without being baked into every component.
 */
export function PluginSlot({
  name,
  label,
  children,
  empty,
  className,
}: PluginSlotProps) {
  return (
    <div
      className={clsx(
        "plugin-slot",
        "rounded-lg border border-dashed border-[var(--sh-color-slate)] p-4",
        "transition-all duration-[var(--sh-transition-fast)]",
        children
          ? "bg-[var(--sh-surface-base)] border-[var(--sh-color-slate)]"
          : "bg-transparent opacity-50 hover:opacity-80",
        className
      )}
      data-plugin-slot={name}
    >
      {label && (
        <div className="mb-2 flex items-center gap-2">
          <span className="text-[0.625rem] font-semibold uppercase tracking-wider text-[var(--sh-color-mist)]">
            slot: {label}
          </span>
          <span className="h-px flex-1 bg-[var(--sh-surface-glass-border)]" />
        </div>
      )}

      {children ?? empty ?? (
        <p className="text-xs text-[var(--sh-color-mist)] italic">
          No plugin attached
        </p>
      )}
    </div>
  );
}