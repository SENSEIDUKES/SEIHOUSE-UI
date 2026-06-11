"use client";

import { useState } from "react";

import { contextRegistry } from "@/components/sei/registry/context-registry";
import { WorkbenchNav } from "@/components/sei/workbench/workbench-nav";
import { cn } from "@/components/sei/styles/cn";

export default function ContextsPage() {
  const [activeId, setActiveId] = useState(contextRegistry[0].id);
  const active = contextRegistry.find((entry) => entry.id === activeId) ?? contextRegistry[0];
  const ActiveContext = active.component;

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-[var(--sh-color-ivory)]">
      <WorkbenchNav current="/contexts" />

      <main className="mx-auto w-full max-w-6xl px-5 pb-20">
        <div className="border-b border-white/10 py-10">
          <h1 className="text-2xl font-semibold tracking-[-0.04em] text-white">Layout contexts</h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-[var(--sh-color-cloud)]">
            Components inside real SEIHouse product situations. These are review environments, not
            final designs — one at a time.
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 py-6" role="tablist" aria-label="Context situations">
          {contextRegistry.map((entry) => (
            <button
              key={entry.id}
              type="button"
              role="tab"
              aria-selected={entry.id === active.id}
              onClick={() => setActiveId(entry.id)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sh-color-sea)]",
                entry.id === active.id
                  ? "border-[rgba(0,122,255,0.45)] bg-[rgba(0,122,255,0.14)] text-white"
                  : "border-white/10 bg-white/[0.03] text-[var(--sh-color-cloud)] hover:border-white/20 hover:text-white",
              )}
            >
              {entry.name}
            </button>
          ))}
        </div>

        <section aria-label={active.name}>
          <p className="mb-4 text-sm text-[var(--sh-color-mist)]">{active.description}</p>
          <div className="rounded-[1.35rem] border border-white/10 bg-[radial-gradient(circle_at_30%_15%,rgba(0,122,255,0.06),transparent_24rem),#0b0c10] p-5 sm:p-8">
            <ActiveContext />
          </div>
        </section>
      </main>
    </div>
  );
}
