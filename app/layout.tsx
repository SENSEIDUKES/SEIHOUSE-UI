import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SEIHouse UI Workbench",
  description:
    "Internal workbench to inspect and design SEIHouse components before they become final.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}