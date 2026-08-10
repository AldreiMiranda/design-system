import { useId } from 'react';

interface UseFieldIdsOptions {
  id?: string;
  description?: string;
  errorMessage?: string;
  ariaDescribedBy?: string;
}

export function useFieldIds({
  id: providedId,
  description,
  errorMessage,
  ariaDescribedBy,
}: UseFieldIdsOptions) {
  const generatedId = useId();
  const id = providedId ?? generatedId;
  const labelId = `${id}-label`;
  const helperId = description && !errorMessage ? `${id}-description` : undefined;
  const errorId = errorMessage ? `${id}-error` : undefined;
  const describedBy = [ariaDescribedBy, errorId ?? helperId].filter(Boolean).join(' ') || undefined;

  return { id, labelId, helperId, errorId, describedBy };
}
