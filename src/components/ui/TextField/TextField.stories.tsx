import type { Meta, StoryObj } from '@storybook/react';
import { Search } from 'lucide-react';
import TextField from './TextField';

const meta = {
  title: 'Library/TextField',
  component: TextField,
  parameters: {
    layout: 'centered',
    docs: { description: { component: 'Entrada de texto com label, descrição, validação e conteúdos laterais acessíveis.' } },
  },
  tags: ['autodocs'],
  args: { label: 'E-mail', placeholder: 'voce@exemplo.com', containerClassName: 'w-80' },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithDescription: Story = { args: { description: 'Usaremos este endereço para contato.' } };
export const WithError: Story = { args: { defaultValue: 'email-invalido', errorMessage: 'Informe um e-mail válido.' } };
export const WithIcon: Story = { args: { leadingContent: <Search className="size-4" /> } };
export const Disabled: Story = { args: { disabled: true, defaultValue: 'voce@exemplo.com' } };
