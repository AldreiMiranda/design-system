import { forwardRef, useEffect, useRef } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { Check, Minus } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { FieldMessage, FieldRoot } from '../Field/Field';
import { useFieldIds } from '../Field/useFieldIds';
import Icon from '../Icon/Icon';
import { checkboxControlVariants, checkboxLabelVariants } from './tokens';
import type { CheckboxSize } from './tokens';

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  label?: ReactNode;
  description?: string;
  errorMessage?: string;
  optionalText?: string;
  indeterminate?: boolean;
  size?: CheckboxSize;
  fullWidth?: boolean;
  containerClassName?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  {
    id: providedId,
    label,
    description,
    errorMessage,
    optionalText,
    indeterminate = false,
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
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { id, helperId, errorId, describedBy } = useFieldIds({
    id: providedId,
    description,
    errorMessage,
    ariaDescribedBy,
  });
  const invalid = Boolean(errorMessage || ariaInvalid === true || ariaInvalid === 'true');

  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  const setInputRef = (node: HTMLInputElement | null) => {
    inputRef.current = node;
    if (typeof forwardedRef === 'function') forwardedRef(node);
    else if (forwardedRef) forwardedRef.current = node;
  };

  return (
    <FieldRoot fullWidth={fullWidth} className={containerClassName}>
      <label className={twMerge('inline-flex w-fit cursor-pointer items-start gap-2.5', disabled && 'cursor-not-allowed')} htmlFor={id}>
        <input
          ref={setInputRef}
          id={id}
          type="checkbox"
          className={twMerge('peer sr-only', className)}
          required={required}
          disabled={disabled}
          aria-invalid={ariaInvalid ?? (errorMessage ? true : undefined)}
          aria-describedby={describedBy}
          aria-errormessage={errorId}
          {...props}
        />
        <span
          className={checkboxControlVariants({ size, invalid, indeterminate })}
          aria-hidden="true"
        >
          <Icon
            icon={indeterminate ? Minus : Check}
            size={size === 'small' ? 'xsmall' : 'small'}
          />
        </span>
        {label && (
          <span className={twMerge('flex min-w-0 items-center gap-1 pt-px', checkboxLabelVariants({ size }), disabled && 'text-content-muted')}>
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

export default Checkbox;
