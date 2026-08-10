import { forwardRef, useId } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { variants } from './tokens';
import type { Variants } from './tokens';

export interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>, Variants {
  label?: string;
  description?: string;
  errorMessage?: string;
  leadingContent?: ReactNode;
  trailingContent?: ReactNode;
  containerClassName?: string;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    {
      id: providedId,
      variant,
      className,
      containerClassName,
      label,
      description,
      errorMessage,
      leadingContent,
      trailingContent,
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
        <div className="relative flex items-center">
          {leadingContent && (
            <span className="pointer-events-none absolute left-3 flex text-content-muted">
              {leadingContent}
            </span>
          )}
          <input
            ref={ref}
            id={id}
            className={twMerge(
              variants({ variant }),
              leadingContent && 'pl-10',
              trailingContent && 'pr-10',
              errorMessage && 'border-content-danger',
              className,
            )}
            aria-invalid={ariaInvalid ?? (errorMessage ? true : undefined)}
            aria-describedby={describedBy}
            {...props}
          />
          {trailingContent && (
            <span className="absolute right-3 flex text-content-muted">
              {trailingContent}
            </span>
          )}
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
  },
);

export default TextField;
