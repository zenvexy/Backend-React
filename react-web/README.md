# Clothing Store React Native

Frontend web em React e Expo Router para gerenciar roupas e categorias. O código-fonte fica em `src/`; a versão HTML gerada para publicação fica em `site/`.

## Screenshots

### Home
![Home](/_assets/screenshot1.png)

### Roupas
![Roupas](/_assets/screenshot2.png)

### Categorias
![Categorias](/_assets/screenshot3.png)

## Páginas e funcionalidades

| Página | Arquivo | Funcionalidades |
| --- | --- | --- |
| Home | `src/app/index.tsx` | Apresentação e links para os cadastros. |
| Roupas | `src/app/roupas.tsx` | Cadastrar, listar, buscar por nome, editar e excluir roupas. |
| Categorias | `src/app/categorias.tsx` | Cadastrar, listar, buscar por nome, editar, excluir e contar roupas por categoria. |

As páginas têm atalhos entre formulário e lista, foco no campo ao editar e mensagens de carregamento e sucesso. O botão **Limpar / Cancelar** limpa os campos e encerra a edição.

Cadastre uma categoria antes de cadastrar roupas. Cada roupa tem nome, tamanho, cor, preço, quantidade e categoria. Uma categoria com roupas só pode ser excluída depois de excluir ou mover essas roupas.

## Requisitos e dependências

Tenha Node.js, npm e um navegador instalados. As versões das dependências estão no [`package.json`](package.json) e são instaladas com `npm install`.

| Dependências principais | Uso |
| --- | --- |
| `react` e `react-dom` | Componentes e renderização no navegador. |
| `expo` e `expo-router` | Servidor de desenvolvimento, rotas e exportação web. |
| `react-native` e `react-native-web` | Base de renderização usada pelo Expo. |
| `typescript` e `@types/react` | Tipos dos arquivos `.ts` e `.tsx`. |
| `eslint` e `eslint-config-expo` | Análise do código. |

As chamadas à API usam o `fetch` do navegador, sem dependência adicional.

## Instalar e desenvolver com .tsx

A partir da raiz do repositório:

```cmd
cd react-web
npm install
npm run web
```

Abra o endereço informado pelo Expo. Mantenha o terminal aberto e edite os arquivos de `src/`: as alterações aparecem durante o desenvolvimento.

Para verificar os tipos, execute dentro de `react-web`:

```cmd
npx tsc --noEmit
```

## Estrutura dos arquivos

```text
react-web/
  app.json                       Configuração do Expo e da exportação
  package.json                   Dependências e comandos
  scripts/ajustar-exportacao.js   Ajuste das páginas HTML para servidores estáticos
  site/                          Arquivos gerados para publicação
  src/
    app/
      _layout.tsx                Menu compartilhado e área de rolagem
      index.tsx                  Home
      roupas.tsx                 CRUD de roupas
      categorias.tsx             CRUD de categorias
    scripts/script.ts            Tipos dos dados e chamadas fetch
    styles/global.css            Estilos das páginas
    styles/module_css.ts         Declaração para importar CSS no TypeScript
```

As páginas usam `useState` para os campos e listas, e `useEffect` para carregar os dados ao abrir. As operações da API ficam centralizadas em `src/scripts/script.ts`.

## Configurar o app.json

Estas são as partes relevantes do [`app.json`](app.json); mantenha as demais configurações do arquivo:

```json
{
  "expo": {
    "web": {
      "output": "static"
    },
    "experiments": {
      "baseUrl": "/Backend-React/react-web/site",
      "typedRoutes": true,
      "reactCompiler": true
    }
  }
}
```

`output: "static"` gera arquivos HTML. O `baseUrl` define o caminho dos links, CSS e JavaScript na versão exportada:

| Ambiente | `baseUrl` |
| --- | --- |
| Servidor local publicando a raiz deste repositório | `/react-web/site` |
| GitHub Pages, publicando a raiz de `Backend-React` | `/Backend-React/react-web/site` |
| Conteúdo de `site/` na raiz de um domínio | `""` |

O projeto está configurado para o GitHub Pages. O nome `/Backend-React` precisa fazer parte dos caminhos publicados; sem ele, o CSS, o JavaScript e as outras páginas não são encontrados. Depois de alterar o `baseUrl`, gere novamente o HTML. Para desenvolver os `.tsx` localmente, continue usando `npm run web`.

## Gerar e testar a versão HTML

Dentro de `react-web`, execute:

```cmd
npm run build:web
```

Esse comando exporta o projeto para `site/` e executa `scripts/ajustar-exportacao.js`. Além de `roupas.html` e `categorias.html`, ele prepara `roupas/index.html` e `categorias/index.html`, permitindo atualizar essas URLs sem o erro `Cannot GET` em servidores estáticos comuns.

Edite sempre os arquivos de `src/`. Depois de alterar o código, o CSS, o `app.json` ou a URL da API, execute `npm run build:web` novamente. Não edite os arquivos gerados: a próxima exportação os substitui.

Para testar o HTML por um servidor local, altere temporariamente o `baseUrl` para `/react-web/site` e execute `npm run build:web`. Depois, abra um terminal **na raiz do repositório**:

```cmd
npx serve . -l 8080
```

Acesse `http://localhost:8080/`. O [`index.html` da raiz](../index.html) encaminha para `./react-web/site/`. Também é possível usar o Live Server, servindo a mesma raiz. Abrir o arquivo com dois cliques (`file://`) não substitui o servidor HTTP.

Antes de enviar a versão ao Pages, restaure `/Backend-React/react-web/site` e execute `npm run build:web` novamente. Se estiver apenas desenvolvendo, prefira `npm run web`, sem alterar o `baseUrl`.

## Conexão com a API

A URL fica em [`src/scripts/script.ts`](src/scripts/script.ts):

```ts
const url = "http://localhost:3002";
```

Mantenha a API ligada para usar os cadastros. As instruções do backend ficam no [README da raiz](../README.md).

Para publicação, use a URL de uma API pública em HTTPS e gere o site novamente. O Pages hospeda apenas o frontend; `localhost` aponta para o computador de quem abre a página.

## Publicar no GitHub Pages

Para publicar este repositório pela raiz, sem domínio próprio:

1. Confira se o `baseUrl` no `app.json` é `/Backend-React/react-web/site`, como já está configurado.
2. No `script.ts`, configure a URL pública da API para disponibilizar o CRUD aos visitantes.
3. Execute `npm run build:web` dentro de `react-web`.
4. Envie os arquivos atualizados, incluindo toda a pasta `site/`, o `index.html` da raiz e `.nojekyll`.
5. Em **Settings > Pages**, escolha **Deploy from a branch**, a branch desejada e a pasta **/(root)**.

O endereço esperado é `https://zenvexy.github.io/Backend-React/`, que redireciona para o site exportado. O `.nojekyll` evita o processamento do Jekyll e preserva pastas como `_expo`.

Para voltar a testar o HTML pelo servidor local, restaure o `baseUrl` para `/react-web/site` e execute `npm run build:web`. O comando `npm run web` continua sendo usado para desenvolver.

## Comandos rápidos

| Comando | Onde executar | Finalidade |
| --- | --- | --- |
| `npm install` | `react-web` | Instalar as dependências. |
| `npm run web` | `react-web` | Desenvolver os arquivos `.tsx` no navegador. |
| `npx tsc --noEmit` | `react-web` | Verificar os tipos. |
| `npm run build:web` | `react-web` | Gerar o HTML e ajustar as rotas para atualização direta. |
| `npx serve . -l 8080` | Raiz do repositório | Conferir o HTML exportado com o `baseUrl` local. |
