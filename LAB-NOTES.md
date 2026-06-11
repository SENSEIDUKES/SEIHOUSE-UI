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

## Suggested Phase 2 work

1. Add accessibility-focused behavior primitives using Base UI or React Aria patterns.
2. Add automated visual examples or Storybook-style isolated previews if desired.
3. Define a stricter token strategy once visual lanes have been evaluated.
4. Add motion experiments inspired by Magic UI, gated behind reduced-motion-friendly patterns.
5. Add keyboard and focus behavior for future interactive media/player shells.
6. Create component usage documentation and prop tables.
7. Decide whether legacy `components/ui`, `components/seihouse-core`, and `components/sea-ui` should be migrated, deprecated, or kept as reference material.

---

This lab is exploratory by design. Components should remain adaptable until the final SEIHouse product and brand direction is established.