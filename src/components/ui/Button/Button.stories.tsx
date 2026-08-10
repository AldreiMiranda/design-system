import type { Meta, StoryObj } from '@storybook/react';
import { ArrowRight, Plus, Trash2 } from 'lucide-react';
import Icon from '../Icon/Icon';
import Button from './Button';

const meta = {
  title: 'Library/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Ação interativa com os mesmos tamanhos, raios e foco dos campos do sistema. Ícones são opcionais.',
      },
    },
  },
  tags: ['autodocs'],
  args: { children: 'Continuar', variant: 'primary', size: 'medium' },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'outlined', 'ghost', 'danger'] },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    leadingIcon: { control: false },
    trailingIcon: { control: false },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithIcons: Story = {
  args: {
    leadingIcon: <Icon icon={Plus} size="small" />,
    trailingIcon: <Icon icon={ArrowRight} size="small" />,
  },
};
export const Loading: Story = { args: { loading: true, loadingText: 'Salvando...' } };
export const Disabled: Story = { args: { disabled: true } };
export const FullWidth: Story = {
  args: { fullWidth: true },
  decorators: [(Story) => <div className="w-80"><Story /></div>],
};
export const IconOnly: Story = {
  args: {
    children: <Icon icon={Trash2} size="small" />,
    iconOnly: true,
    variant: 'outlined',
    'aria-label': 'Excluir item',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button size="small">Pequeno</Button>
      <Button size="medium">Médio</Button>
      <Button size="large">Grande</Button>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="primary">Principal</Button>
      <Button variant="secondary">Secundário</Button>
      <Button variant="outlined">Contornado</Button>
      <Button variant="ghost">Fantasma</Button>
      <Button variant="danger">Excluir</Button>
    </div>
  ),
};
