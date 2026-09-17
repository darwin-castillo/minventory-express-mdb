class IProductRepository {
  async findAll() {
    throw new Error('IProductRepository.findAll() not implemented');
  }

  async findById(id) {
    throw new Error('IProductRepository.findById() not implemented');
  }

  async findByStore(storeId) {
    throw new Error('IProductRepository.findByStore() not implemented');
  }

  async save(product) {
    throw new Error('IProductRepository.save() not implemented');
  }

  async update(id, data) {
    throw new Error('IProductRepository.update() not implemented');
  }

  async delete(id) {
    throw new Error('IProductRepository.delete() not implemented');
  }

  async smartSearch(queryVector) {
    throw new Error('IProductRepository.smartSearch() not implemented');
  }
}

module.exports = IProductRepository;
