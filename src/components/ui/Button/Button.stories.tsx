import type { Meta, StoryObj } from '@storybook/react';
import { ArrowRight, Plus } from 'lucide-react';
import Button from './Button';

const meta = {
  title: 'Library/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: { description: { component: 'Ação interativa para formulários, fluxos e comandos da interface.' } },
  },
  tags: ['autodocs'],
  args: { children: 'Continuar', variant: 'primary', size: 'medium' },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'ghost', 'outlined'] },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithIcons: Story = {
  args: { leadingIcon: <Plus className="size-4" />, trailingIcon: <ArrowRight className="size-4" /> },
};
export const Loading: Story = { args: { loading: true } };
export const Disabled: Story = { args: { disabled: true } };
