import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Select from './Select';

const options = [
  { value: 'br', label: 'Brasil' },
  { value: 'pt', label: 'Portugal' },
  { value: 'ao', label: 'Angola', disabled: true },
];

describe('Select', () => {
  it('abre o listbox e seleciona uma opção', () => {
    const onValueChange = vi.fn();
    render(<Select label="País" options={options} onValueChange={onValueChange} />);
    const trigger = screen.getByRole('combobox', { name: 'País' });
    fireEvent.click(trigger);
    fireEvent.click(screen.getByRole('option', { name: 'Brasil' }));
    expect(onValueChange).toHaveBeenCalledWith('br', expect.objectContaining({ label: 'Brasil' }));
    expect(trigger).toHaveTextContent('Brasil');
  });

  it('navega por teclado, ignora desabilitados e permite busca por texto', () => {
    render(<Select label="País" options={options} />);
    const trigger = screen.getByRole('combobox', { name: 'País' });
    fireEvent.keyDown(trigger, { key: 'ArrowDown' });
    fireEvent.keyDown(trigger, { key: 'p' });
    expect(trigger).toHaveAttribute('aria-activedescendant', expect.stringContaining('option-1'));
    fireEvent.keyDown(trigger, { key: 'Enter' });
    expect(trigger).toHaveTextContent('Portugal');
  });

  it('renderiza estado vazio e fecha com Escape', () => {
    render(<Select label="País" options={[]} />);
    const trigger = screen.getByRole('combobox', { name: 'País' });
    fireEvent.click(trigger);
    expect(screen.getByText('Nenhuma opção disponível')).toBeInTheDocument();
    fireEvent.keyDown(trigger, { key: 'Escape' });
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('mantém valor controlado e campo nativo para formulário', () => {
    const { rerender } = render(<Select label="País" name="country" required value="" options={options} />);
    const nativeField = document.querySelector('select[name="country"]');
    expect(nativeField).toBeRequired();
    rerender(<Select label="País" name="country" required value="br" options={options} />);
    expect(nativeField).toHaveValue('br');
  });
});
