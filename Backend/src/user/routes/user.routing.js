userRouter = require("express").Router();
const {singUp, login} = require('../api/user.controller')


/**
 * @swagger
 * /user/singUp:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               bio:
 *                 type: string
 *               avatar:
 *                 type: string
 *             required:
 *               - userName
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: Usuario registrado exitosamente
 *       '400':
 *         description: Error al registrar el usuario
 */
userRouter.post('/singUp', singUp);

/**
 * @swagger
 * /user/logIn:
 *   post:
 *     summary: Inicia sesión de usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - userName
 *               - password
 *     responses:
 *       '200':
 *         description: Inicio de sesión exitoso
 *       '401':
 *         description: Credenciales inválidas
 */
userRouter.post('/logIn', login);

module.exports = userRouter;