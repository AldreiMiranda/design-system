import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import TextField from './TextField';

describe('TextField', () => {
  it('associa label e substitui a descrição pelo erro', () => {
    render(<TextField label="E-mail" description="Seu contato" errorMessage="Campo inválido" required />);
    const input = screen.getByRole('textbox', { name: 'E-mail' });
    expect(input).toHaveAccessibleDescription('Campo inválido');
    expect(input).toBeInvalid();
    expect(screen.queryByText('Seu contato')).not.toBeInTheDocument();
  });
});
