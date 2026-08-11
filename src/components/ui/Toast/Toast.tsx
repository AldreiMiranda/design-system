import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { CircleAlert, CircleCheck, Info, TriangleAlert, X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import Icon from '../Icon/Icon';
import { toastIconVariants, toastVariants, toastViewportVariants } from './tokens';
import type { ToastPosition, ToastTone } from './tokens';

const defaultIcons: Record<ToastTone, LucideIcon> = {
  neutral: Info,
  info: Info,
  success: CircleCheck,
  warning: TriangleAlert,
  danger: CircleAlert,
};

export interface ToastOptions {
  title: ReactNode;
  description?: ReactNode;
  tone?: ToastTone;
  icon?: LucideIcon | null;
  action?: ReactNode;
  duration?: number;
  dismissLabel?: string;
}

export interface ToastProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'>, ToastOptions {
  open?: boolean;
  onDismiss?: () => void;
  onExited?: () => void;
}

export const Toast = forwardRef<HTMLDivElement, ToastProps>(function Toast(
  {
    title,
    description,
    tone = 'info',
    icon,
    action,
    open = true,
    onDismiss,
    onExited,
    dismissLabel = 'Fechar notificação',
    duration = 5000,
    className,
    onAnimationEnd,
    ...props
  },
  ref,
) {
  const ToastIcon = icon === undefined ? defaultIcons[tone] : icon;

  useEffect(() => {
    if (!open || !onDismiss || duration <= 0) return;
    const timer = window.setTimeout(onDismiss, duration);
    return () => window.clearTimeout(timer);
  }, [duration, onDismiss, open]);

  useEffect(() => {
    if (open || !onExited) return;
    const timer = window.setTimeout(onExited, 250);
    return () => window.clearTimeout(timer);
  }, [onExited, open]);

  return (
    <div
      ref={ref}
      {...props}
      role={tone === 'danger' || tone === 'warning' ? 'alert' : 'status'}
      className={twMerge(toastVariants({ tone, open }), className)}
      onAnimationEnd={(event) => {
        onAnimationEnd?.(event);
        if (!open && event.target === event.currentTarget) onExited?.();
      }}
    >
      {ToastIcon && (
        <span className={toastIconVariants({ tone })} aria-hidden="true">
          <Icon icon={ToastIcon} size="medium" />
        </span>
      )}
      <div className="min-w-0 flex-1">
        <div className="text-sm font-semibold leading-5">{title}</div>
        {description && <div className="mt-1 text-sm leading-relaxed text-content-muted">{description}</div>}
        {action && <div className="mt-3 flex items-center gap-2">{action}</div>}
      </div>
      {onDismiss && (
        <button
          type="button"
          className="absolute right-2 top-2 inline-flex size-8 items-center justify-center rounded-control border-0 bg-transparent p-0 text-content-muted outline-none transition-colors hover:bg-interaction-neutral-hover hover:text-content active:bg-interaction-neutral-active focus-visible:shadow-focus"
          aria-label={dismissLabel}
          onClick={onDismiss}
        >
          <Icon icon={X} size="small" />
        </button>
      )}
    </div>
  );
});

interface ToastRecord extends ToastOptions {
  id: string;
  open: boolean;
}

export interface ToastController {
  toast: (options: ToastOptions) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

const ToastContext = createContext<ToastController | null>(null);

export interface ToastProviderProps {
  children: ReactNode;
  position?: ToastPosition;
  maxToasts?: number;
  defaultDuration?: number;
}

export function ToastProvider({
  children,
  position = 'bottom-right',
  maxToasts = 5,
  defaultDuration = 5000,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastRecord[]>([]);
  const [mounted, setMounted] = useState(false);
  const counter = useRef(0);

  useEffect(() => setMounted(true), []);

  const toast = useCallback((options: ToastOptions) => {
    counter.current += 1;
    const id = `toast-${counter.current}`;
    setToasts((current) => {
      const limit = Math.max(1, maxToasts);
      const retained = limit === 1 ? [] : current.slice(-(limit - 1));
      return [
        ...retained,
        { ...options, duration: options.duration ?? defaultDuration, id, open: true },
      ];
    });
    return id;
  }, [defaultDuration, maxToasts]);

  const dismiss = useCallback((id: string) => {
    setToasts((current) => current.map((item) => (
      item.id === id ? { ...item, open: false } : item
    )));
  }, []);

  const dismissAll = useCallback(() => {
    setToasts((current) => current.map((item) => ({ ...item, open: false })));
  }, []);

  const remove = useCallback((id: string) => {
    setToasts((current) => current.filter((item) => item.id !== id));
  }, []);

  const controller = useMemo(() => ({ toast, dismiss, dismissAll }), [dismiss, dismissAll, toast]);

  return (
    <ToastContext.Provider value={controller}>
      {children}
      {mounted && createPortal(
        <div className={toastViewportVariants({ position })} aria-label="Notificações">
          {toasts.map(({ id, open, ...options }) => (
            <Toast
              key={id}
              {...options}
              open={open}
              onDismiss={() => dismiss(id)}
              onExited={() => remove(id)}
            />
          ))}
        </div>,
        document.body,
      )}
    </ToastContext.Provider>
  );
}

// O hook compartilha o mesmo contexto privado do Provider exportado neste módulo.
// eslint-disable-next-line react-refresh/only-export-components
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast deve ser usado dentro de <ToastProvider>.');
  return context;
}

export default Toast;
