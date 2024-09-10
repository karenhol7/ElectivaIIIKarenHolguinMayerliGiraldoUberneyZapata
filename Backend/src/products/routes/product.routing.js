taskRouter = require("express").Router();
const { saveProducts, updateProduct, deleteProduct, getProductDetails, searchProduct, productByFollowers, getProductsByDate, getProductByUserId } = require('../api/product.controller')
const verifyToken = require('../../middleware/authMiddleware');
const validateProductFields = require('../../middleware/createProductValidationMeddleware')

/**
 * @swagger
 * securityDefinitions:
 *   bearerAuth:
 *     type: apiKey
 *     name: Authorization
 *     in: header
 */

/**
 * @swagger
 * /product/saveProduct:
 *   post:
 *     summary: Guarda un nuevo producto
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               rate:
 *                 type: number
 *               category:
 *                 type: string
 *               url:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *             required:
 *               - name
 *               - description
 *               - rate
 *               - category
 *               - url
 *               - tags
 *     responses:
 *       '200':
 *         description: Producto guardado exitosamente
 *       '400':
 *         description: Error al guardar el producto
 */
taskRouter.post('/saveProduct', verifyToken, validateProductFields, saveProducts);

/**
 * @swagger
 * /product/updateProduct:
 *   put:
 *     summary: Actualiza un producto existente
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               rate:
 *                 type: number
 *               category:
 *                 type: string
 *               url:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *             required:
 *               - name
 *               - description
 *               - rate
 *               - category
 *               - url
 *               - tags
 *     responses:
 *       '200':
 *         description: Producto guardado exitosamente
 *       '400':
 *         description: Error al guardar el producto
 */
taskRouter.put('/updateProduct', verifyToken, updateProduct);

/**
 * @swagger
 * /product/deleteProduct/{id}:
 *   delete:
 *     summary: Elimina un producto por su ID
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: ID del producto a eliminar
 *     responses:
 *       '200':
 *         description: Producto eliminado exitosamente
 *       '400':
 *         description: Error al eliminar el producto
 */
taskRouter.delete('/deleteProduct/:id', verifyToken, deleteProduct);

/**
 * @swagger
 * /product/productDetails/{id}:
 *   get:
 *     summary: Obtiene los detalles de un producto por su ID
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: ID del producto
 *     responses:
 *       '200':
 *         description: Detalles del producto obtenidos exitosamente
 *       '404':
 *         description: Producto no encontrado
 */
taskRouter.get('/productDetails/:id', verifyToken, getProductDetails);

/**
 * @swagger
 * /product/searchProduct:
 *   get:
 *     summary: Busca productos según criterios específicos
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *           description: Nombre del producto a buscar
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           description: Categoría del producto a buscar
 *       - in: query
 *         name: tags
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *           description: Etiquetas del producto a buscar
 *       - in: query
 *         name: rate
 *         schema:
 *           type: number
 *           description: Calificación mínima del producto a buscar
 *     responses:
 *       '200':
 *         description: Productos encontrados exitosamente
 *       '404':
 *         description: No se encontraron productos que coincidan con los criterios de búsqueda
 */
taskRouter.get('/searchProduct', verifyToken, searchProduct);

/**
 * @swagger
 * /followers/products:
 *   get:
 *     summary: Get products followed by users
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         description: ID of the user whose followers' products are to be retrieved
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved products followed by users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   user:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       products:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             productId:
 *                               type: string
 *                             name:
 *                               type: string
 *                             description:
 *                               type: string
 *                             rate:
 *                               type: number
 *                             category:
 *                               type: string
 *                             url:
 *                               type: string
 *                             image:
 *                               type: string
 *                             tags:
 *                               type: array
 *                               items:
 *                                 type: string
 *       '400':
 *         description: Error while retrieving products by followers
 *       '500':
 *         description: Error while processing the request
 */
taskRouter.get('/followers/products', productByFollowers);

/**
 * @swagger
 * /ByDate:
 *   get:
 *     summary: Get products by date range
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         required: true
 *         description: Start date of the date range
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         required: true
 *         description: End date of the date range
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       '200':
 *         description: Successfully retrieved products by date range
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   productId:
 *                     type: string
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   rate:
 *                     type: number
 *                   category:
 *                     type: string
 *                   url:
 *                     type: string
 *                   image:
 *                     type: string
 *                   tags:
 *                     type: array
 *                     items:
 *                       type: string
 *       '400':
 *         description: Error while retrieving products by date
 *       '500':
 *         description: Error while processing the request
 */
taskRouter.get('/ByDate', verifyToken, getProductsByDate);

/**
 * @swagger
 * /searchProduct/{id}:
 *   get:
 *     summary: Search products by user ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user whose products are to be searched
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved products by user ID
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   productId:
 *                     type: string
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   rate:
 *                     type: number
 *                   category:
 *                     type: string
 *                   url:
 *                     type: string
 *                   image:
 *                     type: string
 *                   tags:
 *                     type: array
 *                     items:
 *                       type: string
 *       '404':
 *         description: User not found or no products found for the user
 *       '500':
 *         description: Error while processing the request
 */
taskRouter.get('/searchProduct/:id', verifyToken, getProductByUserId);

module.exports = taskRouter;