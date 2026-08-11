import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Skeleton from './Skeleton';

describe('Skeleton', () => {
  it('é decorativo por padrão', () => {
    const { container } = render(<Skeleton width={200} height={80} />);
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
  });

  it('pode comunicar o carregamento', () => {
    render(<Skeleton label="Carregando perfil" />);
    expect(screen.getByRole('status', { name: 'Carregando perfil' })).toBeInTheDocument();
  });
});
