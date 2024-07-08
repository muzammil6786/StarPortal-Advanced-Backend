const Notification = require('../model/notification');
const amqp = require('amqplib');
const dotenv = require('dotenv');
dotenv.config();

const createNotification = async (req, res) => {
    try {
      const { userId, message } = req.body;
      const notification = new Notification({ userId, message });
      await notification.save();
  
      const connection = await amqp.connect(process.env.RABBITMQ_URI);
      const channel = await connection.createChannel();
      const queue = 'notifications';
      await channel.assertQueue(queue, { durable: true });
      channel.sendToQueue(queue, Buffer.from(JSON.stringify(notification)));
  
      res.status(201).send(notification);
    } catch (error) {
      console.error('Error creating notification:', error);
      res.status(500).send({ error: 'Internal server error' });
    }
  };
  
const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.user._id });
    res.send(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(400).send({ error: error.message });
  }
};

const getNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).send({ error: 'Notification not found' });
    }
    res.send(notification);
  } catch (error) {
    console.error('Error fetching notification:', error);
    res.status(400).send({ error: error.message });
  }
};

const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    if (!notification) {
      return res.status(404).send({ error: 'Notification not found' });
    }
    res.send(notification);
  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(400).send({ error: error.message });
  }
};

module.exports = { createNotification, getNotifications, getNotification, markAsRead };
