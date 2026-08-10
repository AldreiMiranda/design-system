import { forwardRef, useState } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { LoaderCircle } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import Icon from '../Icon/Icon';
import { buttonVariants } from './tokens';
import type { ButtonSize, ButtonVariant } from './tokens';

interface ButtonBaseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  loading?: boolean;
  loadingText?: string;
  fullWidth?: boolean;
}

type IconOnlyProps =
  | { iconOnly: true; 'aria-label': string }
  | { iconOnly?: false; 'aria-label'?: string };

export type ButtonProps = ButtonBaseProps & IconOnlyProps;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    children,
    variant = 'primary',
    size = 'medium',
    className,
    leadingIcon,
    trailingIcon,
    loading = false,
    loadingText,
    fullWidth = false,
    iconOnly = false,
    disabled,
    type = 'button',
    onPointerDown,
    ...props
  },
  ref,
) {
  const spinnerSize = size === 'small' ? 'xsmall' : 'small';
  const [ripple, setRipple] = useState<{
    key: number;
    size: number;
    x: number;
    y: number;
  }>();

  const handlePointerDown: ButtonHTMLAttributes<HTMLButtonElement>['onPointerDown'] = (event) => {
    onPointerDown?.(event);
    if (event.defaultPrevented || disabled || loading) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const rippleSize = Math.max(bounds.width, bounds.height, 1) * 2;
    const pointerX = Number.isFinite(event.clientX) ? event.clientX : bounds.left + bounds.width / 2;
    const pointerY = Number.isFinite(event.clientY) ? event.clientY : bounds.top + bounds.height / 2;
    setRipple({
      key: Date.now(),
      size: rippleSize,
      x: pointerX - bounds.left - rippleSize / 2,
      y: pointerY - bounds.top - rippleSize / 2,
    });
  };

  return (
    <button
      ref={ref}
      type={type}
      className={twMerge(
        buttonVariants({ variant, size, fullWidth, iconOnly }),
        className,
      )}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      onPointerDown={handlePointerDown}
      {...props}
    >
      {loading ? (
        <Icon
          icon={LoaderCircle}
          size={spinnerSize}
          className="animate-spin"
        />
      ) : (
        leadingIcon
      )}
      {iconOnly && !loading ? children : null}
      {!iconOnly && (children || (loading && loadingText)) ? (
        <span>{loading && loadingText ? loadingText : children}</span>
      ) : null}
      {!loading && trailingIcon}
      {ripple && (
        <span
          key={ripple.key}
          data-ripple="true"
          className="pointer-events-none absolute rounded-full bg-current animate-[ds-button-ripple_450ms_ease-out_forwards] motion-reduce:hidden"
          style={{
            width: ripple.size,
            height: ripple.size,
            left: ripple.x,
            top: ripple.y,
          }}
          aria-hidden="true"
          onAnimationEnd={() => setRipple(undefined)}
        />
      )}
    </button>
  );
});

export default Button;
