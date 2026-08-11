import type { Meta, StoryObj } from '@storybook/react';
import Button from '../Button/Button';
import Spinner from './Spinner';

const meta = {
  title: 'Library/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Indicador de atividade para operações de duração indeterminada, com tamanho e cor semânticos.',
      },
    },
  },
  tags: ['autodocs'],
  args: { label: 'Carregando conteúdo' },
  argTypes: {
    size: { control: 'select', options: ['xsmall', 'small', 'medium', 'large', 'xlarge'] },
    tone: { control: 'select', options: ['current', 'brand', 'muted', 'danger', 'success', 'inverse'] },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-5">
      <Spinner size="xsmall" />
      <Spinner size="small" />
      <Spinner size="medium" />
      <Spinner size="large" />
      <Spinner size="xlarge" />
    </div>
  ),
};

export const Tones: Story = {
  render: () => (
    <div className="flex items-center gap-5">
      <Spinner tone="brand" />
      <Spinner tone="muted" />
      <Spinner tone="success" />
      <Spinner tone="danger" />
    </div>
  ),
};

export const InsideButton: Story = {
  render: () => (
    <Button leadingIcon={<Spinner decorative tone="current" size="small" />}>
      Salvando
    </Button>
  ),
};
