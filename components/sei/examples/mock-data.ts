export type RegistryState =
  | "draft"
  | "registered"
  | "verified"
  | "archived"
  | "experimental";

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

export const mockAlbums: Album[] = [
  {
    id: "alb-001",
    title: "Midnight Registry",
    artist: "SENSEIDUKES",
    releaseType: "EP",
    year: "2026 · Scheduled",
    status: "Scheduled",
    tags: ["SAP ready", "Creator rollout", "Alt mix"],
    description:
      "A five-track release world for testing album cards, registry seals, campaign notes, and creator-facing actions.",
    artworkTone: "sea",
  },
  {
    id: "alb-002",
    title: "House Keys Vol. 1",
    artist: "SEIHouse Curated",
    releaseType: "Mixtape",
    year: "2025 · Catalog",
    status: "Catalog",
    tags: ["Showcase", "Playlist lane", "Vault source"],
    description:
      "A compilation-style mock release used to preview discovery surfaces and internal catalog utilities.",
    artworkTone: "accent",
  },
  {
    id: "alb-003",
    title: "Light Leak Reference",
    artist: "Mara Vale",
    releaseType: "Single",
    year: "2026 · Testing",
    status: "Testing",
    tags: ["Media test", "Radio candidate", "Clean edit"],
    description:
      "Single-lane release preview with flexible metadata for landing pages, artist profiles, and dashboard rows.",
    artworkTone: "gold",
  },
];

export const mockArtists: Artist[] = [
  {
    id: "art-001",
    name: "SENSEIDUKES",
    role: "Artist · Producer · Systems lead",
    bio: "Building release worlds, creator tools, and a flexible music-business interface language for SEIHouse.",
    tags: ["Founder", "SAP", "Registry"],
    status: "Featured",
    avatarTone: "sea",
  },
  {
    id: "art-002",
    name: "Mara Vale",
    role: "Vocalist · Writer",
    bio: "Pop and electronic topliner used in the lab to test artist cards, profile variants, and showcase flows.",
    tags: ["Topline", "Showcase", "Active"],
    status: "Active",
    avatarTone: "gold",
  },
  {
    id: "art-003",
    name: "North Dock Choir",
    role: "Collective · Session archive",
    bio: "A fictional collective representing group metadata, vault fragments, and rights-heavy collaboration cards.",
    tags: ["Collective", "Splits", "Archive"],
    status: "Developing",
    avatarTone: "violet",
  },
];

export const mockVaultFragments: VaultFragment[] = [
  {
    id: "vlt-001",
    title: "Hook idea — blue room bounce",
    type: "Voice note",
    status: "Recovered",
    tags: ["Hook", "Phone memo", "Needs split"],
    context: "Recovered from March writing sprint before hook selection.",
    duration: "00:47",
    date: "Mar 14, 2026",
  },
  {
    id: "vlt-002",
    title: "Midnight Registry rough mix 03",
    type: "Mix",
    status: "Tagged",
    tags: ["Rough", "Alt drums", "Reference"],
    context: "Internal mix note for comparing master direction. No playback behavior attached.",
    duration: "03:18",
    date: "Apr 02, 2026",
  },
  {
    id: "vlt-003",
    title: "SEA Portal rollout notes",
    type: "Session note",
    status: "Cold storage",
    tags: ["Portal", "Campaign", "Archive"],
    context: "Planning fragment for future creator dashboard and registry education modules.",
    duration: "—",
    date: "May 22, 2026",
  },
];

export const mockDojoModules: DojoModule[] = [
  {
    id: "dojo-001",
    title: "Registering a release package",
    difficulty: "Starter",
    category: "Registry basics",
    description:
      "A guided UI lesson mock for collecting release metadata, contributors, and verification notes.",
    progress: 68,
    status: "In progress",
  },
  {
    id: "dojo-002",
    title: "Creator campaign template",
    difficulty: "Builder",
    category: "Creator tools",
    description:
      "Template-style module for assembling rollout assets, showcase entries, and action strips.",
    progress: 100,
    status: "Template",
  },
  {
    id: "dojo-003",
    title: "Vault cleanup sprint",
    difficulty: "Operator",
    category: "Vault operations",
    description:
      "Internal training module for tagging fragments, archive states, and recovery workflows.",
    progress: 24,
    status: "Open",
  },
];

export const mockRegistryItems: RegistryItem[] = [
  {
    id: "reg-001",
    title: "Midnight Registry · Master",
    type: "Master",
    state: "verified",
    verification: "Mock checksum and contributor line confirmed for lab display.",
    timestamp: "2026-06-09 22:14 UTC",
    mockId: "SEI-MSTR-042",
    seals: ["Verified", "Split attached", "SAP visual"],
  },
  {
    id: "reg-002",
    title: "House Keys Vol. 1 · Campaign",
    type: "Campaign",
    state: "registered",
    verification: "Registered in mock registry lane; pending showcase QA.",
    timestamp: "2026-06-01 15:40 UTC",
    mockId: "SEI-CMP-118",
    seals: ["Registered", "Campaign", "Internal"],
  },
  {
    id: "reg-003",
    title: "North Dock Choir · Split sheet",
    type: "Split sheet",
    state: "experimental",
    verification: "Experimental contributor map for future registry concepts.",
    timestamp: "2026-05-18 09:05 UTC",
    mockId: "SEI-SPL-X07",
    seals: ["Experimental", "Collective", "Review"],
  },
];

export const mockShowcaseEntries: ShowcaseEntry[] = [
  {
    id: "show-001",
    eyebrow: "SEIHouse music-business lab",
    headline: "Reusable particles for releases, artists, vaults, dashboards, and future creator systems.",
    subheadline:
      "Phase 2 keeps everything mocked and visual-only while making the lab feel closer to real product surfaces.",
    badges: ["Albums", "Artists", "Registry", "Dojo", "Vault Radio"],
    previewLabel: "Mock experience lane",
  },
  {
    id: "show-002",
    eyebrow: "SEA Portal concept",
    headline: "A portal shell for education, registration, campaigns, and creator operations.",
    subheadline:
      "Use these particles to test workflows before adding data models, auth, or service integrations.",
    badges: ["Portal", "Creator tools", "Internal ops"],
    previewLabel: "Portal preview",
  },
];

export const mockPlayerTracks: PlayerTrack[] = [
  {
    id: "trk-001",
    title: "Light Leak Reference",
    artist: "Mara Vale",
    project: "Showcase test single",
    duration: "03:42",
    progress: 58,
    queue: ["Midnight Registry", "House Keys Intro", "North Dock reprise"],
    metadata: {
      BPM: "124",
      Key: "A minor",
      Lane: "SAP visual",
      Status: "Mock only",
    },
  },
  {
    id: "trk-002",
    title: "Midnight Registry Demo",
    artist: "SENSEIDUKES",
    project: "EP rollout shell",
    duration: "02:56",
    progress: 41,
    queue: ["Blue room bounce", "Light Leak Reference", "Vault Radio ID"],
    metadata: {
      BPM: "92",
      Key: "F# minor",
      Lane: "Registry linked",
      Status: "Visual only",
    },
  },
];

export const mockMetrics = [
  {
    label: "Plays",
    value: "128.4K",
    helper: "Mock cross-platform pulse",
    trend: "+12.8%",
    status: "Momentum",
  },
  {
    label: "Saves",
    value: "18.7K",
    helper: "Campaign interest indicator",
    trend: "+4.2%",
    status: "Healthy",
  },
  {
    label: "Registered Works",
    value: "42",
    helper: "Visual registry count only",
    trend: "6 verified",
    status: "Registry",
  },
  {
    label: "Vault Items",
    value: "316",
    helper: "Fragments, notes, and archives",
    trend: "24 need review",
    status: "Ops",
  },
  {
    label: "Active Modules",
    value: "9",
    helper: "Dojo learning tracks",
    trend: "3 in progress",
    status: "Dojo",
  },
  {
    label: "Completion",
    value: "68%",
    helper: "Release package readiness",
    trend: "+9 pts",
    status: "Planning",
  },
] as const;
