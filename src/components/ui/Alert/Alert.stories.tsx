import type { Meta, StoryObj } from '@storybook/react';
import { Bell } from 'lucide-react';
import Button from '../Button/Button';
import Alert from './Alert';

const meta = {
  title: 'Library/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Mensagem contextual para comunicar informações, confirmações, avisos e erros com semântica acessível.',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    title: 'Atualização disponível',
    children: 'Uma nova versão do sistema está pronta para ser instalada.',
    className: 'w-[440px]',
  },
  argTypes: {
    tone: { control: 'select', options: ['info', 'success', 'warning', 'danger', 'neutral'] },
    icon: { control: false },
    action: { control: false },
    onDismiss: { action: 'dismissed' },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Success: Story = {
  args: { tone: 'success', title: 'Alterações salvas', children: 'Suas preferências foram atualizadas.' },
};
export const Warning: Story = {
  args: { tone: 'warning', title: 'Atenção', children: 'Sua sessão expirará em cinco minutos.' },
};
export const Danger: Story = {
  args: { tone: 'danger', title: 'Não foi possível salvar', children: 'Revise os dados e tente novamente.' },
};
export const Neutral: Story = {
  args: { tone: 'neutral', title: 'Lembrete', children: 'Complete as informações do seu perfil.' },
};
export const CustomIcon: Story = { args: { icon: Bell } };
export const WithoutIcon: Story = { args: { icon: null } };
export const WithAction: Story = {
  args: {
    action: <Button variant="ghost" size="small">Ver atualização</Button>,
  },
};
export const Dismissible: Story = {};

export const Tones: Story = {
  render: () => (
    <div className="flex w-[480px] flex-col gap-4">
      <Alert tone="info" title="Informação">Há novidades disponíveis.</Alert>
      <Alert tone="success" title="Sucesso">A operação foi concluída.</Alert>
      <Alert tone="warning" title="Atenção">Verifique os dados informados.</Alert>
      <Alert tone="danger" title="Erro">Não foi possível concluir a operação.</Alert>
      <Alert tone="neutral" title="Nota">Esta é uma mensagem neutra.</Alert>
    </div>
  ),
};
