"use client";

import { useCallback, useMemo, useReducer } from "react";

import {
  initialSurfaceState,
  surfaceReducer,
  type PlayerSurface,
} from "./surfaceReducer";

export interface PlayerSurfaceController {
  surface: PlayerSurface;
  isCanvasOpen: boolean;
  isQueueOpen: boolean;
  openCanvas: () => void;
  toggleCanvas: () => void;
  openQueue: () => void;
  closeSurface: () => void;
}

/**
 * Thin `useReducer` wrapper that exposes the player surface state plus stable
 * action callbacks. Components (surface buttons, the arc menu, the queue panel)
 * receive only the callbacks they need — they never see the reducer directly.
 */
export function usePlayerSurface(): PlayerSurfaceController {
  const [state, dispatch] = useReducer(surfaceReducer, initialSurfaceState);

  const openCanvas = useCallback(() => dispatch({ type: "open-canvas" }), []);
  const toggleCanvas = useCallback(() => dispatch({ type: "toggle-canvas" }), []);
  const openQueue = useCallback(() => dispatch({ type: "open-queue" }), []);
  const closeSurface = useCallback(() => dispatch({ type: "close-surface" }), []);

  return useMemo(
    () => ({
      surface: state.surface,
      isCanvasOpen: state.surface === "canvas",
      isQueueOpen: state.surface === "queue",
      openCanvas,
      toggleCanvas,
      openQueue,
      closeSurface,
    }),
    [state.surface, openCanvas, toggleCanvas, openQueue, closeSurface],
  );
}
