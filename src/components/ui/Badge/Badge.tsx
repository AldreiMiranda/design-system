import { forwardRef } from 'react';
import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { badgeIndicatorVariants } from './tokens';
import type { BadgeOverlap, BadgePosition, BadgeTone, BadgeVariant } from './tokens';

export interface BadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  children: ReactNode;
  badgeContent?: ReactNode;
  tone?: BadgeTone;
  variant?: BadgeVariant;
  max?: number;
  showZero?: boolean;
  invisible?: boolean;
  overlap?: BadgeOverlap;
  position?: BadgePosition;
  badgeClassName?: string;
  badgeStyle?: CSSProperties;
}

function getPositionStyle(
  position: BadgePosition,
  overlap: BadgeOverlap,
  invisible: boolean,
): CSSProperties {
  const [vertical, horizontal] = position.split('-') as ['top' | 'bottom', 'left' | 'right'];
  const inset = overlap === 'circular' ? '14%' : 0;
  const translateX = horizontal === 'right' ? '50%' : '-50%';
  const translateY = vertical === 'top' ? '-50%' : '50%';

  return {
    [vertical]: inset,
    [horizontal]: inset,
    transform: `scale(${invisible ? 0 : 1}) translate(${translateX}, ${translateY})`,
    transformOrigin: `${horizontal === 'right' ? '100%' : '0%'} ${vertical === 'top' ? '0%' : '100%'}`,
  };
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  {
    children,
    badgeContent,
    tone = 'brand',
    variant = 'standard',
    max = 99,
    showZero = false,
    invisible = false,
    overlap = 'rectangular',
    position = 'top-right',
    badgeClassName,
    badgeStyle,
    className,
    ...props
  },
  ref,
) {
  const numericContent = typeof badgeContent === 'number' ? badgeContent : undefined;
  const content = numericContent !== undefined && numericContent > max ? `${max}+` : badgeContent;
  const hiddenForContent = variant === 'standard'
    && (badgeContent === null || badgeContent === undefined || (numericContent === 0 && !showZero));
  const isInvisible = invisible || hiddenForContent;

  return (
    <span
      ref={ref}
      className={twMerge('relative inline-flex align-middle', className)}
      {...props}
    >
      {children}
      <span
        className={twMerge(
          badgeIndicatorVariants({ tone, variant, invisible: isInvisible }),
          badgeClassName,
        )}
        style={{ ...getPositionStyle(position, overlap, isInvisible), ...badgeStyle }}
        aria-hidden="true"
      >
        {variant === 'standard' ? content : null}
      </span>
    </span>
  );
});

export default Badge;
