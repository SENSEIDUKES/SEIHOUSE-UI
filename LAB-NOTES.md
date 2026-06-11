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

---

# Phase 3 — Accessible Behavior Primitives

**Status:** First phase to add headless behavior libraries. Behavior comes from Base UI and React Aria; **all visual styling stays in the SEIHouse Tailwind / tailwind-variants system.** Still no backend, audio, auth, or brand lock-in.

## Packages installed

```bash
npm install @base-ui/react react-aria-components
```

- `@base-ui/react` (v1.5.x) — the current official package name for Base UI (the `mui/base-ui` headless library). The older `@base-ui-components/react` RC name was **not** used.
- `react-aria-components` (v1.18.x) — Adobe React Aria Components.
- Nothing else was added: no Motion/Framer Motion, no audio libraries, no Supabase/auth/database, no CLI tooling.

## Behavior components added

All live in `components/sei/behavior/` (separate from Phase 1 `primitives/` and Phase 2 `particles/`). Every component is a `"use client"` component, accepts `className`, merges via `cn()`, and uses local `tv()` variants with `--sh-*` tokens plus the shared `focusRing` / `transitionSurface` from `styles/variants.ts`.

| Component | File | Library | Variants |
|---|---|---|---|
| `SEIDialog` (+ Trigger/Content/Title/Description/Close) | `sei-dialog.tsx` | Base UI Dialog | `default, soft, dark, light, glass-test` |
| `SEIDrawer` (+ Trigger/Content/Header/Body/Footer/Title/Description/Close) | `sei-drawer.tsx` | Base UI Dialog | side `right/left/bottom` · size `compact/default/wide` · tone `dark/light` |
| `SEITabs` (+ List/Trigger/Panel) | `sei-tabs.tsx` | Base UI Tabs | `default, underline, pill, panel, dark, light` |
| `SEIPopover` (+ Trigger/Content/Title/Description/Close) | `sei-popover.tsx` | Base UI Popover | `default, soft, dark, light` |
| `SEITooltip` (+ Provider/Trigger/Content) | `sei-tooltip.tsx` | Base UI Tooltip | `default, dark, light` |
| `SEIComboboxPreview` | `sei-combobox-preview.tsx` | React Aria Components | n/a (mock search) |
| `SEICommandPreview` | `sei-command-preview.tsx` | React Aria Components | n/a (grouped mock palette) |

Mock data for the previews lives in `components/sei/behavior/behavior-mock.ts` (artist/vault-tag combobox options, grouped command palette). A barrel `components/sei/behavior/index.ts` re-exports everything.

## Base UI usage

- **Dialog** (`@base-ui/react/dialog`): `Root/Trigger/Portal/Backdrop/Popup/Title/Description/Close`. Provides focus trap, Escape, scroll lock, outside-click dismissal, and focus return to the trigger. Open/close transitions use the `data-[starting-style]` / `data-[ending-style]` / `data-[open]` attributes with CSS transitions only.
- **Drawer**: SEIDrawer is built on the **Dialog** primitive (not the newer Base UI `drawer` primitive). The Dialog popup is a plain portalled element, which lets SEIHouse fully own side/bottom positioning, sizing, and slide direction without fighting the Drawer's built-in swipe/viewport transforms. Accessibility guarantees are identical (Dialog).
- **Tabs** (`@base-ui/react/tabs`): `Root/List/Tab/Indicator/Panel`. Roving-tabindex arrow-key navigation, `data-[selected]` active state, `disabled` triggers, and `Tabs.Indicator` (driven by `--active-tab-*` CSS vars) for the underline/pill variants.
- **Popover** (`@base-ui/react/popover`): `Root/Trigger/Portal/Positioner/Popup/Arrow/Title/Description`. Anchored positioning (flip/shift) via `Positioner` (`side`/`align`/`sideOffset` exposed as props).
- **Tooltip** (`@base-ui/react/tooltip`): `Provider/Root/Trigger/Portal/Positioner/Popup`. `SEITooltipProvider` sets a shared open `delay`; tooltips open on hover **and** keyboard focus.

