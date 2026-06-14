import type { ComponentType } from "react";

import {
  mockAlbums,
  mockArtists,
  mockDojoModules,
  mockMetrics,
  mockPlayerTracks,
  mockRegistryItems,
  mockShowcaseEntries,
  mockVaultFragments,
} from "@/lib/mock-data/examples";
import type { SEIBadgeVariantProps } from "@seihouse/ui";

import {
  ActionStripPreview,
  AlbumCardPreview,
  ArtistCardPreview,
  BadgePreview,
  ButtonPreview,
  CardPreview,
  ComboboxWorkbenchPreview,
  CommandPaletteWorkbenchPreview,
  DialogPreview,
  DojoModuleCardPreview,
  DrawerPreview,
  FullCardPlayerWorkbenchPreview,
  MetricCardWorkbenchPreview,
  MultiSelectComboboxPreview,
  NativeDrawerPreview,
  PanelPreview,
  PlayerShellWorkbenchPreview,
  PluginSlotWorkbenchPreview,
  PopoverPreview,
  RegistryPanelWorkbenchPreview,
  RegistrySealWorkbenchPreview,
  SectionPreview,
  ShowcaseBlockWorkbenchPreview,
  ShowcaseHeroWorkbenchPreview,
  TabsPreview,
  TooltipPreview,
  VaultFragmentCardPreview,
} from "./previews";

/* ------------------------------------------------------------------ */
/* SEIHouse Component Workbench registry                                */
/* One entry per reviewable component. The workbench, gallery, and      */
/* home review queue all read from this file.                           */
/* ------------------------------------------------------------------ */

export type WorkbenchLayer =
  | "foundation"
  | "behavior"
  | "music-particle"
  | "registry"
  | "layout";

export type ReviewStatus =
  | "not-designed"
  | "rough"
  | "reviewing"
  | "approved-foundation"
  | "experimental";

export interface MockDataOption {
  id: string;
  label: string;
}

export interface ReviewNotes {
  whatWorks: string;
  whatFeelsWrong: string;
  changeRequest: string;
  founderVerdict: string;
}

/** Props every workbench preview component receives. */
export interface ComponentPreviewProps {
  /** One of the entry's `variants` strings. */
  variant: string;
  /** Index into the entry's `mockDataOptions` (0 when none exist). */
  mockIndex: number;
}

export interface WorkbenchComponentEntry {
  name: string;
  slug: string;
  category: string;
  layer: WorkbenchLayer;
  status: ReviewStatus;
  /** Plain SEIHouse language — what this thing is for, in one breath. */
  description: string;
  variants: string[];
  defaultVariant: string;
  mockDataOptions?: MockDataOption[];
  preview: ComponentType<ComponentPreviewProps>;
  /** Ids from the context registry where this component appears. */
  contextExamples: string[];
  /** Placeholder review notes — real notes live in the founder's head + localStorage. */
  reviewNotes: ReviewNotes;
}

const emptyNotes: ReviewNotes = {
  whatWorks: "",
  whatFeelsWrong: "",
  changeRequest: "",
  founderVerdict: "",
};

export const layerMeta: Record<WorkbenchLayer, { label: string; order: number }> = {
  foundation: { label: "Foundation", order: 0 },
  behavior: { label: "Behavior", order: 1 },
  "music-particle": { label: "Music Particles", order: 2 },
  registry: { label: "Registry", order: 3 },
  layout: { label: "Layout", order: 4 },
};

export const statusMeta: Record<
  ReviewStatus,
  { label: string; badge: SEIBadgeVariantProps["variant"]; dot: string }
> = {
  "not-designed": { label: "Not designed", badge: "outline", dot: "bg-white/30" },
  rough: { label: "Rough", badge: "warning", dot: "bg-[var(--sh-color-warning)]" },
  reviewing: { label: "Reviewing", badge: "soft", dot: "bg-[var(--sh-color-sea)]" },
  "approved-foundation": {
    label: "Approved foundation",
    badge: "success",
    dot: "bg-[var(--sh-color-success)]",
  },
  experimental: {
    label: "Experimental",
    badge: "media-test",
    dot: "bg-[var(--sh-color-accent)]",
  },
};

