import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Tabs, { TabsContent, TabsList, TabsTrigger } from './Tabs';

describe('Tabs', () => {
  it('alterna painéis e navega pelo teclado', () => {
    render(<Tabs defaultValue="one"><TabsList><TabsTrigger value="one">Um</TabsTrigger><TabsTrigger value="two">Dois</TabsTrigger></TabsList><TabsContent value="one">Primeiro</TabsContent><TabsContent value="two">Segundo</TabsContent></Tabs>);
    const first = screen.getByRole('tab', { name: 'Um' });
    first.focus();
    fireEvent.keyDown(first.parentElement!, { key: 'ArrowRight' });
    expect(screen.getByRole('tab', { name: 'Dois' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Segundo');
  });
});
