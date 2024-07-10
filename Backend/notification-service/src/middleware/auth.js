const jwt = require('jsonwebtoken');

function authenticateUser(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // If no token is found, return 401 Unauthorized
  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    // If verification fails, return 403 Forbidden
    if (err) {
      return res.sendStatus(403);
    }
    
    req.user = user;
    next(); 
  });
}

module.exports = {
  authenticateUser
};
