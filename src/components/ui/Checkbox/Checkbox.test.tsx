import { fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import Checkbox from './Checkbox';

describe('Checkbox', () => {
  it('alterna o input nativo e dispara onChange', () => {
    const onChange = vi.fn();
    render(<Checkbox label="Aceito os termos" onChange={onChange} />);
    const checkbox = screen.getByRole('checkbox', { name: 'Aceito os termos' });
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(onChange).toHaveBeenCalledOnce();
  });

  it('sincroniza estado indeterminado e encaminha ref', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Checkbox ref={ref} label="Selecionar todos" indeterminate />);
    expect(ref.current).toBePartiallyChecked();
  });

  it('associa erro e estado inválido', () => {
    render(<Checkbox label="Aceito os termos" errorMessage="Campo obrigatório" required />);
    const checkbox = screen.getByRole('checkbox', { name: 'Aceito os termos' });
    expect(checkbox).toBeInvalid();
    expect(checkbox).toHaveAccessibleDescription('Campo obrigatório');
  });
});
