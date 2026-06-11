# SEIHOUSE-UI — Component Core Lab

**Repo:** `SEIHOUSE-UI`  
**Purpose:** Experimental workbench for building the reusable SEIHouse component system.  
**Status:** Early development (v0.1.0)

---

## What this is

SEIHOUSE-UI is the shared UI foundation for future SEIHouse and SEA apps:

- SEA Portal
- SEA Vault
- Showcase
- Registration
- Dojo
- Creator Connection
- Template Community
- Expanded Album / Artist World surfaces

The system is built around **premium reusable components**, not cheap placeholder UI. Components are designed to be app-agnostic and reusable across multiple surfaces.

---

## Architecture

```
components/
  ui/                  Low-level accessible primitives
    Button.tsx
    Badge.tsx

  seihouse-core/       Premium reusable SEIHouse components
    PremiumSurface.tsx  Portal shell / premium surface
    ProjectMediaCard.tsx Project/media card
    ActionCard.tsx      Action card + CTA row
    AttributionBlock.tsx Attribution / credit block
    SignatureSeal.tsx   Signature / badge / seal
    PluginSlot.tsx      Lightweight extension point
    Grid.tsx            Grid + Stack layout

  sea-ui/              SEA-specific compositions or legacy patterns
    SeaPortalPreview.tsx

app/
  lab/                 Visual test ground for the component system
  layout.tsx
  page.tsx
```

## Key rules

1. **No random redesign.** The lab is for testing components, not redesigning the app.
2. **No generic boring primitives.** Components are premium and carry SEIHouse identity.
3. **Plugin functionality attaches on top of the core**, not baked into every component.
4. **SEA/SEIHouse identity is preserved** through design tokens and component language.
5. **Components are easy to reuse** across multiple apps — the core layer is app-agnostic.
6. **The lab is safe for experimentation.** Successful patterns can graduate into production apps.

## Design system

Design tokens are defined as CSS custom properties in `app/globals.css`:

- `--sh-color-*` — Color palette (dark-first)
- `--sh-surface-*` — Surface levels (base, elevated, raised, glass)
- `--sh-text-*` — Type scale
- `--sh-space-*` — Spacing scale
- `--sh-radius-*` — Border radius
- `--sh-shadow-*` — Shadow presets (including glow)
- `--sh-transition-*` — Motion curves

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the landing page.  
Open [http://localhost:3000/lab](http://localhost:3000/lab) for the component lab.

---

*This is an experimental workbench. Nothing here is final.*