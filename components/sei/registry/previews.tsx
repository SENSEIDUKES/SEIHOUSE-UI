"use client";

import { useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Command,
  Info,
  Layers,
  ListMusic,
  MoreHorizontal,
  Radio,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import {
  mockAlbums,
  mockArtists,
  mockDojoModules,
  mockMetrics,
  mockPlayerTracks,
  mockRegistryItems,
  mockShowcaseEntries,
  mockVaultFragments,
} from "@/components/sei/examples";
import {
  ActionStrip,
  AlbumCard,
  ArtistCard,
  DojoModuleCard,
  MetricCard,
  PlayerShellExpanded,
  PluginSlotPreview,
  RegistryPanel,
  RegistrySeal,
  ShowcaseBlock,
  ShowcaseHero,
  VaultFragmentCard,
} from "@/components/sei/particles";
import { SEIBadge } from "@/components/sei/primitives/sei-badge";
import { SEIButton } from "@/components/sei/primitives/sei-button";
import { SEICard } from "@/components/sei/primitives/sei-card";
import { SEIPanel } from "@/components/sei/primitives/sei-panel";
import { SEISection } from "@/components/sei/primitives/sei-section";

import {
  SEIDialog,
  SEIDialogClose,
  SEIDialogContent,
  SEIDialogDescription,
  SEIDialogTitle,
  SEIDialogTrigger,
} from "@/components/sei/behavior/sei-dialog";
import {
  SEIDrawer,
  SEIDrawerBody,
  SEIDrawerClose,
  SEIDrawerContent,
  SEIDrawerFooter,
  SEIDrawerHeader,
  SEIDrawerTitle,
  SEIDrawerTrigger,
} from "@/components/sei/behavior/sei-drawer";
import {
  SEINativeDrawer,
  SEINativeDrawerBody,
  SEINativeDrawerClose,
  SEINativeDrawerContent,
  SEINativeDrawerFooter,
  SEINativeDrawerHeader,
  SEINativeDrawerTitle,
  SEINativeDrawerTrigger,
} from "@/components/sei/behavior/sei-native-drawer";
import {
  SEIPopover,
  SEIPopoverContent,
  SEIPopoverDescription,
  SEIPopoverTitle,
  SEIPopoverTrigger,
} from "@/components/sei/behavior/sei-popover";
import {
  SEITabs,
  SEITabsList,
  SEITabsPanel,
  SEITabsTrigger,
} from "@/components/sei/behavior/sei-tabs";
import {
  SEITooltip,
  SEITooltipContent,
  SEITooltipProvider,
  SEITooltipTrigger,
} from "@/components/sei/behavior/sei-tooltip";
import { SEIComboboxPreview } from "@/components/sei/behavior/sei-combobox-preview";
import { SEICommandPalette } from "@/components/sei/behavior/sei-command-palette";
import { SEIMultiSelectCombobox } from "@/components/sei/behavior/sei-multi-select-combobox";
import {
  mockDojoCategories,
  mockGenreOptions,
  mockRegistryLabels,
  mockVaultTagOptions,
  mockVaultTags,
} from "@/components/sei/behavior/behavior-mock";
import { seiButtonVariants } from "@/components/sei/styles/variants";

import type { ComponentPreviewProps } from "./component-registry";
import { MockSwitchRow } from "./context-registry";

/* ------------------------------------------------------------------ */
/* Workbench previews                                                   */
/* One small, calm preview per registry entry. Each receives the        */
/* selected variant string and mock-data index from the workbench.      */
/* ------------------------------------------------------------------ */

const pick = <T,>(items: readonly T[], index: number): T =>
  items[Math.min(Math.max(index, 0), items.length - 1)];

/* ---- Foundation ---- */

export function ButtonPreview({ variant }: ComponentPreviewProps) {
  const v = variant as React.ComponentProps<typeof SEIButton>["variant"];
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <SEIButton variant={v} size="sm">
        Small
      </SEIButton>
      <SEIButton variant={v} size="md" icon={Sparkles}>
        Medium
      </SEIButton>
      <SEIButton variant={v} size="lg" iconRight={<ArrowRight className="size-4" />}>
        Large
      </SEIButton>
    </div>
  );
}

export function BadgePreview({ variant }: ComponentPreviewProps) {
  const v = variant as React.ComponentProps<typeof SEIBadge>["variant"];
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <SEIBadge variant={v} size="sm">
        Small
      </SEIBadge>
      <SEIBadge variant={v} size="md" icon={BadgeCheck}>
        Medium
      </SEIBadge>
      <SEIBadge variant={v} size="lg">
        Large
      </SEIBadge>
    </div>
  );
}

