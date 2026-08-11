import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Button from '../Button/Button';
import Switch from '../Switch/Switch';
import Textarea from '../Textarea/Textarea';
import TextField from '../TextField/TextField';
import Dialog, {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './Dialog';

const meta = {
  title: 'Library/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Janela modal nativa para tarefas que exigem atenção, confirmação ou entrada de dados sem perder o contexto da página.',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    open: false,
    onOpenChange: () => undefined,
    children: null,
  },
  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'large', 'full'] },
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

function ProfileDialog() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Abrir diálogo</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogHeader>
          <DialogTitle>Editar perfil</DialogTitle>
          <DialogDescription>Atualize as informações públicas da sua conta.</DialogDescription>
        </DialogHeader>
        <DialogContent className="flex flex-col gap-4">
          <TextField label="Nome" defaultValue="Aldreí Miranda" />
          <TextField label="Cargo" defaultValue="Product Designer" />
        </DialogContent>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={() => setOpen(false)}>Salvar alterações</Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export const Default: Story = { render: () => <ProfileDialog /> };

export const Small: Story = {
  render: function NotificationSettingsDialog() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="outlined" onClick={() => setOpen(true)}>Configurar notificações</Button>
        <Dialog open={open} onOpenChange={setOpen} size="small">
          <DialogHeader>
            <DialogTitle>Notificações</DialogTitle>
            <DialogDescription>Escolha quais atualizações você deseja receber.</DialogDescription>
          </DialogHeader>
          <DialogContent className="flex flex-col gap-5">
            <Switch label="Novos comentários" description="Avisos sobre comentários no seu trabalho." defaultChecked />
            <Switch label="Resumo semanal" description="Um resumo enviado toda segunda-feira." />
            <Switch label="Atualizações do produto" description="Novidades e melhorias importantes." defaultChecked />
          </DialogContent>
          <DialogFooter>
            <Button onClick={() => setOpen(false)}>Concluir</Button>
          </DialogFooter>
        </Dialog>
      </>
    );
  },
};

export const Large: Story = {
  render: function NewProjectDialog() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Criar projeto</Button>
        <Dialog open={open} onOpenChange={setOpen} size="large">
          <DialogHeader>
            <DialogTitle>Novo projeto</DialogTitle>
            <DialogDescription>Defina as informações iniciais para organizar o trabalho da equipe.</DialogDescription>
          </DialogHeader>
          <DialogContent className="grid gap-4 sm:grid-cols-2">
            <TextField label="Nome do projeto" placeholder="Ex.: Aplicativo mobile" required />
            <TextField label="Responsável" placeholder="Nome da pessoa responsável" />
            <Textarea
              label="Descrição"
              placeholder="Descreva objetivos, contexto e entregas esperadas..."
              showCharacterCount
              maxLength={300}
              resize="none"
              containerClassName="sm:col-span-2"
            />
          </DialogContent>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button onClick={() => setOpen(false)}>Criar projeto</Button>
          </DialogFooter>
        </Dialog>
      </>
    );
  },
};

export const Confirmation: Story = {
  render: function ConfirmationDialog() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="danger" onClick={() => setOpen(true)}>Excluir projeto</Button>
        <Dialog open={open} onOpenChange={setOpen} size="small">
          <DialogHeader>
            <DialogTitle>Excluir projeto?</DialogTitle>
            <DialogDescription>Essa ação é permanente e não poderá ser desfeita.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button variant="danger" onClick={() => setOpen(false)}>Excluir</Button>
          </DialogFooter>
        </Dialog>
      </>
    );
  },
};
