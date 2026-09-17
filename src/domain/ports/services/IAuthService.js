class IAuthService {
  async hashPassword(plainPassword) {
    throw new Error('IAuthService.hashPassword() not implemented');
  }

  async comparePassword(plainPassword, hashedPassword) {
    throw new Error('IAuthService.comparePassword() not implemented');
  }

  generateToken(userId) {
    throw new Error('IAuthService.generateToken() not implemented');
  }
}

module.exports = IAuthService;
