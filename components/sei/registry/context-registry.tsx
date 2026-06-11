import type { ComponentType } from "react";
import { ArrowRight, Command, Radio, ShieldCheck, Vault } from "lucide-react";

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
  RegistryPanel,
  RegistrySeal,
  ShowcaseHero,
  VaultFragmentCard,
} from "@/components/sei/particles";
import { SEIBadge } from "@/components/sei/primitives/sei-badge";
import { SEIButton } from "@/components/sei/primitives/sei-button";
import { SEIPanel } from "@/components/sei/primitives/sei-panel";
import {
  SEIDialog,
  SEIDialogClose,
  SEIDialogContent,
  SEIDialogDescription,
  SEIDialogTitle,
  SEIDialogTrigger,
} from "@/components/sei/behavior/sei-dialog";
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
import { seiButtonVariants } from "@/components/sei/styles/variants";

/* ------------------------------------------------------------------ */
/* Context registry — review environments, not final designs.          */
/* Each context places components inside a real SEIHouse product       */
/* situation so the founder can judge them in place.                   */
/* ------------------------------------------------------------------ */

export interface ContextEntry {
  id: string;
  name: string;
  description: string;
  component: ComponentType;
}

function SeaPortalShellContext() {
  return (
    <SEIPanel variant="dark" padding="md" className="w-full">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="grid size-9 place-items-center rounded-full border border-dashed border-[rgba(0,122,255,0.62)] bg-[rgba(0,122,255,0.08)] text-[0.6rem] font-black tracking-[0.14em] text-[var(--sh-color-sea)]">
            SEA
          </div>
          <div>
            <p className="text-sm font-bold tracking-[-0.02em] text-white">SEA Portal</p>
            <p className="font-mono text-[0.65rem] text-[var(--sh-color-mist)]">mock shell · no auth</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <SEIBadge variant="soft" size="sm">
            Education
          </SEIBadge>
          <SEIBadge variant="registry" size="sm">
            Registry
          </SEIBadge>
          <SEIButton variant="ghost" size="sm" icon={Command} aria-label="Command palette" />
        </div>
      </div>
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <DojoModuleCard module={mockDojoModules[0]} variant="lesson" />
        <div className="space-y-4">
          <MetricCard {...mockMetrics[2]} variant="soft" />
          <MetricCard {...mockMetrics[5]} variant="default" />
        </div>
      </div>
    </SEIPanel>
  );
}

function AlbumWorldHeroContext() {
  return (
    <div className="w-full space-y-4">
      <ShowcaseHero
        variant="media"
        entry={mockShowcaseEntries[0]}
        primaryAction="Enter album world"
        secondaryAction="View registry"
        preview={<AlbumCard album={mockAlbums[0]} variant="default" />}
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <ArtistCard artist={mockArtists[0]} variant="default" />
        <AlbumCard album={mockAlbums[1]} variant="compact" />
      </div>
    </div>
  );
}

function VaultFragmentListContext() {
  return (
    <SEIPanel variant="default" padding="md" className="w-full">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <Vault aria-hidden="true" className="size-4 text-[var(--sh-color-sea)]" />
          <h3 className="text-sm font-semibold text-white">Vault · recovered fragments</h3>
        </div>
        <SEIBadge variant="warning" size="sm">
          24 need review
        </SEIBadge>
      </div>
      <div className="mt-4 space-y-3">
        {mockVaultFragments.map((fragment) => (
          <VaultFragmentCard key={fragment.id} fragment={fragment} variant="compact" />
        ))}
      </div>
    </SEIPanel>
  );
}

function SapPlayerDockContext() {
  return (
    <div className="w-full space-y-4">
      <div className="grid min-h-40 place-items-center rounded-[1.35rem] border border-dashed border-white/12 text-sm text-[var(--sh-color-mist)]">
        Page content above the dock
      </div>
      <PlayerShellExpanded track={mockPlayerTracks[0]} variant="docked" />
    </div>
  );
}

function RegistryConfirmationContext() {
  return (
    <div className="w-full space-y-4">
      <RegistryPanel item={mockRegistryItems[0]} />
      <div className="flex flex-wrap items-center gap-3">
        <SEIDialog>
          <SEIDialogTrigger
            render={<SEIButton variant="solid" icon={ShieldCheck}>Register this work</SEIButton>}
          />
          <SEIDialogContent variant="default" className="max-w-md">
            <SEIDialogTitle>Register this work?</SEIDialogTitle>
            <SEIDialogDescription>
              Mocked confirmation flow — nothing is created or sent anywhere.
            </SEIDialogDescription>
            <div className="mt-4 flex items-center gap-3">
              <RegistrySeal status="draft" registryId="D-001" compact />
              <ArrowRight aria-hidden="true" className="size-4 text-[var(--sh-color-mist)]" />
              <RegistrySeal status="registered" registryId="SEI-042" compact />
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <SEIDialogClose render={<SEIButton variant="ghost">Cancel</SEIButton>} />
              <SEIDialogClose render={<SEIButton variant="solid">Confirm</SEIButton>} />
            </div>
          </SEIDialogContent>
        </SEIDialog>
        <RegistrySeal status="verified" registryId="V-777" compact />
      </div>
    </div>
  );
}

