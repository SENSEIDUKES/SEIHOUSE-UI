"use client";

import {
  Flag,
  Info,
  ListPlus,
  MoreHorizontal,
  Share2,
  Users,
  type LucideIcon,
} from "lucide-react";

import {
  SEIPopover,
  SEIPopoverContent,
  SEIPopoverTrigger,
} from "../behavior/sei-popover";
import { cn } from "../styles/cn";
import { focusRing } from "../styles/variants";
import { SurfaceButton } from "./surfaces/SurfaceButton";

/**
 * SAPController — the three-dot deep player options menu.
 *
 * This is the existing "more options" surface and is intentionally separate from
 * the new arc Action Menu: this stays a plain anchored popover for dense, less
 * glamorous options. V1 options are visual placeholders.
 */
interface SAPOption {
  id: string;
  label: string;
  icon: LucideIcon;
}

const SAP_OPTIONS: SAPOption[] = [
  { id: "credits", label: "View credits", icon: Users },
  { id: "add", label: "Add to playlist", icon: ListPlus },
  { id: "share", label: "Share", icon: Share2 },
  { id: "info", label: "Song info", icon: Info },
  { id: "report", label: "Report", icon: Flag },
];

export interface SAPControllerProps {
  className?: string;
  onSelect?: (optionId: string) => void;
}

export function SAPController({ className, onSelect }: SAPControllerProps) {
  return (
    <SEIPopover>
      <SEIPopoverTrigger
        render={
          <SurfaceButton
            icon={MoreHorizontal}
            aria-label="Player options"
            className={className}
          />
        }
      />
      <SEIPopoverContent side="top" align="end" className="w-56 p-1.5">
        <div className="flex flex-col">
          {SAP_OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect?.(option.id)}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2 text-left text-sm text-[var(--sh-color-ivory)]",
                "transition-colors duration-150 hover:bg-white/[0.07]",
                focusRing,
              )}
            >
              <option.icon aria-hidden="true" className="size-4 text-[var(--sh-color-cloud)]" />
              {option.label}
            </button>
          ))}
        </div>
      </SEIPopoverContent>
    </SEIPopover>
  );
}
