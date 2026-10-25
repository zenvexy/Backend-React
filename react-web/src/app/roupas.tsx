import { useEffect, useState } from 'react';
import {
  Categoria,
  Roupa,
  Tamanho,
  listarRoupas,
  listarCategorias,
  cadastrarRoupa,
  atualizarRoupa,
  excluirRoupa
} from '../scripts/script';

export default function Roupas() {
  const [roupas, setRoupas] = useState<Roupa[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const [id, setId] = useState(0);
  const [nome, setNome] = useState('');
  const [tamanho, setTamanho] = useState<Tamanho>('M');
  const [cor, setCor] = useState('');
  const [preco, setPreco] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [categoriaId, setCategoriaId] = useState('');

  const [salvando, setSalvando] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [mensagem, setMensagem] = useState('');
  const [busca, setBusca] = useState('');

  const roupasFiltradas = roupas.filter((roupa) =>
    roupa.nome.toLowerCase().includes(busca.trim().toLowerCase())
  );

  async function carregar() {
    setCarregando(true);
    try {
      const listaRoupas = await listarRoupas();
      const listaCategorias = await listarCategorias();
      setRoupas(listaRoupas);
      setCategorias(listaCategorias);
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
    setTamanho('M');
    setCor('');
    setPreco('');
    setQuantidade('');
    setCategoriaId('');
  }

  function editar(roupa: Roupa) {
    setMensagem('');
    setId(roupa.id);
    setNome(roupa.nome);
    setTamanho(roupa.tamanho);
    setCor(roupa.cor);
    setPreco(String(roupa.preco));
    setQuantidade(String(roupa.quantidade));
    setCategoriaId(String(roupa.categoriaId));
    document.getElementById('formulario-roupa')?.scrollIntoView();
    document.getElementById('nome-roupa')?.focus({ preventScroll: true });
  }

  async function salvar(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!nome.trim() || !cor.trim()) {
      alert('Preencha o nome e a cor.');
      return;
    }

    const dados = {
      nome: nome.trim(),
      tamanho,
      cor: cor.trim(),
      preco: Number(preco),
      quantidade: Number(quantidade),
      categoriaId: Number(categoriaId)
    };

    if (!Number.isFinite(dados.preco) || dados.preco < 0 ||
        !Number.isInteger(dados.quantidade) || dados.quantidade < 0) {
      alert('Informe um preço válido e uma quantidade inteira, sem valores negativos.');
      return;
    }
    if (!categorias.some((categoria) => categoria.id === dados.categoriaId)) {
      alert('Selecione uma categoria da lista.');
      return;
    }

    setMensagem('');
    setSalvando(true);

    try {
      if (id === 0) {
        await cadastrarRoupa(dados);
      } else {
        await atualizarRoupa(id, dados);
      }

      limpar();
      setBusca('');
      setMensagem(id === 0 ? 'Roupa cadastrada com sucesso!' : 'Roupa atualizada com sucesso!');
      await carregar();
      document.getElementById('lista-roupas')?.scrollIntoView();
    } catch (erro) {
      alert(String(erro));
    } finally {
      setSalvando(false);
    }
  }

  async function excluir(roupa: Roupa) {
    if (!confirm(`Excluir ${roupa.nome}?`)) return;

    setMensagem('');
    setSalvando(true);

    try {
      await excluirRoupa(roupa.id);

      if (id === roupa.id) {
        limpar();
      }

      setMensagem('Roupa excluída com sucesso!');
      await carregar();
    } catch (erro) {
      alert(String(erro));
    } finally {
      setSalvando(false);
    }
  }

  return (
    <>
      <h1>Roupas</h1>
      <div className="acoes">
        <a className="botao" href="#lista-roupas">Ver roupas cadastradas</a>
      </div>

      <section id="formulario-roupa">
        <h2>{id === 0 ? 'Cadastrar roupa' : 'Editar roupa'}</h2>

        <form onSubmit={salvar}>
          <label>
            Nome
            <input
              id="nome-roupa"
              value={nome}
              onChange={(event) => setNome(event.target.value)}
              required disabled={salvando}
            />
          </label>

          <label>
            Tamanho
            <select
              value={tamanho}
              onChange={(event) => setTamanho(event.target.value as Tamanho)}
              disabled={salvando}
            >
              {['PP', 'P', 'M', 'G', 'GG', 'XG'].map((valor) => (
                <option key={valor} value={valor}>{valor}</option>
              ))}
            </select>
          </label>

          <label>
            Cor
            <input
              value={cor}
              onChange={(event) => setCor(event.target.value)}
              required disabled={salvando}
            />
          </label>

          <label>
            Preço (R$)
            <input
              type="number" min="0" step="0.01"
              value={preco}
              onChange={(event) => setPreco(event.target.value)}
              required disabled={salvando}
            />
          </label>

          <label>
            Quantidade
            <input
              type="number" min="0" step="1"
              value={quantidade}
              onChange={(event) => setQuantidade(event.target.value)}
              required disabled={salvando}
            />
          </label>

          <label>
            Categoria
            <select
              value={categoriaId}
              onChange={(event) => setCategoriaId(event.target.value)}
              required disabled={salvando}
            >
              <option value="">Selecione</option>

              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
              ))}
            </select>
          </label>

          {!carregando && categorias.length === 0 && (
            <p>Cadastre uma categoria primeiro usando o menu Categorias.</p>
          )}

          <div className="acoes">
            <button disabled={salvando || carregando || categorias.length === 0}>
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

      <section id="lista-roupas" aria-busy={carregando}>
        <h2>Roupas cadastradas</h2>

        {mensagem && <p className="sucesso" role="status">{mensagem}</p>}
        <div className="acoes">
          <button onClick={carregar} disabled={salvando || carregando}>
            {carregando ? 'Carregando...' : 'Atualizar lista'}
          </button>
          <a className="botao secundario" href="#formulario-roupa">Voltar ao formulário</a>
        </div>
        <label>
          Buscar roupa pelo nome
          <input type="search" value={busca} onChange={(event) => setBusca(event.target.value)} />
        </label>

        {!carregando && <p>{roupasFiltradas.length} roupa(s) encontrada(s).</p>}
        {!carregando && roupasFiltradas.length === 0 && <p>Nenhuma roupa encontrada.</p>}

        <div className="tabela">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Tamanho</th>
                <th>Cor</th>
                <th>Preço</th>
                <th>Quantidade</th>
                <th>Categoria</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {roupasFiltradas.map((roupa) => (
                <tr key={roupa.id}>
                  <td>{roupa.nome}</td>
                  <td>{roupa.tamanho}</td>
                  <td>{roupa.cor}</td>
                  <td>R$ {roupa.preco.toFixed(2)}</td>
                  <td>{roupa.quantidade}</td>
                  <td>{roupa.categoria?.nome}</td>

                  <td>
                    <button onClick={() => editar(roupa)} disabled={salvando || carregando}>Editar</button>

                    <button
                      className="excluir"
                      onClick={() => excluir(roupa)}
                      disabled={salvando || carregando}
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
