const { StoreNotFoundError } = require('../../../domain');

class UpdateStoreUseCase {
  constructor(storeRepository) {
    this.storeRepository = storeRepository;
  }

  async execute(id, data) {
    const existing = await this.storeRepository.findById(id);
    if (!existing) throw new StoreNotFoundError(id);
    return await this.storeRepository.update(id, data);
  }
}

module.exports = UpdateStoreUseCase;