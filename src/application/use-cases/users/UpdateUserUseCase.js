const { UserNotFoundError } = require('../../../domain');

class UpdateUserUseCase {
  constructor(userRepository, authService) {
    this.userRepository = userRepository;
    this.authService = authService;
  }

  async execute(id, data) {
    const existing = await this.userRepository.findById(id);
    if (!existing) throw new UserNotFoundError(id);

    const updateData = {};
    if (data.name) updateData.name = data.name;
    if (data.email) updateData.email = data.email;
    if (data.password) {
      updateData.password = await this.authService.hashPassword(data.password);
    }

    return await this.userRepository.update(id, updateData);
  }
}

module.exports = UpdateUserUseCase;