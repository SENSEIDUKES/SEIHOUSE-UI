"use client";

import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { Popover } from "@base-ui/react/popover";
import { tv, type VariantProps } from "tailwind-variants";

import { cn } from "../styles/cn";
import { focusRing } from "../styles/variants";

/**
 * SEIPopover — accessible floating content powered by Base UI Popover.
 *
 * Base UI handles anchored positioning (flip / shift), focus management, and
 * dismissal (Escape, outside click). SEIHouse styles the surface. Works with
 * buttons, badges, and cards as triggers via the `render` prop. Parts accept
 * `className`.
 */

export const seiPopoverStyles = tv({
  slots: {
    popup: [
      "z-50 w-[var(--available-width)] max-w-xs rounded-2xl border p-4 shadow-[0_30px_90px_rgba(0,0,0,0.5)]",
      "origin-[var(--transform-origin)] transition-[opacity,transform] duration-150 ease-out",
      "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
      "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
      focusRing,
    ],
    arrow: "data-[side=bottom]:top-[-7px] data-[side=top]:bottom-[-7px]",
    title: "text-sm font-semibold tracking-[-0.01em]",
    description: "mt-1 text-sm leading-relaxed",
  },
  variants: {
    variant: {
      default: {
        popup: "border-white/12 bg-[rgba(18,20,26,0.97)] text-[var(--sh-color-ivory)] backdrop-blur-xl",
        title: "text-white",
        description: "text-[var(--sh-color-cloud)]",
      },
      soft: {
        popup: "border-[rgba(0,122,255,0.24)] bg-[rgba(8,16,30,0.97)] text-[var(--sh-color-ivory)] backdrop-blur-xl",
        title: "text-[#bcdcff]",
        description: "text-[var(--sh-color-cloud)]",
      },
      dark: {
        popup: "border-white/10 bg-[#07080c] text-white",
        title: "text-white",
        description: "text-[var(--sh-color-mist)]",
      },
      light: {
        popup: "border-black/10 bg-white text-[#111318]",
        title: "text-[#111318]",
        description: "text-[#4b4f58]",
      },
    },
  },
  defaultVariants: { variant: "default" },
});

type SEIPopoverVariant = NonNullable<VariantProps<typeof seiPopoverStyles>["variant"]>;

const SEIPopoverContext = createContext<SEIPopoverVariant>("default");

export type SEIPopoverProps = React.ComponentProps<typeof Popover.Root>;

export function SEIPopover(props: SEIPopoverProps) {
  return <Popover.Root {...props} />;
}

export interface SEIPopoverTriggerProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Popover.Trigger>, "className"> {
  className?: string;
}

export function SEIPopoverTrigger({ className, ...props }: SEIPopoverTriggerProps) {
  return <Popover.Trigger className={className} {...props} />;
}

type PositionerProps = React.ComponentPropsWithoutRef<typeof Popover.Positioner>;

export interface SEIPopoverContentProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Popover.Popup>, "className"> {
  variant?: SEIPopoverVariant;
  className?: string;
  side?: PositionerProps["side"];
  align?: PositionerProps["align"];
  sideOffset?: PositionerProps["sideOffset"];
  showArrow?: boolean;
  children?: ReactNode;
}

export function SEIPopoverContent({
  variant = "default",
  className,
  side = "bottom",
  align = "center",
  sideOffset = 8,
  showArrow = false,
  children,
  ...props
}: SEIPopoverContentProps) {
  const styles = seiPopoverStyles({ variant });
  return (
    <SEIPopoverContext.Provider value={variant}>
      <Popover.Portal>
        <Popover.Positioner side={side} align={align} sideOffset={sideOffset}>
          <Popover.Popup className={cn(styles.popup(), className)} {...props}>
            {showArrow ? (
              <Popover.Arrow className={styles.arrow()}>
                <span className="block size-2.5 rotate-45 border bg-current/0" />
              </Popover.Arrow>
            ) : null}
            {children}
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </SEIPopoverContext.Provider>
  );
}

export interface SEIPopoverTitleProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Popover.Title>, "className"> {
  className?: string;
}

export function SEIPopoverTitle({ className, ...props }: SEIPopoverTitleProps) {
  const variant = useContext(SEIPopoverContext);
  const styles = seiPopoverStyles({ variant });
  return <Popover.Title className={cn(styles.title(), className)} {...props} />;
}

export interface SEIPopoverDescriptionProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Popover.Description>, "className"> {
  className?: string;
}

export function SEIPopoverDescription({ className, ...props }: SEIPopoverDescriptionProps) {
  const variant = useContext(SEIPopoverContext);
  const styles = seiPopoverStyles({ variant });
  return <Popover.Description className={cn(styles.description(), className)} {...props} />;
}

export type SEIPopoverCloseProps = React.ComponentProps<typeof Popover.Close>;

export function SEIPopoverClose(props: SEIPopoverCloseProps) {
  return <Popover.Close {...props} />;
}
