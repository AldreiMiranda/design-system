import type { LucideIcon, LucideProps } from 'lucide-react';

export interface IconProps extends Omit<LucideProps, 'ref'> {
  icon: LucideIcon;
  label?: string;
}

function Icon({ icon: IconComponent, label, ...props }: IconProps) {
  return (
    <IconComponent
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? 'img' : undefined}
      {...props}
    />
  );
}

export default Icon;
