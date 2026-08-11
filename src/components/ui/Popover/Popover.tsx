import { cloneElement, useEffect, useId, useRef, useState } from 'react';
import type { ReactElement, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import Icon from '../Icon/Icon';
import { useAnchoredPosition } from '../Overlay/useAnchoredPosition';
import type { OverlayAlign, OverlayPlacement } from '../Overlay/useAnchoredPosition';
import { popoverVariants } from './tokens';

export interface PopoverProps {
  children: ReactElement;
  content: ReactNode;
  title?: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  placement?: OverlayPlacement;
  align?: OverlayAlign;
  offset?: number;
  closeOnOutsideClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  closeLabel?: string;
  className?: string;
}

export default function Popover({
  children,
  content,
  title,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  placement = 'bottom',
  align = 'center',
  offset = 8,
  closeOnOutsideClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  closeLabel = 'Fechar popover',
  className,
}: PopoverProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = controlledOpen ?? internalOpen;
  const anchorRef = useRef<HTMLSpanElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const id = useId();
  const titleId = `${id}-title`;
  const position = useAnchoredPosition({ open, anchorRef, overlayRef: popoverRef, placement, align, offset });
  const child = children as ReactElement<{
    'aria-expanded'?: boolean;
    'aria-controls'?: string;
    'aria-haspopup'?: 'dialog';
  }>;

  const setOpen = (next: boolean) => {
    if (controlledOpen === undefined) setInternalOpen(next);
    onOpenChange?.(next);
  };

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (closeOnOutsideClick && !anchorRef.current?.contains(target) && !popoverRef.current?.contains(target)) setOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (closeOnEscape && event.key === 'Escape') {
        setOpen(false);
        (anchorRef.current?.querySelector('[tabindex],button,a,input,select,textarea') as HTMLElement | null)?.focus();
      }
    };
    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  return (
    <>
      <span ref={anchorRef} className="inline-flex" onClick={() => setOpen(!open)}>
        {cloneElement(child, {
          'aria-expanded': open,
          'aria-controls': open ? id : undefined,
          'aria-haspopup': 'dialog',
        })}
      </span>
      {open && createPortal(
        <div
          ref={popoverRef}
          id={id}
          role="dialog"
          aria-modal="false"
          aria-labelledby={title ? titleId : undefined}
          className={twMerge(popoverVariants(), className)}
          style={position.style}
          data-placement={position.placement}
        >
          {(title || showCloseButton) && (
            <div className="flex items-start gap-3 border-0 border-b border-solid border-outline p-4">
              {title && <h3 id={titleId} className="m-0 flex-1 text-sm font-semibold">{title}</h3>}
              {showCloseButton && <button type="button" className="-m-2 ml-auto inline-flex size-8 items-center justify-center rounded-control border-0 bg-transparent text-content-muted outline-none hover:bg-interaction-neutral-hover active:bg-interaction-neutral-active focus-visible:shadow-focus" aria-label={closeLabel} onClick={() => setOpen(false)}><Icon icon={X} size="small" /></button>}
            </div>
          )}
          <div className="p-4 text-sm leading-relaxed">{content}</div>
        </div>,
        document.body,
      )}
    </>
  );
}

export type PopoverPlacement = OverlayPlacement;
export type PopoverAlign = OverlayAlign;
