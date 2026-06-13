import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { componentRegistry, getComponentBySlug } from "@/registry/component-registry";
import { WorkbenchShell } from "@/components/workbench/workbench-shell";

interface WorkbenchComponentPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return componentRegistry.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: WorkbenchComponentPageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getComponentBySlug(slug);
  return {
    title: entry ? `${entry.name} — SEIHouse Workbench` : "Workbench — SEIHOUSE-UI",
    description: entry?.description,
  };
}

export default async function WorkbenchComponentPage({ params }: WorkbenchComponentPageProps) {
  const { slug } = await params;
  if (!getComponentBySlug(slug)) {
    notFound();
  }
  return <WorkbenchShell key={slug} activeSlug={slug} />;
}
