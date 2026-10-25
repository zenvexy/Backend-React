const express = require("express");

const router = express.Router();

const {
    cadastrar,
    listar,
    atualizar,
    excluir
} = require("../controllers/roupas.controllers");

/**
 * @swagger
 * components:
 *   schemas:
 *     Roupa:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         nome:
 *           type: string
 *           example: Camiseta básica
 *         tamanho:
 *           type: string
 *           enum: [PP, P, M, G, GG, XG]
 *         cor:
 *           type: string
 *           example: Azul
 *         preco:
 *           type: number
 *           format: float
 *           example: 59.9
 *         quantidade:
 *           type: integer
 *           example: 10
 *         categoriaId:
 *           type: integer
 *           example: 1
 *     RoupaInput:
 *       type: object
 *       required: [nome, tamanho, cor, preco, quantidade, categoriaId]
 *       properties:
 *         nome:
 *           type: string
 *           example: Camiseta básica
 *         tamanho:
 *           type: string
 *           enum: [PP, P, M, G, GG, XG]
 *         cor:
 *           type: string
 *           example: Azul
 *         preco:
 *           type: number
 *           format: float
 *           example: 59.9
 *         quantidade:
 *           type: integer
 *           example: 10
 *         categoriaId:
 *           type: integer
 *           example: 1
 */

/**
 * @swagger
 * /roupas/listar:
 *   get:
 *     summary: Lista as roupas e suas categorias
 *     tags: [Roupas]
 *     responses:
 *       200:
 *         description: Lista de roupas
 */
router.get("/listar", listar);

/**
 * @swagger
 * /roupas/cadastrar:
 *   post:
 *     summary: Cadastra uma roupa
 *     tags: [Roupas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RoupaInput'
 *     responses:
 *       201:
 *         description: Roupa cadastrada
 */
router.post("/cadastrar", cadastrar);
/**
 * @swagger
 * /roupas/atualizar/{id}:
 *   put:
 *     summary: Atualiza uma roupa
 *     tags: [Roupas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RoupaInput'
 *     responses:
 *       200:
 *         description: Roupa atualizada
 */
router.put("/atualizar/:id", atualizar);
/**
 * @swagger
 * /roupas/excluir/{id}:
 *   delete:
 *     summary: Exclui uma roupa
 *     tags: [Roupas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Roupa excluída
 */
router.delete("/excluir/:id", excluir);

module.exports = router;