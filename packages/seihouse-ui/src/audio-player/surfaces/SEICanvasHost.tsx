"use client";

import { Sparkles } from "lucide-react";

import { cn } from "../../styles/cn";

/**
 * SEICanvasHost — the visual/plugin mount region for the SEI Canvas surface.
 *
 * V1 is a placeholder: a dashed glass panel where a real canvas plugin
 * (visualizer, lyrics, artwork engine) will later mount. It carries no plugin
 * runtime — it only renders when the player surface is `canvas`.
 */
export interface SEICanvasHostProps {
  active: boolean;
  /** Label of the plugin currently mounted (placeholder copy for now). */
  pluginLabel?: string;
  className?: string;
}

export function SEICanvasHost({ active, pluginLabel = "SEI Canvas", className }: SEICanvasHostProps) {
  if (!active) return null;

  return (
    <div
      role="region"
      aria-label="SEI Canvas"
      className={cn(
        "rounded-[1.25rem] border border-dashed border-white/15 bg-white/[0.035] p-6",
        "grid min-h-40 place-items-center text-center",
        className,
      )}
    >
      <div className="space-y-2">
        <div className="mx-auto grid size-11 place-items-center rounded-2xl border border-white/12 bg-white/[0.06] text-[var(--sh-color-sea)]">
          <Sparkles aria-hidden="true" className="size-5" />
        </div>
        <p className="text-sm font-semibold text-[var(--sh-color-ivory)]">{pluginLabel}</p>
        <p className="text-xs text-[var(--sh-color-mist)]">
          Canvas plugin mount — placeholder only, no plugin runtime yet.
        </p>
      </div>
    </div>
  );
}
