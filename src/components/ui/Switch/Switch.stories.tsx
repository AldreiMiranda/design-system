import type { Meta, StoryObj } from '@storybook/react';
import Switch from './Switch';

const meta = {
  title: 'Library/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Controle para ativar ou desativar uma configuração imediatamente, com semântica nativa, foco visível e integração com formulários.',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    label: 'Receber notificações',
    description: 'Você pode alterar esta preferência quando quiser.',
    containerClassName: 'w-80',
  },
  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'large'] },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Enabled: Story = { args: { defaultChecked: true } };
export const Required: Story = { args: { required: true } };
export const Optional: Story = { args: { optionalText: '(opcional)' } };
export const WithError: Story = {
  args: { required: true, description: undefined, errorMessage: 'Ative esta configuração.' },
};
export const Disabled: Story = { args: { disabled: true } };
export const DisabledEnabled: Story = { args: { disabled: true, defaultChecked: true } };

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Switch label="Pequeno" size="small" />
      <Switch label="Médio" size="medium" />
      <Switch label="Grande" size="large" />
    </div>
  ),
};
