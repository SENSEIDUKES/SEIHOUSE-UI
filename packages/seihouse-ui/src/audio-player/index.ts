// SAP audio-player surface module (Phase 6).
// Visual/placeholder host — no audio engine. Ready to connect to real
// surface + plugin-registry data later.

export { FullCardPlayer, type FullCardPlayerProps } from "./FullCardPlayer";
export { SAPController, type SAPControllerProps } from "./SAPController";

export { PlayerSurfaceButtons, type PlayerSurfaceButtonsProps } from "./surfaces/PlayerSurfaceButtons";
export { SurfaceButton, type SurfaceButtonProps } from "./surfaces/SurfaceButton";
export { SEICanvasHost, type SEICanvasHostProps } from "./surfaces/SEICanvasHost";
export {
  SEICanvasActionMenu,
  type SEICanvasActionMenuProps,
} from "./surfaces/SEICanvasActionMenu";

export {
  usePlayerSurface,
  type PlayerSurfaceController,
} from "./state/usePlayerSurface";
export {
  surfaceReducer,
  initialSurfaceState,
  type PlayerSurface,
  type SurfaceState,
  type SurfaceAction,
} from "./state/surfaceReducer";

export {
  SEI_CANVAS_MENU_V1,
  ACTION_MENU_TRIGGER_ICON,
  isInteractive,
  type MenuNode,
  type MenuItemState,
  type MenuActionId,
} from "./menu/menuData";
