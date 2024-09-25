const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

class JWTService {
  static generateToken(user) {
    return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });
  }

  static verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }
}

module.exports = JWTService;