const url = "http://localhost:3002";

export type Tamanho = "PP" | "P" | "M" | "G" | "GG" | "XG";

export interface Categoria {
  id: number;
  nome: string;
  roupas?: Roupa[];
}

export interface CategoriaRoupa {
  nome: string;
  tamanho: Tamanho;
  cor: string;
  preco: number;
  quantidade: number;
  categoriaId: number;
}

export interface Roupa extends CategoriaRoupa {
  id: number;
  categoria?: Categoria;
}

export async function listarRoupas(): Promise<Roupa[]> {
  const response = await fetch(`${url}/roupas/listar`);

  if (!response.ok) {
    throw new Error("Erro ao buscar roupas");
  }

  return response.json();
}

export async function cadastrarRoupa(dados: CategoriaRoupa): Promise<Roupa> {
  const response = await fetch(`${url}/roupas/cadastrar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });

  if (!response.ok) {
    throw new Error("Erro ao cadastrar roupa");
  }

  return response.json();
}

export async function atualizarRoupa(id: number, dados: CategoriaRoupa): Promise<Roupa> {
  const response = await fetch(`${url}/roupas/atualizar/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });

  if (!response.ok) {
    throw new Error("Erro ao atualizar roupa");
  }

  return response.json();
}

export async function excluirRoupa(id: number): Promise<Roupa> {
  const response = await fetch(`${url}/roupas/excluir/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Erro ao excluir roupa");
  }

  return response.json();
}

export async function listarCategorias(): Promise<Categoria[]> {
  const response = await fetch(`${url}/categorias/listar`);

  if (!response.ok) {
    throw new Error("Erro ao buscar categorias");
  }

  return response.json();
}

export async function cadastrarCategoria(nome: string): Promise<Categoria> {
  const response = await fetch(`${url}/categorias/cadastrar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome }),
  });

  if (!response.ok) {
    throw new Error("Erro ao cadastrar categoria. Verifique se o nome já existe.");
  }

  return response.json();
}

export async function atualizarCategoria(id: number, nome: string): Promise<Categoria> {
  const response = await fetch(`${url}/categorias/atualizar/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome }),
  });

  if (!response.ok) {
    throw new Error("Erro ao atualizar categoria. Verifique se o nome já existe.");
  }

  return response.json();
}

export async function excluirCategoria(id: number): Promise<Categoria> {
  const response = await fetch(`${url}/categorias/excluir/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Erro ao excluir categoria. Verifique se ela possui roupas.");
  }

  return response.json();
}
