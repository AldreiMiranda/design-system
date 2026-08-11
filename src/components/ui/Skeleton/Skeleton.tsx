import { forwardRef } from 'react';
import type { CSSProperties, HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { skeletonVariants } from './tokens';
import type { SkeletonAnimation, SkeletonVariant } from './tokens';

export interface SkeletonProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  variant?: SkeletonVariant;
  animation?: SkeletonAnimation;
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  label?: string;
}

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(function Skeleton(
  {
    variant = 'rectangular',
    animation = 'wave',
    width,
    height,
    label,
    className,
    style,
    ...props
  },
  ref,
) {
  return (
    <div
      ref={ref}
      className={twMerge(skeletonVariants({ variant, animation }), className)}
      style={{ width, height, ...style }}
      role={label ? 'status' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      {...props}
    />
  );
});

export default Skeleton;
