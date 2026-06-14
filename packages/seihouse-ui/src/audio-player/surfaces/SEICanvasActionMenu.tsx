"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, Lock, X } from "lucide-react";

import { cn } from "../../styles/cn";
import { seiLayer } from "../../styles/layering";
import { prefersReducedMotion } from "../../styles/reduced-motion";
import {
  ACTION_MENU_TRIGGER_ICON,
  isInteractive,
  type MenuItemState,
  type MenuNode,
} from "../menu/menuData";
import { SurfaceButton } from "./SurfaceButton";

/**
 * SEICanvasActionMenu — a bottom-anchored half-circle command menu.
 *
 * Closed, it is a single round trigger that sits exactly where the old queue
 * button lived (so opening it never shifts the player layout). Open, it renders
 * an overlay (React portal → document.body) with a dimmed/blurred backdrop and
 * the current level's actions fanned upward on an arc. The center button is a
 * depth-aware Close (root) / Back (submenu) control.
 *
 * State is intentionally local: navigation `path` and `open` live here, never in
 * the player's surface reducer. The host passes only the callbacks/active ids the
 * menu needs, so this stays reusable across SEIHouse surfaces (Vault, agents, …).
 */

const ARC_RADIUS = 132;
const NODE_BUTTON = 56; // px — the arc-field reference box (center button size).

/** Polar fan: evenly spread `n` points on an upward half-circle (x→right, y→up). */
function arcOffsets(n: number, radius: number): Array<{ x: number; y: number }> {
  if (n <= 0) return [];
  if (n === 1) return [{ x: 0, y: radius }];
  const span = Math.min(140, Math.max(60, (n - 1) * 54));
  const start = 90 + span / 2;
  const step = span / (n - 1);
  return Array.from({ length: n }, (_, i) => {
    const a = ((start - step * i) * Math.PI) / 180;
    return { x: Math.cos(a) * radius, y: Math.sin(a) * radius };
  });
}

export interface SEICanvasActionMenuProps {
  /** Menu tree (V1 hardcoded; later replaced by plugin-registry data). */
  items: MenuNode[];
  /** Node ids that are currently "live" (rendered with the active treatment). */
  activeIds?: string[];
  /** Wired to the existing queue surface. */
  onOpenQueue: () => void;
  /** Activates/opens the SEI Canvas. */
  onActivateCanvas: () => void;
  /** Catch-all for other (placeholder) leaf selections. */
  onSelect?: (node: MenuNode) => void;
  className?: string;
  ariaLabel?: string;
}

