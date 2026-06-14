"use client";

import { LayoutGrid } from "lucide-react";

import { cn } from "../../styles/cn";
import { SEI_CANVAS_MENU_V1, type MenuNode } from "../menu/menuData";
import { SEICanvasActionMenu } from "./SEICanvasActionMenu";
import { SurfaceButton } from "./SurfaceButton";

/**
 * PlayerSurfaceButtons — the two surface controls flanking the transport.
 *
 *  - Left: SEI Canvas toggle (opens/closes the canvas surface). Unchanged.
 *  - Right: the new SEI Canvas Action Menu (replaces the old queue button).
 *
 * The menu owns its own overlay; this component only forwards the surface
 * callbacks it should drive (queue + canvas) and which node ids are live.
 */
export interface PlayerSurfaceButtonsProps {
  canvasOpen: boolean;
  onToggleCanvas: () => void;
  onOpenQueue: () => void;
  onActivateCanvas: () => void;
  /** Override the V1 menu tree (e.g. once a real plugin registry exists). */
  menuItems?: MenuNode[];
  className?: string;
}

export function PlayerSurfaceButtons({
  canvasOpen,
  onToggleCanvas,
  onOpenQueue,
  onActivateCanvas,
  menuItems = SEI_CANVAS_MENU_V1,
  className,
}: PlayerSurfaceButtonsProps) {
  return (
    <div className={cn("flex items-center justify-between gap-3", className)}>
      <SurfaceButton
        icon={LayoutGrid}
        aria-label="SEI Canvas"
        aria-pressed={canvasOpen}
        state={canvasOpen ? "active" : "default"}
        onClick={onToggleCanvas}
      />

      <SEICanvasActionMenu
        items={menuItems}
        activeIds={canvasOpen ? ["plugin.visual.canvas"] : undefined}
        onOpenQueue={onOpenQueue}
        onActivateCanvas={onActivateCanvas}
      />
    </div>
  );
}
