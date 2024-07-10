const express = require('express');
const { createNotification, getNotifications, getNotificationById, markAsRead } = require('../controller/notificationController');
const {authenticateUser} = require("../middleware/auth");
const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: API endpoints for managing notifications
 */

/**
 * @swagger
 * /api/notifications:
 *   post:
 *     summary: Create a new notification
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []  # Use JWT Bearer token for authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 description: Notification message
 *             required:
 *               - message
 *     responses:
 *       '201':
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */
router.post('/notifications', authenticateUser, createNotification);


/**
 * @swagger
 * /api/notifications:
 *   get:
 *     summary: Get all notifications for the authenticated user
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []  # Use JWT Bearer token for authentication
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notification'
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */
router.get('/notifications', authenticateUser, getNotifications);


/**
 * @swagger
 * /api/notifications/{id}:
 *   get:
 *     summary: Get details of a specific notification
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []  # Use JWT Bearer token for authentication
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the notification
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Notification not found
 *       '500':
 *         description: Internal server error
 */
router.get('/notifications/:id', authenticateUser ,getNotificationById);


/**
 * @swagger
 * /api/notifications/{id}:
 *   put:
 *     summary: Mark a notification as read
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []  # Use JWT Bearer token for authentication
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the notification
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Notification not found
 *       '500':
 *         description: Internal server error
 */
router.put('/notifications/:id', authenticateUser ,markAsRead);

module.exports = router;
