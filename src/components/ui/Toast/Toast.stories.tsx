import type { Meta, StoryObj } from '@storybook/react';
import Button from '../Button/Button';
import { ToastProvider, useToast } from './Toast';

const meta = {
  title: 'Library/Toast',
  component: ToastProvider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Notificação temporária para comunicar o resultado de ações sem interromper o fluxo da pessoa usuária.',
      },
    },
  },
  tags: ['autodocs'],
  args: { children: null },
  argTypes: {
    position: {
      control: 'select',
      options: ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'],
    },
  },
} satisfies Meta<typeof ToastProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

function ToastExamples() {
  const { toast, dismissAll } = useToast();
  return (
    <div className="flex flex-wrap justify-center gap-3">
      <Button variant="outlined" onClick={() => toast({ title: 'Informação atualizada', description: 'Os novos dados já estão disponíveis.', tone: 'info' })}>Informação</Button>
      <Button onClick={() => toast({ title: 'Alterações salvas', description: 'Seu trabalho foi salvo com sucesso.', tone: 'success' })}>Sucesso</Button>
      <Button variant="secondary" onClick={() => toast({ title: 'Atenção', description: 'Sua sessão expirará em cinco minutos.', tone: 'warning' })}>Aviso</Button>
      <Button variant="danger" onClick={() => toast({ title: 'Não foi possível salvar', description: 'Verifique sua conexão e tente novamente.', tone: 'danger' })}>Erro</Button>
      <Button variant="ghost" onClick={dismissAll}>Fechar todos</Button>
    </div>
  );
}

export const Default: Story = {
  render: () => <ToastProvider><ToastExamples /></ToastProvider>,
};

export const TopCenter: Story = {
  render: () => <ToastProvider position="top-center"><ToastExamples /></ToastProvider>,
};

export const PersistentWithAction: Story = {
  render: function PersistentToastStory() {
    return (
      <ToastProvider>
        <PersistentToastTrigger />
      </ToastProvider>
    );
  },
};

function PersistentToastTrigger() {
  const { toast } = useToast();
  return (
    <Button
      onClick={() => toast({
        title: 'Atualização disponível',
        description: 'Instale a nova versão quando estiver pronto.',
        duration: 0,
        action: <Button size="small" variant="ghost">Atualizar agora</Button>,
      })}
    >
      Mostrar Toast persistente
    </Button>
  );
}
