import type { Meta, StoryObj } from '@storybook/react';
import { Mail, Search } from 'lucide-react';
import Icon from '../Icon/Icon';
import TextField from './TextField';

const meta = {
  title: 'Library/TextField',
  component: TextField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Entrada nativa com os mesmos tamanhos, superfícies e mensagens do Select. Conteúdos laterais são opcionais.',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    label: 'E-mail',
    placeholder: 'voce@exemplo.com',
    description: 'Usaremos este endereço para contato.',
    containerClassName: 'w-80',
  },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'filled', 'ghost'] },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    leadingContent: { control: false },
    trailingContent: { control: false },
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Required: Story = { args: { required: true } };
export const Optional: Story = { args: { optionalText: '(opcional)' } };
export const WithError: Story = {
  args: {
    defaultValue: 'email-invalido',
    description: 'Esta ajuda é substituída pelo erro.',
    errorMessage: 'Informe um e-mail válido.',
  },
};
export const WithLeadingIcon: Story = {
  args: { leadingContent: <Icon icon={Mail} size="small" /> },
};
export const WithTrailingIcon: Story = {
  args: { trailingContent: <Icon icon={Search} size="small" /> },
};
export const Disabled: Story = { args: { disabled: true, defaultValue: 'voce@exemplo.com' } };
export const ReadOnly: Story = { args: { readOnly: true, defaultValue: 'voce@exemplo.com' } };

export const Sizes: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-5">
      <TextField label="Pequeno" size="small" placeholder="Digite um valor" />
      <TextField label="Médio" size="medium" placeholder="Digite um valor" />
      <TextField label="Grande" size="large" placeholder="Digite um valor" />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-5">
      <TextField label="Principal" variant="primary" defaultValue="Conteúdo" />
      <TextField label="Preenchido" variant="filled" defaultValue="Conteúdo" />
      <TextField label="Fantasma" variant="ghost" defaultValue="Conteúdo" />
    </div>
  ),
};
