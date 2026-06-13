"use client";

import React from "react";
import clsx from "clsx";
import { PremiumSurface, SurfaceHeader } from "@/components/seihouse-core/PremiumSurface";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { AttributionBlock } from "@/components/seihouse-core/AttributionBlock";
import { SignatureSeal } from "@/components/seihouse-core/SignatureSeal";

/**
 * SeaPortalPreview — A SEA-specific composition built from core components.
 *
 * This demonstrates how SEA Portal patterns sit on top of the reusable
 * seihouse-core layer. It is NOT a reusable component itself — it's an
 * app-specific composition for the lab.
 */
export function SeaPortalPreview({ className }: { className?: string }) {
  return (
    <PremiumSurface variant="glass" glow="sea" className={className}>
      <div className="space-y-6">
        {/* Header area */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-[var(--sh-color-ivory)] tracking-tight">
                SEA Portal
              </span>
              <Badge variant="sea" size="sm">v2.0</Badge>
            </div>
            <p className="text-sm text-[var(--sh-color-mist)]">
              Premium surface composition using seihouse-core
            </p>
          </div>
          <SignatureSeal label="SEA" variant="sea" size="sm" verified />
        </div>

        {/* Attribution row */}
        <div className="grid grid-cols-2 gap-3">
          <AttributionBlock
            label="Artist"
            value="SENSEIDUKES"
            secondary="Verified"
          />
          <AttributionBlock
            label="Framework"
            value="SEIHOUSE-UI"
            secondary="Core Lab"
          />
        </div>

        {/* Action area */}
        <div className="flex items-center gap-3">
          <Button variant="primary" size="sm">Launch Portal</Button>
          <Button variant="secondary" size="sm">View Source</Button>
        </div>

        {/* Plugin slot example */}
        <div className="pt-2 border-t border-[var(--sh-surface-glass-border)]">
          <div className="rounded-lg border border-dashed border-[var(--sh-color-slate)] p-3">
            <p className="text-[0.625rem] font-semibold uppercase tracking-wider text-[var(--sh-color-mist)] mb-1.5">
              slot: portal-extensions
            </p>
            <p className="text-xs text-[var(--sh-color-mist)] italic">
              No portal extensions attached
            </p>
          </div>
        </div>
      </div>
    </PremiumSurface>
  );
}