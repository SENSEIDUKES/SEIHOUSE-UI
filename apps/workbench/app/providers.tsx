"use client";

import type { ReactNode } from "react";
import { SEITooltipProvider } from "@seihouse/ui";

/**
 * App-wide client providers. The tooltip provider is mounted once here so every
 * SEITooltip shares a single hover delay and instant-phase grouping, instead of
 * relying on per-section providers.
 */
export function Providers({ children }: { children: ReactNode }) {
  return <SEITooltipProvider>{children}</SEITooltipProvider>;
}
