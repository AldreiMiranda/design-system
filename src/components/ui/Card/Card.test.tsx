import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Card, { CardContent, CardFooter, CardHeader, CardMedia } from './Card';

describe('Card', () => {
  it('renderiza sua estrutura composta', () => {
    render(
      <Card>
        <CardHeader title="Título do cartão" description="Descrição" />
        <CardContent>Conteúdo principal</CardContent>
        <CardFooter>Ações</CardFooter>
      </Card>,
    );
    expect(screen.getByRole('heading', { name: 'Título do cartão', level: 3 })).toBeInTheDocument();
    expect(screen.getByText('Conteúdo principal')).toBeInTheDocument();
    expect(screen.getByText('Ações')).toBeInTheDocument();
  });

  it('permite configurar o nível do título', () => {
    render(<CardHeader title="Seção" headingLevel="h2" />);
    expect(screen.getByRole('heading', { name: 'Seção', level: 2 })).toBeInTheDocument();
  });

  it('exige texto alternativo nativo para a mídia', () => {
    render(<CardMedia src="imagem.jpg" alt="Descrição da imagem" />);
    expect(screen.getByRole('img', { name: 'Descrição da imagem' })).toBeInTheDocument();
  });
});
