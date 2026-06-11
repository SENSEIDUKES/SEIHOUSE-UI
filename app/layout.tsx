import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SEIHOUSE-UI — Component Core Lab",
  description:
    "Experimental workbench for building the reusable SEIHouse component system.",
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