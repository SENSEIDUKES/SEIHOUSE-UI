import type { Metadata } from "next";

import { SEIComponentShowcase } from "@/components/showcase/showcase-page";

export const metadata: Metadata = {
  title: "Raw Lab — SEIHOUSE-UI",
  description: "The original all-in-one component showcase, preserved for reference.",
};

export default function RawLabPage() {
  return <SEIComponentShowcase route="/lab/raw" />;
}
