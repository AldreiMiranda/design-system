import type { Meta, StoryObj } from '@storybook/react';
import { Bell, Mail, User } from 'lucide-react';
import Icon from '../Icon/Icon';
import Badge from './Badge';

const iconButtonClass = 'inline-flex size-10 items-center justify-center rounded-full border border-solid border-outline bg-surface text-content';

const meta = {
  title: 'Library/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Indicador sobreposto a outro elemento para comunicar contagens ou estados compactos. Inclua seu significado no nome acessível do elemento associado; o conteúdo visual do Badge é decorativo.',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    badgeContent: 4,
    children: <Icon icon={Mail} size="large" />,
  },
  argTypes: {
    tone: { control: 'select', options: ['neutral', 'brand', 'info', 'success', 'warning', 'danger'] },
    variant: { control: 'select', options: ['standard', 'dot'] },
    overlap: { control: 'select', options: ['rectangular', 'circular'] },
    position: { control: 'select', options: ['top-right', 'top-left', 'bottom-right', 'bottom-left'] },
    children: { control: false },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const NotificationButton: Story = {
  render: () => (
    <Badge badgeContent={4} overlap="circular">
      <button
        type="button"
        className={iconButtonClass}
        aria-label="Notificações, 4 não lidas"
      >
        <Icon icon={Bell} />
      </button>
    </Badge>
  ),
};
export const Dot: Story = { args: { variant: 'dot', tone: 'danger' } };
export const Maximum: Story = { args: { badgeContent: 120, max: 99 } };
export const ShowZero: Story = { args: { badgeContent: 0, showZero: true, tone: 'neutral' } };
export const Invisible: Story = { args: { invisible: true } };
export const CircularOverlap: Story = {
  args: {
    overlap: 'circular',
    badgeContent: 2,
    children: (
      <span className="inline-flex size-12 items-center justify-center rounded-full bg-surface-muted">
        <Icon icon={User} size="large" />
      </span>
    ),
  },
};

export const Positions: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-10 p-5">
      <Badge badgeContent={1} position="top-left">
        <span className={iconButtonClass}><Icon icon={Bell} /></span>
      </Badge>
      <Badge badgeContent={2} position="top-right">
        <span className={iconButtonClass}><Icon icon={Bell} /></span>
      </Badge>
      <Badge badgeContent={3} position="bottom-left">
        <span className={iconButtonClass}><Icon icon={Bell} /></span>
      </Badge>
      <Badge badgeContent={4} position="bottom-right">
        <span className={iconButtonClass}><Icon icon={Bell} /></span>
      </Badge>
    </div>
  ),
};

export const Tones: Story = {
  render: () => (
    <div className="flex items-center gap-8 p-4">
      {(['neutral', 'brand', 'info', 'success', 'warning', 'danger'] as const).map((tone, index) => (
        <Badge key={tone} badgeContent={index + 1} tone={tone} overlap="circular">
          <span className={iconButtonClass}><Icon icon={Bell} /></span>
        </Badge>
      ))}
    </div>
  ),
};
