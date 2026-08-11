import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Toast, ToastProvider, useToast } from './Toast';

describe('Toast', () => {
  it('usa uma região acessível conforme o tom', () => {
    const { rerender } = render(<Toast title="Alterações salvas" tone="success" duration={0} />);
    expect(screen.getByRole('status')).toHaveTextContent('Alterações salvas');

    rerender(<Toast title="Falha ao salvar" tone="danger" duration={0} />);
    expect(screen.getByRole('alert')).toHaveTextContent('Falha ao salvar');
  });

  it('permite fechar manualmente', () => {
    function Trigger() {
      const { toast } = useToast();
      return <button onClick={() => toast({ title: 'Mensagem', duration: 0 })}>Mostrar</button>;
    }
    render(<ToastProvider><Trigger /></ToastProvider>);
    fireEvent.click(screen.getByRole('button', { name: 'Mostrar' }));
    expect(screen.getByRole('status')).toHaveTextContent('Mensagem');
    fireEvent.click(screen.getByRole('button', { name: 'Fechar notificação' }));
    expect(screen.getByRole('status')).toHaveClass('pointer-events-none');
  });
});
