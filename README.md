# Real-Time Notification System

## Overview

This project implements a microservices-based real-time notification system using Node.js, Express, MongoDB, RabbitMQ, WebSocket, and JWT authentication. It allows users to send and receive real-time notifications and manage their notification status.

## Services

### Auth Service

Handles user registration and authentication using JWT.

- **POST /api/register**: Register a new user.
- **POST /api/login**: Authenticate user and receive a JWT.

### Notification Service

Manages notifications and interacts with the message queue.

- **POST /api/notifications**: Create a new notification.
- **GET /api/notifications**: Retrieve all notifications for the authenticated user.
- **GET /api/notifications/:id**: Retrieve details of a specific notification.
- **PUT /api/notifications/:id**: Mark a notification as read.

### Real-Time Service

Enables WebSocket connections for real-time notification updates.

- Listens for new notifications from the queue and broadcasts them to connected clients.

## Technical Requirements

- Follows RESTful principles for API design.
- Uses MongoDB with Mongoose for data storage.
- Implements RabbitMQ for message queuing and WebSocket/Socket.IO for real-time streaming.
- JWT for user authentication.
- Error handling with appropriate HTTP status codes.
- Configuration via environment variables.
- Code quality maintained using ESLint.


## Setup Instructions

1. Clone the repository: `git clone https://github.com/muzammil6786/StarPortal-Advanced-Backend`
2. Install dependencies: `npm install`
3. Set environment variables: Create a `.env` file and define necessary variables (e.g., `PORT`, `MONGODB_URI`, `RABBITMQ_URL`, `JWT_SECRET`).
4. Start the services: `npm start` or use Docker and `docker-compose up`.

## API Documentation

Swagger is used to document the APIs. Access the Swagger documentation at 
 Auth Service API :- http://localhost:5000/api-docs/
 Notification Service API :- http://localhost:5001/api-docs/



