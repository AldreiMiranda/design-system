import { forwardRef, useId } from 'react';
import type { SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { variants } from './tokens';
import type { Variants } from './tokens';

export interface SelectProps
  extends SelectHTMLAttributes<HTMLSelectElement>, Variants {
  label?: string;
  description?: string;
  errorMessage?: string;
  placeholder?: string;
  containerClassName?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  {
    id: providedId,
    variant,
    className,
    containerClassName,
    children,
    label,
    description,
    errorMessage,
    placeholder,
    'aria-describedby': ariaDescribedBy,
    'aria-invalid': ariaInvalid,
    ...props
  },
  ref,
) {
  const generatedId = useId();
  const id = providedId ?? generatedId;
  const descriptionId = description ? `${id}-description` : undefined;
  const errorId = errorMessage ? `${id}-error` : undefined;
  const describedBy = [ariaDescribedBy, descriptionId, errorId]
    .filter(Boolean)
    .join(' ') || undefined;

  return (
    <div className={twMerge('flex w-full flex-col gap-1.5', containerClassName)}>
      {label && (
        <label className="text-sm font-medium text-content" htmlFor={id}>
          {label}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          id={id}
          className={twMerge(
            variants({ variant }),
            errorMessage && 'border-content-danger',
            className,
          )}
          aria-invalid={ariaInvalid ?? (errorMessage ? true : undefined)}
          aria-describedby={describedBy}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {children}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-content-muted"
          aria-hidden="true"
        />
      </div>
      {description && (
        <span id={descriptionId} className="text-xs text-content-muted">
          {description}
        </span>
      )}
      {errorMessage && (
        <span id={errorId} className="text-xs text-content-danger">
          {errorMessage}
        </span>
      )}
    </div>
  );
});

export default Select;
