commentRouter = require('express').Router();
const { createComment, getAvgRating } = require('../api/comment.controller');
const verifyToken = require('../../middleware/authMiddleware');


/**
 * @swagger
 * /comment/createComment:
 *   post:
 *     summary: Crea un nuevo comentario
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               userId:
 *                 type: string
 *               content:
 *                 type: string
 *               rate:
 *                 type: number
 *             required:
 *               - productId
 *               - userId
 *               - comment
 *               - rate
 *     responses:
 *       '200':
 *         description: Comentario creado exitosamente
 *       '400':
 *         description: Error al crear el comentario
 */
commentRouter.post('/createComment', verifyToken, createComment);

/**
 * @swagger
 * /comment/averageraiting/{productId}:
 *   get:
 *     summary: Obtiene el promedio de calificación para un producto específico
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *           description: ID del producto
 *     responses:
 *       '200':
 *         description: Promedio de calificación obtenido exitosamente
 *       '404':
 *         description: No se encontraron calificaciones para el producto especificado
 */
commentRouter.get('/averageraiting/:productId', verifyToken, getAvgRating);

module.exports = commentRouter;
