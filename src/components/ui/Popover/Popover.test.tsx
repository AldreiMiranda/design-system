import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Popover from './Popover';

describe('Popover', () => {
  it('abre pelo gatilho e fecha pelo botão', () => {
    render(<Popover title="Detalhes" content="Conteúdo"><button>Abrir</button></Popover>);
    fireEvent.click(screen.getByRole('button', { name: 'Abrir' }));
    expect(screen.getByRole('dialog', { name: 'Detalhes' })).toHaveTextContent('Conteúdo');
    fireEvent.click(screen.getByRole('button', { name: 'Fechar popover' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
