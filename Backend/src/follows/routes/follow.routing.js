const express = require('express');
const verifyToken = require('../../middleware/authMiddleware');
const followController = require('../api/follow.controller');

const followRouter = express.Router();

/**
 * @swagger
 * /follow:
 *   post:
 *     summary: Follow a user
 *     tags: [Followers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               followedUserId:
 *                 type: string
 *             required:
 *               - userId
 *               - followedUserId
 *     responses:
 *       '200':
 *         description: Successfully followed the user
 *       '400':
 *         description: Error while following the user
 */
followRouter.post('/follow', verifyToken, followController.followUserController);

/**
 * @swagger
 * /unfollow:
 *   post:
 *     summary: Unfollow a user
 *     tags: [Followers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               unfollowedUserId:
 *                 type: string
 *             required:
 *               - userId
 *               - unfollowedUserId
 *     responses:
 *       '200':
 *         description: Successfully unfollowed the user
 *       '400':
 *         description: Error while unfollowing the user
 */
followRouter.post('/unfollow', verifyToken, followController.unfollow);

/**
 * @swagger
 * /followers/{id}:
 *   get:
 *     summary: Get followers of a user
 *     tags: [Followers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user whose followers are to be retrieved
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved followers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   userId:
 *                     type: string
 *                   username:
 *                     type: string
 *                   email:
 *                     type: string
 *                   // Include other properties as needed
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Error while retrieving followers
 */
followRouter.get('/followers/:id', verifyToken, followController.getFollowers);

/**
 * @swagger
 * /followings/{id}:
 *   get:
 *     summary: Get users followed by a user
 *     tags: [Followers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user whose followings are to be retrieved
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved followings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   userId:
 *                     type: string
 *                   username:
 *                     type: string
 *                   email:
 *                     type: string
 *                   // Include other properties as needed
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Error while retrieving followings
 */
followRouter.get('/followings/:id', verifyToken, followController.getFollowings);



module.exports = followRouter;
