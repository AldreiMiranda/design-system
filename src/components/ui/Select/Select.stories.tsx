import type { Meta, StoryObj } from '@storybook/react';
import Select from './Select';

const meta = {
  title: 'Library/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: { description: { component: 'Seleção nativa com suporte completo a teclado, formulários e mensagens auxiliares.' } },
  },
  tags: ['autodocs'],
  args: {
    label: 'País',
    placeholder: 'Selecione um país',
    containerClassName: 'w-80',
    children: <><option value="br">Brasil</option><option value="pt">Portugal</option></>,
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithDescription: Story = { args: { description: 'Usado para personalizar seu conteúdo.' } };
export const WithError: Story = { args: { errorMessage: 'Escolha uma opção.' } };
export const Disabled: Story = { args: { disabled: true } };
