import type { Meta, StoryObj } from '@storybook/react';
import { AlertTriangle, Check, Heart, Info, Search } from 'lucide-react';
import Icon from './Icon';
import type { IconSize, IconTone } from './tokens';

const sizes: IconSize[] = ['xsmall', 'small', 'medium', 'large', 'xlarge'];
const tones: IconTone[] = ['current', 'brand', 'default', 'muted', 'danger'];

const meta = {
  title: 'Library/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Ícones Lucide com escala e cores semânticas. São decorativos por padrão; use `label` quando transmitirem informação.',
      },
    },
  },
  tags: ['autodocs'],
  args: { icon: Heart, size: 'medium', tone: 'brand' },
  argTypes: {
    icon: { control: false },
    size: { control: 'select', options: sizes },
    tone: { control: 'select', options: tones },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Decorative: Story = {};
export const Informative: Story = {
  args: { icon: AlertTriangle, label: 'Atenção', tone: 'danger' },
};
export const CustomSize: Story = {
  args: { icon: Search, size: 30, tone: 'default' },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-6">
      {sizes.map((size) => (
        <div key={size} className="flex flex-col items-center gap-2 text-content-muted">
          <Icon icon={Heart} size={size} tone="brand" />
          <span className="text-xs">{size}</span>
        </div>
      ))}
    </div>
  ),
};

export const SemanticTones: Story = {
  render: () => (
    <div className="flex gap-6">
      <Icon icon={Search} label="Buscar" tone="current" />
      <Icon icon={Heart} label="Favorito" tone="brand" />
      <Icon icon={Check} label="Concluído" tone="default" />
      <Icon icon={Info} label="Informação" tone="muted" />
      <Icon icon={AlertTriangle} label="Erro" tone="danger" />
    </div>
  ),
};
