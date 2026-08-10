import { forwardRef } from 'react';
import type { CSSProperties } from 'react';
import type { LucideIcon, LucideProps } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { iconVariants } from './tokens';
import type { IconSize, IconTone } from './tokens';

type IconAccessibilityProps =
  | { label?: undefined; decorative?: true }
  | { label: string; decorative?: false };

type IconBaseProps = Omit<
  LucideProps,
  'ref' | 'size' | 'color' | 'aria-label' | 'aria-hidden'
> & {
  /** Componente importado diretamente de lucide-react. */
  icon: LucideIcon;
  /** Escala semântica ou valor numérico para casos excepcionais. */
  size?: IconSize | number;
  /** Cor semântica. Use current para herdar a cor do elemento pai. */
  tone?: IconTone;
};

export type IconProps = IconBaseProps & IconAccessibilityProps;

const Icon = forwardRef<SVGSVGElement, IconProps>(function Icon(
  {
    icon: IconComponent,
    size = 'medium',
    tone = 'current',
    label,
    decorative = label ? false : true,
    className,
    style,
    strokeWidth = 2,
    ...props
  },
  ref,
) {
  const customSize = typeof size === 'number' ? size : undefined;
  const customStyle: CSSProperties | undefined = customSize !== undefined
    ? { width: customSize, height: customSize, ...style }
    : style;

  return (
    <IconComponent
      ref={ref}
      className={twMerge(
        iconVariants({
          size: typeof size === 'string' ? size : null,
          tone,
        }),
        className,
      )}
      style={customStyle}
      strokeWidth={strokeWidth}
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : label}
      role={decorative ? undefined : 'img'}
      focusable="false"
      {...props}
    />
  );
});

export default Icon;
