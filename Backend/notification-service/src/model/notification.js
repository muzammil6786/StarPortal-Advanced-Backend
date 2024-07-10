const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  id : {type : String, required : true},
  userId: { type: mongoose.Schema.Types.ObjectId, ref:'User',required: true },
  message: { type: String, required: true },
  read: { type: Boolean, enum:["true","false"],default: "false" },
});

module.exports = mongoose.model('Notification', notificationSchema);