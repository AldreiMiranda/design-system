import { forwardRef } from 'react';
import type { SVGAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { spinnerVariants } from './tokens';
import type { SpinnerSize, SpinnerTone } from './tokens';

type SpinnerAccessibilityProps =
  | { decorative?: false; label?: string }
  | { decorative: true; label?: never };

export type SpinnerProps = Omit<SVGAttributes<SVGSVGElement>, 'aria-label' | 'aria-hidden'> &
  SpinnerAccessibilityProps & {
    size?: SpinnerSize;
    tone?: SpinnerTone;
  };

const Spinner = forwardRef<SVGSVGElement, SpinnerProps>(function Spinner(
  {
    size = 'medium',
    tone = 'brand',
    decorative = false,
    label = decorative ? undefined : 'Carregando',
    className,
    ...props
  },
  ref,
) {
  return (
    <svg
      ref={ref}
      viewBox="0 0 24 24"
      fill="none"
      className={twMerge(spinnerVariants({ size, tone }), className)}
      role={decorative ? undefined : 'status'}
      aria-label={label}
      aria-hidden={decorative ? true : undefined}
      focusable="false"
      {...props}
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.2" />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
});

export default Spinner;
