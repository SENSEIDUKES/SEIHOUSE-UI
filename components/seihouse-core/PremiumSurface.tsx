"use client";

import React from "react";
import clsx from "clsx";

type SurfaceVariant = "elevated" | "glass" | "outlined" | "subtle";
type SurfacePadding = "none" | "sm" | "md" | "lg";

interface PremiumSurfaceProps {
  variant?: SurfaceVariant;
  padding?: SurfacePadding;
  glow?: "sea" | "accent" | "none";
  className?: string;
  children: React.ReactNode;
  as?: "div" | "section" | "article" | "aside";
}

const surfaceVariants: Record<SurfaceVariant, string> = {
  elevated:
    "bg-[var(--sh-surface-elevated)] border border-[var(--sh-surface-glass-border)] shadow-[var(--sh-shadow-md)]",
  glass:
    "bg-[var(--sh-surface-glass)] backdrop-blur-xl border border-[var(--sh-surface-glass-border)] shadow-[var(--sh-shadow-lg)]",
  outlined:
    "bg-transparent border border-[var(--sh-color-slate)]",
  subtle:
    "bg-[var(--sh-surface-base)]",
};

const paddingStyles: Record<SurfacePadding, string> = {
  none: "p-0",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

const glowStyles: Record<string, string> = {
  sea: "shadow-[var(--sh-shadow-glow-sea)]",
  accent: "shadow-[var(--sh-shadow-glow-accent)]",
  none: "",
};

export function PremiumSurface({
  variant = "elevated",
  padding = "md",
  glow = "none",
  className,
  children,
  as: Component = "div",
}: PremiumSurfaceProps) {
  return (
    <Component
      className={clsx(
        "rounded-xl",
        "transition-all duration-[var(--sh-transition-base)]",
        surfaceVariants[variant],
        paddingStyles[padding],
        glowStyles[glow],
        className
      )}
    >
      {children}
    </Component>
  );
}

/* ---- Surface Header Composable ---- */
interface SurfaceHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
}

export function SurfaceHeader({
  title,
  subtitle,
  action,
  className,
}: SurfaceHeaderProps) {
  return (
    <div
      className={clsx(
        "flex items-start justify-between gap-4 mb-5",
        className
      )}
    >
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-[var(--sh-color-ivory)] leading-tight">
          {title}
        </h3>
        {subtitle && (
          <p className="text-sm text-[var(--sh-color-mist)] leading-snug">
            {subtitle}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}