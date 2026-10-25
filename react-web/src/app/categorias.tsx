import { useEffect, useState } from 'react';
import {
  Categoria,
  listarCategorias,
  cadastrarCategoria,
  atualizarCategoria,
  excluirCategoria
} from '../scripts/script';

export default function Categorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const [id, setId] = useState(0);
  const [nome, setNome] = useState('');
  const [salvando, setSalvando] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [mensagem, setMensagem] = useState('');
  const [busca, setBusca] = useState('');

  const categoriasFiltradas = categorias.filter((categoria) =>
    categoria.nome.toLowerCase().includes(busca.trim().toLowerCase())
  );

  async function carregar() {
    setCarregando(true);
    try {
      setCategorias(await listarCategorias());
    } catch (erro) {
      alert(String(erro));
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  function limpar() {
    setId(0);
    setNome('');
  }

  function editar(categoria: Categoria) {
    setMensagem('');
    setId(categoria.id);
    setNome(categoria.nome);
    document.getElementById('formulario-categoria')?.scrollIntoView();
    document.getElementById('nome-categoria')?.focus({ preventScroll: true });
  }

  async function salvar(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!nome.trim()) {
      alert('Preencha o nome.');
      return;
    }

    setMensagem('');
    setSalvando(true);

    try {
      if (id === 0) {
        await cadastrarCategoria(nome.trim());
      } else {
        await atualizarCategoria(id, nome.trim());
      }

      limpar();
      setBusca('');
      setMensagem(id === 0 ? 'Categoria cadastrada com sucesso!' : 'Categoria atualizada com sucesso!');
      await carregar();
      document.getElementById('lista-categorias')?.scrollIntoView();
    } catch (erro) {
      alert(String(erro));
    } finally {
      setSalvando(false);
    }
  }

  async function excluir(categoria: Categoria) {
    if ((categoria.roupas?.length ?? 0) > 0) {
      alert('Exclua ou mova as roupas desta categoria primeiro.');
      return;
    }
    if (!confirm(`Excluir ${categoria.nome}?`)) return;

    setMensagem('');
    setSalvando(true);

    try {
      await excluirCategoria(categoria.id);

      if (id === categoria.id) {
        limpar();
      }

      setMensagem('Categoria excluída com sucesso!');
      await carregar();
    } catch (erro) {
      alert(String(erro));
    } finally {
      setSalvando(false);
    }
  }

  return (
    <>
      <h1>Categorias</h1>
      <div className="acoes">
        <a className="botao" href="#lista-categorias">Ver categorias cadastradas</a>
      </div>

      <section id="formulario-categoria">
        <h2>{id === 0 ? 'Cadastrar categoria' : 'Editar categoria'}</h2>

        <form onSubmit={salvar}>
          <label>
            Nome
            <input
              id="nome-categoria"
              value={nome}
              onChange={(event) => setNome(event.target.value)}
              required disabled={salvando}
            />
          </label>

          <div className="acoes">
            <button disabled={salvando || carregando}>
              {salvando ? 'Aguarde...' : id === 0 ? 'Cadastrar' : 'Salvar alterações'}
            </button>

            <button
              type="button"
              className="secundario"
              onClick={limpar}
              disabled={salvando}
            >
              Limpar / Cancelar
            </button>
          </div>
        </form>
      </section>

      <section id="lista-categorias" aria-busy={carregando}>
        <h2>Categorias cadastradas</h2>

        {mensagem && <p className="sucesso" role="status">{mensagem}</p>}
        <div className="acoes">
          <button onClick={carregar} disabled={salvando || carregando}>
            {carregando ? 'Carregando...' : 'Atualizar lista'}
          </button>
          <a className="botao secundario" href="#formulario-categoria">Voltar ao formulário</a>
        </div>
        <label>
          Buscar categoria pelo nome
          <input type="search" value={busca} onChange={(event) => setBusca(event.target.value)} />
        </label>

        <p>Para excluir uma categoria, exclua ou mova suas roupas primeiro.</p>

        {!carregando && <p>{categoriasFiltradas.length} categoria(s) encontrada(s).</p>}
        {!carregando && categoriasFiltradas.length === 0 && <p>Nenhuma categoria encontrada.</p>}

        <div className="tabela">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Roupas</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {categoriasFiltradas.map((categoria) => (
                <tr key={categoria.id}>
                  <td>{categoria.nome}</td>
                  <td>{categoria.roupas?.length ?? 0}</td>

                  <td>
                    <button onClick={() => editar(categoria)} disabled={salvando || carregando}>Editar</button>

                    <button
                      className="excluir"
                      onClick={() => excluir(categoria)}
                      disabled={salvando || carregando || (categoria.roupas?.length ?? 0) > 0}
                      title={(categoria.roupas?.length ?? 0) > 0 ? 'Esta categoria possui roupas.' : 'Excluir categoria'}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
