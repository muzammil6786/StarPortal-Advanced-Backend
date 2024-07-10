const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const amqp = require('amqplib/callback_api');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let channel = null;

amqp.connect(process.env.RABBITMQ_URL, (err, connection) => {
  if (err) throw err;
  connection.createChannel((err, ch) => {
    if (err) throw err;
    channel = ch;
    channel.assertQueue('notifications', { durable: true });

    channel.consume('notifications', (msg) => {
      const notification = JSON.parse(msg.content.toString());
      io.to(notification.userId).emit('notification', notification);
      channel.ack(msg);
    });
  });
});

io.on('connection', (socket) => {
  const userId = socket.handshake.query.userId;
  socket.join(userId);

  socket.on('disconnect', () => {
    socket.leave(userId);
  });
});

const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`Real-time service running on port ${PORT}`);
});
