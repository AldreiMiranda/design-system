import { cloneElement, useId, useRef, useState } from 'react';
import type { ReactElement, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { twMerge } from 'tailwind-merge';
import { useAnchoredPosition } from '../Overlay/useAnchoredPosition';
import type { OverlayAlign, OverlayPlacement } from '../Overlay/useAnchoredPosition';
import { tooltipVariants } from './tokens';
import type { TooltipAppearance } from './tokens';

export interface TooltipProps {
  children: ReactElement;
  content: ReactNode;
  placement?: OverlayPlacement;
  align?: OverlayAlign;
  offset?: number;
  delay?: number;
  closeDelay?: number;
  disabled?: boolean;
  appearance?: TooltipAppearance;
  className?: string;
}

export default function Tooltip({
  children,
  content,
  placement = 'top',
  align = 'center',
  offset = 8,
  delay = 350,
  closeDelay = 80,
  disabled = false,
  appearance = 'light',
  className,
}: TooltipProps) {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const openTimer = useRef<number>();
  const closeTimer = useRef<number>();
  const id = useId();
  const position = useAnchoredPosition({ open, anchorRef, overlayRef: tooltipRef, placement, align, offset });
  const child = children as ReactElement<{ 'aria-describedby'?: string }>;
  const describedBy = [child.props['aria-describedby'], open ? id : undefined].filter(Boolean).join(' ') || undefined;

  const clearTimers = () => {
    window.clearTimeout(openTimer.current);
    window.clearTimeout(closeTimer.current);
  };
  const show = () => {
    if (disabled) return;
    clearTimers();
    openTimer.current = window.setTimeout(() => setOpen(true), delay);
  };
  const hide = () => {
    clearTimers();
    closeTimer.current = window.setTimeout(() => setOpen(false), closeDelay);
  };

  return (
    <>
      <span
        ref={anchorRef}
        className="inline-flex"
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
      >
        {cloneElement(child, { 'aria-describedby': describedBy })}
      </span>
      {open && createPortal(
        <div
          ref={tooltipRef}
          id={id}
          role="tooltip"
          className={twMerge(tooltipVariants({ appearance }), className)}
          style={position.style}
          data-placement={position.placement}
        >
          {content}
        </div>,
        document.body,
      )}
    </>
  );
}

export type TooltipPlacement = OverlayPlacement;
export type TooltipAlign = OverlayAlign;
