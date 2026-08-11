import { fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import Switch from './Switch';

describe('Switch', () => {
  it('alterna o input nativo e dispara onChange', () => {
    const onChange = vi.fn();
    render(<Switch label="Receber notificações" onChange={onChange} />);
    const switchControl = screen.getByRole('switch', { name: 'Receber notificações' });

    fireEvent.click(switchControl);

    expect(switchControl).toBeChecked();
    expect(onChange).toHaveBeenCalledOnce();
  });

  it('encaminha a ref para o input', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Switch ref={ref} label="Modo automático" />);
    expect(ref.current).toBe(screen.getByRole('switch', { name: 'Modo automático' }));
  });

  it('associa descrição e mensagem de erro', () => {
    const { rerender } = render(
      <Switch label="Modo automático" description="Ajusta o sistema automaticamente." />,
    );
    expect(screen.getByRole('switch')).toHaveAccessibleDescription(
      'Ajusta o sistema automaticamente.',
    );

    rerender(<Switch label="Modo automático" errorMessage="Ative esta configuração." />);
    expect(screen.getByRole('switch')).toBeInvalid();
    expect(screen.getByRole('switch')).toHaveAccessibleDescription('Ative esta configuração.');
  });
});
