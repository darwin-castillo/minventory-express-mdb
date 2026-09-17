class IStoreRepository {
  async findAll() {
    throw new Error('IStoreRepository.findAll() not implemented');
  }

  async findById(id) {
    throw new Error('IStoreRepository.findById() not implemented');
  }

  async save(store) {
    throw new Error('IStoreRepository.save() not implemented');
  }

  async update(id, data) {
    throw new Error('IStoreRepository.update() not implemented');
  }

  async delete(id) {
    throw new Error('IStoreRepository.delete() not implemented');
  }
}

module.exports = IStoreRepository;
