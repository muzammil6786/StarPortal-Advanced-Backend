const app = require('./app');
const mongoose = require('mongoose');
const http = require('http');
require('dotenv').config();

const realTimeController = require('./controller/realtimeController');

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    const server = http.createServer(app);
    realTimeController(server);

    server.listen(PORT, () => {
      console.log(`Real-Time Service running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });
