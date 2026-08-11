import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Tooltip from './Tooltip';

describe('Tooltip', () => {
  it('abre no hover após o atraso', () => {
    vi.useFakeTimers();
    render(<Tooltip content="Informação" delay={100}><button>Ajuda</button></Tooltip>);
    fireEvent.mouseEnter(screen.getByText('Ajuda').parentElement!);
    act(() => vi.advanceTimersByTime(100));
    expect(screen.getByRole('tooltip')).toHaveTextContent('Informação');
    vi.useRealTimers();
  });
});
