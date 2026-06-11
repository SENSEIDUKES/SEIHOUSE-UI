"use client";

import React from "react";
import clsx from "clsx";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--sh-color-sea)] text-white hover:bg-[var(--sh-color-sea-deep)] shadow-[var(--sh-shadow-glow-sea)]",
  secondary:
    "bg-[var(--sh-surface-raised)] text-[var(--sh-color-ivory)] border border-[var(--sh-surface-glass-border)] hover:bg-[var(--sh-color-slate)]",
  ghost:
    "text-[var(--sh-color-cloud)] hover:text-[var(--sh-color-ivory)] hover:bg-[var(--sh-surface-glass)]",
  danger:
    "bg-[var(--sh-color-danger)] text-white hover:opacity-90",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  className,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium",
        "transition-all duration-[var(--sh-transition-base)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sh-color-sea)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--sh-color-black)]",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />}
      {children}
    </button>
  );
}