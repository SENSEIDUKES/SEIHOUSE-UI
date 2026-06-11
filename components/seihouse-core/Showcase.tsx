import type { ReactNode } from "react";

type ShowcaseRoute = "/" | "/lab";

const surfaceExamples = [
  { kind: "glass", title: "Glass Surface", label: "frosted / overlay" },
  { kind: "deep", title: "Deep Panel", label: "depth / focus" },
  { kind: "card", title: "Card Surface", label: "content / media" },
  { kind: "dock", title: "Dock / Shell", label: "navigation / slots" },
] as const;

const actions = [
  { title: "Enter Portal", meta: "SEA artist world", icon: "◈", tone: "sea" },
  { title: "Open Arc Notes", meta: "notes + timeline", icon: "✦", tone: "accent" },
  { title: "Launch Vault Radio", meta: "audio layer", icon: "◒", tone: "sea" },
  { title: "Register Work", meta: "registry seal", icon: "◆", tone: "default" },
] as const;

const cards = [
  {
    eyebrow: "project card",
    title: "SEA Portal",
    meta: "Artist workspace",
    body: "Portal shell with vault access, showcase routing, and creator attribution.",
    tone: "sea",
  },
  {
    eyebrow: "album/media card",
    title: "Expanded Album",
    meta: "SEA ID · SH-042",
    body: "Media module with expanded track states and release metadata.",
    tone: "accent",
  },
  {
    eyebrow: "plugin card",
    title: "Registry Seal Plugin",
    meta: "slot: registry-seal",
    body: "Plugin-ready seal component for verified work and ownership states.",
    tone: "success",
  },
  {
    eyebrow: "registry/status card",
    title: "Verified Work",
    meta: "status: sealed",
    body: "Registry status surface for provenance and release state.",
    tone: "sea",
  },
  {
    eyebrow: "credit/attribution card",
    title: "SENSEIDUKES",
    meta: "Verified Creator",
    body: "Attribution block for artist identity, collections, and credits.",
    tone: "default",
  },
] as const;

const plugins = [
  { name: "Environment Engine", status: "attached", detail: "ambient layer + depth" },
  { name: "Audio Player", status: "ready", detail: "vault radio transport" },
  { name: "Arc Notes", status: "attached", detail: "timeline notes" },
  { name: "Registry Seal", status: "ready", detail: "verification seal" },
  { name: "Vault Radio", status: "idle", detail: "streaming slot" },
] as const;

const layoutItems = [
  { label: "Portal", span: "wide", tag: "surface" },
  { label: "Vault", span: "tall", tag: "deep" },
  { label: "Dojo", span: "normal", tag: "grid" },
  { label: "Showcase", span: "normal", tag: "cards" },
  { label: "Registry", span: "normal", tag: "seals" },
  { label: "Plugin Dock", span: "wide", tag: "slots" },
] as const;

function Badge({ children, tone = "default" }: { children: ReactNode; tone?: string }) {
  return <span className={`sh-badge sh-badge--${tone}`}>{children}</span>;
}

function SectionHeader({ index, title, note }: { index: string; title: string; note: string }) {
  return (
    <div className="sh-section-header">
      <div>
        <span className="sh-section-index">{index}</span>
        <h2>{title}</h2>
      </div>
      <span className="sh-section-note">{note}</span>
    </div>
  );
}

function SurfaceCard({ kind, title, label }: (typeof surfaceExamples)[number]) {
  return (
    <article className={`sh-surface-card sh-surface-card--${kind}`}>
      <div className="sh-surface-card__top">
        <span>{label}</span>
        <span className="sh-surface-card__dot" />
      </div>
      <div className="sh-surface-card__body">
        <div className={`sh-surface-preview sh-surface-preview--${kind}`}>
          <span />
          <span />
          <span />
        </div>
      </div>
      <h3>{title}</h3>
    </article>
  );
}

function ActionCard({ title, meta, icon, tone }: (typeof actions)[number]) {
  return (
    <article className={`sh-action-card sh-action-card--${tone}`}>
      <div className="sh-action-card__icon">{icon}</div>
      <div>
        <h3>{title}</h3>
        <p>{meta}</p>
      </div>
      <span className="sh-action-card__cta">Open</span>
    </article>
  );
}

function ShowcaseCard({ eyebrow, title, meta, body, tone }: (typeof cards)[number]) {
  return (
    <article className={`sh-card-preview sh-card-preview--${tone}`}>
      <div className="sh-card-preview__media">
        <span className="sh-card-preview__orb" />
        <span className="sh-card-preview__scan" />
      </div>
      <div className="sh-card-preview__content">
        <span className="sh-card-preview__eyebrow">{eyebrow}</span>
        <h3>{title}</h3>
        <p>{meta}</p>
        <small>{body}</small>
      </div>
    </article>
  );
}

function Seal({ label, tone = "sea", size = "md", verified = false }: { label: string; tone?: string; size?: "sm" | "md" | "lg"; verified?: boolean }) {
  return (
    <div className={`sh-seal sh-seal--${tone} sh-seal--${size} ${verified ? "is-verified" : ""}`}>
      <span>{label}</span>
      <small>SEAL</small>
    </div>
  );
}

function PluginSlot({ name, status, detail }: (typeof plugins)[number]) {
  return (
    <div className={`sh-plugin-slot sh-plugin-slot--${status}`}>
      <div className="sh-plugin-slot__head">
        <span>{name}</span>
        <small>{status}</small>
      </div>
      <p>{detail}</p>
      <div className="sh-plugin-slot__pins">
        <i />
        <i />
        <i />
        <i />
      </div>
    </div>
  );
}

