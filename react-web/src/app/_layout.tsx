import { Link, Slot } from 'expo-router';
import '../styles/global.css';

export default function RootLayout() {
  return (
    <div className="pagina">
      <header>
        <strong>Clothing Store Fullstack</strong>
        <nav aria-label="Menu principal">
          <Link href="/">Home</Link>
          <Link href="/roupas">Roupas</Link>
          <Link href="/categorias">Categorias</Link>
        </nav>
      </header>
      <main>
        <Slot />
      </main>
    </div>
  );
}
