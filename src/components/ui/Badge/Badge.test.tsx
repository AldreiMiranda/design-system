import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Badge from './Badge';

describe('Badge', () => {
  it('sobrepõe uma contagem ao conteúdo', () => {
    render(<Badge badgeContent={4}><button type="button">Mensagens, 4 não lidas</button></Badge>);
    expect(screen.getByRole('button', { name: 'Mensagens, 4 não lidas' })).toBeInTheDocument();
    expect(screen.getByText('4')).toHaveAttribute('aria-hidden', 'true');
  });

  it('limita valores numéricos com max', () => {
    render(<Badge badgeContent={120} max={99}><span>Notificações</span></Badge>);
    expect(screen.getByText('99+')).toBeInTheDocument();
  });

  it('oculta zero por padrão e permite exibi-lo', () => {
    const { rerender } = render(<Badge badgeContent={0}><span>Caixa de entrada</span></Badge>);
    expect(screen.getByText('0')).toHaveStyle({ transform: 'scale(0) translate(50%, -50%)' });

    rerender(<Badge badgeContent={0} showZero><span>Caixa de entrada</span></Badge>);
    expect(screen.getByText('0')).toHaveStyle({ transform: 'scale(1) translate(50%, -50%)' });
  });
});
