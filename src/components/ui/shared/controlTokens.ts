export type ControlSize = 'small' | 'medium' | 'large';
export type FieldVariant = 'primary' | 'filled' | 'ghost';

export const controlHeightClasses: Record<ControlSize, string> = {
  small: 'h-8 text-xs',
  medium: 'h-10 text-sm',
  large: 'h-12 text-base',
};

export const fieldVariantClasses: Record<FieldVariant, string> = {
  primary: 'border-outline bg-surface',
  filled: 'border-transparent bg-surface-muted hover:border-outline',
  ghost: 'border-transparent bg-transparent hover:bg-surface-muted',
};
