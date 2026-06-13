import type { LucideIcon } from "lucide-react";

export interface ComboOption {
  id: string;
  label: string;
  hint?: string;
}

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

export interface MultiSelectOption {
  id: string;
  label: string;
  hint?: string;
  disabled?: boolean;
}