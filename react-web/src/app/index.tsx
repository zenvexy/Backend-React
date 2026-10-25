import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <section>
      <h1>Bem-vindo à loja de roupas</h1>
      <p>Cadastre e organize as roupas e categorias da sua loja.</p>
      <p>Comece cadastrando uma categoria. Depois, cadastre as roupas dessa categoria.</p>
      <div className="acoes">
        <Link href="/roupas" className="botao">Gerenciar roupas</Link>
        <Link href="/categorias" className="botao">Gerenciar categorias</Link>
      </div>
    </section>
  );
}