function CreatorDashboardContext() {
  return (
    <SEIPanel variant="default" padding="md" className="w-full">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <h3 className="text-sm font-semibold text-white">Creator dashboard</h3>
        <SEIBadge variant="registry" size="sm">
          Mock data
        </SEIBadge>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {mockMetrics.slice(0, 4).map((metric, index) => (
          <MetricCard key={metric.label} {...metric} variant={index % 2 ? "default" : "soft"} />
        ))}
      </div>
      <div className="mt-4 border-t border-white/10 pt-4">
        <ActionStrip
          primary={{ label: "Register work", icon: <ArrowRight className="size-3.5" /> }}
          secondary={{ label: "Review splits" }}
          iconActions={[{ label: "Radio", icon: <Radio className="size-4" /> }]}
        />
      </div>
    </SEIPanel>
  );
}

function PluginSettingsDrawerContext() {
  return (
    <SEIPanel variant="glass-test" padding="md" className="w-full">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-white">Plugin slot · SAP</h3>
          <p className="mt-1 text-sm text-[var(--sh-color-cloud)]">
            Settings open in a swipeable drawer. No plugin runtime is loaded.
          </p>
        </div>
        <SEINativeDrawer side="right">
          <SEINativeDrawerTrigger className={seiButtonVariants({ variant: "solid", size: "sm" })}>
            <Radio aria-hidden="true" className="size-4" />
            Open settings
          </SEINativeDrawerTrigger>
          <SEINativeDrawerContent side="right" size="default" tone="glass-test">
            <SEINativeDrawerHeader>
              <SEINativeDrawerTitle>Plugin slot · SAP</SEINativeDrawerTitle>
            </SEINativeDrawerHeader>
            <SEINativeDrawerBody>
              <div className="space-y-2">
                {["Enable visualizer", "Auto-tag metadata", "Vault Radio eligible"].map((label) => (
                  <label
                    key={label}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-[var(--sh-color-cloud)]"
                  >
                    {label}
                    <span className="h-5 w-9 rounded-full bg-[rgba(0,122,255,0.4)]" aria-hidden="true" />
                  </label>
                ))}
              </div>
            </SEINativeDrawerBody>
            <SEINativeDrawerFooter>
              <SEINativeDrawerClose className={seiButtonVariants({ variant: "ghost" })}>
                Cancel
              </SEINativeDrawerClose>
              <SEINativeDrawerClose className={seiButtonVariants({ variant: "solid" })}>
                Save
              </SEINativeDrawerClose>
            </SEINativeDrawerFooter>
          </SEINativeDrawerContent>
        </SEINativeDrawer>
      </div>
      <div className="mt-4 grid min-h-24 place-items-center rounded-[1.1rem] border border-dashed border-white/15 bg-white/[0.035] text-sm text-[var(--sh-color-mist)]">
        Plugin placeholder area
      </div>
    </SEIPanel>
  );
}

export const contextRegistry: ContextEntry[] = [
  {
    id: "sea-portal",
    name: "SEA Portal shell",
    description: "Portal header with Dojo modules and registry metrics inside.",
    component: SeaPortalShellContext,
  },
  {
    id: "album-world-hero",
    name: "Album world hero",
    description: "A release landing: hero, album card, and artist card together.",
    component: AlbumWorldHeroContext,
  },
  {
    id: "vault-fragment-list",
    name: "Vault fragment list",
    description: "Recovered fragments stacked in a review list.",
    component: VaultFragmentListContext,
  },
  {
    id: "sap-player-dock",
    name: "SAP player dock",
    description: "The docked player shell pinned under page content.",
    component: SapPlayerDockContext,
  },
  {
    id: "registry-confirmation",
    name: "Registry confirmation",
    description: "Registry record plus the register-this-work dialog flow.",
    component: RegistryConfirmationContext,
  },
  {
    id: "creator-dashboard",
    name: "Creator dashboard",
    description: "Metrics and an action strip in an internal dashboard panel.",
    component: CreatorDashboardContext,
  },
  {
    id: "plugin-settings-drawer",
    name: "Plugin settings drawer",
    description: "A plugin slot whose settings open in a swipeable drawer.",
    component: PluginSettingsDrawerContext,
  },
];

export function getContextById(id: string): ContextEntry | undefined {
  return contextRegistry.find((entry) => entry.id === id);
}
