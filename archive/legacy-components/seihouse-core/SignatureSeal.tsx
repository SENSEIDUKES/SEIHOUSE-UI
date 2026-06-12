"use client";

import React from "react";
import clsx from "clsx";

type SealSize = "sm" | "md" | "lg";
type SealVariant = "sea" | "accent" | "neutral";

interface SignatureSealProps {
  label: string;
  subtitle?: string;
  size?: SealSize;
  variant?: SealVariant;
  verified?: boolean;
  className?: string;
}

const sizeMap: Record<SealSize, string> = {
  sm: "w-16 h-16 text-[0.5rem]",
  md: "w-24 h-24 text-[0.625rem]",
  lg: "w-32 h-32 text-xs",
};

const variantColors: Record<SealVariant, string> = {
  sea: "border-[var(--sh-color-sea)] text-[var(--sh-color-sea)]",
  accent: "border-[var(--sh-color-accent)] text-[var(--sh-color-accent)]",
  neutral: "border-[var(--sh-color-mist)] text-[var(--sh-color-mist)]",
};

const verifiedColors: Record<SealVariant, string> = {
  sea: "text-[var(--sh-color-success)]",
  accent: "text-[var(--sh-color-success)]",
  neutral: "text-[var(--sh-color-cloud)]",
};

export function SignatureSeal({
  label,
  subtitle,
  size = "md",
  variant = "sea",
  verified = false,
  className,
}: SignatureSealProps) {
  return (
    <div
      className={clsx(
        "relative inline-flex flex-col items-center justify-center",
        "rounded-full border-2 border-dashed",
        sizeMap[size],
        variantColors[variant],
        className
      )}
    >
      <span className="font-semibold leading-tight text-center px-1">
        {label}
      </span>
      {subtitle && (
        <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[0.625rem] text-[var(--sh-color-mist)]">
          {subtitle}
        </span>
      )}
      {verified && (
        <span
          className={clsx(
            "absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[var(--sh-surface-elevated)] border border-[var(--sh-surface-glass-border)] flex items-center justify-center text-[0.625rem] font-bold",
            verifiedColors[variant]
          )}
        >
          ✓
        </span>
      )}
    </div>
  );
}

/* ---- Badge Seal (rectangular variant) ---- */
interface BadgeSealProps {
  label: string;
  value?: string;
  variant?: "sea" | "accent" | "neutral";
  size?: "sm" | "md";
  className?: string;
}

export function BadgeSeal({
  label,
  value,
  variant = "sea",
  size = "md",
  className,
}: BadgeSealProps) {
  const borderColor = {
    sea: "border-[var(--sh-color-sea)]/30",
    accent: "border-[var(--sh-color-accent)]/30",
    neutral: "border-[var(--sh-color-slate)]",
  };

  const textColor = {
    sea: "text-[var(--sh-color-sea)]",
    accent: "text-[var(--sh-color-accent)]",
    neutral: "text-[var(--sh-color-mist)]",
  };

  return (
    <div
      className={clsx(
        "inline-flex items-center gap-2.5 rounded-lg border px-3 py-2",
        borderColor[variant],
        className
      )}
    >
      <span className={clsx("text-xs font-semibold uppercase tracking-wider", textColor[variant])}>
        {label}
      </span>
      {value && (
        <>
          <span className="text-[var(--sh-color-slate)]">|</span>
          <span className="text-xs text-[var(--sh-color-ivory)] font-medium">{value}</span>
        </>
      )}
    </div>
  );
}