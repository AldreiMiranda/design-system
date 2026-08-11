import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Dialog, { DialogContent, DialogDescription, DialogHeader, DialogTitle } from './Dialog';

describe('Dialog', () => {
  it('associa título e descrição ao diálogo', () => {
    render(
      <Dialog open onOpenChange={() => undefined}>
        <DialogHeader>
          <DialogTitle>Editar perfil</DialogTitle>
          <DialogDescription>Atualize seus dados.</DialogDescription>
        </DialogHeader>
        <DialogContent>Conteúdo</DialogContent>
      </Dialog>,
    );
    expect(screen.getByRole('dialog', { name: 'Editar perfil' })).toHaveAccessibleDescription('Atualize seus dados.');
  });

  it('fecha pelo botão do cabeçalho', () => {
    const onOpenChange = vi.fn();
    render(
      <Dialog open onOpenChange={onOpenChange}>
        <DialogHeader><DialogTitle>Confirmação</DialogTitle></DialogHeader>
      </Dialog>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Fechar diálogo' }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('respeita o bloqueio do fechamento por Escape', () => {
    const onOpenChange = vi.fn();
    render(
      <Dialog open onOpenChange={onOpenChange} closeOnEscape={false}>
        <DialogHeader><DialogTitle>Confirmação</DialogTitle></DialogHeader>
      </Dialog>,
    );
    fireEvent(screen.getByRole('dialog'), new Event('cancel', { bubbles: false, cancelable: true }));
    expect(onOpenChange).not.toHaveBeenCalled();
  });
});
