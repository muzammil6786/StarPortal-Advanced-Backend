const amqp = require('amqplib'); 
const io = require('socket.io');
require('dotenv').config();

const realTimeController = async (server) => {
  const socketServer = io(server, {
    cors: {
      origin: '*',
    }
  });

  socketServer.use(require('../middleware/authMiddleware'));

  socketServer.on('connection', async (socket) => {
    console.log('User connected', socket.user._id);

    const connection = await amqp.connect(process.env.RABBITMQ_URI);
    const channel = await connection.createChannel();
    const queue = 'notifications';

    await channel.assertQueue(queue, { durable: true });

    channel.consume(queue, (msg) => {
      const notification = JSON.parse(msg.content.toString());
      if (notification.userId === socket.user._id.toString()) {
        socket.emit('notification', notification);
      }
    }, { noAck: true });

    socket.on('disconnect', () => {
      console.log('User disconnected', socket.user._id);
    });
  });
};

module.exports = realTimeController;
