"use client";

import { Info, Layers, MessageSquare, Search, ShieldCheck, Sparkles } from "lucide-react";

import {
  mockAlbums,
  mockMetrics,
  mockVaultFragments,
} from "@/lib/mock-data/examples";
import { AlbumCard } from "@seihouse/ui";
import { RegistrySeal } from "@seihouse/ui";
import { ShowcaseBlock } from "@seihouse/ui";
import { VaultFragmentCard } from "@seihouse/ui";
import { SEIBadge } from "@seihouse/ui";
import { SEIButton } from "@seihouse/ui";
import { cn } from "@seihouse/ui";

import {
  SEIDialog,
  SEIDialogClose,
  SEIDialogContent,
  SEIDialogDescription,
  SEIDialogTitle,
  SEIDialogTrigger,
} from "@seihouse/ui";
import {
  SEIDrawer,
  SEIDrawerBody,
  SEIDrawerContent,
  SEIDrawerFooter,
  SEIDrawerHeader,
  SEIDrawerClose,
  SEIDrawerTitle,
  SEIDrawerTrigger,
} from "@seihouse/ui";
import {
  SEITabs,
  SEITabsList,
  SEITabsPanel,
  SEITabsTrigger,
} from "@seihouse/ui";
import {
  SEIPopover,
  SEIPopoverContent,
  SEIPopoverDescription,
  SEIPopoverTitle,
  SEIPopoverTrigger,
} from "@seihouse/ui";
import {
  SEITooltip,
  SEITooltipContent,
  SEITooltipProvider,
  SEITooltipTrigger,
} from "@seihouse/ui";
import { SEIComboboxPreview } from "@seihouse/ui";
import { SEICommandPreview } from "@seihouse/ui";
import { mockArtistOptions, mockCommandGroups, mockVaultTagOptions } from "@/lib/mock-data/behavior-mock";

const registryTabs = [
  {
    value: "overview",
    label: "Overview",
    body: "Mock summary of the registry record: contributors, release link, and current state. No registry service is attached.",
  },
  {
    value: "metadata",
    label: "Metadata",
    body: "Visual metadata grid — ISRC-style ids, key, BPM, and lane labels are all placeholder strings.",
  },
  {
    value: "vault",
    label: "Vault",
    body: "Linked vault fragments would appear here. Tabs only switch panels; nothing is loaded.",
  },
  {
    value: "registry",
    label: "Registry",
    body: "Seal history and verification notes for the lab display. Verification is mocked.",
  },
  {
    value: "plugins",
    label: "Plugins",
    body: "Placeholder slots for SAP, Vault Radio, and creator tools. No plugin runtime exists.",
  },
] as const;

/** A small labelled demo wrapper used inside the behavior section. */
function Demo({
  title,
  poweredBy,
  usage,
  children,
  className,
  contentClassName,
}: {
  title: string;
  poweredBy: "Base UI" | "React Aria";
  usage: string;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}) {
  return (
    <ShowcaseBlock
      variant="default"
      title={title}
      description={usage}
      className={className}
      actions={
        <SEIBadge variant={poweredBy === "Base UI" ? "soft" : "media-test"} size="sm">
          {poweredBy}
        </SEIBadge>
      }
      contentClassName={cn("flex flex-wrap items-center gap-3", contentClassName)}
    >
      {children}
    </ShowcaseBlock>
  );
}

