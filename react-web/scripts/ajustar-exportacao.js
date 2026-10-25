const fs = require('node:fs');
const path = require('node:path');

const site = path.join(__dirname, '..', 'site');

for (const pagina of ['roupas', 'categorias']) {
  const pasta = path.join(site, pagina);
  fs.mkdirSync(pasta, { recursive: true });
  fs.copyFileSync(path.join(site, `${pagina}.html`), path.join(pasta, 'index.html'));
}

console.log('Páginas preparadas para abrir e atualizar em servidores estáticos.');
