import { cva } from 'class-variance-authority';

export const accordionVariants = cva('w-full overflow-hidden rounded-control border border-solid border-outline bg-surface font-sans');
export const accordionTriggerVariants = cva('flex w-full items-center justify-between gap-4 border-0 bg-transparent px-4 py-3 text-left font-sans text-sm font-medium text-content outline-none transition-colors hover:bg-interaction-neutral-hover active:bg-interaction-neutral-active focus-visible:shadow-focus disabled:cursor-not-allowed disabled:bg-interaction-disabled-surface disabled:text-interaction-disabled-content');
