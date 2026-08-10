import {
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Check, ChevronDown } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import Icon from '../Icon/Icon';
import { FieldLabel, FieldMessage, FieldRoot } from '../Field/Field';
import { useFieldIds } from '../Field/useFieldIds';
import {
  selectMenuVariants,
  selectOptionVariants,
  selectTriggerVariants,
} from './tokens';
import type { SelectSize, SelectVariant } from './tokens';

export interface SelectOption {
  value: string;
  label: string;
  icon?: LucideIcon;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'children' | 'defaultValue' | 'onChange' | 'size' | 'value'
  > {
  options: SelectOption[];
  required?: boolean;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string, option: SelectOption) => void;
  label?: ReactNode;
  description?: string;
  errorMessage?: string;
  placeholder?: string;
  optionalText?: string;
  leadingContent?: ReactNode;
  variant?: SelectVariant;
  size?: SelectSize;
  fullWidth?: boolean;
  containerClassName?: string;
  menuClassName?: string;
  emptyMessage?: string;
  requiredMessage?: string;
}

const Select = forwardRef<HTMLButtonElement, SelectProps>(function Select(
  {
    id: providedId,
    options,
    value,
    defaultValue = '',
    onValueChange,
    variant = 'primary',
    size = 'medium',
    className,
    containerClassName,
    menuClassName,
    emptyMessage = 'Nenhuma opção disponível',
    requiredMessage = 'Selecione uma opção.',
    label,
    description,
    errorMessage,
    placeholder = 'Selecione uma opção',
    optionalText,
    leadingContent,
    fullWidth = true,
    required,
    disabled,
    name,
    form,
    onKeyDown,
    onBlur,
    onFocus,
    'aria-describedby': ariaDescribedBy,
    'aria-invalid': ariaInvalid,
    ...props
  },
  forwardedRef,
) {
  const [formInvalid, setFormInvalid] = useState(false);
  const effectiveErrorMessage = errorMessage ?? (formInvalid ? requiredMessage : undefined);
  const { id, labelId, helperId, errorId, describedBy } = useFieldIds({
    id: providedId,
    description,
    errorMessage: effectiveErrorMessage,
    ariaDescribedBy,
  });
  const listboxId = `${id}-listbox`;
  const invalid = Boolean(effectiveErrorMessage || ariaInvalid === true || ariaInvalid === 'true');
  const controlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const selectedValue = controlled ? value : internalValue;
  const selectedOption = options.find((option) => option.value === selectedValue);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<Array<HTMLLIElement | null>>([]);
  const typeahead = useRef('');
  const typeaheadTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (!open) return;

    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener('mousedown', closeOnOutsideClick);
    return () => document.removeEventListener('mousedown', closeOnOutsideClick);
  }, [open]);

  useEffect(() => {
    if (open && activeIndex >= 0) {
      optionRefs.current[activeIndex]?.scrollIntoView?.({ block: 'nearest' });
    }
  }, [activeIndex, open]);

  useEffect(() => () => {
    if (typeaheadTimer.current) clearTimeout(typeaheadTimer.current);
  }, []);

  const firstEnabledIndex = () => options.findIndex((option) => !option.disabled);
  const lastEnabledIndex = () => {
    for (let index = options.length - 1; index >= 0; index -= 1) {
      if (!options[index].disabled) return index;
    }
    return -1;
  };
  const moveActive = (direction: 1 | -1) => {
    if (!options.length) return;
    let next = activeIndex;
    for (let attempts = 0; attempts < options.length; attempts += 1) {
      next = (next + direction + options.length) % options.length;
      if (!options[next].disabled) {
        setActiveIndex(next);
        return;
      }
    }
  };
  const openMenu = () => {
    if (disabled) return;
    const selectedIndex = options.findIndex(
      (option) => option.value === selectedValue && !option.disabled,
    );
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : firstEnabledIndex());
    setOpen(true);
  };
  const chooseOption = (option: SelectOption) => {
    if (option.disabled) return;
    if (!controlled) setInternalValue(option.value);
    setFormInvalid(false);
    onValueChange?.(option.value, option);
    setOpen(false);
  };
  const handleKeyDown: ButtonHTMLAttributes<HTMLButtonElement>['onKeyDown'] = (event) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;

    if (event.key.length === 1 && !event.altKey && !event.ctrlKey && !event.metaKey && event.key !== ' ') {
      typeahead.current += event.key.toLocaleLowerCase();
      if (typeaheadTimer.current) clearTimeout(typeaheadTimer.current);
      typeaheadTimer.current = setTimeout(() => { typeahead.current = ''; }, 500);
      const start = Math.max(activeIndex, -1) + 1;
      const orderedOptions = [...options.slice(start), ...options.slice(0, start)];
      const match = orderedOptions.find(
        (option) => !option.disabled && option.label.toLocaleLowerCase().startsWith(typeahead.current),
      );
      if (match) {
        event.preventDefault();
        if (!open) openMenu();
        setActiveIndex(options.indexOf(match));
      }
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (!open) openMenu();
      else moveActive(event.key === 'ArrowDown' ? 1 : -1);
    } else if (event.key === 'Home' && open) {
      event.preventDefault();
      setActiveIndex(firstEnabledIndex());
    } else if (event.key === 'End' && open) {
      event.preventDefault();
      setActiveIndex(lastEnabledIndex());
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (!open) openMenu();
      else if (activeIndex >= 0) chooseOption(options[activeIndex]);
    } else if (event.key === 'Escape' && open) {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Tab' && open) {
      setOpen(false);
    }
  };

  return (
    <FieldRoot fullWidth={fullWidth} className={containerClassName}>
      <div ref={rootRef} className="contents">
      <FieldLabel id={labelId} htmlFor={id} required={required} optionalText={optionalText}>
        {label}
      </FieldLabel>
      <div className="relative">
        {(name || required) && (
          <select
            className="sr-only"
            aria-hidden="true"
            tabIndex={-1}
            name={name}
            value={selectedValue}
            form={form}
            required={required}
            onChange={() => undefined}
            onInvalid={(event) => {
              event.preventDefault();
              setFormInvalid(true);
              rootRef.current?.querySelector<HTMLButtonElement>('[role="combobox"]')?.focus();
            }}
          >
            <option value="">{placeholder}</option>
            {options.map((option, index) => (
              <option key={`${option.value}-${index}`} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </select>
        )}
        {leadingContent && (
          <span className="pointer-events-none absolute left-3 top-1/2 z-10 flex -translate-y-1/2 text-content-muted">
            {leadingContent}
          </span>
        )}
        <button
          ref={forwardedRef}
          id={id}
          type="button"
          className={twMerge(
            selectTriggerVariants({
              variant,
              size,
              invalid,
              hasLeadingContent: Boolean(leadingContent),
            }),
            className,
          )}
          disabled={disabled}
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-activedescendant={open && activeIndex >= 0 ? `${id}-option-${activeIndex}` : undefined}
          aria-required={required || undefined}
          aria-labelledby={label ? labelId : undefined}
          aria-label={label ? undefined : placeholder}
          aria-invalid={ariaInvalid ?? (effectiveErrorMessage ? true : undefined)}
          aria-describedby={describedBy}
          aria-errormessage={errorId}
          onClick={() => (open ? setOpen(false) : openMenu())}
          onKeyDown={handleKeyDown}
          onBlur={onBlur}
          onFocus={onFocus}
          {...props}
        >
          {selectedOption?.icon && !leadingContent && (
            <Icon icon={selectedOption.icon} size="small" tone="muted" className="mr-2" />
          )}
          <span className={twMerge('min-w-0 flex-1 truncate', !selectedOption && 'text-content-muted')}>
            {selectedOption?.label ?? placeholder}
          </span>
          <Icon
            icon={ChevronDown}
            size="small"
            tone="muted"
            className={twMerge('absolute right-3 transition-transform duration-150', open && 'rotate-180')}
          />
        </button>

        <ul
          id={listboxId}
          className={twMerge(
            selectMenuVariants({ variant }),
            open
              ? 'pointer-events-auto translate-y-0 scale-100 opacity-100 blur-0'
              : 'pointer-events-none -translate-y-1.5 scale-[0.985] opacity-0 blur-[1px]',
            menuClassName,
          )}
          role="listbox"
          aria-hidden={!open}
          aria-labelledby={label ? labelId : undefined}
          aria-label={label ? undefined : placeholder}
        >
            {options.length === 0 && (
              <li className="px-2.5 py-2 text-sm text-content-muted" role="option" aria-disabled="true">
                {emptyMessage}
              </li>
            )}
            {options.map((option, index) => {
              const selected = selectedOption === option;
              return (
                <li
                  key={`${option.value}-${index}`}
                  ref={(node) => { optionRefs.current[index] = node; }}
                  id={`${id}-option-${index}`}
                  className={selectOptionVariants({
                    selected,
                    active: index === activeIndex,
                    disabled: Boolean(option.disabled),
                    className: open
                      ? 'animate-[ds-select-option-in_180ms_var(--ds-ease-emphasized)_both] motion-reduce:animate-none'
                      : undefined,
                  })}
                  style={{ animationDelay: open ? `${35 + Math.min(index, 6) * 22}ms` : undefined }}
                  role="option"
                  aria-selected={selected}
                  aria-disabled={option.disabled || undefined}
                  onMouseEnter={() => !option.disabled && setActiveIndex(index)}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => chooseOption(option)}
                >
                  {option.icon && <Icon icon={option.icon} size="small" tone={selected ? 'brand' : 'muted'} />}
                  <span className="min-w-0 flex-1 truncate">{option.label}</span>
                  {selected && (
                    <Icon
                      icon={Check}
                      size="small"
                      tone="brand"
                      className="animate-[ds-select-check-in_180ms_var(--ds-ease-emphasized)] motion-reduce:animate-none"
                    />
                  )}
                </li>
              );
            })}
        </ul>
      </div>
      <FieldMessage
        helperId={helperId}
        errorId={errorId}
        description={description}
        errorMessage={effectiveErrorMessage}
      />
      </div>
    </FieldRoot>
  );
});

export default Select;
