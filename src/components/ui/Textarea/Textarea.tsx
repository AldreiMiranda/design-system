import { forwardRef, useId, useState } from 'react';
import type { ChangeEvent, ReactNode, TextareaHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { FieldLabel, FieldMessage, FieldRoot } from '../Field/Field';
import { useFieldIds } from '../Field/useFieldIds';
import { textareaVariants } from './tokens';
import type { TextareaResize, TextareaSize, TextareaVariant } from './tokens';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: ReactNode;
  description?: string;
  errorMessage?: string;
  optionalText?: string;
  leadingContent?: ReactNode;
  trailingContent?: ReactNode;
  variant?: TextareaVariant;
  size?: TextareaSize;
  resize?: TextareaResize;
  showCharacterCount?: boolean;
  fullWidth?: boolean;
  containerClassName?: string;
}

function getValueLength(value: TextareaHTMLAttributes<HTMLTextAreaElement>['value']) {
  if (value === undefined || value === null) return 0;
  return String(value).length;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  {
    id: providedId,
    variant = 'primary',
    size = 'medium',
    resize = 'vertical',
    className,
    containerClassName,
    label,
    description,
    errorMessage,
    optionalText,
    leadingContent,
    trailingContent,
    showCharacterCount = false,
    fullWidth = true,
    required,
    disabled,
    readOnly,
    value,
    defaultValue,
    maxLength,
    onChange,
    'aria-describedby': ariaDescribedBy,
    'aria-invalid': ariaInvalid,
    ...props
  },
  ref,
) {
  const generatedCounterId = useId();
  const counterId = `${providedId ?? generatedCounterId}-counter`;
  const [uncontrolledLength, setUncontrolledLength] = useState(() => getValueLength(defaultValue));
  const characterCount = value === undefined ? uncontrolledLength : getValueLength(value);
  const combinedDescribedBy = [ariaDescribedBy, showCharacterCount ? counterId : undefined]
    .filter(Boolean)
    .join(' ') || undefined;
  const { id, labelId, helperId, errorId, describedBy } = useFieldIds({
    id: providedId,
    description,
    errorMessage,
    ariaDescribedBy: combinedDescribedBy,
  });
  const invalid = Boolean(errorMessage || ariaInvalid === true || ariaInvalid === 'true');

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (value === undefined) setUncontrolledLength(event.currentTarget.value.length);
    onChange?.(event);
  };

  return (
    <FieldRoot fullWidth={fullWidth} className={containerClassName}>
      <FieldLabel id={labelId} htmlFor={id} required={required} optionalText={optionalText}>
        {label}
      </FieldLabel>
      <div className="relative flex items-start">
        {leadingContent && (
          <span className="pointer-events-none absolute left-3 top-3 z-10 flex text-content-muted">
            {leadingContent}
          </span>
        )}
        <textarea
          ref={ref}
          id={id}
          className={twMerge(
            textareaVariants({
              variant,
              size,
              resize,
              invalid,
              hasLeadingContent: Boolean(leadingContent),
              hasTrailingContent: Boolean(trailingContent),
            }),
            className,
          )}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          value={value}
          defaultValue={defaultValue}
          maxLength={maxLength}
          onChange={handleChange}
          aria-invalid={ariaInvalid ?? (errorMessage ? true : undefined)}
          aria-describedby={describedBy}
          aria-errormessage={errorId}
          {...props}
        />
        {trailingContent && (
          <span className="pointer-events-none absolute right-3 top-3 flex text-content-muted">
            {trailingContent}
          </span>
        )}
      </div>
      {(description || errorMessage || showCharacterCount) && (
        <div className="flex items-start justify-between gap-3">
          <FieldMessage
            helperId={helperId}
            errorId={errorId}
            description={description}
            errorMessage={errorMessage}
          />
          {showCharacterCount && (
            <span id={counterId} className="ml-auto shrink-0 text-xs text-content-muted">
              {characterCount}{maxLength !== undefined ? `/${maxLength}` : ''}
            </span>
          )}
        </div>
      )}
    </FieldRoot>
  );
});

export default Textarea;
