import { render, screen } from '@testing-library/react';
import { Search } from 'lucide-react';
import { describe, expect, it } from 'vitest';
import Icon from './Icon';

describe('Icon', () => {
  it('diferencia ícones decorativos e informativos', () => {
    const { rerender } = render(<Icon icon={Search} data-testid="icon" />);
    expect(screen.getByTestId('icon')).toHaveAttribute('aria-hidden', 'true');
    rerender(<Icon icon={Search} label="Buscar" tone="brand" size="large" />);
    expect(screen.getByRole('img', { name: 'Buscar' })).toHaveClass('text-brand', 'size-6');
  });

  it('aceita tamanho numérico zero', () => {
    render(<Icon icon={Search} size={0} data-testid="zero-icon" />);
    expect(screen.getByTestId('zero-icon')).toHaveStyle({ width: 0, height: 0 });
  });
});
