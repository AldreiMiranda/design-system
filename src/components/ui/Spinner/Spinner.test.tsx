import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Spinner from './Spinner';

describe('Spinner', () => {
  it('comunica o carregamento com um nome acessível', () => {
    render(<Spinner label="Salvando alterações" />);
    expect(screen.getByRole('status', { name: 'Salvando alterações' })).toBeInTheDocument();
  });

  it('pode ser apenas decorativo', () => {
    const { container } = render(<Spinner decorative />);
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
});
