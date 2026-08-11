import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import {
  CircleAlert,
  CircleCheck,
  Info,
  TriangleAlert,
  X,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import Icon from '../Icon/Icon';
import { alertVariants } from './tokens';
import type { AlertTone } from './tokens';

const defaultIcons: Record<AlertTone, LucideIcon> = {
  info: Info,
  success: CircleCheck,
  warning: TriangleAlert,
  danger: CircleAlert,
  neutral: Info,
};

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  tone?: AlertTone;
  title?: ReactNode;
  children: ReactNode;
  icon?: LucideIcon | null;
  action?: ReactNode;
  onDismiss?: () => void;
  dismissLabel?: string;
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  {
    tone = 'info',
    title,
    children,
    icon,
    action,
    onDismiss,
    dismissLabel = 'Fechar aviso',
    className,
    role,
    ...props
  },
  ref,
) {
  const AlertIcon = icon === undefined ? defaultIcons[tone] : icon;
  const semanticRole = role ?? (tone === 'danger' || tone === 'warning' ? 'alert' : 'status');

  return (
    <div
      ref={ref}
      role={semanticRole}
      className={twMerge(alertVariants({ tone }), className)}
      {...props}
    >
      {AlertIcon && (
        <span className="mt-0.5 flex shrink-0" aria-hidden="true">
          <Icon icon={AlertIcon} size="medium" />
        </span>
      )}
      <div className="min-w-0 flex-1">
        {title && <div className="font-semibold leading-5 text-current">{title}</div>}
        <div className={twMerge('leading-5 text-content', title && 'mt-1')}>{children}</div>
        {action && <div className="mt-3 flex items-center gap-2">{action}</div>}
      </div>
      {onDismiss && (
        <button
          type="button"
          className="-mr-1 -mt-1 inline-flex size-8 shrink-0 items-center justify-center rounded-control border-0 bg-transparent p-0 text-current outline-none transition-colors hover:bg-interaction-neutral-hover active:bg-interaction-neutral-active focus-visible:shadow-focus"
          aria-label={dismissLabel}
          onClick={onDismiss}
        >
          <Icon icon={X} size="small" />
        </button>
      )}
    </div>
  );
});

export default Alert;