export function CardPreview({ variant }: ComponentPreviewProps) {
  return (
    <SEICard
      variant={variant as React.ComponentProps<typeof SEICard>["variant"]}
      interactive
      eyebrow="Project"
      title="SEA Portal shell"
      description="A reusable card for routes, tools, or projects without app logic."
      metadata="UI mock"
      footer="metadata · actions · footer"
      className="w-full max-w-sm"
    />
  );
}

export function PanelPreview({ variant }: ComponentPreviewProps) {
  return (
    <SEIPanel
      variant={variant as React.ComponentProps<typeof SEIPanel>["variant"]}
      padding="md"
      className="w-full max-w-md"
    >
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--sh-color-mist)]">
        Panel surface
      </p>
      <h3 className="mt-2 text-lg font-semibold tracking-[-0.03em]">Registry summary</h3>
      <p className="mt-2 text-sm leading-relaxed text-[var(--sh-color-cloud)]">
        Panels hold players, registry records, and dashboard groups.
      </p>
    </SEIPanel>
  );
}

export function SectionPreview({ variant }: ComponentPreviewProps) {
  return (
    <SEISection
      spacing={variant as React.ComponentProps<typeof SEISection>["spacing"]}
      eyebrow="01 / Example"
      title="Section header"
      description="Eyebrow, title, and a short description above the content area."
      aside={<SEIBadge variant="soft">Aside slot</SEIBadge>}
      className="w-full"
    >
      <div className="grid h-24 place-items-center rounded-2xl border border-dashed border-white/15 text-sm text-[var(--sh-color-mist)]">
        Section content area
      </div>
    </SEISection>
  );
}

/* ---- Behavior ---- */

export function DialogPreview({ variant, mockIndex }: ComponentPreviewProps) {
  const v = variant as React.ComponentProps<typeof SEIDialogContent>["variant"];

  if (mockIndex === 1) {
    return (
      <SEIDialog>
        <SEIDialogTrigger render={<SEIButton variant="soft" icon={Layers}>View album details</SEIButton>} />
        <SEIDialogContent variant={v} className="max-w-md">
          <SEIDialogTitle className="sr-only">Album details</SEIDialogTitle>
          <SEIDialogDescription className="sr-only">
            An AlbumCard rendered inside an accessible dialog.
          </SEIDialogDescription>
          <AlbumCard album={mockAlbums[0]} variant="default" className="mt-1" />
        </SEIDialogContent>
      </SEIDialog>
    );
  }

  return (
    <SEIDialog>
      <SEIDialogTrigger render={<SEIButton variant="solid" icon={ShieldCheck}>Register this work</SEIButton>} />
      <SEIDialogContent variant={v} className="max-w-md">
        <SEIDialogTitle>Register this work?</SEIDialogTitle>
        <SEIDialogDescription>
          Mocked confirmation — no registry record is created. This only demonstrates the modal flow.
        </SEIDialogDescription>
        <div className="mt-5 flex justify-end gap-2">
          <SEIDialogClose render={<SEIButton variant="ghost">Cancel</SEIButton>} />
          <SEIDialogClose render={<SEIButton variant="solid">Confirm</SEIButton>} />
        </div>
      </SEIDialogContent>
    </SEIDialog>
  );
}

export function DrawerPreview({ variant, mockIndex }: ComponentPreviewProps) {
  const side = variant as React.ComponentProps<typeof SEIDrawerContent>["side"];
  const isQueue = mockIndex === 1;

  return (
    <SEIDrawer>
      <SEIDrawerTrigger
        render={
          <SEIButton variant="solid" icon={isQueue ? ListMusic : Layers}>
            {isQueue ? "Open player queue" : "Open vault details"}
          </SEIButton>
        }
      />
      <SEIDrawerContent side={side} size="wide" tone="dark">
        <SEIDrawerHeader>
          <SEIDrawerTitle>{isQueue ? "Up next" : "Vault fragment"}</SEIDrawerTitle>
        </SEIDrawerHeader>
        <SEIDrawerBody>
          {isQueue ? (
            <ul className="space-y-2">
              {mockPlayerTracks[0].queue.map((track, i) => (
                <li
                  key={track}
                  className="flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2 text-sm"
                >
                  <span className="text-[var(--sh-color-cloud)]">
                    <span className="mr-2 font-mono text-xs text-[var(--sh-color-mist)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {track}
                  </span>
                  <SEIBadge size="sm" variant="outline">
                    mock
                  </SEIBadge>
                </li>
              ))}
            </ul>
          ) : (
            <VaultFragmentCard fragment={mockVaultFragments[0]} variant="default" />
          )}
        </SEIDrawerBody>
        <SEIDrawerFooter>
          <SEIDrawerClose render={<SEIButton variant="ghost">Close</SEIButton>} />
          {!isQueue ? <SEIButton variant="solid">Tag fragment</SEIButton> : null}
        </SEIDrawerFooter>
      </SEIDrawerContent>
    </SEIDrawer>
  );
}

