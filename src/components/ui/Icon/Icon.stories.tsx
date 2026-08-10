import type { Meta, StoryObj } from '@storybook/react';
import { Heart } from 'lucide-react';
import Icon from './Icon';

const meta = {
  title: 'Library/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
    docs: { description: { component: 'Adaptador leve para ícones Lucide decorativos ou informativos.' } },
  },
  tags: ['autodocs'],
  args: { icon: Heart, size: 24 },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Decorative: Story = {};
export const Informative: Story = { args: { label: 'Favorito' } };
