const express = require("express");

const router = express.Router();

const {
    cadastrar,
    listar,
    atualizar,
    excluir
} = require("../controllers/categorias.controllers");

/**
 * @swagger
 * components:
 *   schemas:
 *     Categoria:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         nome:
 *           type: string
 *           example: Camisetas
 *     CategoriaInput:
 *       type: object
 *       required:
 *         - nome
 *       properties:
 *         nome:
 *           type: string
 *           example: Camisetas
 */

/**
 * @swagger
 * /categorias/listar:
 *   get:
 *     summary: Lista as categorias e suas roupas
 *     tags: [Categorias]
 *     responses:
 *       200:
 *         description: Lista de categorias
 */
router.get("/listar", listar);

/**
 * @swagger
 * /categorias/cadastrar:
 *   post:
 *     summary: Cadastra uma categoria
 *     tags: [Categorias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoriaInput'
 *     responses:
 *       201:
 *         description: Categoria cadastrada
 */
router.post("/cadastrar", cadastrar);
/**
 * @swagger
 * /categorias/atualizar/{id}:
 *   put:
 *     summary: Atualiza uma categoria
 *     tags: [Categorias]
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
 *             $ref: '#/components/schemas/CategoriaInput'
 *     responses:
 *       200:
 *         description: Categoria atualizada
 */
router.put("/atualizar/:id", atualizar);
/**
 * @swagger
 * /categorias/excluir/{id}:
 *   delete:
 *     summary: Exclui uma categoria
 *     tags: [Categorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Categoria excluída
 */
router.delete("/excluir/:id", excluir);

module.exports = router;