export function NativeDrawerPreview({ variant, mockIndex }: ComponentPreviewProps) {
  const side = variant as React.ComponentProps<typeof SEINativeDrawerContent>["side"];
  const isPlugin = mockIndex === 1;
  const triggerClass = seiButtonVariants({ variant: "solid" });

  return (
    <SEINativeDrawer side={side} snapPoints={side === "bottom" ? [0.4, 0.9] : undefined}>
      <SEINativeDrawerTrigger className={triggerClass}>
        {isPlugin ? (
          <Radio aria-hidden="true" className="size-4" />
        ) : (
          <ListMusic aria-hidden="true" className="size-4" />
        )}
        {isPlugin ? "Plugin settings" : "Player queue"}
      </SEINativeDrawerTrigger>
      <SEINativeDrawerContent side={side} tone="dark" size="default">
        <SEINativeDrawerHeader>
          <SEINativeDrawerTitle>
            {isPlugin ? "Plugin slot · SAP" : "Up next · drag or snap"}
          </SEINativeDrawerTitle>
        </SEINativeDrawerHeader>
        <SEINativeDrawerBody>
          {isPlugin ? (
            <div className="space-y-2 pb-4">
              {["Enable visualizer", "Auto-tag metadata", "Vault Radio eligible"].map((label) => (
                <MockSwitchRow key={label} label={label} />
              ))}
            </div>
          ) : (
            <ul className="space-y-2 pb-4">
              {mockPlayerTracks[0].queue.map((track, i) => (
                <li
                  key={track}
                  className="flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2 text-sm"
                >
                  <span className="text-[var(--sh-color-cloud)]">
                    <span className="mr-2 font-mono text-xs text-[var(--sh-color-mist)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {track}
                  </span>
                  <SEIBadge size="sm" variant="outline">
                    mock
                  </SEIBadge>
                </li>
              ))}
            </ul>
          )}
        </SEINativeDrawerBody>
        <SEINativeDrawerFooter>
          <SEINativeDrawerClose className={seiButtonVariants({ variant: "ghost" })}>
            Done
          </SEINativeDrawerClose>
        </SEINativeDrawerFooter>
      </SEINativeDrawerContent>
    </SEINativeDrawer>
  );
}

export function TabsPreview({ variant }: ComponentPreviewProps) {
  return (
    <div className="w-full max-w-md">
      <SEITabs
        defaultValue="albums"
        variant={variant as React.ComponentProps<typeof SEITabs>["variant"]}
      >
        <SEITabsList>
          <SEITabsTrigger value="albums">Albums</SEITabsTrigger>
          <SEITabsTrigger value="vault">Vault</SEITabsTrigger>
          <SEITabsTrigger value="registry">Registry</SEITabsTrigger>
          <SEITabsTrigger value="archived" disabled>
            Archived
          </SEITabsTrigger>
        </SEITabsList>
        <SEITabsPanel value="albums">Album lane panel. Tabs only switch panels.</SEITabsPanel>
        <SEITabsPanel value="vault">Vault lane panel — nothing is loaded.</SEITabsPanel>
        <SEITabsPanel value="registry">Registry lane panel. Verification is mocked.</SEITabsPanel>
      </SEITabs>
    </div>
  );
}

export function PopoverPreview({ variant }: ComponentPreviewProps) {
  return (
    <SEIPopover>
      <SEIPopoverTrigger render={<SEIButton variant="outline" icon={Info}>Metadata info</SEIButton>} />
      <SEIPopoverContent
        variant={variant as React.ComponentProps<typeof SEIPopoverContent>["variant"]}
        side="bottom"
        className="max-w-sm"
      >
        <SEIPopoverTitle>Quick actions</SEIPopoverTitle>
        <SEIPopoverDescription>
          Popovers host quick actions, plugin-slot notes, or metadata details.
        </SEIPopoverDescription>
      </SEIPopoverContent>
    </SEIPopover>
  );
}

