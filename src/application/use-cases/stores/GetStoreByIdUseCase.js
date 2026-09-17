const { StoreNotFoundError } = require('../../../domain');

class GetStoreByIdUseCase {
  constructor(storeRepository) {
    this.storeRepository = storeRepository;
  }

  async execute(id) {
    const store = await this.storeRepository.findById(id);
    if (!store) throw new StoreNotFoundError(id);
    return store;
  }
}

module.exports = GetStoreByIdUseCase;