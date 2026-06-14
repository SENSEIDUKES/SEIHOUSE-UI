/**
 * Player surface state — intentionally tiny.
 *
 * The SAP card has exactly one "surface" visible at a time:
 *   - `default` — just the player.
 *   - `canvas`  — the SEI Canvas plugin mount region is open.
 *   - `queue`   — the Up Next queue panel is open.
 *
 * The SEI Canvas Action Menu (the bottom arc) is an OVERLAY, not a surface, so
 * its open/navigation state lives locally in that component and never touches
 * this reducer. Keep this file boring on purpose.
 */

export type PlayerSurface = "default" | "canvas" | "queue";

export interface SurfaceState {
  surface: PlayerSurface;
}

export type SurfaceAction =
  | { type: "open-canvas" }
  | { type: "toggle-canvas" }
  | { type: "open-queue" }
  | { type: "close-surface" };

export const initialSurfaceState: SurfaceState = { surface: "default" };

export function surfaceReducer(state: SurfaceState, action: SurfaceAction): SurfaceState {
  switch (action.type) {
    case "open-canvas":
      return { surface: "canvas" };
    case "toggle-canvas":
      return { surface: state.surface === "canvas" ? "default" : "canvas" };
    case "open-queue":
      return { surface: "queue" };
    case "close-surface":
      return { surface: "default" };
    default:
      return state;
  }
}
