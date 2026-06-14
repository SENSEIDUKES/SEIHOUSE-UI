"use client";

import { ListMusic, Pause, Play, Radio, SkipBack, SkipForward, X } from "lucide-react";

import { SEIBadge } from "../primitives/sei-badge";
import { SEIButton } from "../primitives/sei-button";
import { SEIPanel } from "../primitives/sei-panel";
import { cn } from "../styles/cn";
import type { PlayerTrack } from "../types/music";
import { SAPController } from "./SAPController";
import { usePlayerSurface } from "./state/usePlayerSurface";
import { PlayerSurfaceButtons } from "./surfaces/PlayerSurfaceButtons";
import { SEICanvasHost } from "./surfaces/SEICanvasHost";

/**
 * FullCardPlayer — the SAP "full card" host.
 *
 * Composes the visual player with the three controls described in the spec:
 *   - left SEI Canvas toggle + right SEI Canvas Action Menu (PlayerSurfaceButtons)
 *   - the three-dot deep options menu (SAPController)
 * It owns the surface state (default | canvas | queue) and renders the matching
 * surface (canvas host / queue panel) below the transport. No audio engine — this
 * is a visual lab host, like the other player particles.
 */
export interface FullCardPlayerProps {
  track: PlayerTrack;
  className?: string;
}

export function FullCardPlayer({ track, className }: FullCardPlayerProps) {
  const surface = usePlayerSurface();
  const safeProgress = Math.min(100, Math.max(0, track.progress));

  return (
    <SEIPanel
      variant="glass-test"
      padding="md"
      className={cn("relative mx-auto w-full max-w-xl overflow-hidden", className)}
    >
      <div className="space-y-5">
        <div className="flex items-start justify-between gap-3">
          <SEIBadge variant="glass-test" size="sm" icon={Radio}>
            SAP full card
          </SEIBadge>
          <SAPController />
        </div>

        <div className="grid gap-5 sm:grid-cols-[7rem_1fr] sm:items-center">
          <div className="relative aspect-square overflow-hidden rounded-[1.2rem] border border-white/12 bg-[radial-gradient(circle_at_35%_25%,rgba(0,122,255,0.45),transparent_38%),radial-gradient(circle_at_78%_74%,rgba(255,107,53,0.32),transparent_36%),rgba(255,255,255,0.055)]">
            <div className="absolute inset-4 rounded-full border border-dashed border-white/22" />
            <div className="absolute left-1/2 top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80" />
          </div>

          <div className="min-w-0 space-y-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--sh-color-mist)]">
                {track.project}
              </p>
              <h3 className="truncate text-xl font-semibold tracking-[-0.04em] text-white">
                {track.title}
              </h3>
              <p className="mt-1 text-sm text-[var(--sh-color-cloud)]">{track.artist}</p>
            </div>

            <div className="space-y-2">
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-[linear-gradient(90deg,var(--sh-color-sea),var(--sh-color-accent))]"
                  style={{ width: `${safeProgress}%` }}
                />
              </div>
              <div className="flex justify-between font-mono text-[0.68rem] text-[var(--sh-color-mist)]">
                <span>01:{String(Math.floor(safeProgress)).padStart(2, "0")}</span>
                <span>{track.duration}</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2">
              <SEIButton variant="ghost" size="sm" icon={SkipBack} aria-label="Previous track" />
              <SEIButton variant="solid" size="md" icon={Play} aria-label="Play" />
              <SEIButton variant="ghost" size="sm" icon={Pause} aria-label="Pause" />
              <SEIButton variant="ghost" size="sm" icon={SkipForward} aria-label="Next track" />
            </div>
          </div>
        </div>

        <PlayerSurfaceButtons
          className="border-t border-white/10 pt-4"
          canvasOpen={surface.isCanvasOpen}
          onToggleCanvas={surface.toggleCanvas}
          onOpenQueue={surface.openQueue}
          onActivateCanvas={surface.openCanvas}
        />

        <SEICanvasHost active={surface.isCanvasOpen} />

        {surface.isQueueOpen ? (
          <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-4">
            <div className="mb-3 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <ListMusic aria-hidden="true" className="size-4 text-[var(--sh-color-sea)]" />
                Up Next
              </div>
              <SEIButton
                variant="ghost"
                size="sm"
                icon={X}
                aria-label="Close queue"
                onClick={surface.closeSurface}
              />
            </div>
            <div className="space-y-2 text-sm text-[var(--sh-color-cloud)]">
              {track.queue.map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-white/8 bg-white/[0.035] px-3 py-2"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </SEIPanel>
  );
}
