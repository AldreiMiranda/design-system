# Design System

Biblioteca inicial de componentes React com TypeScript, Tailwind CSS, CVA e Storybook. O projeto prioriza APIs pequenas, tokens semânticos e acessibilidade nativa.

A tipografia padrão é Roboto Variable, distribuída localmente com o pacote e configurada pelo token `--ds-font-family-sans`.

## Desenvolvimento

Requer Node.js 20 ou superior.

```bash
npm install
npm run dev
```

Use o Storybook como catálogo e ambiente principal de desenvolvimento:

```bash
npm run storybook
```

## Qualidade

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run build-storybook
```

O build de produção gera módulos ES e CommonJS, tipos TypeScript e a folha de estilos em `dist/`.

## Uso da biblioteca

```tsx
import { Button, TextField } from '@aldreimiranda/design-system';
import '@aldreimiranda/design-system/styles.css';

export function Formulario() {
  return (
    <form>
      <TextField label="E-mail" type="email" />
      <Button type="submit">Continuar</Button>
    </form>
  );
}
```

Os estilos principais não aplicam reset global. Se o produto ainda não possuir um reset, ele pode ser importado separadamente:

```tsx
import '@aldreimiranda/design-system/reset.css';
```

Para consumir apenas as propriedades CSS sem os componentes, use `@aldreimiranda/design-system/tokens.css`.

O pacote está marcado como privado durante a fase inicial. Antes de publicar, revise o nome do escopo, a licença e a política de versionamento.

## Arquitetura

- `src/components/ui`: componentes, variantes, stories e testes.
- `src/global.css`: tokens semânticos globais e estilos necessários pela biblioteca.
- `src/index.ts`: API pública. Um componente só é público quando exportado aqui.
- `src/App.tsx`: playground local; não faz parte do pacote publicado.

### Tokens

Os tokens usam propriedades CSS prefixadas com `--ds-`, e o Tailwind fornece nomes semânticos como `brand`, `surface`, `content` e `outline`. Componentes devem evitar cores literais para que temas futuros possam substituir os valores sem alterar suas APIs.

### Criando um componente

1. Crie uma pasta em `src/components/ui`.
2. Use elementos HTML nativos sempre que possível.
3. Encaminhe `ref` e os atributos nativos do elemento.
4. Descreva variantes com CVA e tokens semânticos.
5. Adicione stories de estados e pelo menos um teste de comportamento.
6. Exporte componente e tipos em `src/index.ts`.

## Acessibilidade

- `Button` desabilita interações durante carregamento e expõe `aria-busy`.
- `TextField` e `Select` associam label, descrição e mensagem de erro.
- `Select` preserva teclado, foco e comportamento do elemento nativo.
- `Icon` é decorativo por padrão; informe `label` quando ele transmitir significado.
- `Typography` permite separar a variante visual da tag semântica por meio de `as`.