Triggers use Base UI's `render` prop so existing SEIHouse components compose as triggers (e.g. `<SEIDialogTrigger render={<SEIButton…/>} />`, `<SEIPopoverTrigger render={<…RegistrySeal/>} />`). React 19 passes `ref` as a regular prop, and the Phase 1/2 components spread props to their DOM node, so behavior + ref flow through without `forwardRef`.

## React Aria usage

- **SEIComboboxPreview**: `ComboBox` + `Label` + `Input` + `Button` + `Popover` + `ListBox` + `ListBoxItem`. Type-to-filter (built-in `contains`), arrow/Enter/Escape navigation, associated label, and an empty state via `ListBox renderEmptyState`.
- **SEICommandPreview**: `Autocomplete` + `useFilter` + `SearchField`/`Input` + `Menu` + `MenuSection` + `Header` + `MenuItem`. `Autocomplete` keeps focus in the search field while forwarding arrow/Enter navigation into the grouped menu; `Menu renderEmptyState` covers no-matches. `onAction` is a mock callback — nothing executes.

## Accessibility notes

- **Dialog / Drawer:** focus trap, Escape close, outside-click (backdrop), scroll lock, and focus return to trigger — all native to Base UI Dialog. `Title`/`Description` are wired for screen readers (where a card is shown instead of text, an `sr-only` title/description is provided).
- **Tabs:** roving tabindex, arrow/Home/End navigation, `aria-selected`, disabled state, and a visible focus ring (`focusRing`).
- **Popover:** keyboard dismissal and focus management native to Base UI. Triggers are real focusable `<button>`s.
- **Tooltip:** reachable by keyboard focus (not hover-only) and has an open delay. Each trigger is a focusable button/control.
- **Combobox / Command:** full React Aria listbox/menu semantics, labelled inputs, keyboard navigation, and empty states.
- Every interactive element keeps the shared `focusRing` for a visible focus-visible state on the dark theme.

## Mocked features

- Combobox options (artists, vault tags) and the command palette groups (Albums, Vault, Registry, Dojo, Creator Tools) are static mock data.
- Dialog/drawer actions ("Confirm", "Tag fragment", "Register work") do nothing. Command selection only calls a mock `onCommand`.
- The bottom-drawer "player queue" is a static list — no audio or queue logic.

## Deferred / weak spots

- **Native Base UI Drawer** (swipe gestures + snap points) is available and could replace the Dialog-based SEIDrawer in a future phase if drag-to-dismiss is wanted.
- **SEICommandPreview** is a *preview*: it is a filtered menu, not a global command system (no global hotkey to open, no recent/most-used ranking, no nested command execution).
- **SEIComboboxPreview** is single-select preview only — no multi-select tag chips, async loading, or create-new-option behavior yet.
- Popover/Tooltip arrows are minimal; arrow styling was kept simple and is opt-in (`showArrow`).
- Reduced-motion: transitions are short CSS transitions; no explicit `prefers-reduced-motion` gating was added yet.

## Issues encountered

- The task spec said `@base-ui/react`; confirmed via npm that this is the correct current official package (repo `mui/base-ui`), with `@base-ui-components/react` being the older RC name. Used `@base-ui/react`.
- `npm install` reports 2 pre-existing moderate advisories (unchanged from earlier phases); no `audit fix --force` was run to avoid breaking-change upgrades.
- No headless browser was available in the environment, so verification was done via `next build` + `next start` HTTP smoke tests rather than captured screenshots.

## Verification

- `npm run build` passes (Next 15 / React 19, TypeScript type-check clean).
- `npm run start` serves `/` and `/lab` with HTTP 200; the "04 / Behavior Primitives" section (`id="behavior"`) renders all seven components.

## Recommended Phase 4 next steps

1. Adopt the native Base UI **Drawer** primitive for swipe-to-dismiss / snap points where it improves mobile UX.
2. Promote `SEIComboboxPreview` to a real multi-select tag input and wire the command palette to a global hotkey.
3. Add automated tests (Playwright/axe) for keyboard flows and ARIA correctness across the behavior layer.
4. Add `prefers-reduced-motion` handling and a shared motion strategy (still without Motion/Framer unless approved).
5. Consider graduating the behavior `tv()` surfaces into shared tokens in `styles/variants.ts` if the variant sets stabilize.
6. Only after behavior + visual direction settle: revisit real data, auth, and registry/SAP/Vault services.

---

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