export function TooltipPreview(_props: ComponentPreviewProps) {
  return (
    <SEITooltipProvider>
      <div className="flex items-center gap-3">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--sh-color-mist)]">
            {mockMetrics[0].label}
          </p>
          <p className="text-2xl font-black tracking-[-0.06em] text-white">{mockMetrics[0].value}</p>
        </div>
        <SEITooltip>
          <SEITooltipTrigger
            render={
              <button
                type="button"
                aria-label="About this metric"
                className="grid size-8 place-items-center rounded-full border border-white/12 bg-white/[0.04] text-[var(--sh-color-mist)] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sh-color-sea)]"
              >
                <Info aria-hidden="true" className="size-4" />
              </button>
            }
          />
          <SEITooltipContent>{mockMetrics[0].helper}</SEITooltipContent>
        </SEITooltip>
      </div>
    </SEITooltipProvider>
  );
}

export function ComboboxWorkbenchPreview({ mockIndex }: ComponentPreviewProps) {
  if (mockIndex === 1) {
    return (
      <div className="w-full max-w-xs">
        <SEIComboboxPreview label="Pick vault tag" placeholder="Find a tag…" options={mockVaultTagOptions} />
      </div>
    );
  }
  return (
    <div className="w-full max-w-xs">
      <SEIComboboxPreview label="Search artists" />
    </div>
  );
}

export function MultiSelectComboboxPreview({ mockIndex }: ComponentPreviewProps) {
  const configs = [
    {
      label: "Vault tag picker",
      description: "Mock vault tags — one option is disabled.",
      options: mockVaultTags,
      defaultValue: ["demo"],
    },
    {
      label: "Album genre picker",
      description: "Pick one or more genres.",
      options: mockGenreOptions,
      defaultValue: ["melodic-rap", "rnb"],
    },
    {
      label: "Registry label picker",
      description: "Mock validation shows the error state.",
      options: mockRegistryLabels,
      defaultValue: [] as string[],
    },
    {
      label: "Dojo category picker",
      description: "Categorize a Dojo module.",
      options: mockDojoCategories,
      defaultValue: ["artist-world"],
    },
  ] as const;
  const config = pick(configs, mockIndex);

  return (
    <div className="w-full max-w-sm">
      <SEIMultiSelectCombobox
        key={config.label}
        label={config.label}
        description={config.description}
        placeholder="Search…"
        options={config.options}
        defaultValue={[...config.defaultValue]}
        errorMessage={
          config.label === "Registry label picker"
            ? "At least one label is required (mock validation)."
            : undefined
        }
      />
    </div>
  );
}

export function CommandPaletteWorkbenchPreview(_props: ComponentPreviewProps) {
  const [open, setOpen] = useState(false);
  const [last, setLast] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <SEIButton variant="solid" icon={Command} onClick={() => setOpen(true)}>
        Open command palette
      </SEIButton>
      <p className="text-xs text-[var(--sh-color-mist)]">
        or press{" "}
        <kbd className="rounded-md border border-white/12 bg-white/[0.05] px-1.5 py-0.5 font-mono text-xs">
          ⌘K
        </kbd>{" "}
        /{" "}
        <kbd className="rounded-md border border-white/12 bg-white/[0.05] px-1.5 py-0.5 font-mono text-xs">
          Ctrl K
        </kbd>
        {last ? <span className="ml-2 text-[var(--sh-color-sea)]">Last run (mock): {last}</span> : null}
      </p>
      <SEICommandPalette open={open} onOpenChange={setOpen} onCommand={(id) => setLast(id)} />
    </div>
  );
}

/* ---- Music Particles ---- */

export function AlbumCardPreview({ variant, mockIndex }: ComponentPreviewProps) {
  return (
    <AlbumCard
      album={pick(mockAlbums, mockIndex)}
      variant={variant as React.ComponentProps<typeof AlbumCard>["variant"]}
      className={variant === "feature" ? "w-full max-w-xl md:col-span-1" : "w-full max-w-sm"}
    />
  );
}

export function ArtistCardPreview({ variant, mockIndex }: ComponentPreviewProps) {
  return (
    <ArtistCard
      artist={pick(mockArtists, mockIndex)}
      variant={variant as React.ComponentProps<typeof ArtistCard>["variant"]}
      className={variant === "profile" ? "w-full max-w-xl md:col-span-1" : "w-full max-w-sm"}
    />
  );
}

