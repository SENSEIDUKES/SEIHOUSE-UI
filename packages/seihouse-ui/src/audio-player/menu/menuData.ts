import {
  Activity,
  BarChart3,
  Bot,
  Captions,
  Image,
  ListMusic,
  type LucideIcon,
  MessageSquare,
  Music2,
  Puzzle,
  Repeat,
  Shuffle,
  SlidersHorizontal,
} from "lucide-react";

/**
 * SEI Canvas Action Menu — data model.
 *
 * This is a deliberately small, serialisable tree so the hardcoded V1 actions
 * below can later be swapped for data from the real plugin registry without
 * touching the menu component. The component reads `children` to navigate and
 * resolves `actionId` against host-provided callbacks.
 */

/** Visual + interaction state of a single menu item. */
export type MenuItemState =
  /** Currently the live plugin/surface (accent ring + glow). */
  | "active"
  /** Tappable, resolves to an action. */
  | "available"
  /** Present and tappable but a no-op placeholder (dimmed). */
  | "inactive"
  /** Not tappable yet. */
  | "disabled"
  /** Gated behind something the user does not have (lock icon). */
  | "locked"
  /** Future work — shown with a "soon" badge, not tappable. */
  | "coming-soon";

/** Known action ids resolved by the host. Extra strings are allowed for future plugins. */
export type MenuActionId =
  | "open-queue"
  | "activate-canvas"
  | "select-lyrics"
  | (string & {});

export interface MenuNode {
  id: string;
  label: string;
  icon: LucideIcon;
  /** Defaults to `"available"` when omitted. */
  state?: MenuItemState;
  /** Short helper line shown for context where space allows. */
  hint?: string;
  /** Submenu — present means "navigate into" rather than "fire action". */
  children?: MenuNode[];
  /** Leaf action resolved by the host's callback map. */
  actionId?: MenuActionId;
}

/** True when a node is interactive (can be entered or fired). */
export function isInteractive(node: MenuNode): boolean {
  return node.state !== "disabled" && node.state !== "coming-soon" && node.state !== "locked";
}

/**
 * V1 hardcoded menu. Wiring (in the component / host):
 *   - Playback > Up Next        -> "open-queue"     (existing queue surface)
 *   - Plugin > Visual > Canvas  -> "activate-canvas" (opens SEI Canvas)
 *   - Plugin > Visual > Lyrics  -> "select-lyrics"  (available but inactive placeholder)
 * Everything marked coming-soon / locked is visually present but inert.
 */
export const SEI_CANVAS_MENU_V1: MenuNode[] = [
  {
    id: "plugin",
    label: "Plugin",
    icon: Puzzle,
    hint: "Canvas plugins",
    children: [
      {
        id: "plugin.visual",
        label: "Visual",
        icon: Image,
        children: [
          {
            id: "plugin.visual.lyrics",
            label: "Lyrics",
            icon: Captions,
            state: "inactive",
            actionId: "select-lyrics",
            hint: "Available soon as a canvas plugin",
          },
          {
            id: "plugin.visual.canvas",
            label: "Canvas",
            icon: Music2,
            state: "available",
            actionId: "activate-canvas",
            hint: "Open the SEI Canvas",
          },
          {
            id: "plugin.visual.comments",
            label: "Comments",
            icon: MessageSquare,
            state: "coming-soon",
          },
        ],
      },
      {
        id: "plugin.playback",
        label: "Playback",
        icon: SlidersHorizontal,
        state: "coming-soon",
      },
      {
        id: "plugin.analytics",
        label: "Analytics",
        icon: BarChart3,
        state: "coming-soon",
      },
    ],
  },
  {
    id: "playback",
    label: "Playback",
    icon: SlidersHorizontal,
    hint: "Transport & queue",
    children: [
      {
        id: "playback.up-next",
        label: "Up Next",
        icon: ListMusic,
        state: "available",
        actionId: "open-queue",
        hint: "Open the queue",
      },
      {
        id: "playback.automix",
        label: "Automix",
        icon: Shuffle,
        state: "coming-soon",
      },
      {
        id: "playback.repeat",
        label: "Repeat",
        icon: Repeat,
        state: "coming-soon",
      },
    ],
  },
  {
    id: "agent",
    label: "Agent",
    icon: Bot,
    state: "coming-soon",
    hint: "SEI agents",
  },
];

/** Convenience icon for the closed-state arc trigger. */
export const ACTION_MENU_TRIGGER_ICON = Activity;
