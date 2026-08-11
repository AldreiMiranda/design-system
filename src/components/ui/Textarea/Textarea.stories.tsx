import type { Meta, StoryObj } from '@storybook/react';
import { MessageSquare, Sparkles } from 'lucide-react';
import Icon from '../Icon/Icon';
import Textarea from './Textarea';

const meta = {
  title: 'Library/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Campo multilinha nativo com os mesmos tamanhos, variantes, mensagens e estados dos demais controles do design system.',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    label: 'Mensagem',
    placeholder: 'Digite sua mensagem...',
    description: 'Compartilhe os detalhes mais importantes.',
    containerClassName: 'w-96',
  },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'filled', 'ghost'] },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    resize: { control: 'select', options: ['none', 'vertical', 'horizontal', 'both'] },
    leadingContent: { control: false },
    trailingContent: { control: false },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithCounter: Story = {
  args: { showCharacterCount: true, maxLength: 240 },
};
export const WithError: Story = {
  args: { defaultValue: 'Oi', description: undefined, errorMessage: 'Forneça mais detalhes.' },
};
export const WithIcons: Story = {
  args: {
    leadingContent: <Icon icon={MessageSquare} size="small" />,
    trailingContent: <Icon icon={Sparkles} size="small" />,
  },
};
export const Disabled: Story = { args: { disabled: true, defaultValue: 'Conteúdo indisponível.' } };
export const ReadOnly: Story = { args: { readOnly: true, defaultValue: 'Conteúdo somente para leitura.' } };

export const Sizes: Story = {
  render: () => (
    <div className="flex w-96 flex-col gap-5">
      <Textarea label="Pequeno" size="small" placeholder="Digite um valor" />
      <Textarea label="Médio" size="medium" placeholder="Digite um valor" />
      <Textarea label="Grande" size="large" placeholder="Digite um valor" />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex w-96 flex-col gap-5">
      <Textarea label="Principal" variant="primary" defaultValue="Conteúdo" />
      <Textarea label="Preenchido" variant="filled" defaultValue="Conteúdo" />
      <Textarea label="Fantasma" variant="ghost" defaultValue="Conteúdo" />
    </div>
  ),
};
