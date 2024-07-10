const amqp = require('amqplib/callback_api');

let channel = null;

amqp.connect(process.env.RABBITMQ_URL, (err, connection) => {
  if (err) throw err;
  connection.createChannel((err, ch) => {
    if (err) throw err;
    channel = ch;
    channel.assertQueue('notifications', { durable: true });
  });
});

function pushToQueue(notification) {
  return new Promise((resolve, reject) => {
    if (channel) {
      channel.sendToQueue('notifications', Buffer.from(JSON.stringify(notification)), { persistent: true });
      resolve();
    } else {
      reject(new Error('Channel not initialized'));
    }
  });
}

module.exports = { pushToQueue };
