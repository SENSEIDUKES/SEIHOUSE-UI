"use client";

import { useState, type HTMLAttributes } from "react";

import { cn } from "../styles/cn";

type SEIAvatarSize = "sm" | "md" | "lg" | "xl";

type SEIAvatarTone = "neutral" | "sea" | "accent";

const sizeClasses: Record<SEIAvatarSize, string> = {
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
  lg: "size-12 text-base",
  xl: "size-16 text-lg",
};

const toneClasses: Record<SEIAvatarTone, string> = {
  neutral: "border-white/12 bg-white/[0.06] text-[var(--sh-color-ivory)]",
  sea: "border-[rgba(0,122,255,0.32)] bg-[rgba(0,122,255,0.14)] text-[#8fc8ff]",
  accent: "border-[rgba(255,107,53,0.32)] bg-[rgba(255,107,53,0.14)] text-[#ffad8d]",
};

export interface SEIAvatarProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  /** Image source. When absent or it fails to load, initials render instead. */
  src?: string;
  /** Person/entity name — used for initials and the image alt text. */
  name: string;
  /** Diameter preset. */
  size?: SEIAvatarSize;
  /** Ring/background tint. */
  tone?: SEIAvatarTone;
  /** Native image loading strategy. */
  loading?: "lazy" | "eager";
}

/** Initials from a name, capped at two letters (first + last word). */
function getInitials(name: string): string {
  // Defensive: dynamic data may hand us a null/undefined/non-string name.
  if (!name || typeof name !== "string") return "";
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "";
  const first = words[0]?.[0] ?? "";
  const last = words.length > 1 ? (words[words.length - 1]?.[0] ?? "") : "";
  return (first + last).toUpperCase();
}

/** Circular avatar that shows an image, falling back to tinted initials. */
export function SEIAvatar({
  src,
  name,
  size = "md",
  tone = "neutral",
  loading = "lazy",
  className,
  ...props
}: SEIAvatarProps) {
  const [errored, setErrored] = useState(false);
  const showImage = Boolean(src) && !errored;

  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border font-semibold",
        sizeClasses[size],
        toneClasses[tone],
        className,
      )}
      {...props}
    >
      {showImage ? (
        <img
          src={src}
          alt={name}
          loading={loading}
          decoding="async"
          onError={() => setErrored(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <span aria-hidden="true" className="leading-none">
          {getInitials(name)}
        </span>
      )}
      {showImage ? null : <span className="sr-only">{name}</span>}
    </span>
  );
}
