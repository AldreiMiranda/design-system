import type { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface FieldRootProps {
  children: ReactNode;
  fullWidth?: boolean;
  className?: string;
}

export function FieldRoot({ children, fullWidth = true, className }: FieldRootProps) {
  return (
    <div
      className={twMerge(
        'inline-flex flex-col gap-1.5 font-sans',
        fullWidth ? 'w-full' : 'w-auto',
        className,
      )}
    >
      {children}
    </div>
  );
}

interface FieldLabelProps {
  id: string;
  htmlFor: string;
  children?: ReactNode;
  required?: boolean;
  optionalText?: string;
}

export function FieldLabel({
  id,
  htmlFor,
  children,
  required,
  optionalText,
}: FieldLabelProps) {
  if (!children) return null;

  return (
    <label id={id} className="flex items-center gap-1 text-sm font-medium text-content" htmlFor={htmlFor}>
      <span>{children}</span>
      {required && <span className="text-content-danger" aria-hidden="true">*</span>}
      {!required && optionalText && (
        <span className="font-normal text-content-muted">{optionalText}</span>
      )}
    </label>
  );
}

interface FieldMessageProps {
  helperId?: string;
  errorId?: string;
  description?: string;
  errorMessage?: string;
}

export function FieldMessage({
  helperId,
  errorId,
  description,
  errorMessage,
}: FieldMessageProps) {
  if (errorMessage) {
    return <span id={errorId} className="text-xs text-content-danger" role="alert">{errorMessage}</span>;
  }

  if (description) {
    return <span id={helperId} className="text-xs text-content-muted">{description}</span>;
  }

  return null;
}
