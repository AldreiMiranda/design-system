import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Textarea from './Textarea';

describe('Textarea', () => {
  it('associa label e substitui a descrição pelo erro', () => {
    render(
      <Textarea label="Mensagem" description="Inclua detalhes" errorMessage="Campo inválido" required />,
    );
    const textarea = screen.getByRole('textbox', { name: 'Mensagem' });
    expect(textarea).toHaveAccessibleDescription('Campo inválido');
    expect(textarea).toBeInvalid();
    expect(screen.queryByText('Inclua detalhes')).not.toBeInTheDocument();
  });

  it('atualiza o contador de caracteres', () => {
    render(<Textarea label="Resumo" showCharacterCount maxLength={10} />);
    const textarea = screen.getByRole('textbox', { name: 'Resumo' });
    fireEvent.change(textarea, { target: { value: 'Olá' } });
    expect(screen.getByText('3/10')).toBeInTheDocument();
    expect(textarea).toHaveAccessibleDescription('3/10');
  });
});
