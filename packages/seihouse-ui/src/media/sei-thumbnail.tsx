"use client";

import { useState, type ImgHTMLAttributes } from "react";
import { Music, type LucideIcon } from "lucide-react";

import { cn } from "../styles/cn";
import { SEIAspectRatio } from "./sei-aspect-ratio";

const radiusClasses = {
  none: "rounded-none",
  sm: "rounded-lg",
  md: "rounded-xl",
  lg: "rounded-2xl",
} as const;

export interface SEIThumbnailProps extends Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "alt"
> {
  /** Image source. When absent or it fails to load, the fallback renders. */
  src?: string;
  /** Alt text (required). */
  alt: string;
  /** Aspect ratio passed to the underlying frame. */
  ratio?: number | string;
  /** Corner radius. */
  radius?: keyof typeof radiusClasses;
  /** Icon shown in the fallback placeholder. */
  fallbackIcon?: LucideIcon;
  /** Native image loading strategy. */
  loading?: "lazy" | "eager";
}

/** Cover/artwork image with a tinted gradient fallback for missing/broken art. */
export function SEIThumbnail({
  src,
  alt,
  ratio = 1,
  radius = "md",
  fallbackIcon: FallbackIcon = Music,
  loading = "lazy",
  className,
  ...props
}: SEIThumbnailProps) {
  const [errored, setErrored] = useState(false);
  const showFallback = !src || errored;

  return (
    <SEIAspectRatio
      ratio={ratio}
      className={cn(radiusClasses[radius], "bg-white/[0.04]", className)}
    >
      {showFallback ? (
        <div
          className="flex items-center justify-center bg-[linear-gradient(135deg,rgba(0,122,255,0.28),rgba(255,107,53,0.18))] text-white/70"
          role="img"
          aria-label={alt}
        >
          <FallbackIcon aria-hidden="true" className="size-1/4 opacity-80" />
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          onError={() => setErrored(true)}
          className="object-cover"
          {...props}
        />
      )}
    </SEIAspectRatio>
  );
}
