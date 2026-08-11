import { createContext, forwardRef, useContext, useId, useState } from 'react';
import type { ButtonHTMLAttributes, HTMLAttributes, KeyboardEvent } from 'react';
import { ChevronDown } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import Icon from '../Icon/Icon';
import { accordionTriggerVariants, accordionVariants } from './tokens';

interface AccordionContextValue { values: string[]; toggle: (value: string) => void; type: 'single' | 'multiple'; collapsible: boolean; id: string }
const AccordionContext = createContext<AccordionContextValue | null>(null);
const ItemContext = createContext<{ value: string; open: boolean } | null>(null);
function useAccordion() { const value = useContext(AccordionContext); if (!value) throw new Error('Use dentro de <Accordion>.'); return value; }
function useItem() { const value = useContext(ItemContext); if (!value) throw new Error('Use dentro de <AccordionItem>.'); return value; }

export interface AccordionProps extends HTMLAttributes<HTMLDivElement> { type?: 'single' | 'multiple'; value?: string | string[]; defaultValue?: string | string[]; onValueChange?: (value: string | string[]) => void; collapsible?: boolean }
const Accordion = forwardRef<HTMLDivElement, AccordionProps>(function Accordion({ type = 'single', value: controlled, defaultValue, onValueChange, collapsible = true, className, ...props }, ref) {
  const normalize = (value?: string | string[]) => value === undefined ? [] : Array.isArray(value) ? value : [value];
  const [internal, setInternal] = useState(() => normalize(defaultValue));
  const values = controlled === undefined ? internal : normalize(controlled);
  const id = useId();
  const toggle = (item: string) => {
    const open = values.includes(item);
    let next: string[];
    if (type === 'multiple') next = open ? values.filter((value) => value !== item) : [...values, item];
    else next = open && collapsible ? [] : [item];
    if (controlled === undefined) setInternal(next);
    onValueChange?.(type === 'single' ? (next[0] ?? '') : next);
  };
  return <AccordionContext.Provider value={{ values, toggle, type, collapsible, id }}><div ref={ref} {...props} data-accordion-root className={twMerge(accordionVariants(), className)} /></AccordionContext.Provider>;
});

export interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> { value: string }
export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(function AccordionItem({ value, className, ...props }, ref) {
  const accordion = useAccordion();
  return <ItemContext.Provider value={{ value, open: accordion.values.includes(value) }}><div ref={ref} className={twMerge('border-0 border-b border-solid border-outline last:border-b-0', className)} {...props} /></ItemContext.Provider>;
});

export const AccordionTrigger = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(function AccordionTrigger({ className, children, onClick, onKeyDown, ...props }, ref) {
  const accordion = useAccordion();
  const item = useItem();
  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    onKeyDown?.(event);
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
    const root = event.currentTarget.closest('[data-accordion-root]') ?? event.currentTarget.parentElement?.parentElement;
    const triggers = Array.from(root?.querySelectorAll<HTMLButtonElement>('[data-accordion-trigger]:not(:disabled)') ?? []);
    const current = triggers.indexOf(event.currentTarget);
    if (current < 0) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? triggers.length - 1 : event.key === 'ArrowUp' ? (current - 1 + triggers.length) % triggers.length : (current + 1) % triggers.length;
    triggers[next]?.focus();
  };
  return <h3 className="m-0"><button ref={ref} {...props} type="button" id={`${accordion.id}-trigger-${item.value}`} aria-expanded={item.open} aria-controls={`${accordion.id}-content-${item.value}`} data-accordion-trigger className={twMerge(accordionTriggerVariants(), className)} onClick={(event) => { accordion.toggle(item.value); onClick?.(event); }} onKeyDown={handleKeyDown}><span>{children}</span><Icon icon={ChevronDown} size="small" className={twMerge('transition-transform duration-[var(--ds-duration-normal)]', item.open && 'rotate-180')} /></button></h3>;
});

export const AccordionContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function AccordionContent({ className, children, ...props }, ref) {
  const accordion = useAccordion();
  const item = useItem();
  return <div id={`${accordion.id}-content-${item.value}`} role="region" aria-labelledby={`${accordion.id}-trigger-${item.value}`} aria-hidden={!item.open} className={twMerge('grid transition-[grid-template-rows] duration-[var(--ds-duration-normal)] ease-[var(--ds-ease-emphasized)] motion-reduce:transition-none', item.open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}><div className="min-h-0 overflow-hidden"><div ref={ref} className={twMerge('px-4 pb-4 text-sm leading-relaxed text-content-muted', className)} {...props}>{children}</div></div></div>;
});

export default Accordion;
