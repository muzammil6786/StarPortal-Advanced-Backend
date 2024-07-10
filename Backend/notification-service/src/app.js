const express = require('express');
const mongoose = require('mongoose');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const notificationRoutes = require('./routes/notificationRoutes');
const {authenticateUser} = require("./middleware/auth")

const app = express();

app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Notification Service API',
      version: '1.0.0',
      description: 'API endpoints for managing notifications',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Notification: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            userId: { type: 'string' },
            message: { type: 'string' },
            read: { type: 'boolean' },
          },
          required: ['userId', 'message'],
        },
      },
    },
    security: [
      {
        bearerAuth: [], // Empty array indicates it applies to all methods in the path
      },
    ],
  },
  // Path to the API specs
  apis: ['./src/routes/*.js'], // Replace with your actual path
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

// Serve Swagger UI at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware to authenticate JWT token
app.use(authenticateUser);

app.use('/api', notificationRoutes);

module.exports = app;
