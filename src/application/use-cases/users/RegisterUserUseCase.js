const { User, DuplicateEmailError } = require('../../../domain');

class RegisterUserUseCase {
  constructor(userRepository, authService) {
    this.userRepository = userRepository;
    this.authService = authService;
  }

  async execute(data) {
    const existing = await this.userRepository.findByEmail(data.email);
    if (existing) throw new DuplicateEmailError(data.email);

    const hashedPassword = await this.authService.hashPassword(data.password);
    const user = new User({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role || 'user',
    });

    return await this.userRepository.save(user);
  }
}

module.exports = RegisterUserUseCase;