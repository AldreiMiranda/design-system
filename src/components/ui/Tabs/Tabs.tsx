import { createContext, forwardRef, useContext, useId, useState } from 'react';
import type { ButtonHTMLAttributes, HTMLAttributes, KeyboardEvent } from 'react';
import { twMerge } from 'tailwind-merge';
import { tabsListVariants, tabsTriggerVariants } from './tokens';
import type { TabsOrientation, TabsSize, TabsVariant } from './tokens';

interface TabsContextValue {
  value?: string;
  setValue: (value: string) => void;
  id: string;
  variant: TabsVariant;
  size: TabsSize;
  orientation: TabsOrientation;
  activationMode: 'automatic' | 'manual';
}

const TabsContext = createContext<TabsContextValue | null>(null);
function useTabs() {
  const context = useContext(TabsContext);
  if (!context) throw new Error('Os componentes de Tabs devem estar dentro de <Tabs>.');
  return context;
}

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  variant?: TabsVariant;
  size?: TabsSize;
  orientation?: TabsOrientation;
  activationMode?: 'automatic' | 'manual';
}

const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  {
    value: controlledValue,
    defaultValue,
    onValueChange,
    variant = 'underline',
    size = 'medium',
    orientation = 'horizontal',
    activationMode = 'automatic',
    className,
    ...props
  },
  ref,
) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = controlledValue ?? internalValue;
  const id = useId();
  const setValue = (next: string) => {
    if (controlledValue === undefined) setInternalValue(next);
    onValueChange?.(next);
  };
  return (
    <TabsContext.Provider value={{ value, setValue, id, variant, size, orientation, activationMode }}>
      <div ref={ref} className={twMerge('font-sans', orientation === 'vertical' && 'flex gap-5', className)} {...props} />
    </TabsContext.Provider>
  );
});

export const TabsList = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function TabsList(
  { className, onKeyDown, ...props },
  ref,
) {
  const { orientation, activationMode, setValue, variant } = useTabs();
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;
    const keys = orientation === 'horizontal' ? ['ArrowLeft', 'ArrowRight'] : ['ArrowUp', 'ArrowDown'];
    if (![...keys, 'Home', 'End'].includes(event.key)) return;
    const tabs = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]:not(:disabled)'));
    const current = tabs.indexOf(document.activeElement as HTMLButtonElement);
    if (current < 0) return;
    event.preventDefault();
    const previousKey = orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp';
    const nextIndex = event.key === 'Home' ? 0
      : event.key === 'End' ? tabs.length - 1
        : event.key === previousKey ? (current - 1 + tabs.length) % tabs.length
          : (current + 1) % tabs.length;
    tabs[nextIndex]?.focus();
    if (activationMode === 'automatic') setValue(tabs[nextIndex]?.dataset.value ?? '');
  };
  return <div ref={ref} {...props} role="tablist" aria-orientation={orientation} className={twMerge(tabsListVariants({ variant, orientation }), className)} onKeyDown={handleKeyDown} />;
});

export interface TabsTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> { value: string }
export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(function TabsTrigger(
  { value, className, onClick, ...props },
  ref,
) {
  const context = useTabs();
  const active = context.value === value;
  return (
    <button
      ref={ref}
      {...props}
      type="button"
      role="tab"
      id={`${context.id}-tab-${value}`}
      aria-controls={`${context.id}-panel-${value}`}
      aria-selected={active}
      tabIndex={active || context.value === undefined ? 0 : -1}
      data-value={value}
      className={twMerge(tabsTriggerVariants({ variant: context.variant, size: context.size, active }), className)}
      onClick={(event) => { context.setValue(value); onClick?.(event); }}
    />
  );
});

export interface TabsContentProps extends HTMLAttributes<HTMLDivElement> { value: string; forceMount?: boolean }
export const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(function TabsContent(
  { value, forceMount = false, className, ...props },
  ref,
) {
  const context = useTabs();
  const active = context.value === value;
  if (!active && !forceMount) return null;
  return <div ref={ref} {...props} role="tabpanel" id={`${context.id}-panel-${value}`} aria-labelledby={`${context.id}-tab-${value}`} hidden={!active} tabIndex={0} className={twMerge('mt-4 outline-none focus-visible:shadow-focus', className)} />;
});

export default Tabs;
