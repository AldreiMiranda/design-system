import { forwardRef } from 'react';
import type {
  HTMLAttributes,
  ImgHTMLAttributes,
  ReactNode,
} from 'react';
import { twMerge } from 'tailwind-merge';
import { cardSpacingVariants, cardVariants } from './tokens';
import type { CardSpacing, CardVariant } from './tokens';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
}

const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { variant = 'elevated', className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={twMerge(cardVariants({ variant }), className)} {...props} />
  );
});

type HeadingLevel = 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface CardHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title: ReactNode;
  description?: ReactNode;
  eyebrow?: ReactNode;
  avatar?: ReactNode;
  action?: ReactNode;
  headingLevel?: HeadingLevel;
  spacing?: CardSpacing;
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(function CardHeader(
  {
    title,
    description,
    eyebrow,
    avatar,
    action,
    headingLevel: Heading = 'h3',
    spacing = 'medium',
    className,
    ...props
  },
  ref,
) {
  return (
    <div
      ref={ref}
      className={twMerge('flex items-start gap-3', cardSpacingVariants({ spacing }), className)}
      {...props}
    >
      {avatar && <div className="flex shrink-0">{avatar}</div>}
      <div className="min-w-0 flex-1">
        {eyebrow && (
          <div className="mb-1 text-xs font-semibold uppercase tracking-[0.08em] text-brand">
            {eyebrow}
          </div>
        )}
        <Heading className="m-0 text-base font-semibold leading-snug text-content">{title}</Heading>
        {description && <div className="mt-1 text-sm leading-relaxed text-content-muted">{description}</div>}
      </div>
      {action && <div className="flex shrink-0">{action}</div>}
    </div>
  );
});

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  spacing?: CardSpacing;
}

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(function CardContent(
  { spacing = 'medium', className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={twMerge(cardSpacingVariants({ spacing }), 'pt-0 text-sm leading-relaxed', className)}
      {...props}
    />
  );
});

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  spacing?: CardSpacing;
  align?: 'start' | 'end' | 'between';
  divided?: boolean;
}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(function CardFooter(
  { spacing = 'medium', align = 'end', divided = false, className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={twMerge(
        'flex items-center gap-2 pt-0',
        cardSpacingVariants({ spacing }),
        align === 'start' && 'justify-start',
        align === 'end' && 'justify-end',
        align === 'between' && 'justify-between',
        divided && 'border-0 border-t border-solid border-outline pt-4',
        className,
      )}
      {...props}
    />
  );
});

export interface CardMediaProps extends ImgHTMLAttributes<HTMLImageElement> {
  aspectRatio?: 'video' | 'square' | 'wide';
}

export const CardMedia = forwardRef<HTMLImageElement, CardMediaProps>(function CardMedia(
  { aspectRatio = 'video', className, alt, ...props },
  ref,
) {
  return (
    <img
      ref={ref}
      alt={alt}
      className={twMerge(
        'block w-full object-cover',
        aspectRatio === 'video' && 'aspect-video',
        aspectRatio === 'square' && 'aspect-square',
        aspectRatio === 'wide' && 'aspect-[2/1]',
        className,
      )}
      {...props}
    />
  );
});

export default Card;
