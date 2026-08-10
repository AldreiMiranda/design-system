import { forwardRef } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { FieldLabel, FieldMessage, FieldRoot } from '../Field/Field';
import { useFieldIds } from '../Field/useFieldIds';
import { textFieldVariants } from './tokens';
import type { TextFieldSize, TextFieldVariant } from './tokens';

export interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: ReactNode;
  description?: string;
  errorMessage?: string;
  optionalText?: string;
  leadingContent?: ReactNode;
  trailingContent?: ReactNode;
  variant?: TextFieldVariant;
  size?: TextFieldSize;
  fullWidth?: boolean;
  containerClassName?: string;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  {
    id: providedId,
    variant = 'primary',
    size = 'medium',
    className,
    containerClassName,
    label,
    description,
    errorMessage,
    optionalText,
    leadingContent,
    trailingContent,
    fullWidth = true,
    required,
    disabled,
    readOnly,
    'aria-describedby': ariaDescribedBy,
    'aria-invalid': ariaInvalid,
    ...props
  },
  ref,
) {
  const { id, labelId, helperId, errorId, describedBy } = useFieldIds({
    id: providedId,
    description,
    errorMessage,
    ariaDescribedBy,
  });
  const invalid = Boolean(errorMessage || ariaInvalid === true || ariaInvalid === 'true');

  return (
    <FieldRoot fullWidth={fullWidth} className={containerClassName}>
      <FieldLabel id={labelId} htmlFor={id} required={required} optionalText={optionalText}>
        {label}
      </FieldLabel>
      <div className="relative flex items-center">
        {leadingContent && (
          <span className="pointer-events-none absolute left-3 z-10 flex text-content-muted">
            {leadingContent}
          </span>
        )}
        <input
          ref={ref}
          id={id}
          className={twMerge(
            textFieldVariants({
              variant,
              size,
              invalid,
              hasLeadingContent: Boolean(leadingContent),
              hasTrailingContent: Boolean(trailingContent),
            }),
            className,
          )}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          aria-invalid={ariaInvalid ?? (errorMessage ? true : undefined)}
          aria-describedby={describedBy}
          aria-errormessage={errorId}
          {...props}
        />
        {trailingContent && (
          <span className="absolute right-3 flex items-center text-content-muted">
            {trailingContent}
          </span>
        )}
      </div>
      <FieldMessage
        helperId={helperId}
        errorId={errorId}
        description={description}
        errorMessage={errorMessage}
      />
    </FieldRoot>
  );
});

export default TextField;
