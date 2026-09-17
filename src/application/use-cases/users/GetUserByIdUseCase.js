const { UserNotFoundError } = require('../../../domain');

class GetUserByIdUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(id) {
    const user = await this.userRepository.findById(id);
    if (!user) throw new UserNotFoundError(id);
    return user;
  }
}

module.exports = GetUserByIdUseCase;