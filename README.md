# Clothing Store

Backend REST desenvolvido com Node.js, Express, Prisma e MySQL/MariaDB. A API permite cadastrar e consultar categorias e roupas, e oferece documentação interativa com Swagger UI.

## Frontend web em React

O frontend está na pasta [`react-web`](./react-web/), em um projeto React com Expo Router para o navegador. Ele contém uma home e páginas para cadastrar, listar, editar e excluir roupas e categorias, consumindo esta API.

Para conhecer a estrutura do frontend, ver os comandos para iniciá-lo e as orientações de integração com a API, consulte o [README do react-web](./react-web/README.md).

## Requisitos

- Node.js e npm instalados.
- Um servidor MySQL ou MariaDB em execução.
- Um banco de dados criado para a aplicação.

## Preparar o ambiente

Abra um terminal na raiz do projeto e entre na pasta do backend:

```cmd
cd .\api
```

Instale as dependências:

```cmd
npm install
```

Crie ou edite o arquivo `api/.env` com os dados do seu banco. Não compartilhe nem envie esse arquivo para o Git se ele contiver credenciais.

```env
PORT=3002
DATABASE_URL="mysql://root@localhost:3306/clothing_store"
```

O schema atual usa MySQL e o adaptador MariaDB do Prisma. O banco indicado na URL precisa existir antes de continuar.

## Criar as tabelas

Na pasta `api`, gere o cliente Prisma e sincronize as tabelas com o schema:

```cmd
npx prisma generate
npx prisma db push
```

O schema fica em `api/prisma/schema.prisma`. Ele define:

- **Categoria**: `id`, `nome` (único) e a relação com roupas.
- **Roupa**: `id`, `nome`, `tamanho`, `cor`, `preco`, `quantidade` e `categoriaId`.
- **Tamanho**: `PP`, `P`, `M`, `G`, `GG` ou `XG`.

## Iniciar o servidor

Ainda na pasta `api`, execute:

```cmd
npm run dev
```

Mantenha esse terminal aberto enquanto usa a API. Com a configuração padrão, o servidor estará em `http://localhost:3002`. Se alterar `PORT` no `.env`, use a porta configurada.

## Swagger: testar as requisições

Com o servidor em execução, abra no navegador:

**http://localhost:3002/api-docs/**

No Swagger UI, expanda uma operação, clique em **Try it out**, informe os dados necessários e clique em **Execute**. Por exemplo, cadastre uma categoria antes de cadastrar roupas, pois cada roupa precisa apontar para um `categoriaId` existente.

## Rotas disponíveis

A base da API é `http://localhost:3002`. As rotas estão agrupadas em **Roupas** e **Categorias**.

### Categorias

| Método | Caminho | O que faz | Corpo JSON |
| --- | --- | --- | --- |
| `GET` | `/categorias/listar` | Lista as categorias e as roupas relacionadas a cada uma. | — |
| `POST` | `/categorias/cadastrar` | Cria uma categoria. | `{"nome":"Camisetas"}` |
| `PUT` | `/categorias/atualizar/:id` | Atualiza o nome da categoria indicada pelo ID. | `{"nome":"Camisetas básicas"}` |
| `DELETE` | `/categorias/excluir/:id` | Exclui a categoria indicada pelo ID. | — |

### Roupas

| Método | Caminho | O que faz | Corpo JSON |
| --- | --- | --- | --- |
| `GET` | `/roupas/listar` | Lista as roupas com os dados da categoria relacionada. | — |
| `POST` | `/roupas/cadastrar` | Cria uma roupa associada a uma categoria existente. | Exemplo abaixo |
| `PUT` | `/roupas/atualizar/:id` | Atualiza os dados da roupa indicada pelo ID. | Exemplo abaixo |
| `DELETE` | `/roupas/excluir/:id` | Exclui a roupa indicada pelo ID. | — |

Exemplo de corpo JSON para cadastrar ou atualizar uma roupa:

```json
{
  "nome": "Camiseta básica",
  "tamanho": "M",
  "cor": "Azul",
  "preco": 59.9,
  "quantidade": 10,
  "categoriaId": 1
}
```

O campo `tamanho` deve ser um dos valores definidos no enum (`PP`, `P`, `M`, `G`, `GG`, `XG`). Use um `categoriaId` existente; consulte `GET /categorias/listar` para verificar os IDs.

Os caminhos de atualização e exclusão usam o ID no lugar de `:id`. Por exemplo: `PUT /roupas/atualizar/1` ou `DELETE /categorias/excluir/2`.

## Popular com dados de teste (seed)

O seed está em `api/prisma/seed.js`. Ele cadastra **5 categorias e 10 roupas** de exemplo. Para executá-lo, rode na pasta `api`:

```cmd
npm run seed
```

Ou:

```cmd
npx prisma db seed
```

**Atenção:** antes de inserir os exemplos, o seed apaga todas as roupas e categorias existentes no banco configurado. Execute-o somente se puder substituir esses dados.

## Comandos úteis

Execute os comandos a partir da pasta `api`:

| Comando | Finalidade |
| --- | --- |
| `npm install` | Instala as dependências do backend. |
| `npx prisma generate` | Gera o cliente Prisma a partir do schema. |
| `npx prisma db push` | Sincroniza as tabelas do banco com o schema atual. |
| `npm run dev` | Inicia o servidor em modo de desenvolvimento, com reinicialização ao alterar arquivos. |
| `npm run seed` | Apaga as roupas e categorias existentes e insere os dados de exemplo. |
