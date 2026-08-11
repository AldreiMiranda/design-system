import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Alert from './Alert';

describe('Alert', () => {
  it('usa status para mensagens informativas', () => {
    render(<Alert title="Informação">Conteúdo do aviso</Alert>);
    expect(screen.getByRole('status')).toHaveTextContent('InformaçãoConteúdo do aviso');
  });

  it('usa alert para mensagens urgentes', () => {
    render(<Alert tone="danger">Não foi possível salvar.</Alert>);
    expect(screen.getByRole('alert')).toHaveTextContent('Não foi possível salvar.');
  });

  it('permite dispensar a mensagem', () => {
    const onDismiss = vi.fn();
    render(<Alert onDismiss={onDismiss}>Mensagem</Alert>);
    fireEvent.click(screen.getByRole('button', { name: 'Fechar aviso' }));
    expect(onDismiss).toHaveBeenCalledOnce();
  });
});
