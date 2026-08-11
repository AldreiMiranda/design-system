import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Accordion, { AccordionContent, AccordionItem, AccordionTrigger } from './Accordion';

describe('Accordion', () => {
  it('expande e recolhe um item', () => {
    render(<Accordion><AccordionItem value="one"><AccordionTrigger>Primeiro</AccordionTrigger><AccordionContent>Conteúdo</AccordionContent></AccordionItem></Accordion>);
    const trigger = screen.getByRole('button', { name: 'Primeiro' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('region')).toHaveAttribute('aria-hidden', 'false');
  });
});
