const prisma = require("../data/prisma");

const listar = async (req, res) => {
    const roupas = await prisma.roupa.findMany({
        include: {
            categoria: true
        }
    });

    return res.status(200).json(roupas);
};

const cadastrar = async (req, res) => {
    const data = req.body;

    const roupa = await prisma.roupa.create({
        data: {
            nome: data.nome,
            tamanho: data.tamanho,
            cor: data.cor,
            preco: Number(data.preco),
            quantidade: Number(data.quantidade),
            categoriaId: Number(data.categoriaId)
        }
    });

    return res.status(201).json(roupa);
};

const atualizar = async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    const roupa = await prisma.roupa.update({
        where: { id: Number(id) },
        data: {
            nome: data.nome,
            tamanho: data.tamanho,
            cor: data.cor,
            preco: Number(data.preco),
            quantidade: Number(data.quantidade),
            categoriaId: Number(data.categoriaId)
        }
    });

    return res.status(200).json(roupa);
};

const excluir = async (req, res) => {
    const { id } = req.params;

    const roupa = await prisma.roupa.delete({
        where: { id: Number(id) }
    });

    return res.status(200).json(roupa);
};

module.exports = {
    cadastrar,
    listar,
    atualizar,
    excluir
};