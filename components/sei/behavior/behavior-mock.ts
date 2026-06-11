import {
  Boxes,
  Disc3,
  GraduationCap,
  Hammer,
  Library,
  Mic2,
  Radio,
  ShieldCheck,
  Tag,
  Upload,
  Users,
  Vault,
  type LucideIcon,
} from "lucide-react";

/**
 * Phase 3 mock data for behavior previews.
 *
 * Everything here is intentionally fake. These options feed the combobox and
 * command previews so the interaction behavior can be demonstrated without any
 * real search index, API, or command runtime.
 */

export interface ComboOption {
  id: string;
  label: string;
  hint?: string;
}

export const mockArtistOptions: ComboOption[] = [
  { id: "art-001", label: "SENSEIDUKES", hint: "Artist · Producer" },
  { id: "art-002", label: "Mara Vale", hint: "Vocalist · Writer" },
  { id: "art-003", label: "North Dock Choir", hint: "Collective" },
  { id: "art-004", label: "Blue Room Sessions", hint: "Project" },
  { id: "art-005", label: "Harbor Lights", hint: "Band" },
  { id: "art-006", label: "Cassette Theory", hint: "Producer" },
];

export const mockVaultTagOptions: ComboOption[] = [
  { id: "tag-hook", label: "Hook", hint: "Idea" },
  { id: "tag-demo", label: "Demo", hint: "Recording" },
  { id: "tag-rough", label: "Rough mix", hint: "Mix" },
  { id: "tag-reference", label: "Reference", hint: "Note" },
  { id: "tag-split", label: "Needs split", hint: "Rights" },
  { id: "tag-archive", label: "Archive", hint: "Cold storage" },
  { id: "tag-campaign", label: "Campaign", hint: "Rollout" },
];

export interface CommandItem {
  id: string;
  label: string;
  hint?: string;
  shortcut?: string;
  icon: LucideIcon;
}

export interface CommandGroup {
  id: string;
  label: string;
  icon: LucideIcon;
  items: CommandItem[];
}

export const mockCommandGroups: CommandGroup[] = [
  {
    id: "albums",
    label: "Albums",
    icon: Disc3,
    items: [
      { id: "cmd-album-new", label: "New release world", hint: "Album / EP / single", icon: Library, shortcut: "N" },
      { id: "cmd-album-open", label: "Open Midnight Registry", hint: "EP · Scheduled", icon: Disc3 },
      { id: "cmd-album-tag", label: "Tag release metadata", hint: "Mock metadata", icon: Tag },
    ],
  },
  {
    id: "vault",
    label: "Vault",
    icon: Vault,
    items: [
      { id: "cmd-vault-search", label: "Search vault fragments", hint: "Demos · notes", icon: Vault, shortcut: "V" },
      { id: "cmd-vault-upload", label: "Add fragment", hint: "Mock upload", icon: Upload },
      { id: "cmd-vault-tag", label: "Tag fragment", hint: "Vault tags", icon: Tag },
    ],
  },
  {
    id: "registry",
    label: "Registry",
    icon: ShieldCheck,
    items: [
      { id: "cmd-registry-view", label: "View registry status", hint: "Mock states", icon: ShieldCheck, shortcut: "R" },
      { id: "cmd-registry-seal", label: "Explain registry seal", hint: "Verified · draft", icon: Boxes },
    ],
  },
  {
    id: "dojo",
    label: "Dojo",
    icon: GraduationCap,
    items: [
      { id: "cmd-dojo-open", label: "Open Dojo modules", hint: "Learning tracks", icon: GraduationCap, shortcut: "D" },
      { id: "cmd-dojo-template", label: "Creator campaign template", hint: "Template", icon: Hammer },
    ],
  },
  {
    id: "creator-tools",
    label: "Creator Tools",
    icon: Users,
    items: [
      { id: "cmd-tools-artist", label: "Search artists", hint: "Profiles", icon: Mic2 },
      { id: "cmd-tools-collab", label: "Invite collaborator", hint: "Mock invite", icon: Users },
      { id: "cmd-tools-radio", label: "Program Vault Radio", hint: "Concept", icon: Radio },
    ],
  },
];
