const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../../../auth-service/src/model/user'); 

const authenticate = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    // Example findOne query to find a user
    const user = await User.findOne({ username, password }).lean(); // Using lean() for lightweight object

    if (!user) {
      return res.status(401).json({ error: 'User not found or invalid credentials.' });
    }

    req.user = user; // Attach user to request object
    next();
  } catch (error) {
    console.error('Error in authentication:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = authenticate;
