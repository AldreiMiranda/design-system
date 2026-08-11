import type { Meta, StoryObj } from '@storybook/react';
import Checkbox from './Checkbox';

const meta = {
  title: 'Library/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Controle nativo para escolhas independentes, com estados checked, indeterminate, erro e integração com formulários.',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    label: 'Aceito os termos de uso',
    description: 'Você pode alterar esta preferência depois.',
    containerClassName: 'w-80',
  },
  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'large'] },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Checked: Story = { args: { defaultChecked: true } };
export const Indeterminate: Story = { args: { indeterminate: true } };
export const Required: Story = { args: { required: true } };
export const Optional: Story = { args: { optionalText: '(opcional)' } };
export const WithError: Story = {
  args: { required: true, description: undefined, errorMessage: 'Você precisa aceitar os termos.' },
};
export const Disabled: Story = { args: { disabled: true } };
export const DisabledChecked: Story = { args: { disabled: true, defaultChecked: true } };

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox label="Pequeno" size="small" />
      <Checkbox label="Médio" size="medium" />
      <Checkbox label="Grande" size="large" />
    </div>
  ),
};
