import { useLayoutEffect, useState } from 'react';
import type { CSSProperties, RefObject } from 'react';

export type OverlayPlacement = 'top' | 'right' | 'bottom' | 'left';
export type OverlayAlign = 'start' | 'center' | 'end';

interface PositionOptions {
  open: boolean;
  anchorRef: RefObject<HTMLElement>;
  overlayRef: RefObject<HTMLElement>;
  placement: OverlayPlacement;
  align: OverlayAlign;
  offset: number;
}

const viewportPadding = 8;

export function useAnchoredPosition({
  open,
  anchorRef,
  overlayRef,
  placement,
  align,
  offset,
}: PositionOptions) {
  const [position, setPosition] = useState<{ style: CSSProperties; placement: OverlayPlacement }>({
    style: { visibility: 'hidden' },
    placement,
  });

  useLayoutEffect(() => {
    if (!open) return;

    const update = () => {
      const anchor = anchorRef.current;
      const overlay = overlayRef.current;
      if (!anchor || !overlay) return;

      const anchorRect = anchor.getBoundingClientRect();
      const overlayRect = overlay.getBoundingClientRect();
      let resolvedPlacement = placement;

      if (placement === 'top' && anchorRect.top - overlayRect.height - offset < viewportPadding) resolvedPlacement = 'bottom';
      if (placement === 'bottom' && anchorRect.bottom + overlayRect.height + offset > window.innerHeight - viewportPadding) resolvedPlacement = 'top';
      if (placement === 'left' && anchorRect.left - overlayRect.width - offset < viewportPadding) resolvedPlacement = 'right';
      if (placement === 'right' && anchorRect.right + overlayRect.width + offset > window.innerWidth - viewportPadding) resolvedPlacement = 'left';

      const vertical = resolvedPlacement === 'top' || resolvedPlacement === 'bottom';
      let top = resolvedPlacement === 'bottom'
        ? anchorRect.bottom + offset
        : resolvedPlacement === 'top'
          ? anchorRect.top - overlayRect.height - offset
          : anchorRect.top + (anchorRect.height - overlayRect.height) / 2;
      let left = resolvedPlacement === 'right'
        ? anchorRect.right + offset
        : resolvedPlacement === 'left'
          ? anchorRect.left - overlayRect.width - offset
          : anchorRect.left + (anchorRect.width - overlayRect.width) / 2;

      if (align !== 'center') {
        if (vertical) left = align === 'start' ? anchorRect.left : anchorRect.right - overlayRect.width;
        else top = align === 'start' ? anchorRect.top : anchorRect.bottom - overlayRect.height;
      }

      top = Math.min(Math.max(top, viewportPadding), window.innerHeight - overlayRect.height - viewportPadding);
      left = Math.min(Math.max(left, viewportPadding), window.innerWidth - overlayRect.width - viewportPadding);
      setPosition({ style: { left, top, visibility: 'visible' }, placement: resolvedPlacement });
    };

    update();
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
    };
  }, [align, anchorRef, offset, open, overlayRef, placement]);

  return position;
}
