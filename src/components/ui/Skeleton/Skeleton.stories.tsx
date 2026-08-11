import type { Meta, StoryObj } from '@storybook/react';
import Skeleton from './Skeleton';

const meta = {
  title: 'Library/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Representação temporária da estrutura de um conteúdo enquanto seus dados estão sendo carregados.',
      },
    },
  },
  tags: ['autodocs'],
  args: { width: 320, height: 120, label: 'Carregando conteúdo' },
  argTypes: {
    variant: { control: 'select', options: ['text', 'circular', 'rectangular'] },
    animation: { control: 'select', options: ['pulse', 'wave', 'none'] },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Circular: Story = { args: { variant: 'circular', width: 64, height: 64 } };
export const Text: Story = { args: { variant: 'text', width: 280, height: undefined } };
export const Pulse: Story = { args: { animation: 'pulse' } };
export const WithoutAnimation: Story = { args: { animation: 'none' } };

export const CardPlaceholder: Story = {
  render: () => (
    <div className="w-80 rounded-control border border-solid border-outline p-4">
      <div className="flex items-center gap-3">
        <Skeleton variant="circular" width={48} height={48} />
        <div className="flex flex-1 flex-col gap-2">
          <Skeleton variant="text" width="65%" />
          <Skeleton variant="text" width="42%" height={12} />
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="92%" />
        <Skeleton variant="text" width="76%" />
      </div>
    </div>
  ),
};