export function VaultFragmentCardPreview({ variant, mockIndex }: ComponentPreviewProps) {
  return (
    <VaultFragmentCard
      fragment={pick(mockVaultFragments, mockIndex)}
      variant={variant as React.ComponentProps<typeof VaultFragmentCard>["variant"]}
      className="w-full max-w-sm"
    />
  );
}

export function DojoModuleCardPreview({ variant, mockIndex }: ComponentPreviewProps) {
  return (
    <DojoModuleCard
      module={pick(mockDojoModules, mockIndex)}
      variant={variant as React.ComponentProps<typeof DojoModuleCard>["variant"]}
      className="w-full max-w-sm"
    />
  );
}

export function PlayerShellWorkbenchPreview({ variant, mockIndex }: ComponentPreviewProps) {
  return (
    <PlayerShellExpanded
      track={pick(mockPlayerTracks, mockIndex)}
      variant={variant as React.ComponentProps<typeof PlayerShellExpanded>["variant"]}
      className="w-full"
    />
  );
}

const pluginSlotMocks = [
  {
    slotName: "SAP",
    description: "Visual placeholder for future song asset package controls and metadata surfaces.",
  },
  {
    slotName: "Vault Radio",
    description: "A non-playing slot for future radio, queue, and fragment programming concepts.",
  },
  {
    slotName: "Environment Engine",
    description: "Mock controls for ambience, context, and adaptive player environments.",
  },
  {
    slotName: "Registry Seal",
    description: "Placeholder area for future verification visuals without registry logic.",
  },
  {
    slotName: "Creator Tools",
    description: "Future slot for rollout tasks, split reminders, templates, and internal actions.",
  },
] as const;

export function PluginSlotWorkbenchPreview({ variant, mockIndex }: ComponentPreviewProps) {
  const slot = pick(pluginSlotMocks, mockIndex);
  return (
    <PluginSlotPreview
      slotName={slot.slotName}
      description={slot.description}
      status={variant as React.ComponentProps<typeof PluginSlotPreview>["status"]}
      className="w-full max-w-sm"
    />
  );
}

export function MetricCardWorkbenchPreview({ variant, mockIndex }: ComponentPreviewProps) {
  const metric = pick(mockMetrics, mockIndex);
  return (
    <MetricCard
      {...metric}
      variant={variant as React.ComponentProps<typeof MetricCard>["variant"]}
      className="w-full max-w-xs"
    />
  );
}

export function ActionStripPreview({ variant }: ComponentPreviewProps) {
  return (
    <div className="w-full max-w-lg rounded-2xl border border-dashed border-white/12 p-4">
      <ActionStrip
        align={variant as React.ComponentProps<typeof ActionStrip>["align"]}
        primary={{ label: "Launch showcase", icon: <ArrowRight className="size-3.5" /> }}
        secondary={{ label: "Save draft" }}
        iconActions={[
          { label: "Radio", icon: <Radio className="size-4" /> },
          { label: "More", icon: <MoreHorizontal className="size-4" /> },
        ]}
      />
    </div>
  );
}

/* ---- Registry ---- */

export function RegistrySealWorkbenchPreview({ variant, mockIndex }: ComponentPreviewProps) {
  return (
    <RegistrySeal
      status={variant as React.ComponentProps<typeof RegistrySeal>["status"]}
      registryId={mockIndex === 0 ? "SEI-042" : undefined}
    />
  );
}

export function RegistryPanelWorkbenchPreview({ variant, mockIndex }: ComponentPreviewProps) {
  return (
    <RegistryPanel
      item={pick(mockRegistryItems, mockIndex)}
      state={variant as React.ComponentProps<typeof RegistryPanel>["state"]}
      className="w-full max-w-md"
    />
  );
}

/* ---- Layout ---- */

export function ShowcaseHeroWorkbenchPreview({ variant, mockIndex }: ComponentPreviewProps) {
  return (
    <ShowcaseHero
      entry={pick(mockShowcaseEntries, mockIndex)}
      variant={variant as React.ComponentProps<typeof ShowcaseHero>["variant"]}
      className="w-full"
    />
  );
}

export function ShowcaseBlockWorkbenchPreview({ variant }: ComponentPreviewProps) {
  return (
    <ShowcaseBlock
      variant={variant as React.ComponentProps<typeof ShowcaseBlock>["variant"]}
      title="Showcase block"
      description="A titled panel wrapper for framing grouped examples."
      className="w-full max-w-md"
    >
      <div className="flex flex-wrap gap-2">
        <SEIBadge variant="soft">Composable</SEIBadge>
        <SEIBadge variant="outline">Calm</SEIBadge>
      </div>
    </ShowcaseBlock>
  );
}
