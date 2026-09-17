const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class BcryptAuthService {
  constructor() {
    this.jwtSecret = process.env.JWT_SECRET || 'secret_key_123';
  }

  async hashPassword(plainPassword) {
    return await bcrypt.hash(plainPassword, 10);
  }

  async comparePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  generateToken(userId) {
    return jwt.sign({ id: userId }, this.jwtSecret, { expiresIn: '30d' });
  }
}

module.exports = BcryptAuthService;