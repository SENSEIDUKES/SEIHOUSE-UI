import {
  ArrowRight,
  BadgeCheck,
  Boxes,
  Disc3,
  Layers,
  Music2,
  Palette,
  Play,
  Radio,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { MediaCard } from "@/components/sei/particles/media-card";
import { PlayerShellPreview } from "@/components/sei/particles/player-shell-preview";
import { RegistrySeal } from "@/components/sei/particles/registry-seal";
import { ShowcaseBlock } from "@/components/sei/particles/showcase-block";
import { SEIBadge } from "@/components/sei/primitives/sei-badge";
import { SEIButton } from "@/components/sei/primitives/sei-button";
import { SEICard } from "@/components/sei/primitives/sei-card";
import { SEIPanel } from "@/components/sei/primitives/sei-panel";
import { SEISection } from "@/components/sei/primitives/sei-section";

const styleLanes = [
  {
    name: "Clean",
    variant: "default",
    description: "Neutral lab surface for general product UI.",
  },
  {
    name: "Soft",
    variant: "soft",
    description: "Low-pressure blue tint for calm navigation and onboarding.",
  },
  {
    name: "Dark",
    variant: "dark",
    description: "Dense studio surface for media, dashboards, and focused tools.",
  },
  {
    name: "Light",
    variant: "light",
    description: "High-contrast neutral lane to test non-dark contexts.",
  },
  {
    name: "Glass Test",
    variant: "glass-test",
    description: "Frosted overlay experiments inspired by player shells and panels.",
  },
  {
    name: "Media Test",
    variant: "media-test",
    description: "Music-forward gradients for cards, players, and campaign surfaces.",
  },
] as const;

const buttonVariants = [
  "default",
  "soft",
  "outline",
  "ghost",
  "solid",
  "dark",
  "light",
  "glass-test",
  "media-test",
] as const;

const badgeVariants = [
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
] as const;

const mediaExamples = [
  {
    title: "Expanded Album World",
    subtitle: "Album / artist world",
    description:
      "A reusable media card for releases, campaigns, playlists, or project fragments.",
    category: "Album",
    status: "Draft lane",
    meta: "SH-042",
    accent: "sea",
    icon: Disc3,
  },
  {
    title: "Vault Radio Concept",
    subtitle: "Streaming shell preview",
    description:
      "Visual direction for future audio surfaces without adding playback behavior yet.",
    category: "Radio",
    status: "Visual only",
    meta: "No backend",
    accent: "accent",
    icon: Radio,
  },
  {
    title: "Creator Fragment",
    subtitle: "Reusable showcase item",
    description:
      "Flexible enough for artists, projects, collections, or registry-linked works.",
    category: "Fragment",
    status: "Verified mock",
    meta: "SEI-LAB",
    accent: "success",
    icon: Music2,
  },
] as const;

export function SEIComponentShowcase({ route = "/" }: { route?: string }) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--sh-color-black)] text-[var(--sh-color-ivory)]">
      <div
        aria-hidden="true"
        className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.026)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.026)_1px,transparent_1px),radial-gradient(circle_at_12%_8%,rgba(0,122,255,0.24),transparent_34rem),radial-gradient(circle_at_84%_12%,rgba(255,107,53,0.14),transparent_30rem),#050609] bg-[length:44px_44px,44px_44px,auto,auto,auto]"
      />
      <div
        aria-hidden="true"
        className="fixed inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#050609] to-transparent"
      />

      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#050609]/75 backdrop-blur-2xl">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid size-10 place-items-center rounded-full border border-dashed border-[rgba(0,122,255,0.62)] bg-[rgba(0,122,255,0.08)] text-xs font-black tracking-[0.14em] text-[var(--sh-color-sea)] shadow-[0_0_28px_rgba(0,122,255,0.16)]">
              SEI
            </div>
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-white">
                SEIHOUSE UI
              </p>
              <p className="font-mono text-xs text-[var(--sh-color-mist)]">
                {route} · component lab
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <SEIBadge variant="soft" icon={Sparkles}>
              Phase 1
            </SEIBadge>
            <SEIBadge variant="registry">Tailwind variants</SEIBadge>
            <SEIButton
              variant="ghost"
              size="sm"
              iconRight={<ArrowRight className="size-3.5" />}
            >
              Showcase
            </SEIButton>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 lg:px-6">
        <section className="grid gap-6 py-10 sm:py-16 lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch">
          <SEIPanel variant="media-test" padding="lg" className="min-h-[28rem]">
            <div className="flex h-full flex-col justify-between gap-10">
              <div className="space-y-6">
                <SEIBadge variant="glass-test" icon={Boxes}>
                  Reusable UI playground
                </SEIBadge>
                <div className="space-y-5">
                  <h1 className="max-w-4xl text-5xl font-black uppercase leading-[0.88] tracking-[-0.09em] text-white sm:text-7xl lg:text-8xl">
                    Component lab, not a final brand lockup.
                  </h1>
                  <p className="max-w-2xl text-base leading-relaxed text-[var(--sh-color-cloud)] sm:text-xl">
                    Phase 1 turns SEIHOUSE-UI into a practical playground for reusable components,
                    experimental style lanes, and music-aware product surfaces without backend,
                    auth, audio, registry, or CLI scope.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <SEIButton variant="solid" size="lg" icon={Play}>
                  Explore components
                </SEIButton>
                <SEIButton variant="glass-test" size="lg" icon={Palette}>
                  Compare lanes
                </SEIButton>
                <SEIButton variant="outline" size="lg" icon={ShieldCheck}>
                  Keep flexible
                </SEIButton>
              </div>
            </div>
          </SEIPanel>

          <div className="grid gap-6">
            <PlayerShellPreview className="max-w-none" />
            <ShowcaseBlock
              variant="glass-test"
              title="Phase 1 boundary"
              description="The lab borrows component organization ideas from shadcn/ui and composition/primitives thinking from coss, Origin UI, Base UI, React Aria, and Magic UI — conceptually only."
            >
              <div className="flex flex-wrap gap-2">
                <SEIBadge variant="success">UI only</SEIBadge>
                <SEIBadge variant="warning">No playback</SEIBadge>
                <SEIBadge variant="outline">No auth</SEIBadge>
                <SEIBadge variant="soft">No registry logic</SEIBadge>
              </div>
            </ShowcaseBlock>
          </div>
        </section>

        <SEISection
          eyebrow="01 / Mission"
          title="A flexible foundation for trying component directions."
          description="These pieces are intentionally adaptable. The goal is to test primitives, composition, and visual lanes without overcommitting to a permanent SEIHouse brand system."
          aside={
            <SEIBadge variant="registry" icon={Layers}>
              Component-first
            </SEIBadge>
          }
        >
          <div className="grid gap-5 md:grid-cols-3">
            <ShowcaseBlock title="Reusable primitives" variant="default">
              <p className="text-sm leading-relaxed text-[var(--sh-color-cloud)]">
                Buttons, badges, panels, cards, and sections use tailwind-variants for consistent
                styling lanes and support class overrides for fast experiments.
              </p>
            </ShowcaseBlock>
            <ShowcaseBlock title="Music-aware particles" variant="soft">
              <p className="text-sm leading-relaxed text-[var(--sh-color-cloud)]">
                Media cards, player previews, and registry seals feel useful for music products while
                staying broad enough for other surfaces.
              </p>
            </ShowcaseBlock>
            <ShowcaseBlock title="Future-ready behavior" variant="outline">
              <p className="text-sm leading-relaxed text-[var(--sh-color-cloud)]">
                Behavior primitives, accessibility patterns, motion, and registry tooling are deferred
                so Phase 1 remains clean and UI-focused.
              </p>
            </ShowcaseBlock>
          </div>
        </SEISection>

        <SEISection
          eyebrow="02 / Buttons"
          title="SEIButton variants, sizes, icons, and overrides."
          description="Buttons use shared focus states, optional Lucide icons, size variants, and tailwind-merge-friendly class overrides."
        >
          <ShowcaseBlock
            title="Variant lane sweep"
            variant="glass-test"
            contentClassName="flex flex-wrap gap-3"
          >
            {buttonVariants.map((variant) => (
              <SEIButton key={variant} variant={variant} icon={Sparkles}>
                {variant}
              </SEIButton>
            ))}
          </ShowcaseBlock>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <ShowcaseBlock
              title="Sizes"
              variant="default"
              contentClassName="flex flex-wrap items-center gap-3"
            >
              <SEIButton size="sm" variant="outline">
                Small
              </SEIButton>
              <SEIButton size="md" variant="solid">
                Medium
              </SEIButton>
              <SEIButton size="lg" variant="media-test">
                Large
              </SEIButton>
            </ShowcaseBlock>
            <ShowcaseBlock title="Override example" variant="soft" contentClassName="flex flex-wrap gap-3">
              <SEIButton
                variant="outline"
                className="rounded-xl border-[var(--sh-color-accent)] text-[var(--sh-color-accent)]"
              >
                Custom class override
              </SEIButton>
              <SEIButton variant="ghost" disabled>
                Disabled
              </SEIButton>
            </ShowcaseBlock>
          </div>
        </SEISection>

        <SEISection
          eyebrow="03 / Badges"
          title="SEIBadge labels for statuses, categories, registry, and content."
          description="Badges are compact status primitives that can carry icons, categories, or registry labels."
        >
          <ShowcaseBlock variant="default" title="Badge set" contentClassName="flex flex-wrap gap-3">
            {badgeVariants.map((variant) => (
              <SEIBadge key={variant} variant={variant} icon={BadgeCheck}>
                {variant}
              </SEIBadge>
            ))}
          </ShowcaseBlock>
        </SEISection>

        <SEISection
          eyebrow="04 / Panels"
          title="SEIPanel surfaces for layout, overlays, and experiments."
          description="Panels are flexible containers with padding, interaction, and multiple visual lanes."
        >
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {styleLanes.map((lane) => (
              <SEIPanel key={lane.name} variant={lane.variant} interactive padding="md">
                <div className="space-y-4">
                  <SEIBadge variant={lane.variant === "light" ? "light" : "outline"}>{lane.name}</SEIBadge>
                  <h3 className="text-xl font-semibold tracking-[-0.04em]">{lane.name} panel</h3>
                  <p className="text-sm leading-relaxed text-[var(--sh-color-mist)]">{lane.description}</p>
                </div>
              </SEIPanel>
            ))}
          </div>
        </SEISection>

        <SEISection
          eyebrow="05 / Cards"
          title="SEICard layout areas for content and actions."
          description="Cards expose slots for media, eyebrow, title, metadata, actions, body content, and footer."
        >
          <div className="grid gap-5 md:grid-cols-3">
            <SEICard
              variant="default"
              interactive
              eyebrow="Project"
              title="SEA Portal shell"
              description="A reusable card for showing routes, tools, or projects without binding to app logic."
              metadata="UI mock"
              actions={<SEIButton variant="ghost" size="sm" icon={ArrowRight} aria-label="Open SEA Portal shell" />}
              footer="metadata · actions · footer"
            />
            <SEICard
              variant="soft"
              interactive
              eyebrow="Content"
              title="Artist world block"
              description="Flexible layout for creator pages, album worlds, or collection previews."
              metadata="Content lane"
              footer={<SEIBadge variant="soft">Composable</SEIBadge>}
            />
            <SEICard
              variant="glass-test"
              interactive
              eyebrow="Experiment"
              title="Glass overlay card"
              description="A test surface for overlays, future player docks, and ambient panels."
              metadata="Visual lane"
              footer={<SEIBadge variant="glass-test">Exploratory</SEIBadge>}
            />
          </div>
        </SEISection>

        <SEISection
          eyebrow="06 / Media Cards"
          title="Reusable mock content cards for music-related surfaces."
          description="MediaCard composes SEICard, SEIBadge, and SEIButton. It stays visual-only and can represent albums, artists, projects, fragments, or showcase items."
        >
          <div className="grid gap-5 lg:grid-cols-3">
            {mediaExamples.map((item) => (
              <MediaCard key={item.title} {...item} />
            ))}
          </div>
        </SEISection>

        <SEISection
          eyebrow="07 / Player Shell Preview"
          title="A visual-only future player interface."
          description="This preview includes artwork, track information, progress, controls, and volume UI without audio playback or state."
        >
          <div className="grid gap-5 lg:grid-cols-[1fr_0.85fr] lg:items-start">
            <PlayerShellPreview className="max-w-none" progress={48} />
            <ShowcaseBlock
              variant="outline"
              title="Deferred by design"
              description="Playback, playlists, streaming sources, persistence, and keyboard media behavior are Phase 2+ concerns."
            >
              <div className="grid gap-3">
                <SEIBadge variant="warning">No audio element</SEIBadge>
                <SEIBadge variant="outline">No player state</SEIBadge>
                <SEIBadge variant="soft">Ready for behavior primitives later</SEIBadge>
              </div>
            </ShowcaseBlock>
          </div>
        </SEISection>

        <SEISection
          eyebrow="08 / Registry Seals"
          title="Status indicators for draft, registered, verified, archived, and experimental states."
          description="RegistrySeal is a simple visual primitive only. No verification logic or registry integrations are included in Phase 1."
        >
          <ShowcaseBlock variant="media-test" title="Seal statuses" contentClassName="flex flex-wrap gap-3">
            <RegistrySeal status="draft" registryId="D-001" />
            <RegistrySeal status="registered" registryId="SEI-042" />
            <RegistrySeal status="verified" registryId="V-777" />
            <RegistrySeal status="archived" registryId="A-009" />
            <RegistrySeal status="experimental" registryId="X-100" />
          </ShowcaseBlock>
        </SEISection>

        <SEISection
          eyebrow="09 / Style Lanes"
          title="Exploratory visual directions, not final identity decisions."
          description="Clean, soft, dark, light, glass, and media lanes expose a flexible palette for future testing."
          aside={<SEIBadge variant="warning">Not final brand system</SEIBadge>}
        >
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {styleLanes.map((lane) => (
              <ShowcaseBlock
                key={lane.name}
                variant={lane.variant}
                title={lane.name}
                description={lane.description}
                interactive
              >
                <div className="space-y-5">
                  <div className="grid grid-cols-4 gap-2">
                    <span className="h-12 rounded-2xl bg-[var(--sh-color-sea)]" />
                    <span className="h-12 rounded-2xl bg-[var(--sh-color-accent)]" />
                    <span className="h-12 rounded-2xl bg-white/20" />
                    <span className="h-12 rounded-2xl bg-black/30" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <SEIBadge variant={lane.variant === "light" ? "light" : "outline"}>{lane.name}</SEIBadge>
                    <SEIButton size="sm" variant={lane.variant} icon={Sparkles}>
                      Test
                    </SEIButton>
                  </div>
                </div>
              </ShowcaseBlock>
            ))}
          </div>
        </SEISection>

        <footer className="relative z-10 flex flex-col gap-3 border-t border-white/10 py-10 text-sm text-[var(--sh-color-mist)] sm:flex-row sm:items-center sm:justify-between">
          <span>SEIHOUSE-UI · Phase 1 component lab</span>
          <span className="font-mono text-xs">components/sei · tailwind-variants · Tailwind CSS v4</span>
        </footer>
      </div>
    </main>
  );
}