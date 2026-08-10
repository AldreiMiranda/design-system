import type { Meta, StoryObj } from '@storybook/react';
import Typography from './Typography';
import type { TypographyTone, TypographyVariant } from './tokens';

const variants: TypographyVariant[] = [
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'subheading1', 'subheading2', 'body1', 'body2', 'caption', 'overline',
];
const tones: TypographyTone[] = ['default', 'muted', 'brand', 'danger', 'inverse', 'inherit'];

const meta = {
  title: 'Library/Typography',
  component: Typography,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Escala tipográfica com tons, alinhamento e pesos semânticos. `variant` controla a aparência; `as` controla o elemento HTML.',
      },
    },
  },
  args: { children: 'Construa experiências consistentes', variant: 'h2', tone: 'default' },
  argTypes: {
    variant: { control: 'select', options: variants },
    tone: { control: 'select', options: tones },
    align: { control: 'select', options: ['inherit', 'left', 'center', 'right'] },
    weight: { control: 'select', options: [undefined, 'regular', 'medium', 'semibold', 'bold'] },
    maxLines: { control: 'select', options: [undefined, 1, 2, 3, 4] },
    as: { control: 'select', options: [undefined, 'h1', 'h2', 'h3', 'p', 'span', 'div'] },
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const SemanticOverride: Story = {
  name: 'Visual de título em parágrafo',
  args: { variant: 'h3', as: 'p' },
};
export const Truncated: Story = {
  args: {
    variant: 'body1',
    maxLines: 2,
    className: 'max-w-md',
    children:
      'Textos extensos podem ser limitados a uma quantidade previsível de linhas. Isso ajuda a preservar o ritmo vertical de cards e listas sem remover o conteúdo completo da fonte de dados.',
  },
};

export const TypeScale: Story = {
  render: () => (
    <div className="flex max-w-3xl flex-col gap-6">
      {variants.map((variant) => (
        <div key={variant} className="grid grid-cols-[120px_1fr] items-baseline gap-6 border-b border-outline pb-4">
          <Typography variant="caption" tone="muted">{variant}</Typography>
          <Typography variant={variant}>Design que fala a mesma língua</Typography>
        </div>
      ))}
    </div>
  ),
};

export const SemanticTones: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Typography tone="default">Conteúdo principal</Typography>
      <Typography tone="muted">Conteúdo secundário</Typography>
      <Typography tone="brand">Conteúdo de marca</Typography>
      <Typography tone="danger">Mensagem de erro</Typography>
      <div className="rounded-lg bg-zinc-950 p-3">
        <Typography tone="inverse">Conteúdo sobre fundo escuro</Typography>
      </div>
    </div>
  ),
};