export const componentRegistry: WorkbenchComponentEntry[] = [
  /* ---- Foundation ---- */
  {
    name: "Button",
    slug: "button",
    category: "Primitives",
    layer: "foundation",
    status: "approved-foundation",
    description: "The one button every SEIHouse surface uses — actions, links, players, registry.",
    variants: ["default", "soft", "outline", "ghost", "solid", "dark", "light", "glass-test", "media-test"],
    defaultVariant: "solid",
    preview: ButtonPreview,
    contextExamples: ["registry-confirmation", "creator-dashboard"],
    reviewNotes: emptyNotes,
  },
  {
    name: "Badge",
    slug: "badge",
    category: "Primitives",
    layer: "foundation",
    status: "approved-foundation",
    description: "Small status and label chips: release state, registry state, tags.",
    variants: [
      "default",
      "soft",
      "outline",
      "ghost",
      "solid",
      "dark",
      "light",
      "glass-test",
      "media-test",
      "success",
      "warning",
      "danger",
      "registry",
    ],
    defaultVariant: "default",
    preview: BadgePreview,
    contextExamples: ["sea-portal"],
    reviewNotes: emptyNotes,
  },
  {
    name: "Card",
    slug: "card",
    category: "Primitives",
    layer: "foundation",
    status: "reviewing",
    description: "The base card surface that albums, artists, fragments, and modules sit on.",
    variants: ["default", "soft", "outline", "ghost", "solid", "dark", "light", "glass-test", "media-test"],
    defaultVariant: "default",
    preview: CardPreview,
    contextExamples: ["sea-portal"],
    reviewNotes: emptyNotes,
  },
  {
    name: "Panel",
    slug: "panel",
    category: "Primitives",
    layer: "foundation",
    status: "reviewing",
    description: "Bigger surface than a card — players, registry panels, dashboards.",
    variants: ["default", "soft", "outline", "ghost", "solid", "dark", "light", "glass-test", "media-test"],
    defaultVariant: "default",
    preview: PanelPreview,
    contextExamples: ["creator-dashboard"],
    reviewNotes: emptyNotes,
  },
  {
    name: "Section",
    slug: "section",
    category: "Primitives",
    layer: "foundation",
    status: "reviewing",
    description: "Page section header: eyebrow, title, short description, optional aside.",
    variants: ["sm", "md", "lg"],
    defaultVariant: "md",
    preview: SectionPreview,
    contextExamples: ["sea-portal"],
    reviewNotes: emptyNotes,
  },

  /* ---- Behavior ---- */
  {
    name: "Dialog",
    slug: "dialog",
    category: "Base UI",
    layer: "behavior",
    status: "reviewing",
    description: "Modal window for confirmations and detail views. Fully keyboard accessible.",
    variants: ["default", "soft", "dark", "light", "glass-test"],
    defaultVariant: "default",
    mockDataOptions: [
      { id: "confirm", label: "Confirm registration" },
      { id: "album", label: "Album details" },
    ],
    preview: DialogPreview,
    contextExamples: ["registry-confirmation"],
    reviewNotes: emptyNotes,
  },
  {
    name: "Drawer",
    slug: "drawer",
    category: "Base UI",
    layer: "behavior",
    status: "reviewing",
    description: "Side or bottom panel for vault details, queues, and creator tools.",
    variants: ["right", "left", "bottom"],
    defaultVariant: "right",
    mockDataOptions: [
      { id: "vault", label: "Vault fragment detail" },
      { id: "queue", label: "Player queue" },
    ],
    preview: DrawerPreview,
    contextExamples: ["plugin-settings-drawer"],
    reviewNotes: emptyNotes,
  },
  {
    name: "Native Drawer",
    slug: "native-drawer",
    category: "vaul",
    layer: "behavior",
    status: "experimental",
    description: "Swipeable drawer with drag-to-dismiss and snap points, for mobile-feel panels.",
    variants: ["bottom", "right", "left"],
    defaultVariant: "bottom",
    mockDataOptions: [
      { id: "queue", label: "Player queue" },
      { id: "plugin", label: "Plugin settings" },
    ],
    preview: NativeDrawerPreview,
    contextExamples: ["plugin-settings-drawer"],
    reviewNotes: emptyNotes,
  },
  {
    name: "Tabs",
    slug: "tabs",
    category: "Base UI",
    layer: "behavior",
    status: "reviewing",
    description: "Keyboard-navigable tabs for registry records, album worlds, and settings.",
    variants: ["default", "underline", "pill", "panel", "dark", "light"],
    defaultVariant: "underline",
    preview: TabsPreview,
    contextExamples: ["sea-portal"],
    reviewNotes: emptyNotes,
  },
  {
    name: "Popover",
    slug: "popover",
    category: "Base UI",
    layer: "behavior",
    status: "reviewing",
    description: "Small floating panel anchored to a trigger — explanations and quick actions.",
    variants: ["default", "soft", "dark", "light"],
    defaultVariant: "default",
    preview: PopoverPreview,
    contextExamples: ["registry-confirmation"],
    reviewNotes: emptyNotes,
  },
  {
    name: "Tooltip",
    slug: "tooltip",
    category: "Base UI",
    layer: "behavior",
    status: "reviewing",
    description: "Helper text on hover or keyboard focus, with a shared open delay.",
    variants: ["default"],
    defaultVariant: "default",
    preview: TooltipPreview,
    contextExamples: ["creator-dashboard"],
    reviewNotes: emptyNotes,
  },
  {
    name: "Combobox",
    slug: "combobox",
    category: "React Aria",
    layer: "behavior",
    status: "reviewing",
    description: "Searchable single-select list for artists, tags, and metadata fields.",
    variants: ["default"],
    defaultVariant: "default",
    mockDataOptions: [
      { id: "artists", label: "Artist search" },
      { id: "vault-tags", label: "Vault tags" },
    ],
    preview: ComboboxWorkbenchPreview,
    contextExamples: ["vault-fragment-list"],
    reviewNotes: emptyNotes,
  },
  {
    name: "Multi-Select Combobox",
    slug: "multi-select-combobox",
    category: "React Aria",
    layer: "behavior",
    status: "experimental",
    description: "Tagging input with removable chips — vault tags, genres, registry labels.",
    variants: ["default"],
    defaultVariant: "default",
    mockDataOptions: [
      { id: "vault-tags", label: "Vault tags" },
      { id: "genres", label: "Album genres" },
      { id: "registry-labels", label: "Registry labels" },
      { id: "dojo-categories", label: "Dojo categories" },
    ],
    preview: MultiSelectComboboxPreview,
    contextExamples: ["vault-fragment-list"],
    reviewNotes: emptyNotes,
  },
  {
    name: "Command Palette",
    slug: "command-palette",
    category: "Base UI + React Aria",
    layer: "behavior",
    status: "experimental",
    description: "⌘K palette with fuzzy search, grouped commands, and recents. Nothing executes.",
    variants: ["default"],
    defaultVariant: "default",
    preview: CommandPaletteWorkbenchPreview,
    contextExamples: ["sea-portal"],
    reviewNotes: emptyNotes,
  },

  /* ---- Music Particles ---- */
  {
    name: "Album Card",
    slug: "album-card",
    category: "Releases",
    layer: "music-particle",
    status: "rough",
    description: "A release world in card form: artwork, status, tags, and actions.",
    variants: ["default", "compact", "feature", "dark", "light", "media-test"],
    defaultVariant: "default",
    mockDataOptions: mockAlbums.map((album) => ({ id: album.id, label: album.title })),
    preview: AlbumCardPreview,
    contextExamples: ["album-world-hero"],
    reviewNotes: emptyNotes,
  },
  {
    name: "Artist Card",
    slug: "artist-card",
    category: "Creators",
    layer: "music-particle",
    status: "rough",
    description: "Creator identity card: avatar, role, bio, tags, profile actions.",
    variants: ["default", "compact", "profile", "dark", "light"],
    defaultVariant: "default",
    mockDataOptions: mockArtists.map((artist) => ({ id: artist.id, label: artist.name })),
    preview: ArtistCardPreview,
    contextExamples: ["album-world-hero", "creator-dashboard"],
    reviewNotes: emptyNotes,
  },
  {
    name: "Vault Fragment Card",
    slug: "vault-fragment-card",
    category: "Vault",
    layer: "music-particle",
    status: "rough",
    description: "One recovered idea from the vault: demos, voice notes, session notes.",
    variants: ["default", "recovery", "archive", "compact", "dark"],
    defaultVariant: "default",
    mockDataOptions: mockVaultFragments.map((fragment) => ({
      id: fragment.id,
      label: fragment.title,
    })),
    preview: VaultFragmentCardPreview,
    contextExamples: ["vault-fragment-list"],
    reviewNotes: emptyNotes,
  },
  {
    name: "Dojo Module Card",
    slug: "dojo-module-card",
    category: "Dojo",
    layer: "music-particle",
    status: "rough",
    description: "A learning module: difficulty, category, progress, start action.",
    variants: ["default", "lesson", "template", "skill", "dark", "light"],
    defaultVariant: "lesson",
    mockDataOptions: mockDojoModules.map((module) => ({ id: module.id, label: module.title })),
    preview: DojoModuleCardPreview,
    contextExamples: ["sea-portal"],
    reviewNotes: emptyNotes,
  },
  {
    name: "Player Shell",
    slug: "player-shell",
    category: "Player",
    layer: "music-particle",
    status: "reviewing",
    description: "The visual player: artwork, transport, queue, environment. No audio logic.",
    variants: ["expanded", "compact", "docked", "dark", "light"],
    defaultVariant: "expanded",
    mockDataOptions: mockPlayerTracks.map((track) => ({ id: track.id, label: track.title })),
    preview: PlayerShellWorkbenchPreview,
    contextExamples: ["sap-player-dock"],
    reviewNotes: emptyNotes,
  },
  {
    name: "SAP Full Card Player",
    slug: "sap-full-card-player",
    category: "Player",
    layer: "music-particle",
    status: "experimental",
    description:
      "Full card SAP host: SEI Canvas toggle, bottom arc Canvas Action Menu, queue, three-dot options.",
    variants: ["default"],
    defaultVariant: "default",
    mockDataOptions: mockPlayerTracks.map((track) => ({ id: track.id, label: track.title })),
    preview: FullCardPlayerWorkbenchPreview,
    contextExamples: ["sap-player-dock"],
    reviewNotes: emptyNotes,
  },
  {
    name: "Plugin Slot",
    slug: "plugin-slot",
    category: "Plugins",
    layer: "music-particle",
    status: "experimental",
    description: "Placeholder for future plugins: SAP, Vault Radio, creator tools.",
    variants: ["mocked", "planned", "experimental", "disabled"],
    defaultVariant: "mocked",
    mockDataOptions: [
      { id: "sap", label: "SAP" },
      { id: "vault-radio", label: "Vault Radio" },
      { id: "environment-engine", label: "Environment Engine" },
      { id: "registry-seal", label: "Registry Seal" },
      { id: "creator-tools", label: "Creator Tools" },
    ],
    preview: PluginSlotWorkbenchPreview,
    contextExamples: ["plugin-settings-drawer"],
    reviewNotes: emptyNotes,
  },
  {
    name: "Metric Card",
    slug: "metric-card",
    category: "Dashboard",
    layer: "music-particle",
    status: "rough",
    description: "One dashboard number: plays, saves, registered works, vault items.",
    variants: ["default", "soft", "dark", "light", "outline"],
    defaultVariant: "default",
    mockDataOptions: mockMetrics.map((metric) => ({ id: metric.label, label: metric.label })),
    preview: MetricCardWorkbenchPreview,
    contextExamples: ["creator-dashboard"],
    reviewNotes: emptyNotes,
  },
  {
    name: "Action Strip",
    slug: "action-strip",
    category: "Dashboard",
    layer: "music-particle",
    status: "rough",
    description: "A responsive row of actions: primary, secondary, and icon buttons.",
    variants: ["between", "start", "end"],
    defaultVariant: "between",
    preview: ActionStripPreview,
    contextExamples: ["creator-dashboard"],
    reviewNotes: emptyNotes,
  },

  /* ---- Registry ---- */
  {
    name: "Registry Seal",
    slug: "registry-seal",
    category: "Status",
    layer: "registry",
    status: "reviewing",
    description: "The verification chip: draft, registered, verified, archived, experimental.",
    variants: ["draft", "registered", "verified", "archived", "experimental"],
    defaultVariant: "verified",
    mockDataOptions: [
      { id: "with-id", label: "With registry ID" },
      { id: "label-only", label: "Label only" },
    ],
    preview: RegistrySealWorkbenchPreview,
    contextExamples: ["registry-confirmation"],
    reviewNotes: emptyNotes,
  },
  {
    name: "Registry Panel",
    slug: "registry-panel",
    category: "Status",
    layer: "registry",
    status: "rough",
    description: "A full registry record: seal, mock ID, timestamp, and review actions.",
    variants: ["draft", "registered", "verified", "archived", "experimental"],
    defaultVariant: "verified",
    mockDataOptions: mockRegistryItems.map((item) => ({ id: item.id, label: item.title })),
    preview: RegistryPanelWorkbenchPreview,
    contextExamples: ["registry-confirmation"],
    reviewNotes: emptyNotes,
  },

  /* ---- Layout ---- */
  {
    name: "Showcase Hero",
    slug: "showcase-hero",
    category: "Experience Blocks",
    layer: "layout",
    status: "experimental",
    description: "Big page opener for album worlds and portal landings. Heavy by design.",
    variants: ["clean", "soft", "dark", "light", "media", "experimental"],
    defaultVariant: "media",
    mockDataOptions: mockShowcaseEntries.map((entry) => ({ id: entry.id, label: entry.eyebrow })),
    preview: ShowcaseHeroWorkbenchPreview,
    contextExamples: ["album-world-hero"],
    reviewNotes: emptyNotes,
  },
  {
    name: "Showcase Block",
    slug: "showcase-block",
    category: "Experience Blocks",
    layer: "layout",
    status: "rough",
    description: "Titled panel wrapper used to frame examples and grouped content.",
    variants: ["default", "soft", "outline", "glass-test", "media-test", "dark", "light"],
    defaultVariant: "default",
    preview: ShowcaseBlockWorkbenchPreview,
    contextExamples: ["sea-portal"],
    reviewNotes: emptyNotes,
  },
];

export function getComponentBySlug(slug: string): WorkbenchComponentEntry | undefined {
  return componentRegistry.find((entry) => entry.slug === slug);
}

export function getComponentsByLayer(layer: WorkbenchLayer): WorkbenchComponentEntry[] {
  return componentRegistry.filter((entry) => entry.layer === layer);
}

export function getComponentsByStatus(status: ReviewStatus): WorkbenchComponentEntry[] {
  return componentRegistry.filter((entry) => entry.status === status);
}

export const orderedLayers = (Object.keys(layerMeta) as WorkbenchLayer[]).sort(
  (a, b) => layerMeta[a].order - layerMeta[b].order,
);
