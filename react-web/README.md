# Clothing Store React Native

Frontend web em React e Expo Router para gerenciar roupas e categorias. O código-fonte fica em `src/`; a versão HTML gerada para publicação fica em `site/`.

**[Acessar o site publicado no GitHub Pages](https://zenvexy.github.io/Backend-React/)**

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

Para executar o projeto localmente, são necessários Node.js, npm e um navegador. As versões das dependências estão no [`package.json`](package.json) e são instaladas com `npm install`.

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

Os exemplos abaixo mostram os campos do [`app.json`](app.json) usados em cada ambiente. As demais configurações do arquivo devem ser preservadas.

### Desenvolvimento React (.tsx)

Para desenvolver com o Expo, execute dentro de `react-web`:

```cmd
npm run web
```

O desenvolvimento pelo Expo funciona com o mesmo `output` usado na exportação HTML:

```json
{
  "expo": {
    "web": {
      "output": "static"
    }
  }
}
```

O comando `npm run web` executa o código de `src/` com atualização durante o desenvolvimento. O `output` pode permanecer como `"static"`, e o `baseUrl` da publicação não precisa ser alterado nesse modo.

### HTML em servidor local

Para testar a exportação HTML em um servidor local que publica a raiz do repositório, a configuração é:

```json
{
  "expo": {
    "web": {
      "output": "static"
    },
    "experiments": {
      "baseUrl": "/react-web/site"
    }
  }
}
```

Após essa alteração, `npm run build:web` gera a versão local em `site/`. As instruções de acesso estão na próxima seção.

### HTML publicado no GitHub Pages

A versão publicada usa `"static"` e o caminho completo do site dentro do repositório:

```json
{
  "expo": {
    "web": {
      "output": "static"
    },
    "experiments": {
      "baseUrl": "/Backend-React/react-web/site"
    }
  }
}
```

Essa é a configuração atual do projeto. Atualizações da versão publicada devem ser geradas com `npm run build:web` antes de enviar os arquivos ao GitHub.

O `output` define como o site será exportado: `"static"` gera HTML; `"server"` exige um servidor de renderização. O `baseUrl` ajusta os caminhos dos links, CSS e JavaScript. Alterações nesses campos exigem uma nova exportação.

## Gerar e testar a versão HTML

Dentro de `react-web`, execute:

```cmd
npm run build:web
```

Esse comando exporta o projeto para `site/` e executa `scripts/ajustar-exportacao.js`. Além de `roupas.html` e `categorias.html`, ele prepara `roupas/index.html` e `categorias/index.html` para permitir acesso direto e atualização das páginas em servidores estáticos.

As alterações devem ser feitas nos arquivos de `src/`. Mudanças no código, no CSS, no `app.json` ou na URL da API exigem uma nova execução de `npm run build:web`. Os arquivos de `site/` são substituídos durante a exportação.

Para testar o HTML por um servidor local, altere temporariamente o `baseUrl` para `/react-web/site` e execute `npm run build:web`. Depois, abra um terminal **na raiz do repositório**:

```cmd
npx serve . -l 8080
```

Acesse `http://localhost:8080/`. O [`index.html` da raiz](../index.html) encaminha para `./react-web/site/`. Também é possível usar o Live Server, servindo a mesma raiz. Abrir o arquivo com dois cliques (`file://`) não substitui o servidor HTTP.

Para atualizar a versão publicada após um teste HTML local, o `baseUrl` deve voltar para `/Backend-React/react-web/site` antes de executar `npm run build:web`. O desenvolvimento com `npm run web` dispensa essa troca de configuração.

## Conexão com a API

A URL fica em [`src/scripts/script.ts`](src/scripts/script.ts):

```ts
const url = "http://localhost:3002";
```

A versão atual do frontend usa esse endereço local. Os cadastros dependem da API em execução, conforme as instruções do [README da raiz](../README.md).

O site publicado no Pages hospeda apenas o frontend. Para disponibilizar o CRUD aos visitantes, a URL deve apontar para uma API pública em HTTPS, seguida de uma nova exportação. `localhost` aponta para o computador de quem abre a página.

## Publicação e atualizações

A hospedagem está disponível em [zenvexy.github.io/Backend-React](https://zenvexy.github.io/Backend-React/). O Pages publica a branch `main`, pela pasta `/(root)`, e o `index.html` da raiz redireciona para `react-web/site/`.

Para atualizar o site:

1. Mantenha o `baseUrl` de publicação: `/Backend-React/react-web/site`.
2. Execute `npm run build:web` dentro de `react-web`.
3. Envie o código alterado e toda a pasta `site/` para a branch `main`.

O `index.html` da raiz e o arquivo `.nojekyll` devem permanecer no repositório. O `.nojekyll` evita o processamento do Jekyll e preserva pastas como `_expo`, que contém os arquivos de estilo e JavaScript.

## Comandos rápidos

| Comando | Onde executar | Finalidade |
| --- | --- | --- |
| `npm install` | `react-web` | Instalar as dependências. |
| `npm run web` | `react-web` | Desenvolver os arquivos `.tsx` no navegador. |
| `npx tsc --noEmit` | `react-web` | Verificar os tipos. |
| `npm run build:web` | `react-web` | Gerar o HTML e ajustar as rotas para atualização direta. |
| `npx serve . -l 8080` | Raiz do repositório | Conferir o HTML exportado com o `baseUrl` local. |
