class IUserRepository {
  async findAll() {
    throw new Error('IUserRepository.findAll() not implemented');
  }

  async findById(id) {
    throw new Error('IUserRepository.findById() not implemented');
  }

  async findByEmail(email) {
    throw new Error('IUserRepository.findByEmail() not implemented');
  }

  async save(user) {
    throw new Error('IUserRepository.save() not implemented');
  }

  async update(id, data) {
    throw new Error('IUserRepository.update() not implemented');
  }
}

module.exports = IUserRepository;