export function SEICanvasActionMenu({
  items,
  activeIds,
  onOpenQueue,
  onActivateCanvas,
  onSelect,
  className,
  ariaLabel = "Canvas actions",
}: SEICanvasActionMenuProps) {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [entered, setEntered] = useState(false);
  const [path, setPath] = useState<string[]>([]);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstItemRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  // Resolve the current level + breadcrumb trail from the navigation path.
  const { nodes, trail } = useMemo(() => {
    let level = items;
    const walked: MenuNode[] = [];
    for (const id of path) {
      const node = level.find((n) => n.id === id);
      if (!node?.children) break;
      walked.push(node);
      level = node.children;
    }
    return { nodes: level, trail: walked };
  }, [items, path]);

  const depthKey = path.join("/");
  const offsets = useMemo(() => arcOffsets(nodes.length, ARC_RADIUS), [nodes.length]);

  const close = useCallback(() => {
    setOpen(false);
    setPath([]);
    triggerRef.current?.focus();
  }, []);

  // Enter animation (and re-run on each level change). Reduced motion → instant.
  useEffect(() => {
    if (!open) {
      setEntered(false);
      return;
    }
    if (prefersReducedMotion()) {
      setEntered(true);
      return;
    }
    setEntered(false);
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setEntered(true)));
    return () => cancelAnimationFrame(raf);
  }, [open, depthKey]);

  // Escape to close + lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        close();
      }
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close]);

  // Move focus into the menu once it has entered.
  useEffect(() => {
    if (open && entered) firstItemRef.current?.focus();
  }, [open, entered, depthKey]);

  const itemState = useCallback(
    (node: MenuNode): MenuItemState =>
      activeIds?.includes(node.id) ? "active" : node.state ?? "available",
    [activeIds],
  );

  const handleNode = useCallback(
    (node: MenuNode) => {
      if (!isInteractive(node)) return;
      if (node.children?.length) {
        setPath((p) => [...p, node.id]);
        return;
      }
      switch (node.actionId) {
        case "open-queue":
          onOpenQueue();
          break;
        case "activate-canvas":
          onActivateCanvas();
          break;
        default:
          onSelect?.(node);
      }
      close();
    },
    [onOpenQueue, onActivateCanvas, onSelect, close],
  );

  const depth = path.length;
  const reduced = mounted && prefersReducedMotion();

  const overlay = open ? (
    <div
      className={cn("fixed inset-0", seiLayer.modal)}
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
    >
      {/* Backdrop — dim + light blur. Click anywhere empty closes. */}
      <button
        type="button"
        aria-label="Close menu"
        onClick={close}
        style={{ opacity: entered ? 1 : 0 }}
        className={cn(
          "absolute inset-0 h-full w-full cursor-default bg-black/55 backdrop-blur-sm",
          "motion-safe:transition-opacity motion-safe:duration-200 motion-reduce:transition-none",
        )}
      />

      {/* Bottom-anchored arc, inside the player safe area. */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-[max(1.25rem,env(safe-area-inset-bottom))] flex justify-center"
      >
        <div
          className="relative"
          style={{ width: NODE_BUTTON, height: NODE_BUTTON }}
        >
          {/* Breadcrumb / title pill, floated clear above the fan. */}
          <div
            aria-hidden="true"
            style={{
              transform: `translate(-50%, -50%) translate(0px, ${-(ARC_RADIUS + 86)}px)`,
              opacity: entered ? 1 : 0,
            }}
            className={cn(
              "pointer-events-none absolute left-1/2 top-1/2 whitespace-nowrap rounded-full border border-white/12 bg-white/[0.06] px-3 py-1.5 text-xs font-semibold tracking-[-0.01em] text-[var(--sh-color-cloud)] backdrop-blur-xl",
              "motion-safe:transition-opacity motion-safe:duration-200 motion-reduce:transition-none",
            )}
          >
            {depth === 0
              ? "Actions"
              : trail.map((n) => n.label).join(" › ")}
          </div>

          {/* Arc nodes. */}
          {nodes.map((node, i) => {
            const off = offsets[i] ?? { x: 0, y: 0 };
            const state = itemState(node);
            const interactive = isInteractive(node);
            const tx = entered ? off.x : 0;
            const ty = entered ? -off.y : 0;
            const scale = entered ? 1 : 0.6;

            return (
              <div
                key={node.id}
                style={{
                  transform: `translate(-50%, -50%) translate(${tx}px, ${ty}px) scale(${scale})`,
                  opacity: entered ? 1 : 0,
                  transitionDelay: reduced || !entered ? "0ms" : `${i * 28}ms`,
                }}
                className={cn(
                  "pointer-events-none absolute left-1/2 top-1/2 flex w-20 flex-col items-center gap-1.5",
                  "motion-safe:transition-[transform,opacity] motion-safe:duration-200 motion-safe:ease-out motion-reduce:transition-none",
                )}
              >
                <SurfaceButton
                  ref={i === 0 ? firstItemRef : undefined}
                  className="pointer-events-auto"
                  size="md"
                  icon={node.icon}
                  state={state === "available" ? "default" : state}
                  role="menuitem"
                  aria-disabled={!interactive || undefined}
                  aria-haspopup={node.children?.length ? "menu" : undefined}
                  aria-label={node.label}
                  onClick={() => handleNode(node)}
                />
                <span className="pointer-events-none flex flex-col items-center text-center leading-tight">
                  <span className="text-[0.7rem] font-medium text-[var(--sh-color-ivory)]">
                    {node.label}
                  </span>
                  {state === "coming-soon" ? (
                    <span className="text-[0.6rem] font-semibold uppercase tracking-[0.08em] text-[var(--sh-color-mist)]">
                      Soon
                    </span>
                  ) : state === "locked" ? (
                    <span className="inline-flex items-center gap-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.08em] text-[var(--sh-color-mist)]">
                      <Lock aria-hidden="true" className="size-2.5" />
                      Locked
                    </span>
                  ) : null}
                </span>
              </div>
            );
          })}

          {/* Center button: Close at root, Back inside a submenu. */}
          <SurfaceButton
            className="pointer-events-auto"
            size="lg"
            icon={depth === 0 ? X : ChevronLeft}
            aria-label={depth === 0 ? "Close menu" : "Back"}
            onClick={() => (depth === 0 ? close() : setPath((p) => p.slice(0, -1)))}
          />
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <SurfaceButton
        ref={triggerRef}
        size="md"
        icon={ACTION_MENU_TRIGGER_ICON}
        aria-label={ariaLabel}
        aria-haspopup="menu"
        aria-expanded={open}
        state={open ? "active" : "default"}
        onClick={() => setOpen(true)}
        className={className}
      />
      {mounted && overlay ? createPortal(overlay, document.body) : null}
    </>
  );
}
