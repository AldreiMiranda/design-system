import { fireEvent, render, screen } from '@testing-library/react';
import { Search } from 'lucide-react';
import { describe, expect, it, vi } from 'vitest';
import Button from './Button/Button';
import Icon from './Icon/Icon';
import Select from './Select/Select';
import TextField from './TextField/TextField';
import Typography from './Typography/Typography';

describe('componentes do design system', () => {
  it('aciona o Button e bloqueia interação durante loading', () => {
    const onClick = vi.fn();
    const { rerender } = render(<Button onClick={onClick}>Salvar</Button>);
    fireEvent.click(screen.getByRole('button', { name: 'Salvar' }));
    expect(onClick).toHaveBeenCalledOnce();

    rerender(<Button loading onClick={onClick}>Salvar</Button>);
    expect(screen.getByRole('button', { name: 'Salvar' })).toBeDisabled();
  });

  it('associa label, descrição e erro ao TextField', () => {
    render(<TextField label="E-mail" description="Seu contato" errorMessage="Campo inválido" />);
    const input = screen.getByLabelText('E-mail');
    expect(input).toHaveAccessibleDescription('Seu contato Campo inválido');
    expect(input).toBeInvalid();
  });

  it('mantém a semântica nativa e o onChange do Select', () => {
    const onChange = vi.fn();
    render(<Select label="País" placeholder="Selecione" onChange={onChange}><option value="br">Brasil</option></Select>);
    fireEvent.change(screen.getByLabelText('País'), { target: { value: 'br' } });
    expect(onChange).toHaveBeenCalledOnce();
  });

  it('permite separar variante visual e elemento da Typography', () => {
    render(<Typography variant="h2" as="p">Título visual</Typography>);
    expect(screen.getByText('Título visual').tagName).toBe('P');
  });

  it('diferencia ícones decorativos e informativos', () => {
    const { rerender } = render(<Icon icon={Search} data-testid="icon" />);
    expect(screen.getByTestId('icon')).toHaveAttribute('aria-hidden', 'true');
    rerender(<Icon icon={Search} label="Buscar" />);
    expect(screen.getByRole('img', { name: 'Buscar' })).toBeInTheDocument();
  });
});
