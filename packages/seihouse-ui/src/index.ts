// Public SEIHouse UI package surface.
// Keep this file explicit: workbench/demo registries and mock data are intentionally not exported.

export { SEIBadge, type SEIBadgeProps } from "./primitives/sei-badge";
export { SEIButton, type SEIButtonProps } from "./primitives/sei-button";
export { SEICard, type SEICardProps } from "./primitives/sei-card";
export { SEIPanel, type SEIPanelProps } from "./primitives/sei-panel";
export { SEISection, type SEISectionProps } from "./primitives/sei-section";

export { ActionStrip, type ActionStripAction, type ActionStripProps } from "./particles/action-strip";
export { AlbumCard, type AlbumCardProps } from "./particles/album-card";
export { ArtistCard, type ArtistCardProps } from "./particles/artist-card";
export { DojoModuleCard, type DojoModuleCardProps } from "./particles/dojo-module-card";
export { MediaCard, type MediaCardProps } from "./particles/media-card";
export { MetricCard, type MetricCardProps } from "./particles/metric-card";
export { PlayerShellExpanded, type PlayerShellExpandedProps } from "./particles/player-shell-expanded";
export { PlayerShellPreview, type PlayerShellPreviewProps } from "./particles/player-shell-preview";
export { PluginSlotPreview, type PluginSlotKind, type PluginSlotPreviewProps } from "./particles/plugin-slot-preview";
export { RegistryPanel, type RegistryPanelProps } from "./particles/registry-panel";
export { RegistrySeal, type RegistrySealProps, type RegistryStatus } from "./particles/registry-seal";
export { ShowcaseBlock, type ShowcaseBlockProps } from "./particles/showcase-block";
export { ShowcaseHero, type ShowcaseHeroProps } from "./particles/showcase-hero";
export { VaultFragmentCard, type VaultFragmentCardProps } from "./particles/vault-fragment-card";

export {
  SEIDialog,
  SEIDialogClose,
  SEIDialogContent,
  SEIDialogDescription,
  SEIDialogTitle,
  SEIDialogTrigger,
  seiDialogStyles,
  type SEIDialogCloseProps,
  type SEIDialogContentProps,
  type SEIDialogDescriptionProps,
  type SEIDialogProps,
  type SEIDialogTitleProps,
  type SEIDialogTriggerProps,
} from "./behavior/sei-dialog";
export {
  SEIDrawer,
  SEIDrawerBody,
  SEIDrawerClose,
  SEIDrawerContent,
  SEIDrawerDescription,
  SEIDrawerFooter,
  SEIDrawerHeader,
  SEIDrawerTitle,
  SEIDrawerTrigger,
  seiDrawerStyles,
  type SEIDrawerBodyProps,
  type SEIDrawerCloseProps,
  type SEIDrawerContentProps,
  type SEIDrawerDescriptionProps,
  type SEIDrawerFooterProps,
  type SEIDrawerHeaderProps,
  type SEIDrawerProps,
  type SEIDrawerTitleProps,
  type SEIDrawerTriggerProps,
} from "./behavior/sei-drawer";
export {
  SEINativeDrawer,
  SEINativeDrawerBody,
  SEINativeDrawerClose,
  SEINativeDrawerContent,
  SEINativeDrawerDescription,
  SEINativeDrawerFooter,
  SEINativeDrawerHeader,
  SEINativeDrawerTitle,
  SEINativeDrawerTrigger,
  seiNativeDrawerStyles,
  type SEINativeDrawerCloseProps,
  type SEINativeDrawerContentProps,
  type SEINativeDrawerDescriptionProps,
  type SEINativeDrawerHeaderProps,
  type SEINativeDrawerProps,
  type SEINativeDrawerTitleProps,
  type SEINativeDrawerTriggerProps,
} from "./behavior/sei-native-drawer";
export {
  SEIPopover,
  SEIPopoverClose,
  SEIPopoverContent,
  SEIPopoverDescription,
  SEIPopoverTitle,
  SEIPopoverTrigger,
  seiPopoverStyles,
  type SEIPopoverCloseProps,
  type SEIPopoverContentProps,
  type SEIPopoverDescriptionProps,
  type SEIPopoverProps,
  type SEIPopoverTitleProps,
  type SEIPopoverTriggerProps,
} from "./behavior/sei-popover";
export {
  SEITabs,
  SEITabsList,
  SEITabsPanel,
  SEITabsTrigger,
  seiTabsStyles,
  type SEITabsListProps,
  type SEITabsPanelProps,
  type SEITabsProps,
  type SEITabsTriggerProps,
} from "./behavior/sei-tabs";
export {
  SEITooltip,
  SEITooltipContent,
  SEITooltipProvider,
  SEITooltipTrigger,
  seiTooltipStyles,
  type SEITooltipContentProps,
  type SEITooltipProps,
  type SEITooltipProviderProps,
  type SEITooltipTriggerProps,
} from "./behavior/sei-tooltip";
export { SEIComboboxPreview, type SEIComboboxPreviewProps } from "./behavior/sei-combobox-preview";
export { SEICommandPalette, type SEICommandPaletteProps } from "./behavior/sei-command-palette";
export { SEICommandPreview, type SEICommandPreviewProps } from "./behavior/sei-command-preview";
export { SEIMultiSelectCombobox, type SEIMultiSelectComboboxProps } from "./behavior/sei-multi-select-combobox";
export { fuzzyMatch, highlightSegments, type FuzzyResult } from "./behavior/fuzzy";

export { cn } from "./styles/cn";
export {
  focusRing,
  registrySealVariants,
  seiBadgeVariants,
  seiButtonVariants,
  seiCardVariants,
  seiCommandGroupHeader,
  seiInteractiveItemVariants,
  seiOverlayVariants,
  seiPanelVariants,
  seiPopupSurfaceVariants,
  seiSectionVariants,
  transitionSurface,
  type RegistrySealVariantProps,
  type SEIBadgeVariantProps,
  type SEIButtonVariantProps,
  type SEICardVariantProps,
  type SEIOverlayVariantProps,
  type SEIPanelVariantProps,
  type SEIPopupSurfaceVariantProps,
  type SEISectionVariantProps,
} from "./styles/variants";
export { motionSafe, motionSafeFade, motionSafeTransform, prefersReducedMotion, reducedMotionNotes } from "./styles/reduced-motion";

export type {
  Album,
  Artist,
  DojoModule,
  PlayerTrack,
  RegistryItem,
  RegistryState,
  ShowcaseEntry,
  VaultFragment,
} from "./types/music";
export type { ComboOption, CommandGroup, CommandItem, MultiSelectOption } from "./types/behavior";