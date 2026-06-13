import type { Metadata } from "next";

import { WorkbenchShell } from "@/components/workbench/workbench-shell";

export const metadata: Metadata = {
  title: "Workbench — SEIHOUSE-UI",
  description: "Inspect one SEIHouse component at a time.",
};

export default function WorkbenchPage() {
  return <WorkbenchShell />;
}
