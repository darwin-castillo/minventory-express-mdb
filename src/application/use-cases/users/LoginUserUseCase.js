const { InvalidCredentialsError } = require('../../../domain');

class LoginUserUseCase {
  constructor(userRepository, authService) {
    this.userRepository = userRepository;
    this.authService = authService;
  }

  async execute(email, password) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new InvalidCredentialsError();

    const isMatch = await this.authService.comparePassword(password, user.password);
    if (!isMatch) throw new InvalidCredentialsError();

    const token = this.authService.generateToken(user.id);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token,
    };
  }
}

module.exports = LoginUserUseCase;