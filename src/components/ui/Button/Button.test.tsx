import { fireEvent, render, screen } from '@testing-library/react';
import { Trash2 } from 'lucide-react';
import { describe, expect, it, vi } from 'vitest';
import Icon from '../Icon/Icon';
import Button from './Button';

describe('Button', () => {
  it('aciona o callback e bloqueia interação durante loading', () => {
    const onClick = vi.fn();
    const { rerender } = render(<Button onClick={onClick}>Salvar</Button>);
    fireEvent.click(screen.getByRole('button', { name: 'Salvar' }));
    expect(onClick).toHaveBeenCalledOnce();

    rerender(<Button loading onClick={onClick}>Salvar</Button>);
    expect(screen.getByRole('button', { name: 'Salvar' })).toBeDisabled();
  });

  it('oculta o ícone original durante loading icon-only', () => {
    render(
      <Button iconOnly loading aria-label="Excluir">
        <Icon icon={Trash2} data-testid="original-icon" />
      </Button>,
    );
    expect(screen.queryByTestId('original-icon')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Excluir' })).toHaveAttribute('aria-busy', 'true');
  });

  it('cria e remove o ripple ao pressionar', () => {
    const { container } = render(<Button>Continuar</Button>);
    fireEvent.pointerDown(screen.getByRole('button', { name: 'Continuar' }), {
      clientX: 10,
      clientY: 10,
    });
    const ripple = container.querySelector('[data-ripple="true"]');
    expect(ripple).toBeInTheDocument();
    fireEvent.animationEnd(ripple!);
    expect(container.querySelector('[data-ripple="true"]')).not.toBeInTheDocument();
  });
});
