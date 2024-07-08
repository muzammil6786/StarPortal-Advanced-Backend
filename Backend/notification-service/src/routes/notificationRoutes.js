const express = require('express');
const { createNotification, getNotifications, getNotification, markAsRead } = require('../controller/notificationController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

/*

swagger: "2.0"
info:
  version: "1.0.0"
  title: Notification Service API
paths:
  /api/notifications:
    post:
      summary: Create a new notification for a user.
      parameters:
        - name: body
          in: body
          description: Notification details
          required: true
          schema:
            type: object
            properties:
              userId:
                type: string
                description: User ID for the notification
              message:
                type: string
                description: Notification message
      responses:
        '201':
          description: Created
          schema:
            type: object
            properties:
              _id:
                type: string
                description: Notification ID
              userId:
                type: string
                description: User ID
              message:
                type: string
                description: Notification message
        '400':
          description: Bad request
    get:
      summary: Get all notifications for the authenticated user.
      responses:
        '200':
          description: Success
          schema:
            type: array
            items:
              $ref: '#/definitions/Notification'
        '401':
          description: Unauthorized
  /api/notifications/{id}:
    get:
      summary: Get details of a specific notification.
      parameters:
        - name: id
          in: path
          required: true
          type: string
      responses:
        '200':
          description: Success
          schema:
            $ref: '#/definitions/Notification'
        '404':
          description: Notification not found
    put:
      summary: Mark a notification as read.
      parameters:
        - name: id
          in: path
          required: true
          type: string
      responses:
        '200':
          description: Success
          schema:
            $ref: '#/definitions/Notification'
        '404':
          description: Notification not found
definitions:
  Notification:
    type: object
    properties:
      _id:
        type: string
        description: Notification ID
      userId:
        type: string
        description: User ID
      message:
        type: string
        description: Notification message
*/ 


router.post('/notifications', authMiddleware, createNotification);
router.get('/notifications', authMiddleware, getNotifications);
router.get('/notifications/:id', authMiddleware, getNotification);
router.put('/notifications/:id', authMiddleware, markAsRead);

module.exports = router;
