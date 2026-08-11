import type { Meta, StoryObj } from '@storybook/react';
import Button from '../Button/Button';
import Switch from '../Switch/Switch';
import Popover from './Popover';

const meta = {
  title: 'Library/Popover',
  component: Popover,
  parameters: { layout: 'centered', docs: { description: { component: 'Painel contextual acionado por clique para apresentar conteúdo complementar e controles leves.' } } },
  tags: ['autodocs'],
  args: { title: 'Preferências rápidas', content: <div className="flex flex-col gap-4"><Switch label="Notificações" defaultChecked /><Switch label="Modo automático" /></div>, children: <Button variant="outlined">Abrir popover</Button> },
  argTypes: {
    placement: { control: 'select', options: ['top', 'right', 'bottom', 'left'] },
    align: { control: 'select', options: ['start', 'center', 'end'] },
    children: { control: false },
    content: { control: false },
  },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const WithoutHeader: Story = { args: { title: undefined, showCloseButton: false, content: 'Informação complementar relacionada ao elemento selecionado.' } };
export const Right: Story = { args: { placement: 'right', title: 'Detalhes' } };
