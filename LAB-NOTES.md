# SEIHOUSE-UI — Phase 1 Component Lab

**Repo:** `SENSEIDUKES/SEIHOUSE-UI`  
**Purpose:** Practical UI playground for exploring reusable components, visual directions, and a flexible design foundation.  
**Status:** Phase 1 UI-only component lab. This is **not** the final SEIHouse brand system.

---

## Installed packages

Phase 1 installed the requested UI dependencies:

```bash
npm install tailwindcss @tailwindcss/postcss tailwind-variants tailwind-merge lucide-react
```

`clsx` was already present in the project and is used by the class-name utility.

## Tailwind setup

- Added `postcss.config.mjs` using `@tailwindcss/postcss` for Tailwind CSS v4.
- Updated `app/globals.css` to include:

```css
@import "tailwindcss";
```

- Preserved the existing `--sh-*` CSS custom properties and useful global styles so the lab can keep using the current token language while Tailwind utilities power the new component layer.

## Components created

New Phase 1 component structure:

```text
components/
  sei/
    styles/
      cn.ts
      variants.ts
    primitives/
      sei-button.tsx
      sei-badge.tsx
      sei-panel.tsx
      sei-card.tsx
      sei-section.tsx
    particles/
      media-card.tsx
      player-shell-preview.tsx
      registry-seal.tsx
      showcase-block.tsx
    showcase-page.tsx
```

### Utility layer

- `cn.ts` combines `clsx` and `tailwind-merge` so class overrides work predictably.
- `variants.ts` centralizes `tailwind-variants` definitions for buttons, badges, panels, cards, sections, and registry seals.

### Primitives

- `SEIButton` — variants, sizes, accessible focus states, optional Lucide icons, loading state, disabled state, and class overrides.
- `SEIBadge` — variants for category, status, registry, and experimental labels with optional icons and class overrides.
- `SEIPanel` — flexible container with visual variants, padding options, interaction state, and class overrides.
- `SEICard` — reusable card layout with media, eyebrow, title, description, metadata, actions, footer, and content slots.
- `SEISection` — consistent showcase section wrapper with eyebrow, title, description, aside, spacing, and content slots.

### Particles

- `MediaCard` — mock content card for albums, artists, projects, fragments, and showcase items. Composes `SEICard`, `SEIBadge`, and `SEIButton`.
- `PlayerShellPreview` — visual-only future player shell with artwork placeholder, track info, mock progress, mock controls, and no playback behavior.
- `RegistrySeal` — visual status indicator for `draft`, `registered`, `verified`, `archived`, and `experimental` states.
- `ShowcaseBlock` — reusable block for displaying component examples, notes, and grouped demos.

## Showcase page

The homepage (`app/page.tsx`) now renders the Phase 1 component showcase. The existing `/lab` route also renders the same showcase with a `/lab` route label.

Showcase sections:

1. Intro / Mission
2. Buttons
3. Badges
4. Panels
5. Cards
6. Media Cards
7. Player Shell Preview
8. Registry Seals
9. Style Lanes

Style lanes demonstrated:

- Clean / default
- Soft
- Dark
- Light
- Glass Test
- Media Test

## Deferred features

Phase 1 intentionally does **not** include:

- Backend integrations
- Authentication
- Audio playback functionality
- Registry verification logic
- CLI tooling
- Component registry generation
- Base UI / React Aria behavior primitives
- Magic UI-style motion systems
- Final SEIHouse brand-system decisions

## Issues encountered

- `npm install` completed successfully, but npm reported `2 moderate severity vulnerabilities` in the dependency tree. No automatic fix was applied because `npm audit fix --force` can introduce breaking changes and is outside the Phase 1 UI scope.

