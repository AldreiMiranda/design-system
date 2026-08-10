import type { Meta, StoryObj } from '@storybook/react';
import Typography from './Typography';

const meta = {
  title: 'Library/Typography',
  component: Typography,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: 'Escala tipográfica que separa estilo visual da semântica do elemento HTML.' } },
  },
  args: { children: 'Construa experiências consistentes', variant: 'h2' },
  argTypes: {
    variant: { control: 'select', options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subheading1', 'subheading2', 'body1', 'body2'] },
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const HeadingStyleOnParagraph: Story = { args: { variant: 'h3', as: 'p' } };
