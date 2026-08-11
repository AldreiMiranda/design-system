import { forwardRef } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { FieldMessage, FieldRoot } from '../Field/Field';
import { useFieldIds } from '../Field/useFieldIds';
import {
  switchLabelVariants,
  switchRailVariants,
  switchThumbVariants,
  switchTrackVariants,
} from './tokens';
import type { SwitchSize } from './tokens';

export interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'role'> {
  label?: ReactNode;
  description?: string;
  errorMessage?: string;
  optionalText?: string;
  size?: SwitchSize;
  fullWidth?: boolean;
  containerClassName?: string;
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  {
    id: providedId,
    label,
    description,
    errorMessage,
    optionalText,
    size = 'medium',
    fullWidth = true,
    containerClassName,
    className,
    required,
    disabled,
    'aria-describedby': ariaDescribedBy,
    'aria-invalid': ariaInvalid,
    ...props
  },
  forwardedRef,
) {
  const { id, helperId, errorId, describedBy } = useFieldIds({
    id: providedId,
    description,
    errorMessage,
    ariaDescribedBy,
  });
  const invalid = Boolean(errorMessage || ariaInvalid === true || ariaInvalid === 'true');

  return (
    <FieldRoot fullWidth={fullWidth} className={containerClassName}>
      <label
        className={twMerge(
          'inline-flex w-fit cursor-pointer items-center gap-2.5 leading-none',
          disabled && 'cursor-not-allowed',
        )}
        htmlFor={id}
      >
        <input
          ref={forwardedRef}
          id={id}
          type="checkbox"
          role="switch"
          className={twMerge('peer sr-only', className)}
          required={required}
          disabled={disabled}
          aria-invalid={ariaInvalid ?? (errorMessage ? true : undefined)}
          aria-describedby={describedBy}
          aria-errormessage={errorId}
          {...props}
        />
        <span
          className={switchTrackVariants({ size, invalid })}
          data-size={size}
          aria-hidden="true"
        >
          <span className={switchRailVariants({ size, invalid })} />
          <span className={switchThumbVariants({ size })} />
        </span>
        {label && (
          <span
            className={twMerge(
              'flex min-w-0 items-center gap-1',
              switchLabelVariants({ size }),
              disabled && 'text-content-muted',
            )}
          >
            <span>{label}</span>
            {required && <span className="text-content-danger" aria-hidden="true">*</span>}
            {!required && optionalText && (
              <span className="font-normal text-content-muted">{optionalText}</span>
            )}
          </span>
        )}
      </label>
      <FieldMessage
        helperId={helperId}
        errorId={errorId}
        description={description}
        errorMessage={errorMessage}
      />
    </FieldRoot>
  );
});

export default Switch;
