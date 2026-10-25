const prisma = require("../data/prisma");

const listar = async (req, res) => {
    const categorias = await prisma.categoria.findMany({
        include: {
            roupas: true
        }
    });

    return res.status(200).json(categorias);
};

const cadastrar = async (req, res) => {
    const data = req.body;

    const categoria = await prisma.categoria.create({
        data: {
            nome: data.nome
        }
    });

    return res.status(201).json(categoria);
};

const atualizar = async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    const categoria = await prisma.categoria.update({
        where: { id: Number(id) },
        data: {
            nome: data.nome
        }
    });

    return res.status(200).json(categoria);
};

const excluir = async (req, res) => {
    const { id } = req.params;

    const categoria = await prisma.categoria.delete({
        where: { id: Number(id) }
    });

    return res.status(200).json(categoria);
};

module.exports = {
    cadastrar,
    listar,
    atualizar,
    excluir
};