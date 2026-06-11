"use client";

import React from "react";
import clsx from "clsx";

type BadgeVariant = "default" | "sea" | "accent" | "success" | "warning" | "danger";
type BadgeSize = "sm" | "md";

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-[var(--sh-surface-raised)] text-[var(--sh-color-cloud)]",
  sea: "bg-[var(--sh-color-sea-subtle)] text-[var(--sh-color-sea)]",
  accent: "bg-[var(--sh-color-accent-glow)] text-[var(--sh-color-accent)]",
  success: "bg-[rgba(52,199,89,0.1)] text-[var(--sh-color-success)]",
  warning: "bg-[rgba(255,159,10,0.1)] text-[var(--sh-color-warning)]",
  danger: "bg-[rgba(255,69,58,0.1)] text-[var(--sh-color-danger)]",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-[0.6875rem]",
  md: "px-2.5 py-1 text-xs",
};

export function Badge({
  variant = "default",
  size = "sm",
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 rounded-md font-medium leading-none",
        "transition-colors duration-[var(--sh-transition-fast)]",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  );
}