export function SEIHouseShowcase({ route = "/lab" }: { route?: ShowcaseRoute }) {
  return (
    <div className="sh-showcase">
      <div className="sh-showcase__ambient" aria-hidden="true" />

      <header className="sh-showcase__topbar">
        <div className="sh-showcase__brand">
          <span className="sh-showcase__brand-seal">SH</span>
          <span className="sh-showcase__brand-text">SEIHOUSE UI</span>
          <span className="sh-showcase__route">{route}</span>
        </div>
        <div className="sh-showcase__top-actions">
          <Badge tone="sea">Core Lab</Badge>
          <Badge tone="accent">v0.1.0</Badge>
        </div>
      </header>

      <main className="sh-showcase__main">
        <section className="sh-showcase__hero">
          <div className="sh-showcase__hero-copy">
            <div className="sh-kicker">
              <span className="sh-kicker__dot" />
              Premium component core
            </div>
            <h1>SEIHOUSE UI</h1>
            <p>Premium component core for SEA, Vault, Dojo, Showcase, Registry, and artist-world interfaces.</p>
            <div className="sh-showcase__actions">
              <button type="button" className="sh-button sh-button--primary">Explore Core</button>
              <button type="button" className="sh-button sh-button--secondary">View Surfaces</button>
              <button type="button" className="sh-button sh-button--ghost">Registry Map</button>
            </div>
          </div>

          <div className="sh-showcase__hero-panel">
            <div className="sh-hero-panel__header">
              <span />
              <span />
              <span />
            </div>
            <div className="sh-hero-panel__grid">
              <div className="sh-hero-panel__tile sh-hero-panel__tile--sea"><strong>SEA</strong><small>portal shell</small></div>
              <div className="sh-hero-panel__tile sh-hero-panel__tile--vault"><strong>Vault</strong><small>asset core</small></div>
              <div className="sh-hero-panel__tile sh-hero-panel__tile--dojo"><strong>Dojo</strong><small>learning layer</small></div>
              <div className="sh-hero-panel__tile sh-hero-panel__tile--registry"><strong>Registry</strong><small>seal system</small></div>
            </div>
          </div>
        </section>

        <section className="sh-showcase__section">
          <SectionHeader index="01" title="Surface System" note="glass · deep · card · dock" />
          <div className="sh-grid sh-grid--surface">
            {surfaceExamples.map((surface) => <SurfaceCard key={surface.title} {...surface} />)}
          </div>
        </section>

        <section className="sh-showcase__section">
          <SectionHeader index="02" title="Button / Action System" note="actions with intent" />
          <div className="sh-variant-row">
            <button type="button" className="sh-button sh-button--primary">Primary</button>
            <button type="button" className="sh-button sh-button--secondary">Secondary</button>
            <button type="button" className="sh-button sh-button--ghost">Ghost</button>
            <button type="button" className="sh-button sh-button--danger">Danger</button>
            <button type="button" className="sh-button sh-button--locked" disabled>Locked</button>
            <button type="button" className="sh-button sh-button--external">External</button>
          </div>
          <div className="sh-grid sh-grid--actions">
            {actions.map((action) => <ActionCard key={action.title} {...action} />)}
          </div>
        </section>

        <section className="sh-showcase__section">
          <SectionHeader index="03" title="Card System" note="reusable visual blocks" />
          <div className="sh-grid sh-grid--cards">
            {cards.map((card) => <ShowcaseCard key={card.title} {...card} />)}
          </div>
        </section>

        <section className="sh-showcase__section">
          <SectionHeader index="04" title="Badge / Seal System" note="identity and verification" />
          <div className="sh-badge-showcase">
            <Badge tone="sea">Official</Badge>
            <Badge tone="success">Verified</Badge>
            <Badge tone="warning">Test</Badge>
            <Badge tone="accent">Expanded Album</Badge>
            <Badge tone="default">SEA ID</Badge>
            <Badge tone="plugin">Plugin Ready</Badge>
          </div>
          <div className="sh-seal-showcase">
            <Seal label="SEA" verified tone="sea" size="lg" />
            <Seal label="UI" verified tone="accent" size="md" />
            <Seal label="ID" tone="default" size="md" />
            <Seal label="ARC" verified tone="sea" size="sm" />
            <Seal label="VAULT" tone="accent" size="sm" />
          </div>
        </section>

        <section className="sh-showcase__section">
          <SectionHeader index="05" title="Grid / Layout System" note="responsive composition" />
          <div className="sh-layout-grid">
            {layoutItems.map((item) => (
              <div key={item.label} className={`sh-layout-cell sh-layout-cell--${item.span}`}>
                <span>{item.tag}</span>
                <strong>{item.label}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="sh-showcase__section">
          <SectionHeader index="06" title="Plugin Slot Preview" note="attach plugins to core UI" />
          <div className="sh-plugin-console">
            <div className="sh-plugin-console__header">
              <div>
                <span>Core UI</span>
                <strong>Plugin Dock</strong>
              </div>
              <Badge tone="plugin">5 slots</Badge>
            </div>
            <div className="sh-plugin-console__slots">
              {plugins.map((plugin) => <PluginSlot key={plugin.name} {...plugin} />)}
            </div>
          </div>
        </section>
      </main>

      <footer className="sh-showcase__footer">
        <span>SEIHOUSE-UI · Premium component core</span>
        <span>components/seihouse-core · components/ui · components/sea-ui</span>
      </footer>
    </div>
  );
}