## Run instructions

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the component showcase.  
Open [http://localhost:3000/lab](http://localhost:3000/lab) for the same lab view with the `/lab` route label.

Production build check:

```bash
npm run build
```

## Phase 2 — Music-Business Particles

Phase 2 evolved the generic component lab into a music-business UI lab while preserving the Phase 1 architecture and constraints.

### Components added

New Phase 2 particles:

```text
components/
  sei/
    particles/
      action-strip.tsx
      album-card.tsx
      artist-card.tsx
      dojo-module-card.tsx
      metric-card.tsx
      player-shell-expanded.tsx
      plugin-slot-preview.tsx
      registry-panel.tsx
      showcase-hero.tsx
      vault-fragment-card.tsx
      index.ts
    examples/
      mock-data.ts
      index.ts
```

- `AlbumCard` — album/EP/single preview particle with artwork, release metadata, tags, description, and actions. Local variants include `default`, `compact`, `feature`, `dark`, `light`, and `media-test`.
- `ArtistCard` — creator/artist profile particle with avatar, role, bio, status, tags, and actions. Local variants include `default`, `compact`, `profile`, `dark`, and `light`.
- `VaultFragmentCard` — visual card for demos, mixes, notes, archives, fake duration, and recovery/archive status. Local variants include `default`, `recovery`, `archive`, `compact`, and `dark`.
- `DojoModuleCard` — education/training particle for modules, difficulty, category, progress, and status. Local variants include `default`, `lesson`, `template`, `skill`, `dark`, and `light`.
- `ShowcaseHero` — reusable hero section for lab, portal, media, or experimental previews. Local variants include `clean`, `soft`, `dark`, `light`, `media`, and `experimental`.
- `PlayerShellExpanded` — richer visual-only SAP/player mock with artwork, fake controls, fake timeline, queue, and metadata/environment area. Local variants include `compact`, `expanded`, `docked`, `dark`, and `light`.
- `RegistryPanel` — reusable registry/status product particle composed from `SEIPanel`, `RegistrySeal`, `SEIBadge`, and `SEIButton`.
- `PluginSlotPreview` — visual placeholder for future plugin slots such as SAP, Vault Radio, Environment Engine, Registry Seal, and Creator Tools.
- `MetricCard` — dashboard stat card for plays, saves, registered works, vault items, active modules, revenue-style metrics, and completion values.
- `ActionStrip` — responsive action row composed from `SEIButton` for primary, secondary, and optional icon actions.

### Files changed

- Added realistic mock data in `components/sei/examples/mock-data.ts` for Album, Artist, Vault Fragment, Dojo Module, Registry Item, Showcase Entry, Player Track, and dashboard metrics.
- Added simple barrel exports in `components/sei/examples/index.ts` and `components/sei/particles/index.ts`.
- Updated `components/sei/showcase-page.tsx` into a one-page Phase 2 music-business lab with sections for:
  1. Intro / Mission
  2. Primitive Foundation
  3. Music-Business Particles
  4. Experience Blocks
  5. Registry / Status
  6. Dashboard / Utility
  7. Style Lanes

### Mocked features

- Albums, artists, vault fragments, Dojo modules, registry records, showcase entries, player tracks, plugin slots, metrics, and dashboard actions are mocked only.
- Player controls and timelines are visual-only. There is no audio element, playback state, queue logic, media-session behavior, or streaming integration.
- Registry states, IDs, seals, timestamps, and verification lines are fake display data only.
- Plugin slots are placeholders only and do not load plugins or connect to runtime systems.

### Deferred features

Phase 2 intentionally does **not** add:

- Backend/API logic
- Audio playback
- Authentication
- Supabase or database packages
- Registry databases or verification services
- SAP/Vault runtime behavior
- CLI tooling
- Base UI, React Aria, Motion/Framer Motion, or audio libraries
- Final brand-system lock-in

### Issues encountered

- One interrupted write occurred while updating the showcase, so the file was verified afterward before continuing.
- No new packages were installed.

### Recommended Phase 3 work

1. Add prop documentation and usage examples for each Phase 2 particle.
2. Consider a lightweight component index page or route grouping if the one-page lab becomes too dense.
3. Add accessibility review passes for keyboard focus order, button labeling, landmark structure, and visual contrast.
4. Decide whether any particle-local variant patterns should graduate into the global primitive variant system.
5. Add snapshot or smoke tests for rendering the showcase and all particles with mock data.
6. Explore behavior primitives only after choosing a strategy; do not add Base UI or React Aria unless Phase 3 explicitly approves it.
7. Define richer mock flows for SEA Portal, Vault Radio, SAP, Dojo, and Registry concepts before adding real service logic.

## Historical Phase 1 suggested work

1. Add accessibility-focused behavior primitives using Base UI or React Aria patterns.
2. Add automated visual examples or Storybook-style isolated previews if desired.
3. Define a stricter token strategy once visual lanes have been evaluated.
4. Add motion experiments inspired by Magic UI, gated behind reduced-motion-friendly patterns.
5. Add keyboard and focus behavior for future interactive media/player shells.
6. Create component usage documentation and prop tables.
7. Decide whether legacy `components/ui`, `components/seihouse-core`, and `components/sea-ui` should be migrated, deprecated, or kept as reference material.

---

This lab is exploratory by design. Components should remain adaptable until the final SEIHouse product and brand direction is established.