export function BehaviorShowcase() {
  return (
    <SEITooltipProvider>
      <div id="behavior" className="space-y-6">
        {/* Dialog + Drawer row */}
        <div className="grid gap-5 lg:grid-cols-2">
          <Demo
            title="SEIDialog"
            poweredBy="Base UI"
            usage="Accessible modal dialog: focus trap, Escape to close, click-outside, and focus return to the trigger. Used for confirm actions and rich detail views like opening an AlbumCard."
          >
            {/* Confirm-action dialog */}
            <SEIDialog>
              <SEIDialogTrigger
                render={<SEIButton variant="solid" icon={ShieldCheck}>Confirm action</SEIButton>}
              />
              <SEIDialogContent variant="default" className="max-w-md">
                <SEIDialogTitle>Register this work?</SEIDialogTitle>
                <SEIDialogDescription>
                  This is a mocked confirmation. No registry record is created and nothing is sent
                  anywhere — it only demonstrates an accessible modal flow.
                </SEIDialogDescription>
                <div className="mt-5 flex justify-end gap-2">
                  <SEIDialogClose render={<SEIButton variant="ghost">Cancel</SEIButton>} />
                  <SEIDialogClose render={<SEIButton variant="solid">Confirm</SEIButton>} />
                </div>
              </SEIDialogContent>
            </SEIDialog>

            {/* AlbumCard inside a dialog */}
            <SEIDialog>
              <SEIDialogTrigger
                render={<SEIButton variant="soft" icon={Layers}>View album details</SEIButton>}
              />
              <SEIDialogContent variant="glass-test" className="max-w-md">
                <SEIDialogTitle className="sr-only">Album details</SEIDialogTitle>
                <SEIDialogDescription className="sr-only">
                  A Phase 2 AlbumCard rendered inside an accessible dialog.
                </SEIDialogDescription>
                <AlbumCard album={mockAlbums[0]} variant="default" className="mt-1" />
              </SEIDialogContent>
            </SEIDialog>
          </Demo>

          <Demo
            title="SEIDrawer"
            poweredBy="Base UI"
            usage="Side / bottom panel for queues, vault details, and creator tools. Built on the Base UI Dialog primitive so SEIHouse fully controls side, size, and slide direction."
          >
            {/* VaultFragmentCard details in a right drawer */}
            <SEIDrawer>
              <SEIDrawerTrigger
                render={<SEIButton variant="solid" icon={Layers}>Open vault details</SEIButton>}
              />
              <SEIDrawerContent side="right" size="wide" tone="dark">
                <SEIDrawerHeader>
                  <SEIDrawerTitle>Vault fragment</SEIDrawerTitle>
                </SEIDrawerHeader>
                <SEIDrawerBody>
                  <VaultFragmentCard fragment={mockVaultFragments[0]} variant="default" />
                </SEIDrawerBody>
                <SEIDrawerFooter>
                  <SEIDrawerClose render={<SEIButton variant="ghost">Close</SEIButton>} />
                  <SEIButton variant="solid">Tag fragment</SEIButton>
                </SEIDrawerFooter>
              </SEIDrawerContent>
            </SEIDrawer>

            {/* Bottom drawer: mock player queue */}
            <SEIDrawer>
              <SEIDrawerTrigger
                render={<SEIButton variant="soft">Player queue (bottom)</SEIButton>}
              />
              <SEIDrawerContent side="bottom" tone="dark">
                <SEIDrawerHeader>
                  <SEIDrawerTitle>Up next</SEIDrawerTitle>
                </SEIDrawerHeader>
                <SEIDrawerBody className="max-h-72">
                  <ul className="space-y-2">
                    {["Midnight Registry", "House Keys Intro", "North Dock reprise", "Light Leak Reference"].map(
                      (track, i) => (
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
                      ),
                    )}
                  </ul>
                </SEIDrawerBody>
                <SEIDrawerFooter>
                  <SEIDrawerClose render={<SEIButton variant="ghost">Done</SEIButton>} />
                </SEIDrawerFooter>
              </SEIDrawerContent>
            </SEIDrawer>
          </Demo>
        </div>

        {/* Tabs inside a registry-style panel */}
        <ShowcaseBlock
          variant="soft"
          title="SEITabs"
          description="Keyboard-navigable tabs (arrow keys, Home/End) shown inside a registry-style panel. Active/disabled states and the underline indicator are SEI-styled."
          actions={<SEIBadge variant="soft" size="sm">Base UI</SEIBadge>}
        >
          <div className="space-y-5">
            <SEITabs defaultValue="overview" variant="underline">
              <SEITabsList>
                {registryTabs.map((tab) => (
                  <SEITabsTrigger key={tab.value} value={tab.value}>
                    {tab.label}
                  </SEITabsTrigger>
                ))}
                <SEITabsTrigger value="disabled" disabled>
                  Archived
                </SEITabsTrigger>
              </SEITabsList>
              {registryTabs.map((tab) => (
                <SEITabsPanel key={tab.value} value={tab.value}>
                  {tab.body}
                </SEITabsPanel>
              ))}
            </SEITabs>

            <div className="grid gap-4 border-t border-white/10 pt-5 md:grid-cols-3">
              {(["pill", "panel", "default"] as const).map((variant) => (
                <div key={variant} className="space-y-2">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--sh-color-mist)]">
                    {variant}
                  </p>
                  <SEITabs defaultValue="a" variant={variant}>
                    <SEITabsList>
                      <SEITabsTrigger value="a">Albums</SEITabsTrigger>
                      <SEITabsTrigger value="b">Vault</SEITabsTrigger>
                      <SEITabsTrigger value="c">Dojo</SEITabsTrigger>
                    </SEITabsList>
                    <SEITabsPanel value="a">Album lane panel.</SEITabsPanel>
                    <SEITabsPanel value="b">Vault lane panel.</SEITabsPanel>
                    <SEITabsPanel value="c">Dojo lane panel.</SEITabsPanel>
                  </SEITabs>
                </div>
              ))}
            </div>
          </div>
        </ShowcaseBlock>

        {/* Popover + Tooltip row */}
        <div className="grid gap-5 lg:grid-cols-2">
          <Demo
            title="SEIPopover"
            poweredBy="Base UI"
            usage="Floating content anchored to a trigger (flip / shift positioning). Here a RegistrySeal explains its state on click — the seal itself is the trigger."
          >
            <SEIPopover>
              <SEIPopoverTrigger
                render={
                  <button type="button" className="rounded-full focus-visible:outline-none">
                    <RegistrySeal status="verified" registryId="V-777" />
                  </button>
                }
              />
              <SEIPopoverContent variant="soft" side="bottom" className="max-w-sm">
                <SEIPopoverTitle>Verified seal</SEIPopoverTitle>
                <SEIPopoverDescription>
                  Mock explanation: a verified seal means contributor lines and a placeholder
                  checksum were confirmed for the lab display. No registry database is involved.
                </SEIPopoverDescription>
              </SEIPopoverContent>
            </SEIPopover>

            <SEIPopover>
              <SEIPopoverTrigger
                render={<SEIButton variant="outline" icon={Info}>Metadata info</SEIButton>}
              />
              <SEIPopoverContent variant="default" side="bottom">
                <SEIPopoverTitle>Quick actions</SEIPopoverTitle>
                <SEIPopoverDescription>
                  Popovers can host quick actions, plugin-slot notes, or metadata details.
                </SEIPopoverDescription>
              </SEIPopoverContent>
            </SEIPopover>
          </Demo>

          <Demo
            title="SEITooltip"
            poweredBy="Base UI"
            usage="Helper text on hover and keyboard focus, with a shared open delay. Here an info control on a MetricCard explains the metric."
          >
            <div className="flex items-center gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--sh-color-mist)]">
                  {mockMetrics[0].label}
                </p>
                <p className="text-2xl font-black tracking-[-0.06em] text-white">
                  {mockMetrics[0].value}
                </p>
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
                <SEITooltipContent data-testid="metric-tooltip">
                  {mockMetrics[0].helper}
                </SEITooltipContent>
              </SEITooltip>
            </div>

            <SEITooltip>
              <SEITooltipTrigger
                render={
                  <button type="button" className="rounded-full focus-visible:outline-none">
                    <SEIBadge variant="registry">Registry</SEIBadge>
                  </button>
                }
              />
              <SEITooltipContent>Explains what a registry badge represents (mock).</SEITooltipContent>
            </SEITooltip>
          </Demo>
        </div>

        {/* Combobox + Command preview row */}
        <div className="grid gap-5 lg:grid-cols-2">
          <ShowcaseBlock
            variant="default"
            title="SEIComboboxPreview"
            description="Searchable, keyboard-navigable combobox with an accessible label and empty state. Mock data for artist search and vault tags."
            actions={<SEIBadge variant="media-test" size="sm">React Aria</SEIBadge>}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <SEIComboboxPreview label="Search artists" options={mockArtistOptions} />
              <SEIComboboxPreview
                label="Pick vault tag"
                placeholder="Find a tag…"
                options={mockVaultTagOptions}
              />
            </div>
          </ShowcaseBlock>

          <ShowcaseBlock
            variant="default"
            title="SEICommandPreview"
            description="Command-palette preview: type to filter grouped commands (Albums, Vault, Registry, Dojo, Creator Tools) with full keyboard navigation. Nothing executes."
            actions={<SEIBadge variant="media-test" size="sm">React Aria</SEIBadge>}
          >
            <SEICommandPreview groups={mockCommandGroups} />
          </ShowcaseBlock>
        </div>
      </div>
    </SEITooltipProvider>
  );
}
