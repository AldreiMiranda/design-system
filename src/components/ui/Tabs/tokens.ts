import { cva } from 'class-variance-authority';

export const tabsListVariants = cva('flex font-sans', {
  defaultVariants: { variant: 'underline', orientation: 'horizontal' },
  variants: {
    variant: {
      underline: 'gap-1 border-0 border-b border-solid border-outline',
      pills: 'w-fit gap-1 rounded-control bg-surface-muted p-1',
    },
    orientation: {
      horizontal: 'flex-row',
      vertical: 'flex-col items-stretch border-b-0 border-r',
    },
  },
});

export const tabsTriggerVariants = cva(
  'relative inline-flex items-center justify-center whitespace-nowrap border-0 bg-transparent font-sans font-medium text-content-muted outline-none transition-[background-color,color,box-shadow] duration-150 hover:bg-interaction-neutral-hover hover:text-content active:bg-interaction-neutral-active focus-visible:shadow-focus disabled:cursor-not-allowed disabled:bg-interaction-disabled-surface disabled:text-interaction-disabled-content',
  {
    defaultVariants: { variant: 'underline', size: 'medium', active: false },
    variants: {
      variant: {
        underline: 'rounded-t-control after:absolute after:bottom-[-1px] after:left-0 after:h-0.5 after:w-full after:scale-x-0 after:rounded-full after:bg-brand after:transition-transform after:content-[\'\']',
        pills: 'rounded-[calc(var(--ds-radius-control)-0.125rem)]',
      },
      size: {
        small: 'h-8 px-3 text-xs',
        medium: 'h-10 px-4 text-sm',
        large: 'h-12 px-5 text-base',
      },
      active: {
        true: 'text-brand',
        false: null,
      },
    },
    compoundVariants: [
      { variant: 'underline', active: true, className: 'after:scale-x-100' },
      { variant: 'pills', active: true, className: 'bg-surface text-content shadow-sm' },
    ],
  },
);

export type TabsVariant = 'underline' | 'pills';
export type TabsSize = 'small' | 'medium' | 'large';
export type TabsOrientation = 'horizontal' | 'vertical';
