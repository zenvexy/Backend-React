const prisma = require('../src/data/prisma')

async function main() {
    await prisma.$transaction(async (transaction) => {
        await transaction.roupa.deleteMany()
        await transaction.categoria.deleteMany()

        const categorias = await Promise.all([
            transaction.categoria.create({ data: { nome: 'Camisetas' } }),
            transaction.categoria.create({ data: { nome: 'Calças' } }),
            transaction.categoria.create({ data: { nome: 'Vestidos' } }),
            transaction.categoria.create({ data: { nome: 'Jaquetas' } }),
            transaction.categoria.create({ data: { nome: 'Moletons' } })
        ])
        console.log('Categorias de teste cadastradas.')

        await Promise.all([
            transaction.roupa.create({
                data: {
                    nome: 'Camiseta básica de algodão',
                    tamanho: 'M',
                    cor: 'Branca',
                    preco: 49.90,
                    quantidade: 25,
                    categoriaId: categorias[0].id
                }
            }),
            transaction.roupa.create({
                data: {
                    nome: 'Camiseta estampada',
                    tamanho: 'G',
                    cor: 'Preta',
                    preco: 69.90,
                    quantidade: 18,
                    categoriaId: categorias[0].id
                }
            }),
            transaction.roupa.create({
                data: {
                    nome: 'Calça jeans reta',
                    tamanho: 'M',
                    cor: 'Azul',
                    preco: 159.90,
                    quantidade: 12,
                    categoriaId: categorias[1].id
                }
            }),
            transaction.roupa.create({
                data: {
                    nome: 'Calça de sarja slim',
                    tamanho: 'G',
                    cor: 'Bege',
                    preco: 139.90,
                    quantidade: 10,
                    categoriaId: categorias[1].id
                }
            }),
            transaction.roupa.create({
                data: {
                    nome: 'Vestido midi floral',
                    tamanho: 'P',
                    cor: 'Verde',
                    preco: 189.90,
                    quantidade: 8,
                    categoriaId: categorias[2].id
                }
            }),
            transaction.roupa.create({
                data: {
                    nome: 'Vestido casual',
                    tamanho: 'M',
                    cor: 'Preta',
                    preco: 169.90,
                    quantidade: 9,
                    categoriaId: categorias[2].id
                }
            }),
            transaction.roupa.create({
                data: {
                    nome: 'Jaqueta jeans',
                    tamanho: 'G',
                    cor: 'Azul',
                    preco: 229.90,
                    quantidade: 7,
                    categoriaId: categorias[3].id
                }
            }),
            transaction.roupa.create({
                data: {
                    nome: 'Jaqueta corta-vento',
                    tamanho: 'GG',
                    cor: 'Vermelha',
                    preco: 199.90,
                    quantidade: 6,
                    categoriaId: categorias[3].id
                }
            }),
            transaction.roupa.create({
                data: {
                    nome: 'Moletom com capuz',
                    tamanho: 'M',
                    cor: 'Cinza',
                    preco: 179.90,
                    quantidade: 14,
                    categoriaId: categorias[4].id
                }
            }),
            transaction.roupa.create({
                data: {
                    nome: 'Moletom básico',
                    tamanho: 'P',
                    cor: 'Azul-marinho',
                    preco: 149.90,
                    quantidade: 11,
                    categoriaId: categorias[4].id
                }
            })
        ])
        console.log('Roupas de teste cadastradas.')
    })
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })