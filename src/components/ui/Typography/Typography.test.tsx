import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Typography from './Typography';

describe('Typography', () => {
  it('tipa e encaminha propriedades do elemento escolhido', () => {
    const ref = createRef<HTMLAnchorElement>();
    render(<Typography ref={ref} variant="h2" as="a" href="#conteudo" tone="brand">Título visual</Typography>);
    const typography = screen.getByRole('link', { name: 'Título visual' });
    expect(typography).toHaveAttribute('href', '#conteudo');
    expect(typography).toHaveClass('text-[length:var(--ds-font-size-heading-2)]', 'text-brand');
    expect(ref.current).toBe(typography);
  });
});
