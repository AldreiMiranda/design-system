import type { Meta, StoryObj } from '@storybook/react';
import { MoreHorizontal, User } from 'lucide-react';
import Badge from '../Badge/Badge';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import Card, { CardContent, CardFooter, CardHeader, CardMedia } from './Card';

const meta = {
  title: 'Library/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Superfície composta para agrupar conteúdo e ações relacionadas. Use Header, Content, Footer e Media conforme a necessidade.',
      },
    },
  },
  tags: ['autodocs'],
  args: { variant: 'elevated', className: 'w-96' },
  argTypes: {
    variant: { control: 'select', options: ['elevated', 'outlined', 'filled'] },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader
        eyebrow="Design system"
        title="Componentes consistentes"
        description="Construa interfaces acessíveis usando uma linguagem visual compartilhada."
      />
      <CardFooter>
        <Button variant="ghost" size="small">Saiba mais</Button>
      </CardFooter>
    </Card>
  ),
};

export const WithContent: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader title="Resumo do projeto" description="Atualizado há cinco minutos" />
      <CardContent>
        Este projeto possui 12 componentes documentados, com testes de comportamento e tokens semânticos compartilhados.
      </CardContent>
    </Card>
  ),
};

export const WithActions: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader
        title="Publicar alterações?"
        description="As mudanças ficarão disponíveis para todos os consumidores."
        action={(
          <button type="button" className="border-0 bg-transparent p-1 text-content-muted" aria-label="Mais opções">
            <Icon icon={MoreHorizontal} />
          </button>
        )}
      />
      <CardFooter divided>
        <Button variant="ghost" size="small">Cancelar</Button>
        <Button size="small">Publicar</Button>
      </CardFooter>
    </Card>
  ),
};

export const Profile: Story = {
  render: () => (
    <Card variant="outlined" className="w-96">
      <CardHeader
        avatar={(
          <span className="inline-flex size-10 items-center justify-center rounded-full bg-brand-subtle text-brand">
            <Icon icon={User} />
          </span>
        )}
        title="Aldreí Miranda"
        description="Product Designer"
        action={<Badge badgeContent={3}><span className="size-1" /></Badge>}
      />
      <CardContent>
        Criando experiências digitais consistentes e acessíveis por meio de sistemas de design.
      </CardContent>
    </Card>
  ),
};

export const WithMedia: Story = {
  render: () => (
    <Card className="w-96">
      <CardMedia
        src="https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=900&q=80"
        alt="Mesa com materiais de design"
      />
      <CardHeader title="Processo de design" description="Organize decisões, padrões e aprendizados." />
      <CardFooter><Button size="small">Explorar</Button></CardFooter>
    </Card>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-5">
      <Card variant="elevated" className="w-64"><CardHeader title="Elevado" description="Usa sombra suave." /></Card>
      <Card variant="outlined" className="w-64"><CardHeader title="Contornado" description="Usa uma borda discreta." /></Card>
      <Card variant="filled" className="w-64"><CardHeader title="Preenchido" description="Usa superfície neutra." /></Card>
    </div>
  ),
};
