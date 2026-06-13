import type { ReactNode } from "react";

import { cn } from "@seihouse/ui";

/**
 * Shared layout helpers for the Foundation Diagnostics area.
 * These make invisible system capabilities (tokens, states, layering) visible
 * and reviewable, with a consistent labelled-block rhythm across every section.
 */

/** A labelled sub-block within a diagnostics section. */
export function DiagBlock({
  title,
  hint,
  children,
  className,
}: {
  title: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("space-y-3", className)}>
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-white/10 pb-2">
        <h3 className="text-sm font-semibold tracking-[-0.01em] text-white">{title}</h3>
        {hint ? (
          <p className="font-mono text-[0.68rem] text-[var(--sh-color-mist)]">{hint}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

/** A small labelled tile used to caption a single specimen. */
export function DiagTile({
  label,
  children,
  className,
}: {
  label?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">{children}</div>
      {label ? (
        <p className="text-center font-mono text-[0.66rem] uppercase tracking-[0.1em] text-[var(--sh-color-mist)]">
          {label}
        </p>
      ) : null}
    </div>
  );
}

/** Even responsive grid for specimens. */
export function DiagGrid({
  children,
  cols = 3,
  className,
}: {
  children: ReactNode;
  cols?: 2 | 3 | 4;
  className?: string;
}) {
  const colClass =
    cols === 2
      ? "sm:grid-cols-2"
      : cols === 4
        ? "sm:grid-cols-2 lg:grid-cols-4"
        : "sm:grid-cols-2 lg:grid-cols-3";
  return <div className={cn("grid gap-3", colClass, className)}>{children}</div>;
}
