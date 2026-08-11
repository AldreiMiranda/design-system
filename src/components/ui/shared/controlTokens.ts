export type ControlSize = 'small' | 'medium' | 'large';
export type FieldVariant = 'primary' | 'filled' | 'ghost';

export const controlHeightClasses: Record<ControlSize, string> = {
  small: 'h-control-small text-caption',
  medium: 'h-control-medium text-body-small',
  large: 'h-control-large text-body',
};

export const fieldVariantClasses: Record<FieldVariant, string> = {
  primary: 'border-outline bg-surface',
  filled: 'border-transparent bg-surface-muted hover:border-outline',
  ghost: 'border-transparent bg-transparent hover:bg-surface-muted',
};
