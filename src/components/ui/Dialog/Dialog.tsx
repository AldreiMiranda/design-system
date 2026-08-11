import {
  createContext,
  forwardRef,
  useContext,
  useId,
  useLayoutEffect,
  useRef,
} from 'react';
import type {
  DialogHTMLAttributes,
  HTMLAttributes,
  MouseEvent,
  MutableRefObject,
  ReactNode,
  Ref,
} from 'react';
import { X } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import Icon from '../Icon/Icon';
import { dialogSurfaceVariants } from './tokens';
import type { DialogSize } from './tokens';

interface DialogContextValue {
  titleId: string;
  descriptionId: string;
  close: () => void;
}

const DialogContext = createContext<DialogContextValue | null>(null);

function useDialogContext() {
  const context = useContext(DialogContext);
  if (!context) throw new Error('Os componentes do Dialog devem estar dentro de <Dialog>.');
  return context;
}

function assignRef<T>(ref: Ref<T> | undefined, value: T | null) {
  if (typeof ref === 'function') ref(value);
  else if (ref) (ref as MutableRefObject<T | null>).current = value;
}

export interface DialogProps extends Omit<DialogHTMLAttributes<HTMLDialogElement>, 'open'> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  size?: DialogSize;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  children: ReactNode;
}

const Dialog = forwardRef<HTMLDialogElement, DialogProps>(function Dialog(
  {
    open,
    onOpenChange,
    size = 'medium',
    closeOnBackdrop = true,
    closeOnEscape = true,
    children,
    className,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy,
    ...props
  },
  forwardedRef,
) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const generatedId = useId();
  const titleId = `${generatedId}-title`;
  const descriptionId = `${generatedId}-description`;

  const setDialogRef = (node: HTMLDialogElement | null) => {
    dialogRef.current = node;
    assignRef(forwardedRef, node);
  };

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      if (typeof dialog.showModal === 'function') dialog.showModal();
      else dialog.setAttribute('open', '');
    } else if (!open && dialog.open) {
      if (typeof dialog.close === 'function') dialog.close();
      else dialog.removeAttribute('open');
    }
  }, [open]);

  useLayoutEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    if (scrollbarWidth > 0) {
      const currentPaddingRight = Number.parseFloat(window.getComputedStyle(document.body).paddingRight) || 0;
      document.body.style.paddingRight = `${currentPaddingRight + scrollbarWidth}px`;
    }
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
    };
  }, [open]);

  const close = () => onOpenChange(false);

  const handleCancel = (event: React.SyntheticEvent<HTMLDialogElement>) => {
    event.preventDefault();
    if (closeOnEscape) close();
  };

  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (closeOnBackdrop && event.target === event.currentTarget) close();
  };

  return (
    <DialogContext.Provider value={{ titleId, descriptionId, close }}>
      <dialog
        ref={setDialogRef}
        {...props}
        className={twMerge(
          'ds-dialog fixed inset-0 m-auto max-h-none max-w-none overflow-visible border-0 bg-transparent p-0 text-inherit outline-none backdrop:bg-zinc-950/50',
          className,
        )}
        aria-labelledby={ariaLabelledBy ?? titleId}
        aria-describedby={ariaDescribedBy ?? descriptionId}
        onCancel={handleCancel}
        onClick={handleBackdropClick}
      >
        <div className={dialogSurfaceVariants({ size })}>{children}</div>
      </dialog>
    </DialogContext.Provider>
  );
});

export interface DialogHeaderProps extends HTMLAttributes<HTMLDivElement> {
  showCloseButton?: boolean;
  closeLabel?: string;
}

export const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(function DialogHeader(
  { showCloseButton = true, closeLabel = 'Fechar diálogo', className, children, ...props },
  ref,
) {
  const { close } = useDialogContext();
  return (
    <div ref={ref} className={twMerge('relative border-0 border-b border-solid border-outline p-5 pr-14', className)} {...props}>
      {children}
      {showCloseButton && (
        <button
          type="button"
          className="absolute right-3 top-3 inline-flex size-9 items-center justify-center rounded-control border-0 bg-transparent p-0 text-content-muted outline-none transition-colors hover:bg-surface-muted hover:text-content focus-visible:shadow-focus"
          aria-label={closeLabel}
          onClick={close}
        >
          <Icon icon={X} size="small" />
        </button>
      )}
    </div>
  );
});

export interface DialogTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

export const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(function DialogTitle(
  { className, ...props },
  ref,
) {
  const { titleId } = useDialogContext();
  return <h2 ref={ref} id={titleId} className={twMerge('m-0 text-xl font-semibold leading-tight', className)} {...props} />;
});

export interface DialogDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}

export const DialogDescription = forwardRef<HTMLParagraphElement, DialogDescriptionProps>(function DialogDescription(
  { className, ...props },
  ref,
) {
  const { descriptionId } = useDialogContext();
  return <p ref={ref} id={descriptionId} className={twMerge('mb-0 mt-2 text-sm leading-relaxed text-content-muted', className)} {...props} />;
});

export const DialogContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function DialogContent(
  { className, ...props },
  ref,
) {
  return <div ref={ref} className={twMerge('min-h-0 overflow-y-auto p-5 text-sm leading-relaxed', className)} {...props} />;
});

export const DialogFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function DialogFooter(
  { className, ...props },
  ref,
) {
  return <div ref={ref} className={twMerge('flex flex-wrap items-center justify-end gap-2 border-0 border-t border-solid border-outline p-4', className)} {...props} />;
});

export function DialogClose({ children }: { children: ReactNode }) {
  const { close } = useDialogContext();
  return <span className="contents" onClick={close}>{children}</span>;
}

export default Dialog;
