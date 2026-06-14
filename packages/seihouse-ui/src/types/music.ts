export type RegistryState = "draft" | "registered" | "verified" | "archived" | "experimental";

export interface Album {
  id: string;
  title: string;
  artist: string;
  releaseType: "Album" | "EP" | "Single" | "Mixtape";
  year: string;
  status: "Draft" | "Scheduled" | "Released" | "Catalog" | "Testing";
  tags: string[];
  description: string;
  artworkTone: "sea" | "accent" | "violet" | "gold" | "mono";
}

export interface Artist {
  id: string;
  name: string;
  role: string;
  bio: string;
  tags: string[];
  status: "Active" | "Developing" | "Featured" | "Archive";
  avatarTone: "sea" | "accent" | "violet" | "gold" | "mono";
}

export interface VaultFragment {
  id: string;
  title: string;
  type: "Demo" | "Mix" | "Voice note" | "Archive" | "Session note";
  status: "Recovered" | "Tagged" | "Cold storage" | "Needs review" | "Reference";
  tags: string[];
  context: string;
  duration: string;
  date: string;
}

export interface DojoModule {
  id: string;
  title: string;
  difficulty: "Starter" | "Builder" | "Advanced" | "Operator";
  category: string;
  description: string;
  progress: number;
  status: "Open" | "In progress" | "Complete" | "Template";
}

export interface RegistryItem {
  id: string;
  title: string;
  type: "Composition" | "Master" | "Split sheet" | "Campaign" | "License";
  state: RegistryState;
  verification: string;
  timestamp: string;
  mockId: string;
  seals: string[];
}

export interface ShowcaseEntry {
  id: string;
  eyebrow: string;
  headline: string;
  subheadline: string;
  badges: string[];
  previewLabel: string;
}

export interface PlayerTrack {
  id: string;
  title: string;
  artist: string;
  project: string;
  duration: string;
  progress: number;
  queue: string[];
  metadata: Record<string, string>;
}
