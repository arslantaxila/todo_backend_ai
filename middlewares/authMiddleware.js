const JWTService = require('../services/jwtService');

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {

    if (token.startsWith('Bearer ')) {
      const actualToken = token.split(' ')[1]; // Split at the space and get the token part
      const decoded = JWTService.verifyToken(actualToken); // Now verify the token
      req.user = decoded;
      next();
  } else {
      // Handle the case where token is missing or malformed
      res.status(401).json({ error: 'Invalid token' });
  }
  } catch (ex) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = authMiddleware;