"use client";

import React from "react";
import clsx from "clsx";
import { Badge } from "@/components/ui/Badge";

type CardSize = "sm" | "md" | "lg";

interface ProjectMediaCardProps {
  title: string;
  subtitle?: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  badge?: string;
  badgeVariant?: "sea" | "accent" | "default" | "success";
  size?: CardSize;
  action?: React.ReactNode;
  tags?: string[];
  footer?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const sizeMap: Record<CardSize, string> = {
  sm: "max-w-xs",
  md: "max-w-sm",
  lg: "max-w-md",
};

export function ProjectMediaCard({
  title,
  subtitle,
  description,
  imageSrc,
  imageAlt = "",
  badge,
  badgeVariant = "default",
  size = "md",
  action,
  tags,
  footer,
  onClick,
  className,
}: ProjectMediaCardProps) {
  return (
    <article
      className={clsx(
        "group w-full rounded-xl border border-[var(--sh-surface-glass-border)]",
        "bg-[var(--sh-surface-elevated)]",
        "transition-all duration-[var(--sh-transition-base)]",
        "hover:border-[var(--sh-color-slate)] hover:shadow-[var(--sh-shadow-md)]",
        onClick && "cursor-pointer",
        sizeMap[size],
        className
      )}
      onClick={onClick}
    >
      {/* Image area */}
      {imageSrc && (
        <div className="relative overflow-hidden rounded-t-xl aspect-[16/9] bg-[var(--sh-surface-raised)]">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="h-full w-full object-cover transition-transform duration-[var(--sh-transition-slow)] group-hover:scale-[1.02]"
          />
          {badge && (
            <div className="absolute top-3 left-3">
              <Badge variant={badgeVariant} size="sm">
                {badge}
              </Badge>
            </div>
          )}
        </div>
      )}

      {/* Content area */}
      <div className="p-5 space-y-3">
        {!imageSrc && badge && (
          <div className="flex items-center gap-2">
            <Badge variant={badgeVariant} size="sm">
              {badge}
            </Badge>
          </div>
        )}

        <div className="space-y-1.5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-base font-semibold text-[var(--sh-color-ivory)] leading-snug group-hover:text-[var(--sh-color-sea)] transition-colors">
              {title}
            </h3>
            {action && <div className="shrink-0">{action}</div>}
          </div>
          {subtitle && (
            <p className="text-sm text-[var(--sh-color-mist)]">{subtitle}</p>
          )}
        </div>

        {description && (
          <p className="text-sm text-[var(--sh-color-cloud)] leading-relaxed line-clamp-2">
            {description}
          </p>
        )}

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-[0.6875rem] font-medium rounded-md bg-[var(--sh-surface-raised)] text-[var(--sh-color-mist)]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {footer && (
          <div className="pt-2 border-t border-[var(--sh-surface-glass-border)]">
            {footer}
          </div>
        )}
      </div>
    </article>
  );
}