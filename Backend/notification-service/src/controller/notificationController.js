const Notification = require('../model/notification');
const mongoose = require("mongoose");
const axios = require('axios');
const amqp = require('amqplib/callback_api');
const { getUserById } = require('../authClient');
const { pushToQueue } = require('../queue');


const createNotification = async (req, res) => {
  try {
    const { message } = req.body;
    const notification = new Notification({ id: new mongoose.Types.ObjectId(), userId: req.user.id, message });
    await notification.save();

    await pushToQueue(notification);
    res.status(201).json(notification);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'Failed to create notification' });
  }
};

const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.user.id });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
};

const getNotificationById = async (req, res) => {
  try {
    const notification = await Notification.findOne({ id: req.params.id, userId: req.user.id });
    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }
    res.json(notification);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notification' });
  }
};

const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { id: req.params.id, userId: req.user.id },
      { read: true },
      { new: true }
    );
    if (!notification) return res.status(404).json({ error: 'Notification not found' });
    res.json(notification);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update notification' });
  }
};

module.exports = { createNotification, getNotifications, getNotificationById, markAsRead };
