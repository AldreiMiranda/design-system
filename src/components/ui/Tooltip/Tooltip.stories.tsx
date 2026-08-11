import type { Meta, StoryObj } from '@storybook/react';
import { Info } from 'lucide-react';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import Tooltip from './Tooltip';

const meta = {
  title: 'Library/Tooltip',
  component: Tooltip,
  parameters: { layout: 'centered', docs: { description: { component: 'Texto curto e contextual exibido ao passar o mouse ou focar um elemento.' } } },
  tags: ['autodocs'],
  args: { content: 'Mais informações', children: <Button variant="outlined">Passe o mouse</Button> },
  argTypes: {
    placement: { control: 'select', options: ['top', 'right', 'bottom', 'left'] },
    align: { control: 'select', options: ['start', 'center', 'end'] },
    appearance: { control: 'select', options: ['light', 'dark'] },
    children: { control: false },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const OnIcon: Story = {
  args: {
    content: 'Este campo é usado para comunicações importantes.',
    children: <button type="button" className="border-0 bg-transparent p-2 text-content-muted" aria-label="Ajuda"><Icon icon={Info} /></button>,
  },
};
export const Bottom: Story = { args: { placement: 'bottom', content: 'Posicionado abaixo' } };
export const Dark: Story = { args: { appearance: 'dark', content: 'Tooltip com fundo escuro' } };

export const Positions: Story = {
  parameters: {
    docs: {
      description: {
        story: 'O Tooltip aceita os tokens `top`, `right`, `bottom` e `left`. Se não houver espaço, a posição é invertida automaticamente.',
      },
    },
  },
  render: () => (
    <div className="grid min-h-72 min-w-96 grid-cols-3 grid-rows-3 place-items-center gap-8 p-12">
      <div className="col-start-2 row-start-1">
        <Tooltip content="Posição top" placement="top" delay={0}>
          <Button variant="outlined" size="small">Top</Button>
        </Tooltip>
      </div>
      <div className="col-start-1 row-start-2">
        <Tooltip content="Posição left" placement="left" delay={0}>
          <Button variant="outlined" size="small">Left</Button>
        </Tooltip>
      </div>
      <div className="col-start-3 row-start-2">
        <Tooltip content="Posição right" placement="right" delay={0}>
          <Button variant="outlined" size="small">Right</Button>
        </Tooltip>
      </div>
      <div className="col-start-2 row-start-3">
        <Tooltip content="Posição bottom" placement="bottom" delay={0}>
          <Button variant="outlined" size="small">Bottom</Button>
        </Tooltip>
      </div>
    </div>
  ),
};
