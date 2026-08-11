import type { Meta, StoryObj } from '@storybook/react';
import Accordion, { AccordionContent, AccordionItem, AccordionTrigger } from './Accordion';

const meta = { title: 'Library/Accordion', component: Accordion, parameters: { layout: 'centered', docs: { description: { component: 'Revela ou oculta seções relacionadas, com modos de seleção única ou múltipla.' } } }, tags: ['autodocs'], args: { className: 'w-[520px]', defaultValue: 'item-1' }, argTypes: { type: { control: 'select', options: ['single', 'multiple'] } } } satisfies Meta<typeof Accordion>;
export default meta;
type Story = StoryObj<typeof meta>;
const content = <><AccordionItem value="item-1"><AccordionTrigger>O que é um design system?</AccordionTrigger><AccordionContent>Uma coleção de padrões, componentes e orientações para criar produtos consistentes.</AccordionContent></AccordionItem><AccordionItem value="item-2"><AccordionTrigger>Os componentes são acessíveis?</AccordionTrigger><AccordionContent>Sim. Os componentes preservam semântica, teclado, foco e comunicação assistiva.</AccordionContent></AccordionItem><AccordionItem value="item-3"><AccordionTrigger>Posso personalizar os tokens?</AccordionTrigger><AccordionContent>Sim. Cores, tipografia, raios e movimentos são definidos por variáveis CSS.</AccordionContent></AccordionItem></>;
export const Default: Story = { render: (args) => <Accordion {...args} data-accordion-root>{content}</Accordion> };
export const Multiple: Story = { args: { type: 'multiple', defaultValue: ['item-1', 'item-2'] }, render: (args) => <Accordion {...args} data-accordion-root>{content}</Accordion> };
export const NonCollapsible: Story = { args: { collapsible: false }, render: (args) => <Accordion {...args} data-accordion-root>{content}</Accordion> };
